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
  const recommendations = posts.filter(other => other.slug !== slug)
    .sort((a, b) => Number(b.metadata.category === post.metadata.category) - Number(a.metadata.category === post.metadata.category) || b.metadata.index - a.metadata.index)
    .slice(0, 6).map(({ slug, metadata }) => ({ slug, metadata }));

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
          <Link href='/posts' className='shrink-0 text-muted transition-colors hover:text-accent' aria-label='목록'><FaList /></Link>
        </div>
        <div className='mb-10 mt-3 flex items-center justify-between border-b border-line pb-4 font-mono text-xs text-muted'>
          <time dateTime={post.metadata.publishedAt}>{dateFormatter(post.metadata.publishedAt)}</time>
        </div>
        <article className='prose prose-lg w-full min-w-0 max-w-none'><MdxRenderer source={post.content} /></article>
        <div className='fixed top-28 right-8 hidden w-56 2xl:block'><TableOfContents contents={post.tableContents} /></div>
        {post.metadata.sourceUrl && <p className='mt-8 text-sm text-muted'>
          <a href={post.metadata.sourceUrl} className='text-accent underline' target='_blank' rel='noopener noreferrer'>Velog 원문 보기</a>
          {' · '}원문 수정일 <time dateTime={post.metadata.updatedAt}>{dateFormatter(post.metadata.updatedAt || post.metadata.publishedAt)}</time>
        </p>}
        <Navigation currentPost={currentPost} />
      </div>
      <div className='mx-auto max-w-content px-5 md:px-8'><PostRecommends posts={recommendations} /></div>
    </section>
  );
}
