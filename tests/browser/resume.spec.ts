import { test, expect } from '@playwright/test';

test('resume preserves A4 layout on mobile and zooms within its viewer', async ({ page }) => {
  const layouts: string[] = [];
  for (const width of [1280, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/resume');
    const paper = page.locator('.resume-page[data-active="true"]');
    const zoom = page.getByLabel('현재 배율');
    if (width < 794) await expect(zoom).not.toHaveText('100%');
    const fit = await zoom.innerText();
    const geometry = await paper.evaluate(element => ({
      width: element.clientWidth,
      height: element.clientHeight,
      header: getComputedStyle(element.querySelector('header')!).flexDirection,
      headings: [...element.querySelectorAll('h2,h3')].map(heading => ({ text: heading.textContent, top: (heading as HTMLElement).offsetTop })),
    }));
    layouts.push(JSON.stringify(geometry));
    expect(geometry.header).toBe('row');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole('button', { name: '확대', exact: true }).click();
    await expect.poll(async () => parseInt(await zoom.innerText())).toBeGreaterThan(parseInt(fit));
    await page.getByRole('button', { name: '너비 맞춤', exact: true }).click();
    await expect(zoom).toHaveText(fit);
    await page.getByRole('button', { name: '다음 쪽', exact: true }).click();
    await expect(paper).toHaveAttribute('aria-label', '2쪽');
  }
  expect(new Set(layouts).size).toBe(1);
});

test('resume printing restores all pages without screen zoom or controls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/resume');
  await page.getByRole('button', { name: '확대', exact: true }).click();
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.resume-page:visible')).toHaveCount(5);
  await expect(page.getByLabel('이력서 보기 도구')).toBeHidden();
  const transforms = await page.locator('.resume-page').evaluateAll(pages => pages.map(element => getComputedStyle(element.parentElement!).transform));
  expect(transforms.every(transform => transform === 'none')).toBe(true);
});
