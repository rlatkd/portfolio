import test from 'node:test';
import assert from 'node:assert/strict';
// The production monitor uses Node-only ESM and deliberately has no app dependencies.
import { inspectSite } from '../scripts/lib/monitor.mjs';
const origin = 'https://portfolio.example';
function fakeRequest(failure?: string) {
  return async (url: Parameters<typeof fetch>[0]) => {
    const path = new URL(typeof url === 'string' ? url : url instanceof URL ? url.href : url.url).pathname;
    if (failure === 'http' && path === '/posts') return new Response('error', { status: 500 });
    if (path === '/sitemap.xml') return new Response(`<loc>${origin}</loc>`);
    if (path === '/llms.txt') return new Response(failure === 'llms' ? 'not found' : `# Name\n\n- [Post](${origin}/posts/first)`);
    if (path === '/api/og') return failure === 'og' ? new Response('<html></html>', { headers: { 'content-type': 'text/html' } }) : new Response(new Uint8Array(2000), { headers: { 'content-type': 'image/png' } });
    if (path === '/rss') return new Response(`<item><link>${failure === 'rss' ? 'https://other.example' : origin}/posts/first</link></item>`);
    return new Response(`<h1>Page</h1><link rel="canonical" href="${failure === 'canonical' ? 'https://wrong.example' : origin}${path === '/' ? '' : path}">${failure === 'noindex' || path === '/resume' ? '<meta name="robots" content="noindex, follow">' : ''}${path.startsWith('/posts/') && failure !== 'article' ? '<article>Body</article>BlogPosting' : ''}`);
  };
}
test('monitor checks public pages and follows one RSS article without executing analytics', async () => {
  const paths = await inspectSite({ origin, request: fakeRequest() });
  assert.equal(paths.length, 8);
  assert.ok(paths.includes('/resume'));
  assert.ok(paths.includes('/llms.txt'));
  assert.ok(paths.includes('/api/og'));
  assert.ok(!paths.includes('/evidence'));
  assert.ok(paths.includes('/posts/first'));
});
test('monitor fails on unavailable pages, incorrect canonical, foreign RSS, noindex, missing articles, llms.txt and share image', async () => {
  for (const failure of ['http', 'canonical', 'rss', 'noindex', 'article', 'llms', 'og']) {
    await assert.rejects(() => inspectSite({ origin, request: fakeRequest(failure) }), failure);
  }
});
