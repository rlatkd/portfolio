import { test, expect } from '@playwright/test';

test.use({ reducedMotion: 'no-preference' });

for (const [width, height] of [[1440, 720], [1440, 900], [1136, 1190], [1440, 2160]]) {
  test(`Writing navigation works at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    const navigation = page.getByRole('navigation', { name: '포트폴리오 목차' });
    const writing = navigation.getByRole('link', { name: 'posts/', exact: true });
    await writing.click();
    await expect(page).toHaveURL(/#posts$/);
    await expect(writing).toHaveAttribute('aria-current', 'location');
    const distanceToWriting = () => page.evaluate(() => {
      const section = document.getElementById('posts')!;
      const offset = parseFloat(getComputedStyle(section).scrollMarginTop) + parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
      const target = Math.min(document.documentElement.scrollHeight - innerHeight, scrollY + section.getBoundingClientRect().top - offset);
      return Math.abs(scrollY - target);
    });
    await expect.poll(distanceToWriting).toBeLessThanOrEqual(2);
    await navigation.getByRole('link', { name: 'side-projects/', exact: true }).click();
    await expect(navigation.getByRole('link', { name: 'side-projects/', exact: true })).toHaveAttribute('aria-current', 'location');
    await writing.click();
    await expect(writing).toHaveAttribute('aria-current', 'location');
    await expect.poll(distanceToWriting).toBeLessThanOrEqual(2);
    // Reusing the same hash must still navigate after the user scrolls away.
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await writing.click();
    await expect.poll(distanceToWriting).toBeLessThanOrEqual(2);
    await expect(writing).toHaveAttribute('aria-current', 'location');
    await page.reload();
    await expect(writing).toHaveAttribute('aria-current', 'location');
    await page.mouse.move(width - 40, height / 2);
    await page.mouse.wheel(0, -30000);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(navigation.getByRole('link', { name: 'about.md', exact: true })).toHaveAttribute('aria-current', 'location');
  });
}

// 2026-11-04: 모바일 · 태블릿은 about 위 영역 탭 줄로 이동한다. 스크롤하면 화면 맨 위에 붙고, 지금 영역 탭을 강조한다.
test('mobile section tabs stick to the top and jump to sections', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const navigation = page.getByRole('navigation', { name: '포트폴리오 목차' });
  await expect(navigation.getByRole('link', { name: 'about.md', exact: true })).toHaveAttribute('aria-current', 'location');
  const posts = navigation.getByRole('link', { name: 'posts/', exact: true });
  await posts.click();
  await expect(page).toHaveURL(/#posts$/);
  await expect(posts).toHaveAttribute('aria-current', 'location');
  await expect.poll(() => navigation.evaluate(element => Math.round(element.getBoundingClientRect().top))).toBe(0);
  await expect.poll(async () => {
    const [section, bar] = await Promise.all([page.locator('#posts').boundingBox(), navigation.boundingBox()]);
    return section!.y >= bar!.y + bar!.height;
  }).toBe(true);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator('nav[aria-label="포트폴리오 목차"]').filter({ has: page.locator('a[href="/#posts"]') })).toHaveCount(2);
  await expect(navigation).toHaveCount(1);
});
