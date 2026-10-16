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
import descriptions from '../src/shared/content/seo-descriptions.json';

const directory = path.join(process.cwd(), 'src/shared/content/posts');
test('all 50 Velog bodies remain unchanged and have valid SEO/source metadata', () => {
  assert.equal(Object.keys(sources).length, 50);
  for (const [slug, source] of Object.entries(sources)) {
    const file = fs.readFileSync(path.join(directory, slug + '.mdx'), 'utf8');
    const body = file.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim();
    assert.equal(createHash('sha256').update(body).digest('hex'), source.bodySha256, slug);
    assert.ok(Number.isFinite(Date.parse(source.updatedAt)), slug);
    assert.equal(new URL(source.url).hostname, 'velog.io');
    assert.ok((descriptions as Record<string, string>)[slug]?.length > 20, slug);
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
  assert.equal(blocks, 96);
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
