import '@/styles/global.css';
import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import { themeEffect } from '@/features/theme-toggle/lib/theme-effect';
import { baseUrl, siteTitle, siteDescription } from '@/shared/config/site';
import { shareCard } from '@/shared/lib/seo';
import { ProductionAnalytics } from '@/shared/ui/production-analytics';
import { FloatingControls } from '@/shared/ui/floating-controls';
import { NavigationSpinner } from '@/shared/ui/navigation-spinner';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteTitle,
    template: '%s | 김상훈',
  },
  // 검색 결과용 페이지 설명. 공유 카드에 복사되지 않도록 other로 넣는다(shared/lib/seo.ts 참고).
  other: { description: siteDescription },
  ...shareCard(baseUrl),
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
// 2026-11-05: 라벨 속 한글은 본문 글꼴(Portfolio Sans)로 그리므로 나눔고딕코딩은 더 받지 않는다(global.css --font-code).

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='ko' suppressHydrationWarning={true}>
      <head>
        <link rel='alternate' type='application/rss+xml' title='김상훈 | Posts' href={`${baseUrl}/rss`} />
        {/* FOUC 방지: 페인트 전에 테마 적용 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})()`,
          }}
        />
      </head>
      {/* 글꼴 변수는 body에 둔다. html의 class는 테마 스크립트가 붙이는 dark를 React가 지우지 않도록 비워 둔다. */}
      <body className={`${jetbrains.variable} text-fg antialiased min-h-screen`}>
        <a href='#main-content' className='skip-link'>본문 바로가기</a>
        <div className='flex-auto min-w-0 flex flex-col'>
          {children}
          <FloatingControls />
          <NavigationSpinner />

        </div>
        <ProductionAnalytics enabled={process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production'} hostname={new URL(baseUrl).hostname} />
      </body>
    </html>
  );
}
