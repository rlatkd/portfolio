import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

const rootFlag = process.argv.indexOf('--content-root');
const root = path.resolve(rootFlag === -1 ? 'src/shared/content' : process.argv[rootFlag + 1]);
const hash = body => createHash('sha256').update(body.replace(/\r\n/g, '\n').trim()).digest('hex');
const manifestPath = path.join(root, 'velog-sources.json');
const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
const apply = process.argv.includes('--apply');
const offline = process.argv.indexOf('--input');
const posts = [];
if (offline !== -1) {
  posts.push(...JSON.parse(await fs.readFile(process.argv[offline + 1], 'utf8')));
} else {
  let cursor;
  const seen = new Set();
  for (;;) {
    const response = await fetch('https://v2.velog.io/graphql', {
      method: 'POST', headers: { 'content-type': 'application/json' }, signal: AbortSignal.timeout(30000),
      body: JSON.stringify({ query: 'query($cursor: ID) { posts(username: "kata", limit: 100, cursor: $cursor) { id title url_slug released_at updated_at body short_description thumbnail tags } }', variables: { cursor } }),
    });
    if (!response.ok) throw new Error(`Velog HTTP ${response.status}`);
    const result = await response.json();
    if (result.errors) throw new Error(JSON.stringify(result.errors));
    const batch = result.data?.posts;
    if (!Array.isArray(batch)) throw new Error('Invalid Velog response');
    if (!batch.length) break;
    for (const post of batch) {
      if (seen.has(post.id)) throw new Error('Velog pagination repeated a post');
      seen.add(post.id); posts.push(post);
    }
    if (batch.length < 100) break;
    cursor = batch.at(-1).id;
  }
}
if (!posts.length) throw new Error('Empty response; refusing to change content');
const changes = [];
const remoteUrls = new Set();
const files = await fs.readdir(path.join(root, 'posts'));
let nextIndex = Math.max(0, ...await Promise.all(files.filter(file => file.endsWith('.mdx')).map(async file => Number((await fs.readFile(path.join(root, 'posts', file), 'utf8')).match(/^index:\s*['"]?(\d+)/m)?.[1] || 0))));
for (const post of posts.sort((a, b) => Date.parse(a.released_at) - Date.parse(b.released_at))) {
  if (typeof post.body !== 'string' || !post.url_slug || !Number.isFinite(Date.parse(post.updated_at)) || !Number.isFinite(Date.parse(post.released_at))) throw new Error('Incomplete remote post');
  const url = `https://velog.io/@kata/${post.url_slug}`;
  if (remoteUrls.has(url)) throw new Error(`Duplicate remote URL: ${url}`);
  remoteUrls.add(url);
  const existing = Object.entries(manifest).find(([, source]) => decodeURI(source.url) === decodeURI(url));
  const slug = (existing?.[0] || post.url_slug).normalize('NFC');
  if (slug.includes('/') || slug.includes('\\') || slug === '.' || slug === '..') throw new Error('Unsafe slug');
  const filename = path.join(root, 'posts', `${slug}.mdx`);
  let before = '';
  try { before = await fs.readFile(filename, 'utf8'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const header = before.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/)?.[0];
  if (before && !header) throw new Error(`Missing frontmatter: ${slug}`);
  if (existing && (!before || hash(before.slice(header.length)) !== existing[1].bodySha256)) throw new Error(`Local body differs from snapshot: ${slug}; review before syncing`);
  if (!existing && before) throw new Error(`Untracked local post: ${slug}`);
  const bodySha256 = hash(post.body);
  const metadata = { url, publishedAt: post.released_at, updatedAt: post.updated_at, bodySha256 };
  if (existing && JSON.stringify(metadata) === JSON.stringify(existing[1])) continue;
  const quote = value => `'${String(value || '').replace(/[\r\n]/g, ' ').replace(/'/g, '’')}'`;
  const frontmatter = header || `---\nindex: '${++nextIndex}'\ntitle: ${quote(post.title)}\ncategory: ${quote(post.tags?.[0] || 'Writing')}\npublishedAt: ${quote(post.released_at.slice(0, 10))}\nsummary: ${quote(post.short_description)}\nimage: ${quote(post.thumbnail)}\n---\n`;
  changes.push({ slug, filename, content: `${frontmatter}\n${post.body.trim()}\n`, metadata, previous: existing?.[1].bodySha256 || null });
}
const missing = Object.entries(manifest).filter(([, source]) => ![...remoteUrls].some(url => decodeURI(url) === decodeURI(source.url))).map(([slug]) => slug);
console.log(JSON.stringify({ mode: apply ? 'apply' : 'check', remoteCount: posts.length, changes: changes.map(({ slug, previous, metadata }) => ({ slug, previous, next: metadata.bodySha256, updatedAt: metadata.updatedAt })), missing, note: 'Existing summaries/frontmatter are preserved; missing remote posts are never deleted.' }, null, 2));
// Validate the entire response and local snapshots before any writes.
if (apply) {
  for (const change of changes) { await fs.writeFile(change.filename, change.content); manifest[change.slug] = change.metadata; }
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
} else if (changes.length || missing.length) process.exitCode = 1;
