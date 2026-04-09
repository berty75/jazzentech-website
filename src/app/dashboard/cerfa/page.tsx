// PATH: src/app/dashboard/cerfa/page.tsx
'use client'

import { Download, Send, Loader2, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import DashboardShell from '@/components/DashboardShell'

type Donation = {
  id: string; amount: number; email: string; name: string; date: string;
  cerfa_generated: boolean; cerfa_hash?: string;
}

export default function CerfaPage() {
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

  const pending = donations.filter(d => !d.cerfa_generated)
  const generated = donations.filter(d => d.cerfa_generated)

  return (
    <DashboardShell>
      <div className="p-4 sm:p-6 md:p-10">
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl" style={{ fontWeight: 700, color: '#1a1a1a' }}>Cerfa — Reçus fiscaux</h2>
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
                <div key={d.id} className="rounded-xl p-4 sm:p-5" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
                  <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
                    <div className="min-w-0">
                      <p className="truncate" style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>{d.name || 'Anonyme'}</p>
                      <p className="truncate" style={{ fontSize: '12px', color: '#999' }}>{d.email} — {new Date(d.date).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto flex-wrap">
                      <span className="shrink-0" style={{ fontSize: '18px', fontWeight: 700, color: '#16a34a' }}>{d.amount} €</span>
                      <div className="flex gap-2 ml-auto sm:ml-0">
                        <button onClick={() => handleGenerate(d.id, false)} disabled={generating === d.id}
                          className="flex items-center gap-1 text-xs px-3 py-2 rounded-lg"
                          style={{ border: '1px solid #e5e2dc', background: '#fff', cursor: 'pointer', color: '#555' }}>
                          {generating === d.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />}
                          <span className="hidden sm:inline">Générer</span>
                        </button>
                        <button onClick={() => handleGenerate(d.id, true)} disabled={generating === d.id}
                          className="flex items-center gap-1 text-xs px-3 py-2 rounded-lg"
                          style={{ border: 'none', background: '#722f37', cursor: 'pointer', color: '#fff' }}>
                          {generating === d.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                          <span className="hidden xs:inline">Générer + Envoyer</span>
                          <span className="xs:hidden">Envoyer</span>
                        </button>
                      </div>
                    </div>
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
            <>
              {/* Desktop table */}
              <div className="hidden md:block rounded-xl overflow-hidden" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
                <div className="overflow-x-auto">
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
                                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md"
                                  style={{ border: '1px solid #e5e2dc', background: '#fff', color: '#555', textDecoration: 'none' }}>
                                  <Download className="w-3 h-3" /> PDF
                                </a>
                              )}
                              <button onClick={() => handleGenerate(d.id, true)} disabled={generating === d.id}
                                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md"
                                style={{ border: 'none', background: '#722f37', cursor: 'pointer', color: '#fff' }}>
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
              </div>

              {/* Mobile cards */}
              <div className="md:hidden space-y-3">
                {generated.map((d) => (
                  <div key={d.id} className="rounded-xl p-4" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
                    <div className="flex items-center justify-between mb-2">
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>{d.name || 'Anonyme'}</p>
                      <span style={{ fontSize: '16px', fontWeight: 700, color: '#16a34a' }}>{d.amount} €</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>{new Date(d.date).toLocaleDateString('fr-FR')}</p>
                    {d.cerfa_hash && (
                      <p style={{ fontSize: '11px', fontFamily: 'monospace', color: '#722f37', marginBottom: '8px', wordBreak: 'break-all' }}>{d.cerfa_hash}</p>
                    )}
                    <div className="flex gap-2">
                      {d.cerfa_hash && (
                        <a href={`/api/cerfa?hash=${d.cerfa_hash}`} target="_blank"
                          className="flex items-center gap-1 text-xs px-3 py-2 rounded-lg flex-1 justify-center"
                          style={{ border: '1px solid #e5e2dc', background: '#fff', color: '#555', textDecoration: 'none' }}>
                          <Download className="w-3 h-3" /> PDF
                        </a>
                      )}
                      <button onClick={() => handleGenerate(d.id, true)} disabled={generating === d.id}
                        className="flex items-center gap-1 text-xs px-3 py-2 rounded-lg flex-1 justify-center"
                        style={{ border: 'none', background: '#722f37', cursor: 'pointer', color: '#fff' }}>
                        {generating === d.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                        Renvoyer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardShell>
  )
}