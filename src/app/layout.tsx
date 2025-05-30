// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import MainFooter from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jazz en Tech - Festival de Jazz Innovation',
  description: 'Le festival qui marie tradition jazz et innovation technologique',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <MainFooter />
        <CookieBanner />
      </body>
    </html>
  )
}