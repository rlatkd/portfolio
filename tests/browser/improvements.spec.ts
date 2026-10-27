import { test, expect } from '@playwright/test';

test('article navigation preserves listing context and mobile contents are usable', async ({ page }) => {
  await page.goto('/posts?category=frontend&q=Next.js');
  const card = page.locator('a[href^="/posts/Next.js?"]');
  await expect(card).toContainText('Next.js');
  await card.click();
  await expect(page.getByRole('complementary', { name: '내용 정정 안내' })).toHaveCount(0);
  if ((page.viewportSize()?.width || 0) < 1536) {
    await page.locator('summary').click();
    await expect(page.getByRole('navigation', { name: '본문 목차' })).toBeVisible();
  }
  await page.getByRole('link', { name: '글 목록으로', exact: true }).click();
  await expect(page).toHaveURL(/category=frontend&q=Next\.js/);
});

test('resume restores location and no page content is clipped', async ({ page, browserName }) => {
  // Exercise URL/state synchronization on slower CI machines as well.
  if (browserName === 'chromium') {
    const session = await page.context().newCDPSession(page);
    await session.send('Emulation.setCPUThrottlingRate', { rate: 6 });
  }
  await page.goto('/resume#page=2&zoom=1.25');
  await expect(page.locator('.resume-page[data-active="true"]')).toHaveAttribute('aria-label', '2쪽');
  await expect(page.getByLabel('현재 배율')).toHaveText('125%');
  await page.reload();
  await expect(page.locator('.resume-page[data-active="true"]')).toHaveAttribute('aria-label', '2쪽');
  await page.getByRole('button', { name: '너비 맞춤', exact: true }).click();
  for (let index = 0; index < 5; index++) {
    await page.goto(`/resume#page=${index + 1}`);
    const paper = page.locator('.resume-page[data-active="true"]');
    await expect(paper).toHaveAttribute('aria-label', `${index + 1}쪽`);
    await expect(page).toHaveURL(new RegExp(`/resume#page=${index + 1}$`));
    const dimensions = await paper.evaluate(element => {
      const content = element.firstElementChild as HTMLElement;
      return { used: content.scrollHeight, available: content.clientHeight };
    });
    expect(dimensions.used, `page ${index + 1}`).toBeLessThanOrEqual(dimensions.available + 1);
  }
  await page.goBack();
  await expect(page.locator('.resume-page[data-active="true"]')).toHaveAttribute('aria-label', '4쪽');
  await expect(page).toHaveURL(/\/resume#page=4$/);
  await page.goForward();
  await expect(page.locator('.resume-page[data-active="true"]')).toHaveAttribute('aria-label', '5쪽');
  await expect(page).toHaveURL(/\/resume#page=5$/);
});

test('security headers are present and projects auto-advance with reading controls', async ({ page, request }) => {
  const response = await request.get('/');
  expect(response.headers()['x-content-type-options']).toBe('nosniff');
  expect(response.headers()['content-security-policy-report-only']).toContain("object-src 'none'");
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const first = page.locator('#projects li[aria-hidden="false"] h3');
  const title = await first.innerText();
  await expect(first).not.toHaveText(title, { timeout: 6000 });
  await expect(page.getByRole('button', { name: '프로젝트 자동 전환 정지' })).toHaveCount(0);
  await page.getByRole('button', { name: '다음 프로젝트' }).focus();
  const pausedTitle = await first.innerText();
  await page.waitForTimeout(3800);
  await expect(first).toHaveText(pausedTitle);
  await page.getByRole('button', { name: '다음 프로젝트' }).click();
  await expect(first).not.toHaveText(pausedTitle);
});
