'use client';

import { useState } from 'react';
import { BiCopy, BiCheck } from 'react-icons/bi';
import { highlight } from 'sugar-high';

export function CodeCopier({ children, className, ...props }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  const language = className ? className.replace('language-', '') : 'javascript';
  const codeHTML = highlight(children);

  return (
    <div className='relative'>
      <div className='flex justify-between items-center mb-2 px-4 pt-3'>
        <span className='font-bold text-gray-400 capitalize'>
          {language}
        </span>
        <button
          onClick={handleCopy}
          className='px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-xs flex items-center space-x-1.5'
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
      <div className='overflow-x-auto'>
        <pre className='p-4 pt-0'>
          <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
        </pre>
      </div>
    </div>
  )
}
