'use client';

import { useState } from 'react';

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState('');
  return <div className='mt-4 text-sm'>
    <span className='select-all'>{email}</span>{' '}
    <button type='button' className='ml-2 rounded border border-line px-3 py-2 hover:border-accent'
      onClick={async () => {
        try { await navigator.clipboard.writeText(email); setStatus('이메일을 복사했습니다.'); }
        catch { setStatus('복사할 수 없습니다. 위 이메일을 선택해 복사해 주세요.'); }
      }}>이메일 복사</button>
    <p role='status' className='text-muted'>{status}</p>
  </div>;
}
