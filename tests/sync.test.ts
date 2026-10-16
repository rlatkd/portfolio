import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const script = path.resolve('scripts/sync-velog.mjs');
const digest = (text: string) => createHash('sha256').update(text).digest('hex');
test('Velog sync is read-only by default, preserves summaries and refuses local conflicts', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-sync-test-'));
  try {
    fs.mkdirSync(path.join(root, 'posts'));
    const file = path.join(root, 'posts', 'first.mdx');
    const header = "---\nindex: '1'\ntitle: 'Original'\ncategory: 'Java'\npublishedAt: '2024-01-01'\nsummary: 'Keep this exact summary'\n---\n";
    fs.writeFileSync(file, header + '\nold body\n');
    const manifest = { first: { url: 'https://velog.io/@kata/first', publishedAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z', bodySha256: digest('old body') } };
    fs.writeFileSync(path.join(root, 'velog-sources.json'), JSON.stringify(manifest));
    const input = path.join(root, 'remote.json');
    fs.writeFileSync(input, JSON.stringify([{ id: '1', url_slug: 'first', title: 'Changed remote title', released_at: '2024-01-01T00:00:00Z', updated_at: '2024-02-01T00:00:00Z', body: 'new body\nsecond line', short_description: 'New summary' }]));
    const run = (...args: string[]) => spawnSync(process.execPath, [script, '--content-root', root, '--input', input, ...args], { encoding: 'utf8' });
    assert.equal(run().status, 1);
    assert.equal(fs.readFileSync(file, 'utf8'), header + '\nold body\n');
    assert.equal(run('--apply').status, 0);
    assert.equal(fs.readFileSync(file, 'utf8'), header + '\nnew body\nsecond line\n');
    assert.equal(run().status, 0);
    fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace(/\n/g, '\r\n'));
    assert.equal(run().status, 0, 'Windows line endings must not cause a content conflict');
    fs.writeFileSync(file, header + '\nlocal edit\n');
    assert.equal(run('--apply').status, 1);
    assert.equal(fs.readFileSync(file, 'utf8'), header + '\nlocal edit\n');
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
