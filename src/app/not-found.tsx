'use client';

import '/styles/global.css';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-bg px-6 py-16'>
      <div className='flex w-full max-w-2xl flex-col items-center gap-8 text-center'>
        <h1 className='select-none font-serif text-8xl font-black tracking-wider text-accent md:text-9xl'>
          404
        </h1>
        <p className='text-2xl font-bold text-fg-strong'>페이지를 찾을 수 없습니다.</p>
        <p className='text-base leading-relaxed text-muted'>
          존재하지 않는 주소를 입력하셨거나
          <br />
          요청하신 페이지의 주소가 변경·삭제되어 찾을 수 없습니다.
        </p>
        <div className='mt-2 flex w-full flex-col justify-center gap-4 sm:flex-row'>
          <button
            onClick={() => window.history.back()}
            className='w-full rounded-full border border-line px-6 py-3 font-mono text-sm uppercase tracking-label text-fg transition-colors hover:border-accent hover:text-accent sm:w-auto'
          >
            이전 페이지로
          </button>
          <Link
            href='/'
            className='w-full rounded-full bg-accent px-6 py-3 text-center font-mono text-sm uppercase tracking-label text-navy transition-opacity hover:opacity-90 sm:w-auto'
          >
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
