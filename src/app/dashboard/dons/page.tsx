// PATH: src/app/dashboard/dons/page.tsx
'use client'

import { Euro, ChevronDown, ChevronUp, Phone, MapPin } from 'lucide-react'
import { useState } from 'react'
import DashboardShell from '@/components/DashboardShell'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

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
  const donations = useQuery(api.donations.listDonations)
  const [expanded, setExpanded] = useState<string | null>(null)

  const total = donations?.reduce((s, d) => s + d.amountEur, 0) || 0

  return (
    <DashboardShell>
      <div className="p-4 sm:p-6 md:p-10">
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl" style={{ fontWeight: 700, color: '#1a1a1a' }}>Dons</h2>
          <p style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>
            {donations?.length || 0} don(s) — Total : <span style={{ fontWeight: 700, color: '#16a34a' }}>{total} €</span>
          </p>
        </div>

        {donations === undefined ? (
          <p style={{ color: '#999' }}>Chargement...</p>
        ) : donations.length === 0 ? (
          <div className="rounded-xl p-8 text-center" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
            <Euro className="w-10 h-10 mx-auto mb-3" style={{ color: '#ddd' }} />
            <p style={{ color: '#999', fontSize: '14px' }}>Aucun don pour le moment</p>
          </div>
        ) : (
          <div className="space-y-3">
            {donations.map((d) => {
              const isExpanded = expanded === d._id
              const fullName = `${d.firstName} ${d.lastName}`.trim() || 'Anonyme'
              const addrStr = [d.address, `${d.postalCode || ''} ${d.city || ''}`.trim(), d.country].filter(Boolean).join(', ')
              return (
                <div key={d._id} className="rounded-xl overflow-hidden" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
                  <button onClick={() => setExpanded(isExpanded ? null : d._id)} className="w-full text-left"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <div className="flex items-center justify-between px-4 sm:px-5 py-4 gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate" style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>{fullName}</p>
                        <p className="truncate" style={{ fontSize: '12px', color: '#999' }}>
                          {new Date(d.createdAt).toLocaleDateString('fr-FR')} — {d.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span style={{ fontSize: '18px', fontWeight: 700, color: '#16a34a' }}>{d.amountEur} €</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" style={{ color: '#999' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#999' }} />}
                      </div>
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-4 pt-0" style={{ borderTop: '1px solid #f0eee9' }}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3" style={{ fontSize: '13px' }}>
                        <div>
                          <p style={{ color: '#999', fontSize: '11px', textTransform: 'uppercase', marginBottom: '2px' }}>Paiement</p>
                          <p style={{ color: '#1a1a1a', margin: 0 }}>{paymentLabels[d.paymentMethod || ''] || d.paymentMethod || '—'}</p>
                        </div>
                        <div>
                          <p style={{ color: '#999', fontSize: '11px', textTransform: 'uppercase', marginBottom: '2px' }}>Palier</p>
                          <p style={{ color: '#1a1a1a', margin: 0, textTransform: 'capitalize' }}>{d.palier}</p>
                        </div>
                        {d.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 shrink-0" style={{ color: '#999' }} />
                            <span style={{ color: '#1a1a1a' }}>{d.phone}</span>
                          </div>
                        )}
                        {addrStr && (
                          <div className="flex items-start gap-1 sm:col-span-2">
                            <MapPin className="w-3 h-3 mt-0.5 shrink-0" style={{ color: '#999' }} />
                            <span style={{ color: '#1a1a1a', wordBreak: 'break-word' }}>{addrStr}</span>
                          </div>
                        )}
                        {d.message && (
                          <div className="sm:col-span-2">
                            <p style={{ color: '#999', fontSize: '11px', textTransform: 'uppercase', marginBottom: '2px' }}>Message</p>
                            <p style={{ color: '#1a1a1a', fontStyle: 'italic', margin: 0 }}>{d.message}</p>
                          </div>
                        )}
                        <div>
                          <p style={{ color: '#999', fontSize: '11px', textTransform: 'uppercase', marginBottom: '2px' }}>Cerfa</p>
                          <p style={{ color: d.cerfaGenerated ? '#16a34a' : '#d97706', fontWeight: 500, margin: 0 }}>
                            {d.cerfaGenerated ? '✓ Généré' : '⏳ En attente'}
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