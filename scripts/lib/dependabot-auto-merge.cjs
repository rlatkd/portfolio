const { isDeepStrictEqual } = require('node:util');

const REQUIRED_CHECK = 'check';

function metadataEligible(dependencies) {
  return Array.isArray(dependencies) && dependencies.length > 0 && dependencies.every(dep =>
    dep.packageEcosystem === 'npm_and_yarn' && dep.directory === '/' &&
    dep.targetBranch === 'main' && dep.updateType === 'version-update:semver-patch' &&
    ['direct:production', 'direct:development'].includes(dep.dependencyType) &&
    dep.maintainerChanges === false);
}

function manifestEligible(before, after, dependencies) {
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
      // Keep the range operator, major and minor. Reject prereleases, aliases,
      // tags, URLs, downgrades and changes to package installation scripts.
      const oldVersion = /^(\^|~?)(\d+)\.(\d+)\.(\d+)$/.exec(oldDeps[name]);
      const newVersion = /^(\^|~?)(\d+)\.(\d+)\.(\d+)$/.exec(newDeps[name]);
      if (!oldVersion || !newVersion || oldVersion.slice(1, 4).join('.') !== newVersion.slice(1, 4).join('.') ||
          Number(newVersion[4]) <= Number(oldVersion[4])) return false;
      changed.add(name);
    }
  }
  return changed.size > 0 && changed.size === dependencies.length &&
    dependencies.every(dep => changed.has(dep.dependencyName));
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
  const dependencies = JSON.parse(env.UPDATED_DEPENDENCIES || '[]');
  const files = await github.paginate(github.rest.pulls.listFiles, { ...args, per_page: 100 });
  let eligible = metadataEligible(dependencies) && files.length === 2 &&
    files.every(file => ['package.json', 'pnpm-lock.yaml'].includes(file.filename) && file.status === 'modified');
  if (eligible) {
    const readManifest = async ref => {
      const { data } = await github.rest.repos.getContent({ ...context.repo, path: 'package.json', ref });
      if (data.encoding !== 'base64' || typeof data.content !== 'string') throw new Error('Cannot read manifest');
      return JSON.parse(Buffer.from(data.content, 'base64').toString('utf8'));
    };
    const [before, after] = await Promise.all([readManifest(pr.base.sha), readManifest(pr.head.sha)]);
    eligible = manifestEligible(before, after, dependencies);
  }
  const dryRun = env.DRY_RUN === 'true' || env.AUTO_MERGE_ENABLED !== 'true';
  if (!eligible) {
    // Revoke an earlier opt-in if an updated/grouped PR no longer satisfies policy.
    if (!dryRun && pr.auto_merge) {
      await github.graphql('mutation($id: ID!) { disablePullRequestAutoMerge(input: {pullRequestId: $id}) { clientMutationId } }', { id: pr.node_id });
    }
    return skip('Manual review required: only root npm patch-only manifest/lockfile updates are eligible.');
  }
  if (dryRun) return skip('Eligible npm patch PR; dry run or repository variable disabled, no changes made.');
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
    throw new Error('Auto-merge stopped: configure main protection and required check first. See docs/dependabot-auto-merge.md.');
  }
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

module.exports = { metadataEligible, manifestEligible, protectionReady, run };
