import { test, expect } from '@playwright/test';
import { baseUrl } from '../../src/shared/config/site';
import sources from '../../src/shared/content/velog-sources.json' with { type: 'json' };

test.beforeEach(async ({ context }) => {
  await context.route(/https:\/\/(?:[^/]+\.)?(?:google-analytics\.com|googletagmanager\.com|vercel-insights\.com)\//, route => route.abort());
});

test('home navigation, theme persistence and landmarks work without runtime errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.locator('header a[aria-label="GitHub"] svg')).toBeVisible();
  await expect(page.locator('header a[aria-label="LinkedIn"] svg')).toBeVisible();
  const writingPosts = page.locator('#writing a[href^="/posts/"]');
  await expect(writingPosts).toHaveCount(6);
  const dates = await writingPosts.locator('span.font-mono').allTextContents();
  expect(dates).toEqual([...dates].sort().reverse());
  await expect(page.locator('script[src*="googletagmanager.com/gtag/js"]')).toHaveCount(0);
  // 다크가 기본 테마이고, 전환한 라이트 테마가 새로고침 후에도 유지된다
  await expect(page.locator('html')).toHaveClass(/dark/);
  const toggle = page.getByRole('button', { name: '테마 전환' });
  await toggle.click();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await page.getByRole('navigation', { name: '포트폴리오 목차' }).getByRole('link', { name: 'Experience' }).click();
  await expect(page).toHaveURL(/#experience/);
  await expect(page.getByRole('button', { name: '맨 위로' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('mobile archive stays within viewport and pagination/category links work', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/posts');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('link', { name: '다음 페이지로', exact: true }).click();
  await expect(page).toHaveURL('/posts?page=2');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${baseUrl}/posts?page=2`);
  await page.getByRole('link', { name: 'java', exact: true }).click();
  await expect(page).toHaveURL('/posts?category=java');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('all restored articles have valid DOM, metadata and no comments requests', async ({ page }) => {
  test.setTimeout(180000);
  const errors: string[] = [];
  const comments: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (/\/api\/.*(?:comments|replies)/.test(request.url())) comments.push(request.url()); });
  for (const slug of Object.keys(sources)) {
    const response = await page.goto(`/posts/${encodeURIComponent(slug)}`, { waitUntil: 'domcontentloaded' });
    expect(response?.status(), slug).toBe(200);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('article')).toBeVisible();
    expect(await page.locator('article p > div, article pre > div').count(), slug).toBe(0);
    const ids = await page.locator('article [id]').evaluateAll(nodes => nodes.map(node => node.id));
    expect(new Set(ids).size, slug).toBe(ids.length);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${baseUrl}/posts/${encodeURIComponent(slug)}`);
  }
  expect(comments).toEqual([]);
  expect(errors).toEqual([]);
});

test('TOC targets and clipboard preserve original Java operators', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.goto('/posts/Elasticsearch-1');
  const toc = page.getByRole('navigation', { name: '글 목차' });
  await toc.getByRole('link', { name: 'search API', exact: true }).click();
  await expect(page).toHaveURL(/#search-api/);
  await page.goto('/posts/Gold-V-%EC%B9%98%ED%82%A8-%EB%B0%B0%EB%8B%AC-15686');
  const source = await page.locator('article pre code.language-java').textContent();
  if (source === null) throw new Error('Java code block has no text content');
  expect(source).toContain('==');
  await page.locator('article').getByRole('button', { name: '코드 복사', exact: true }).last().click();
  // Windows clipboard converts LF to CRLF; operators and all other whitespace must match.
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied.replace(/\r\n/g, '\n')).toBe(source.replace(/\r\n/g, '\n'));
});

test('invalid URLs and retired comment endpoints return 404', async ({ request }) => {
  for (const path of ['/posts?page=0', '/posts?page=abc', '/posts?page=999', '/posts?category=missing', '/posts/missing-post', '/api/posts/1/comments', '/api/comments/1/replies']) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
  }
  const canonical = await request.get('/posts?page=1', { maxRedirects: 0 });
  expect(canonical.status()).toBe(308);
  const removedPost = await request.post('/api/posts/1/comments', { data: { content: 'test' } });
  expect(removedPost.status()).toBe(404);
});

test('sitemap, RSS, OG and optimized images are served successfully', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  expect((await sitemap.text()).match(/<loc>/g)).toHaveLength(Object.keys(sources).length + 3);
  const rss = await request.get('/rss');
  expect(rss.status()).toBe(200);
  expect((await rss.text()).match(/<item>/g)).toHaveLength(Object.keys(sources).length);
  const og = await request.get('/api/og?title=SEO%20%EA%B2%80%EC%A6%9D');
  expect(og.status()).toBe(200);
  expect(og.headers()['content-type']).toContain('image/png');
  const image = await request.get('/_next/image?url=%2Fimages%2Fup-quant%2Fpreview.png&w=640&q=75');
  expect(image.status()).toBe(200);
  expect(image.headers()['content-type']).toContain('image/');
});

test('home and article fit narrow screens without global horizontal scrolling', async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/posts/Next.js']) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path} at ${width}px`).toBe(true);
    }
  }
});

test('theme remains usable when browser storage is unavailable', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('Storage disabled'); };
    Storage.prototype.setItem = () => { throw new Error('Storage disabled'); };
  });
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.getByRole('button', { name: '테마 전환' }).click();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
  expect(errors).toEqual([]);
});


test('search, resume, privacy and short-screen readability work', async ({ page, request }) => {
  await page.goto('/posts');
  await page.getByRole('searchbox', { name: '글 검색' }).fill('Elasticsearch');
  await page.getByRole('button', { name: '검색', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('검색 결과');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${baseUrl}/posts?q=Elasticsearch`);
  await page.goto('/posts?q=not-a-real-search-result');
  await expect(page.getByRole('status')).toContainText('0개');
  // 이력서는 사이드바의 별도 버튼으로 연결하고, 검색 노출과 사이트맵에서는 제외한다
  await page.goto('/');
  await page.locator('header a[href="/resume"]').click();
  await expect(page).toHaveURL(/\/resume$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('김상훈');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.getByText('010')).toHaveCount(0);
  expect(await (await request.get('/sitemap.xml')).text()).not.toContain('/resume');
  await page.goto('/privacy');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('방문 분석');
  await page.setViewportSize({ width: 1600, height: 720 });
  await page.goto('/posts/신입-개발자-기술면접-질문-정리-자바');
  const toc = page.getByRole('navigation', { name: '글 목차' });
  const bounds = await toc.boundingBox();
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(720);
  await toc.getByRole('link').last().click();
  await expect(page).toHaveURL(/#/);
  await page.goto('/');
  expect(await page.evaluate(() => parseFloat(getComputedStyle(document.body).fontSize))).toBeGreaterThanOrEqual(15);
  await expect(page.locator('header').getByRole('link', { name: 'RSS', exact: true })).toBeVisible();
});

test('project cards link to GitHub, reviewed image descriptions and benchmark artifact are served', async ({ page, request }) => {
  await page.goto('/');
  const projects = page.locator('#projects');
  // 캐러셀: 한 장씩 넘기며 각 프로젝트의 이미지와 GitHub 링크를 확인한다
  const dots = projects.getByRole('button', { name: /번째 프로젝트/ });
  await expect(dots).toHaveCount(6);
  await expect(projects.locator('img')).toHaveCount(6);
  let linked = 0;
  for (let i = 0; i < 6; i++) {
    const slide = projects.locator('li[aria-hidden="false"]');
    await expect(slide.locator('img')).toHaveCount(1);
    const card = slide.locator('a[aria-label$="GitHub"]');
    if (await card.count()) {
      linked++;
      await expect(card).toHaveAttribute('href', /^https:\/\/github\.com\/rlatkd\//);
      await expect(card).toHaveAttribute('target', '_blank');
    }
    await projects.getByRole('button', { name: '다음 프로젝트' }).click();
  }
  expect(linked).toBe(5);
  await expect(dots.first()).toHaveAttribute('aria-current', 'true');
  await expect(projects.getByRole('link', { name: /소스 코드|설계 · 실행 문서|결과 이미지|시연 GIF|시스템 구조도/ })).toHaveCount(0);
  expect(await projects.locator('a a').count()).toBe(0);
  await page.goto('/posts/Deployment');
  await expect(page.getByRole('link', { name: 'Velog 원문 보기' })).toHaveCount(0);
  await expect(page.getByText('원문 수정일')).toHaveCount(0);
  await expect(page.locator('article img').first()).toHaveAttribute('alt', /In-place 배포 흐름/);
  const removedPage = await request.get('/evidence');
  expect(removedPage.status()).toBe(404);
  const sitemap = await request.get('/sitemap.xml');
  expect(await sitemap.text()).not.toContain('/evidence');
  const response = await request.get('/reports/upquant-correlation.json');
  expect(response.status()).toBe(200);
  const report = await response.json();
  expect(report.providerCalls.warmTotal).toBe(0);
  expect(report.resultConsistency).toBe(true);
  expect(report.warm.rawMs).toHaveLength(report.warm.samples);
});
