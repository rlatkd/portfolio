import fs from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';
import { getPostContents } from '@/shared/markdown/postContents';
import type { Post } from '@/shared/types/post';
import sources from '@/shared/content/velog-sources.json';

function parseFrontmatter(fileContent: string, fileName: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(fileContent);
  if (!match) throw new Error(`Missing frontmatter: ${fileName}`);
  const metadata: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) value = value.slice(1, -1);
    metadata[key] = value;
  }
  if (!metadata.title || !metadata.category || !metadata.publishedAt || !Number.isInteger(Number(metadata.index))) {
    throw new Error(`Invalid post metadata: ${fileName}`);
  }
  return { metadata, content: fileContent.slice(match[0].length).trim() };
}

async function readPosts(): Promise<Post[]> {
  const directory = path.join(process.cwd(), 'src/shared/content/posts');
  const files = (await fs.readdir(directory)).filter(file => file.endsWith('.mdx'));
  const posts = await Promise.all(files.map(async file => {
    const { metadata, content } = parseFrontmatter(await fs.readFile(path.join(directory, file), 'utf8'), file);
    const slug = path.basename(file, '.mdx').normalize('NFC');
    const source = (sources as Record<string, { url: string; updatedAt: string }>)[slug];
    return {
      metadata: {
        index: Number(metadata.index), title: metadata.title, category: metadata.category,
        publishedAt: metadata.publishedAt, summary: metadata.summary || '', image: metadata.image,
        updatedAt: source?.updatedAt || metadata.publishedAt, sourceUrl: source?.url,
      },
      slug, content, tableContents: getPostContents(content),
    };
  }));
  const indexes = new Set(posts.map(post => post.metadata.index));
  if (indexes.size !== posts.length) throw new Error('Duplicate post indexes');
  return posts.sort((a, b) => b.metadata.index - a.metadata.index);
}

let productionPosts: Promise<Post[]> | undefined;
export const getPosts = cache((): Promise<Post[]> => {
  if (process.env.NODE_ENV !== 'production') return readPosts();
  return productionPosts ??= readPosts();
});
