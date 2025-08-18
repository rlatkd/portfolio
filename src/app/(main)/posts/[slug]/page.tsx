import { FaList } from 'react-icons/fa';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Comments from '@/components/posts/comments';
import { MdxRenderer } from '@/components/markdown/mdx-renderer';
import PostRecommends from '@/components/posts/post-recommend';
import Navigation from '@/components/posts/navigation';
import { formatDate, getPosts } from '@/shared/lib/markdown';
import { baseUrl } from '@/shared/utils/sitemap';
import { TableOfContents } from '@/components/posts/table-of-contents';

export default async function Page({ params }) {
  const posts = await getPosts();
  const post = posts.find((post) => post.slug === params.slug);  
  
  if (!post) notFound();
  
  const currentPost = post.metadata.index;

  return (
    <section>
      <script
        type='application/ld+json'
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
              name: 'shk',
            },
          }),
        }}
      />
      <div className='flex justify-between items-center w-4/6 mx-auto'>
        <h1 className='title font-semibold text-2xl tracking-tighter cursor-default'>
          {post.metadata.title}
        </h1>
        <Link href='/posts' className='flex items-center text-neutral-700 dark:text-neutral-200 hover:text-neutral-400'>
          <FaList />
        </Link>
      </div>
      <div className='flex justify-between items-center mt-2 text-sm w-4/6 mx-auto'>
        <p className='mb-8 text-sm text-neutral-600 dark:text-neutral-400 cursor-default'>
          {formatDate(post.metadata.publishedAt)}
        </p>
        {/* TODO DataBase(RDB or NoSQL) 연결 필요 */}
        <p className='mb-8 text-sm text-neutral-600 dark:text-neutral-400 cursor-default'>
          views
        </p>
      </div>
      <div className='flex justify-between'>
        <div className='w-4/6 '>
          <article className='prose prose-lg max-w-none w-full ml-[25%]'>
            <MdxRenderer source={post.content} />
          </article>
        </div>
        <div className='sticky top-20 self-start w-80 p-6 mr-[-15%]'>
          <TableOfContents contents={post.tableContents}></TableOfContents>
        </div>
      </div>
      <div className='w-4/6 mx-auto'>
        <Navigation currentPost={currentPost} />
      </div>
      <Comments postId={currentPost.toString()}/>
      <PostRecommends posts={posts} currentPostIndex={currentPost} />
    </section>
  )
}
