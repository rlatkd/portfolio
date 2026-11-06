'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// 이동이 이보다 빨리 끝나면 스피너를 보이지 않는다(미리 만든 페이지는 거의 바로 바뀌어 번쩍임만 생긴다).
const SHOW_DELAY_MS = 300;
// 이동이 실패해 주소가 바뀌지 않아도 스피너가 남지 않게 한다.
const GIVE_UP_MS = 15000;

/**
 * 페이지 이동 중 화면 가운데에 보이는 스피너.
 * loading.tsx(Suspense)는 응답을 먼저 스트리밍해 /posts의 404 · 308 상태 코드를 200으로 바꾸므로 쓰지 않는다.
 * 같은 사이트의 링크를 누르거나 폼을 제출하면 시작하고, 주소(경로 · 쿼리)가 바뀌면 끝낸다.
 */
function Spinner() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const [visible, setVisible] = useState(false);
  const timers = useRef<number[]>([]);

  const stop = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setVisible(false);
  };

  useEffect(stop, [pathname, search]);

  useEffect(() => {
    const start = () => {
      stop();
      timers.current.push(window.setTimeout(() => setVisible(true), SHOW_DELAY_MS), window.setTimeout(stop, GIVE_UP_MS));
    };
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download')) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // 같은 페이지 안의 목차 이동(#) · 지금 주소와 같은 링크는 이동이 아니다.
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      start();
    };
    const onSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement;
      if (event.defaultPrevented || form.method === 'dialog') return;
      start();
    };
    // 뒤로 가기로 저장된 화면이 되살아나면(bfcache) 스피너를 지운다.
    const onPageShow = () => stop();
    document.addEventListener('click', onClick);
    document.addEventListener('submit', onSubmit);
    window.addEventListener('pageshow', onPageShow);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('submit', onSubmit);
      window.removeEventListener('pageshow', onPageShow);
      timers.current.forEach(window.clearTimeout);
    };
  }, []);

  // 화면 낭독기 알림 영역은 항상 두고 내용만 바꾼다. 페이지의 다른 상태 알림(검색 결과 등)과 겹치지 않게 role=status는 쓰지 않는다.
  return (
    <div aria-live='polite' className='pointer-events-none fixed inset-0 z-[60] flex items-center justify-center print:hidden'>
      {visible && <>
        <span aria-hidden='true' data-navigation-spinner className='h-8 w-8 animate-spin rounded-full border-[3px] border-line border-t-accent' />
        <span className='sr-only'>페이지를 불러오는 중</span>
      </>}
    </div>
  );
}

export function NavigationSpinner() {
  // useSearchParams는 미리 만든 페이지에서 가장 가까운 Suspense까지 클라이언트 렌더링으로 바꾸므로 스피너만 감싼다.
  return <Suspense fallback={null}><Spinner /></Suspense>;
}
