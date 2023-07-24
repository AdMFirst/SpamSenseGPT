import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SpamSenseGPT',
  description: 'A Progresive Web App for detecting spam message using GPT AI Technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full bg-white'>
      <head>
        <link rel="manifest" href='/manifest.json'/>
      </head>
      <body className={inter.className+" h-full"}>
        {children}
      </body>
    </html>
  )
}
