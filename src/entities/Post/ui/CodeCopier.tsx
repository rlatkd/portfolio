'use client';

import { useEffect, useRef, useState } from 'react';
import { BiCopy, BiCheck } from 'react-icons/bi';

type CodeCopierProps = {
  children: string;
  className?: string;
  highlightedHtml?: string;
};

export function CodeCopier({ children, className, highlightedHtml }: CodeCopierProps) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setError('');
      setCopied(true)
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1000)
    } catch {
      setCopied(false)
      setError('복사하지 못했습니다. 코드를 선택해 복사해 주세요.');
    }
  }

  const language = className ? className.replace('language-', '') : 'text';

  return (
    <div className='relative'>
      <div className='flex justify-between items-center mb-2 px-4 pt-3'>
        <span className='font-mono text-xs tracking-label uppercase text-muted'>
          {language}
        </span>
        <button
          onClick={handleCopy}
          className='px-2 py-1 border border-line bg-surface-2 hover:border-accent hover:text-accent text-fg rounded-md font-mono text-xs flex items-center space-x-1.5 transition-colors'
        >
          {copied ? (
            <>
              <BiCheck size={13} />
              <span>복사되었습니다!</span>
            </>
          ) : (
            <>
              <BiCopy size={13} />
              <span>코드 복사</span>
            </>
          )}
        </button>
      </div>
      <p role='status' className='sr-only'>{copied ? '코드를 복사했습니다.' : ''}</p>
      {error && <p role='alert' className='px-4 pb-2 text-sm text-fg'>{error}</p>}
      <div className='overflow-x-auto'>
        <pre className='p-4 pt-0'>
          {highlightedHtml === undefined ? (
            <code className={className}>{children}</code>
          ) : (
            <code className={className} dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
          )}
        </pre>
      </div>
    </div>
  )
}
