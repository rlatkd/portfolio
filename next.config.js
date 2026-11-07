/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  // 블로그 본문의 외부 이미지를 Next.js 이미지 변환기로 WebP·화면 너비에 맞춰 보낸다(본문 마크다운과 원본 주소는 그대로).
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'velog.velcdn.com' },
      { protocol: 'https', hostname: 'images.velog.io' },
      { protocol: 'https', hostname: 'grepp-programmers.s3.ap-northeast-2.amazonaws.com' },
      { protocol: 'https', hostname: 'user-images.githubusercontent.com' },
      { protocol: 'https', hostname: 'u.acmicpc.net' },
      // 원문 주소가 깨진 백준 문제 그림의 대체 주소(image-metadata.json replacement)
      { protocol: 'https', hostname: 'onlinejudgeimages.s3-ap-northeast-1.amazonaws.com' },
    ],
  },
  async redirects() {
    return [
      // 개인정보 처리방침은 하단 링크에서 여는 모달이다. 옛 주소는 홈으로 보낸다.
      { source: '/privacy', destination: '/', permanent: true },
    ];
  },
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ...(process.env.NODE_ENV === 'production' ? [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }] : []),
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      // 보고 전용 모드: 막지 않고 위반만 /api/csp-report로 보고받는다(Vercel 함수 로그에 csp-report로 남는다).
      // report-to(Reporting API, 이름 csp = Reporting-Endpoints)를 지원하는 브라우저는 그것을 쓰고, 나머지는 report-uri를 쓴다.
      // Chrome은 Reporting-Endpoints를 HTTPS 응답에서만 받아들인다. 로컬 HTTP(127.0.0.1)에서는 보고 주소가 등록되지 않아 보고가 가지 않는다.
      // www.google.com은 GA가 Google 신호용으로 같은 측정을 보내는 곳이다.
      { key: 'Content-Security-Policy-Report-Only', value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com https://vercel.live; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: blob: https://velog.velcdn.com https://images.velog.io https://*.google-analytics.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.google.com https://vitals.vercel-insights.com https://*.vercel-insights.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; report-uri /api/csp-report; report-to csp" },
      { key: 'Reporting-Endpoints', value: 'csp="/api/csp-report"' },
    ] }];
  },
};
