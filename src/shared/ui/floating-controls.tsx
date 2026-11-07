'use client';

import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/features/theme-toggle/theme-toggle';
import ScrollToTop from './scroll-to-top';

export function FloatingControls() {
  const pathname = usePathname();
  const showScroll = pathname === '/' || pathname === '/posts' || pathname.startsWith('/posts/');
  // 이력서는 흰 종이 문서라 테마 전환이 필요 없고, 모바일에서 보기 도구 막대의 버튼을 가리므로 숨긴다.
  if (pathname.startsWith('/resume')) return null;

  // 버튼은 창 맨 오른쪽이 아니라 각 페이지 본문 영역 오른쪽 옆에 둔다(global.css .portfolio-floating · .document-floating).
  // 홈 데스크톱은 화면 아래 가림 띠 위까지만 쓰므로 버튼 아래 끝도 사이드바 아이콘 아래 끝 높이에 맞춘다.
  const place = pathname === '/' ? 'portfolio-floating' : pathname.startsWith('/posts') ? 'document-floating' : '';
  return <div className={`fixed bottom-6 right-[var(--floating-edge)] z-40 flex flex-col items-center gap-3 print:hidden ${place}`}>
    {showScroll && <ScrollToTop />}
    <ThemeToggle />
  </div>;
}
