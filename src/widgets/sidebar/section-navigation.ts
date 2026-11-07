'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';

// 사이드바 목차(데스크톱)와 모바일 목차 버튼(mobile-section-menu.tsx)이 함께 쓰는 현재 위치 추적 · 이동.

function sectionScrollTop(section: HTMLElement) {
  const margin = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
  const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  return Math.min(maximum, Math.max(0, window.scrollY + section.getBoundingClientRect().top - margin - padding));
}

/** ids: 화면 위에서부터의 영역 id 목록(바뀌지 않는 값). active: 지금 보고 있는 영역, navigate: 목차 링크 클릭 처리. */
export function useSectionNavigation(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);
  const navigationTarget = useRef<{ id: string; top: number; arrived: boolean } | null>(null);

  const navigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const section = document.getElementById(id);
    if (!section) return;

    event.preventDefault();
    const top = sectionScrollTop(section);
    navigationTarget.current = { id, top, arrived: Math.abs(window.scrollY - top) <= 2 };
    setActive(id);
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, '', `#${id}`);
    }
    // Scroll the document explicitly, independently of the sticky sidebar's scroll container.
    window.scrollTo({
      top,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  useEffect(() => {
    if (ids.length === 0) return;

    const updateActive = () => {
      const target = navigationTarget.current;
      if (target) {
        const arrived = Math.abs(window.scrollY - target.top) <= 2;
        if (!target.arrived || arrived) {
          target.arrived = arrived;
          setActive(target.id);
          return;
        }
        navigationTarget.current = null;
      }
      // 페이지 최상단에서는 첫 섹션을 활성화 (화면이 높아 다음 섹션이 기준선 위에 있어도)
      if (window.scrollY <= 2) {
        setActive(ids[0]);
        return;
      }
      // 페이지 최하단 도달 시 마지막 섹션을 강제로 활성화
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        setActive(ids[ids.length - 1]);
        return;
      }
      // 뷰포트 35% 기준선을 지난 '마지막' 섹션을 활성화.
      // 섹션 높이·경계와 무관하게 항상 정확히 하나만 선택되어 흔들리지 않는다.
      const line = window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    // 스크롤은 rAF로 스로틀
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    };

    const releaseNavigation = () => {
      navigationTarget.current = null;
      updateActive();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) releaseNavigation();
    };
    const onHashChange = () => {
      const id = window.location.hash.slice(1);
      const section = ids.includes(id) ? document.getElementById(id) : null;
      navigationTarget.current = section ? { id, top: sectionScrollTop(section), arrived: false } : null;
      updateActive();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', releaseNavigation, { passive: true });
    window.addEventListener('touchstart', releaseNavigation, { passive: true });
    window.addEventListener('pointerdown', releaseNavigation, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('hashchange', onHashChange);
    onHashChange();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', releaseNavigation);
      window.removeEventListener('touchstart', releaseNavigation);
      window.removeEventListener('pointerdown', releaseNavigation);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [ids]);

  return { active, navigate };
}
