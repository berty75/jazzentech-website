// PATH: src/app/dashboard/page.tsx
'use client'

import Link from 'next/link'
import { Heart, FileText, Mail, Users, TrendingUp, Euro, Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'
import DashboardShell from '@/components/DashboardShell'

type Donation = { id: string; amount: number; email: string; name: string; date: string; cerfa_generated: boolean }

export default function DashboardPage() {
  const [donations, setDonations] = useState<Donation[]>([])

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

  return (
    <DashboardShell>
      <div className="p-4 sm:p-6 md:p-10">
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl" style={{ fontWeight: 700, color: '#1a1a1a' }}>Bonjour, Alain 👋</h2>
          <p style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>Vue d&apos;ensemble du festival Jazz en Tech 2026</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl p-4 md:p-5" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
              <div className="flex items-center gap-3 md:block">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center md:mb-3 shrink-0" style={{ background: s.bg }}>
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-xl md:text-2xl" style={{ fontWeight: 700, color: '#1a1a1a', margin: 0 }}>{s.value}</p>
                  <p style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6 md:mb-8">
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Actions rapides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/dashboard/dons" className="rounded-xl p-4 flex items-center gap-3 transition-colors hover:border-[#722f37]"
              style={{ background: '#fff', border: '1px solid #e5e2dc', textDecoration: 'none' }}>
              <Heart className="w-5 h-5 shrink-0" style={{ color: '#722f37' }} />
              <div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Voir les dons</p>
                <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Historique &amp; détails</p>
              </div>
            </Link>
            <Link href="/dashboard/cerfa" className="rounded-xl p-4 flex items-center gap-3 transition-colors hover:border-[#722f37]"
              style={{ background: '#fff', border: '1px solid #e5e2dc', textDecoration: 'none' }}>
              <FileText className="w-5 h-5 shrink-0" style={{ color: '#722f37' }} />
              <div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Générer un Cerfa</p>
                <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>Reçus fiscaux</p>
              </div>
            </Link>
            <Link href="/dashboard/messagerie" className="rounded-xl p-4 flex items-center gap-3 transition-colors hover:border-[#722f37]"
              style={{ background: '#fff', border: '1px solid #e5e2dc', textDecoration: 'none' }}>
              <Mail className="w-5 h-5 shrink-0" style={{ color: '#722f37' }} />
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
                <div key={d.id} className="flex items-center justify-between px-4 sm:px-5 py-3 gap-3" style={{ borderBottom: '1px solid #f0eee9' }}>
                  <div className="min-w-0">
                    <p className="truncate" style={{ fontSize: '14px', fontWeight: 500, color: '#1a1a1a' }}>{d.name || 'Anonyme'}</p>
                    <p className="truncate" style={{ fontSize: '12px', color: '#999' }}>{new Date(d.date).toLocaleDateString('fr-FR')} — {d.email}</p>
                  </div>
                  <p className="shrink-0" style={{ fontSize: '16px', fontWeight: 700, color: '#16a34a' }}>{d.amount} €</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  )
}