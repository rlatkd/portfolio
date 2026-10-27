import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';

const require = createRequire(import.meta.url);
const { signedPatchUpdates, manifestEligible, protectionReady, run } = require('../scripts/lib/dependabot-auto-merge.cjs');
const patchUpdates = [{ name: 'example', section: 'dependencies' }];
const message = 'build(deps): bump example\n\n---\nupdated-dependencies:\n- dependency-name: example\n  dependency-type: direct:production\n  update-type: version-update:semver-patch\n...\n';
const before = { scripts: { build: 'next build' }, dependencies: { example: '^1.2.3' } };
const after = { ...before, dependencies: { example: '^1.2.4' } };
function protectedRepository() {
  return {
    autoMergeAllowed: true, squashMergeAllowed: true,
    pullRequest: { headRefOid: 'head-sha', mergeStateStatus: 'BLOCKED' },
    ref: { refUpdateRule: {
      requiredStatusCheckContexts: ['check'],
      allowsForcePushes: false, allowsDeletions: false,
    } },
  };
}

test('manifest inspection rejects unrelated edits, range changes, prereleases and downgrades', () => {
  assert.equal(manifestEligible(before, after, patchUpdates), true);
  for (const version of ['^2.2.4', '^1.2.2', '~1.2.4', '^1.2.4-beta.1', 'latest', 'https://example.org/a.tgz']) {
    assert.equal(manifestEligible(before, { ...after, dependencies: { example: version } }, patchUpdates), false, version);
  }
  assert.equal(manifestEligible(before, { ...after, scripts: { build: 'malicious' } }, patchUpdates), false);
  assert.equal(manifestEligible(before, { ...after, dependencies: { example: '^1.2.4', added: '1.0.0' } }, patchUpdates), false);
  assert.equal(manifestEligible(before, { ...after, dependencies: {} }, patchUpdates), false);
  assert.equal(manifestEligible(before, before, patchUpdates), false);
});

test('owner direct pushes are allowed while automation still requires strict CI protection', () => {
  assert.equal(protectionReady(protectedRepository()), true);
  assert.equal(protectionReady({}), false);
  for (const override of [
    { requiredStatusCheckContexts: ['other'] },
    { allowsForcePushes: true }, { allowsDeletions: true },
  ]) {
    const repository = protectedRepository();
    Object.assign(repository.ref.refUpdateRule, override);
    assert.equal(protectionReady(repository), false);
  }
});

function fixture(overrides: Record<string, string> = {}) {
  const mutations: { query: string; variables: Record<string, unknown> }[] = [];
  const merges: Record<string, unknown>[] = [];
  const notices: string[] = [];
  const pr = {
    node_id: 'PR_example', state: 'open', draft: false, user: { login: 'dependabot[bot]' },
    head: { sha: 'head-sha', ref: 'dependabot/npm_and_yarn/example-1.2.4', repo: { full_name: 'rlatkd/portfolio' } },
    body: '', base: { ref: 'main', sha: 'base-sha' }, auto_merge: null as null | object,
  };
  const files = [{ filename: 'package.json', status: 'modified' }, { filename: 'pnpm-lock.yaml', status: 'modified' }];
  const repository = protectedRepository();
  const manifests = { before, after };
  const commits = [{ sha: 'head-sha', author: { login: 'dependabot[bot]' }, commit: { verification: { verified: true }, message } }];
  const listFiles = () => {};
  const listCommits = () => {};
  const github = {
    rest: {
      pulls: {
        get: async () => ({ data: pr }), listFiles, listCommits,
        merge: async (args: Record<string, unknown>) => { merges.push(args); return { data: { merged: true } }; },
      },
      repos: { getContent: async ({ ref }: { ref: string }) => ({ data: {
        encoding: 'base64', content: Buffer.from(JSON.stringify(ref === 'base-sha' ? manifests.before : manifests.after)).toString('base64'),
      } }) },
    },
    paginate: async (method: unknown) => method === listCommits ? commits : files,
    graphql: async (query: string, variables: Record<string, unknown>) => {
      assert.doesNotMatch(query, /branchProtectionRule|bypassPullRequestAllowances|requiresStrictStatusChecks/);
      if (query.startsWith('mutation')) mutations.push({ query, variables });
      return { repository };
    },
  };
  const input = {
    github, context: { repo: { owner: 'rlatkd', repo: 'portfolio' } }, core: { notice: (value: string) => notices.push(value) },
    env: { PR_NUMBER: '42', EXPECTED_SHA: 'head-sha',
      AUTO_MERGE_ENABLED: 'true', DRY_RUN: 'false', ...overrides },
  };
  return { input, mutations, merges, pr, files, commits, manifests, repository, notices };
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
  unprotected.repository.ref.refUpdateRule.requiredStatusCheckContexts = [];
  await assert.rejects(() => run(unprotected.input), /required status check/);
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

test('all PR commits must be signed by Dependabot and include the inspected head', async () => {
  for (const kind of ['unsigned', 'human', 'missing-head', 'empty', 'actions', 'maintainer']) {
    const f = fixture();
    if (kind === 'unsigned') f.commits[0].commit.verification.verified = false;
    if (kind === 'human') f.commits[0].author.login = 'someone';
    if (kind === 'missing-head') f.commits[0].sha = 'old-sha';
    if (kind === 'empty') f.commits.length = 0;
    if (kind === 'actions') f.pr.head.ref = 'dependabot/github_actions/actions/checkout-7';
    if (kind === 'maintainer') f.pr.body = 'Maintainer changes';
    await run(f.input);
    assert.equal(f.mutations.length, 0, kind);
    assert.equal(f.merges.length, 0, kind);
    assert.match(f.notices[0], /Manual review required/);
  }
});

test('mixed groups are rejected if even one dependency is a minor or major update', () => {
  const updates = [{ name: 'first', section: 'dependencies' }, { name: 'second', section: 'dependencies' }];
  const oldGroup = { dependencies: { first: '^1.2.3', second: '~2.3.4' } };
  assert.equal(manifestEligible(oldGroup, { dependencies: { first: '^1.2.4', second: '~2.3.5' } }, updates), true);
  for (const type of ['minor', 'major']) {
    const groupedMessage = message.replace('example', 'first').replace('dependency-name: example', 'dependency-name: first').replace('...\n', `- dependency-name: second\n  dependency-type: direct:production\n  update-type: version-update:semver-${type}\n...\n`);
    assert.equal(signedPatchUpdates(groupedMessage), null);
    assert.equal(manifestEligible(oldGroup, { dependencies: { first: '^1.2.4', second: '~2.4.0' } }, signedPatchUpdates(groupedMessage)), false);
  }
});

test('signed resolved patch updates can raise a stale manifest minimum, as in PR 11', () => {
  const updates = [{ name: 'postcss', section: 'devDependencies' }];
  assert.equal(manifestEligible(
    { devDependencies: { postcss: '^8.4.35' } },
    { devDependencies: { postcss: '^8.5.31' } }, updates,
  ), true);
  assert.equal(manifestEligible(before, after, [{ name: 'other', section: 'dependencies' }]), false);
  assert.equal(manifestEligible(before, after, [{ name: 'example', section: 'devDependencies' }]), false);
});

test('signed metadata parser rejects unknown, missing, duplicate and non-patch declarations', () => {
  assert.deepEqual(signedPatchUpdates(message), patchUpdates);
  for (const invalid of [
    '', message.replace('semver-patch', 'semver-major'), message.replace('semver-patch', 'semver-minor'),
    message.replace('  update-type: version-update:semver-patch\n', ''),
    message.replace('direct:production', 'indirect'),
    message.replace('...\n', '  unknown: value\n...\n'),
    message.replace('...\n', '  update-type: version-update:semver-patch\n...\n'),
  ]) assert.equal(signedPatchUpdates(invalid), null);
});

test('dry-run reports missing protection without modifying an existing PR', async () => {
  const f = fixture({ DRY_RUN: 'true' });
  f.repository.ref.refUpdateRule.requiredStatusCheckContexts = [];
  await run(f.input);
  assert.equal(f.mutations.length, 0);
  assert.equal(f.merges.length, 0);
  assert.match(f.notices[0], /add GitHub Actions check/);
});

test('disabled repository auto-merge is reported clearly without attempting any mutation', async () => {
  const live = fixture();
  live.repository.autoMergeAllowed = false;
  await assert.rejects(() => run(live.input), /Enable Allow auto-merge/);
  assert.equal(live.mutations.length + live.merges.length, 0);
  const preview = fixture({ DRY_RUN: 'true' });
  preview.repository.autoMergeAllowed = false;
  await run(preview.input);
  assert.match(preview.notices[0], /Settings > General > Pull Requests/);
  assert.equal(preview.mutations.length + preview.merges.length, 0);
});

test('actual workflow scripts handle push, dispatch and PR events without rewriting event files', async () => {
  const workflow = readFileSync(new URL('../.github/workflows/dependabot-auto-merge.yml', import.meta.url), 'utf8');
  assert.doesNotMatch(workflow, /fetch-metadata@|GITHUB_EVENT_PATH|UPDATED_DEPENDENCIES/);
  const scripts = [...workflow.matchAll(/script: \|\n((?: {12}.*\n|\n)+)/g)].map(match => match[1].replace(/^ {12}/gm, ''));
  assert.equal(scripts.length, 3);
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  for (const eventName of ['push', 'workflow_dispatch', 'pull_request_target']) {
    const f = fixture({ DRY_RUN: 'true' });
    const list = () => {};
    const paginate = f.input.github.paginate;
    const github = {
      ...f.input.github,
      rest: { ...f.input.github.rest, pulls: { ...f.input.github.rest.pulls, list } },
      paginate: async (method: unknown) => method === list ? [{ ...f.pr, number: 42 }] : paginate(method),
    };
    const context = { ...f.input.context, eventName, payload: eventName === 'pull_request_target' ? { pull_request: { number: 42 } } : {} };
    const outputs: Record<string, string> = {};
    const core = { ...f.input.core, setOutput: (key: string, value: string) => { outputs[key] = value; } };
    const processStub = { env: { ...f.input.env, GITHUB_WORKSPACE: process.cwd() } };
    const execute = (script: string) => new AsyncFunction('github', 'context', 'core', 'process', 'require', script)(github, context, core, processStub, require);
    assert.deepEqual(await execute(scripts[0]), [42], eventName);
    await execute(scripts[1]);
    assert.equal(outputs.valid, 'true', eventName);
    assert.equal(outputs.sha, 'head-sha', eventName);
    await execute(scripts[2]);
    assert.match(f.notices[0], /protection verified/, eventName);
    assert.equal(f.mutations.length + f.merges.length, 0, eventName);
  }
});

test('a previously opted-in PR is disarmed when a grouped update becomes major', async () => {
  const f = fixture();
  f.manifests.after = { ...after, dependencies: { example: '^2.0.0' } };
  f.pr.auto_merge = {};
  await run(f.input);
  assert.equal(f.mutations.length, 1);
  assert.match(f.mutations[0].query, /disablePullRequestAutoMerge/);
});
