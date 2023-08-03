import './globals.css'
import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import Script from 'next/script'
import 'tailwindcss/tailwind.css';

import HabibNavbar from '@/lib/components/header';
import HabibFooter from '@/lib/components/footer';

import JahfalNavbar from '@/src/app/components/navbar'
import JahfalFooter from '@/src/app/components/footer';




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
          <HabibNavbar />
          <JahfalNavbar />

          <main className="flex-1 py-20">
            {children}
          </main>

          <HabibFooter />
          <JahfalFooter />
      </body>
    </html>
  )
}
