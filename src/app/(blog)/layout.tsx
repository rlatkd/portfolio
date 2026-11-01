import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { BlogHeaderAction } from './blog-header-action';
import Footer from '@/widgets/footer/footer';
import styles from './blog-document.module.css';

type LayoutProps = {
  children: React.ReactNode;
};

export default function BlogLayout({ children }: LayoutProps) {
  return (
    <div className={styles.blog}>
      <header className='mx-auto mb-5 w-full max-w-[794px]'>
        <div className='flex h-[34px] items-center justify-between'>
          <Link
            href='/'
            aria-label='포트폴리오로'
            className='inline-flex items-center gap-2 text-sm text-muted hover:text-accent'
          >
            <ChevronLeft size={15} /> 포트폴리오
          </Link>
          <BlogHeaderAction />
        </div>
      </header>

      <main id='main-content' className={styles.document}>
        {children}
      </main>

      <div className='mx-auto w-full max-w-[794px] text-center'>
        <Footer />
      </div>
    </div>
  );
}
