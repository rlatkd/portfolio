import '@/styles/global.css';
import type { Metadata } from 'next';
import { JetBrains_Mono, Nanum_Gothic_Coding } from 'next/font/google';
import { themeEffect } from '@/features/theme-toggle/lib/theme-effect';
import { baseUrl, defaultOgImage, siteTitle, siteDescription } from '@/shared/config/site';
import { ProductionAnalytics } from '@/shared/ui/production-analytics';
import { FloatingControls } from '@/shared/ui/floating-controls';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: '김상훈 | 개발자 포트폴리오',
    template: '%s · 김상훈',
  },
  description: '데이터 정합성과 시스템 신뢰성을 우선하는 풀스택 개발자 김상훈의 포트폴리오.',
  openGraph: {
    title: '김상훈 · Software Engineer',
    description: '데이터 정합성과 시스템 신뢰성을 우선하는 풀스택 개발자 김상훈의 포트폴리오.',
    siteName: '김상훈',
    locale: 'ko_KR',
    type: 'website',
    url: baseUrl,
    images: [{ url: defaultOgImage, width: 1200, height: 630, alt: siteTitle }],
  },
  twitter: { card: 'summary_large_image', title: siteTitle, description: siteDescription, images: [defaultOgImage] },
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
  verification: {
    other: {
      'naver-site-verification': '70997e3df58368befc12d4ef6aec95b76e5dd910',
    },
  },
};

// 2026-11-01: VS Code 디자인의 라벨·파일명·날짜용 고정폭 글꼴. 빌드 때 받아 이 사이트 서버에서 제공한다.
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-jetbrains', display: 'swap' });
const nanumCoding = Nanum_Gothic_Coding({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-nanum-coding', display: 'swap', preload: false });

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='ko' suppressHydrationWarning={true}>
      <head>
        <link rel='alternate' type='application/rss+xml' title='김상훈 · Writing' href={`${baseUrl}/rss`} />
        {/* FOUC 방지: 페인트 전에 테마 적용 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})()`,
          }}
        />
      </head>
      {/* 글꼴 변수는 body에 둔다. html의 class는 테마 스크립트가 붙이는 dark를 React가 지우지 않도록 비워 둔다. */}
      <body className={`${jetbrains.variable} ${nanumCoding.variable} text-fg antialiased min-h-screen`}>
        <a href='#main-content' className='skip-link'>본문 바로가기</a>
        <div className='flex-auto min-w-0 flex flex-col'>
          {children}
          <FloatingControls />

        </div>
        <ProductionAnalytics enabled={process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production'} hostname={new URL(baseUrl).hostname} />
      </body>
    </html>
  );
}
