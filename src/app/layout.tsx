import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PreventeBanner from '@/components/PreventeBanner'
import PreventePopup from '@/components/PreventePopup'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  metadataBase: new URL('https://jazzentech.com'),
  title: {
    template: '%s | Jazz en Tech 2026',
    default: 'Jazz en Tech 2026 - Festival de Jazz | Céret & Saint-Génis-des-Fontaines',
  },
  description: "Jazz en Tech, festival de jazz unique dans les Pyrénées-Orientales. Concerts exceptionnels à Céret et Saint-Génis-des-Fontaines. 11ème édition été 2026.",
  keywords: ['festival jazz', 'Céret', 'Saint-Génis-des-Fontaines', 'Pyrénées-Orientales', 'concerts jazz', 'Jazz en Tech', 'été 2026'],
  authors: [{ name: 'Jazz en Tech' }],
  creator: 'Jazz en Tech',
  publisher: 'Jazz en Tech',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Jazz en Tech 2026 - Festival de Jazz',
    description: "11ème édition du festival Jazz en Tech dans les Pyrénées-Orientales",
    url: 'https://jazzentech.com',
    siteName: 'Jazz en Tech',
    images: [
      {
        url: 'https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_1200/jazz_en_tech_ceret.jpg',
        width: 1200,
        height: 630,
        alt: 'Jazz en Tech 2026',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jazz en Tech 2026',
    description: "Festival de Jazz - Pyrénées-Orientales",
    images: ['https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_1200/jazz_en_tech_ceret.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#722f37',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <PreventeBanner />
        <PreventePopup />
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}