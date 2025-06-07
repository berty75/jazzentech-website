import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 API appelée')
    
    const { name, email, subject, message } = await request.json()
    
    console.log('📧 Données:', { name, email, subject, message })
    console.log('🔑 API Key:', process.env.RESEND_API_KEY ? 'OK' : 'MANQUANTE')
    console.log('📨 Email destinataire:', process.env.CONTACT_EMAIL)
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }
    
    // Envoi de l'email avec Resend
    console.log('📤 Tentative d\'envoi email...')
    
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',     // ← Email de test Resend
      to: [process.env.CONTACT_EMAIL!],
      subject: `[Contact Jazz en Tech] ${subject}`,
      html: `
        <h2>🎷 Nouveau message de contact - Jazz en Tech</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <hr>
        <p><small>Message envoyé depuis le formulaire de contact de jazzentech.com</small></p>
      `,
    })

    if (error) {
      console.error('❌ Erreur Resend:', error)
      return NextResponse.json({ 
        error: 'Erreur envoi email',
        details: error.message 
      }, { status: 500 })
    }

    console.log('✅ Email envoyé avec succès!', data)
    return NextResponse.json({ 
      success: true,
      message: 'Email envoyé avec succès!'
    })
    
  } catch (error) {
    console.error('❌ Erreur API:', error)
    return NextResponse.json({ 
      error: 'Erreur serveur',
      details: error.message 
    }, { status: 500 })
  }
}