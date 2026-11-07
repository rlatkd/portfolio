export const monitoredPaths = ['/', '/posts', '/sitemap.xml', '/rss', '/llms.txt', '/api/og', '/resume'];
const decodeXml = text => text.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"').replaceAll('&apos;', "'");

export async function inspectSite({ origin, canonicalOrigin = origin, request = fetch }) {
  const results = [];
  let firstArticle;
  for (const endpoint of monitoredPaths) {
    const response = await request(origin + endpoint, { signal: AbortSignal.timeout(20000), redirect: 'error' });
    if (!response.ok) throw new Error(`${endpoint}: HTTP ${response.status}`);
    if (endpoint === '/api/og') {
      // 공유 카드 이미지: PNG이고 비어 있지 않아야 한다.
      const image = new Uint8Array(await response.arrayBuffer());
      if (!response.headers.get('content-type')?.startsWith('image/png') || image.length < 1000) throw new Error('/api/og: missing share image');
      results.push(endpoint);
      continue;
    }
    const body = await response.text();
    if (endpoint === '/llms.txt') {
      // AI용 사이트 요약: 제목 줄과 이 사이트 주소의 글 링크가 있어야 한다.
      if (!body.startsWith('# ') || !body.includes(`${canonicalOrigin}/posts/`)) throw new Error('/llms.txt: missing summary or article links');
    } else if (endpoint === '/sitemap.xml') {
      if (!body.includes(`<loc>${canonicalOrigin}</loc>`)) throw new Error('Sitemap origin mismatch');
    } else if (endpoint === '/rss') {
      const link = body.match(/<item>[\s\S]*?<link>([^<]+)<\/link>/)?.[1];
      if (!link) throw new Error('RSS has no article links');
      const url = new URL(decodeXml(link));
      if (url.origin !== canonicalOrigin || !url.pathname.startsWith('/posts/')) throw new Error('RSS article origin mismatch');
      firstArticle = url.pathname;
    } else {
      assertPage(body, endpoint, canonicalOrigin);
    }
    results.push(endpoint);
  }
  const article = await request(origin + firstArticle, { signal: AbortSignal.timeout(20000), redirect: 'error' });
  if (!article.ok) throw new Error(`${firstArticle}: HTTP ${article.status}`);
  const body = await article.text();
  assertPage(body, firstArticle, canonicalOrigin);
  if (!body.includes('<article') || !body.includes('BlogPosting')) throw new Error('Article body/structured data missing');
  results.push(firstArticle);
  return results;
}

function assertPage(body, endpoint, origin) {
  const canonical = origin + (endpoint === '/' ? '' : endpoint);
  if (!body.includes('<h1') || !body.includes(`rel="canonical" href="${canonical}"`)) throw new Error(`${endpoint}: missing content or incorrect canonical`);
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(body);
  if (endpoint === '/resume' ? !noindex : noindex) throw new Error(`${endpoint}: incorrect indexing policy`);
}
