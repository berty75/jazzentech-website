// PATH: src/lib/mailer.ts
// Envoi d'emails (Brevo en primaire, Resend en secours) — même logique que le webhook Stripe.

const BREVO_API_KEY = process.env.BREVO_API_KEY
const RESEND_API_KEY = process.env.RESEND_API_KEY

export const ADMIN_EMAIL = 'contactjazzentech@gmail.com'

export async function sendEmail(to: string, subject: string, html: string) {
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
      if (res.ok) return
    } catch { /* on tente Resend */ }
  }
  if (RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(RESEND_API_KEY)
      await resend.emails.send({ from: 'Jazz en Tech <noreply@jazzentech.com>', to, subject, html })
    } catch { /* silencieux */ }
  }
}

export function emailTemplate(content: string) {
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
