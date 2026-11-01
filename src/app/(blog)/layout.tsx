import { DocumentShell, DocumentHeader } from '@/shared/ui/document-layout';
import { BlogHeaderAction } from './blog-header-action';
import Footer from '@/widgets/footer/footer';
import styles from './blog-document.module.css';

type LayoutProps = {
  children: React.ReactNode;
};

export default function BlogLayout({ children }: LayoutProps) {
  return (
    <DocumentShell>
      <DocumentHeader><BlogHeaderAction /></DocumentHeader>

      <main id='main-content' className={styles.document}>
        {children}
      </main>

      <div className='mx-auto w-full max-w-[794px] text-center'>
        <Footer />
      </div>
    </DocumentShell>
  );
}
