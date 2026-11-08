import { ThemeToggle } from '@/features/theme-toggle/theme-toggle';
import ScrollToTop from './scroll-to-top';

type FloatingControlsProps = {
  showScroll?: boolean;
  place?: 'portfolio-floating' | 'document-floating' | '';
};

// 구성은 주소(usePathname)로 정하지 않고 각 레이아웃이 넘긴다. 서버가 읽는 주소가 브라우저와 다르면 하이드레이션이 실패해 테마까지 풀린다.
// 버튼은 창 맨 오른쪽이 아니라 각 페이지 본문 영역 오른쪽 옆에 둔다(global.css .portfolio-floating · .document-floating).
// 홈 데스크톱은 화면 아래 가림 띠 위까지만 쓰므로 버튼 아래 끝도 사이드바 아이콘 아래 끝 높이에 맞춘다.
export function FloatingControls({ showScroll = false, place = '' }: FloatingControlsProps) {
  return <div className={`fixed bottom-6 right-[var(--floating-edge)] z-40 flex flex-col items-center gap-3 print:hidden ${place}`}>
    {showScroll && <ScrollToTop />}
    <ThemeToggle />
  </div>;
}
