// PATH: src/app/dashboard/billets/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Loader2, MailWarning, MailCheck, RefreshCw, ExternalLink, Download, CheckCircle2, AlertTriangle, Trash2, X, Search, Send } from 'lucide-react'
import DashboardShell from '@/components/DashboardShell'
import Select from '@/components/Select'

const BORDEAUX = '#722f37'
const BRONZE = '#b87333'
const CREME = '#f7f3e9'

type Row = {
  id: string; date: string; eventName: string; concert: string; ticket: string
  buyer: string; email: string; hasEmail: boolean; channel: string; price: number
  used: boolean; eventId: string; orderId: string; orderLink: string; downloadLink: string
}
type Stats = { total: number; withEmail: number; withoutEmail: number; used: number }

const eur = (n: number) => n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })

// '2025-08-09 19:36' → '09/08/25 · 19:36'
const fmtDate = (d: string) => {
  if (!d || d.length < 16) return d
  const [date, time] = d.split(' ')
  const [Y, M, D] = date.split('-')
  return `${D}/${M}/${Y.slice(2)} · ${time}`
}
const CHANNEL_LABEL: Record<string, string> = {
  web: 'En ligne', card: 'Carte (TPE)', cash: 'Espèces', check: 'Chèque', invitation: 'Invitation',
}

export default function BilletsPage() {
  const [editions, setEditions] = useState<string[]>([])
  const [edition, setEdition] = useState('')
  const [editionsLoading, setEditionsLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rows, setRows] = useState<Row[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [filter, setFilter] = useState<'all' | 'noemail'>('noemail')
  const [query, setQuery] = useState('')

  // Édition d'email inline
  const [resending, setResending] = useState<string | null>(null)  // id du billet dont on saisit l'adresse
  const [draftEmail, setDraftEmail] = useState('')
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState<{ ok: boolean; msg: string } | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null) // orderId en cours de suppression
  const [confirmDelete, setConfirmDelete] = useState<Row | null>(null) // billet en attente de confirmation
  const [notifyClient, setNotifyClient] = useState(false)  // prévenir le client de l'annulation ?

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/billetweb/billets?editionsOnly=1')
        const data = await res.json()
        if (res.ok) setEditions(data.editions || [])
      } catch { /* silencieux */ }
      finally { setEditionsLoading(false) }
    })()
  }, [])

  const load = async () => {
    setLoading(true); setError('')
    try {
      const q = new URLSearchParams()
      if (edition) q.set('edition', edition)
      const res = await fetch(`/api/billetweb/billets?${q.toString()}`)
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Erreur'); return }
      setRows(data.rows || [])
      setStats(data.stats || null)
      if (data.editions?.length) setEditions(data.editions)
    } catch (e: any) { setError('Erreur : ' + e.message) }
    finally { setLoading(false) }
  }

  // Renvoyer le billet à une adresse (l'API Billetweb ne permet pas de changer l'email :
  // on envoie donc le billet nous-mêmes, via Brevo, à la bonne adresse).
  const resendTicket = async (row: Row) => {
    const target = draftEmail.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target)) { setNotice({ ok: false, msg: 'Adresse email invalide' }); return }
    setSaving(true); setNotice(null)
    try {
      const res = await fetch('/api/billetweb/resend-ticket', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: target, buyer: row.buyer, concert: row.concert, ticket: row.ticket,
          downloadLink: row.downloadLink, orderId: row.orderId,
        }),
      })
      const data = await res.json()
      if (!res.ok) setNotice({ ok: false, msg: data.error || 'Échec de l’envoi.' })
      else {
        setNotice({ ok: true, msg: `Billet envoyé à ${target}. (L'adresse enregistrée dans Billetweb reste inchangée — corrige-la dans Billetweb si besoin.)` })
        setResending(null); setDraftEmail('')
      }
    } catch (e: any) { setNotice({ ok: false, msg: 'Erreur réseau : ' + e.message }) }
    finally { setSaving(false) }
  }

  // Supprimer la commande (nettoyage des tests)
  const deleteOrder = async (row: Row) => {
    setConfirmDelete(null)
    setDeleting(row.orderId); setNotice(null)
    try {
      const res = await fetch('/api/billetweb/delete-order', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: row.eventId, orderIds: [row.orderId], buyer: row.buyer, concert: row.concert, notifyClient, clientEmail: row.email }),
      })
      const data = await res.json()
      if (!res.ok) setNotice({ ok: false, msg: data.error || 'Suppression refusée par Billetweb.' })
      else { setNotice({ ok: true, msg: `Commande supprimée et vérifiée.${data.clientNotified ? ' Le client a été prévenu.' : ''}` }); await load() }
    } catch (e: any) { setNotice({ ok: false, msg: 'Erreur réseau : ' + e.message }) }
    finally { setDeleting(null); setNotifyClient(false) }
  }

  const q = query.trim().toLowerCase()
  const visible = rows
    .filter((r) => (filter === 'noemail' ? !r.hasEmail : true))
    .filter((r) => {
      if (!q) return true
      return (
        r.buyer.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.concert.toLowerCase().includes(q) ||
        r.ticket.toLowerCase().includes(q)
      )
    })

  return (
    <DashboardShell>
      <div className="p-4 sm:p-6 md:p-10">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl" style={{ fontWeight: 700, color: '#1a1a1a' }}>Billets émis</h2>
          <p style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>Repérer les billets qui n’ont pas pu être envoyés</p>
        </div>

        {/* Avertissement honnête sur ce qu'on peut savoir */}
        <div className="rounded-xl p-4 mb-6 flex items-start gap-3" style={{ background: CREME, border: '1px solid #e8dfc8' }}>
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#b8860b' }} />
          <p style={{ fontSize: '13px', color: '#7a5c00', margin: 0, lineHeight: 1.55 }}>
            <strong>Un client n&apos;a pas reçu son billet ?</strong> Clique sur « Renvoyer » et saisis la bonne adresse :
            le billet lui est envoyé immédiatement depuis Jazz en Tech.
            <br /><br />
            À savoir : l&apos;API Billetweb ne permet pas de <em>modifier</em> l&apos;adresse enregistrée (testé — elle est ignorée).
            Le renvoi règle le problème côté client. Pour corriger l&apos;adresse dans la base Billetweb, passe par le bouton « Billetweb ».
            Un billet <strong>sans email</strong> n&apos;a jamais pu être envoyé : c&apos;est le seul cas certain.
        </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap items-end gap-3 mb-6">
          <div style={{ width: '190px' }}>
            <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>Édition</label>
            <Select value={edition} onChange={setEdition} loading={editionsLoading} compact placeholder="Toutes les éditions"
              options={[{ value: '', label: 'Toutes les éditions' }, ...editions.map((e) => ({ value: e, label: e }))]} />
          </div>
          <button onClick={load} disabled={loading} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm"
            style={{ background: BORDEAUX, color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}Charger
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg p-3" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
            <p style={{ color: '#991b1b', fontSize: '13px', margin: 0 }}>{error}</p>
          </div>
        )}

        {notice && (
          <div className="mb-4 rounded-lg p-3 flex items-start gap-2" style={{ background: notice.ok ? '#eef6ee' : '#fef2f2', border: `1px solid ${notice.ok ? '#c3e0c3' : '#fecaca'}` }}>
            {notice.ok ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#166534' }} /> : <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#991b1b' }} />}
            <p style={{ color: notice.ok ? '#166534' : '#991b1b', fontSize: '13px', margin: 0 }}>{notice.msg}</p>
          </div>
        )}

        {/* Stats */}
        {stats && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {[
                { label: 'Billets émis', value: String(stats.total), color: '#1a1a1a', icon: null },
                { label: 'Avec email', value: String(stats.withEmail), color: '#166534', icon: MailCheck },
                { label: 'SANS email', value: String(stats.withoutEmail), color: stats.withoutEmail > 0 ? '#991b1b' : '#999', icon: MailWarning },
                { label: 'Scannés à l’entrée', value: String(stats.used), color: BRONZE, icon: CheckCircle2 },
              ].map((c) => (
                <div key={c.label} className="rounded-xl p-4" style={{ background: '#fff', border: `1px solid ${c.label === 'SANS email' && stats.withoutEmail > 0 ? '#fecaca' : '#eee'}` }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    {c.icon && <c.icon className="w-3.5 h-3.5" style={{ color: c.color }} />}
                    <p style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{c.label}</p>
                  </div>
                  <p style={{ fontSize: '20px', fontWeight: 700, color: c.color }}>{c.value}</p>
                </div>
              ))}
            </div>

            {/* Recherche + bascule filtre */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '380px' }}>
                <Search className="w-4 h-4" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#a8a094', pointerEvents: 'none' }} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher un nom, un email, un concert…"
                  style={{ width: '100%', padding: '10px 34px 10px 36px', borderRadius: '10px', border: '1.5px solid #e3ddd0', background: '#fff', fontSize: '14px', color: '#1a1a1a', outline: 'none' }}
                />
                {query && (
                  <button onClick={() => setQuery('')} title="Effacer"
                    style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#a8a094', padding: '2px', display: 'flex' }}>
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                {([['noemail', `Sans email (${stats.withoutEmail})`], ['all', `Tous (${stats.total})`]] as const).map(([f, lbl]) => {
                  const active = filter === f
                  return (
                    <button key={f} onClick={() => setFilter(f)} className="px-4 py-2 rounded-lg text-sm"
                      style={{ border: `1.5px solid ${active ? BORDEAUX : '#e3ddd0'}`, background: active ? 'rgba(114,47,55,0.06)' : '#fff', color: active ? BORDEAUX : '#8a8478', fontWeight: active ? 600 : 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      {lbl}
                    </button>
                  )
                })}
              </div>

              {query && (
                <span style={{ fontSize: '13px', color: '#8a8478' }}>
                  {visible.length} résultat{visible.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </>
        )}

        {/* Tableau */}
        {visible.length > 0 && (
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #eee' }}>
            <div className="overflow-x-auto">
              <table className="text-sm w-full" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                <colgroup>
                  <col style={{ width: '12%' }} />{/* Date */}
                  <col style={{ width: '16%' }} />{/* Participant */}
                  <col style={{ width: '20%' }} />{/* Concert */}
                  <col style={{ width: '8%' }} />{/* Canal */}
                  <col style={{ width: '20%' }} />{/* Email */}
                  <col style={{ width: '8%' }} />{/* Prix */}
                  <col style={{ width: '16%' }} />{/* Actions */}
                </colgroup>
                <thead>
                  <tr style={{ background: CREME }}>
                    {['Date', 'Participant', 'Concert', 'Canal', 'Email', 'Prix', ''].map((h, i) => (
                      <th key={i} style={{ textAlign: h === 'Prix' ? 'right' : 'left', padding: '10px 12px', fontWeight: 600, color: BORDEAUX, fontSize: '12px', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visible.slice(0, 500).map((r) => (
                    <tr key={r.id} style={{ borderTop: '1px solid #f0f0f0', background: !r.hasEmail ? '#fffbfb' : '#fff' }}>
                      <td style={{ padding: '8px 12px', color: '#666', whiteSpace: 'nowrap', fontSize: '12px' }}>{fmtDate(r.date)}</td>
                      <td style={{ padding: '8px 12px', color: '#333', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={r.buyer}>{r.buyer || <span style={{ color: '#bbb' }}>—</span>}</td>
                      <td style={{ padding: '8px 12px', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={r.concert}>{r.concert}</td>
                      <td style={{ padding: '8px 12px', color: '#666', fontSize: '12px', whiteSpace: 'nowrap' }}>{CHANNEL_LABEL[r.channel] || r.channel || '—'}</td>
                      <td style={{ padding: '8px 12px' }}>
                        {r.hasEmail ? (
                          <span className="inline-flex items-center gap-1.5" style={{ color: '#166534', fontSize: '12px' }}>
                            <MailCheck className="w-3.5 h-3.5" />{r.email}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5" style={{ color: '#991b1b', fontSize: '12px', fontWeight: 600 }}>
                            <MailWarning className="w-3.5 h-3.5" />Aucun email
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 600, color: '#333', whiteSpace: 'nowrap' }}>{eur(r.price)}</td>
                      <td style={{ padding: '8px 12px' }}>
                        {resending === r.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="email" autoFocus value={draftEmail}
                              onChange={(e) => setDraftEmail(e.target.value)}
                              onKeyDown={(e) => { if (e.key === 'Enter') resendTicket(r); if (e.key === 'Escape') { setResending(null); setDraftEmail('') } }}
                              placeholder="bonne@adresse.fr"
                              style={{ padding: '5px 7px', borderRadius: '7px', border: `1.5px solid ${BORDEAUX}`, fontSize: '12px', outline: 'none', width: '100%', minWidth: 0 }}
                            />
                            <button onClick={() => resendTicket(r)} disabled={saving} title="Envoyer"
                              style={{ background: BORDEAUX, color: '#fff', border: 'none', borderRadius: '6px', padding: '5px', cursor: 'pointer', flexShrink: 0 }}>
                              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                            </button>
                            <button onClick={() => { setResending(null); setDraftEmail('') }} title="Annuler"
                              style={{ background: 'transparent', color: '#8a8478', border: 'none', padding: '5px', cursor: 'pointer', flexShrink: 0 }}>
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-1">
                            {r.downloadLink && (
                              <button onClick={() => { setResending(r.id); setDraftEmail(r.email) }}
                                title="Renvoyer le billet à une autre adresse"
                                style={{ color: BORDEAUX, background: 'transparent', border: '1px solid #e3ddd0', borderRadius: '7px', padding: '5px', cursor: 'pointer', display: 'flex' }}>
                                <Send className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {r.eventId && (
                              <a href={`https://www.billetweb.fr/bo/attendees.php?event=${r.eventId}`} target="_blank" rel="noopener noreferrer"
                                title="Ouvrir dans le back-office Billetweb"
                                style={{ color: '#8a8478', border: '1px solid #e3ddd0', borderRadius: '7px', padding: '5px', display: 'flex' }}>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {r.downloadLink && (
                              <a href={r.downloadLink} target="_blank" rel="noopener noreferrer" title="Télécharger le billet PDF"
                                style={{ color: '#8a8478', border: '1px solid #e3ddd0', borderRadius: '7px', padding: '5px', display: 'flex' }}>
                                <Download className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button onClick={() => setConfirmDelete(r)} disabled={deleting === r.orderId} title="Supprimer la commande"
                              style={{ background: 'transparent', border: '1px solid #fecaca', color: '#c0392b', borderRadius: '7px', padding: '5px', cursor: 'pointer', display: 'flex' }}>
                              {deleting === r.orderId ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {visible.length > 500 && (
              <p style={{ fontSize: '12px', color: '#888', padding: '10px 12px', margin: 0 }}>Affichage des 500 premiers ({visible.length} au total).</p>
            )}
          </div>
        )}

        {!loading && stats && visible.length === 0 && (
          <div className="rounded-xl p-6 text-center" style={{ background: '#eef6ee', border: '1px solid #c3e0c3' }}>
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2" style={{ color: '#166534' }} />
            <p style={{ color: '#166534', fontWeight: 600, margin: 0 }}>
              {query ? `Aucun résultat pour « ${query} »`
                : filter === 'noemail' ? 'Aucun billet sans email — tout est bon !'
                : 'Aucun billet.'}
            </p>
          </div>
        )}

        {!loading && !stats && !error && (
          <p style={{ color: '#888', fontSize: '14px' }}>Choisis une édition et clique « Charger ».</p>
        )}
      </div>
      {/* Modal de confirmation de suppression — charte Jazz en Tech */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(26,26,26,0.55)', backdropFilter: 'blur(2px)' }}
          onClick={() => { setConfirmDelete(null); setNotifyClient(false) }}>
          <div className="rounded-3xl p-6 md:p-8"
            style={{ background: '#fff', maxWidth: '440px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
            onClick={(e) => e.stopPropagation()}>

            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: '46px', height: '46px', borderRadius: '13px', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Trash2 className="w-5 h-5" style={{ color: '#c0392b' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a1a', margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Supprimer cette commande ?
                </h3>
                <p style={{ fontSize: '13px', color: '#991b1b', margin: '2px 0 0', fontWeight: 600 }}>Action irréversible</p>
              </div>
            </div>

            <div className="rounded-2xl p-4 mb-5" style={{ background: '#faf8f3', border: '1px solid #ece7dd' }}>
              <div className="flex justify-between mb-2">
                <span style={{ fontSize: '12px', color: '#8a8478' }}>Participant</span>
                <span style={{ fontSize: '13px', color: '#1a1a1a', fontWeight: 600 }}>{confirmDelete.buyer || '—'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span style={{ fontSize: '12px', color: '#8a8478' }}>Concert</span>
                <span style={{ fontSize: '13px', color: '#1a1a1a', textAlign: 'right', maxWidth: '60%' }}>{confirmDelete.concert}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ fontSize: '12px', color: '#8a8478' }}>Prix</span>
                <span style={{ fontSize: '13px', color: BORDEAUX, fontWeight: 700 }}>{eur(confirmDelete.price)}</span>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.55, marginBottom: '16px' }}>
              Le billet sera définitivement supprimé de Billetweb et ne sera plus valable à l&apos;entrée.
            </p>

            {/* Prévenir le client ? — décoché par défaut (nettoyage / correction d'erreur) */}
            <button type="button" onClick={() => setNotifyClient((v) => !v)}
              className="flex items-start gap-3 w-full text-left rounded-xl p-3 mb-5"
              style={{ background: notifyClient ? 'rgba(114,47,55,0.05)' : 'transparent', border: `1.5px solid ${notifyClient ? BORDEAUX : '#e3ddd0'}`, cursor: confirmDelete.hasEmail ? 'pointer' : 'not-allowed', opacity: confirmDelete.hasEmail ? 1 : 0.5 }}
              disabled={!confirmDelete.hasEmail}>
              <div style={{ width: '20px', height: '20px', borderRadius: '6px', border: `1.5px solid ${notifyClient ? BORDEAUX : '#c9c2b4'}`, background: notifyClient ? BORDEAUX : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                {notifyClient && <CheckCircle2 className="w-3 h-3" style={{ color: '#fff' }} />}
              </div>
              <div>
                <span style={{ fontSize: '13.5px', color: '#1a1a1a', fontWeight: 600, display: 'block' }}>
                  Prévenir le client de l&apos;annulation
                </span>
                <span style={{ fontSize: '12px', color: '#8a8478' }}>
                  {confirmDelete.hasEmail
                    ? `Un email d'annulation sera envoyé à ${confirmDelete.email}. Laisse décoché s'il s'agit d'une correction ou d'un test.`
                    : 'Aucune adresse email sur ce billet — impossible de prévenir.'}
                </span>
              </div>
            </button>

            <div className="flex gap-3">
              <button onClick={() => { setConfirmDelete(null); setNotifyClient(false) }}
                className="flex-1 py-3 rounded-xl"
                style={{ background: 'transparent', color: '#8a8478', border: '1.5px solid #e3ddd0', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
                Annuler
              </button>
              <button onClick={() => deleteOrder(confirmDelete)}
                className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #c0392b, #991b1b)', color: '#fff', border: 'none', fontWeight: 600, fontSize: '14px', cursor: 'pointer', boxShadow: '0 8px 20px rgba(192,57,43,0.25)' }}>
                <Trash2 className="w-4 h-4" />
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
