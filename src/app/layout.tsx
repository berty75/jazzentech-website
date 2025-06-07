import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import MainFooter from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import AccessibilityProvider from '@/components/AccessibilityProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jazz en Tech - Festival de Jazz Innovation',
  description: 'Le festival qui marie tradition jazz et innovation technologique. 10ème édition du 27 juillet au 9 août 2025 à Saint-Génis-des-Fontaines et Céret.',
}

// Export viewport séparé (recommandé pour Next.js 15+)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AccessibilityProvider>
          {/* Skip link pour navigation clavier */}
          <a 
            href="#main-content" 
            className="skip-link"
          >
            Aller au contenu principal
          </a>
          
          <Header />
          
          <main id="main-content" role="main" tabIndex={-1}>
            {children}
          </main>
          
          <MainFooter />
          <CookieBanner />
        </AccessibilityProvider>
      </body>
    </html>
  )
}