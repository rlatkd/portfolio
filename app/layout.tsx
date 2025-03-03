import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { themeEffect } from './(main)/utils/themeEffect'

export const metadata: Metadata = {
  title: {
    default: 'Katalog',
    template: 'Katalog',
  },
  description: 'This is my portfolio.',
  openGraph: {
    title: 'My Portfolio',
    description: 'This is my portfolio.',
    siteName: 'My Portfolio',
    locale: 'en_US',
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
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

type RootLayoutProps = {
  children: React.ReactNode,
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      {/* 다크모드 설정 */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect})()`,
          }}
        />
      </head>
      <body className="antialiased max-w-6xl mx-4 lg:mx-auto overflow-y-scroll">
        <main className="flex-auto min-w-0 flex flex-col px-2 md:px-0">
          <div>
            {children}
          </div>
          <Analytics />
          <SpeedInsights />
       </main>
      </body>
    </html>
  )
}
