import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getPosts } from 'app/utils/mdx'
import { baseUrl } from 'app/utils/sitemap'
import { FaList } from 'react-icons/fa'
import Link from 'next/link'
import Navigation from 'app/components/server/navigation'

export async function generateStaticParams() {
  let posts = getPosts()

  return posts.map((post) => ({
    slug: post.metadata.index.toString(),
  }))
}

export function generateMetadata({ params }) {
  let post = getPosts().find((post) => post.metadata.index.toString() === params.slug)
  if (!post) {
    return
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

export default async function Blog({ params }) {
  let post = getPosts().find((post) => post.metadata.index.toString() === params.slug)
  // const views = await getViewCount();
  // const count = views.find((view) => view.slug === params.slug)?.count

  if (!post) {
    notFound()
  }

  const currentPost = post.metadata.index

  // JSON-LD; 검색 엔진 최적화
  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/posts/${post.metadata.index}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
       <div className="flex justify-between items-center">
        <h1 className="title font-semibold text-2xl tracking-tighter">
          {post.metadata.title}
        </h1>
        <Link href="/posts" className="flex items-center text-neutral-700 dark:text-neutral-200 hover:text-white">
          <FaList />
        </Link>
      </div>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm border-b border-b-gray-200">
        <p className="mb-8 text-sm text-neutral-600 dark:text-neutral-400 cursor-default">
          {formatDate(post.metadata.publishedAt)}
        </p>
        <p className="mb-8 text-sm text-neutral-600 dark:text-neutral-400 cursor-default">
          {/* {count} */}
          views
        </p>
      </div>
      <article className="prose w-4/6 mx-auto">
        <CustomMDX source={post.content} />
      </article>
      <Navigation currentPost={currentPost} />
    </section>
  )
}
