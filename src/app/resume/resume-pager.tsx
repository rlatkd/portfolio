'use client';

import { Children, useEffect, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 이력서를 A4 쪽 단위로 한 장씩 보여주고, 아래 가운데에 쪽번호와 좌우 버튼을 둔다. 인쇄 시에는 전 쪽을 출력
export function ResumePager({ children }: { children: ReactNode }) {
  const pages = Children.toArray(children);
  const [page, setPage] = useState(0);
  const last = pages.length - 1;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setPage((p) => Math.max(0, p - 1));
      if (e.key === 'ArrowRight') setPage((p) => Math.min(last, p + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [last]);

  const arrow =
    'absolute top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg/80 text-fg-strong backdrop-blur transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30 print:hidden';

  return (
    <div className='relative mx-auto max-w-[794px]'>
      {pages.map((content, i) => (
        <section
          key={i}
          aria-label={`${i + 1}쪽`}
          className={`resume-paper resume-page mx-auto w-full max-w-[794px] flex-col border border-line px-7 pb-6 pt-10 text-[12px] leading-[1.75] sm:min-h-[1123px] min-[842px]:h-[1123px] min-[842px]:overflow-hidden sm:px-14 sm:pb-8 sm:pt-14 ${i === page ? 'flex' : 'hidden print:flex'}`}
        >
          <div className='flex-1'>{content}</div>
          {/* 쪽번호 — 종이 하단 가운데 */}
          <p className='mt-8 text-center text-[11px] tabular-nums text-muted'>
            {i + 1} / {pages.length}
          </p>
        </section>
      ))}

      {/* 좌우 이동 — 종이 양옆, 종이 높이의 가운데 (좁은 화면에서는 종이 안쪽 가장자리) */}
      <button
        type='button'
        aria-label='이전 쪽'
        disabled={page === 0}
        onClick={() => setPage((p) => p - 1)}
        className={`${arrow} left-2 min-[960px]:-left-[4.5rem]`}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type='button'
        aria-label='다음 쪽'
        disabled={page === last}
        onClick={() => setPage((p) => p + 1)}
        className={`${arrow} right-2 min-[960px]:-right-[4.5rem]`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
