import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { metadataEligible, manifestEligible, protectionReady, run } = require('../scripts/lib/dependabot-auto-merge.cjs');
const dependency = {
  dependencyName: 'example', packageEcosystem: 'npm_and_yarn', directory: '/', targetBranch: 'main',
  dependencyType: 'direct:production', updateType: 'version-update:semver-patch', maintainerChanges: false,
};
const before = { scripts: { build: 'next build' }, dependencies: { example: '^1.2.3' } };
const after = { ...before, dependencies: { example: '^1.2.4' } };
function protectedRepository() {
  return {
    autoMergeAllowed: true, squashMergeAllowed: true,
    pullRequest: { headRefOid: 'head-sha', mergeStateStatus: 'BLOCKED' },
    ref: { branchProtectionRule: {
      requiresStatusChecks: true, requiresStrictStatusChecks: true, requiredStatusCheckContexts: ['check'],
      requiredStatusChecks: [{ context: 'check', app: { slug: 'github-actions' } }],
      isAdminEnforced: false, requiresApprovingReviews: false, allowsForcePushes: false, allowsDeletions: false,
      bypassPullRequestAllowances: { totalCount: 0 },
    } },
  };
}

test('only all-patch npm groups qualify, regardless of the PR title', () => {
  assert.equal(metadataEligible([dependency]), true);
  assert.equal(metadataEligible([]), false);
  for (const override of [
    { updateType: 'version-update:semver-major' }, { updateType: 'version-update:semver-minor' },
    { packageEcosystem: 'github_actions' }, { directory: '/tests' }, { targetBranch: 'other' },
    { dependencyType: 'indirect' }, { maintainerChanges: true }, { updateType: '' },
  ]) assert.equal(metadataEligible([dependency, { ...dependency, ...override }]), false);
});

test('manifest inspection rejects unrelated edits, range changes, prereleases and downgrades', () => {
  assert.equal(manifestEligible(before, after, [dependency]), true);
  for (const version of ['^2.2.4', '^1.3.4', '^1.2.2', '~1.2.4', '^1.2.4-beta.1', 'latest', 'https://example.org/a.tgz']) {
    assert.equal(manifestEligible(before, { ...after, dependencies: { example: version } }, [dependency]), false, version);
  }
  assert.equal(manifestEligible(before, { ...after, scripts: { build: 'malicious' } }, [dependency]), false);
  assert.equal(manifestEligible(before, { ...after, dependencies: { example: '^1.2.4', added: '1.0.0' } }, [dependency]), false);
  assert.equal(manifestEligible(before, { ...after, dependencies: {} }, [dependency]), false);
  assert.equal(manifestEligible(before, after, [{ ...dependency, dependencyName: 'other' }]), false);
  assert.equal(manifestEligible(before, after, [dependency, dependency]), false);
});

test('owner direct pushes are allowed while automation still requires strict CI protection', () => {
  assert.equal(protectionReady(protectedRepository()), true);
  assert.equal(protectionReady({}), false);
  for (const override of [
    { requiresStatusChecks: false }, { requiresStrictStatusChecks: false },
    { requiredStatusCheckContexts: ['other'] },
    { allowsForcePushes: true }, { allowsDeletions: true }, { bypassPullRequestAllowances: { totalCount: 1 } },
    { requiredStatusChecks: [{ context: 'check', app: { slug: 'other' } }] },
  ]) {
    const repository = protectedRepository();
    Object.assign(repository.ref.branchProtectionRule, override);
    assert.equal(protectionReady(repository), false);
  }
});

function fixture(overrides: Record<string, string> = {}) {
  const mutations: { query: string; variables: Record<string, unknown> }[] = [];
  const merges: Record<string, unknown>[] = [];
  const notices: string[] = [];
  const pr = {
    node_id: 'PR_example', state: 'open', draft: false, user: { login: 'dependabot[bot]' },
    head: { sha: 'head-sha', repo: { full_name: 'rlatkd/portfolio' } },
    base: { ref: 'main', sha: 'base-sha' }, auto_merge: null as null | object,
  };
  const files = [{ filename: 'package.json', status: 'modified' }, { filename: 'pnpm-lock.yaml', status: 'modified' }];
  const repository = protectedRepository();
  const github = {
    rest: {
      pulls: {
        get: async () => ({ data: pr }), listFiles: () => {},
        merge: async (args: Record<string, unknown>) => { merges.push(args); return { data: { merged: true } }; },
      },
      repos: { getContent: async ({ ref }: { ref: string }) => ({ data: {
        encoding: 'base64', content: Buffer.from(JSON.stringify(ref === 'base-sha' ? before : after)).toString('base64'),
      } }) },
    },
    paginate: async () => files,
    graphql: async (query: string, variables: Record<string, unknown>) => {
      if (query.startsWith('mutation')) mutations.push({ query, variables });
      return { repository };
    },
  };
  const input = {
    github, context: { repo: { owner: 'rlatkd', repo: 'portfolio' } }, core: { notice: (value: string) => notices.push(value) },
    env: { PR_NUMBER: '42', EXPECTED_SHA: 'head-sha', UPDATED_DEPENDENCIES: JSON.stringify([dependency]),
      AUTO_MERGE_ENABLED: 'true', DRY_RUN: 'false', ...overrides },
  };
  return { input, mutations, merges, pr, files, repository, notices };
}

test('eligible existing PR enables squash auto-merge with an atomic expected head check', async () => {
  const f = fixture();
  await run(f.input);
  assert.equal(f.mutations.length, 1);
  assert.match(f.mutations[0].query, /enablePullRequestAutoMerge/);
  assert.match(f.mutations[0].query, /expectedHeadOid: \$sha/);
  assert.equal(f.mutations[0].variables.sha, 'head-sha');
});

test('dry run and missing opt-in never mutate PRs', async () => {
  const cases: Record<string, string>[] = [{ DRY_RUN: 'true' }, { AUTO_MERGE_ENABLED: '' }];
  for (const env of cases) {
    const f = fixture(env);
    await run(f.input);
    assert.equal(f.mutations.length, 0);
    assert.equal(f.merges.length, 0);
  }
});

test('an already-green existing PR merges normally with the inspected head SHA', async () => {
  const f = fixture();
  f.repository.pullRequest.mergeStateStatus = 'CLEAN';
  await run(f.input);
  assert.equal(f.mutations.length, 0);
  assert.equal(f.merges.length, 1);
  assert.equal(f.merges[0].sha, 'head-sha');
  assert.equal(f.merges[0].merge_method, 'squash');
});

test('unprotected main, changed head, extra files and foreign authors never enable auto-merge', async () => {
  const unprotected = fixture();
  unprotected.repository.ref.branchProtectionRule.requiresStrictStatusChecks = false;
  await assert.rejects(() => run(unprotected.input), /configure main protection/);
  assert.equal(unprotected.mutations.length, 0);
  for (const kind of ['head', 'file', 'author', 'fork', 'draft']) {
    const f = fixture();
    if (kind === 'head') f.pr.head.sha = 'different';
    if (kind === 'file') f.files.push({ filename: '.github/workflows/check.yml', status: 'modified' });
    if (kind === 'author') f.pr.user.login = 'someone';
    if (kind === 'fork') f.pr.head.repo.full_name = 'someone/portfolio';
    if (kind === 'draft') f.pr.draft = true;
    await run(f.input);
    assert.equal(f.mutations.length, 0, kind);
  }
});

test('a previously opted-in PR is disarmed when a grouped update becomes major', async () => {
  const f = fixture({ UPDATED_DEPENDENCIES: JSON.stringify([{ ...dependency, updateType: 'version-update:semver-major' }]) });
  f.pr.auto_merge = {};
  await run(f.input);
  assert.equal(f.mutations.length, 1);
  assert.match(f.mutations[0].query, /disablePullRequestAutoMerge/);
});
