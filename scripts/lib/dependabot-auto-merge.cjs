const { isDeepStrictEqual } = require('node:util');

const REQUIRED_CHECK = 'check';

// Accept only Dependabot's small, scalar metadata format, never arbitrary YAML.
// This message is used only after GitHub verifies its bot author and signature.
function signedPatchUpdates(message) {
  const block = /^---\nupdated-dependencies:\n([\s\S]+?)^\.\.\.(?:\n|$)/m.exec((message || '').replace(/\r\n/g, '\n'));
  if (!block) return null;
  const entries = block[1].trimEnd().split(/\n(?=- dependency-name:)/);
  const updates = [];
  for (const entry of entries) {
    const fields = new Map();
    for (const line of entry.split('\n')) {
      const match = /^(?:- |  )(dependency-name|dependency-version|dependency-type|update-type|dependency-group): (.+)$/.exec(line);
      if (!match || fields.has(match[1])) return null;
      fields.set(match[1], match[2]);
    }
    const name = /^(['"]?)([@a-zA-Z0-9_./-]+)\1$/.exec(fields.get('dependency-name') || '')?.[2];
    const type = fields.get('dependency-type');
    if (!name || !['direct:production', 'direct:development'].includes(type) ||
        fields.get('update-type') !== 'version-update:semver-patch') return null;
    updates.push({ name, section: type === 'direct:production' ? 'dependencies' : 'devDependencies' });
  }
  return updates.length > 0 && new Set(updates.map(update => update.name)).size === updates.length ? updates : null;
}

function manifestEligible(before, after, updates) {
  if (!Array.isArray(updates) || updates.length === 0) return false;
  const sections = ['dependencies', 'devDependencies'];
  const omitDependencies = manifest => Object.fromEntries(Object.entries(manifest).filter(([key]) => !sections.includes(key)));
  if (!isDeepStrictEqual(omitDependencies(before), omitDependencies(after))) return false;
  const changed = new Set();
  for (const section of sections) {
    const oldDeps = before[section] || {};
    const newDeps = after[section] || {};
    if (!isDeepStrictEqual(Object.keys(oldDeps).sort(), Object.keys(newDeps).sort())) return false;
    for (const name of Object.keys(oldDeps)) {
      if (oldDeps[name] === newDeps[name]) continue;
      // The signed metadata describes resolved versions. A patch can raise a
      // stale manifest minimum across a minor (e.g. ^8.4.35 -> ^8.5.31).
      // Still reject range changes, majors, prereleases, aliases and downgrades.
      const oldVersion = /^(\^|~?)(\d+)\.(\d+)\.(\d+)$/.exec(oldDeps[name]);
      const newVersion = /^(\^|~?)(\d+)\.(\d+)\.(\d+)$/.exec(newDeps[name]);
      if (!oldVersion || !newVersion || oldVersion.slice(1, 3).join('.') !== newVersion.slice(1, 3).join('.') ||
          Number(newVersion[3]) < Number(oldVersion[3]) ||
          (newVersion[3] === oldVersion[3] && Number(newVersion[4]) <= Number(oldVersion[4])) ||
          !updates.some(update => update.name === name && update.section === section)) return false;
      changed.add(name);
    }
  }
  return changed.size === updates.length && updates.every(update => changed.has(update.name));
}

function protectionReady(repository) {
  const rule = repository?.ref?.branchProtectionRule;
  return repository?.autoMergeAllowed === true && repository?.squashMergeAllowed === true &&
    rule?.requiresStatusChecks === true && rule?.requiresStrictStatusChecks === true &&
    rule?.requiredStatusCheckContexts?.includes(REQUIRED_CHECK) &&
    rule?.requiredStatusChecks?.some(check => check.context === REQUIRED_CHECK && check.app?.slug === 'github-actions') &&
    rule?.allowsForcePushes === false && rule?.allowsDeletions === false &&
    rule?.bypassPullRequestAllowances?.totalCount === 0;
}

async function run({ github, context, core, env }) {
  const args = { ...context.repo, pull_number: Number(env.PR_NUMBER) };
  const { data: pr } = await github.rest.pulls.get(args);
  const skip = reason => core.notice(`#${args.pull_number}: ${reason}`);
  if (pr.state !== 'open' || pr.draft || pr.user.login !== 'dependabot[bot]' || pr.base.ref !== 'main' ||
      pr.head.repo?.full_name !== `${args.owner}/${args.repo}` || pr.head.sha !== env.EXPECTED_SHA) {
    return skip('PR identity or head changed; not enabling auto-merge.');
  }
  const files = await github.paginate(github.rest.pulls.listFiles, { ...args, per_page: 100 });
  const commits = await github.paginate(github.rest.pulls.listCommits, { ...args, per_page: 100 });
  const signedBotCommits = commits.length > 0 && commits.some(commit => commit.sha === env.EXPECTED_SHA) &&
    commits.every(commit => commit.author?.login === 'dependabot[bot]' && commit.commit?.verification?.verified === true);
  const updates = signedPatchUpdates(commits.find(commit => commit.sha === env.EXPECTED_SHA)?.commit?.message);
  let eligible = signedBotCommits && pr.head.ref?.startsWith('dependabot/npm_and_yarn/') &&
    !/Maintainer changes/i.test(pr.body || '') && files.length === 2 &&
    files.every(file => ['package.json', 'pnpm-lock.yaml'].includes(file.filename) && file.status === 'modified');
  if (eligible) {
    const readManifest = async ref => {
      const { data } = await github.rest.repos.getContent({ ...context.repo, path: 'package.json', ref });
      if (data.encoding !== 'base64' || typeof data.content !== 'string') throw new Error('Cannot read manifest');
      return JSON.parse(Buffer.from(data.content, 'base64').toString('utf8'));
    };
    const [before, after] = await Promise.all([readManifest(pr.base.sha), readManifest(pr.head.sha)]);
    eligible = manifestEligible(before, after, updates);
  }
  const dryRun = env.DRY_RUN === 'true' || env.AUTO_MERGE_ENABLED !== 'true';
  if (!eligible) {
    // Revoke an earlier opt-in if an updated/grouped PR no longer satisfies policy.
    if (!dryRun && pr.auto_merge) {
      await github.graphql('mutation($id: ID!) { disablePullRequestAutoMerge(input: {pullRequestId: $id}) { clientMutationId } }', { id: pr.node_id });
    }
    return skip('Manual review required: only root npm patch-only manifest/lockfile updates are eligible.');
  }
  const { repository } = await github.graphql(`query($owner: String!, $repo: String!, $number: Int!) {
    repository(owner: $owner, name: $repo) {
      autoMergeAllowed squashMergeAllowed
      pullRequest(number: $number) { headRefOid mergeStateStatus }
      ref(qualifiedName: "refs/heads/main") {
        branchProtectionRule {
          requiresStatusChecks requiresStrictStatusChecks requiredStatusCheckContexts
          requiredStatusChecks { context app { slug } }
          allowsForcePushes allowsDeletions
          bypassPullRequestAllowances(first: 1) { totalCount }
        }
      }
    }
  }`, { ...context.repo, number: args.pull_number });
  if (!protectionReady(repository)) {
    const reason = 'Eligible patch PR, but auto-merge is not ready: enable auto-merge/squash and add GitHub Actions check as a required status check on main with up-to-date branches. See docs/dependabot-auto-merge.md.';
    if (dryRun) return skip(reason);
    throw new Error(reason);
  }
  if (dryRun) return skip('Eligible npm patch PR; protection verified. Dry run or repository variable disabled, no changes made.');
  const { data: latest } = await github.rest.pulls.get(args);
  if (latest.head.sha !== env.EXPECTED_SHA || latest.state !== 'open' || latest.draft || latest.base.ref !== 'main') {
    return skip('PR changed during inspection; wait for the next run.');
  }
  if (latest.auto_merge) return skip('Auto-merge already enabled; required checks still apply.');
  // GitHub only allows enabling auto-merge while a PR is waiting on conditions.
  // An already-green existing PR can be merged normally under the same rules.
  if (repository.pullRequest?.mergeStateStatus === 'CLEAN' && repository.pullRequest.headRefOid === env.EXPECTED_SHA) {
    const { data } = await github.rest.pulls.merge({ ...args, sha: env.EXPECTED_SHA, merge_method: 'squash' });
    if (!data.merged) throw new Error(`GitHub refused to merge PR #${args.pull_number}`);
    return skip('Required conditions already satisfied; squash-merged with head SHA and branch protection enforced.');
  }
  await github.graphql(`mutation($id: ID!, $sha: GitObjectID!) {
    enablePullRequestAutoMerge(input: {pullRequestId: $id, mergeMethod: SQUASH, expectedHeadOid: $sha}) {
      pullRequest { number }
    }
  }`, { id: pr.node_id, sha: env.EXPECTED_SHA });
  skip('Auto-merge enabled; GitHub enforces required CI, current main and any required reviews.');
}

module.exports = { signedPatchUpdates, manifestEligible, protectionReady, run };
