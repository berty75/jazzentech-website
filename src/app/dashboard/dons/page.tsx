// PATH: src/app/dashboard/dons/page.tsx
'use client'

import { Euro, ChevronDown, ChevronUp, Phone, MapPin } from 'lucide-react'
import { useState, useEffect, Fragment } from 'react'
import DashboardShell from '@/components/DashboardShell'

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
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/donations').then(r => r.json()).then(d => { setDonations(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const total = donations.reduce((s, d) => s + d.amount, 0)

  const formatAddress = (addr: any) => {
    if (!addr) return null
    return [addr.line1, addr.line2, `${addr.postal_code || ''} ${addr.city || ''}`.trim(), addr.country].filter(Boolean).join(', ')
  }

  return (
    <DashboardShell>
      <div className="p-4 sm:p-6 md:p-10">
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl" style={{ fontWeight: 700, color: '#1a1a1a' }}>Dons</h2>
          <p style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>
            {donations.length} don(s) — Total : <span style={{ fontWeight: 700, color: '#16a34a' }}>{total} €</span>
          </p>
        </div>

        {loading ? (
          <p style={{ color: '#999' }}>Chargement...</p>
        ) : donations.length === 0 ? (
          <div className="rounded-xl p-8 text-center" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
            <Euro className="w-10 h-10 mx-auto mb-3" style={{ color: '#ddd' }} />
            <p style={{ color: '#999', fontSize: '14px' }}>Aucun don pour le moment</p>
          </div>
        ) : (
          <div className="space-y-3">
            {donations.map((d) => {
              const isExpanded = expanded === d.id
              return (
                <div key={d.id} className="rounded-xl overflow-hidden" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
                  <button
                    onClick={() => setExpanded(isExpanded ? null : d.id)}
                    className="w-full text-left"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <div className="flex items-center justify-between px-4 sm:px-5 py-4 gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate" style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>{d.name || 'Anonyme'}</p>
                        <p className="truncate" style={{ fontSize: '12px', color: '#999' }}>
                          {new Date(d.date).toLocaleDateString('fr-FR')} — {d.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span style={{ fontSize: '18px', fontWeight: 700, color: '#16a34a' }}>{d.amount} €</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" style={{ color: '#999' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#999' }} />}
                      </div>
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-4 pt-0" style={{ borderTop: '1px solid #f0eee9' }}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3" style={{ fontSize: '13px' }}>
                        <div>
                          <p style={{ color: '#999', fontSize: '11px', textTransform: 'uppercase', marginBottom: '2px' }}>Paiement</p>
                          <p style={{ color: '#1a1a1a' }}>{paymentLabels[d.payment_method] || d.payment_method || '—'}</p>
                        </div>
                        <div>
                          <p style={{ color: '#999', fontSize: '11px', textTransform: 'uppercase', marginBottom: '2px' }}>Statut</p>
                          <p style={{ color: '#1a1a1a' }}>{d.status || '—'}</p>
                        </div>
                        {d.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" style={{ color: '#999' }} />
                            <span style={{ color: '#1a1a1a' }}>{d.phone}</span>
                          </div>
                        )}
                        {d.address && (
                          <div className="flex items-start gap-1 sm:col-span-2">
                            <MapPin className="w-3 h-3 mt-0.5 shrink-0" style={{ color: '#999' }} />
                            <span style={{ color: '#1a1a1a' }}>{formatAddress(d.address)}</span>
                          </div>
                        )}
                        {d.message && (
                          <div className="sm:col-span-2">
                            <p style={{ color: '#999', fontSize: '11px', textTransform: 'uppercase', marginBottom: '2px' }}>Message</p>
                            <p style={{ color: '#1a1a1a', fontStyle: 'italic' }}>{d.message}</p>
                          </div>
                        )}
                        <div>
                          <p style={{ color: '#999', fontSize: '11px', textTransform: 'uppercase', marginBottom: '2px' }}>Cerfa</p>
                          <p style={{ color: d.cerfa_generated ? '#16a34a' : '#d97706' }}>
                            {d.cerfa_generated ? 'Généré' : 'En attente'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </DashboardShell>
  )
}