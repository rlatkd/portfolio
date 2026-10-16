import { test, expect } from '@playwright/test';

test.use({ reducedMotion: 'no-preference' });

for (const [width, height] of [[1440, 720], [1440, 900], [1136, 1190], [1440, 2160]]) {
  test(`Writing navigation works at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    const navigation = page.getByRole('navigation', { name: '포트폴리오 목차' });
    const writing = navigation.getByRole('link', { name: 'Writing', exact: true });
    await writing.click();
    await expect(page).toHaveURL(/#writing$/);
    await expect(writing).toHaveAttribute('aria-current', 'location');
    const distanceToWriting = () => page.evaluate(() => {
      const section = document.getElementById('writing')!;
      const offset = parseFloat(getComputedStyle(section).scrollMarginTop) + parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
      const target = Math.min(document.documentElement.scrollHeight - innerHeight, scrollY + section.getBoundingClientRect().top - offset);
      return Math.abs(scrollY - target);
    });
    await expect.poll(distanceToWriting).toBeLessThanOrEqual(2);
    await navigation.getByRole('link', { name: 'Contact', exact: true }).click();
    await expect(navigation.getByRole('link', { name: 'Contact', exact: true })).toHaveAttribute('aria-current', 'location');
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
    await expect(navigation.getByRole('link', { name: 'About', exact: true })).toHaveAttribute('aria-current', 'location');
  });
}
