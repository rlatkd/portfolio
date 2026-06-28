import { FaList } from 'react-icons/fa';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Comments from '@/features/CommentForm/CommentForm';
import { MdxRenderer } from '@/shared/markdown/mdx-renderer';
import PostRecommends from '@/features/PostRecommend/PostRecommend';
import Navigation from '@/entities/Post/ui/Navigation';
import { formatDate, getPosts } from '@/shared/lib/markdown';
import { baseUrl } from '@/app/sitemap';
import { TableOfContents } from '@/entities/Post/ui/TableOfContents';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};
  const description = post.metadata.summary || '';
  return {
    title: post.metadata.title,
    description,
    openGraph: {
      title: post.metadata.title,
      description,
      type: 'article',
      publishedTime: post.metadata.publishedAt,
      url: `${baseUrl}/posts/${post.slug}`,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const posts = await getPosts();
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) notFound();

  const currentPost = post.metadata.index;

  return (
    <section className='py-12 md:py-16'>
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
              : `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title || '')}`,
            url: `${baseUrl}/posts/${post.slug}`,
            author: { '@type': 'Person', name: 'Sanghun Kim' },
          }),
        }}
      />

      <div className='mx-auto max-w-content px-5 md:px-8'>
        <div className='flex items-center justify-between'>
          <h1 className='title font-serif text-3xl text-fg-strong md:text-4xl'>
            {post.metadata.title}
          </h1>
          <Link href='/posts' className='text-muted transition-colors hover:text-accent' aria-label='목록'>
            <FaList />
          </Link>
        </div>
        <div className='mb-10 mt-3 flex items-center justify-between border-b border-line pb-4 font-mono text-xs text-muted'>
          <span>{formatDate(post.metadata.publishedAt)}</span>
        </div>

        <article className='prose prose-lg w-full max-w-none'>
          <MdxRenderer source={post.content} />
        </article>

        {/* 데스크톱 TOC (넓은 화면 우측 여백) */}
        <div className='fixed top-28 right-8 hidden w-56 2xl:block'>
          <TableOfContents contents={post.tableContents} />
        </div>

        <Navigation currentPost={currentPost} />
      </div>

      <div className='mx-auto max-w-content px-5 md:px-8'>
        <Comments postId={currentPost.toString()} />
        <PostRecommends posts={posts} currentPostIndex={currentPost} />
      </div>
    </section>
  );
}
