'use client';

import { useEffect, useRef } from 'react';

// 실무(효성에프엠에스) 기술 스택만 사용
const PILLS = [
  { label: 'Spring Boot', x: 14, y: 22, r: -16 },
  { label: 'Vue.js', x: 84, y: 20, r: 14 },
  { label: 'Spring Batch', x: 14, y: 70, r: -22 },
  { label: 'Oracle', x: 86, y: 66, r: 18 },
  { label: 'MyBatis', x: 26, y: 82, r: 10 },
  { label: 'Java', x: 72, y: 84, r: -12 },
  { label: 'Spring AOP', x: 40, y: 12, r: 8 },
  { label: 'Spring Security', x: 56, y: 92, r: -6 },
];

function endPosition(i: number, mobile: boolean) {
  if (mobile) return { x: 14 + (i % 4) * 24, y: 84 + Math.floor(i / 4) * 7 };
  return { x: 9 + i * 11.7, y: 91 };
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function HeroPills() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const mq = window.matchMedia('(max-width: 767px)');
    let frame = 0;

    const update = () => {
      frame = 0;
      const wrap = wrapRef.current;
      if (!wrap) return;
      // 히어로 높이의 45%를 스크롤하면 바닥 정렬 완료
      const raw = Math.min(Math.max(window.scrollY / (wrap.offsetHeight * 0.45), 0), 1);
      const t = 1 - Math.pow(1 - raw, 3);
      PILLS.forEach((p, i) => {
        const el = pillRefs.current[i];
        if (!el) return;
        const end = endPosition(i, mq.matches);
        el.style.left = `${lerp(p.x, end.x, t)}%`;
        el.style.top = `${lerp(p.y, end.y, t)}%`;
        el.style.transform = `translate(-50%, -50%) rotate(${lerp(p.r, 0, t)}deg)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    mq.addEventListener('change', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      mq.removeEventListener('change', update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden className='pointer-events-none absolute inset-0'>
      {PILLS.map((p, i) => (
        <span
          key={p.label}
          ref={(el) => {
            pillRefs.current[i] = el;
          }}
          style={{ left: `${p.x}%`, top: `${p.y}%`, transform: `translate(-50%, -50%) rotate(${p.r}deg)` }}
          className={`absolute whitespace-nowrap rounded-full border-2 bg-surface px-3 py-1.5 text-xs font-semibold shadow-sm md:px-5 md:py-2.5 md:text-base ${
            i % 2 === 0 ? 'border-accent text-accent' : 'border-line text-fg-strong'
          }`}
        >
          {p.label}
        </span>
      ))}
    </div>
  );
}
