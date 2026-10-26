import '@/styles/global.css';
import type { Metadata } from 'next';
import { themeEffect } from '@/features/ThemeToggle/lib/themeEffect';
import { baseUrl, defaultOgImage, siteTitle, siteDescription } from '@/shared/config/site';
import { ProductionAnalytics } from '@/shared/ui/ProductionAnalytics';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: '김상훈 · Software Engineer',
    template: '%s · 김상훈',
  },
  description: '데이터 정합성과 시스템 신뢰성을 우선하는 소프트웨어 엔지니어 김상훈의 포트폴리오.',
  openGraph: {
    title: '김상훈 · Software Engineer',
    description: '데이터 정합성과 시스템 신뢰성을 우선하는 소프트웨어 엔지니어 김상훈의 포트폴리오.',
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

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='ko' suppressHydrationWarning={true}>
      <head>
        <link rel='alternate' type='application/rss+xml' title='김상훈 · Writing' href={`${baseUrl}/rss`} />
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
        <a href='#main-content' className='skip-link'>본문 바로가기</a>
        <div className='flex-auto min-w-0 flex flex-col'>
          {children}

        </div>
        <ProductionAnalytics enabled={process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production'} hostname={new URL(baseUrl).hostname} />
      </body>
    </html>
  );
}
