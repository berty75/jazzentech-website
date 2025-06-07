'use client'
import { useState } from 'react' // ← Plus besoin d'useEffect
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      console.log('Envoi avec EmailJS directement...')
      
      // UTILISATION DIRECTE D'EMAILJS (pas de fetch !)
      const result = await emailjs.send(
        'service_bddtc5e',
        'template_kmrs0ln', 
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        'EgXRsaRKLY5zfIU2_'
      )
      
      console.log('✅ Succès EmailJS:', result)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('❌ Erreur EmailJS:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
       <title>Contact - Jazz en Tech 2025</title>
      {/* Hero Section - COHÉRENT AVEC LES AUTRES PAGES */}
      {/* Hero Section - COHÉRENT AVEC LES AUTRES PAGES */}
<section className="hero-gradient text-white pt-36 pb-8 sm:pt-40 sm:pb-12 md:pt-44 md:pb-16 lg:pt-48">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#d4af37' }}>
            Contactez-nous
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto" style={{ color: '#f7f3e9' }}>
            Une question ? Un projet ? Notre équipe est là pour vous accompagner 
            dans votre aventure Jazz en Tech
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Informations de contact */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Restons en contact
            </h2>
            
            <div className="space-y-6">
              {/* Adresse */}
              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                  <MapPin className="w-6 h-6" style={{ color: '#d4af37' }} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                  <p className="text-gray-600">
                    123 Avenue des Arts<br />
                    75001 Paris, France
                  </p>
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(114, 47, 55, 0.1)' }}>
                  <Phone className="w-6 h-6" style={{ color: '#722f37' }} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                  <p className="text-gray-600">+33 1 23 45 67 89</p>
                  <p className="text-sm text-gray-500">Lun-Ven 9h-18h</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                  <Mail className="w-6 h-6" style={{ color: '#d4af37' }} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">contact@jazzentech.com</p>
                  <p className="text-sm text-gray-500">Réponse sous 24h</p>
                </div>
              </div>

              {/* Horaires */}
              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(114, 47, 55, 0.1)' }}>
                  <Clock className="w-6 h-6" style={{ color: '#722f37' }} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Horaires</h3>
                  <div className="text-gray-600 text-sm space-y-1">
                    <p>Lundi - Vendredi: 9h - 18h</p>
                    <p>Samedi: 10h - 16h</p>
                    <p>Dimanche: Fermé</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com/festivaljazzentech" 
                  className="focus-minimal w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                  aria-label="Suivez-nous sur Facebook"
                >
                  <span className="text-sm font-bold" aria-hidden="true">f</span>
                </a>
                <a 
                  href="https://instagram.com/festivaljazzentech" 
                  className="focus-minimal w-10 h-10 bg-pink-600 text-white rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors"
                  aria-label="Suivez-nous sur Instagram"
                >
                  <span className="text-sm font-bold" aria-hidden="true">@</span>
                </a>
                <a 
                  href="https://twitter.com/jazzentech" 
                  className="focus-minimal w-10 h-10 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors"
                  style={{ backgroundColor: '#3277cc' }}
                  aria-label="Suivez-nous sur Twitter"
                >
                  <span className="text-sm font-bold text-white" aria-hidden="true">t</span>
                </a>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Envoyez-nous un message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" noValidate>
                {/* Message de succès accessible */}
                {submitStatus === 'success' && (
                  <div 
                    className="mb-4 md:mb-6 p-3 md:p-4 bg-green-50 border border-green-200 rounded-lg"
                    role="alert"
                    aria-live="polite"
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600" aria-hidden="true" />
                      <p className="text-green-800 text-sm md:text-base">
                        Votre message a été envoyé avec succès ! Nous vous répondrons sous 24h.
                      </p>
                    </div>
                  </div>
                )}

                {/* Message d'erreur accessible */}
                {submitStatus === 'error' && (
                  <div 
                    className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg"
                    role="alert"
                    aria-live="assertive"
                  >
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-600" aria-hidden="true" />
                      <p className="text-red-800 text-sm md:text-base">
                        Une erreur s'est produite. Veuillez réessayer ou nous contacter par téléphone.
                      </p>
                    </div>
                  </div>
                )}

                {/* Nom et Email */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block text-sm font-medium mb-2" 
                      style={{ color: '#1a1a1a' }}
                    >
                      Nom complet <span aria-label="obligatoire" className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      aria-required="true"
                      aria-describedby="name-help"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-focus w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg transition-colors text-sm md:text-base"
                      placeholder="Votre nom complet"
                    />
                    <div id="name-help" className="sr-only">
                      Saisissez votre nom et prénom
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-medium mb-2" 
                      style={{ color: '#1a1a1a' }}
                    >
                      Adresse email <span aria-label="obligatoire" className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      aria-required="true"
                      aria-describedby="email-help"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-focus w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg transition-colors text-sm md:text-base"
                      placeholder="votre@email.com"
                    />
                    <div id="email-help" className="sr-only">
                      Saisissez une adresse email valide pour que nous puissions vous répondre
                    </div>
                  </div>
                </div>

                {/* Sujet */}
                <div>
                  <label 
                    htmlFor="subject" 
                    className="block text-sm font-medium mb-2" 
                    style={{ color: '#1a1a1a' }}
                  >
                    Sujet <span aria-label="obligatoire" className="text-red-600">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    aria-required="true"
                    aria-describedby="subject-help"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-focus w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg transition-colors text-sm md:text-base"
                  >
                    <option value="">Choisissez un sujet</option>
                    <option value="info">Demande d'informations générales</option>
                    <option value="benevole">Devenir bénévole</option>
                    <option value="artiste">Proposition artistique</option>
                    <option value="partenariat">Partenariat / Sponsoring</option>
                    <option value="presse">Demande presse / Média</option>
                    <option value="technique">Support technique</option>
                    <option value="autre">Autre demande</option>
                  </select>
                  <div id="subject-help" className="text-xs mt-1 text-gray-600">
                    Sélectionnez le sujet qui correspond le mieux à votre demande
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-medium mb-2" 
                    style={{ color: '#1a1a1a' }}
                  >
                    Votre message <span aria-label="obligatoire" className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    aria-required="true"
                    aria-describedby="message-help"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="form-focus w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg transition-colors resize-y text-sm md:text-base"
                    placeholder="Décrivez votre demande en détail..."
                  />
                  <div id="message-help" className="mt-2 text-xs md:text-sm text-gray-500">
                    Minimum 10 caractères. Soyez précis pour une réponse adaptée.
                  </div>
                </div>

                {/* Checkbox RGPD accessible */}
                <fieldset className="flex items-start space-x-3">
                  <legend className="sr-only">Consentement RGPD</legend>
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    aria-required="true"
                    aria-describedby="consent-help"
                    className="focus-minimal mt-1 w-4 h-4 rounded"
                    style={{ 
                      accentColor: '#d4af37',
                      borderColor: '#d1d5db'
                    }}
                  />
                  <div>
                    <label htmlFor="consent" className="text-xs md:text-sm text-gray-600">
                      J'accepte que mes données personnelles soient utilisées pour traiter ma demande.
                      Voir notre <a href="/politique-confidentialite" className="nav-link hover:underline rounded text-jazz-gold-accessible">
  politique de confidentialité
</a>
                    </label>
                    <div id="consent-help" className="sr-only">
                      Case obligatoire pour accepter le traitement de vos données personnelles
                    </div>
                  </div>
                </fieldset>

                {/* Bouton d'envoi accessible */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center space-x-2 px-4 md:px-6 py-3 md:py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                  style={{ 
                    backgroundColor: isSubmitting ? '#5a242b' : '#722f37',
                    color: '#f7f3e9',
                    transform: isSubmitting ? 'scale(1)' : undefined 
                  }}
                  aria-describedby="submit-help"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white" aria-hidden="true"></div>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>
                <div id="submit-help" className="sr-only">
                  Bouton pour envoyer votre message. Nous vous répondrons sous 24 heures.
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Section FAQ rapide */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Questions fréquentes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Billetterie</h3>
              <p className="text-gray-600 text-sm">Comment acheter mes billets ? Quand ouvre la billetterie ?</p>
              <a href="/programmation" className="nav-link hover:underline text-sm font-medium mt-2 inline-block text-jazz-gold-accessible">
  Voir la programmation →
</a>

            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Bénévolat</h3>
              <p className="text-gray-600 text-sm">Comment rejoindre l'équipe ? Quelles sont les missions ?</p>
              <a href="/benevoles" className="nav-link hover:underline text-sm font-medium mt-2 inline-block text-jazz-gold-accessible">
  Devenir bénévole →
</a>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Artistes</h3>
              <p className="text-gray-600 text-sm">Vous êtes artiste ? Proposez votre projet musical !</p>
              <a href="/artistes" className="nav-link hover:underline text-sm font-medium mt-2 inline-block text-jazz-gold-accessible">
  Découvrir les artistes →
</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}