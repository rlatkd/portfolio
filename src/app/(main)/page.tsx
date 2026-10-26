import About from '@/widgets/About/about';
import Experience from '@/widgets/Experience/experience';
import Projects from '@/widgets/Projects/projects';
import Writing from '@/widgets/Writing/writing';
import Contact from '@/widgets/Contact/contact';
import Footer from '@/widgets/Footer/footer';
import { getPosts } from '@/shared/lib/markdown';
import { serializeJsonLd } from '@/shared/lib/seo';
import { profile } from '@/shared/data/site-data';
import { baseUrl, authorId } from '@/shared/config/site';

export const revalidate = 86400;

export const metadata = {
  alternates: { canonical: '/' },
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
