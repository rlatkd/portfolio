import Sidebar from '@/widgets/sidebar/sidebar';
import MobileSectionNav from '@/widgets/sidebar/mobile-section-nav';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* 왼쪽 고정 소개(38%) · 오른쪽 파일 영역(58%). 2026-11-04: 틀 폭 · 안쪽 여백은 떠 있는 버튼 위치 계산과 같은 변수(global.css)를 쓴다. */}
      <div className='mx-auto w-full max-w-[var(--home-width)] px-6 md:px-[var(--home-gutter)] lg:grid lg:grid-cols-[38%_58%] lg:justify-between [overflow-wrap:break-word] [word-break:keep-all]'>
        <Sidebar />
        {/* 2026-11-04: 모바일 · 태블릿 영역 탭 줄(about 위, 스크롤하면 화면 맨 위에 고정). 데스크톱에서는 숨겨 격자 칸을 차지하지 않는다. */}
        <MobileSectionNav />
        {/* 데스크톱 아래 여백 = 가림 높이 - 하단 문구 아래 여백(16px): 맨 아래로 스크롤하면 하단 문구 아래 끝이 사이드바 아이콘 아래 끝과 맞는다. */}
        <main id='main-content' className='min-w-0 space-y-10 pb-16 pt-10 lg:pb-[calc(var(--bottom-mask)_-_1rem)] lg:pt-20'>{children}</main>
      </div>
      {/* 2026-11-02: 데스크톱에서 사이드바 아이콘 아래 끝 높이 밑으로는 스크롤되는 오른쪽 본문을 가린다(높이는 global.css --bottom-mask) */}
      <div aria-hidden='true' className='portfolio-bottom-mask fixed inset-x-0 bottom-0 z-30 hidden bg-bg lg:block' />
    </>
  );
}
