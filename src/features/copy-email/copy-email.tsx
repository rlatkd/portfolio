'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy, X } from 'lucide-react';

// 복사 결과는 화면에서 아이콘으로만 보여 준다(성공 ✓, 실패 ✕). 문구는 화면 낭독기에만 읽힌다.
type Status = 'idle' | 'copied' | 'failed';
const messages: Record<Status, string> = {
  idle: '',
  copied: '이메일을 복사했습니다.',
  failed: '복사할 수 없습니다. 이메일 주소를 직접 복사해 주세요.',
};
// 결과 아이콘을 보여 준 뒤 복사 아이콘으로 돌아가는 시간. 실패는 직접 복사하라는 안내(title)를 읽을 수 있게 더 길게 둔다.
const RESET_AFTER_MS: Record<Exclude<Status, 'idle'>, number> = { copied: 2000, failed: 6000 };

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const show = (next: Exclude<Status, 'idle'>) => {
    clearTimeout(timer.current);
    setStatus(next);
    timer.current = setTimeout(() => setStatus('idle'), RESET_AFTER_MS[next]);
  };
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
            show('copied');
          } catch {
            show('failed');
          }
        }}
      >
        {status === 'copied' ? <Check size={16} className='text-accent' /> : status === 'failed' ? <X size={16} className='text-error' /> : <Copy size={16} />}
      </button>
      <p role='status' className='sr-only'>{messages[status]}</p>
    </div>
  );
}
