// PATH: src/app/api/cerfa/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { createHash } from 'crypto'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../../../convex/_generated/api'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
const BREVO_API_KEY = process.env.BREVO_API_KEY
const RESEND_API_KEY = process.env.RESEND_API_KEY

function generateHash(donation: any): string {
  const data = `${donation._id}|${donation.amountEur}|${donation.email}|${donation.firstName} ${donation.lastName}|${donation.createdAt}|jazzentech-cerfa-2026`
  return createHash('sha256').update(data).digest('hex').slice(0, 16).toUpperCase()
}

function numberToWords(n: number): string {
  const units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf']
  const tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt']
  if (n === 0) return 'zero'
  if (n < 20) return units[n]
  if (n < 100) {
    const t = Math.floor(n / 10), u = n % 10
    if (t === 7 || t === 9) return tens[t] + '-' + units[10 + u]
    if (u === 0) return tens[t] + (t === 8 ? 's' : '')
    if (u === 1 && t !== 8) return tens[t] + ' et un'
    return tens[t] + '-' + units[u]
  }
  if (n < 1000) {
    const h = Math.floor(n / 100), r = n % 100
    const p = h === 1 ? 'cent' : units[h] + ' cent'
    return r === 0 ? p + (h > 1 ? 's' : '') : p + ' ' + numberToWords(r)
  }
  if (n < 10000) {
    const t = Math.floor(n / 1000), r = n % 1000
    const p = t === 1 ? 'mille' : numberToWords(t) + ' mille'
    return r === 0 ? p : p + ' ' + numberToWords(r)
  }
  return String(n)
}

async function generateCerfaPdf(donation: any, hash: string, signatureDataUrl?: string | null): Promise<Uint8Array> {
  const doc = await PDFDocument.create()
  const page = doc.addPage([595, 842])
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold)
  const fontItalic = await doc.embedFont(StandardFonts.HelveticaOblique)
  const { width, height } = page.getSize()

  // --- Palette sobre (charte Jazz en Tech, usage minimal) ---
  const burg = rgb(114 / 255, 47 / 255, 55 / 255)
  const gold = rgb(212 / 255, 175 / 255, 55 / 255)
  const ink = rgb(0.10, 0.10, 0.10)      // texte principal
  const muted = rgb(0.48, 0.47, 0.45)    // libellés
  const hair = rgb(0.87, 0.86, 0.84)     // filets
  const green = rgb(0.13, 0.50, 0.28)

  const date = new Date(donation.createdAt)
  const dateStr = date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
  const numCerfa = `JET-${date.getFullYear()}-${hash.slice(-6)}`
  const fullName = `${donation.firstName} ${donation.lastName}`.trim() || 'Anonyme'
  const amount = donation.amountEur

  // --- Grille ---
  const M = 56                 // marge
  const COL = width - M * 2    // largeur utile
  const LABEL_X = M            // colonne libellés
  const VALUE_X = M + 150      // colonne valeurs
  let y = height - M

  const rule = (yy: number, color = hair, h = 0.5, x = M, w = COL) =>
    page.drawRectangle({ x, y: yy, width: w, height: h, color })

  // ============ EN-TÊTE ============
  page.drawText('REÇU FISCAL', { x: M, y, size: 9, font: fontBold, color: gold })
  y -= 26
  page.drawText('Reçu au titre des dons', { x: M, y, size: 21, font: fontBold, color: ink })
  y -= 17
  page.drawText("à des organismes d'intérêt général", { x: M, y, size: 12, font, color: muted })

  // Bloc identifiant, aligné à droite
  const idLabel = 'N° DE REÇU'
  page.drawText(idLabel, { x: width - M - fontBold.widthOfTextAtSize(idLabel, 7), y: height - M, size: 7, font: fontBold, color: muted })
  page.drawText(numCerfa, { x: width - M - fontBold.widthOfTextAtSize(numCerfa, 11), y: height - M - 15, size: 11, font: fontBold, color: burg })
  page.drawText(dateStr, { x: width - M - font.widthOfTextAtSize(dateStr, 8.5), y: height - M - 30, size: 8.5, font, color: muted })

  y -= 20
  rule(y, gold, 1.5)
  y -= 10
  page.drawText('Articles 200, 238 bis et 978 du Code Général des Impôts', { x: M, y: y - 4, size: 7.5, font: fontItalic, color: muted })
  y -= 34

  // --- Helpers de section ---
  const section = (num: string, title: string) => {
    page.drawText(num, { x: M, y, size: 8, font: fontBold, color: gold })
    page.drawText(title.toUpperCase(), { x: M + 22, y, size: 8, font: fontBold, color: burg })
    y -= 8
    rule(y)
    y -= 16
  }

  const field = (label: string, value: string) => {
    page.drawText(label, { x: LABEL_X, y, size: 8.5, font, color: muted })
    page.drawText(value, { x: VALUE_X, y, size: 9, font: fontBold, color: ink })
    y -= 15
  }

  // ============ 01 — ORGANISME ============
  section('01', 'Organisme bénéficiaire')
  field('Nom', 'Association Jazz en Tech (loi 1901)')
  field('Objet', 'Promotion et diffusion du jazz')
  field('Adresse', '10 rue Companyo, 66400 Céret')
  field('SIRET', '838 417 012 00013 — APE 9499Z')
  field('RNA', 'W662007356')
  field('Création', '23 janvier 2018 — JO du 3 février 2018')
  y -= 8

  // ============ 02 — DONATEUR ============
  section('02', 'Donateur')
  const addrStr = [donation.address, `${donation.postalCode || ''} ${donation.city || ''}`.trim(), donation.country]
    .filter(Boolean).join(', ') || 'Non renseignée'
  field('Nom complet', fullName)
  field('Email', donation.email || 'Non renseigné')
  field('Téléphone', donation.phone || 'Non renseigné')
  field('Adresse', addrStr.length > 58 ? addrStr.slice(0, 58) + '...' : addrStr)
  y -= 8

  // ============ 03 — VERSEMENT ============
  section('03', 'Versement')
  const pmLabels: Record<string, string> = { card: 'Carte bancaire', sepa_debit: 'Prélèvement SEPA', customer_balance: 'Virement bancaire' }
  field('Date', dateStr)
  field('Mode', pmLabels[donation.paymentMethod || ''] || donation.paymentMethod || 'En ligne')
  field('Nature', "Numéraire (somme d'argent)")
  y -= 12

  // ============ MONTANT — le chiffre-clé ============
  rule(y + 8, hair, 0.5)
  y -= 6
  page.drawText('MONTANT DU DON', { x: M, y, size: 7.5, font: fontBold, color: muted })
  const wordsText = `Soit ${numberToWords(amount)} euros`
  page.drawText(wordsText, { x: width - M - fontItalic.widthOfTextAtSize(wordsText, 9), y, size: 9, font: fontItalic, color: muted })
  y -= 34
  page.drawText(`${amount} €`, { x: M, y, size: 34, font: fontBold, color: burg })

  const deduction = Math.round(amount * 0.66)
  const coutReel = amount - deduction
  const dLabel = 'Déduction fiscale (66 %)'
  const cLabel = 'Coût réel après déduction'
  page.drawText(dLabel, { x: width - M - 180, y: y + 20, size: 8, font, color: muted })
  const dVal = `${deduction} €`
  page.drawText(dVal, { x: width - M - fontBold.widthOfTextAtSize(dVal, 10), y: y + 20, size: 10, font: fontBold, color: green })
  page.drawText(cLabel, { x: width - M - 180, y: y + 4, size: 8, font, color: muted })
  const cVal = `${coutReel} €`
  page.drawText(cVal, { x: width - M - fontBold.widthOfTextAtSize(cVal, 10), y: y + 4, size: 10, font: fontBold, color: ink })

  y -= 12
  rule(y, hair, 0.5)
  y -= 24

  // ============ 04 — ATTESTATION ============
  section('04', 'Attestation sur l\'honneur')
  const attestLines = [
    "Le bénéficiaire certifie sur l'honneur que les dons et versements qu'il reçoit",
    "ouvrent droit à la réduction d'impôt prévue à l'article 200 du CGI.",
  ]
  for (const line of attestLines) {
    page.drawText(line, { x: M, y, size: 9, font, color: ink })
    y -= 14
  }
  y -= 6
  const bullets = [
    "L'organisme est une association loi 1901 reconnue d'intérêt général, à caractère culturel",
    "(art. 200 et 238 bis du CGI).",
    "Le donateur renonce expressément et définitivement à tout droit de reprise des sommes",
    "versées.",
  ]
  for (let i = 0; i < bullets.length; i++) {
    const isFirst = i === 0 || i === 2
    if (isFirst) page.drawRectangle({ x: M, y: y + 2.5, width: 3, height: 3, color: gold })
    page.drawText(bullets[i], { x: M + 12, y, size: 8.5, font, color: isFirst ? ink : muted })
    y -= 13
  }

  // ============ SIGNATURE — ancrée au bas de page ============
  const SIG_BOTTOM = 100            // ancrage fixe au-dessus du footer (jamais de chevauchement)
  const SIG_W = 200
  const SIG_X = width - M - SIG_W

  let sy = SIG_BOTTOM + 78
  page.drawText("Le Président de l'association", { x: SIG_X, y: sy, size: 8, font: fontItalic, color: muted })
  sy -= 8

  if (signatureDataUrl && signatureDataUrl.startsWith('data:image/png;base64,')) {
    try {
      const sigImage = await doc.embedPng(Buffer.from(signatureDataUrl.split(',')[1], 'base64'))
      const maxH = 40
      const scale = Math.min(SIG_W / sigImage.width, maxH / sigImage.height)
      const sw = sigImage.width * scale
      const sh = sigImage.height * scale
      page.drawImage(sigImage, { x: SIG_X, y: SIG_BOTTOM + 30, width: sw, height: sh })
    } catch (err) {
      console.error('[cerfa] signature non integree:', err)
    }
  }

  rule(SIG_BOTTOM + 24, hair, 0.5, SIG_X, SIG_W)
  page.drawText('Alain Brunet', { x: SIG_X, y: SIG_BOTTOM + 10, size: 11, font: fontBold, color: ink })
  page.drawText(`Fait à Céret, le ${dateStr}`, { x: SIG_X, y: SIG_BOTTOM - 2, size: 7.5, font, color: muted })

  // ============ PIED DE PAGE ============
  rule(72, hair, 0.5)
  page.drawText("Certificat d'authenticité", { x: M, y: 58, size: 7, font: fontBold, color: muted })
  page.drawText(hash, { x: M, y: 46, size: 8, font: fontBold, color: burg })
  page.drawText(`jazzentech.com/cerfa/verify?h=${hash}`, { x: M, y: 34, size: 6.5, font, color: muted })

  const f1 = 'Association Jazz en Tech'
  const f2 = 'SIRET 838 417 012 00013'
  const f3 = '10 rue Companyo, 66400 Céret'
  page.drawText(f1, { x: width - M - fontBold.widthOfTextAtSize(f1, 7), y: 58, size: 7, font: fontBold, color: muted })
  page.drawText(f2, { x: width - M - font.widthOfTextAtSize(f2, 6.5), y: 46, size: 6.5, font, color: muted })
  page.drawText(f3, { x: width - M - font.widthOfTextAtSize(f3, 6.5), y: 34, size: 6.5, font, color: muted })

  return await doc.save()
}

async function sendCerfaEmail(donation: any, pdfBytes: Uint8Array, hash: string) {
  const fullName = `${donation.firstName} ${donation.lastName}`.trim() || 'donateur'
  const amount = donation.amountEur
  const deduction = Math.round(amount * 0.66)
  const coutReel = Math.round(amount * 0.34)

  const html = `<!DOCTYPE html>
<html><body style="font-family:Arial,sans-serif;margin:0;padding:0;background:#f5f3ef;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px;">
<table width="600" style="max-width:600px;">
<tr><td style="background:linear-gradient(135deg,#722f37,#b87333,#d4af37);padding:32px 24px;text-align:center;border-radius:12px 12px 0 0;">
<h1 style="color:#fff;margin:0;font-size:22px;font-family:Georgia,serif;">Jazz en Tech 2026</h1>
<p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:13px;">Recu fiscal</p>
</td></tr>
<tr><td style="background:#fff;padding:32px 28px;border:1px solid #e5e2dc;border-top:none;border-radius:0 0 12px 12px;">
<p style="font-size:15px;color:#333;">Cher(e) ${fullName},</p>
<p style="font-size:15px;color:#333;line-height:1.7;">Merci pour votre don de <strong>${amount} EUR</strong>. Voici votre <strong>recu fiscal (Cerfa)</strong>.</p>
<table style="margin:20px 0;background:#fafaf8;border:1px solid #e5e2dc;border-radius:8px;width:100%;"><tr>
<td style="padding:16px 20px;text-align:center;"><span style="font-size:11px;color:#999;text-transform:uppercase;">Montant</span><br/><strong style="font-size:20px;color:#722f37;">${amount} EUR</strong></td>
<td style="padding:16px 20px;text-align:center;"><span style="font-size:11px;color:#999;text-transform:uppercase;">Deduction (66%)</span><br/><strong style="font-size:20px;color:#16a34a;">${deduction} EUR</strong></td>
<td style="padding:16px 20px;text-align:center;"><span style="font-size:11px;color:#999;text-transform:uppercase;">Cout reel</span><br/><strong style="font-size:20px;color:#333;">${coutReel} EUR</strong></td>
</tr></table>
<p style="font-size:12px;color:#999;">Certificat : ${hash}</p>
<p style="font-size:15px;color:#333;margin-top:24px;">Avec toute notre gratitude,<br/><strong>Alain Brunet</strong><br/>President de Jazz en Tech</p>
</td></tr></table></td></tr></table></body></html>`

  const pdfBase64 = Buffer.from(pdfBytes).toString('base64')

  // Try Brevo first
  if (BREVO_API_KEY) {
    try {
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'api-key': BREVO_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: { name: 'Jazz en Tech', email: 'noreply@jazzentech.com' },
          to: [{ email: donation.email }],
          subject: 'Votre recu fiscal -- Jazz en Tech 2026',
          htmlContent: html,
          attachment: [{ content: pdfBase64, name: `cerfa-jazz-en-tech-${amount}eur.pdf` }],
        }),
      })
      if (res.ok) return
    } catch {}
  }

  // Fallback Resend
  if (RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(RESEND_API_KEY)
      await resend.emails.send({
        from: 'Jazz en Tech <noreply@jazzentech.com>',
        to: donation.email,
        subject: 'Votre recu fiscal -- Jazz en Tech 2026',
        html,
        attachments: [{ filename: `cerfa-jazz-en-tech-${amount}eur.pdf`, content: pdfBase64 }],
      })
    } catch {}
  }
}

// POST: generate cerfa for a donation
export async function POST(req: NextRequest) {
  const { donationId, sendEmail } = await req.json()

  // Read donation from Convex
  let donation
  try {
    donation = await convex.query(api.donations.getDonation, { id: donationId })
  } catch (err: any) {
    return NextResponse.json({ error: 'Erreur Convex: ' + err.message }, { status: 500 })
  }

  if (!donation) return NextResponse.json({ error: 'Don non trouvé' }, { status: 404 })

  const hash = generateHash(donation)
  const signature = await convex.query(api.settings.get, { key: 'president_signature' }).catch(() => null)
  const pdfBytes = await generateCerfaPdf(donation, hash, signature)

  // Mark as generated in Convex
  try {
    await convex.mutation(api.donations.markCerfaGenerated, {
      donationId: donation._id,
      cerfaHash: hash,
    })
  } catch (err: any) {
    console.error('Convex mutation error:', err.message)
  }

  // Send email if requested
  if (sendEmail && donation.email) {
    try {
      await sendCerfaEmail(donation, pdfBytes, hash)
    } catch (e: any) {
      console.error('Email error:', e.message)
    }
  }

  return NextResponse.json({ ok: true, hash })
}

// GET: download a cerfa PDF (regenerated on-the-fly)
export async function GET(req: NextRequest) {
  const hash = req.nextUrl.searchParams.get('hash')
  if (!hash) return NextResponse.json({ error: 'Hash manquant' }, { status: 400 })

  // Find donation by hash in Convex
  let donations
  try {
    donations = await convex.query(api.donations.listDonations, {})
  } catch {
    return NextResponse.json({ error: 'Erreur Convex' }, { status: 500 })
  }

  const donation = donations.find((d: any) => d.cerfaHash === hash)
  if (!donation) return NextResponse.json({ error: 'Cerfa non trouvé' }, { status: 404 })

  // Regenerate PDF on-the-fly (deterministic)
  const signature = await convex.query(api.settings.get, { key: 'president_signature' }).catch(() => null)
  const pdfBytes = await generateCerfaPdf(donation, hash, signature)

  return new NextResponse(pdfBytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="cerfa-${hash}.pdf"`,
    },
  })
}