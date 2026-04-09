// PATH: src/app/dashboard/cerfa/page.tsx
'use client'

import { Download, Send, Loader2, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import DashboardShell from '@/components/DashboardShell'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export default function CerfaPage() {
  const donations = useQuery(api.donations.listDonations)
  const [generating, setGenerating] = useState<string | null>(null)
  const [message, setMessage] = useState('')

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
        // Convex will auto-refresh the donations list
      } else {
        setMessage(data.error || 'Erreur')
      }
    } catch {
      setMessage('Erreur réseau')
    } finally {
      setGenerating(null)
    }
  }

  const pending = donations?.filter(d => !d.cerfaGenerated) || []
  const generated = donations?.filter(d => d.cerfaGenerated) || []

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
          {donations === undefined ? (
            <p style={{ color: '#999' }}>Chargement...</p>
          ) : pending.length === 0 ? (
            <div className="rounded-xl p-6 text-center" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
              <CheckCircle className="w-8 h-8 mx-auto mb-2" style={{ color: '#16a34a' }} />
              <p style={{ color: '#999', fontSize: '14px' }}>Tous les Cerfa ont été générés</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pending.map((d) => {
                const fullName = `${d.firstName} ${d.lastName}`.trim() || 'Anonyme'
                return (
                  <div key={d._id} className="rounded-xl p-4 sm:p-5" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="min-w-0">
                        <p className="truncate" style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>{fullName}</p>
                        <p className="truncate" style={{ fontSize: '12px', color: '#999' }}>{d.email}</p>
                        <p style={{ fontSize: '12px', color: '#999' }}>{new Date(d.createdAt).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <span className="shrink-0" style={{ fontSize: '22px', fontWeight: 700, color: '#16a34a' }}>{d.amountEur} €</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button onClick={() => handleGenerate(d._id, false)} disabled={generating === d._id}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm w-full sm:w-auto"
                        style={{ border: '1px solid #e5e2dc', background: '#fff', cursor: 'pointer', color: '#555' }}>
                        {generating === d._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                        Générer le PDF
                      </button>
                      <button onClick={() => handleGenerate(d._id, true)} disabled={generating === d._id}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm w-full sm:w-auto"
                        style={{ border: 'none', background: '#722f37', cursor: 'pointer', color: '#fff', fontWeight: 500 }}>
                        {generating === d._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        Générer + Envoyer par email
                      </button>
                    </div>
                  </div>
                )
              })}
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
            <div className="space-y-3">
              {generated.map((d) => {
                const fullName = `${d.firstName} ${d.lastName}`.trim() || 'Anonyme'
                return (
                  <div key={d._id} className="rounded-xl p-4 sm:p-5" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="min-w-0">
                        <p className="truncate" style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>{fullName}</p>
                        <p style={{ fontSize: '12px', color: '#999' }}>{new Date(d.createdAt).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <span className="shrink-0" style={{ fontSize: '18px', fontWeight: 700, color: '#16a34a' }}>{d.amountEur} €</span>
                    </div>
                    {d.cerfaHash && (
                      <div className="mb-3 p-2 rounded-lg" style={{ background: '#f7f6f3' }}>
                        <p style={{ fontSize: '10px', color: '#999', textTransform: 'uppercase', marginBottom: '2px' }}>Hash de vérification</p>
                        <p style={{ fontSize: '12px', fontFamily: 'monospace', color: '#722f37', wordBreak: 'break-all', lineHeight: 1.4, margin: 0 }}>{d.cerfaHash}</p>
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row gap-2">
                      {d.cerfaHash && (
                        <a href={`/api/cerfa?hash=${d.cerfaHash}`} target="_blank"
                          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm w-full sm:w-auto"
                          style={{ border: '1px solid #e5e2dc', background: '#fff', color: '#555', textDecoration: 'none' }}>
                          <Download className="w-4 h-4" /> Télécharger le PDF
                        </a>
                      )}
                      <button onClick={() => handleGenerate(d._id, true)} disabled={generating === d._id}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm w-full sm:w-auto"
                        style={{ border: 'none', background: '#722f37', cursor: 'pointer', color: '#fff', fontWeight: 500 }}>
                        {generating === d._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        Renvoyer par email
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  )
}