"use client"

import React, { useState } from 'react'
import { BiCopy } from 'react-icons/bi'
import { BiCheck } from 'react-icons/bi'
import { highlight } from 'sugar-high'

export function Code({ children, className, ...props }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    // Clipboard API; localhost, https 에서만 적용됨
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const language = className ? className.replace('language-', '') : 'javascript';

  let codeHTML = highlight(children)

  return (
    <>
      <div className="flex justify-between items-center ml-1 mb-2">
        <span className="font-bold text-gray-400 capitalize">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-xs flex items-center space-x-1.5"
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
      <div dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
      <div className="flex justify-between items-center ml-1 mb-5"></div>
    </>
  )
}
