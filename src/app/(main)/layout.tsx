import '/styles/global.css';
import Sidebar from '@/widgets/Sidebar/sidebar';
import Footer from '@/widgets/Footer/footer';
import { ViewProvider } from '@/shared/ui/view-context';
import ScrollToTop from '@/shared/ui/scroll-to-top';
import { getPosts } from '@/shared/lib/markdown';

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const posts = await getPosts();
  const recent = posts
    .sort((a, b) => b.metadata.index - a.metadata.index)
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.metadata.title ?? '',
      category: p.metadata.category ?? '',
      publishedAt: p.metadata.publishedAt ?? '',
    }));

  return (
    <ViewProvider>
      <div className='mx-auto max-w-6xl px-6 md:px-12 lg:flex lg:justify-between lg:gap-16 lg:px-16'>
        <Sidebar recent={recent} />
        <main className='lg:w-[52%]'>{children}</main>
      </div>
      <Footer />
      <ScrollToTop />
    </ViewProvider>
  );
}
