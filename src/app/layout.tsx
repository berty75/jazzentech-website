import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import MainFooter from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import AccessibilityProvider from '@/components/AccessibilityProvider'
import PreventeBanner from '@/components/PreventeBanner'
import PreventePopup from '@/components/PreventePopup'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Jazz en Tech 2025 - Festival de Jazz des Pyrénées Orientales',
    template: '%s | Jazz en Tech 2025'
  },
  description: 'Festival Jazz en Tech 2025 - 10ème édition du 27 juillet au 9 août. Saint-Génis-des-Fontaines et Céret. Manu Le Prince, Stefano Di Battista, Jacky Terrasson, Charlotte Planchou et plus encore.',
  keywords: [
    'festival jazz',
    'jazz en tech 2025',
    'céret',
    'saint-génis-des-fontaines',
    'pyrénées orientales',
    'manu le prince',
    'stefano di battista',
    'jacky terrasson',
    'charlotte planchou',
    'camille bertault',
    'florin gugulica',
    'jazz 2025',
    'concert jazz',
    'festival musique',
    'billetterie jazz',
    '10ème édition'
  ],
  authors: [{ name: 'Festival Jazz en Tech' }],
  creator: 'Festival Jazz en Tech',
  publisher: 'Festival Jazz en Tech',
  metadataBase: new URL('https://jazzentech.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Jazz en Tech 2025 - Festival de Jazz des Pyrénées Orientales',
    description: 'Festival Jazz en Tech 2025 - 10ème édition du 27 juillet au 9 août. Découvrez une programmation exceptionnelle avec Manu Le Prince, Stefano Di Battista, Jacky Terrasson, Charlotte Planchou...',
    url: 'https://jazzentech.com',
    siteName: 'Jazz en Tech',
    images: [
      {
        url: 'https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_800/v1757764876/affiche-2025_xkytzn.jpg',
        width: 1200,
        height: 630,
        alt: 'Jazz en Tech 2025 - Affiche officielle du festival',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jazz en Tech 2025',
    description: 'Festival de Jazz des Pyrénées Orientales - 10ème édition du 27 juillet au 9 août',
    images: ['https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_800/v1757764876/affiche-2025_xkytzn.jpg'],
    site: '@jazzentech',
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
    icon: [
      { url: '/jazz-en-tech.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/jazz-en-tech.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/jazz-en-tech.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/jazz-en-tech.ico', sizes: '180x180', type: 'image/x-icon' },
    ],
    other: [
      { url: '/jazz-en-tech.ico', sizes: '192x192', type: 'image/x-icon' },
      { url: '/jazz-en-tech.ico', sizes: '512x512', type: 'image/x-icon' },
    ],
  },
  verification: {
    google: 'ubaL4o8UgQ30SY4PvSeSahpzMDVE3cHRhCaucb57IEk',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#722f37',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="google-site-verification" content="ubaL4o8UgQ30SY4PvSeSahpzMDVE3cHRhCaucb57IEk" />
        <link rel="icon" href="/jazz-en-tech.ico" sizes="any" />
        <link rel="icon" href="/jazz-en-tech.ico" sizes="16x16" type="image/x-icon" />
        <link rel="icon" href="/jazz-en-tech.ico" sizes="32x32" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/jazz-en-tech.ico" />
        <meta name="theme-color" content="#722f37" />
        <meta name="msapplication-TileColor" content="#722f37" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <AccessibilityProvider>
          <a 
            href="#main-content" 
            className="skip-link"
          >
            Aller au contenu principal
          </a>
          
          {/* Prévente - Bannière sticky + Popup */}
          <PreventeBanner />
          <PreventePopup />
          
          <Header />
          
          <main id="main-content" role="main" tabIndex={-1}>
            {children}
          </main>
          
          <MainFooter />
          <CookieBanner />
        </AccessibilityProvider>
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MusicFestival',
              name: 'Jazz en Tech 2025',
              description: 'Festival de jazz des Pyrénées Orientales - 10ème édition',
              startDate: '2025-07-27',
              endDate: '2025-08-09',
              location: [
                {
                  '@type': 'Place',
                  name: 'Saint-Génis-des-Fontaines',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Saint-Génis-des-Fontaines',
                    postalCode: '66740',
                    addressRegion: 'Pyrénées-Orientales',
                    addressCountry: 'FR'
                  }
                },
                {
                  '@type': 'Place',
                  name: 'Céret',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Céret',
                    postalCode: '66400',
                    addressRegion: 'Pyrénées-Orientales',
                    addressCountry: 'FR'
                  }
                }
              ],
              organizer: {
                '@type': 'Organization',
                name: 'Jazz en Tech',
                url: 'https://jazzentech.com'
              },
              url: 'https://jazzentech.com',
              image: 'https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_800/v1757764876/affiche-2025_xkytzn.jpg'
            })
          }}
        />
      </body>
    </html>
  )
}