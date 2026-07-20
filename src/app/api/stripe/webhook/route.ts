// PATH: src/app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../../../../convex/_generated/api'
import { createBilletwebMultiOrder, CartLine } from '@/lib/billetweb'

// Le traitement guichet attend quelques secondes puis appelle Billetweb et Brevo :
// sans cette ligne, Vercel coupe la fonction à 10 s et Stripe rejoue l'événement.
export const maxDuration = 60

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
const BREVO_API_KEY = process.env.BREVO_API_KEY
const RESEND_API_KEY = process.env.RESEND_API_KEY
const ADMIN_EMAIL = 'contactjazzentech@gmail.com'

async function sendEmail(to: string, subject: string, html: string) {
  if (BREVO_API_KEY) {
    try {
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'api-key': BREVO_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: { name: 'Jazz en Tech', email: 'noreply@jazzentech.com' },
          to: [{ email: to }],
          subject,
          htmlContent: html,
        }),
      })
      if (res.ok) { console.log(`Email sent via Brevo to ${to}`); return }
    } catch {}
  }
  if (RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(RESEND_API_KEY)
      await resend.emails.send({ from: 'Jazz en Tech <noreply@jazzentech.com>', to, subject, html })
      console.log(`Email sent via Resend to ${to}`)
    } catch {}
  }
}

function emailTemplate(content: string) {
  return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f5f3ef;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px;">
<table width="600" style="max-width:600px;">
<tr><td style="background:linear-gradient(135deg,#722f37,#b87333,#d4af37);padding:32px 24px;text-align:center;border-radius:12px 12px 0 0;">
<img src="https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_120/jazz_en_tech_logo_smkogd.png" width="60" height="60" alt="Jazz en Tech" style="display:block;margin:0 auto 12px;" />
<h1 style="color:#fff;margin:0;font-size:22px;font-family:Georgia,serif;">Jazz en Tech 2026</h1>
</td></tr>
<tr><td style="background:#fff;padding:32px 28px;border:1px solid #e5e2dc;border-top:none;border-radius:0 0 12px 12px;font-size:15px;line-height:1.7;color:#333;">
${content}
</td></tr>
<tr><td style="padding:16px;text-align:center;">
<p style="color:#999;font-size:12px;">Association Jazz en Tech - Ceret (66) - <a href="https://jazzentech.com" style="color:#722f37;">jazzentech.com</a></p>
</td></tr></table></td></tr></table></body></html>`
}

function getPalier(amountEur: number): string {
  if (amountEur >= 1000) return 'grand-mecene'
  if (amountEur >= 500) return 'mecene'
  if (amountEur >= 200) return 'passionne'
  if (amountEur >= 50) return 'soutien'
  return 'fan'
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // NB: les billets guichet (type='guichet') sont créés par /api/stripe/guichet-confirm
    // (bouton « Générer le billet » côté tablette), PAS ici. On ignore donc ce type au webhook
    // pour éviter tout doublon.
    // ---- GUICHET ----
    // Deux cas :
    //  · Le client paie DEVANT toi (QR code) → tu cliques « Générer les billets »
    //    au retour, et guichet-confirm s'en charge. Le webhook ne fait rien.
    //  · Le client paie À DISTANCE (lien envoyé par email/SMS) → tu ne verras
    //    jamais le retour navigateur. C'est le webhook qui DOIT créer les billets.
    //
    // Le champ metadata.remote distingue les deux.
    if (session.metadata?.type === 'guichet') {
      // Petit délai : laisse la main à guichet-confirm si l'admin est devant l'écran.
      // Au-delà, on considère qu'il n'y est pas (paiement à distance) et on crée.
      await new Promise((r) => setTimeout(r, 5000))

      // Verrou atomique. La metadata Stripe ne suffit pas : lire puis écrire laisse
      // une fenêtre où le webhook et guichet-confirm créent tous deux les billets.
      // Convex exécute ses mutations en transaction sérialisable : un seul appelant
      // obtient le verrou, quel que soit l'ordre d'arrivée.
      const lockKey = `lock:guichet:${session.id}`
      let acquired = false
      try {
        const claim = await convex.mutation(api.settings.claim, { key: lockKey })
        acquired = !!claim?.acquired
      } catch (e) {
        console.error('[webhook guichet] verrou Convex indisponible', e)
        // Convex injoignable : on retombe sur la metadata Stripe, moins sûre mais
        // meilleure que rien.
        const fresh = await stripe.checkout.sessions.retrieve(session.id)
        acquired = fresh.metadata?.tickets_created !== '1'
      }
      if (!acquired) {
        return NextResponse.json({ received: true, alreadyDone: true })
      }

      try {
        const eventId = session.metadata.eventId
        const compact = JSON.parse(session.metadata.lines || '[]') as any[]
        // ⚠️ Le champ attendu par CartLine est `price`, pas `forcedPrice` :
        // mal nommé, il était ignoré et le billet repartait au tarif catalogue.
        const lines: CartLine[] = compact.map((c) => ({
          ticketId: String(c.t),
          firstname: String(c.f || ''),
          name: String(c.n || ''),
          ...(c.p !== undefined ? { price: Number(c.p) } : {}),
        }))

        const result = await createBilletwebMultiOrder({
          eventId,
          paymentType: 'card',
          lines,
          email: session.metadata.buyerEmail || undefined,
          phone: session.metadata.phone || undefined,
          ship: true,                   // Billetweb envoie les billets au client
        })

        if (result.ok) {
          try {
            await stripe.checkout.sessions.update(session.id, {
              metadata: { ...(session.metadata || {}), tickets_created: '1' },
            })
          } catch { /* non bloquant */ }
        }

        if (!result.ok) {
          // Échec de création : on relâche le verrou pour qu'un nouvel essai
          // (rejeu Stripe ou bouton « Générer les billets ») puisse aboutir.
          try { await convex.mutation(api.settings.release, { key: lockKey }) } catch {}

          await sendEmail(
            ADMIN_EMAIL,
            '🚨 URGENT — Paiement reçu mais billets NON créés',
            emailTemplate(`
              <h2 style="color:#991b1b;">Lien de paiement réglé, billets non créés</h2>
              <p>Un client a payé via un lien envoyé depuis le guichet, mais la création
              Billetweb a échoué. <strong>Il faut créer ses billets à la main.</strong></p>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:6px 0;color:#999;width:130px;">Email client</td><td style="padding:6px 0;font-weight:600;">${session.metadata.buyerEmail || '—'}</td></tr>
                <tr><td style="padding:6px 0;color:#999;">Montant</td><td style="padding:6px 0;">${((session.amount_total || 0) / 100).toFixed(2)} €</td></tr>
                <tr><td style="padding:6px 0;color:#999;">Session Stripe</td><td style="padding:6px 0;">${session.id}</td></tr>
                <tr><td style="padding:6px 0;color:#999;">Erreur</td><td style="padding:6px 0;color:#991b1b;">${result.error}</td></tr>
              </table>
            `)
          )
        } else {
          await sendEmail(
            ADMIN_EMAIL,
            '✅ Lien de paiement réglé — billets créés',
            emailTemplate(`
              <h2 style="color:#722f37;">Paiement à distance confirmé</h2>
              <p>Un client a réglé le lien de paiement que tu lui as envoyé.
              Ses billets ont été créés et lui ont été envoyés automatiquement.</p>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:6px 0;color:#999;width:130px;">Client</td><td style="padding:6px 0;font-weight:600;">${session.metadata.buyerEmail || '—'}</td></tr>
                <tr><td style="padding:6px 0;color:#999;">Billets</td><td style="padding:6px 0;font-weight:600;">${lines.length}</td></tr>
                <tr><td style="padding:6px 0;color:#999;">Montant</td><td style="padding:6px 0;font-weight:600;">${((session.amount_total || 0) / 100).toFixed(2)} €</td></tr>
              </table>
            `)
          )
        }
      } catch (e: any) {
        console.error('[webhook guichet distant]', e)
        try { await convex.mutation(api.settings.release, { key: lockKey }) } catch {}
      }
      return NextResponse.json({ received: true })
    }


    if (session.metadata?.type === 'donation') {
      const customFields = (session as any).custom_fields || []
      const prenom = customFields.find((f: any) => f.key === 'prenom')?.text?.value || ''
      const nom = customFields.find((f: any) => f.key === 'nom')?.text?.value || ''
      const amountCents = session.amount_total || 0
      const amountEur = amountCents / 100
      const donorEmail = session.customer_details?.email || session.customer_email || ''
      const donorName = `${prenom} ${nom}`.trim() || 'Anonyme'

      let paymentMethodType = 'unknown'
      try {
        if (session.payment_intent) {
          const pi = await stripe.paymentIntents.retrieve(session.payment_intent as string)
          const pm = await stripe.paymentMethods.retrieve(pi.payment_method as string)
          paymentMethodType = pm.type || 'unknown'
        }
      } catch {}

      const addr = session.customer_details?.address

      // Sauvegarder dans Convex
      try {
        await convex.mutation(api.donations.createDonation, {
          firstName: prenom || 'Anonyme',
          lastName: nom || '',
          email: donorEmail,
          phone: session.customer_details?.phone || undefined,
          address: addr ? [addr.line1, addr.line2].filter(Boolean).join(', ') : undefined,
          city: addr?.city || undefined,
          postalCode: addr?.postal_code || undefined,
          country: addr?.country || undefined,
          amount: amountCents,
          amountEur,
          palier: getPalier(amountEur),
          stripePaymentId: session.id,
          stripeStatus: 'succeeded',
          paymentMethod: paymentMethodType,
          displayName: true,
        })
        console.log(`Donation saved to Convex: ${amountEur}€ from ${donorName}`)
      } catch (err: any) {
        console.error('Convex save error:', err.message)
      }

      // 1. Email de remerciement au donateur
      if (donorEmail) {
        const deduction = Math.round(amountEur * 0.66)
        const coutReel = Math.round(amountEur * 0.34)
        await sendEmail(
          donorEmail,
          'Merci pour votre don ! - Jazz en Tech 2026',
          emailTemplate(`
            <p>Cher(e) ${donorName},</p>
            <p>Un immense <strong>merci</strong> pour votre don de <strong>${amountEur} EUR</strong> au profit du festival Jazz en Tech !</p>
            <p>Votre generosite est precieuse. Grace a vous, la 11eme edition du festival pourra voir le jour a Ceret et Saint-Genis-des-Fontaines cet ete.</p>
            <table style="margin:20px 0;background:#fafaf8;border:1px solid #e5e2dc;border-radius:8px;width:100%;"><tr>
            <td style="padding:16px 20px;text-align:center;"><span style="font-size:11px;color:#999;text-transform:uppercase;">Votre don</span><br/><strong style="font-size:22px;color:#722f37;">${amountEur} EUR</strong></td>
            <td style="padding:16px 20px;text-align:center;"><span style="font-size:11px;color:#999;text-transform:uppercase;">Deduction fiscale (66%)</span><br/><strong style="font-size:22px;color:#16a34a;">${deduction} EUR</strong></td>
            <td style="padding:16px 20px;text-align:center;"><span style="font-size:11px;color:#999;text-transform:uppercase;">Cout reel</span><br/><strong style="font-size:22px;color:#333;">${coutReel} EUR</strong></td>
            </tr></table>
            <p>Votre <strong>recu fiscal (Cerfa)</strong> vous sera envoye prochainement par email, vous permettant de deduire 66% de votre don de vos impots.</p>
            <p>Musicalement,<br/><strong>Alain Brunet</strong><br/>President de Jazz en Tech</p>
          `)
        )
      }

      // 2. Notification admin
      const pmLabel = paymentMethodType === 'card' ? 'Carte bancaire' : paymentMethodType === 'sepa_debit' ? 'SEPA' : paymentMethodType
      await sendEmail(
        ADMIN_EMAIL,
        `Nouveau don de ${amountEur} EUR - ${donorName}`,
        emailTemplate(`
          <h2 style="color:#722f37;margin:0 0 16px;">Nouveau don recu !</h2>
          <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#999;font-size:13px;width:120px;">Donateur</td><td style="padding:8px 0;font-weight:600;">${donorName}</td></tr>
          <tr><td style="padding:8px 0;color:#999;font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${donorEmail}" style="color:#722f37;">${donorEmail}</a></td></tr>
          <tr><td style="padding:8px 0;color:#999;font-size:13px;">Telephone</td><td style="padding:8px 0;">${session.customer_details?.phone || 'Non renseigne'}</td></tr>
          <tr><td style="padding:8px 0;color:#999;font-size:13px;">Montant</td><td style="padding:8px 0;font-weight:700;font-size:20px;color:#16a34a;">${amountEur} EUR</td></tr>
          <tr><td style="padding:8px 0;color:#999;font-size:13px;">Paiement</td><td style="padding:8px 0;">${pmLabel}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#f0fdf4;border-radius:8px;text-align:center;">
            <a href="https://jazzentech.com/dashboard/dons" style="color:#722f37;font-weight:600;text-decoration:none;">Voir dans le dashboard &rarr;</a>
          </div>
        `)
      )
    }
  }

  return NextResponse.json({ received: true })
}