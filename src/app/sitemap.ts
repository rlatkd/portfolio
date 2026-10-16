import type { MetadataRoute } from 'next';
import { getPosts } from '@/shared/lib/markdown';
import { baseUrl } from '@/shared/config/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = (await getPosts()).map(post => ({
    url: `${baseUrl}/posts/${encodeURIComponent(post.slug)}`,
    lastModified: post.metadata.updatedAt || post.metadata.publishedAt,
  }));
  // Do not claim a daily modification when the page has not changed.
  return [{ url: baseUrl }, { url: `${baseUrl}/posts` }, ...['resume', 'privacy', 'evidence'].map(route => ({ url: `${baseUrl}/${route}` })), ...blogs];
}
