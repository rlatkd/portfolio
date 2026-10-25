import Sidebar from '@/widgets/Sidebar/sidebar';
import ScrollToTop from '@/shared/ui/scroll-to-top';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* 왼쪽 고정 소개(42%) · 오른쪽 본문(52%) */}
      <div className='mx-auto w-full max-w-[1152px] px-6 md:px-12 lg:grid lg:grid-cols-[42%_52%] lg:justify-between [overflow-wrap:break-word] [word-break:keep-all]'>
        <Sidebar />
        <main id='main-content' className='min-w-0 pt-14 lg:pb-16 lg:pt-24'>{children}</main>
      </div>
      <ScrollToTop />
    </>
  );
}
