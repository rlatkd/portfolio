'use client';

import Link from 'next/link';

// 2026-11-01: VS Code 디자인. 편집기 영역 하나에 오류 내용을 보여 준다.
export default function NotFound() {
  return (
    <main id='main-content' className='flex min-h-screen w-full items-center justify-center bg-bg px-6 py-16'>
      <section className='w-full max-w-xl overflow-hidden rounded-lg border border-line bg-surface'>
        <div className='flex border-b border-line bg-surface-2 font-code text-[12px]'>
          <span className='-mb-px border-t-2 border-tab bg-surface px-3 py-2 text-fg-strong'>404.md</span>
        </div>
        <div className='px-6 py-8'>
          <p className='font-code text-[13px] text-accent'>◉ 404</p>
          <h1 className='mt-3 text-2xl font-bold text-fg-strong'>페이지를 찾을 수 없습니다.</h1>
          <p className='mt-4 leading-7'>
            존재하지 않는 주소를 입력하셨거나
            <br />
            요청하신 페이지의 주소가 변경·삭제되어 찾을 수 없습니다.
          </p>
          <div className='mt-7 flex flex-col gap-3 sm:flex-row'>
            <Link href='/' className='rounded-md bg-button px-5 py-2.5 text-center text-[14px] font-medium text-on-button transition-opacity hover:opacity-90'>
              홈으로
            </Link>
            <Link href='/posts' className='rounded-md border border-line px-5 py-2.5 text-center text-[14px] text-fg transition-colors hover:border-accent hover:text-accent'>
              글 목록으로
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
