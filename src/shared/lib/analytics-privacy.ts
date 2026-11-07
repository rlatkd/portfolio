// GA 측정 요청(/g/collect)의 본문 · 주소 문자열에서 블로그 검색어를 지운다.
// - dl(페이지 주소) · dr(이전 페이지 주소)이 이 사이트(hostname, 포트는 보지 않는다)일 때만 q(검색어) · from(검색 목록 주소를 담은 값)을 뺀다.
//   다른 사이트에서 들어온 이전 주소(예: 검색 포털)는 건드리지 않는다.
// - ep.search_term(GA 자동 사이트 검색 이벤트의 검색어)은 지운다. 그 밖의 값은 글자 그대로 둔다.
// production-analytics.tsx가 이 함수를 문자열(toString)로 인라인 스크립트에 넣으므로, 바깥 변수나 import를 쓰지 않는다.
export function cleanAnalyticsHit(text: string, hostname: string): string {
  return text
    .replace(/(^|&)(dl|dr)=([^&\n]*)/gm, (match: string, lead: string, key: string, value: string) => {
      try {
        const url = new URL(decodeURIComponent(value));
        if (url.hostname !== hostname) return match;
        url.searchParams.delete('q');
        url.searchParams.delete('from');
        return lead + key + '=' + encodeURIComponent(url.href);
      } catch {
        return match;
      }
    })
    .replace(/(^|&)ep\.search_term=[^&\n]*/gm, '');
}

/** GA 측정 요청 주소를 알아보는 규칙. 인라인 스크립트에는 toString으로 넣어 역슬래시를 손으로 이스케이프하지 않는다. */
export const GA_COLLECT = /google-analytics\.com\/g\/collect/;

/**
 * GA를 시작하는 인라인 스크립트. 측정 요청(sendBeacon · fetch)을 보내기 직전에 cleanAnalyticsHit로 검색어를 지운다.
 * 이 문자열 안에는 역슬래시를 직접 쓰지 않는다(TS 템플릿 문자열이 이스케이프를 먹어 정규식이 깨진 적이 있다).
 * tests/analytics-privacy.test.ts가 이 스크립트를 실제로 실행해 문법 오류와 정리 결과를 확인한다.
 */
export function gaInitScript(gaId: string): string {
  return `
(function () {
  var collect = ${GA_COLLECT.toString()};
  var cleanAnalyticsHit = ${cleanAnalyticsHit.toString()};
  var cleanHit = function (text) { return cleanAnalyticsHit(text, location.hostname); };
  var cleanRequestUrl = function (value) {
    var url = new URL(value, location.href);
    url.search = cleanHit(url.search.slice(1));
    return url.href;
  };
  if (navigator.sendBeacon) {
    var sendBeacon = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = function (url, data) {
      if (collect.test(String(url))) { url = cleanRequestUrl(String(url)); if (typeof data === 'string') data = cleanHit(data); }
      return sendBeacon(url, data);
    };
  }
  var originalFetch = window.fetch;
  window.fetch = function (input, init) {
    if ((typeof input === 'string' || input instanceof URL) && collect.test(String(input))) {
      input = cleanRequestUrl(String(input));
      if (init && typeof init.body === 'string') init = Object.assign({}, init, { body: cleanHit(init.body) });
    }
    return originalFetch.call(this, input, init);
  };
})();
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${gaId}');
`;
}
