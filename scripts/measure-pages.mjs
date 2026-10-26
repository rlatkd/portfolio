import fs from 'node:fs/promises';
import { chromium } from '@playwright/test';

const origin = process.env.MEASURE_ORIGIN || 'http://127.0.0.1:3000';
const parsed = new URL(origin);
if (!['localhost', '127.0.0.1'].includes(parsed.hostname)) throw new Error('Measure a local production build to avoid polluting analytics.');
const browser = await chromium.launch({ channel: process.env.CI ? undefined : 'chrome' });
const results = [];
await fs.mkdir('test-results', { recursive: true });
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    // Same-origin system fonts make the report independent of the font CDN's availability.
    await context.route('https://**/*', route => route.abort());
    for (const path of ['/', '/posts', '/posts/Next.js', '/resume']) {
      const page = await context.newPage();
      await page.addInitScript(() => {
        window.__measure = { lcpMs: null, cls: 0 };
        new PerformanceObserver(list => { for (const entry of list.getEntries()) window.__measure.lcpMs = entry.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
        new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__measure.cls += entry.value; }).observe({ type: 'layout-shift', buffered: true });
      });
      await page.goto(origin + path, { waitUntil: 'networkidle' });
      const metrics = await page.evaluate(() => {
        const nav = performance.getEntriesByType('navigation')[0];
        const resources = performance.getEntriesByType('resource');
        return { ...window.__measure, ttfbMs: nav.responseStart - nav.requestStart, transferredBytes: resources.reduce((sum, item) => sum + item.transferSize, 0), resourceCount: resources.length, horizontalOverflow: document.documentElement.scrollWidth > innerWidth };
      });
      results.push({ path, width, ...metrics });
      await page.screenshot({ path: `test-results/page-${width}-${path === '/' ? 'home' : path.split('/').pop()}.png`, fullPage: false });
      await page.close();
    }
    await context.close();
  }
} finally { await browser.close(); }
const report = { measuredAt: new Date().toISOString(), scope: 'Local production build, unthrottled desktop Chrome at two viewport widths. External fonts and analytics blocked. Synthetic observation only; not field Core Web Vitals or a Lighthouse score.', results };
await fs.mkdir('test-results', { recursive: true });
await fs.writeFile('test-results/page-metrics.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
