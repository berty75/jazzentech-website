// PATH: src/app/dashboard/guichet/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Loader2, Ticket, CheckCircle2, AlertTriangle, Send, Gift, Banknote, CreditCard, FileText } from 'lucide-react'
import DashboardShell from '@/components/DashboardShell'
import Select from '@/components/Select'

// Charte : bordeaux #722f37, or #d4af37, bronze #b87333, crème #f7f3e9, noir #1a1a1a
const BORDEAUX = '#722f37'
const OR = '#d4af37'
const BRONZE = '#b87333'
const CREME = '#f7f3e9'

type Ev = { id: string; name: string; start: string; multiple: string }
type Tk = { id: string; name: string; fullName: string; category: string; price: number }
type PayType = 'invitation' | 'cash' | 'card' | 'check'

const eur = (n: number) => n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })

const PAY_TYPES: { value: PayType; label: string; icon: any }[] = [
  { value: 'invitation', label: 'Invitation', icon: Gift },
  { value: 'cash', label: 'Espèces', icon: Banknote },
  { value: 'card', label: 'Carte', icon: CreditCard },
  { value: 'check', label: 'Chèque', icon: FileText },
]

export default function GuichetPage() {
  const [events, setEvents] = useState<Ev[]>([])
  const [tickets, setTickets] = useState<Tk[]>([])
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [loadingTickets, setLoadingTickets] = useState(false)

  const [eventId, setEventId] = useState('')
  const [ticketId, setTicketId] = useState('')
  const [type, setType] = useState<PayType>('invitation')
  const [quantity, setQuantity] = useState(1)
  const [firstname, setFirstname] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [instagram, setInstagram] = useState('')
  const [ship, setShip] = useState(true)

  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null)

  // Flux paiement carte (Stripe QR)
  const [qrUrl, setQrUrl] = useState('')          // URL Stripe encodée en QR
  const [qrSessionId, setQrSessionId] = useState('')
  const [payStatus, setPayStatus] = useState<'idle' | 'waiting' | 'paid' | 'expired'>('idle')
  const [issuing, setIssuing] = useState(false)   // création du billet en cours
  const [issued, setIssued] = useState(false)     // billet créé

  const selectedEvent = events.find((e) => e.id === eventId)
  const selectedTicket = tickets.find((t) => t.id === ticketId)
  const isInvitation = type === 'invitation'
  const unitPrice = selectedTicket?.price ?? 0

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/billetweb/events')
        const data = await res.json()
        if (res.ok) setEvents(data.events || [])
        else setResult({ ok: false, msg: data.error || 'Erreur chargement concerts' })
      } catch (e: any) {
        setResult({ ok: false, msg: 'Erreur réseau : ' + e.message })
      } finally {
        setLoadingEvents(false)
      }
    })()
  }, [])

  useEffect(() => {
    if (!eventId) { setTickets([]); setTicketId(''); return }
    setLoadingTickets(true)
    setTicketId('')
    ;(async () => {
      try {
        const res = await fetch(`/api/billetweb/tickets?event=${encodeURIComponent(eventId)}`)
        const data = await res.json()
        if (res.ok) setTickets(data.tickets || [])
        else setResult({ ok: false, msg: data.error || 'Erreur chargement tarifs' })
      } catch (e: any) {
        setResult({ ok: false, msg: 'Erreur réseau : ' + e.message })
      } finally {
        setLoadingTickets(false)
      }
    })()
  }, [eventId])

  const needsEmail = ship || type === 'card' // carte : email requis pour envoyer le billet
  const canSubmit =
    eventId && ticketId && firstname.trim() && name.trim() && phone.trim() &&
    (!needsEmail || email.trim()) && !submitting

  // Émission directe (invitation / espèces / chèque)
  const emitDirect = async () => {
    setSubmitting(true)
    setResult(null)
    try {
      const res = await fetch('/api/billetweb/add-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, ticketId, ticketName: selectedTicket?.name || '', type, quantity, firstname, name, email, phone, instagram, ship }),
      })
      const data = await res.json()
      if (!res.ok) {
        setResult({ ok: false, msg: data.error || 'Échec de l’émission' })
      } else {
        const q = data.quantity || quantity
        setResult({ ok: true, msg: `${q} billet${q > 1 ? 's' : ''} émis pour ${firstname} ${name}${data.shipped ? ' — envoyé par email' : ''}. Vérifie dans Billetweb › Participants.` })
        resetBuyer()
      }
    } catch (e: any) {
      setResult({ ok: false, msg: 'Erreur réseau : ' + e.message })
    } finally {
      setSubmitting(false)
    }
  }

  // Paiement carte : crée la session Stripe → affiche le QR → poll le statut
  const startCardPayment = async () => {
    setSubmitting(true)
    setResult(null)
    try {
      const res = await fetch('/api/stripe/guichet-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId, ticketId, ticketName: selectedTicket?.name || '',
          concertName: selectedEvent?.name || '', quantity, unitPrice,
          firstname, name, email, phone, instagram,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setResult({ ok: false, msg: data.error || 'Erreur Stripe' }); return }
      setQrUrl(data.url)
      setQrSessionId(data.sessionId)
      setPayStatus('waiting')
    } catch (e: any) {
      setResult({ ok: false, msg: 'Erreur réseau : ' + e.message })
    } finally {
      setSubmitting(false)
    }
  }

  // Polling du statut de paiement tant que le QR est affiché
  useEffect(() => {
    if (payStatus !== 'waiting' || !qrSessionId) return
    const iv = setInterval(async () => {
      try {
        const res = await fetch(`/api/stripe/guichet-status?session_id=${encodeURIComponent(qrSessionId)}`)
        const data = await res.json()
        if (data.status === 'paid') {
          setPayStatus('paid')
        } else if (data.status === 'expired') {
          setPayStatus('expired')
        }
      } catch { /* on réessaie au prochain tick */ }
    }, 2500)
    return () => clearInterval(iv)
  }, [payStatus, qrSessionId, firstname, name])

  const resetBuyer = () => {
    setFirstname(''); setName(''); setEmail(''); setPhone(''); setInstagram(''); setQuantity(1)
  }

  // Après paiement confirmé : créer le billet Billetweb + envoi email
  const issueTicket = async () => {
    setIssuing(true)
    try {
      const res = await fetch('/api/stripe/guichet-confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: qrSessionId }),
      })
      const data = await res.json()
      if (!res.ok) {
        setResult({ ok: false, msg: data.error || 'Le billet n’a pas pu être créé. ' + (data.billetweb_raw || '') })
      } else {
        setIssued(true)
        setResult({ ok: true, msg: `Billet créé et envoyé à ${data.email || (firstname + ' ' + name)}. Vérifie dans Billetweb › Participants.` })
      }
    } catch (e: any) {
      setResult({ ok: false, msg: 'Erreur réseau : ' + e.message })
    } finally {
      setIssuing(false)
    }
  }

  const closeQr = () => {
    setQrUrl(''); setQrSessionId(''); setPayStatus('idle'); setIssued(false); setIssuing(false)
    if (issued) resetBuyer()
  }

  const emit = () => {
    if (type === 'card') startCardPayment()
    else emitDirect()
  }

  const eventOptions = events.map((ev) => ({
    value: ev.id,
    label: ev.name.trim() || 'Sans nom',
    hint: ev.start ? ev.start.slice(0, 10) : undefined,
  }))
  const ticketOptions = tickets.map((t) => ({
    value: t.id,
    label: t.fullName || t.name,
    hint: t.price > 0 ? eur(t.price) : 'gratuit',
  }))

  const labelStyle: React.CSSProperties = { fontSize: '12px', color: '#8a8478', display: 'block', marginBottom: '7px', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase' }

  return (
    <DashboardShell>
      <style>{`
        .jet-qty-input::-webkit-outer-spin-button,
        .jet-qty-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        .jet-qty-input { -moz-appearance: textfield; appearance: textfield; }
      `}</style>
      <div className="p-4 sm:p-6 md:p-10" style={{ maxWidth: '820px' }}>
        {/* En-tête */}
        <div className="mb-6 flex items-center gap-3">
          <div style={{ width: '46px', height: '46px', borderRadius: '13px', background: `linear-gradient(135deg, ${BORDEAUX}, #8f3d47)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(114,47,55,0.25)' }}>
            <Ticket className="w-5 h-5" style={{ color: OR }} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl" style={{ fontWeight: 700, color: '#1a1a1a', fontFamily: "'Playfair Display', Georgia, serif" }}>Guichet</h2>
            <p style={{ fontSize: '14px', color: '#8a8478' }}>Émettre des invitations et des ventes sur place</p>
          </div>
        </div>

        {/* Bandeau mode test */}
        <div className="rounded-2xl p-4 mb-6 flex items-start gap-3" style={{ background: `linear-gradient(135deg, ${CREME}, #fdfaf2)`, border: `1px solid ${OR}` }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '9px', background: 'rgba(212,175,55,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AlertTriangle className="w-4 h-4" style={{ color: '#b8860b' }} />
          </div>
          <p style={{ fontSize: '13px', color: '#7a5c00', margin: 0, lineHeight: 1.55 }}>
            <strong>À tester d’abord :</strong> émets <strong>1 invitation gratuite</strong> à ton nom, puis vérifie
            qu’elle apparaît dans <strong>Billetweb › Participants</strong> avant l’usage réel. Chaque émission crée une <strong>vraie commande</strong>.
          </p>
        </div>

        {/* Carte formulaire */}
        <div className="rounded-3xl p-6 md:p-8" style={{ background: '#fff', border: '1px solid #ece7dd', boxShadow: '0 4px 24px rgba(26,26,26,0.04)' }}>

          {/* Section 1 : billet */}
          <div className="mb-2" style={{ fontSize: '11px', fontWeight: 700, color: BRONZE, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Le billet</div>
          <div style={{ height: '1px', background: '#f0ece3', marginBottom: '18px' }} />

          <div className="mb-5">
            <label style={labelStyle}>Concert</label>
            <Select value={eventId} onChange={setEventId} options={eventOptions} loading={loadingEvents} placeholder="— Choisir un concert —" />
            {selectedEvent && selectedEvent.multiple === '1' && (
              <p style={{ fontSize: '12px', color: BRONZE, marginTop: '7px' }}>
                ⚠️ Événement à séances multiples — à réserver aux tarifs simples.
              </p>
            )}
          </div>

          <div className="mb-5">
            <label style={labelStyle}>Tarif</label>
            <Select
              value={ticketId}
              onChange={setTicketId}
              options={ticketOptions}
              disabled={!eventId}
              loading={loadingTickets}
              placeholder={!eventId ? '— Choisis d’abord un concert —' : '— Choisir un tarif —'}
            />
          </div>

          {/* Type = segmented control */}
          <div className="mb-5">
            <label style={labelStyle}>Type d’émission</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PAY_TYPES.map((pt) => {
                const active = type === pt.value
                return (
                  <button
                    key={pt.value}
                    type="button"
                    onClick={() => setType(pt.value)}
                    className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl"
                    style={{
                      border: `1.5px solid ${active ? BORDEAUX : '#e3ddd0'}`,
                      background: active ? 'rgba(114,47,55,0.06)' : '#fff',
                      color: active ? BORDEAUX : '#8a8478',
                      cursor: 'pointer',
                      fontWeight: active ? 600 : 500,
                      fontSize: '13px',
                      transition: 'all 0.15s',
                    }}
                  >
                    <pt.icon className="w-4 h-4" />
                    {pt.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mb-5" style={{ maxWidth: '160px' }}>
            <label style={labelStyle}>Quantité</label>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex items-center justify-center"
                style={{ width: '40px', height: '44px', borderRadius: '11px', border: '1.5px solid #e3ddd0', background: '#fff', color: BORDEAUX, fontSize: '20px', fontWeight: 600, cursor: 'pointer' }}>−</button>
              <input
                type="number" min={1} max={50} value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(50, parseInt(e.target.value, 10) || 1)))}
                className="jet-qty-input"
                style={{ width: '60px', height: '44px', textAlign: 'center', borderRadius: '11px', border: '1.5px solid #e3ddd0', background: '#fff', fontSize: '16px', fontWeight: 600, color: '#1a1a1a', outline: 'none' }}
              />
              <button type="button" onClick={() => setQuantity((q) => Math.min(50, q + 1))}
                className="flex items-center justify-center"
                style={{ width: '40px', height: '44px', borderRadius: '11px', border: '1.5px solid #e3ddd0', background: '#fff', color: BORDEAUX, fontSize: '20px', fontWeight: 600, cursor: 'pointer' }}>+</button>
            </div>
          </div>

          {/* Récap montant */}
          {(!isInvitation) && selectedTicket && (
            <div className="rounded-xl p-4 mb-5 flex items-center justify-between" style={{ background: `linear-gradient(135deg, ${CREME}, #fdfaf2)`, border: '1px solid #ece0c4' }}>
              <span style={{ fontSize: '13px', color: '#8a8478' }}>{type === 'card' ? 'Montant à payer' : 'Total à encaisser'}</span>
              <span style={{ fontSize: '20px', color: BORDEAUX, fontWeight: 700 }}>
                {eur(unitPrice * quantity)}
                <span style={{ fontSize: '13px', fontWeight: 400, color: '#b0a894' }}> ({quantity} × {eur(unitPrice)})</span>
              </span>
            </div>
          )}

          {/* Section 2 : bénéficiaire */}
          <div className="mt-8 mb-2" style={{ fontSize: '11px', fontWeight: 700, color: BRONZE, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Le bénéficiaire</div>
          <div style={{ height: '1px', background: '#f0ece3', marginBottom: '18px' }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Field label="Prénom" value={firstname} onChange={setFirstname} placeholder="Jean" />
            <Field label="Nom" value={name} onChange={setName} placeholder="Dupont" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Field label="Téléphone" value={phone} onChange={setPhone} placeholder="06 12 34 56 78" />
            <Field label={needsEmail ? 'Email' : 'Email (optionnel)'} value={email} onChange={setEmail} placeholder="jean@exemple.fr" type="email" />
          </div>
          <div className="mb-5">
            <Field label="Compte Instagram (optionnel)" value={instagram} onChange={setInstagram} placeholder="@pseudo" />
          </div>

          {/* Toggle envoi email — masqué pour la carte (billet toujours envoyé par email) */}
          {type !== 'card' && (
          <button
            type="button"
            onClick={() => setShip((s) => !s)}
            className="flex items-center gap-3 w-full mb-1"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}
          >
            <div style={{
              width: '44px', height: '26px', borderRadius: '999px', flexShrink: 0,
              background: ship ? BORDEAUX : '#d8d2c6', position: 'relative', transition: 'background 0.2s',
            }}>
              <div style={{
                position: 'absolute', top: '3px', left: ship ? '21px' : '3px',
                width: '20px', height: '20px', borderRadius: '50%', background: '#fff',
                transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }} />
            </div>
            <span style={{ fontSize: '14px', color: '#333', fontWeight: 500 }}>Envoyer le billet par email</span>
          </button>
          )}
          {type !== 'card' && !ship && (
            <p style={{ fontSize: '12px', color: '#9a9488', margin: '0 0 8px 56px' }}>
              Sans envoi email, le billet reste dans Billetweb (imprimable / renvoyable de là-bas).
            </p>
          )}
          {type === 'card' && (
            <p style={{ fontSize: '12px', color: '#8a8478', margin: '0 0 8px 0' }}>
              💳 Le client scanne un QR code et paie sur son téléphone (Apple Pay / Google Pay / carte). Le billet est envoyé par email automatiquement après paiement.
            </p>
          )}

          {/* Bouton émettre */}
          <button
            onClick={emit}
            disabled={!canSubmit}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm mt-4"
            style={{
              background: canSubmit ? `linear-gradient(135deg, ${BORDEAUX}, #8f3d47)` : '#d8d2c6',
              color: '#fff', border: 'none', fontWeight: 600, fontSize: '15px',
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              boxShadow: canSubmit ? '0 8px 20px rgba(114,47,55,0.28)' : 'none',
              transition: 'all 0.15s',
            }}
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            {submitting
              ? (type === 'card' ? 'Préparation du paiement…' : 'Émission en cours…')
              : type === 'card' ? 'Générer le QR de paiement'
              : isInvitation ? 'Émettre l’invitation'
              : 'Émettre le(s) billet(s)'}
          </button>

          {/* Résultat */}
          {result && (
            <div
              className="rounded-xl p-4 mt-4 flex items-start gap-3"
              style={{ background: result.ok ? '#eef6ee' : '#fef2f2', border: `1px solid ${result.ok ? '#c3e0c3' : '#fecaca'}` }}
            >
              {result.ok
                ? <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: '#166534' }} />
                : <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: '#991b1b' }} />}
              <p style={{ fontSize: '13.5px', margin: 0, color: result.ok ? '#166534' : '#991b1b', lineHeight: 1.5 }}>
                {result.msg}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal QR code paiement carte */}
      {qrUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(26,26,26,0.55)' }}
          onClick={closeQr}
        >
          <div
            className="rounded-3xl p-6 md:p-8 text-center"
            style={{ background: '#fff', maxWidth: '420px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {payStatus === 'paid' ? (
              issued ? (
                <>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#eef6ee', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <CheckCircle2 className="w-8 h-8" style={{ color: '#166534' }} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#166534', marginBottom: '8px' }}>Billet envoyé !</h3>
                  <p style={{ fontSize: '14px', color: '#555', marginBottom: '20px', lineHeight: 1.5 }}>
                    Le billet a été créé dans Billetweb et envoyé à <strong>{firstname} {name}</strong> par email.
                  </p>
                  <button onClick={closeQr} className="w-full py-3 rounded-xl" style={{ background: BORDEAUX, color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                    Nouvelle vente
                  </button>
                </>
              ) : (
                <>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#eef6ee', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <CheckCircle2 className="w-8 h-8" style={{ color: '#166534' }} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#166534', marginBottom: '8px' }}>Paiement reçu ✓</h3>
                  <p style={{ fontSize: '14px', color: '#555', marginBottom: '20px', lineHeight: 1.5 }}>
                    Le paiement de <strong>{eur(unitPrice * quantity)}</strong> est confirmé. Clique pour générer le billet et l’envoyer à <strong>{firstname} {name}</strong>.
                  </p>
                  <button
                    onClick={issueTicket}
                    disabled={issuing}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl mb-3"
                    style={{ background: `linear-gradient(135deg, ${BORDEAUX}, #8f3d47)`, color: '#fff', border: 'none', fontWeight: 600, fontSize: '15px', cursor: issuing ? 'wait' : 'pointer', boxShadow: '0 8px 20px rgba(114,47,55,0.28)' }}
                  >
                    {issuing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Ticket className="w-5 h-5" />}
                    {issuing ? 'Génération du billet…' : 'Générer et envoyer le billet'}
                  </button>
                  {result && !result.ok && (
                    <p style={{ fontSize: '12px', color: '#991b1b', margin: '0 0 8px' }}>{result.msg}</p>
                  )}
                  <button onClick={closeQr} className="w-full py-2 rounded-xl" style={{ background: 'transparent', color: '#8a8478', border: '1px solid #e3ddd0', fontWeight: 500, cursor: 'pointer' }}>
                    Fermer
                  </button>
                </>
              )
            ) : payStatus === 'expired' ? (
              <>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <AlertTriangle className="w-8 h-8" style={{ color: '#991b1b' }} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#991b1b', marginBottom: '8px' }}>Session expirée</h3>
                <p style={{ fontSize: '14px', color: '#555', marginBottom: '20px' }}>Le client n’a pas payé à temps. Recommence.</p>
                <button onClick={closeQr} className="w-full py-3 rounded-xl" style={{ background: BORDEAUX, color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                  Fermer
                </button>
              </>
            ) : (
              <>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a1a', marginBottom: '4px' }}>Scannez pour payer</h3>
                <p style={{ fontSize: '14px', color: '#8a8478', marginBottom: '20px' }}>
                  {eur(unitPrice * quantity)} — {selectedTicket?.name}
                </p>
                <div style={{ background: '#fff', padding: '12px', borderRadius: '16px', border: '2px solid #f0ece3', display: 'inline-block', marginBottom: '20px' }}>
                  {/* QR généré via api.qrserver.com (aucune dépendance à installer) */}
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(qrUrl)}`}
                    width={240}
                    height={240}
                    alt="QR code de paiement"
                    style={{ display: 'block' }}
                  />
                </div>
                <div className="flex items-center justify-center gap-2 mb-4" style={{ color: '#8a8478' }}>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span style={{ fontSize: '13px' }}>En attente du paiement…</span>
                </div>
                <p style={{ fontSize: '12px', color: '#b0a894', marginBottom: '16px', lineHeight: 1.5 }}>
                  Le client scanne avec l’appareil photo de son téléphone et paie (Apple Pay, Google Pay ou carte).
                </p>
                <a href={qrUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: BORDEAUX, textDecoration: 'underline', display: 'block', marginBottom: '12px' }}>
                  Ou ouvrir la page de paiement ici
                </a>
                <button onClick={closeQr} className="w-full py-2.5 rounded-xl" style={{ background: 'transparent', color: '#8a8478', border: '1px solid #e3ddd0', fontWeight: 500, cursor: 'pointer' }}>
                  Annuler
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </DashboardShell>
  )
}

// Champ texte réutilisable avec focus bordeaux
function Field({
  label, value, onChange, placeholder, type = 'text',
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  const [focus, setFocus] = useState(false)
  return (
    <div>
      <label style={{ fontSize: '12px', color: '#8a8478', display: 'block', marginBottom: '7px', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: '100%', padding: '11px 14px', borderRadius: '12px',
          border: `1.5px solid ${focus ? '#722f37' : '#e3ddd0'}`,
          background: '#fff', fontSize: '14px', color: '#1a1a1a', outline: 'none',
          boxShadow: focus ? '0 0 0 3px rgba(114,47,55,0.08)' : 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
      />
    </div>
  )
}
