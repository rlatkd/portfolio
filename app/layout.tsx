import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'


type RootLayoutProps = {
  children: React.ReactNode,
}

export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <html
      lang="en"
      className=
        'text-black bg-white dark:text-white dark:bg-black'
       
      
    >
      
      <head>
        
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
