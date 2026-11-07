import type { MetadataRoute } from 'next';
import { getPosts } from '@/shared/lib/markdown';
import { baseUrl } from '@/shared/config/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = (await getPosts()).map(post => ({
    url: `${baseUrl}/posts/${encodeURIComponent(post.slug)}`,
    lastModified: post.metadata.updatedAt || post.metadata.publishedAt,
  }));
  // 글 목록은 가장 최근에 수정된 글의 날짜를 쓴다.
  // 홈·개인정보 안내는 내용이 바뀐 날을 알 수 없으므로 lastModified를 넣지 않는다(매번 바뀌는 날짜는 넣지 않음).
  const latest = blogs.map(blog => blog.lastModified).filter(Boolean).sort((a, b) => Date.parse(b) - Date.parse(a))[0];
  return [{ url: baseUrl }, { url: `${baseUrl}/posts`, ...(latest ? { lastModified: latest } : {}) }, ...blogs];
}
