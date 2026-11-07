'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { gaInitScript } from '@/shared/lib/analytics-privacy';

const GA_ID = 'G-8ZK16NWL6K';

// 블로그 검색어가 GA에 실리지 않게 한다.
// GA는 주소 전체를 보내므로 검색어가 세 곳에 기록된다: 페이지 주소(dl)의 q, 글 주소의 from(검색 목록 주소를 담은 값),
// 자동 사이트 검색 이벤트(view_search_results)의 search_term. 그중 클라이언트 이동 때의 자동 페이지 조회와 사이트 검색은
// GA 속성 설정(향상된 측정)이 주소창 주소를 직접 읽어서 코드의 page_location 지정이 적용되지 않는다(로컬 빌드로 확인).
// 그래서 GA로 나가는 측정 요청(/g/collect)만 골라, 보내기 직전에 dl · dr(이전 페이지 주소)에서 q · from을 빼고
// search_term을 지운다. 다른 요청과 다른 값은 그대로 보낸다. 이벤트 자체(페이지 조회 · 검색 횟수)는 그대로 남는다.
// GA 속성의 향상된 측정에서 '사이트 검색'과 '브라우저 기록 이벤트 기반 페이지 변경'을 끄거나 q · from을 데이터 수정(Redact data)에
// 넣으면 이 코드 없이도 같은 결과다(GA 설정을 바꾸지 않고 코드로 처리한다).
// 시작 스크립트와 정리 규칙은 shared/lib/analytics-privacy.ts에 있다(단위 테스트: tests/analytics-privacy.test.ts).
// 이 사이트 주소(dl · dr)의 q · from만 지우고, 다른 사이트에서 들어온 이전 페이지 주소는 건드리지 않는다.
const GA_INIT = gaInitScript(GA_ID);

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

export function ProductionAnalytics({ enabled, hostname }: { enabled: boolean; hostname: string }) {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    setAllowed(enabled && location.hostname === hostname);
  }, [enabled, hostname]);
  useEffect(() => {
    if (!allowed) return;
    const track = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target.closest('a') : null;
      if (!element) return;
      const href = element.getAttribute('href') || '';
      const action = href === '/resume' ? 'resume_open' : href.startsWith('https://github.com/rlatkd/') ? 'project_repository_open' : href.startsWith('mailto:') ? 'contact_email_open' : undefined;
      // Send only the action name, never the email address, link text or search query.
      if (action) window.gtag?.('event', action);
    };
    document.addEventListener('click', track);
    return () => document.removeEventListener('click', track);
  }, [allowed]);
  if (!allowed) return null;
  return (
    <>
      <Script id='ga-init' strategy='afterInteractive' dangerouslySetInnerHTML={{ __html: GA_INIT }} />
      <Script id='ga' strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
