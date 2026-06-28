import { MetadataRoute } from 'next';
import { getPosts } from '@/shared/lib/markdown';

// 배포 도메인. 환경변수로 오버라이드 가능.
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.sanghunkim.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogs = (await getPosts()).map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ['', '/posts'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs];
}
