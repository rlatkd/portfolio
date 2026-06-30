'use client';

import type { ReactNode } from 'react';
import { useView } from '@/shared/ui/view-context';

const TABS = [
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'blog', label: 'Posts' },
] as const;

export default function HomeView({
  portfolio,
  blog,
}: {
  portfolio: ReactNode;
  blog: ReactNode;
}) {
  const { view, setView } = useView();

  return (
    <>
      {/* 상단 sticky 토글 — 오른쪽 영역만 전환 */}
      <div className='sticky top-0 z-30 -mx-6 mb-2 border-b border-line bg-bg px-6 pb-3 pt-3 md:-mx-12 md:px-12 lg:mx-0 lg:px-0 lg:pt-24'>
        <div className='inline-flex rounded-lg border border-line bg-surface p-1'>
          {TABS.map((t) => {
            const on = view === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setView(t.id);
                  window.scrollTo({ top: 0 });
                }}
                className={`rounded-md px-4 py-1.5 font-mono text-xs uppercase tracking-label transition-colors ${
                  on ? 'bg-accent text-navy' : 'text-muted hover:text-accent'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {view === 'portfolio' ? portfolio : blog}

      {/* 하단 가림막 — 좌측 사이드바 하단(뷰포트 바닥 6rem)에 맞춰 콘텐츠 가림 */}
      <div aria-hidden className='pointer-events-none sticky bottom-0 z-20 hidden h-24 bg-bg lg:block' />
    </>
  );
}
