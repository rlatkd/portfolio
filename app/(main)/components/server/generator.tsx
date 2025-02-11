import { getPosts } from "app/(main)/utils/mdx"

// TODO 블로그 제네레이터 다시 수정
const baseUrl = 'localhost:3000'

export async function generateStaticParams() {
  let posts = getPosts()

  return posts.map((post) => ({
    slug: post.metadata.index.toString(),
  }))
}

export function generateMetadata({ params }) {
  let post = getPosts().find((post) => post.metadata.index.toString() === params.slug)
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/posts/${post.metadata.index}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

// export async function getViewCount(): Promise<
//   { slug: string; count: number }[]
// > {

//   if (!process.env.POSTGRES_URL) {
//     return [];
//   }

//   const { rows } = await sql `
//     SELECT slug, count
//     FROM views
//   `
//   return rows.map(row => ({
//     slug: row.slug,
//     count: row.count
//   }));
// }