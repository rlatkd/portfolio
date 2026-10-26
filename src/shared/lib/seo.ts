import type { PostPreview } from '@/shared/types/post';
import titles from '@/shared/content/seo-titles.json';
import { baseUrl } from '@/shared/config/site';

export function getPostTitle(post: PostPreview) {
  return (titles as Record<string, string>)[post.slug] || post.metadata.title;
}
export function getPostDescription(post: PostPreview) {
  return post.metadata.summary;
}
export function getPostImage(post: PostPreview) {
  return post.metadata.image ? new URL(post.metadata.image, baseUrl).href
    : `${baseUrl}/api/og?title=${encodeURIComponent(post.metadata.title)}`;
}
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
export function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!);
}
