import type { Metadata } from 'next';
import { FaList } from 'react-icons/fa';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MdxRenderer } from '@/shared/markdown/mdx-renderer';
import PostRecommends from '@/features/PostRecommend/PostRecommend';
import Navigation from '@/entities/Post/ui/Navigation';
import { getPosts } from '@/shared/lib/markdown';
import { dateFormatter } from '@/shared/utils/dateFormatter';
import { baseUrl, authorId } from '@/shared/config/site';
import { getPostDescription, getPostTitle, getPostImage, serializeJsonLd } from '@/shared/lib/seo';
import { TableOfContents } from '@/entities/Post/ui/TableOfContents';
import { Suspense } from 'react';
import { ListingReturn } from '@/features/PostRecommend/ListingReturn';
import { relatedPosts } from '@/shared/content/related-posts';

type Props = { params: Promise<{ slug: string }> };
function resolveSlug(raw: string) {
  try { return decodeURIComponent(raw).normalize('NFC'); }
  catch { return raw.normalize('NFC'); }
}
export async function generateStaticParams() {
  return (await getPosts()).map(post => ({ slug: post.slug }));
}
export const revalidate = 86400;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = resolveSlug((await params).slug);
  const post = (await getPosts()).find(post => post.slug === slug);
  if (!post) notFound();
  const title = getPostTitle(post);
  const description = getPostDescription(post);
  const image = getPostImage(post);
  return {
    title, description,
    authors: [{ name: '김상훈', url: baseUrl }],
    alternates: { canonical: `/posts/${encodeURIComponent(post.slug)}` },
    openGraph: {
      title, description, type: 'article',
      publishedTime: post.metadata.publishedAt, modifiedTime: post.metadata.updatedAt,
      url: `${baseUrl}/posts/${encodeURIComponent(post.slug)}`,
      siteName: '김상훈', locale: 'ko_KR', images: [{ url: image, alt: post.metadata.title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function Page({ params }: Props) {
  const slug = resolveSlug((await params).slug);
  const posts = await getPosts();
  const post = posts.find(post => post.slug === slug);
  if (!post) notFound();
  const currentPost = post.metadata.index;
  const related = relatedPosts[slug] || [];
  const recommendations = posts.filter(other => other.slug !== slug)
    .sort((a, b) => {
      const rank = (key: string) => related.includes(key) ? related.length - related.indexOf(key) : 0;
      return rank(b.slug) - rank(a.slug) || Number(b.metadata.category === post.metadata.category) - Number(a.metadata.category === post.metadata.category) || b.metadata.index - a.metadata.index;
    })
    .slice(0, 3).map(({ slug, metadata }) => ({ slug, metadata }));

  return (
    <section className='min-w-0 py-12 md:py-16'>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: serializeJsonLd({
        '@context': 'https://schema.org', '@type': 'BlogPosting',
        '@id': `${baseUrl}/posts/${encodeURIComponent(post.slug)}#article`,
        headline: post.metadata.title, datePublished: post.metadata.publishedAt,
        dateModified: post.metadata.updatedAt, description: getPostDescription(post),
        image: getPostImage(post), url: `${baseUrl}/posts/${encodeURIComponent(post.slug)}`,
        mainEntityOfPage: `${baseUrl}/posts/${encodeURIComponent(post.slug)}`,
        author: { '@type': 'Person', '@id': authorId, name: '김상훈', alternateName: 'Sanghun Kim', url: baseUrl },
        inLanguage: 'ko-KR',
      }) }} />
      <div className='mx-auto max-w-content px-5 md:px-8'>
        <div className='flex items-center justify-between gap-3'>
          <h1 className='title font-serif text-3xl text-fg-strong md:text-4xl'>{post.metadata.title}</h1>
          <Suspense fallback={<Link href='/posts' className='shrink-0 p-3' aria-label='목록'><FaList /></Link>}><ListingReturn /></Suspense>
        </div>
        <div className='mb-10 mt-3 flex items-center justify-between border-b border-line pb-4 font-mono text-xs text-muted'>
          <time dateTime={post.metadata.publishedAt}>{dateFormatter(post.metadata.publishedAt)}</time>
        </div>
        {post.tableContents.length > 0 && <details className='mb-8 rounded-lg border border-line bg-surface p-4 2xl:hidden'>
          <summary className='cursor-pointer font-semibold text-fg-strong'>이 글의 목차</summary>
          <nav aria-label='본문 목차' className='mt-3 max-h-72 overflow-y-auto'><ul className='space-y-2'>
            {post.tableContents.map(heading => <li key={heading.id} style={{ paddingLeft: `${Math.max(0, heading.level - 2) * 12}px` }}><a href={`#${heading.id}`} className='block py-1 text-sm text-muted hover:text-accent'>{heading.text}</a></li>)}
          </ul></nav>
        </details>}
        <article className='prose prose-lg w-full min-w-0 max-w-none'><MdxRenderer source={post.content} /></article>
        <div className='fixed top-28 right-8 hidden w-56 2xl:block'><TableOfContents contents={post.tableContents} /></div>
        <Navigation currentPost={currentPost} />
      </div>
      <div className='mx-auto max-w-content px-5 md:px-8'><PostRecommends posts={recommendations} /></div>
    </section>
  );
}
