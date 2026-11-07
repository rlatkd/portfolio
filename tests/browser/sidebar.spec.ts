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

// 모바일 · 태블릿은 오른쪽 위 목차 버튼으로 이동한다. 맨 위에서는 숨고 about 영역부터 보이며, 누르면 목차가 열린다.
test('mobile section menu appears from about and jumps to sections', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const button = page.getByRole('button', { name: '목차' });
  await expect(button).toBeHidden();
  await page.evaluate(() => window.scrollTo(0, document.getElementById('about')!.getBoundingClientRect().top + window.scrollY));
  await expect(button).toBeVisible();
  // 나타나는 움직임(위로 가기 버튼과 같은 translate)이 끝난 뒤 위치를 잰다.
  await expect.poll(async () => Math.round((await button.boundingBox())!.y)).toBe(24);
  const buttonBox = (await button.boundingBox())!;
  // 오른쪽 간격은 본문 오른쪽 끝(24px)보다 바깥인 12px(--floating-edge)이다.
  expect(Math.round(390 - buttonBox.x - buttonBox.width)).toBe(12);
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  const menu = page.locator('#mobile-section-menu-list');
  await expect(menu.getByRole('link', { name: 'about.md', exact: true })).toHaveAttribute('aria-current', 'location');
  await menu.getByRole('link', { name: 'posts/', exact: true }).click();
  await expect(page).toHaveURL(/#posts$/);
  await expect(menu).toBeHidden();
  await expect(button).toBeFocused();
  // 이동한 영역의 머리는 목차 버튼 아래에서 시작한다.
  await expect.poll(async () => Math.round((await page.locator('#posts').boundingBox())!.y)).toBeGreaterThanOrEqual(Math.round(buttonBox.y + buttonBox.height));
  await button.click();
  await expect(menu.getByRole('link', { name: 'posts/', exact: true })).toHaveAttribute('aria-current', 'location');
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(button).toBeFocused();
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(button).toBeHidden();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(button).toBeHidden();
});

// 데스크톱 홈: 사이드바 이름(김상훈) 글자 위 끝과 오른쪽 첫 영역(about.md) 위 끝이 같은 높이다(global.css --sidebar-top · --sidebar-name-offset).
test('sidebar name glyph top aligns with the about pane top', async ({ page }) => {
  for (const [width, height] of [[1440, 900], [1280, 720], [1024, 768]] as const) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const { glyphTop, aboutTop } = await page.evaluate(() => {
      const heading = document.querySelector('header.portfolio-sidebar h1')!;
      const style = getComputedStyle(heading);
      const context = document.createElement('canvas').getContext('2d')!;
      context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const metrics = context.measureText(heading.textContent || '');
      const leading = (parseFloat(style.lineHeight) - metrics.fontBoundingBoxAscent - metrics.fontBoundingBoxDescent) / 2;
      return {
        glyphTop: heading.getBoundingClientRect().top + leading + metrics.fontBoundingBoxAscent - metrics.actualBoundingBoxAscent,
        aboutTop: document.getElementById('about')!.getBoundingClientRect().top,
      };
    });
    expect(Math.abs(glyphTop - aboutTop), `${width}x${height}`).toBeLessThanOrEqual(1);
  }
});
