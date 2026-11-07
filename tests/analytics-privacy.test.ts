import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanAnalyticsHit, gaInitScript } from '../src/shared/lib/analytics-privacy';

// GA 측정 요청에서 블로그 검색어를 지우는 규칙(production-analytics.tsx가 인라인 스크립트로 쓴다).
const host = 'www.sanghunkim.com'; // 비교는 도메인 이름(hostname)으로 한다
const encode = (value: string) => encodeURIComponent(value);

test('removes the search query and the listing context from this site\'s page and referrer URLs', () => {
  const hit = `v=2&tid=G-TEST&dl=${encode('https://www.sanghunkim.com/posts?q=검색어&category=java')}&dr=${encode('https://www.sanghunkim.com/posts/Next.js?from=/posts?q=검색어')}&en=page_view`;
  const cleaned = new URLSearchParams(cleanAnalyticsHit(hit, host));
  assert.equal(cleaned.get('dl'), 'https://www.sanghunkim.com/posts?category=java');
  assert.equal(cleaned.get('dr'), 'https://www.sanghunkim.com/posts/Next.js');
  assert.equal(cleaned.get('en'), 'page_view');
});

test('drops the automatic site-search term but keeps the event', () => {
  const body = ['en=view_search_results&ep.search_term=Elasticsearch&_et=2', 'en=page_view&ep.search_term=검색어'].join('\n');
  const lines = cleanAnalyticsHit(body, host).split('\n').map(line => new URLSearchParams(line));
  assert.deepEqual(lines.map(line => line.get('en')), ['view_search_results', 'page_view']);
  assert.ok(lines.every(line => !line.has('ep.search_term')));
  assert.equal(lines[0].get('_et'), '2');
});

test('leaves other sites, other parameters and malformed values untouched', () => {
  const external = `dr=${encode('https://search.daum.net/search?q=김상훈')}&dt=${encode('posts | 김상훈')}`;
  assert.equal(cleanAnalyticsHit(external, host), external);
  const clean = `dl=${encode('https://www.sanghunkim.com/posts/Next.js')}&en=scroll`;
  assert.equal(cleanAnalyticsHit(clean, host), clean);
  const broken = 'dl=%E0%A4%A&en=page_view';
  assert.equal(cleanAnalyticsHit(broken, host), broken);
});

// 인라인 시작 스크립트를 실제로 실행해, 문법 오류 없이 GA 측정 요청의 검색어를 지우는지 확인한다.
test('the GA init script runs and cleans hits sent through sendBeacon and fetch', async () => {
  const sent: string[] = [];
  const navigator = { sendBeacon: (url: string, body?: string) => { sent.push(url, body ?? ''); return true; } };
  const window = { dataLayer: [] as unknown[], fetch: async (input: string, init?: { body?: string }) => { sent.push(input, init?.body ?? ''); return new Response(null); } } as Record<string, unknown>;
  const location = { hostname: host, href: 'https://www.sanghunkim.com/posts?q=비밀' };
  new Function('window', 'navigator', 'location', 'dataLayer', gaInitScript('G-TEST'))(window, navigator, location, window.dataLayer);
  assert.equal(typeof window.gtag, 'function');
  assert.ok((window.dataLayer as unknown[]).length >= 2); // js · config

  const pageUrl = encode('https://www.sanghunkim.com/posts?q=비밀');
  navigator.sendBeacon(`https://region1.google-analytics.com/g/collect?v=2&dl=${pageUrl}`, 'en=view_search_results&ep.search_term=비밀');
  await (window.fetch as (input: string, init: { body: string }) => Promise<Response>)(`https://region1.google-analytics.com/g/collect?v=2&dl=${pageUrl}`, { body: 'en=page_view' });
  await (window.fetch as (input: string) => Promise<Response>)('https://www.sanghunkim.com/posts?q=비밀');
  assert.equal(new URL(sent[0]).searchParams.get('dl'), 'https://www.sanghunkim.com/posts');
  assert.equal(sent[1], 'en=view_search_results');
  assert.equal(new URL(sent[2]).searchParams.get('dl'), 'https://www.sanghunkim.com/posts');
  assert.equal(sent[4], 'https://www.sanghunkim.com/posts?q=비밀'); // GA가 아닌 요청은 그대로
  // Google 신호용으로 www.google.com에 보내는 같은 측정 요청도 지운다.
  await (window.fetch as (input: string) => Promise<Response>)(`https://www.google.com/g/collect?v=2&dl=${pageUrl}&ep.search_term=비밀`);
  assert.equal(new URL(sent[6]).searchParams.get('dl'), 'https://www.sanghunkim.com/posts');
  assert.equal(new URL(sent[6]).searchParams.get('ep.search_term'), null);
});

test('compares the site by hostname so a port in either URL does not skip cleaning', () => {
  const hit = `dl=${encode('https://www.sanghunkim.com:3100/posts?q=검색어')}`;
  assert.equal(new URLSearchParams(cleanAnalyticsHit(hit, host)).get('dl'), 'https://www.sanghunkim.com:3100/posts');
});
