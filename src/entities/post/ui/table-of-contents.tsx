'use client';
import { useEffect, useRef, useState } from 'react';
import type { PostHeading } from '@/shared/types/post';

export function TableOfContents({ contents }: { contents: PostHeading[] }) {
  const [section, setSection] = useState('');
  const [opacity, setOpacity] = useState(1);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
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
      const top = navRef.current?.getBoundingClientRect().top ?? 0;
      setMaxHeight(window.innerWidth >= 1200 ? Math.max(160, window.innerHeight - Math.max(top, 80) - 24) : undefined);
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
    <nav ref={navRef} aria-label='글 목차' inert={opacity === 0} className={`w-full text-sm transition-opacity duration-300 ${maxHeight ? 'overflow-y-auto overscroll-contain' : 'overflow-hidden'}`} style={{ opacity, maxHeight }}>
      <ul className='ml-2 space-y-1'>
        {contents.map(({ level, text, id }) => (
          <li key={id} className='min-w-0' style={{ marginLeft: `${Math.max(0, level - 2) * 0.5}rem` }}>
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
              className={`block truncate text-sm leading-7 transition-colors duration-300 hover:underline ${id === section ? 'font-bold text-accent' : 'font-normal text-muted'}`}
            >{text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
