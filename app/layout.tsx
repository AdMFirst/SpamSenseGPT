import './globals.css'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

const inter = Inter({ subsets: ['latin'] });

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
        <title>SpamSenseGPT</title>
        <link rel="manifest" href='/manifest.json'/>
      </head>
      <body className={inter.className+" h-full"}>
          <header className="header-container fixed flex items-center w-full justify-between px-4 py-3 md:px-12 py-5 bg-blue-300 text-black">
            <div className="logo">
              <img src="icon-512x512.png" alt="Logo" className="w-14 h-14" />
            </div>
            <nav className="head">
              <ul className="flex space-x-5 md:space-x-12">
                <li>
                  <Link href="/" className='lg:text-[23px] md:text-[19px] text-[10px] text-base hover:underline'>Home</Link>
                </li>
                <li>
                  <Link href="/about" className='lg:text-[23px] md:text-[19px] text-[10px] text-base hover:underline'>About Us</Link>
                </li>
                <li>
                  <Link href="/pricing" className='lg:text-[23px] md:text-[19px] text-[10px] text-base hover:underline'>Pricing</Link>
                </li>
              </ul>
            </nav>
          </header>

          <main className="flex-1 py-28">
            {children}
          </main>

          <center>
            { <footer className="px-5 py-4 bg-blue-300">
              <img src="icon-512x512.png" alt="Logo" className='w-20 h-20' />
  
              <div className="grid grid-cols-4 gap-4 mt-4">
                <a href="/" className="text-xs md:text-base font-bold">Sitemap</a>
                <a href="/" className="text-xs md:text-base font-bold">Useful link</a>
                <a href="/" className="text-xs md:text-base font-bold">Our Other Project</a>
                <a href="/" className="text-xs md:text-base font-bold">Social Media</a>
                <a href="/" className="text-xs md:text-base">Home</a>
                <a href="/" className="text-xs md:text-base">Privacy & Policy</a>
                <a href="/" className="text-xs md:text-base">Swift E-Learning</a>
                <a href="/" className="text-xs md:text-base">IG Habib</a>
                <a href="/" className="text-xs md:text-base">About Us</a>
                <a href="/" className="text-xs md:text-base">Term of Use</a>
                <a href="/" className="text-xs md:text-base">LAPAK</a>
                <a href="/" className="text-xs md:text-base">IG Adit</a>
                <a href="/" className="text-xs md:text-base">Pricing</a>
                <a href="/" className="text-xs md:text-base">User Manual</a>
                <a href="/" className="text-xs md:text-base">GREEN GUIDE</a>
                <a href="/" className="text-xs md:text-base">IG Jahfal</a>
              </div>
  
              <p className='pt-7'>Copyright © SpamSenseGPT All Right Reversed. 2023</p>
            </footer> }
          </center>
      </body>
    </html>
  )
}
