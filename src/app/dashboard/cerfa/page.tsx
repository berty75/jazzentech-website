// PATH: src/app/dashboard/cerfa/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, LayoutDashboard, Heart, FileText, Mail, Settings, Download, Send, Loader2, CheckCircle } from 'lucide-react'
import { useState, useEffect, Fragment } from 'react'

const nav = [
  { href: '/dashboard', label: 'Vue d\'ensemble', icon: LayoutDashboard },
  { href: '/dashboard/dons', label: 'Dons', icon: Heart },
  { href: '/dashboard/cerfa', label: 'Cerfa', icon: FileText },
  { href: '/dashboard/messagerie', label: 'Messagerie', icon: Mail },
  { href: '/dashboard/settings', label: 'Paramètres', icon: Settings },
]

type Donation = {
  id: string; amount: number; email: string; name: string; date: string;
  cerfa_generated: boolean; cerfa_hash?: string;
}

export default function CerfaPage() {
  const router = useRouter()
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/donations').then(r => r.json()).then(d => { setDonations(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const handleGenerate = async (donationId: string, sendEmail: boolean) => {
    setGenerating(donationId)
    setMessage('')
    try {
      const res = await fetch('/api/cerfa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ donationId, sendEmail }),
      })
      const data = await res.json()
      if (res.ok) {
        setMessage(sendEmail ? 'Cerfa généré et envoyé par email !' : 'Cerfa généré !')
        // Refresh donations
        const updated = await fetch('/api/donations').then(r => r.json())
        setDonations(updated)
      } else {
        setMessage(data.error || 'Erreur')
      }
    } catch {
      setMessage('Erreur réseau')
    } finally {
      setGenerating(null)
    }
  }

  const handleLogout = async () => { await fetch('/api/auth', { method: 'DELETE' }); router.push('/dashboard/login') }

  const pending = donations.filter(d => !d.cerfa_generated)
  const generated = donations.filter(d => d.cerfa_generated)

  return (
    <div className="min-h-screen flex" style={{ background: '#f5f3ef' }}>
      <aside className="hidden md:flex flex-col w-[240px] border-r" style={{ background: '#fff', borderColor: '#e5e2dc' }}>
        <div className="px-6 py-5 border-b" style={{ borderColor: '#e5e2dc' }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '16px', fontWeight: 700, color: '#1a1a1a', letterSpacing: '0.04em' }}>JAZZ EN TECH</h1>
          <p style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>Administration</p>
        </div>
        <nav className="flex-1 px-3 py-4">
          {nav.map((item) => {
            const active = item.href === '/dashboard/cerfa'
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
        <div className="p-6 md:p-10">
          <div className="mb-8">
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a1a1a' }}>Cerfa — Reçus fiscaux</h2>
            <p style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>Générez et envoyez les reçus fiscaux aux donateurs</p>
          </div>

          {message && (
            <div className="mb-6 rounded-lg p-3" style={{ background: message.includes('Erreur') ? '#fef2f2' : '#f0fdf4', border: `1px solid ${message.includes('Erreur') ? '#fecaca' : '#bbf7d0'}` }}>
              <p style={{ color: message.includes('Erreur') ? '#991b1b' : '#166534', fontSize: '13px', margin: 0 }}>{message}</p>
            </div>
          )}

          {/* En attente */}
          <div className="mb-8">
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
              En attente ({pending.length})
            </h3>
            {pending.length === 0 ? (
              <div className="rounded-xl p-6 text-center" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
                <CheckCircle className="w-8 h-8 mx-auto mb-2" style={{ color: '#16a34a' }} />
                <p style={{ color: '#999', fontSize: '14px' }}>Tous les Cerfa ont été générés</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pending.map((d) => (
                  <div key={d.id} className="rounded-xl p-5 flex items-center justify-between" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>{d.name || 'Anonyme'}</p>
                      <p style={{ fontSize: '12px', color: '#999' }}>{d.email} — {new Date(d.date).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span style={{ fontSize: '18px', fontWeight: 700, color: '#16a34a' }}>{d.amount} €</span>
                      <button onClick={() => handleGenerate(d.id, false)} disabled={generating === d.id}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', padding: '8px 14px', borderRadius: '8px', border: '1px solid #e5e2dc', background: '#fff', cursor: 'pointer', color: '#555' }}>
                        {generating === d.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />}
                        Générer
                      </button>
                      <button onClick={() => handleGenerate(d.id, true)} disabled={generating === d.id}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#722f37', cursor: 'pointer', color: '#fff' }}>
                        {generating === d.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                        Générer + Envoyer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Générés */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
              Générés ({generated.length})
            </h3>
            {generated.length === 0 ? (
              <div className="rounded-xl p-6 text-center" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
                <p style={{ color: '#999', fontSize: '14px' }}>Aucun Cerfa généré pour le moment</p>
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e5e2dc' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#555', fontSize: '12px', textTransform: 'uppercase' }}>Donateur</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#555', fontSize: '12px', textTransform: 'uppercase' }}>Date</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: '#555', fontSize: '12px', textTransform: 'uppercase' }}>Montant</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#555', fontSize: '12px', textTransform: 'uppercase' }}>Hash</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#555', fontSize: '12px', textTransform: 'uppercase' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generated.map((d) => (
                      <tr key={d.id} style={{ borderBottom: '1px solid #f0eee9' }}>
                        <td style={{ padding: '12px 16px', color: '#1a1a1a', fontWeight: 500 }}>{d.name || 'Anonyme'}</td>
                        <td style={{ padding: '12px 16px', color: '#666' }}>{new Date(d.date).toLocaleDateString('fr-FR')}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: '#16a34a' }}>{d.amount} €</td>
                        <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '12px', color: '#722f37' }}>{d.cerfa_hash || '—'}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                          <div className="flex items-center justify-center gap-2">
                            {d.cerfa_hash && (
                              <a href={`/api/cerfa?hash=${d.cerfa_hash}`} target="_blank"
                                style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', padding: '6px 12px', borderRadius: '6px', border: '1px solid #e5e2dc', background: '#fff', cursor: 'pointer', color: '#555', textDecoration: 'none' }}>
                                <Download className="w-3 h-3" /> PDF
                              </a>
                            )}
                            <button onClick={() => handleGenerate(d.id, true)} disabled={generating === d.id}
                              style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', padding: '6px 12px', borderRadius: '6px', border: 'none', background: '#722f37', cursor: 'pointer', color: '#fff' }}>
                              {generating === d.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                              Renvoyer
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}