import { getPosts } from 'app/(main)/utils/mdx'
import { MetadataRoute } from 'next'

// TODO
// baseUrl 수정
export const baseUrl = 'https://portfolio-blog-starter.vercel.app'

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
