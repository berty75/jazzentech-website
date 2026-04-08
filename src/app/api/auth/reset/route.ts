import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const SECRET = new TextEncoder().encode(process.env.ADMIN_SECRET || 'jazz-en-tech-secret-change-me')

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  const adminEmail = process.env.ADMIN_EMAIL

  if (email !== adminEmail) {
    // On ne révèle pas si l'email existe ou non
    return NextResponse.json({ ok: true })
  }

  const token = await new SignJWT({ email, type: 'reset' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(SECRET)

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin
  const resetUrl = `${baseUrl}/dashboard/login/reset?token=${token}`

  await resend.emails.send({
    from: 'Jazz en Tech <noreply@jazzentech.com>',
    to: email,
    subject: 'Réinitialisation mot de passe - Jazz en Tech',
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 2rem;">
        <h2 style="color: #722f37;">Jazz en Tech — Dashboard</h2>
        <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
        <p>Cliquez sur le lien ci-dessous (valable 1 heure) :</p>
        <a href="${resetUrl}" style="display: inline-block; background: #722f37; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 16px 0;">
          Changer mon mot de passe
        </a>
        <p style="color: #999; font-size: 13px;">Si vous n'avez pas fait cette demande, ignorez cet email.</p>
      </div>
    `,
  })

  return NextResponse.json({ ok: true })
}