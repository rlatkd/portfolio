import fs from 'node:fs/promises';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
// Markdown AST provides image URLs; HTML URLs are collected from HTML nodes.
const directory = 'src/shared/content/posts';
const urls = new Map();
let empty = 0;
for (const file of await fs.readdir(directory)) {
  if (!file.endsWith('.mdx')) continue;
  const body = (await fs.readFile(path.join(directory, file), 'utf8')).replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  const tree = unified().use(remarkParse).use(remarkGfm).parse(body);
  const add = url => { if (!url) { empty++; return; } if (!urls.has(url)) urls.set(url, []); urls.get(url).push(file); };
  const visit = node => {
    if (node.type === 'image') add(node.url);
    if (node.type === 'html') for (const match of node.value.matchAll(/<img\b[^>]*\bsrc=["']([^"']*)["']/gi)) add(match[1]);
    node.children?.forEach(visit);
  };
  visit(tree);
}
const dimensions = b => {
  if (b.length >= 24 && b.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  if (b.length >= 10 && b.toString('ascii', 0, 3) === 'GIF') return { width: b.readUInt16LE(6), height: b.readUInt16LE(8) };
  if (b[0] === 255 && b[1] === 216) {
    for (let i = 2; i + 9 < b.length;) {
      if (b[i] !== 255) { i++; continue; }
      const marker = b[i + 1];
      if ([192,193,194,195,197,198,199,201,202,203,205,206,207].includes(marker)) return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
      const length = b.readUInt16BE(i + 2); if (length < 2) break; i += length + 2;
    }
  }
  return {};
};
const metadataPath = 'src/shared/content/image-metadata.json';
const metadata = JSON.parse(await fs.readFile(metadataPath, 'utf8'));
const failures = [];
const queue = [...urls];
await Promise.all(Array.from({ length: 4 }, async () => {
  for (;;) {
    const item = queue.shift(); if (!item) break;
    const [url, files] = item;
    try {
      if (!url.startsWith('https://')) throw new Error('Expected HTTPS image');
      const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
      if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`HTTP ${response.status}: ${response.headers.get('content-type')}`);
      const reader = response.body.getReader(); const chunks = []; let size = 0;
      while (size < 262144) { const { done, value } = await reader.read(); if (done) break; chunks.push(value); size += value.length; }
      await reader.cancel();
      metadata[url] = { ...(metadata[url]?.alt ? { alt: metadata[url].alt, altReviewedAt: metadata[url].altReviewedAt } : {}), ...dimensions(Buffer.concat(chunks)), checkedAt: new Date().toISOString().slice(0,10) };
    } catch (error) { failures.push({ url, files, error: error.message }); }
  }
}));
if (process.argv.includes('--write')) await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2) + '\n');
console.log(JSON.stringify({ uniqueImages: urls.size, emptySourceImages: empty, failures, dimensions: Object.values(metadata).filter(item => item.width).length }, null, 2));
if (failures.length) process.exitCode = 1;
