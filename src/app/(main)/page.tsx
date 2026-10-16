import About from '@/widgets/About/about';
import Strengths from '@/widgets/Strengths/strengths';
import Experience from '@/widgets/Experience/experience';
import Projects from '@/widgets/Projects/projects';
import Writing from '@/widgets/Writing/writing';
import Contact from '@/widgets/Contact/contact';
import { getPosts } from '@/shared/lib/markdown';
import { serializeJsonLd } from '@/shared/lib/seo';
import { profile } from '@/shared/data/site-data';
import { baseUrl, authorId } from '@/shared/config/site';
import { featuredPostSlugs } from '@/shared/config/writing';

export const revalidate = 86400;

export const metadata = {
  alternates: { canonical: '/' },
};

export default async function Page() {
  const posts = await getPosts();
  const recent = featuredPostSlugs.map(slug => {
    const post = posts.find(post => post.slug === slug);
    if (!post) throw new Error(`Featured post not found: ${slug}`);
    return post;
  })
    .map((p) => ({
      slug: p.slug,
      title: p.metadata.title ?? '',
      category: p.metadata.category ?? '',
      publishedAt: p.metadata.publishedAt ?? '',
      summary: p.metadata.summary ?? '',
    }));

  return (
    <div className='lg:pt-24'>
      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': authorId,
            name: profile.name,
            alternateName: profile.nameEn,
            jobTitle: profile.role,
            url: baseUrl,
            sameAs: [profile.github, profile.linkedin, profile.velog],
          }),
        }}
      />
      <About />
      <Strengths />
      <Experience />
      <Projects />
      <Writing posts={recent} />
      <Contact />

      {/* 하단 가림막 — 좌측 사이드바 하단(뷰포트 바닥 6rem)에 맞춰 콘텐츠 가림 */}
      <div aria-hidden className='pointer-events-none sticky bottom-0 z-20 hidden h-24 bg-bg lg:block' />
    </div>
  );
}
