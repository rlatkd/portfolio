import { baseUrl } from '@/shared/config/site';
import { getPosts } from '@/shared/lib/markdown';
import { escapeXml } from '@/shared/lib/seo';
export const dynamic = 'force-static';

export async function GET() {
  const posts = [...await getPosts()].sort((a, b) => Date.parse(b.metadata.publishedAt) - Date.parse(a.metadata.publishedAt));
  const items = posts.map(post => {
    const url = escapeXml(`${baseUrl}/posts/${encodeURIComponent(post.slug)}`);
    return `<item><title>${escapeXml(post.metadata.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(post.metadata.summary)}</description><pubDate>${new Date(`${post.metadata.publishedAt}T00:00:00+09:00`).toUTCString()}</pubDate></item>`;
  }).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>김상훈 · Writing</title><link>${escapeXml(baseUrl)}</link><description>개발, 설계, 경험에 대한 기록.</description><language>ko-KR</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
