import About from '@/widgets/about/about';
import Experience from '@/widgets/experience/experience';
import Projects from '@/widgets/projects/projects';
import Writing from '@/widgets/writing/writing';
import Contact from '@/widgets/contact/contact';
import Footer from '@/widgets/footer/footer';
import { getPosts } from '@/shared/lib/markdown';
import { serializeJsonLd } from '@/shared/lib/seo';
import { profile } from '@/shared/data/site-data';
import { skills } from '@/shared/data/resume-data';
import { baseUrl, authorId } from '@/shared/config/site';

export const revalidate = 86400;

export const metadata = {
  // sitemap과 같은 슬래시 없는 주소를 canonical로 쓴다.
  alternates: { canonical: baseUrl },
};

export default async function Page() {
  const posts = await getPosts();
  const recent = [...posts]
    .sort((a, b) => Date.parse(b.metadata.publishedAt) - Date.parse(a.metadata.publishedAt) || b.metadata.index - a.metadata.index)
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.metadata.title ?? '',
      category: p.metadata.category ?? '',
      publishedAt: p.metadata.publishedAt ?? '',
      summary: p.metadata.summary ?? '',
    }));

  return (
    <>
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
            email: `mailto:${profile.email}`,
            worksFor: { '@type': 'Organization', name: '효성에프엠에스' },
            alumniOf: [
              { '@type': 'CollegeOrUniversity', name: '성균관대학교' },
              { '@type': 'CollegeOrUniversity', name: '경희대학교' },
            ],
            knowsAbout: skills.filter(group => !['AI', 'Collaboration'].includes(group.label)).flatMap(group => group.items.filter(item => item.work).map(item => item.name)),
            sameAs: [profile.github, profile.linkedin, profile.velog],
          }),
        }}
      />
      <About />
      <Experience />
      <Projects />
      <Writing posts={recent} />
      <Contact />
      <Footer />

    </>
  );
}
