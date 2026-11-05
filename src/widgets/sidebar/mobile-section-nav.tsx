'use client';

import { useEffect, useRef } from 'react';
import { navItems } from '@/shared/data/site-data';
import { useSectionNavigation } from './section-navigation';

// 2026-11-04: 모바일 · 태블릿(1024px 미만)은 사이드바 목차가 보이지 않아 긴 페이지를 스크롤로만 움직였다.
// about 영역 위에 영역 파일 이름을 VS Code 탭 줄 모양으로 두고, 스크롤하면 화면 맨 위에 붙어 따라온다.
// 지금 보고 있는 영역 탭을 사이드바 목차와 같은 기준으로 강조하고, 탭을 누르면 그 영역으로 바로 이동한다.
// 2026-11-05: 라이트 테마에서는 탭 줄 바탕이 페이지 바탕(#f8f8f8)과 같아 위에도 경계선을 둔다.
// 키보드로 위로 이동할 때 요소가 이 줄 뒤에 숨지 않도록 global.css가 1024px 미만 홈의 위쪽 스크롤 여백을 늘린다(.mobile-section-nav).
const sectionIds = navItems.map(item => item.id);

export default function MobileSectionNav() {
  const { active, navigate } = useSectionNavigation(sectionIds);
  const list = useRef<HTMLUListElement>(null);

  // 지금 영역 탭이 가로 목록 가운데쯤 보이도록 옆으로만 스크롤한다(페이지 세로 위치는 건드리지 않는다).
  useEffect(() => {
    const container = list.current;
    const tab = container?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!container || !tab) return;
    const left = Math.max(0, tab.offsetLeft - (container.clientWidth - tab.offsetWidth) / 2);
    container.scrollTo({ left, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }, [active]);

  return (
    <nav aria-label='포트폴리오 목차' className='mobile-section-nav sticky top-0 z-20 -mx-6 mt-8 border-t border-line bg-surface-2 md:-mx-12 lg:hidden'>
      <ul ref={list} className='relative flex overflow-x-auto overflow-y-hidden border-b border-line px-6 font-code text-[12px] [scrollbar-width:none] md:px-12 [&::-webkit-scrollbar]:hidden'>
        {navItems.map(item => {
          const on = active === item.id;
          return (
            <li key={item.id} className='shrink-0'>
              <a
                href={`/#${item.id}`}
                onClick={event => navigate(event, item.id)}
                aria-current={on ? 'location' : undefined}
                className={`-mb-px block border-t-2 px-3 py-2 transition-colors focus-visible:-outline-offset-2 ${on ? 'border-tab bg-surface text-fg-strong' : 'border-transparent text-fg hover:text-accent'}`}
              >
                {item.file}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
