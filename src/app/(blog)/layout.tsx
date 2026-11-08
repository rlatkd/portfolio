import { DocumentShell, DocumentHeader } from '@/shared/ui/document-layout';
import { BlogHeaderAction } from './blog-header-action';
import Footer from '@/widgets/footer/footer';
import { FloatingControls } from '@/shared/ui/floating-controls';
import styles from './blog-document.module.css';

type LayoutProps = {
  children: React.ReactNode;
};

export default function BlogLayout({ children }: LayoutProps) {
  return (
    <>
      <DocumentShell>
        <DocumentHeader><BlogHeaderAction /></DocumentHeader>

        <main id='main-content' className={styles.document}>
          {children}
        </main>

        <div className='mx-auto w-full max-w-[var(--document-width)] text-center'>
          <Footer />
        </div>
        {/* 홈처럼 데스크톱 화면 아래(떠 있는 버튼 아래 끝 높이 밑)를 가린다(global.css --bottom-mask). 목록·상세 공통 */}
        <div aria-hidden='true' className='portfolio-bottom-mask fixed inset-x-0 bottom-0 z-30 hidden bg-bg lg:block' />
      </DocumentShell>
      <FloatingControls showScroll place='document-floating' />
    </>
  );
}
