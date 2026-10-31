import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MdxRenderer } from '../src/shared/markdown/mdx-renderer';
import { getPostContents } from '../src/shared/markdown/postContents';
import { highlightCode } from '../src/shared/markdown/highlight-code';
import sources from '../src/shared/content/velog-sources.json';
import { getPosts } from '../src/shared/lib/markdown';
import { profile, certifications, experience, projects } from '../src/shared/data/site-data';
import benchmarkReport from '@public/reports/upquant-correlation.json';

const directory = path.join(process.cwd(), 'src/shared/content/posts');

test('served posts contain only original bodies and original modification dates', async () => {
  const posts = await getPosts();
  assert.equal(posts.length, Object.keys(sources).length);
  for (const post of posts) {
    const file = fs.readFileSync(path.join(directory, post.slug + '.mdx'), 'utf8');
    const original = file.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim();
    assert.equal(post.content, original, post.slug);
    assert.equal(post.metadata.updatedAt, (sources as Record<string, { updatedAt: string }>)[post.slug].updatedAt);
  }
});
test('public data excludes private identifiers and uses unique item IDs', () => {
  assert.ok(!Object.hasOwn(profile, 'mobile'));
  for (const certificate of certifications) assert.match(certificate.id, /^[a-z-]+$/);
  for (const items of [experience, projects, certifications]) {
    assert.equal(new Set(items.map(item => item.id)).size, items.length);
  }
});
test('all Velog bodies remain unchanged and content files match the source manifest', () => {
  const files = fs.readdirSync(directory).filter(file => file.endsWith('.mdx')).map(file => path.basename(file, '.mdx').normalize('NFC')).sort();
  assert.deepEqual(files, Object.keys(sources).sort());
  assert.ok(files.length > 0);
  for (const [slug, source] of Object.entries(sources)) {
    const file = fs.readFileSync(path.join(directory, slug + '.mdx'), 'utf8');
    const body = file.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').replace(/\r\n/g, '\n').trim();
    assert.equal(createHash('sha256').update(body).digest('hex'), source.bodySha256, slug);
    assert.ok(Number.isFinite(Date.parse(source.updatedAt)), slug);
    assert.equal(new URL(source.url).hostname, 'velog.io');
  }
});

test('every original fenced code block preserves operators, whitespace and text after highlighting', () => {
  let blocks = 0;
  for (const slug of Object.keys(sources)) {
    const source = fs.readFileSync(path.join(directory, slug + '.mdx'), 'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
    const tree = unified().use(remarkParse).parse(source);
    function visit(node: { type: string; value?: string; lang?: string | null; children?: unknown[] }) {
      if (node.type === 'code') {
        const code = node.value!;
        const highlighted = highlightCode(code, node.lang ? `language-${node.lang}` : undefined);
        if (highlighted) {
          const entities: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#x27;': "'", '&#39;': "'" };
          const text = highlighted.replace(/<[^>]*>/g, '').replace(/&(?:amp|lt|gt|quot|#x27|#39);/g, token => entities[token]);
          assert.equal(text, code, slug);
        }
        blocks++;
      }
      node.children?.forEach(child => visit(child as Parameters<typeof visit>[0]));
    }
    visit(tree);
  }
  assert.ok(blocks > 0);
});

test('HTML, GFM tables and inline code render without executable markup or invalid nesting', () => {
  const source = '## **Title**\n\n`a == b`\n\n<p><img src="https://example.com/a.png" onerror="alert(1)"></p>\n\n| A | B |\n| - | - |\n| 1 | 2 |\n\n<script>alert(1)</script>\n\n<a href="javascript:alert(1)">bad</a>';
  const html = renderToStaticMarkup(createElement(MdxRenderer, { source }));
  assert.ok(html.includes('<table>'));
  assert.ok(html.includes('<code>a == b</code>'));
  assert.ok(html.includes('id="title"'));
  assert.ok(html.includes('src="https://example.com/a.png"'));
  assert.ok(!html.includes('onerror='));
  assert.ok(!html.includes('<script'));
  assert.ok(!html.includes('href="javascript:'));
  assert.ok(!/<(?:p|pre)[^>]*>\s*<div/.test(html));
});

test('TOC ignores code fences, uses heading text, and disambiguates duplicate headings', () => {
  const contents = getPostContents('## **Title**\n\n```bash\n# not a heading\n```\n\n## Title\n\n## Title-1');
  assert.deepEqual(contents.map(item => item.id), ['title', 'title-1', 'title-1-1']);
  const html = renderToStaticMarkup(createElement(MdxRenderer, { source: '## **Title**\n\n## Title\n\n## Title-1' }));
  for (const { id } of contents) assert.ok(html.includes(`id="${id}"`));
});

test('image display metadata supplies context, dimensions and lazy loading without changing source', () => {
  const source = '## Deployment\n\n![image](https://velog.velcdn.com/images/kata/post/4039695f-ec35-43cf-882e-7a3a71671116/image.png)\n\n<img src="">';
  const html = renderToStaticMarkup(createElement(MdxRenderer, { source }));
  assert.ok(html.includes('alt="서버를 한 대씩 새 버전으로 교체하는 Rolling Update 네 단계"'));
  assert.ok(html.includes('loading="lazy"'));
  assert.ok(html.includes('width='));
  assert.ok(!html.includes('src=""'));
});


test('all source image URLs have reviewed descriptions outside the original body', () => {
  const metadata = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/shared/content/image-metadata.json'), 'utf8'));
  for (const file of fs.readdirSync(directory).filter(file => file.endsWith('.mdx'))) {
    const source = fs.readFileSync(path.join(directory, file), 'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
    const tree = unified().use(remarkParse).parse(source);
    const check = (url: string) => {
      if (!url) return;
      assert.ok(metadata[url]?.alt?.length >= 10, `${file}: ${url}`);
      assert.ok(Number.isFinite(Date.parse(metadata[url]?.altReviewedAt)), url);
      if (!metadata[url].unavailable) assert.ok(metadata[url].width > 0 && metadata[url].height > 0, url);
    };
    const visit = (node: { type: string; url?: string; value?: string; children?: unknown[] }) => {
      if (node.type === 'image') check(node.url!);
      if (node.type === 'html') for (const match of node.value!.matchAll(/<img\b[^>]*\bsrc=["']([^"']*)["']/gi)) check(match[1]);
      node.children?.forEach(child => visit(child as Parameters<typeof visit>[0]));
    };
    visit(tree);
  }
});

test('benchmark evidence contains its raw samples, source hashes and measured scope', () => {
  const report = benchmarkReport;
  assert.match(report.sourceCommit, /^[a-f0-9]{40}$/);
  assert.equal(report.sourceCheck.expectedCommit, report.sourceCommit);
  assert.equal(report.sourceCheck.cleanBackend, true);
  assert.equal(report.sourceCheck.remoteVerification.head, report.sourceCommit);
  assert.equal(report.sourceCheck.remoteVerification.ref, 'refs/heads/main');
  assert.ok(Number.isFinite(Date.parse(report.sourceCheck.remoteVerification.checkedAt)));
  for (const hash of Object.values(report.sourceHashes)) assert.match(String(hash), /^[a-f0-9]{64}$/);
  for (const state of [report.cold, report.warm]) {
    assert.equal(state.rawMs.length, state.samples);
    assert.ok(state.rawMs.every((value: number) => value >= 0 && Number.isFinite(value)));
    const sorted = [...state.rawMs].sort((a: number, b: number) => a - b);
    assert.equal(state.p95Ms, sorted[Math.ceil(state.samples * .95) - 1]);
  }
  assert.equal(report.providerCalls.warmTotal, 0);
  assert.equal(report.conditions.network, 'disabled');
  assert.ok(report.limitations.includes('Does not reproduce'));
});
