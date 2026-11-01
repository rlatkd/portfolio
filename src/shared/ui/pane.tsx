import type { ReactNode } from 'react';

/** 2026-11-01: VS Code 편집기 영역처럼 머리에 파일 탭을 단 본문 섹션. action은 탭 줄 오른쪽 끝에 둔다. */
export function Pane({ id, file, action, children }: { id: string; file: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className='scroll-mt-6 overflow-hidden rounded-lg border border-line bg-surface'>
      <div className='flex items-center border-b border-line bg-surface-2 font-code text-[12px]'>
        <h2 id={`${id}-heading`} className='-mb-px border-t-2 border-tab bg-surface px-3 py-2 font-normal text-fg-strong'>{file}</h2>
        {action && <div className='ml-auto px-3'>{action}</div>}
      </div>
      <div className='px-6 py-6'>{children}</div>
    </section>
  );
}
