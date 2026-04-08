// PATH: src/app/dashboard/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, LayoutDashboard, Heart, FileText, Mail, Settings, Users, TrendingUp, Euro, Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'

const nav = [
  { href: '/dashboard', label: 'Vue d\'ensemble', icon: LayoutDashboard },
  { href: '/dashboard/dons', label: 'Dons', icon: Heart },
  { href: '/dashboard/cerfa', label: 'Cerfa', icon: FileText },
  { href: '/dashboard/messagerie', label: 'Messagerie', icon: Mail },
  { href: '/dashboard/settings', label: 'Paramètres', icon: Settings },
]

type Donation = { id: string; amount: number; email: string; name: string; date: string; cerfa_generated: boolean }

export default function DashboardPage() {
  const router = useRouter()
  const [donations, setDonations] = useState<Donation[]>([])
  const [mobileNav, setMobileNav] = useState(false)

  useEffect(() => {
    fetch('/api/donations').then(r => r.json()).then(setDonations).catch(() => {})
  }, [])

  const total = donations.reduce((s, d) => s + d.amount, 0)
  const thisMonth = donations.filter(d => {
    const now = new Date()
    const dd = new Date(d.date)
    return dd.getMonth() === now.getMonth() && dd.getFullYear() === now.getFullYear()
  }).reduce((s, d) => s + d.amount, 0)
  const cerfaCount = donations.filter(d => d.cerfa_generated).length
  const recent = donations.slice(0, 5)

  const stats = [
    { label: 'Total dons', value: `${total} €`, icon: Euro, color: '#16a34a', bg: '#f0fdf4' },
    { label: 'Donateurs', value: String(donations.length), icon: Users, color: '#2563eb', bg: '#eff6ff' },
    { label: 'Ce mois', value: `${thisMonth} €`, icon: TrendingUp, color: '#d97706', bg: '#fffbeb' },
    { label: 'Cerfa générés', value: String(cerfaCount), icon: FileText, color: '#722f37', bg: '#fef2f2' },
  ]

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' })
    router.push('/dashboard/login')
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#f5f3ef' }}>
      <aside className="hidden md:flex flex-col w-[240px] border-r" style={{ background: '#fff', borderColor: '#e5e2dc' }}>
        <div className="px-6 py-5 border-b" style={{ borderColor: '#e5e2dc' }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '16px', fontWeight: 700, color: '#1a1a1a', letterSpacing: '0.04em' }}>JAZZ EN TECH</h1>
          <p style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>Administration</p>
        </div>
        <nav className="flex-1 px-3 py-4">
          {nav.map((item) => {
            const active = item.href === '/dashboard'
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

      <main className="flex-1 overflow-auto">
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b" style={{ background: '#fff', borderColor: '#e5e2dc' }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '16px', fontWeight: 700, color: '#1a1a1a' }}>JAZZ EN TECH</h1>
          <button onClick={() => setMobileNav(!mobileNav)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#666' }}>☰</button>
        </header>
        {mobileNav && (
          <div className="md:hidden border-b px-4 py-3" style={{ background: '#fff', borderColor: '#e5e2dc' }}>
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileNav(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm" style={{ color: '#666', textDecoration: 'none' }}>
                <item.icon className="w-4 h-4" /> {item.label}
              </Link>
            ))}
          </div>
        )}

        <div className="p-6 md:p-10">
          <div className="mb-8">
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a1a1a' }}>Bonjour, Alain 👋</h2>
            <p style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>Vue d&apos;ensemble du festival Jazz en Tech 2026</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl p-5" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: s.bg }}>
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
                <p style={{ fontSize: '24px', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>{s.value}</p>
                <p style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Actions rapides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/dashboard/dons" className="rounded-xl p-4 flex items-center gap-3 transition-colors hover:border-[#722f37]"
                style={{ background: '#fff', border: '1px solid #e5e2dc', textDecoration: 'none' }}>
                <Heart className="w-5 h-5" style={{ color: '#722f37' }} />
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Voir les dons</p>
                  <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Historique &amp; détails</p>
                </div>
              </Link>
              <Link href="/dashboard/cerfa" className="rounded-xl p-4 flex items-center gap-3 transition-colors hover:border-[#722f37]"
                style={{ background: '#fff', border: '1px solid #e5e2dc', textDecoration: 'none' }}>
                <FileText className="w-5 h-5" style={{ color: '#722f37' }} />
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Générer un Cerfa</p>
                  <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Reçus fiscaux</p>
                </div>
              </Link>
              <Link href="/dashboard/messagerie" className="rounded-xl p-4 flex items-center gap-3 transition-colors hover:border-[#722f37]"
                style={{ background: '#fff', border: '1px solid #e5e2dc', textDecoration: 'none' }}>
                <Mail className="w-5 h-5" style={{ color: '#722f37' }} />
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Messagerie</p>
                  <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Brevo &amp; newsletters</p>
                </div>
              </Link>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Derniers dons</h3>
            {recent.length === 0 ? (
              <div className="rounded-xl p-8 text-center" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
                <Calendar className="w-10 h-10 mx-auto mb-3" style={{ color: '#ddd' }} />
                <p style={{ color: '#999', fontSize: '14px' }}>Aucun don pour le moment</p>
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
                {recent.map((d) => (
                  <div key={d.id} className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid #f0eee9' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 500, color: '#1a1a1a' }}>{d.name || 'Anonyme'}</p>
                      <p style={{ fontSize: '12px', color: '#999' }}>{new Date(d.date).toLocaleDateString('fr-FR')} — {d.email}</p>
                    </div>
                    <p style={{ fontSize: '16px', fontWeight: 700, color: '#16a34a' }}>{d.amount} €</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}