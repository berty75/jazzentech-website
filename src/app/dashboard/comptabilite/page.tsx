// PATH: src/app/dashboard/comptabilite/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Loader2, Download, RefreshCw } from 'lucide-react'
import DashboardShell from '@/components/DashboardShell'
import DatePicker from '@/components/DatePicker'
import Select from '@/components/Select'

type Channel = 'online' | 'card' | 'cash' | 'check' | 'invitation' | 'other'
type Row = {
  date: string; eventName: string; concert: string; ticket: string
  buyer: string; email: string; channel: Channel; rawPay: string
  kind: 'pass' | 'sale' | 'free' | 'included'; price: number; revenue: number
}
type Payout = { date: string; amount: number; account: string; iban: string; swift: string }
type Totals = { brut: number; count: number; saleCount: number; passCount: number; includedCount: number; freeCount: number }
type ChannelStats = Record<Channel, { count: number; amount: number }>

const CHANNEL_LABELS: Record<Channel, string> = {
  online: 'Vente en ligne',
  card: 'Carte (TPE)',
  cash: 'Espèces',
  check: 'Chèque',
  invitation: 'Invitation',
  other: 'Autre',
}
const CHANNEL_COLORS: Record<Channel, string> = {
  online: '#722f37',
  card: '#b87333',
  cash: '#166534',
  check: '#7a5c00',
  invitation: '#8a8478',
  other: '#999',
}

const eur = (n: number) => n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
const iso = (d: Date) => {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

export default function ComptabilitePage() {
  const today = new Date()
  const todayIso = iso(today)

  const [start, setStart] = useState('2022-01-01')
  const [end, setEnd] = useState(todayIso)
  const [edition, setEdition] = useState('')
  const [editions, setEditions] = useState<string[]>([])
  const [editionsLoading, setEditionsLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rows, setRows] = useState<Row[]>([])
  const [totals, setTotals] = useState<Totals | null>(null)
  const [channels, setChannels] = useState<ChannelStats | null>(null)
  const [payouts, setPayouts] = useState<Payout[]>([])
  const [payoutTotal, setPayoutTotal] = useState(0)
  const [grandTotalBrut, setGrandTotalBrut] = useState(0)
  const [grandTotalCount, setGrandTotalCount] = useState(0)
  // Mémorise le mode réellement chargé (pour l'affichage cohérent des cartes)
  const [loadedEdition, setLoadedEdition] = useState('')
  // Bloc « suivi des virements » : masqué par défaut (chiffre à nuance)
  const [showPayoutDetails, setShowPayoutDetails] = useState(false)

  const usingDates = edition === '' // dates actives seulement en mode « Toutes les éditions »

  // Charge la liste des éditions dès l'arrivée sur la page (menu déroulant utilisable tout de suite)
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/billetweb/accounting?editionsOnly=1')
        const data = await res.json()
        if (!cancelled && res.ok) setEditions(data.editions || [])
      } catch {
        /* silencieux : le menu restera sur « Toutes les éditions » */
      } finally {
        if (!cancelled) setEditionsLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const q = new URLSearchParams()
      if (edition) {
        q.set('edition', edition) // édition prime → pas de dates
      } else {
        q.set('start', start)
        q.set('end', end)
      }
      const res = await fetch(`/api/billetweb/accounting?${q.toString()}`)
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Erreur'); return }
      setRows(data.rows || [])
      setTotals(data.totals || null)
      setChannels(data.channels || null)
      if (data.editions?.length) setEditions(data.editions)
      setPayouts(data.payouts || [])
      setPayoutTotal(data.payoutTotal || 0)
      setGrandTotalBrut(data.grandTotalBrut || 0)
      setGrandTotalCount(data.grandTotalCount || 0)
      setLoadedEdition(edition)
    } catch (e: any) {
      setError('Erreur: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  const kindLabel = (k: Row['kind']) =>
    k === 'pass' ? 'Pass'
    : k === 'included' ? 'Inclus dans pass'
    : k === 'free' ? 'Gratuit / invitation'
    : 'Vente'

  const exportCsv = () => {
    const header = ['Date', 'Edition', 'Concert', 'Tarif', 'Nature', 'Acheteur', 'Email', 'Canal', 'Prix']
    const lines = rows.map((r) => [
      r.date, r.eventName, r.concert, r.ticket, kindLabel(r.kind), r.buyer, r.email, CHANNEL_LABELS[r.channel], r.revenue.toFixed(2),
    ])
    const csv = [header, ...lines]
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(';'))
      .join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const suffix = loadedEdition ? loadedEdition.replace(/\s+/g, '-') : `${start}_${end}`
    a.download = `comptabilite_${suffix}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Cartes affichées : les virements (payouts) sont globaux → n'ont de sens qu'en « Toutes les éditions »
  const showPayoutSection = loadedEdition === ''

  return (
    <DashboardShell>
      <div className="p-4 sm:p-6 md:p-10">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl" style={{ fontWeight: 700, color: '#1a1a1a' }}>Comptabilité</h2>
          <p style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>
            Ventes (source Billetweb) et virements reçus — tout l&apos;historique
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap items-end gap-3 mb-2">
          <div style={{ width: '190px' }}>
            <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>Édition</label>
            <Select
              value={edition}
              onChange={setEdition}
              loading={editionsLoading}
              compact
              placeholder="Toutes les éditions"
              options={[
                { value: '', label: 'Toutes les éditions' },
                ...editions.map((ed) => ({ value: ed, label: ed })),
              ]}
            />
          </div>

          <div style={{ opacity: usingDates ? 1 : 0.4, pointerEvents: usingDates ? 'auto' : 'none' }}>
            <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>Du</label>
            <DatePicker value={start} max={end || todayIso} onChange={setStart} minYear={2022} />
          </div>
          <div style={{ opacity: usingDates ? 1 : 0.4, pointerEvents: usingDates ? 'auto' : 'none' }}>
            <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>Au</label>
            <DatePicker value={end} min={start} max={todayIso} onChange={setEnd} minYear={2022} />
          </div>

          <button onClick={load} disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm"
            style={{ background: '#722f37', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Charger
          </button>
          {rows.length > 0 && (
            <button onClick={exportCsv}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm"
              style={{ background: '#d4af37', color: '#1a1a1a', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
              <Download className="w-4 h-4" />
              Exporter CSV
            </button>
          )}
        </div>
        <p style={{ fontSize: '12px', color: '#999', marginBottom: '20px' }}>
          {usingDates
            ? 'Le total « Recettes » correspond exactement au « Prix » affiché par Billetweb (somme des ventes payées).'
            : 'Édition sélectionnée : le filtre par dates est désactivé (toute l’édition est comptée). Choisis « Toutes les éditions » pour filtrer par période.'}
        </p>

        {error && (
          <div className="mb-4 rounded-lg p-3" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
            <p style={{ color: '#991b1b', fontSize: '13px', margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Totaux — uniquement les chiffres fiables, calés au centime sur Billetweb */}
        {totals && (
          <>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {[
                { label: 'Recettes (Prix Billetweb)', value: eur(totals.brut), color: '#722f37' },
                { label: 'Billets payés', value: String(totals.count), color: '#1a1a1a' },
              ].map((c) => (
                <div key={c.label} className="rounded-xl p-4" style={{ background: '#fff', border: '1px solid #eee' }}>
                  <p style={{ fontSize: '11px', color: '#888', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.label}</p>
                  <p style={{ fontSize: '18px', fontWeight: 700, color: c.color }}>{c.value}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '24px' }}>
              <strong style={{ color: '#722f37' }}>{totals.saleCount}</strong> billets payés ·{' '}
              <strong style={{ color: '#b8860b' }}>{totals.passCount}</strong> pass ·{' '}
              <strong style={{ color: '#b87333' }}>{totals.includedCount}</strong> inclus dans un pass ·{' '}
              <strong style={{ color: '#888' }}>{totals.freeCount}</strong> gratuits / invitations
              {loadedEdition && <span style={{ color: '#999' }}> — {loadedEdition}</span>}
            </p>

            {/* Répartition par canal de vente (utile pour la caisse du soir) */}
            {channels && (
              <div className="mb-6">
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#b87333', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>
                  Répartition par canal
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {(['online', 'card', 'cash', 'check', 'invitation'] as Channel[])
                    .filter((c) => channels[c] && channels[c].count > 0)
                    .map((c) => (
                      <div key={c} className="rounded-xl p-3" style={{ background: '#fff', border: '1px solid #eee' }}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: CHANNEL_COLORS[c], display: 'inline-block' }} />
                          <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{CHANNEL_LABELS[c]}</span>
                        </div>
                        <p style={{ fontSize: '16px', fontWeight: 700, color: '#1a1a1a' }}>{eur(channels[c].amount)}</p>
                        <p style={{ fontSize: '11px', color: '#aaa' }}>{channels[c].count} billet{channels[c].count > 1 ? 's' : ''}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Tableau ventes */}
        {rows.length > 0 && (
          <div className="rounded-xl overflow-hidden mb-8" style={{ border: '1px solid #eee' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse', minWidth: '860px' }}>
                <thead>
                  <tr style={{ background: '#f7f3e9' }}>
                    {['Date', 'Édition', 'Concert', 'Tarif', 'Nature', 'Canal', 'Prix'].map((h) => (
                      <th key={h} style={{ textAlign: h === 'Prix' ? 'right' : 'left', padding: '10px 12px', fontWeight: 600, color: '#722f37', fontSize: '12px' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 800).map((r, i) => {
                    const badge = r.kind === 'pass'
                      ? { txt: 'Pass', bg: '#d4af37', fg: '#1a1a1a' }
                      : r.kind === 'included'
                      ? { txt: 'Inclus (pass)', bg: '#f3e3cf', fg: '#8a5a1f' }
                      : r.kind === 'free'
                      ? { txt: 'Gratuit', bg: '#eee', fg: '#666' }
                      : { txt: 'Vente', bg: '#e7f0e7', fg: '#166534' }
                    return (
                      <tr key={i} style={{ borderTop: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '8px 12px', color: '#666', whiteSpace: 'nowrap' }}>{r.date}</td>
                        <td style={{ padding: '8px 12px', color: '#333' }}>{r.eventName}</td>
                        <td style={{ padding: '8px 12px', color: '#333' }}>{r.concert}</td>
                        <td style={{ padding: '8px 12px', color: '#666' }}>{r.ticket}</td>
                        <td style={{ padding: '8px 12px' }}>
                          <span style={{ background: badge.bg, color: badge.fg, fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px', whiteSpace: 'nowrap' }}>{badge.txt}</span>
                        </td>
                        <td style={{ padding: '8px 12px', fontSize: '12px' }}>
                          <span className="inline-flex items-center gap-1.5" style={{ color: CHANNEL_COLORS[r.channel] }}>
                            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: CHANNEL_COLORS[r.channel], display: 'inline-block' }} />
                            {CHANNEL_LABELS[r.channel]}
                          </span>
                        </td>
                        <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 600, color: '#333' }}>
                          {r.channel === 'invitation' ? (
                            <span>
                              <span style={{ textDecoration: 'line-through', color: '#bbb', fontWeight: 400, marginRight: '6px' }}>{eur(r.price)}</span>
                              <span style={{ color: '#8a8478', fontWeight: 600 }}>offert</span>
                            </span>
                          ) : eur(r.price)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {rows.length > 800 && (
              <p style={{ fontSize: '12px', color: '#888', padding: '10px 12px', margin: 0 }}>
                Affichage des 800 premières lignes ({totals?.count} au total). L&apos;export CSV contient tout.
              </p>
            )}
          </div>
        )}

        {/* Suivi des virements Billetweb — repliable, masqué par défaut, périmètre global uniquement */}
        {showPayoutSection && (payouts.length > 0 || grandTotalBrut > 0) && (
          <div className="mb-8">
            <button
              onClick={() => setShowPayoutDetails((v) => !v)}
              className="flex items-center gap-2"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <span style={{
                display: 'inline-block', transition: 'transform 0.15s',
                transform: showPayoutDetails ? 'rotate(90deg)' : 'none', color: '#722f37', fontSize: '14px',
              }}>▶</span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#1a1a1a' }}>
                Suivi des virements Billetweb
              </span>
              <span style={{ fontSize: '12px', color: '#999', fontWeight: 400 }}>
                (tout l’historique — estimation)
              </span>
            </button>

            {showPayoutDetails && (
              <div className="mt-4">
                {/* Avertissement */}
                <div className="rounded-lg p-3 mb-4" style={{ background: '#fdf6e3', border: '1px solid #e8dfc8' }}>
                  <p style={{ fontSize: '13px', color: '#7a5c00', margin: 0, lineHeight: 1.5 }}>
                    <strong>À lire :</strong> ces chiffres couvrent <strong>tout l’historique, toutes éditions confondues</strong>{' '}
                    (les virements Billetweb ne sont pas ventilables par édition). Le « total encaissé » est calculé{' '}
                    <strong>avant commissions Billetweb</strong> — c’est donc une <strong>estimation haute</strong>, pas le net exact.
                    Le solde réellement dû à l’association se lit dans{' '}
                    <strong>Billetweb › Ventes réalisées</strong> (colonnes « À reverser » / « Reversé »).
                  </p>
                </div>

                {/* 3 indicateurs globaux */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                  {[
                    { label: 'Total encaissé (tout l’historique)', value: eur(grandTotalBrut), color: '#722f37', sub: `${grandTotalCount} billets payés` },
                    { label: 'Déjà reversé (banque)', value: eur(payoutTotal), color: '#166534', sub: `${payouts.length} virement(s)` },
                    { label: 'Estimation reste à percevoir', value: eur(grandTotalBrut - payoutTotal), color: '#b87333', sub: 'avant commissions' },
                  ].map((c) => (
                    <div key={c.label} className="rounded-xl p-4" style={{ background: '#fff', border: '1px solid #eee' }}>
                      <p style={{ fontSize: '11px', color: '#888', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.label}</p>
                      <p style={{ fontSize: '18px', fontWeight: 700, color: c.color }}>{c.value}</p>
                      <p style={{ fontSize: '11px', color: '#aaa', marginTop: '2px' }}>{c.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Détail des virements reçus */}
                {payouts.length > 0 && (
                  <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #eee' }}>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm" style={{ borderCollapse: 'collapse', minWidth: '480px' }}>
                        <thead>
                          <tr style={{ background: '#f7f3e9' }}>
                            {['Date', 'Compte', 'IBAN', 'Montant'].map((h) => (
                              <th key={h} style={{ textAlign: h === 'Montant' ? 'right' : 'left', padding: '10px 12px', fontWeight: 600, color: '#722f37', fontSize: '12px' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {payouts.map((p, i) => (
                            <tr key={i} style={{ borderTop: '1px solid #f0f0f0' }}>
                              <td style={{ padding: '8px 12px', color: '#666', whiteSpace: 'nowrap' }}>{p.date}</td>
                              <td style={{ padding: '8px 12px', color: '#333' }}>{p.account}</td>
                              <td style={{ padding: '8px 12px', color: '#666', fontSize: '12px' }}>{p.iban}</td>
                              <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 600, color: '#166534' }}>{eur(p.amount)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {!loading && rows.length === 0 && !error && (
          <p style={{ color: '#888', fontSize: '14px' }}>
            Choisis une édition (ou une période) et clique « Charger ».
          </p>
        )}
      </div>
    </DashboardShell>
  )
}
