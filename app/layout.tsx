import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Header } from './components/client/header'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { themeEffect } from './utils/themeEffect'
import Footer from './components/client/footer'
import { Top } from './components/top'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
          <Header />
          <Top />
          <div>
            {children}
          </div>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
