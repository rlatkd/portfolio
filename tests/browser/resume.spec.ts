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

// 낮은 데스크톱(global.css와 같은 구간)은 기본 배율이 확대·축소 한 단계 작고, 너비 맞춤도 그 값으로 돌아온다.
test('resume starts one zoom step smaller on short desktop screens', async ({ page }) => {
  const zoom = page.getByLabel('현재 배율');
  await page.setViewportSize({ width: 1440, height: 760 });
  await page.goto('/resume');
  await expect(zoom).toHaveText('75%');
  await page.getByRole('button', { name: '확대', exact: true }).click();
  await expect(zoom).toHaveText('100%');
  await page.getByRole('button', { name: '너비 맞춤', exact: true }).click();
  await expect(zoom).toHaveText('75%');
  await page.setViewportSize({ width: 1440, height: 761 });
  await expect(zoom).toHaveText('100%');
});

// 하이드레이션 전(서버 HTML과 인라인 스크립트만 실행된 상태)에도 첫 배율이 화면에 맞아야 한다.
// 100%로 그렸다가 줄어드는 깜빡임을 막는 resume-scale.ts 스크립트를 지킨다. JS 번들을 막아 하이드레이션을 멈춘다.
test('resume paints the fitted zoom before hydration', async ({ page }) => {
  await page.route(/\/_next\/static\/chunks\//, route => route.abort());
  for (const [width, height, expected] of [[1440, 700, .75], [1920, 1080, 1]] as const) {
    await page.setViewportSize({ width, height });
    await page.goto('/resume');
    // 배율 글자는 하이드레이션 뒤에만 채워지므로, 비어 있으면 아직 하이드레이션 전이다.
    await expect(page.getByLabel('현재 배율')).toHaveText('');
    const scale = await page.locator('.resume-page').first().evaluate(element => new DOMMatrix(getComputedStyle(element.parentElement!).transform).a);
    expect(scale).toBeCloseTo(expected, 3);
  }
});

test('resume printing restores all pages without screen zoom or controls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/resume');
  await page.getByRole('button', { name: '확대', exact: true }).click();
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.resume-page:visible')).toHaveCount(7);
  await expect(page.getByLabel('이력서 보기 도구')).toBeHidden();
  const transforms = await page.locator('.resume-page').evaluateAll(pages => pages.map(element => getComputedStyle(element.parentElement!).transform));
  expect(transforms.every(transform => transform === 'none')).toBe(true);
});

// 기기가 CSS 용지(A4 · 여백 0)를 무시하고 더 작은 용지 · 여백으로 인쇄해도 쪽마다 빈 쪽이 끼지 않아야 한다.
// 뒤에 붙인 @page 규칙으로 그런 기기를 흉내 내도 7쪽 그대로 나와야 한다(PDF는 Chromium에서만 만들 수 있다).
test('printing on paper smaller than A4 keeps one resume page per sheet', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'PDF 생성은 Chromium만 지원');
  const countPages = (pdf: Buffer) => (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  await page.goto('/resume');
  expect(countPages(await page.pdf({ preferCSSPageSize: true, printBackground: true }))).toBe(7);
  for (const paper of ['letter; margin: 0', 'letter; margin: 0.5in', 'A4; margin: 12mm']) {
    await page.goto('/resume');
    await page.addStyleTag({ content: `@page { size: ${paper}; }` });
    expect(countPages(await page.pdf({ preferCSSPageSize: true, printBackground: true })), paper).toBe(7);
  }
});

// 앱 안의 브라우저(네이버 앱 등)는 window.print()가 아무 일도 하지 않는다. 인쇄가 시작되지 않으면 안내를 띄운다.
test.describe('in-app browser printing', () => {
  test.use({ userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-S918N Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/130.0.6723.107 Mobile Safari/537.36 NAVER(inapp; search; 2000; 12.10.4)', viewport: { width: 390, height: 844 } });
  test('shows how to open the resume in a regular browser', async ({ page }) => {
    await page.addInitScript(() => { window.print = () => {}; });
    await page.goto('/resume');
    // 휴대폰 폭에서도 버튼 이름은 데스크톱과 같다
    await expect(page.getByRole('button', { name: '인쇄 | PDF 저장', exact: true })).toBeVisible();
    await page.getByRole('button', { name: /PDF 저장$/ }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('link', { name: 'Chrome으로 열기' })).toHaveAttribute('href', /^intent:\/\/[^/]+\/resume#Intent;scheme=https;package=com\.android\.chrome;end$/);
    // Chrome이 없는 기기를 위해 기본 브라우저로 여는 intent도 둔다.
    await expect(dialog.getByRole('link', { name: '다른 브라우저로 열기' })).toHaveAttribute('href', /^intent:\/\/[^/]+\/resume#Intent;scheme=https;action=android\.intent\.action\.VIEW;category=android\.intent\.category\.BROWSABLE;end$/);
    await dialog.getByRole('button', { name: '닫기' }).click();
    await expect(dialog).toBeHidden();
  });
});

test('regular browsers print immediately without the in-app guidance', async ({ page }) => {
  await page.addInitScript(() => {
    (window as unknown as { printCalls: number }).printCalls = 0;
    window.print = () => { (window as unknown as { printCalls: number }).printCalls++; window.dispatchEvent(new Event('beforeprint')); };
  });
  await page.goto('/resume');
  await expect(page.getByRole('button', { name: '인쇄 | PDF 저장', exact: true })).toBeVisible();
  await page.getByRole('button', { name: /PDF 저장$/ }).click();
  await page.waitForTimeout(900);
  expect(await page.evaluate(() => (window as unknown as { printCalls: number }).printCalls)).toBe(1);
  await expect(page.getByRole('dialog')).toBeHidden();
});
