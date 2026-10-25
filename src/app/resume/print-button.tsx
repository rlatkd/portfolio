'use client';

import { Printer } from 'lucide-react';

export function PrintButton() {
  return (
    <button
      type='button'
      onClick={() => window.print()}
      className='inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3.5 py-2 text-xs font-medium text-fg-strong transition-colors hover:border-accent hover:text-accent'
    >
      <Printer size={15} />
      인쇄 / PDF 저장
    </button>
  );
}
