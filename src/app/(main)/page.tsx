import About from '@/widgets/About/about';
import Strengths from '@/widgets/Strengths/strengths';
import Experience from '@/widgets/Experience/experience';
import Projects from '@/widgets/Projects/projects';
import Writing from '@/widgets/Writing/writing';
import Contact from '@/widgets/Contact/contact';
import { getPosts } from '@/shared/lib/markdown';

export const metadata = {
  alternates: { canonical: '/' },
};

export default async function Page() {
  const posts = await getPosts();
  const recent = posts
    .sort((a, b) => b.metadata.index - a.metadata.index)
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.metadata.title ?? '',
      category: p.metadata.category ?? '',
      publishedAt: p.metadata.publishedAt ?? '',
      summary: p.metadata.summary ?? '',
    }));

  return (
    <div className='lg:pt-24'>
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
