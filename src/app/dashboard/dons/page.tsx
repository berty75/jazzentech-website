// PATH: src/app/dashboard/dons/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, LayoutDashboard, Heart, FileText, Mail, Settings, Euro, ChevronDown, ChevronUp, Phone, MapPin } from 'lucide-react'
import { useState, useEffect, Fragment } from 'react'

const nav = [
  { href: '/dashboard', label: 'Vue d\'ensemble', icon: LayoutDashboard },
  { href: '/dashboard/dons', label: 'Dons', icon: Heart },
  { href: '/dashboard/cerfa', label: 'Cerfa', icon: FileText },
  { href: '/dashboard/messagerie', label: 'Messagerie', icon: Mail },
  { href: '/dashboard/settings', label: 'Paramètres', icon: Settings },
]

type Donation = {
  id: string; amount: number; email: string; name: string; prenom: string; nom: string;
  phone: string; address: any; message: string; date: string; status: string;
  cerfa_generated: boolean; payment_method: string;
}

const paymentLabels: Record<string, string> = {
  card: 'Carte bancaire',
  sepa_debit: 'Prélèvement SEPA',
  bancontact: 'Bancontact',
  ideal: 'iDEAL',
  link: 'Link',
  giropay: 'Giropay',
  customer_balance: 'Virement bancaire',
}

export default function DonsPage() {
  const router = useRouter()
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/donations').then(r => r.json()).then(d => { setDonations(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const total = donations.reduce((s, d) => s + d.amount, 0)
  const handleLogout = async () => { await fetch('/api/auth', { method: 'DELETE' }); router.push('/dashboard/login') }

  const formatAddress = (addr: any) => {
    if (!addr) return null
    return [addr.line1, addr.line2, `${addr.postal_code || ''} ${addr.city || ''}`.trim(), addr.country].filter(Boolean).join(', ')
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
            const active = item.href === '/dashboard/dons'
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
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a1a1a' }}>Dons</h2>
            <p style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>Historique des dons reçus via Stripe</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="rounded-xl p-5" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: '#f0fdf4' }}>
                <Euro className="w-4 h-4" style={{ color: '#16a34a' }} />
              </div>
              <p style={{ fontSize: '28px', fontWeight: 700, color: '#1a1a1a' }}>{total} €</p>
              <p style={{ fontSize: '12px', color: '#999' }}>Total des dons</p>
            </div>
            <div className="rounded-xl p-5" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: '#eff6ff' }}>
                <Heart className="w-4 h-4" style={{ color: '#2563eb' }} />
              </div>
              <p style={{ fontSize: '28px', fontWeight: 700, color: '#1a1a1a' }}>{donations.length}</p>
              <p style={{ fontSize: '12px', color: '#999' }}>Donateurs</p>
            </div>
          </div>

          {loading ? (
            <p style={{ color: '#999' }}>Chargement...</p>
          ) : donations.length === 0 ? (
            <div className="rounded-xl p-8 text-center" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
              <Heart className="w-10 h-10 mx-auto mb-3" style={{ color: '#ddd' }} />
              <p style={{ color: '#999' }}>Aucun don pour le moment</p>
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e2dc' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#555', fontSize: '12px', textTransform: 'uppercase' }}>Date</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#555', fontSize: '12px', textTransform: 'uppercase' }}>Donateur</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#555', fontSize: '12px', textTransform: 'uppercase' }}>Email</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: '#555', fontSize: '12px', textTransform: 'uppercase' }}>Montant</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#555', fontSize: '12px', textTransform: 'uppercase' }}>Cerfa</th>
                    <th style={{ padding: '12px 16px', width: '40px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((d) => (
                    <Fragment key={d.id}>
                      <tr style={{ borderBottom: expanded === d.id ? 'none' : '1px solid #f0eee9', cursor: 'pointer' }}
                        onClick={() => setExpanded(expanded === d.id ? null : d.id)}>
                        <td style={{ padding: '12px 16px', color: '#666' }}>{new Date(d.date).toLocaleDateString('fr-FR')}</td>
                        <td style={{ padding: '12px 16px', color: '#1a1a1a', fontWeight: 500 }}>{d.name || '—'}</td>
                        <td style={{ padding: '12px 16px', color: '#666' }}>{d.email || '—'}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: '#16a34a' }}>{d.amount} €</td>
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                          {d.cerfa_generated ? <span style={{ color: '#16a34a', fontSize: '12px' }}>✓ Généré</span> : <span style={{ color: '#d97706', fontSize: '12px' }}>En attente</span>}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'center', color: '#999' }}>
                          {expanded === d.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </td>
                      </tr>
                      {expanded === d.id && (
                        <tr style={{ borderBottom: '1px solid #f0eee9' }}>
                          <td colSpan={6} style={{ padding: '0 16px 16px' }}>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 rounded-lg" style={{ background: '#fafaf8' }}>
                              <div>
                                <p style={{ fontSize: '11px', fontWeight: 600, color: '#999', textTransform: 'uppercase', marginBottom: '4px' }}>Prénom</p>
                                <p style={{ fontSize: '14px', color: '#1a1a1a' }}>{d.prenom || '—'}</p>
                              </div>
                              <div>
                                <p style={{ fontSize: '11px', fontWeight: 600, color: '#999', textTransform: 'uppercase', marginBottom: '4px' }}>Nom</p>
                                <p style={{ fontSize: '14px', color: '#1a1a1a' }}>{d.nom || '—'}</p>
                              </div>
                              <div>
                                <p style={{ fontSize: '11px', fontWeight: 600, color: '#999', textTransform: 'uppercase', marginBottom: '4px' }}>Téléphone</p>
                                <p style={{ fontSize: '14px', color: '#1a1a1a' }}>{d.phone ? <><Phone className="w-3 h-3 inline" style={{ color: '#888' }} /> {d.phone}</> : '—'}</p>
                              </div>
                              <div className="col-span-2">
                                <p style={{ fontSize: '11px', fontWeight: 600, color: '#999', textTransform: 'uppercase', marginBottom: '4px' }}>Adresse</p>
                                <p style={{ fontSize: '14px', color: '#1a1a1a' }}>{d.address ? <><MapPin className="w-3 h-3 inline" style={{ color: '#888' }} /> {formatAddress(d.address)}</> : '—'}</p>
                              </div>
                              <div>
                                <p style={{ fontSize: '11px', fontWeight: 600, color: '#999', textTransform: 'uppercase', marginBottom: '4px' }}>Moyen de paiement</p>
                                <p style={{ fontSize: '14px', color: '#1a1a1a' }}>{paymentLabels[d.payment_method] || d.payment_method || '—'}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}