import Sidebar from '@/widgets/sidebar/sidebar';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* 왼쪽 고정 소개(38%) · 오른쪽 파일 영역(58%) */}
      <div className='mx-auto w-full max-w-[1152px] px-6 md:px-12 lg:grid lg:grid-cols-[38%_58%] lg:justify-between [overflow-wrap:break-word] [word-break:keep-all]'>
        <Sidebar />
        <main id='main-content' className='min-w-0 space-y-10 pb-16 pt-10 lg:py-20'>{children}</main>
      </div>
    </>
  );
}
