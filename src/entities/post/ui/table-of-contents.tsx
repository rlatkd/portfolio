'use client';
import { useEffect, useRef, useState } from 'react';
import type { PostHeading } from '@/shared/types/post';

export function TableOfContents({ contents }: { contents: PostHeading[] }) {
  const [section, setSection] = useState('');
  const [opacity, setOpacity] = useState(1);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
  // 2026-11-02: 넓은 화면에서 목차가 스크롤에 밀려 올라가지 않도록, 처음 보이던 높이를 고정 위치로 쓴다.
  const [stickyTop, setStickyTop] = useState<number | undefined>(undefined);
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      let active = '';
      for (const { id } of contents) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 81) active = id;
      }
      setSection(active);
      const navigationTop = document.getElementById('navigation')?.getBoundingClientRect().top ?? Infinity;
      setOpacity(Math.min(1, Math.max(0, 1 - (250 - navigationTop) / 200)));
      // 2026-11-01: 넓은 화면의 고정 목차는 화면 안에 들어오게 높이를 제한하고 넘치면 목차 안에서 스크롤한다.
      // 2026-11-02: 목차 칸(aside)이 문서에서 시작하는 높이 = 맨 위에서 보이는 위치. 그 자리에 고정하고,
      // 화면 아래 가림 띠(96px, 낮은 화면 45px) 위에서 끝나게 한다.
      const wide = window.innerWidth >= 1200;
      const aside = navRef.current?.parentElement;
      const top = aside ? aside.getBoundingClientRect().top + window.scrollY : 80;
      const bottomMask = window.innerHeight <= 760 ? 45 : 96;
      setStickyTop(wide ? top : undefined);
      setMaxHeight(wide ? Math.max(160, window.innerHeight - top - bottomMask) : undefined);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [contents]);
  if (!contents.length) return null;
  return (
    <nav ref={navRef} aria-label='글 목차' inert={opacity === 0} className={`w-full font-code text-[13px] transition-opacity duration-300 ${maxHeight ? 'overflow-y-auto overscroll-contain' : 'overflow-hidden'}`} style={{ opacity, maxHeight, top: stickyTop }}>
      {/* 2026-11-01: 메인 왼쪽 목차(탐색기)와 같은 형식: 현재 위치는 배경으로, 마우스를 올리면 강조색 글자 */}
      <p className='mb-2 text-[12px] text-muted'>▾ 목차</p>
      <ul>
        {contents.map(({ level, text, id }) => (
          <li key={id} className='min-w-0' style={{ paddingLeft: `${Math.max(0, level - 2) * 0.75}rem` }}>
            <a href={`#${id}`} title={text} aria-current={section === id ? 'location' : undefined}
              onClick={event => {
                const element = document.getElementById(id);
                if (!element) return;
                event.preventDefault();
                history.pushState(null, '', `#${encodeURIComponent(id)}`);
                setSection(id);
                window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top - 80,
                  behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
              }}
              className={`block truncate rounded px-3 py-1.5 leading-6 transition-colors ${id === section ? 'bg-nav-active text-fg-strong' : 'text-fg hover:text-accent'}`}
            >{text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
