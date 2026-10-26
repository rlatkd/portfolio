import fs from 'node:fs/promises';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

const links = new Map();
for (const directory of ['src/shared/content/posts']) {
  for (const file of await fs.readdir(directory)) {
    if (!file.endsWith('.mdx')) continue;
    const body = (await fs.readFile(`${directory}/${file}`, 'utf8')).replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
    const visit = node => {
      if ((node.type === 'link' || node.type === 'definition') && /^https:\/\//.test(node.url)) {
        const url = new URL(node.url); url.hash = '';
        if (!links.has(url.href)) links.set(url.href, []);
        links.get(url.href).push(file);
      }
      node.children?.forEach(visit);
    };
    visit(unified().use(remarkParse).use(remarkGfm).parse(body));
  }
}
const results = [];
const queue = [...links];
await Promise.all(Array.from({ length: 3 }, async () => {
  for (;;) {
    const item = queue.shift(); if (!item) break;
    const [url, files] = item;
    try {
      let response = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(12000) });
      if ([404, 405].includes(response.status)) { response = await fetch(url, { signal: AbortSignal.timeout(12000) }); await response.body?.cancel(); }
      // BOJ returns 404 for all problem links in this environment; preserve the real status
      // and require human review rather than asserting that each problem was deleted.
      const providerReview = new URL(url).hostname === 'www.acmicpc.net' && response.status === 404;
      results.push({ url, files, status: response.status, result: response.ok ? 'ok' : providerReview ? 'review' : [404, 410].includes(response.status) ? 'broken' : 'review', ...(providerReview ? { note: 'Provider-wide 404 observed; verify in a regular browser.' } : {}) });
    } catch (error) { results.push({ url, files, result: 'review', error: error.message }); }
  }
}));
console.log(JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2));
if (results.some(item => item.result === 'broken')) process.exitCode = 1;
