import Header from '@/lib/components/header';
import './globals.css'
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import 'tailwindcss/tailwind.css';
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
    <html lang="en" className='h-full'>
      <head>
        <link rel="manifest" href='/manifest.json'/>
      </head>
      <body className={roboto.className+" h-full"}>
          <Header />

          <main className="flex-1 py-20">
            {children}
          </main>

          <Footer />
      </body>
    </html>
  )
}
