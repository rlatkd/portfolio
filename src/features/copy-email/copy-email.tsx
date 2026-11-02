'use client';

import { useState } from 'react';
import { Check, Copy, X } from 'lucide-react';

// 2026-11-02: 복사 결과는 화면에서 아이콘으로만 보여 준다(성공 ✓, 실패 ✕). 문구는 화면 낭독기에만 읽힌다.
type Status = 'idle' | 'copied' | 'failed';
const messages: Record<Status, string> = {
  idle: '',
  copied: '이메일을 복사했습니다.',
  failed: '복사할 수 없습니다. 이메일 주소를 직접 복사해 주세요.',
};

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>('idle');
  return (
    <div className='flex items-center'>
      <button
        type='button'
        aria-label='이메일 복사'
        title={status === 'failed' ? messages.failed : '이메일 복사'}
        className='flex h-10 w-10 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-accent hover:text-accent'
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setStatus('copied');
          } catch {
            setStatus('failed');
          }
        }}
      >
        {status === 'copied' ? <Check size={16} className='text-accent' /> : status === 'failed' ? <X size={16} className='text-error' /> : <Copy size={16} />}
      </button>
      <p role='status' className='sr-only'>{messages[status]}</p>
    </div>
  );
}
