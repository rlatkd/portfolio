import { test, expect } from '@playwright/test';
import sources from '../../src/shared/content/velog-sources.json';

test('home navigation, theme persistence and landmarks work without runtime errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.locator('script[src*="googletagmanager.com/gtag/js"]')).toHaveCount(1);
  const toggle = page.getByRole('button', { name: '테마 전환' });
  await toggle.click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.getByRole('navigation', { name: '포트폴리오 목차' }).getByRole('link', { name: 'Strengths' }).click();
  await expect(page).toHaveURL(/#strengths/);
  await expect(page.getByRole('button', { name: '맨 위로' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('mobile archive stays within viewport and pagination/category links work', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/posts');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('link', { name: '다음 페이지로', exact: true }).click();
  await expect(page).toHaveURL('/posts?page=2');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.sanghunkim.com/posts?page=2');
  await page.getByRole('link', { name: 'java', exact: true }).click();
  await expect(page).toHaveURL('/posts?category=java');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('all 50 restored articles have valid DOM, metadata and no comments requests', async ({ page }) => {
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
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.sanghunkim.com/posts/${encodeURIComponent(slug)}`);
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
  expect(source).toContain('==');
  await page.locator('article').getByRole('button', { name: '코드 복사', exact: true }).last().click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(source);
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
  expect((await sitemap.text()).match(/<loc>/g)).toHaveLength(52);
  const rss = await request.get('/rss');
  expect(rss.status()).toBe(200);
  expect((await rss.text()).match(/<item>/g)).toHaveLength(50);
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
  await page.getByRole('button', { name: '테마 전환' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  expect(errors).toEqual([]);
});
