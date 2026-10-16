import type { PostPreview } from '@/shared/types/post';
export const POSTS_PER_PAGE = 10;
export type PostSearchParams = Record<string, string | string[] | undefined>;
export function listingUrl(page: number, category?: string) {
  const query = new URLSearchParams();
  if (category) query.set('category', category);
  if (page > 1) query.set('page', String(page));
  return `/posts${query.size ? `?${query}` : ''}`;
}
export function parsePostQuery(query: PostSearchParams) {
  if (Array.isArray(query.page) || Array.isArray(query.category)) return null;
  const page = query.page === undefined ? 1 : Number(query.page);
  if ((query.page !== undefined && !/^[1-9]\d*$/.test(query.page)) || !Number.isSafeInteger(page)) return null;
  return { page, category: query.category?.toLowerCase() || undefined };
}
export function getPostListing<T extends PostPreview>(posts: T[], query: PostSearchParams) {
  const parsed = parsePostQuery(query);
  if (!parsed) return null;
  const categories = [...new Set(posts.map(post => post.metadata.category.toLowerCase()))];
  if (parsed.category && !categories.includes(parsed.category)) return null;
  const filtered = parsed.category ? posts.filter(post => post.metadata.category.toLowerCase() === parsed.category) : posts;
  const lastPage = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  if (parsed.page > lastPage) return null;
  return { ...parsed, categories, lastPage, posts: filtered.slice((parsed.page - 1) * POSTS_PER_PAGE, parsed.page * POSTS_PER_PAGE) };
}
