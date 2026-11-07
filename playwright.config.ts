import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  timeout: 30000,
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:3100', reducedMotion: 'reduce', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium', channel: process.env.CI ? undefined : 'chrome' } },
    { name: 'mobile-webkit', testMatch: /improvements\.spec\.ts/, use: { ...devices['iPhone 13'], browserName: 'webkit', reducedMotion: 'no-preference' } },
  ],
  // 프로젝트 기준(pnpm)에 맞춰 npm 대신 pnpm으로 실행한다(npm 실행 시 pnpm 설정 경고가 난다).
  webServer: { command: 'pnpm exec next start --hostname 127.0.0.1 --port 3100', url: 'http://127.0.0.1:3100', reuseExistingServer: false, timeout: 30000 },
});
