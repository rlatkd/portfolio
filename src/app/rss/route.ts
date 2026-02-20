import { baseUrl } from '@/app/sitemap';
import { getPosts } from '@/shared/lib/markdown';

// baseURL/rss

export async function GET() {
  let allBlogs = await getPosts()

  const itemsXml = allBlogs
    .sort((a, b) => {
      const dateA = a.metadata.publishedAt ? new Date(a.metadata.publishedAt) : new Date(0);
      const dateB = b.metadata.publishedAt ? new Date(b.metadata.publishedAt) : new Date(0);
      if (dateA > dateB) {
        return -1
      }
      return 1
    })
    .map(
      (post) =>
        `<item>
          <title>${post.metadata.title}</title>
          <link>${baseUrl}/posts/${post.metadata.index}</link>
          <description>${post.metadata.summary || ''}</description>
          <pubDate>${post.metadata.publishedAt ? new Date(
            post.metadata.publishedAt
          ).toUTCString() : ''}</pubDate>
        </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version='1.0' encoding='UTF-8' ?>
  <rss version='2.0'>
    <channel>
        <title>shk</title>
        <link>${baseUrl}</link>
        <description>sanghunkim</description>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
