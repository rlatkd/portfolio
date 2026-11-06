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
  const writingPosts = page.locator('#posts a[href^="/posts/"]');
  await expect(writingPosts).toHaveCount(5);
  const dates = await writingPosts.locator('span.font-code').allTextContents();
  expect(dates).toEqual([...dates].sort().reverse());
  await expect(page.locator('script[src*="googletagmanager.com/gtag/js"]')).toHaveCount(0);
  // 다크가 기본 테마이고, 전환한 라이트 테마가 새로고침 후에도 유지된다
  await expect(page.locator('html')).toHaveClass(/dark/);
  const toggle = page.getByRole('button', { name: '테마 전환' });
  await toggle.click();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await page.getByRole('navigation', { name: '포트폴리오 목차' }).getByRole('link', { name: 'experience/' }).click();
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
    // 2026-11-04: 글은 공유 카드 종류가 article이고 수정일은 원문(velog) 수정일이다.
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
    await expect(page.locator('meta[property="article:modified_time"]')).toHaveAttribute('content', (sources as Record<string, { updatedAt: string }>)[slug].updatedAt);
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
  expect((await sitemap.text()).match(/<loc>/g)).toHaveLength(Object.keys(sources).length + 2); // 홈 · 글 목록 (2026-11-01 /privacy는 모달로 바뀌어 제외)
  const rss = await request.get('/rss');
  expect(rss.status()).toBe(200);
  expect((await rss.text()).match(/<item>/g)).toHaveLength(Object.keys(sources).length);
  // 2026-11-05: 공유 카드 이미지는 한 가지(제목 붙은 모양은 삭제)
  const og = await request.get('/api/og');
  expect(og.status()).toBe(200);
  expect(og.headers()['content-type']).toContain('image/png');
  const image = await request.get('/_next/image?url=%2Fimages%2Fup-quant%2Fpreview.webp&w=640&q=75');
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
  await expect(page).toHaveTitle('resume');
  // 2026-11-01: /resume2를 /resume로 통합했다
  expect((await request.get('/resume2', { maxRedirects: 0 })).status()).toBe(308);
  expect(await (await request.get('/sitemap.xml')).text()).not.toContain('/resume');
  // 2026-11-01: 개인정보 안내는 하단 링크에서 여는 모달이다
  await page.goto('/');
  await page.getByRole('button', { name: '개인정보 처리방침' }).click();
  await expect(page.getByRole('dialog')).toContainText('방문 분석');
  expect((await request.get('/privacy', { maxRedirects: 0 })).status()).toBe(308);
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

test('project cards link to GitHub and reviewed image descriptions are served', async ({ page, request }) => {
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
  // 2026-11-04: 수정일을 작성일 옆에 다시 보인다(값은 원문 velog 수정일). Velog 원문 링크는 계속 두지 않는다.
  await expect(page.locator(`header time[datetime="${(sources as Record<string, { updatedAt: string }>).Deployment.updatedAt}"]`)).toBeVisible();
  await expect(page.locator('article img').first()).toHaveAttribute('alt', /In-place 배포 흐름/);
  const removedPage = await request.get('/evidence');
  expect(removedPage.status()).toBe(404);
  const sitemap = await request.get('/sitemap.xml');
  expect(await sitemap.text()).not.toContain('/evidence');
});

// 2026-11-04: 화면 아래 가림 띠가 키보드 포커스를 덮지 않는다(가림 띠보다 위층인 사이드바 · 떠 있는 버튼은 제외).
test('keyboard focus and its focus ring stay above the bottom mask', async ({ page }) => {
  for (const [width, height] of [[1280, 720], [1440, 900]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    const covered: string[] = [];
    for (let index = 0; index < 80; index++) {
      await page.keyboard.press('Tab');
      // 동작 줄이기 설정(reduce)에서는 모든 속성에 0.01ms 전환이 걸려, 포커스 직후 한 프레임은 이전 테두리 값이 읽힌다.
      const result = await page.evaluate(async () => {
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        const element = document.activeElement as HTMLElement | null;
        const mask = document.querySelector('.portfolio-bottom-mask');
        if (!element || element === document.body || !mask || element.closest('header.portfolio-sidebar, .portfolio-floating')) return null;
        const box = element.getBoundingClientRect();
        if (!box.width || !box.height) return null;
        const style = getComputedStyle(element);
        const ringBottom = box.bottom + parseFloat(style.outlineOffset) + parseFloat(style.outlineWidth);
        const maskTop = mask.getBoundingClientRect().top;
        return ringBottom > maskTop + 1 ? `${element.tagName} ${(element.getAttribute('aria-label') || element.textContent || '').trim().slice(0, 24)} (테두리 아래 ${ringBottom.toFixed(1)} · 가림 띠 위 ${maskTop} · ${style.outlineWidth} ${style.outlineOffset})` : null;
      });
      if (result) covered.push(result);
    }
    expect(covered, `${width}x${height}`).toEqual([]);
  }
});

// 2026-11-04: 탭(경력 · 학력 · 기술)은 WAI-ARIA 탭 패턴대로 선택된 탭만 Tab 정지점이고 방향키 · Home · End로 옮긴다.
test('pane tabs move with arrow, Home and End keys', async ({ page }) => {
  await page.goto('/');
  const tabs = page.getByRole('tablist', { name: '경력 · 학력 · 기술' }).getByRole('tab');
  await expect(tabs).toHaveCount(3);
  await expect(tabs.nth(0)).toHaveAttribute('tabindex', '0');
  await expect(tabs.nth(1)).toHaveAttribute('tabindex', '-1');
  await tabs.nth(0).focus();
  await page.keyboard.press('ArrowRight');
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel', { name: '학력' })).toBeVisible();
  await page.keyboard.press('End');
  await expect(tabs.nth(2)).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(tabs.nth(0)).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(tabs.nth(2)).toBeFocused();
  await page.keyboard.press('Home');
  await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('tabpanel', { name: '경력' })).toBeFocused();
});

// 2026-11-05: 위에 고정된 줄(모바일 홈 영역 탭 줄, 블로그 머리 줄)이 Shift+Tab으로 위로 옮긴 포커스를 가리지 않는다.
test('focus moving upward stays below the sticky bars', async ({ page }) => {
  for (const [path, width, height, bar] of [['/', 390, 844, '.mobile-section-nav'], ['/posts', 1440, 900, 'header'], ['/posts', 390, 844, 'header']] as const) {
    await page.setViewportSize({ width, height });
    await page.goto(path);
    for (let index = 0; index < 100; index++) await page.keyboard.press('Tab');
    const covered: string[] = [];
    for (let index = 0; index < 100; index++) {
      await page.keyboard.press('Shift+Tab');
      const result = await page.evaluate(async selector => {
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        const element = document.activeElement as HTMLElement | null;
        const sticky = document.querySelector(selector);
        if (!element || element === document.body || !sticky || sticky.contains(element) || element.classList.contains('skip-link')) return null;
        const bar = sticky.getBoundingClientRect();
        const box = element.getBoundingClientRect();
        if (!box.width || bar.top > 1) return null;
        const style = getComputedStyle(element);
        const ringTop = box.top - parseFloat(style.outlineOffset) - parseFloat(style.outlineWidth);
        return ringTop < bar.bottom - 1 ? `${(element.getAttribute('aria-label') || element.textContent || '').trim().slice(0, 20)} (테두리 위 ${ringTop.toFixed(1)} < 고정 줄 아래 ${bar.bottom.toFixed(1)})` : null;
      }, bar);
      if (result) covered.push(result);
    }
    expect(covered, `${path} ${width}x${height}`).toEqual([]);
  }
});

test('navigation spinner appears only for slow moves and clears after the page changes', async ({ page }) => {
  await page.goto('/posts');
  const spinner = page.locator('[data-navigation-spinner]');
  // 빠른 이동: 0.3초 안에 끝나면 스피너가 보이지 않는다.
  await page.getByRole('link', { name: '2 페이지로' }).click();
  await expect(page).toHaveURL(/page=2/);
  await expect(spinner).toHaveCount(0);
  // 느린 이동: 응답을 늦추면 스피너가 보이고, 쪽이 바뀌면 사라진다.
  await page.route(/\/posts\?(.*&)?page=3/, async route => { await new Promise(resolve => setTimeout(resolve, 1500)); await route.continue(); });
  await page.getByRole('link', { name: '3 페이지로' }).click();
  await expect(spinner).toBeVisible();
  await expect(page).toHaveURL(/page=3/);
  await expect(spinner).toHaveCount(0);
  await expect(page.getByText('페이지를 불러오는 중')).toHaveCount(0);
});
