import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/markdown';

// TODO
// baseUrl 수정
export const baseUrl = 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogs = getPosts().map((post) => ({
    url: `${baseUrl}/posts/${post.metadata.index}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/posts'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
