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

function drawBox(page: any, x: number, y: number, w: number, h: number, opts: { fill?: any; border?: any; borderWidth?: number } = {}) {
  if (opts.fill) page.drawRectangle({ x, y, width: w, height: h, color: opts.fill })
  if (opts.border) page.drawRectangle({ x, y, width: w, height: h, borderColor: opts.border, borderWidth: opts.borderWidth || 0.5, color: undefined })
}

async function generateCerfaPdf(donation: any, hash: string): Promise<Uint8Array> {
  const doc = await PDFDocument.create()
  const page = doc.addPage([595, 842])
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold)
  const fontItalic = await doc.embedFont(StandardFonts.HelveticaOblique)
  const { width, height } = page.getSize()

  const burg = rgb(114 / 255, 47 / 255, 55 / 255)
  const gold = rgb(212 / 255, 175 / 255, 55 / 255)
  const black = rgb(0, 0, 0)
  const gray = rgb(0.45, 0.45, 0.45)
  const lightBg = rgb(0.97, 0.96, 0.93)
  const white = rgb(1, 1, 1)
  const darkBg = rgb(0.08, 0.06, 0.05)

  const date = new Date(donation.createdAt)
  const dateStr = date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
  const numCerfa = `JET-${date.getFullYear()}-${hash.slice(-6)}`
  const fullName = `${donation.firstName} ${donation.lastName}`.trim() || 'Anonyme'
  const amount = donation.amountEur
  const margin = 45

  // === HEADER ===
  drawBox(page, 0, height - 130, width, 130, { fill: darkBg })
  drawBox(page, 0, height - 130, width, 3, { fill: gold })

  page.drawText('RECU AU TITRE DES DONS', { x: margin + 5, y: height - 45, size: 22, font: fontBold, color: white })
  page.drawText('a des organismes d\'interet general', { x: margin + 5, y: height - 68, size: 11, font, color: gold })
  page.drawText('Articles 200, 238 bis et 978 du Code General des Impots', { x: margin + 5, y: height - 85, size: 8, font: fontItalic, color: rgb(0.6, 0.6, 0.6) })

  const numW = fontBold.widthOfTextAtSize(numCerfa, 11)
  page.drawText(numCerfa, { x: width - margin - numW - 5, y: height - 50, size: 11, font: fontBold, color: gold })
  const dateW = font.widthOfTextAtSize(dateStr, 8.5)
  page.drawText(dateStr, { x: width - margin - dateW - 5, y: height - 68, size: 8.5, font, color: rgb(0.6, 0.6, 0.6) })
  page.drawText('Jazz en Tech', { x: width - margin - font.widthOfTextAtSize('Jazz en Tech', 9) - 5, y: height - 85, size: 9, font: fontBold, color: rgb(0.5, 0.5, 0.5) })

  let y = height - 165

  const drawSection = (title: string, num: string) => {
    drawBox(page, margin, y - 2, width - margin * 2, 22, { fill: burg })
    page.drawText(`  ${num}   ${title}`, { x: margin + 8, y: y + 3, size: 10, font: fontBold, color: white })
    y -= 28
  }

  const drawField = (label: string, value: string) => {
    page.drawText(label, { x: margin + 15, y, size: 8.5, font: fontBold, color: gray })
    page.drawText(value, { x: margin + 130, y, size: 8.5, font, color: black })
    y -= 16
  }

  // === SECTION 1: ORGANISME ===
  drawSection('ORGANISME BENEFICIAIRE', '01')
  drawBox(page, margin, y - 90, width - margin * 2, 95, { fill: lightBg, border: rgb(0.9, 0.88, 0.84), borderWidth: 0.5 })
  y -= 5
  drawField('Nom', 'Association Jazz en Tech (loi 1901)')
  drawField('Objet', 'Promotion et diffusion du jazz dans les Pyrenees-Orientales')
  drawField('Adresse', '10 rue Companyo, 66400 Ceret, France')
  drawField('SIRET', '838 417 012 00013 -- APE 9499Z')
  drawField('RNA', 'W662007356')
  y -= 15

  // === SECTION 2: DONATEUR ===
  drawSection('DONATEUR / DONATRICE', '02')
  const addrStr = [donation.address, `${donation.postalCode || ''} ${donation.city || ''}`.trim(), donation.country].filter(Boolean).join(', ') || 'Non renseignee'
  drawBox(page, margin, y - 75, width - margin * 2, 80, { fill: lightBg, border: rgb(0.9, 0.88, 0.84), borderWidth: 0.5 })
  y -= 5
  drawField('Nom complet', fullName)
  drawField('Email', donation.email || 'Non renseigne')
  drawField('Telephone', donation.phone || 'Non renseigne')
  drawField('Adresse', addrStr.length > 65 ? addrStr.slice(0, 65) + '...' : addrStr)
  y -= 15

  // === SECTION 3: DON ===
  drawSection('DON', '03')
  drawBox(page, margin, y - 50, width - margin * 2, 55, { fill: lightBg, border: rgb(0.9, 0.88, 0.84), borderWidth: 0.5 })
  y -= 5
  const pmLabels: Record<string, string> = { card: 'Carte bancaire', sepa_debit: 'Prelevement SEPA', customer_balance: 'Virement bancaire' }
  drawField('Date du versement', dateStr)
  drawField('Mode de versement', pmLabels[donation.paymentMethod || ''] || donation.paymentMethod || 'En ligne')
  drawField('Nature du don', 'Numeraire (somme d\'argent)')
  y -= 12

  // === MONTANT BOX ===
  drawBox(page, margin, y - 55, width - margin * 2, 60, { fill: rgb(0.96, 0.94, 0.90), border: gold, borderWidth: 1.5 })
  page.drawText('MONTANT DU DON', { x: margin + 20, y: y - 15, size: 9, font: fontBold, color: gray })
  page.drawText(`${amount} EUR`, { x: margin + 20, y: y - 38, size: 28, font: fontBold, color: burg })
  const wordsText = `Soit : ${numberToWords(amount)} euros`
  page.drawText(wordsText, { x: width - margin - fontItalic.widthOfTextAtSize(wordsText, 9) - 20, y: y - 15, size: 9, font: fontItalic, color: gray })

  const deduction = Math.round(amount * 0.66)
  const coutReel = Math.round(amount * 0.34)
  const deductionText = `Deduction fiscale (66%) : ${deduction} EUR  |  Cout reel : ${coutReel} EUR`
  page.drawText(deductionText, {
    x: width - margin - fontBold.widthOfTextAtSize(deductionText, 8) - 20,
    y: y - 38, size: 8, font: fontBold, color: rgb(0.13, 0.59, 0.13)
  })
  y -= 80

  // === SECTION 4: ATTESTATION ===
  drawSection('ATTESTATION SUR L\'HONNEUR', '04')
  const attestLines = [
    'Le beneficiaire certifie sur l\'honneur que les dons et versements qu\'il recoit ouvrent droit',
    'a la reduction d\'impot prevue a l\'article 200 du Code General des Impots.',
    '',
    '[X] L\'organisme beneficiaire est une association loi 1901 (SIRET 838 417 012 00013),',
    '     reconnue d\'interet general, a caractere culturel (art. 200 et 238 bis du CGI).',
    '',
    '[X] Le donateur renonce expressement et definitivement a tout droit de reprise',
    '     des sommes versees.',
  ]
  for (const line of attestLines) {
    if (line) page.drawText(line, { x: margin + 15, y, size: 8, font: line.startsWith('[X]') ? fontBold : font, color: black })
    y -= 12
  }
  y -= 10

  // === SIGNATURE ===
  drawBox(page, width - 250, y - 55, 210, 60, { fill: lightBg, border: rgb(0.9, 0.88, 0.84), borderWidth: 0.5 })
  page.drawText('Le President de l\'association,', { x: width - 240, y: y - 12, size: 8.5, font: fontItalic, color: gray })
  page.drawText('Alain Brunet', { x: width - 240, y: y - 28, size: 13, font: fontBold, color: black })
  page.drawText(`Fait a Ceret, le ${dateStr}`, { x: width - 240, y: y - 43, size: 7.5, font, color: gray })

  // === FOOTER ===
  drawBox(page, margin, 55, width - margin * 2, 1, { fill: gold })
  page.drawText(`Certificat d'authenticite : ${hash}`, { x: margin, y: 40, size: 7.5, font: fontBold, color: burg })
  page.drawText(`Verification en ligne : jazzentech.com/cerfa/verify?h=${hash}`, { x: margin, y: 28, size: 6.5, font, color: gray })
  const footerRight = 'Jazz en Tech | SIRET 838 417 012 00013 | 10 rue Companyo, 66400 Ceret'
  page.drawText(footerRight, { x: width - margin - font.widthOfTextAtSize(footerRight, 6.5), y: 28, size: 6.5, font, color: gray })

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
  const pdfBytes = await generateCerfaPdf(donation, hash)

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
  const pdfBytes = await generateCerfaPdf(donation, hash)

  return new NextResponse(pdfBytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="cerfa-${hash}.pdf"`,
    },
  })
}