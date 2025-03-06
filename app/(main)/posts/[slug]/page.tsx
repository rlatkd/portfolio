import { formatDate, getPosts } from 'app/(main)/utils/mdx'
import { baseUrl } from 'app/(main)/utils/sitemap'
import { FaList } from 'react-icons/fa'
import Link from 'next/link'
import Navigation from 'app/(main)/components/server/navigation'
import { TableOfContents } from 'app/(main)/components/client/posts/toc'
import { notFound } from 'next/navigation'
import { Render } from 'app/(main)/components/mdx/render'

export default async function Page({ params }) {
  const posts = await getPosts();
  const post = posts.find((post) => post.metadata.index.toString() === params.slug);  
  
  if (!post) notFound();
  
  const currentPost = post.metadata.index;

  const relatedPosts = posts
    .filter((p) => p.metadata.index !== currentPost) // 현재 게시물 제외
    .sort(() => Math.random() - 0.5) // 배열 섞기
    .slice(0, 4); // 상위 4개 선택

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
        <h1 className="title font-semibold text-2xl tracking-tighter cursor-default">
          {post.metadata.title}
        </h1>
        <Link href="/posts" className="flex items-center text-neutral-700 dark:text-neutral-200 hover:text-neutral-400">
          <FaList />
        </Link>
      </div>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm border-b border-b-gray-200">
        <p className="mb-8 text-sm text-neutral-600 dark:text-neutral-400 cursor-default">
          {formatDate(post.metadata.publishedAt)}
        </p>
        <p className="mb-8 text-sm text-neutral-600 dark:text-neutral-400 cursor-default">
          views
        </p>
      </div>

      <div className='flex justify-between'>
        <article className="prose w-4/6 m-auto">
          <Render source={post.content} />
        </article>

        <div className="fixed right-0 z-50 mr-[0%] flex items-center justify-center w-80 p-6">
          <TableOfContents contents={post.tableContents}></TableOfContents>
        </div>
      </div>
      
      <Navigation currentPost={currentPost} />


      <section className="mt-12">
        <h2 className="text-xl font-semibold">추천 게시물</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {relatedPosts.map((p) => (
            <Link key={p.metadata.index} href={`/posts/${p.metadata.index}`} className="block p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <h3 className="text-lg font-semibold">{p.metadata.title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDate(p.metadata.publishedAt)}
              </p>
            </Link>
          ))}
        </div>
      </section>

    </section>
  )
}
