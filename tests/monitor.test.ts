import test from 'node:test';
import assert from 'node:assert/strict';
// The production monitor uses Node-only ESM and deliberately has no app dependencies.
import { inspectSite } from '../scripts/lib/monitor.mjs';
const origin = 'https://portfolio.example';
function fakeRequest(failure?: string) {
  return async (url: Parameters<typeof fetch>[0]) => {
    const path = new URL(typeof url === 'string' ? url : url instanceof URL ? url.href : url.url).pathname;
    if (failure === 'http' && path === '/privacy') return new Response('error', { status: 500 });
    if (path === '/sitemap.xml') return new Response(`<loc>${origin}</loc>`);
    if (path === '/rss') return new Response(`<item><link>${failure === 'rss' ? 'https://other.example' : origin}/posts/first</link></item>`);
    return new Response(`<h1>Page</h1><link rel="canonical" href="${failure === 'canonical' ? 'https://wrong.example' : origin}${path === '/' ? '' : path}">${failure === 'noindex' || path === '/resume' ? '<meta name="robots" content="noindex, follow">' : ''}${path.startsWith('/posts/') && failure !== 'article' ? '<article>Body</article>BlogPosting' : ''}`);
  };
}
test('monitor checks public pages and follows one RSS article without executing analytics', async () => {
  const paths = await inspectSite({ origin, request: fakeRequest() });
  assert.equal(paths.length, 7);
  assert.ok(paths.includes('/resume'));
  assert.ok(!paths.includes('/evidence'));
  assert.ok(paths.includes('/posts/first'));
});
test('monitor fails on unavailable pages, incorrect canonical, foreign RSS, noindex and missing articles', async () => {
  for (const failure of ['http', 'canonical', 'rss', 'noindex', 'article']) {
    await assert.rejects(() => inspectSite({ origin, request: fakeRequest(failure) }), failure);
  }
});
