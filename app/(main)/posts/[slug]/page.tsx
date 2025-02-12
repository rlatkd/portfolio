import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/(main)/components/mdx'
import { formatDate, getPosts } from 'app/(main)/utils/mdx'
import { baseUrl } from 'app/(main)/utils/sitemap'
import { FaBookmark, FaList } from 'react-icons/fa'
import Link from 'next/link'
import Navigation from 'app/(main)/components/server/navigation'

export default async function Page({ params }) {
  let post = getPosts().find((post) => post.metadata.index.toString() === params.slug)

  if (!post) notFound()
  
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
              name: 'kata',
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




      <div className="flex w-full h-32 gap-6 justify-center">
        <div className="relative flex items-center justify-center w-2/3 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Spring Boot</h2>
          <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-gray-400">
            <span className="text-sm">2/2</span>
            <button className="p-1 rounded-full border border-gray-300 hover:bg-gray-200">
              ←
            </button>
            <button className="p-1 rounded-full border border-gray-300 hover:bg-gray-200">
              →
            </button>
          </div>
        </div>
      </div>

        {/* 오른쪽 탭 */}
        {/* <div className="w-1/3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
          <h3 className="text-lg font-medium border-b pb-2 mb-2">개요</h3>
          <ul className="text-sm space-y-1">
            <li>@NoArgsConstructor</li>
            <li>@AllArgsConstructor</li>
            <li>@RequiredArgsConstructor</li>
            <li>staticName</li>
            <li>access</li>
            <li>force</li>
          </ul>
        </div> */}
      




      <article className="prose w-4/6 mx-auto">
        <CustomMDX source={post.content} />
      </article>
      <Navigation currentPost={currentPost} />
    </section>
  )
}
