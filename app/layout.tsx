import './globals.css'
import type { Metadata } from 'next'
import { Roboto, Ysabeau } from 'next/font/google'

import Navbar from '@/lib/components/navbar'
import Footer from '@/lib/components/footer';
import { Analytics } from '@vercel/analytics/react';

const roboto = Roboto({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-roboto' });
const ysabeau = Ysabeau({ subsets: ['latin'], display: 'swap', variable: '--font-ysabeau' });

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SpamSenseGPT',
    template: '%s | SpamSenseGPT',
  },
  description: 'Aplikasi web progresif untuk mendeteksi pesan spam dengan analisis GPT.',
  keywords: [
    'deteksi spam',
    'cek spam AI',
    'filter spam GPT',
    'keamanan pesan',
    'SpamSenseGPT',
  ],
  authors: [{ name: 'Tim SpamSenseGPT' }],
  applicationName: 'SpamSenseGPT',
  category: 'utilitas',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SpamSenseGPT - Detektor Spam Berbasis AI',
    description: 'Deteksi pesan spam seketika dengan analisis GPT dan fingerprinting.',
    url: '/',
    siteName: 'SpamSenseGPT',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Logo SpamSenseGPT',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SpamSenseGPT - Detektor Spam Berbasis AI',
    description: 'Deteksi pesan spam seketika dengan analisis GPT dan fingerprinting.',
    images: ['/icon-512x512.png'],
  },
  icons: {
    icon: '/icon-192x192.png',
    apple: '/icon-256x256.png',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${ysabeau.variable} h-full`}>
      <head>
        <link rel="manifest" href='/manifest.json'/>
      </head>
      <body className="h-full font-sans">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Analytics />
          <Footer />
      </body>
    </html>
  )
}
