'use client';

import { useId, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

// 2026-11-01: 접고 펼칠 때 높이가 부드럽게 바뀌도록 grid-template-rows(0fr ↔ 1fr)를 전환한다.
// 움직임 줄이기 설정을 켠 사용자에게는 전환 없이 바로 열고 닫는다.
export function Collapsible({ label, count, children }: { label: string; count?: number; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className='border-t border-line'>
      <button
        type='button'
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(value => !value)}
        className='group flex w-full items-center justify-between py-4 text-left text-sm font-medium text-fg-strong transition-colors hover:text-accent focus-visible:text-accent'
      >
        <span>{label}{count !== undefined && <span className='ml-1 text-xs font-normal text-muted'>{count}</span>}</span>
        <ChevronDown size={16} aria-hidden='true' className={`text-muted transition-[transform,color] duration-300 ease-out group-hover:text-accent group-focus-visible:text-accent motion-reduce:transition-none ${open ? 'rotate-180' : ''}`} />
      </button>
      <div
        id={id}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        inert={!open || undefined}
      >
        <div className='overflow-hidden'>{children}</div>
      </div>
    </div>
  );
}
