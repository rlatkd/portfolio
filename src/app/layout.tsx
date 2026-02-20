import '/styles/global.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: {
    default: 'sanghunkim',
    template: 'shk',
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
  icons: {
    icon: '/favicon.ico',
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

type RootLayoutProps = {
  children: React.ReactNode,
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang='en'
      className={cx(
        'bg-black text-white',
        GeistSans.variable,
        GeistMono.variable
      )}
      suppressHydrationWarning={true}
    >
      {/* <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect})()`,
          }}
        />
      </head> */}
      <body className='antialiased mx-auto md:max-w-6xl overflow-x-hidden'>
        <main className='flex-auto min-w-0 flex flex-col'>
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
