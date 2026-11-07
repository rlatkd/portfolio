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
      // Report-only keeps static rendering and existing analytics working while violations are reviewed in DevTools.
      { key: 'Content-Security-Policy-Report-Only', value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com https://vercel.live; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; font-src 'self' https://cdn.jsdelivr.net; img-src 'self' data: blob: https://velog.velcdn.com https://images.velog.io https://*.google-analytics.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://vitals.vercel-insights.com https://*.vercel-insights.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'" },
    ] }];
  },
};
