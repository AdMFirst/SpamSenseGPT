import './globals.css'
import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import Script from 'next/script'
import 'tailwindcss/tailwind.css';

import Navbar from '@/lib/components/navbar'
import Footer from '@/lib/components/footer';




const roboto = Roboto({weight:"400", subsets: ['latin']});

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
      <body className={roboto.className+" h-full"}>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
      </body>
    </html>
  )
}
