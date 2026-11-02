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
      {/* 2026-11-02: 데스크톱에서 사이드바 아이콘 아래 끝 높이 밑으로는 스크롤되는 오른쪽 본문을 가린다(높이는 global.css .portfolio-bottom-mask) */}
      <div aria-hidden='true' className='portfolio-bottom-mask fixed inset-x-0 bottom-0 z-30 hidden bg-bg lg:block' />
    </>
  );
}
