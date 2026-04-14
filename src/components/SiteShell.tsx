// PATH: src/components/SiteShell.tsx
'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SoutenirTicker from '@/components/SoutenirTicker'
import HeroLogo from '@/components/HeroLogo'
import DonorBar from '@/components/DonorBar'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')

  if (isDashboard) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <SoutenirTicker />
      <div className="block md:hidden h-[3.25rem] flex-shrink-0" />
      <div className="hidden md:block h-2 flex-shrink-0" />
      <HeroLogo />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
      {/* Espace pour ne pas cacher le bas du footer derrière la barre sticky */}
      <div className="h-10 sm:h-11" />
      <DonorBar />
    </>
  )
}