'use client';

import { useRef } from 'react';
import { X } from 'lucide-react';
import { profile } from '@/shared/data/site-data';

// 개인정보 처리방침은 하단 링크에서 여는 모달로 안내한다.
export function PrivacyNotice() {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      {/* 맨 아래로 스크롤하면 이 줄 아래 끝이 가림 띠 위 끝과 맞아서, 포커스 테두리를 안쪽에 그린다(좌우 여백은 음수 여백으로 상쇄해 위치는 그대로). */}
      <button type='button' onClick={() => dialog.current?.showModal()} className='-mx-1 px-1 underline underline-offset-2 hover:text-accent focus-visible:-outline-offset-2'>
        개인정보 처리방침
      </button>
      <dialog
        ref={dialog}
        aria-labelledby='privacy-title'
        onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}
        className='w-[min(640px,calc(100vw-2rem))] overflow-hidden rounded-lg border border-line bg-surface p-0 text-left text-fg backdrop:bg-black/60'
      >
        <div className='flex items-center border-b border-line bg-surface-2 font-code text-[12px]'>
          <span className='-mb-px border-t-2 border-tab bg-surface px-3 py-2 text-fg-strong'>privacy.md</span>
          <button type='button' aria-label='닫기' onClick={() => dialog.current?.close()} className='ml-auto flex h-9 w-9 items-center justify-center text-muted hover:text-accent'>
            <X size={16} aria-hidden='true' />
          </button>
        </div>
        {/* 문단 사이는 좁게, 소제목 위는 넓게 두어 구역이 나뉘어 보이게 한다. */}
        {/* 본문 위아래 여백을 좌우 여백과 같게 보이게 둔다(데스크톱 40px, 640px 미만 24px).
            첫 줄 위 · 마지막 줄 아래에는 줄 간격이 약 5px 더 붙어서, 위아래 안쪽 여백을 그만큼 줄여 글자까지의 거리가 좌우와 같아지게 한다. */}
        <div className='max-h-[70vh] overflow-y-auto px-6 py-[19px] font-sans sm:px-10 sm:py-[35px] text-[14px] leading-[1.75] [&>h3]:mb-1 [&>h3]:mt-6 [&>p+p]:mt-2 [&>ul]:mt-2 [&>ul]:space-y-0.5'>
          <h2 id='privacy-title' className='mb-3 text-xl font-bold text-fg-strong'>개인정보 처리방침</h2>
          <p>이 사이트는 김상훈의 포트폴리오와 기술 블로그입니다. 회원가입, 댓글, 결제 기능은 제공하지 않습니다.</p>
          <h3 className='font-semibold text-fg-strong'>방문 분석</h3>
          <p>공식 운영 도메인에서 Google Analytics 4, Vercel Web Analytics와 Speed Insights를 사용해 페이지 방문, 유입 경로와 성능을 확인합니다. 개발·미리보기 환경에는 분석 도구를 활성화하지 않습니다.</p>
          <p>Google Analytics는 브라우저 식별을 위해 쿠키를 사용할 수 있으며 페이지 URL, 브라우저·기기 정보와 상호작용을 처리합니다. URL과 입력 내용에 이름, 이메일 등 개인정보를 포함하지 마세요. 이 사이트는 이메일이나 연락처를 분석 이벤트로 직접 전송하지 않습니다.</p>
          <p>Vercel 분석 도구는 방문 통계와 로딩·응답 성능을 처리합니다. Google과 Vercel의 실제 보관 기간 및 처리는 각 서비스 설정과 정책에 따릅니다.</p>
          <ul className='list-disc pl-5'><li><a className='text-accent underline' href='https://policies.google.com/privacy'>Google 개인정보처리방침</a></li><li><a className='text-accent underline' href='https://vercel.com/docs/analytics/privacy-policy'>Vercel Web Analytics 개인정보 안내</a></li><li><a className='text-accent underline' href='https://tools.google.com/dlpage/gaoptout'>Google Analytics 수집 거부 도구</a></li></ul>
          <h3 className='font-semibold text-fg-strong'>외부 콘텐츠와 브라우저 저장</h3>
          <p>블로그에 포함된 외부 이미지는 해당 이미지 서버에서 불러오며 해당 서버에 접속 정보가 전달될 수 있습니다. 글꼴은 이 사이트 서버에서 제공합니다. 테마 선택은 브라우저 로컬 저장소에 저장됩니다.</p>
          <h3 className='font-semibold text-fg-strong'>문의</h3>
          <p>이메일로 보낸 내용은 문의에 답변하는 데 사용됩니다. 문의: <a className='text-accent underline' href={`mailto:${profile.email}`}>{profile.email}</a></p>
        </div>
      </dialog>
    </>
  );
}
