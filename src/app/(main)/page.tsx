import About from '@/widgets/About/about';
import Strengths from '@/widgets/Strengths/strengths';
import Experience from '@/widgets/Experience/experience';
import Projects from '@/widgets/Projects/projects';
import Skills from '@/widgets/Skills/skills';
import Contact from '@/widgets/Contact/contact';
import HomeView from '@/widgets/HomeView/home-view';
import BlogList from '@/widgets/BlogList/blog-list';
import { getPosts } from '@/shared/lib/markdown';

export const metadata = {
  alternates: { canonical: '/' },
};

export default async function Page() {
  const posts = await getPosts();
  const blogPosts = posts
    .sort((a, b) => b.metadata.index - a.metadata.index)
    .map((p) => ({
      slug: p.slug,
      title: p.metadata.title ?? '',
      category: p.metadata.category ?? '',
      publishedAt: p.metadata.publishedAt ?? '',
      summary: p.metadata.summary ?? '',
    }));

  return (
    <HomeView
      portfolio={
        <>
          <About />
          <Strengths />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </>
      }
      blog={<BlogList posts={blogPosts} />}
    />
  );
}
