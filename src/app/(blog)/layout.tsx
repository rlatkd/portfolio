import '/styles/global.css';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '@/features/ThemeToggle/ThemeToggle';
import Footer from '@/widgets/Footer/footer';
import ScrollToTop from '@/shared/ui/scroll-to-top';

type LayoutProps = {
  children: React.ReactNode;
};

export default function BlogLayout({ children }: LayoutProps) {
  return (
    <>
      {/* 상단 고정 헤더 — 홈 복귀 + 테마 토글 */}
      <header className='sticky top-0 z-40 border-b border-line bg-bg'>
        <div className='mx-auto flex max-w-content items-center justify-between px-5 py-4 md:px-8'>
          <Link
            href='/'
            aria-label='포트폴리오로'
            className='group inline-flex items-center text-fg-strong transition-colors hover:text-accent'
          >
            <ArrowLeft size={18} className='transition-transform group-hover:-translate-x-0.5' />
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {children}

      <Footer />
      <ScrollToTop />
    </>
  );
}
