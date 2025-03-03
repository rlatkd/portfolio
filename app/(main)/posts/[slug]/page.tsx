import { CustomMDX } from 'app/(main)/components/custom-mdx'
import { formatDate, getPosts } from 'app/(main)/utils/mdx'
import { baseUrl } from 'app/(main)/utils/sitemap'
import { FaList } from 'react-icons/fa'
import Link from 'next/link'
import Navigation from 'app/(main)/components/server/navigation'
import { TableOfContents } from 'app/(main)/components/client/posts/toc'
import { notFound } from 'next/navigation'
import Recommend from 'app/(main)/components/client/posts/recommend'

export default async function Page({ params }) {
  const posts = await getPosts(); // `getPosts`는 서버에서 데이터를 읽어옵니다.

  const post = posts.find((post) => post.metadata.index.toString() === params.slug);  
  if (!post) notFound();
  
  const currentPost = post.metadata.index
  console.log(currentPost)

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
          {/* {count} */}
          views
        </p>
      </div>


      <div className='flex justify-between'>



        {/* <div className="fixed  z-50 ml-[-20%] flex items-center justify-center w-1/4 h-32 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
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
        </div> */}



        <article className="prose w-4/6 m-auto">
          <CustomMDX source={post.content} />
        </article>



        <div className="fixed right-0 z-50 mr-[0%] flex items-center justify-center w-80 p-6">
          <TableOfContents contents={post.tableContents}></TableOfContents>
        </div>



      </div>
      <Navigation currentPost={currentPost} />

      <Recommend posts={posts} currentPostIndex={currentPost} />


    </section>
  )
}
