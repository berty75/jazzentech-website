// PATH: src/app/api/newsletter/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const BREVO_API_KEY = process.env.BREVO_API_KEY
const resend = new Resend(process.env.RESEND_API_KEY)

function wrapInEmailTemplate(content: string): string {
  // Ajouter des styles inline aux listes pour compatibilité email
  const styledContent = content
    .replace(/<ul>/g, '<ul style="padding-left:24px;margin:12px 0;list-style-type:disc;">')
    .replace(/<ol>/g, '<ol style="padding-left:24px;margin:12px 0;list-style-type:decimal;">')
    .replace(/<li>/g, '<li style="margin-bottom:6px;">')
    .replace(/<h2>/g, '<h2 style="font-size:20px;font-weight:700;margin:16px 0 8px;color:#1a1a1a;">')
    .replace(/<img /g, '<img style="max-width:100%;border-radius:8px;display:block;margin:12px 0;" ')

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f5f3ef;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f3ef;">
    <tr><td align="center" style="padding:24px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:linear-gradient(135deg,#722f37,#b87333,#d4af37);padding:32px 24px;text-align:center;border-radius:12px 12px 0 0;">
          <img src="https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_120/jazz_en_tech_logo_smkogd.png" width="60" height="60" alt="Jazz en Tech" style="display:block;margin:0 auto 12px;" />
          <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;font-family:Georgia,serif;">Jazz en Tech 2026</h1>
          <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">11ème édition — Céret &amp; Saint-Génis-des-Fontaines</p>
        </td></tr>
        <tr><td style="background-color:#ffffff;padding:32px 28px;border-left:1px solid #e5e2dc;border-right:1px solid #e5e2dc;border-bottom:1px solid #e5e2dc;border-radius:0 0 12px 12px;font-size:15px;line-height:1.7;color:#333333;">
          ${styledContent}
        </td></tr>
        <tr><td style="padding:24px 16px;text-align:center;">
          <p style="color:#999999;font-size:12px;margin:0;">Association Jazz en Tech — Céret (66)</p>
          <p style="margin:4px 0 0;"><a href="https://jazzentech.com" style="color:#722f37;font-size:12px;text-decoration:none;">jazzentech.com</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

async function sendWithBrevo(email: string, subject: string, htmlContent: string): Promise<{ ok: boolean }> {
  if (!BREVO_API_KEY) return { ok: false }
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': BREVO_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender: { name: 'Jazz en Tech', email: 'noreply@jazzentech.com' },
      to: [{ email }], subject, htmlContent,
    }),
  })
  return { ok: res.ok }
}

async function sendWithResend(email: string, subject: string, html: string): Promise<{ ok: boolean }> {
  try {
    await resend.emails.send({ from: 'Jazz en Tech <noreply@jazzentech.com>', to: email, subject, html })
    return { ok: true }
  } catch { return { ok: false } }
}

export async function POST(req: NextRequest) {
  const { subject, html, recipients } = await req.json()
  if (!subject || !html || !recipients?.length) return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })

  const emailHtml = wrapInEmailTemplate(html)
  const results: { email: string; status: string; via?: string; error?: string }[] = []

  for (const email of recipients) {
    const brevo = await sendWithBrevo(email, subject, emailHtml)
    if (brevo.ok) { results.push({ email, status: 'sent', via: 'brevo' }); continue }

    const fallback = await sendWithResend(email, subject, emailHtml)
    if (fallback.ok) { results.push({ email, status: 'sent', via: 'resend' }); continue }

    results.push({ email, status: 'error', error: 'Échec envoi Brevo + Resend' })
  }

  return NextResponse.json({
    sent: results.filter(r => r.status === 'sent').length,
    errors: results.filter(r => r.status === 'error').length,
    results,
  })
}