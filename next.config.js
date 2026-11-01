/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  // 2026-11-01: 비교용 /resume2를 정식 /resume로 통합했다.
  async redirects() {
    return [
      { source: '/resume2', destination: '/resume', permanent: true },
      // 2026-11-01: 개인정보 처리방침은 별도 페이지 대신 하단 링크의 모달로 바꿨다.
      { source: '/privacy', destination: '/', permanent: true },
    ];
  },
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ...(process.env.NODE_ENV === 'production' ? [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }] : []),
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      // Report-only keeps static rendering and existing analytics working while violations are reviewed in DevTools.
      { key: 'Content-Security-Policy-Report-Only', value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com https://vercel.live; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; font-src 'self' https://cdn.jsdelivr.net; img-src 'self' data: blob: https://velog.velcdn.com https://images.velog.io https://*.google-analytics.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://vitals.vercel-insights.com https://*.vercel-insights.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'" },
    ] }];
  },
};
