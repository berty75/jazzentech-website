// PATH: src/app/dashboard/guichet/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Loader2, Ticket, CheckCircle2, AlertTriangle, Send, Gift, Banknote, CreditCard, FileText, Plus, Trash2, Users, Layers } from 'lucide-react'
import DashboardShell from '@/components/DashboardShell'
import Select from '@/components/Select'
import { PASS_TYPES, CERET_CONCERTS } from '@/lib/passConfig'

// Charte : bordeaux #722f37, or #d4af37, bronze #b87333, crème #f7f3e9, noir #1a1a1a
const BORDEAUX = '#722f37'
const OR = '#d4af37'
const BRONZE = '#b87333'
const CREME = '#f7f3e9'

type Ev = { id: string; name: string; start: string; multiple: string }
type Tk = { id: string; name: string; fullName: string; category: string; price: number }
type PayType = 'invitation' | 'cash' | 'card' | 'check'
type Mode = 'simple' | 'pass'
type CartLine = { id: string; ticketId: string; firstname: string; name: string }
type PassLine = { id: string; passId: string; firstname: string; name: string; concertIds: string[] }

const eur = (n: number) => n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })

const PAY_TYPES: { value: PayType; label: string; icon: any }[] = [
  { value: 'invitation', label: 'Invitation', icon: Gift },
  { value: 'cash', label: 'Espèces', icon: Banknote },
  { value: 'card', label: 'Carte', icon: CreditCard },
  { value: 'check', label: 'Chèque', icon: FileText },
]

let counter = 0
const newLine = (): CartLine => ({ id: `L${++counter}`, ticketId: '', firstname: '', name: '' })
const newPass = (): PassLine => ({ id: `P${++counter}`, passId: PASS_TYPES[1].id, firstname: '', name: '', concertIds: [] })

export default function GuichetPage() {
  const [events, setEvents] = useState<Ev[]>([])
  const [tickets, setTickets] = useState<Tk[]>([])
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [loadingTickets, setLoadingTickets] = useState(false)

  const [eventId, setEventId] = useState('')
  const [mode, setMode] = useState<Mode>('simple')
  const [type, setType] = useState<PayType>('invitation')

  const [cart, setCart] = useState<CartLine[]>([newLine()])
  const [passes, setPasses] = useState<PassLine[]>([newPass()])

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [instagram, setInstagram] = useState('')
  const [ship, setShip] = useState(true)

  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null)

  const [qrUrl, setQrUrl] = useState('')
  const [qrSessionId, setQrSessionId] = useState('')
  const [payStatus, setPayStatus] = useState<'idle' | 'waiting' | 'paid' | 'expired'>('idle')
  const [issuing, setIssuing] = useState(false)
  const [issued, setIssued] = useState(false)

  const selectedEvent = events.find((e) => e.id === eventId)
  const isInvitation = type === 'invitation'
  const ticketById = (id: string) => tickets.find((t) => t.id === id)
  const passById = (id: string) => PASS_TYPES.find((p) => p.id === id)

  // ---- chargement events + tickets ----
  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/billetweb/events')
        const data = await res.json()
        if (res.ok) setEvents(data.events || [])
        else setResult({ ok: false, msg: data.error || 'Erreur chargement concerts' })
      } catch (e: any) { setResult({ ok: false, msg: 'Erreur réseau : ' + e.message }) }
      finally { setLoadingEvents(false) }
    })()
  }, [])

  useEffect(() => {
    if (!eventId) { setTickets([]); return }
    setLoadingTickets(true)
    ;(async () => {
      try {
        const res = await fetch(`/api/billetweb/tickets?event=${encodeURIComponent(eventId)}`)
        const data = await res.json()
        if (res.ok) setTickets(data.tickets || [])
        else setResult({ ok: false, msg: data.error || 'Erreur chargement tarifs' })
      } catch (e: any) { setResult({ ok: false, msg: 'Erreur réseau : ' + e.message }) }
      finally { setLoadingTickets(false) }
    })()
  }, [eventId])

  // ---- BILLETS SIMPLES ----
  const updateLine = (id: string, patch: Partial<CartLine>) => setCart((c) => c.map((l) => (l.id === id ? { ...l, ...patch } : l)))
  const addLine = () => setCart((c) => [...c, newLine()])
  const removeLine = (id: string) => setCart((c) => (c.length > 1 ? c.filter((l) => l.id !== id) : c))
  const filledLines = cart.filter((l) => l.ticketId && l.firstname.trim() && l.name.trim())
  const cartTotal = cart.reduce((s, l) => s + (ticketById(l.ticketId)?.price ?? 0), 0)

  // ---- PASS ----
  const updatePass = (id: string, patch: Partial<PassLine>) => setPasses((ps) => ps.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  const addPass = () => setPasses((ps) => [...ps, newPass()])
  const removePass = (id: string) => setPasses((ps) => (ps.length > 1 ? ps.filter((p) => p.id !== id) : ps))
  const toggleConcert = (passLineId: string, concertId: string) => {
    setPasses((ps) => ps.map((p) => {
      if (p.id !== passLineId) return p
      const max = passById(p.passId)?.concerts ?? 0
      const has = p.concertIds.includes(concertId)
      if (has) return { ...p, concertIds: p.concertIds.filter((c) => c !== concertId) }
      if (p.concertIds.length >= max) return p // limite atteinte
      return { ...p, concertIds: [...p.concertIds, concertId] }
    }))
  }
  const passIsComplete = (p: PassLine) => {
    const need = passById(p.passId)?.concerts ?? 0
    return p.firstname.trim() && p.name.trim() && p.concertIds.length === need
  }
  const validPasses = passes.filter(passIsComplete)
  const passesTotal = validPasses.reduce((s, p) => s + (passById(p.passId)?.price ?? 0), 0)

  // Construit les lignes API pour les pass : billet pass (prix) + concerts à 0 €
  const passLinesForApi = () => {
    const out: any[] = []
    for (const p of validPasses) {
      const pt = passById(p.passId)!
      // billet pass (porte le prix)
      out.push({ ticketId: p.passId, ticketName: pt.label, firstname: p.firstname.trim(), name: p.name.trim(), unitPrice: pt.price })
      // concerts inclus à 0 €
      for (const cid of p.concertIds) {
        const cc = CERET_CONCERTS.find((c) => c.ticketId === cid)
        out.push({ ticketId: cid, ticketName: cc?.label || 'Concert', firstname: p.firstname.trim(), name: p.name.trim(), unitPrice: 0, price: 0 })
      }
    }
    return out
  }

  const simpleLinesForApi = () => filledLines.map((l) => ({
    ticketId: l.ticketId, ticketName: ticketById(l.ticketId)?.name || '',
    firstname: l.firstname.trim(), name: l.name.trim(), unitPrice: ticketById(l.ticketId)?.price ?? 0,
  }))

  const linesForApi = () => (mode === 'pass' ? passLinesForApi() : simpleLinesForApi())
  const currentTotal = mode === 'pass' ? passesTotal : cartTotal
  const currentCount = mode === 'pass' ? validPasses.length : filledLines.length

  const needsEmail = ship || type === 'card'
  const canSubmit = eventId && currentCount > 0 && (!needsEmail || email.trim()) && !submitting

  const resetAll = () => { setCart([newLine()]); setPasses([newPass()]); setEmail(''); setPhone(''); setInstagram('') }

  // ---- émission ----
  const emitDirect = async () => {
    setSubmitting(true); setResult(null)
    try {
      const res = await fetch('/api/billetweb/add-order', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, type, lines: linesForApi(), email, phone, instagram, ship }),
      })
      const data = await res.json()
      if (!res.ok) setResult({ ok: false, msg: data.error || 'Échec de l’émission' })
      else {
        const n = mode === 'pass' ? validPasses.length : (data.count || filledLines.length)
        setResult({ ok: true, msg: `${mode === 'pass' ? n + ' pass' : n + ' billet' + (n > 1 ? 's' : '')} émis${data.shipped ? ' — envoyé(s) par email' : ''}. Vérifie dans Billetweb.` })
        resetAll()
      }
    } catch (e: any) { setResult({ ok: false, msg: 'Erreur réseau : ' + e.message }) }
    finally { setSubmitting(false) }
  }

  const startCardPayment = async () => {
    setSubmitting(true); setResult(null)
    try {
      const res = await fetch('/api/stripe/guichet-checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, concertName: selectedEvent?.name || '', lines: linesForApi(), email, phone, instagram }),
      })
      const data = await res.json()
      if (!res.ok) { setResult({ ok: false, msg: data.error || 'Erreur Stripe' }); return }
      setQrUrl(data.url); setQrSessionId(data.sessionId); setPayStatus('waiting')
    } catch (e: any) { setResult({ ok: false, msg: 'Erreur réseau : ' + e.message }) }
    finally { setSubmitting(false) }
  }

  useEffect(() => {
    if (payStatus !== 'waiting' || !qrSessionId) return
    const iv = setInterval(async () => {
      try {
        const res = await fetch(`/api/stripe/guichet-status?session_id=${encodeURIComponent(qrSessionId)}`)
        const data = await res.json()
        if (data.status === 'paid') setPayStatus('paid')
        else if (data.status === 'expired') setPayStatus('expired')
      } catch { /* retry */ }
    }, 2500)
    return () => clearInterval(iv)
  }, [payStatus, qrSessionId])

  const issueTickets = async () => {
    setIssuing(true)
    try {
      const res = await fetch('/api/stripe/guichet-confirm', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: qrSessionId }),
      })
      const data = await res.json()
      if (!res.ok) setResult({ ok: false, msg: data.error || 'Billets non créés. ' + (data.billetweb_raw || '') })
      else { setIssued(true); setResult({ ok: true, msg: `Billets créés et envoyés. Vérifie dans Billetweb.` }) }
    } catch (e: any) { setResult({ ok: false, msg: 'Erreur réseau : ' + e.message }) }
    finally { setIssuing(false) }
  }

  const closeQr = () => {
    setQrUrl(''); setQrSessionId(''); setPayStatus('idle'); setIssued(false); setIssuing(false)
    if (issued) resetAll()
  }

  const emit = () => { if (type === 'card') startCardPayment(); else emitDirect() }

  const eventOptions = events.map((ev) => ({ value: ev.id, label: ev.name.trim() || 'Sans nom', hint: ev.start ? ev.start.slice(0, 10) : undefined }))
  const ticketOptions = tickets.map((t) => ({ value: t.id, label: t.fullName || t.name, hint: t.price > 0 ? eur(t.price) : 'gratuit' }))
  const passOptions = PASS_TYPES.map((p) => ({ value: p.id, label: p.label, hint: eur(p.price) }))

  const labelStyle: React.CSSProperties = { fontSize: '12px', color: '#8a8478', display: 'block', marginBottom: '7px', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase' }
  const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #e3ddd0', background: '#fff', fontSize: '14px', color: '#1a1a1a', outline: 'none' }

  return (
    <DashboardShell>
      <div className="p-4 sm:p-6 md:p-10" style={{ maxWidth: '900px' }}>
        <div className="mb-6 flex items-center gap-3">
          <div style={{ width: '46px', height: '46px', borderRadius: '13px', background: `linear-gradient(135deg, ${BORDEAUX}, #8f3d47)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(114,47,55,0.25)' }}>
            <Ticket className="w-5 h-5" style={{ color: OR }} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl" style={{ fontWeight: 700, color: '#1a1a1a', fontFamily: "'Playfair Display', Georgia, serif" }}>Guichet</h2>
            <p style={{ fontSize: '14px', color: '#8a8478' }}>Billets simples et pass — un seul paiement</p>
          </div>
        </div>

        <div className="rounded-3xl p-6 md:p-8" style={{ background: '#fff', border: '1px solid #ece7dd', boxShadow: '0 4px 24px rgba(26,26,26,0.04)' }}>
          {/* Événement */}
          <div className="mb-5">
            <label style={labelStyle}>Événement</label>
            <Select value={eventId} onChange={setEventId} options={eventOptions} loading={loadingEvents} placeholder="— Choisir l’événement —" />
          </div>

          {/* Mode : billets simples / pass */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {([['simple', 'Billets simples', Users], ['pass', 'Pass Céret', Layers]] as const).map(([m, lbl, Ico]) => {
              const active = mode === m
              return (
                <button key={m} type="button" onClick={() => setMode(m)}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl"
                  style={{ border: `1.5px solid ${active ? BORDEAUX : '#e3ddd0'}`, background: active ? 'rgba(114,47,55,0.06)' : '#fff', color: active ? BORDEAUX : '#8a8478', cursor: 'pointer', fontWeight: active ? 700 : 500, fontSize: '14px' }}>
                  <Ico className="w-4 h-4" />{lbl}
                </button>
              )
            })}
          </div>

          {/* Type de paiement */}
          <div className="mb-6">
            <label style={labelStyle}>Type d’émission</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PAY_TYPES.map((pt) => {
                const active = type === pt.value
                return (
                  <button key={pt.value} type="button" onClick={() => setType(pt.value)}
                    className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl"
                    style={{ border: `1.5px solid ${active ? BORDEAUX : '#e3ddd0'}`, background: active ? 'rgba(114,47,55,0.06)' : '#fff', color: active ? BORDEAUX : '#8a8478', cursor: 'pointer', fontWeight: active ? 600 : 500, fontSize: '13px' }}>
                    <pt.icon className="w-4 h-4" />{pt.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ---- MODE BILLETS SIMPLES ---- */}
          {mode === 'simple' && (
            <>
              <div className="flex items-center gap-2 mb-3" style={{ color: BRONZE }}>
                <Users className="w-4 h-4" />
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Les billets ({filledLines.length})</span>
              </div>
              <div className="space-y-3 mb-4">
                {cart.map((line, idx) => {
                  const tk = ticketById(line.ticketId)
                  return (
                    <div key={line.id} className="rounded-2xl p-4" style={{ background: '#faf8f3', border: '1px solid #ece7dd' }}>
                      <div className="flex items-center justify-between mb-3">
                        <span style={{ fontSize: '12px', fontWeight: 700, color: BORDEAUX }}>Billet {idx + 1}{tk && tk.price > 0 ? ` · ${eur(tk.price)}` : ''}</span>
                        {cart.length > 1 && <button type="button" onClick={() => removeLine(line.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0392b', padding: '2px' }}><Trash2 className="w-4 h-4" /></button>}
                      </div>
                      <div className="mb-3">
                        <label style={labelStyle}>Concert / tarif</label>
                        <Select value={line.ticketId} onChange={(v) => updateLine(line.id, { ticketId: v })} options={ticketOptions} disabled={!eventId} loading={loadingTickets} placeholder={!eventId ? '— Choisis l’événement —' : '— Choisir —'} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div><label style={labelStyle}>Prénom</label><input value={line.firstname} onChange={(e) => updateLine(line.id, { firstname: e.target.value })} style={inputStyle} placeholder="Paul" /></div>
                        <div><label style={labelStyle}>Nom</label><input value={line.name} onChange={(e) => updateLine(line.id, { name: e.target.value })} style={inputStyle} placeholder="Dupont" /></div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <button type="button" onClick={addLine} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl mb-5" style={{ border: `1.5px dashed ${BRONZE}`, background: '#fff', color: BRONZE, cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>
                <Plus className="w-4 h-4" />Ajouter une personne
              </button>
            </>
          )}

          {/* ---- MODE PASS ---- */}
          {mode === 'pass' && (
            <>
              <div className="flex items-center gap-2 mb-3" style={{ color: BRONZE }}>
                <Layers className="w-4 h-4" />
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Les pass ({validPasses.length})</span>
              </div>
              <div className="space-y-3 mb-4">
                {passes.map((p, idx) => {
                  const pt = passById(p.passId)!
                  const need = pt.concerts
                  const chosen = p.concertIds.length
                  const complete = passIsComplete(p)
                  return (
                    <div key={p.id} className="rounded-2xl p-4" style={{ background: '#faf8f3', border: `1px solid ${complete ? '#c3e0c3' : '#ece7dd'}` }}>
                      <div className="flex items-center justify-between mb-3">
                        <span style={{ fontSize: '12px', fontWeight: 700, color: BORDEAUX }}>Pass {idx + 1} · {eur(pt.price)}</span>
                        {passes.length > 1 && <button type="button" onClick={() => removePass(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0392b', padding: '2px' }}><Trash2 className="w-4 h-4" /></button>}
                      </div>
                      <div className="mb-3">
                        <label style={labelStyle}>Formule</label>
                        <Select value={p.passId} onChange={(v) => updatePass(p.id, { passId: v, concertIds: [] })} options={passOptions} placeholder="— Pass —" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <div><label style={labelStyle}>Prénom</label><input value={p.firstname} onChange={(e) => updatePass(p.id, { firstname: e.target.value })} style={inputStyle} placeholder="Paul" /></div>
                        <div><label style={labelStyle}>Nom</label><input value={p.name} onChange={(e) => updatePass(p.id, { name: e.target.value })} style={inputStyle} placeholder="Dupont" /></div>
                      </div>
                      <div>
                        <label style={labelStyle}>Concerts au choix — {chosen}/{need}</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {CERET_CONCERTS.map((cc) => {
                            const checked = p.concertIds.includes(cc.ticketId)
                            const disabled = !checked && chosen >= need
                            return (
                              <button key={cc.ticketId} type="button" onClick={() => toggleConcert(p.id, cc.ticketId)} disabled={disabled}
                                className="flex items-center gap-2 p-2.5 rounded-lg text-left"
                                style={{ border: `1.5px solid ${checked ? BORDEAUX : '#e3ddd0'}`, background: checked ? 'rgba(114,47,55,0.06)' : disabled ? '#f6f4ef' : '#fff', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
                                <div style={{ width: '18px', height: '18px', borderRadius: '5px', border: `1.5px solid ${checked ? BORDEAUX : '#c9c2b4'}`, background: checked ? BORDEAUX : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                  {checked && <CheckCircle2 className="w-3 h-3" style={{ color: '#fff' }} />}
                                </div>
                                <div>
                                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a' }}>{cc.label}</div>
                                  <div style={{ fontSize: '11px', color: '#8a8478' }}>{cc.date}</div>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <button type="button" onClick={addPass} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl mb-5" style={{ border: `1.5px dashed ${BRONZE}`, background: '#fff', color: BRONZE, cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>
                <Plus className="w-4 h-4" />Ajouter un pass
              </button>
            </>
          )}

          {/* Total si payant */}
          {!isInvitation && currentTotal > 0 && (
            <div className="rounded-xl p-4 mb-5 flex items-center justify-between" style={{ background: `linear-gradient(135deg, ${CREME}, #fdfaf2)`, border: '1px solid #ece0c4' }}>
              <span style={{ fontSize: '13px', color: '#8a8478' }}>{type === 'card' ? 'Montant à payer' : 'Total à encaisser'}</span>
              <span style={{ fontSize: '20px', color: BORDEAUX, fontWeight: 700 }}>{eur(currentTotal)}<span style={{ fontSize: '13px', fontWeight: 400, color: '#b0a894' }}> · {currentCount} {mode === 'pass' ? 'pass' : 'billet' + (currentCount > 1 ? 's' : '')}</span></span>
            </div>
          )}

          {/* Contact */}
          <div className="mt-6 mb-2" style={{ fontSize: '11px', fontWeight: 700, color: BRONZE, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Contact (envoi des billets)</div>
          <div style={{ height: '1px', background: '#f0ece3', marginBottom: '16px' }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div><label style={labelStyle}>{needsEmail ? 'Email' : 'Email (optionnel)'}</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} placeholder="paul@exemple.fr" /></div>
            <div><label style={labelStyle}>Téléphone (optionnel)</label><input value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} placeholder="06 12 34 56 78" /></div>
          </div>
          <div className="mb-5"><label style={labelStyle}>Compte Instagram (optionnel)</label><input value={instagram} onChange={(e) => setInstagram(e.target.value)} style={inputStyle} placeholder="@pseudo" /></div>

          {type !== 'card' && (
            <button type="button" onClick={() => setShip((s) => !s)} className="flex items-center gap-3 w-full mb-4" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}>
              <div style={{ width: '44px', height: '26px', borderRadius: '999px', flexShrink: 0, background: ship ? BORDEAUX : '#d8d2c6', position: 'relative', transition: 'background 0.2s' }}>
                <div style={{ position: 'absolute', top: '3px', left: ship ? '21px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </div>
              <span style={{ fontSize: '14px', color: '#333', fontWeight: 500 }}>Envoyer les billets par email</span>
            </button>
          )}
          {type === 'card' && <p style={{ fontSize: '12px', color: '#8a8478', margin: '0 0 12px 0' }}>💳 Le client scanne un QR code et paie sur son téléphone. Les billets sont envoyés par email après paiement.</p>}

          <button onClick={emit} disabled={!canSubmit} className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm mt-2"
            style={{ background: canSubmit ? `linear-gradient(135deg, ${BORDEAUX}, #8f3d47)` : '#d8d2c6', color: '#fff', border: 'none', fontWeight: 600, fontSize: '15px', cursor: canSubmit ? 'pointer' : 'not-allowed', boxShadow: canSubmit ? '0 8px 20px rgba(114,47,55,0.28)' : 'none' }}>
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            {submitting ? (type === 'card' ? 'Préparation…' : 'Émission…')
              : type === 'card' ? `Générer le QR (${eur(currentTotal)})`
              : mode === 'pass' ? `Émettre ${currentCount} pass`
              : isInvitation ? `Émettre ${currentCount} invitation${currentCount > 1 ? 's' : ''}`
              : `Émettre ${currentCount} billet${currentCount > 1 ? 's' : ''}`}
          </button>

          {result && (
            <div className="rounded-xl p-4 mt-4 flex items-start gap-3" style={{ background: result.ok ? '#eef6ee' : '#fef2f2', border: `1px solid ${result.ok ? '#c3e0c3' : '#fecaca'}` }}>
              {result.ok ? <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: '#166534' }} /> : <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: '#991b1b' }} />}
              <p style={{ fontSize: '13.5px', margin: 0, color: result.ok ? '#166534' : '#991b1b', lineHeight: 1.5 }}>{result.msg}</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal QR */}
      {qrUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(26,26,26,0.55)' }} onClick={closeQr}>
          <div className="rounded-3xl p-6 md:p-8 text-center" style={{ background: '#fff', maxWidth: '420px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={(e) => e.stopPropagation()}>
            {payStatus === 'paid' ? (
              issued ? (
                <>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#eef6ee', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><CheckCircle2 className="w-8 h-8" style={{ color: '#166534' }} /></div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#166534', marginBottom: '8px' }}>Billets envoyés !</h3>
                  <p style={{ fontSize: '14px', color: '#555', marginBottom: '20px', lineHeight: 1.5 }}>Les billets ont été créés dans Billetweb et envoyés par email.</p>
                  <button onClick={closeQr} className="w-full py-3 rounded-xl" style={{ background: BORDEAUX, color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Nouvelle vente</button>
                </>
              ) : (
                <>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#eef6ee', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><CheckCircle2 className="w-8 h-8" style={{ color: '#166534' }} /></div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#166534', marginBottom: '8px' }}>Paiement reçu ✓</h3>
                  <p style={{ fontSize: '14px', color: '#555', marginBottom: '20px', lineHeight: 1.5 }}>Le paiement de <strong>{eur(currentTotal)}</strong> est confirmé. Clique pour générer et envoyer les billets.</p>
                  <button onClick={issueTickets} disabled={issuing} className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl mb-3" style={{ background: `linear-gradient(135deg, ${BORDEAUX}, #8f3d47)`, color: '#fff', border: 'none', fontWeight: 600, fontSize: '15px', cursor: issuing ? 'wait' : 'pointer', boxShadow: '0 8px 20px rgba(114,47,55,0.28)' }}>
                    {issuing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Ticket className="w-5 h-5" />}{issuing ? 'Génération…' : 'Générer et envoyer les billets'}
                  </button>
                  {result && !result.ok && <p style={{ fontSize: '12px', color: '#991b1b', margin: '0 0 8px' }}>{result.msg}</p>}
                  <button onClick={closeQr} className="w-full py-2 rounded-xl" style={{ background: 'transparent', color: '#8a8478', border: '1px solid #e3ddd0', fontWeight: 500, cursor: 'pointer' }}>Fermer</button>
                </>
              )
            ) : payStatus === 'expired' ? (
              <>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><AlertTriangle className="w-8 h-8" style={{ color: '#991b1b' }} /></div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#991b1b', marginBottom: '8px' }}>Session expirée</h3>
                <p style={{ fontSize: '14px', color: '#555', marginBottom: '20px' }}>Le client n’a pas payé à temps.</p>
                <button onClick={closeQr} className="w-full py-3 rounded-xl" style={{ background: BORDEAUX, color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Fermer</button>
              </>
            ) : (
              <>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a1a', marginBottom: '4px' }}>Scannez pour payer</h3>
                <p style={{ fontSize: '14px', color: '#8a8478', marginBottom: '20px' }}>{eur(currentTotal)} · {currentCount} {mode === 'pass' ? 'pass' : 'billet' + (currentCount > 1 ? 's' : '')}</p>
                <div style={{ background: '#fff', padding: '12px', borderRadius: '16px', border: '2px solid #f0ece3', display: 'inline-block', marginBottom: '20px' }}>
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(qrUrl)}`} width={240} height={240} alt="QR paiement" style={{ display: 'block' }} />
                </div>
                <div className="flex items-center justify-center gap-2 mb-4" style={{ color: '#8a8478' }}><Loader2 className="w-4 h-4 animate-spin" /><span style={{ fontSize: '13px' }}>En attente du paiement…</span></div>
                <a href={qrUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: BORDEAUX, textDecoration: 'underline', display: 'block', marginBottom: '12px' }}>Ou ouvrir la page de paiement ici</a>
                <button onClick={closeQr} className="w-full py-2.5 rounded-xl" style={{ background: 'transparent', color: '#8a8478', border: '1px solid #e3ddd0', fontWeight: 500, cursor: 'pointer' }}>Annuler</button>
              </>
            )}
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
