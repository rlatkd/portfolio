'use client';

import { useState } from 'react';

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* 클립보드 권한이 없으면 링크로 대체 */
    }
  };

  return (
    <span className='inline-flex items-center gap-2'>
      <a href={`mailto:${email}`} className='font-semibold text-fg-strong hover:text-accent'>
        {email}
      </a>
      <button type='button' onClick={handleCopy} className='text-xs text-accent hover:underline'>
        {copied ? '복사됨' : '복사'}
      </button>
    </span>
  );
}
