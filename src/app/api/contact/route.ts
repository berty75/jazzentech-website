import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Fonction pour obtenir le libellé du sujet
function getSubjectLabel(subject: string): string {
  const subjects = {
    'info': 'Demande d\'informations générales',
    'benevole': 'Devenir bénévole',
    'artiste': 'Proposition artistique',
    'partenariat': 'Partenariat / Sponsoring',
    'presse': 'Demande presse / Média',
    'technique': 'Support technique',
    'autre': 'Autre demande'
  }
  return subjects[subject as keyof typeof subjects] || subject
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 API appelée')
    
    const { firstName, lastName, email, phone, subject, message } = await request.json()
    
    console.log('📧 Données:', { firstName, lastName, email, phone, subject, message })
    console.log('🔑 API Key:', process.env.RESEND_API_KEY ? 'OK' : 'MANQUANTE')
    console.log('📨 Email destinataire:', process.env.CONTACT_EMAIL)
    
    // Validation des champs obligatoires
    if (!firstName || !lastName || !email || !phone || !subject || !message) {
      console.log('❌ Champs manquants:', {
        firstName: !!firstName,
        lastName: !!lastName,
        email: !!email,
        phone: !!phone,
        subject: !!subject,
        message: !!message
      })
      return NextResponse.json({ error: 'Tous les champs sont obligatoires' }, { status: 400 })
    }
    
    // Formatage du nom complet
    const fullName = `${firstName} ${lastName}`
    const subjectLabel = getSubjectLabel(subject)
    const currentDate = new Date().toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    
    // Envoi de l'email avec Resend
    console.log('📤 Tentative d\'envoi email...')
    
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [process.env.CONTACT_EMAIL!],
      subject: `[Jazz en Tech] ${subjectLabel} - ${fullName}`,
      html: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau message de contact - Jazz en Tech</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; padding: 20px 0;">
    <tr>
      <td align="center">
        
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-radius: 12px; overflow: hidden;">
          
          <!-- Header avec gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #722f37 0%, #8b3a42 50%, #d4af37 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #f7f3e9; font-size: 28px; font-weight: bold;">
                🎷 Jazz en Tech
              </h1>
              <p style="margin: 8px 0 0 0; color: #f7f3e9; font-size: 16px; opacity: 0.9;">
                Nouveau message de contact
              </p>
            </td>
          </tr>
          
          <!-- Bandeau sujet -->
          <tr>
            <td style="background-color: #d4af37; padding: 15px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td>
                    <span style="color: #722f37; font-weight: bold; font-size: 18px;">📩 ${subjectLabel}</span>
                  </td>
                  <td align="right">
                    <span style="color: #722f37; font-size: 14px;">${currentDate}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Contenu principal -->
          <tr>
            <td style="padding: 30px;">
              
              <!-- Informations contact -->
              <div style="background: linear-gradient(45deg, #f8f9fa 0%, #ffffff 100%); border: 2px solid #d4af37; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                <h2 style="margin: 0 0 20px 0; color: #722f37; font-size: 20px; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
                  👤 Informations du contact
                </h2>
                
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="width: 50%; padding: 12px 15px 12px 0; vertical-align: top;">
                      <div style="background-color: rgba(212, 175, 55, 0.1); border-radius: 8px; padding: 15px;">
                        <strong style="color: #722f37; font-size: 14px;">👤 Prénom</strong><br>
                        <span style="color: #333; font-size: 16px; font-weight: 500;">${firstName}</span>
                      </div>
                    </td>
                    <td style="width: 50%; padding: 12px 0 12px 15px; vertical-align: top;">
                      <div style="background-color: rgba(114, 47, 55, 0.1); border-radius: 8px; padding: 15px;">
                        <strong style="color: #722f37; font-size: 14px;">👤 Nom</strong><br>
                        <span style="color: #333; font-size: 16px; font-weight: 500;">${lastName}</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 15px 12px 0; vertical-align: top;">
                      <div style="background-color: rgba(212, 175, 55, 0.1); border-radius: 8px; padding: 15px;">
                        <strong style="color: #722f37; font-size: 14px;">📧 Email</strong><br>
                        <a href="mailto:${email}" style="color: #d4af37; text-decoration: none; font-size: 16px; font-weight: 500;">${email}</a>
                      </div>
                    </td>
                    <td style="padding: 12px 0 12px 15px; vertical-align: top;">
                      <div style="background-color: rgba(114, 47, 55, 0.1); border-radius: 8px; padding: 15px;">
                        <strong style="color: #722f37; font-size: 14px;">📱 Téléphone</strong><br>
                        <a href="tel:${phone}" style="color: #722f37; text-decoration: none; font-size: 16px; font-weight: 500;">${phone}</a>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- Message -->
              <div style="background: linear-gradient(135deg, #f7f3e9 0%, #ffffff 100%); border: 2px solid #722f37; border-radius: 12px; padding: 25px;">
                <h3 style="margin: 0 0 15px 0; color: #722f37; font-size: 18px; border-bottom: 2px solid #722f37; padding-bottom: 8px;">
                  💬 Message
                </h3>
                <div style="background-color: #ffffff; border-radius: 8px; padding: 20px; border-left: 4px solid #d4af37; line-height: 1.6; color: #333; font-size: 15px;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
            </td>
          </tr>
          
          <!-- Actions rapides -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 25px 30px; border-top: 1px solid #dee2e6;">
              <h3 style="margin: 0 0 15px 0; color: #722f37; font-size: 16px;">⚡ Actions rapides</h3>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding-right: 10px;">
                    <a href="mailto:${email}" style="display: inline-block; background-color: #d4af37; color: #722f37; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-weight: bold; font-size: 14px;">
                      📧 Répondre par email
                    </a>
                  </td>
                  <td style="padding-left: 10px;">
                    <a href="tel:${phone}" style="display: inline-block; background-color: #722f37; color: #f7f3e9; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-weight: bold; font-size: 14px;">
                      📱 Appeler
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #722f37; padding: 20px 30px; text-align: center;">
              <p style="margin: 0; color: #f7f3e9; font-size: 14px;">
                🎵 <strong>Festival Jazz en Tech 2025</strong> 🎵
              </p>
              <p style="margin: 5px 0 0 0; color: #d4af37; font-size: 12px;">
                Céret et Saint-Génis-des-Fontaines (66) • www.jazzentech.com
              </p>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
  
</body>
</html>`,
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
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 })
  }
}