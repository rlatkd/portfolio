import '/styles/global.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { themeEffect } from '@/features/ThemeToggle/lib/themeEffect';
import { baseUrl } from '@/app/sitemap';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: '김상훈',
    template: '%s · 김상훈',
  },
  description: '데이터 정합성과 시스템 신뢰성을 우선하는 소프트웨어 엔지니어 김상훈의 포트폴리오.',
  openGraph: {
    title: '김상훈 · Software Engineer',
    description: '데이터 정합성과 시스템 신뢰성을 우선하는 소프트웨어 엔지니어 김상훈의 포트폴리오.',
    siteName: '김상훈',
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='ko' suppressHydrationWarning={true}>
      <head>
        <link
          rel='stylesheet'
          as='style'
          crossOrigin='anonymous'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css'
        />
        {/* FOUC 방지: 페인트 전에 테마 적용 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})()`,
          }}
        />
      </head>
      <body className='bg-bg text-fg antialiased min-h-screen'>
        <main className='flex-auto min-w-0 flex flex-col'>
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
