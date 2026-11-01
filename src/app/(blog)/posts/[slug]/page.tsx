import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MdxRenderer } from '@/shared/markdown/mdx-renderer';
import PostRecommend from '@/features/post-recommend/post-recommend';
import Navigation from '@/entities/post/ui/navigation';
import { getPosts } from '@/shared/lib/markdown';
import { dateFormatter } from '@/shared/utils/date-formatter';
import { baseUrl, authorId } from '@/shared/config/site';
import { getPostDescription, getPostTitle, getPostImage, serializeJsonLd } from '@/shared/lib/seo';
import { TableOfContents } from '@/entities/post/ui/table-of-contents';
import { relatedPosts } from '@/shared/content/related-posts';
import styles from '../../blog-document.module.css';

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
    <section className={`min-w-0 ${styles.detail}`}>
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
      <div className='min-w-0'>
        <header className={styles.pageHeader}>
          <h1 className='title min-w-0 flex-1 basis-64 text-fg-strong'>{post.metadata.title}</h1>
        <p className={styles.pageSubtitle}>
          <time dateTime={post.metadata.publishedAt}>{dateFormatter(post.metadata.publishedAt)}</time>
        </p>
        </header>
        <div className={styles.bodyLayout}>
        {post.tableContents.length > 0 && <aside className={styles.contents}><TableOfContents contents={post.tableContents} /></aside>}
        <article className={`prose prose-lg w-full min-w-0 max-w-none ${styles.article}`}><MdxRenderer source={post.content} /></article>
        </div>
        <Navigation currentPost={currentPost} />
      </div>
      <div className='min-w-0'><PostRecommend posts={recommendations} /></div>
    </section>
  );
}
