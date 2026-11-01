'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState('');
  const copied = status === '이메일을 복사했습니다.';
  return (
    <div className='mt-4 text-sm'>
      <div className='flex items-center gap-2'>
        <span className='select-all text-fg-strong'>{email}</span>
        <button
          type='button'
          aria-label='이메일 복사'
          title='이메일 복사'
          className='flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-accent'
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(email);
              setStatus('이메일을 복사했습니다.');
            } catch {
              setStatus('복사할 수 없습니다. 위 이메일을 선택해 복사해 주세요.');
            }
          }}
        >
          {copied ? <Check size={16} className='text-accent' /> : <Copy size={16} />}
        </button>
      </div>
      <p role='status' className='mt-1 text-xs text-muted'>
        {status}
      </p>
    </div>
  );
}
