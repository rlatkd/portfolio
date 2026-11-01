'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState('');
  const copied = status === '이메일을 복사했습니다.';
  return (
    <div className='flex items-center gap-2 text-sm'>
        <button
          type='button'
          aria-label='이메일 복사'
          title='이메일 복사'
          className='flex h-10 w-10 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-accent hover:text-accent'
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(email);
              setStatus('이메일을 복사했습니다.');
            } catch {
              setStatus('복사할 수 없습니다. 이메일 주소를 직접 복사해 주세요.');
            }
          }}
        >
          {copied ? <Check size={16} className='text-accent' /> : <Copy size={16} />}
        </button>
      <p role='status' className='text-xs text-muted'>
        {status}
      </p>
    </div>
  );
}
