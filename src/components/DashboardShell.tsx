// PATH: src/components/DashboardShell.tsx
'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { LogOut, LayoutDashboard, Heart, FileText, Mail, Settings, Users, X, Menu } from 'lucide-react'
import { useState } from 'react'

const nav = [
  { href: '/dashboard', label: 'Vue d\'ensemble', icon: LayoutDashboard },
  { href: '/dashboard/dons', label: 'Dons', icon: Heart },
  { href: '/dashboard/contacts', label: 'Contacts', icon: Users },
  { href: '/dashboard/cerfa', label: 'Cerfa', icon: FileText },
  { href: '/dashboard/messagerie', label: 'Messagerie', icon: Mail },
  { href: '/dashboard/settings', label: 'Paramètres', icon: Settings },
]

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileNav, setMobileNav] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' })
    router.push('/dashboard/login')
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#f5f3ef' }}>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-[240px] shrink-0 border-r sticky top-0 h-screen" style={{ background: '#fff', borderColor: '#e5e2dc' }}>
        <div className="px-6 py-5 border-b" style={{ borderColor: '#e5e2dc' }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '16px', fontWeight: 700, color: '#1a1a1a', letterSpacing: '0.04em' }}>JAZZ EN TECH</h1>
          <p style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>Administration</p>
        </div>
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {nav.map((item) => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-colors"
                style={{ background: active ? 'rgba(114,47,55,0.08)' : 'transparent', color: active ? '#722f37' : '#666', fontWeight: active ? 600 : 400, textDecoration: 'none' }}>
                <item.icon className="w-4 h-4" /> {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="px-3 py-4 border-t" style={{ borderColor: '#e5e2dc' }}>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-sm"
            style={{ color: '#999', background: 'none', border: 'none', cursor: 'pointer' }}>
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileNav && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileNav(false)} />
          <div className="relative w-[280px] max-w-[80vw] h-full flex flex-col" style={{ background: '#fff' }}>
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#e5e2dc' }}>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '16px', fontWeight: 700, color: '#1a1a1a' }}>JAZZ EN TECH</h1>
              <button onClick={() => setMobileNav(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', padding: '4px' }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 overflow-y-auto">
              {nav.map((item) => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setMobileNav(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg mb-1 text-sm transition-colors"
                    style={{ background: active ? 'rgba(114,47,55,0.08)' : 'transparent', color: active ? '#722f37' : '#666', fontWeight: active ? 600 : 400, textDecoration: 'none' }}>
                    <item.icon className="w-5 h-5" /> {item.label}
                  </Link>
                )
              })}
            </nav>
            <div className="px-3 py-4 border-t" style={{ borderColor: '#e5e2dc' }}>
              <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-3 rounded-lg w-full text-sm"
                style={{ color: '#999', background: 'none', border: 'none', cursor: 'pointer' }}>
                <LogOut className="w-5 h-5" /> Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b sticky top-0 z-40" style={{ background: '#fff', borderColor: '#e5e2dc' }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '16px', fontWeight: 700, color: '#1a1a1a' }}>JAZZ EN TECH</h1>
          <button onClick={() => setMobileNav(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', padding: '4px' }}>
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}