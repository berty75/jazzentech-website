'use client'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [consentAccepted, setConsentAccepted] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const MESSAGE_MAX_LENGTH = 1500
  const MESSAGE_MIN_LENGTH = 10

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Effacer les erreurs de validation quand l'utilisateur tape
    if (validationErrors.length > 0) {
      setValidationErrors([])
    }
  }

  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsentAccepted(e.target.checked)
    // Effacer les erreurs de validation quand l'utilisateur coche
    if (validationErrors.length > 0) {
      setValidationErrors([])
    }
  }

  const validateForm = (): boolean => {
    const errors: string[] = []
    
    if (!formData.firstName.trim()) {
      errors.push('Le prénom est obligatoire')
    }
    
    if (!formData.lastName.trim()) {
      errors.push('Le nom est obligatoire')
    }
    
    if (!formData.email.trim()) {
      errors.push('L\'email est obligatoire')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('L\'email n\'est pas valide')
    }
    
    if (!formData.phone.trim()) {
      errors.push('Le numéro de téléphone est obligatoire')
    }
    
    if (!formData.subject) {
      errors.push('Le sujet est obligatoire')
    }
    
    if (!formData.message.trim()) {
      errors.push('Le message est obligatoire')
    } else if (formData.message.trim().length < MESSAGE_MIN_LENGTH) {
      errors.push(`Le message doit contenir au moins ${MESSAGE_MIN_LENGTH} caractères`)
    } else if (formData.message.length > MESSAGE_MAX_LENGTH) {
      errors.push(`Le message ne peut pas dépasser ${MESSAGE_MAX_LENGTH} caractères`)
    }
    
    if (!consentAccepted) {
      errors.push('Vous devez accepter les conditions de confidentialité pour envoyer votre message')
    }
    
    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation côté client
    if (!validateForm()) {
      setSubmitStatus('error')
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      
      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' })
        setConsentAccepted(false)
        setValidationErrors([])
      } else {
        throw new Error(result.error)
      }
      
    } catch (error) {
      setSubmitStatus('error')
      setValidationErrors(['Une erreur s\'est produite lors de l\'envoi. Veuillez réessayer.'])
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fonction pour obtenir la couleur du compteur
  const getCharacterCountColor = () => {
    const currentLength = formData.message.length
    const percentage = (currentLength / MESSAGE_MAX_LENGTH) * 100
    
    if (percentage >= 95) return '#dc2626' // Rouge
    if (percentage >= 85) return '#f59e0b' // Orange
    if (percentage >= 70) return '#d4af37' // Doré
    return '#6b7280' // Gris
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <title>Contact - Jazz en Tech 2025</title>
      
      {/* Hero Section */}
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
                  Céret et Saint-Génis-des-Fontaines (66)<br />
                  France
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
                  <p className="text-gray-600">+33 6 37 58 18 86</p>
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
                  <p className="text-gray-600">contactjazzentech@gmail.com</p>
                  <p className="text-sm text-gray-500">Réponse sous 24h</p>
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
                {/* Message de succès */}
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

                {/* Messages d'erreur de validation */}
                {(submitStatus === 'error' || validationErrors.length > 0) && (
                  <div 
                    className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg"
                    role="alert"
                    aria-live="assertive"
                  >
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-600 mt-0.5" aria-hidden="true" />
                      <div className="flex-1">
                        {validationErrors.length > 0 ? (
                          <div>
                            <p className="text-red-800 text-sm md:text-base font-semibold mb-2">
                              Veuillez corriger les erreurs suivantes :
                            </p>
                            <ul className="text-red-700 text-sm md:text-base space-y-1">
                              {validationErrors.map((error, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="mr-2">•</span>
                                  <span>{error}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p className="text-red-800 text-sm md:text-base">
                            Une erreur s'est produite. Veuillez réessayer ou nous contacter par téléphone.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Prénom et Nom */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label 
                      htmlFor="firstName" 
                      className="block text-sm font-medium mb-2" 
                      style={{ color: '#1a1a1a' }}
                    >
                      Prénom <span aria-label="obligatoire" className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      aria-required="true"
                      aria-describedby="firstName-help"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="form-focus w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg transition-colors text-sm md:text-base"
                      placeholder="Votre prénom"
                    />
                    <div id="firstName-help" className="sr-only">
                      Saisissez votre prénom
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="lastName" 
                      className="block text-sm font-medium mb-2" 
                      style={{ color: '#1a1a1a' }}
                    >
                      Nom <span aria-label="obligatoire" className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      aria-required="true"
                      aria-describedby="lastName-help"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="form-focus w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg transition-colors text-sm md:text-base"
                      placeholder="Votre nom"
                    />
                    <div id="lastName-help" className="sr-only">
                      Saisissez votre nom de famille
                    </div>
                  </div>
                </div>

                {/* Email et Téléphone */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
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

                  <div>
                    <label 
                      htmlFor="phone" 
                      className="block text-sm font-medium mb-2" 
                      style={{ color: '#1a1a1a' }}
                    >
                      Numéro de téléphone <span aria-label="obligatoire" className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      aria-required="true"
                      aria-describedby="phone-help"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-focus w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg transition-colors text-sm md:text-base"
                      placeholder="+33 6 12 34 56 78"
                    />
                    <div id="phone-help" className="text-xs mt-1 text-gray-600">
                      Pour vous contacter rapidement si nécessaire
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

                {/* Message avec compteur de caractères */}
                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-medium mb-2" 
                    style={{ color: '#1a1a1a' }}
                  >
                    Votre message <span aria-label="obligatoire" className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      required
                      aria-required="true"
                      aria-describedby="message-help"
                      rows={5}
                      maxLength={MESSAGE_MAX_LENGTH}
                      value={formData.message}
                      onChange={handleChange}
                      className="form-focus w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg transition-colors resize-y text-sm md:text-base"
                      placeholder="Décrivez votre demande en détail..."
                    />
                    {/* Compteur de caractères */}
                    <div className="absolute bottom-3 right-3 text-xs font-medium pointer-events-none">
                      <span 
                        style={{ color: getCharacterCountColor() }}
                        className="bg-white px-2 py-1 rounded shadow-sm"
                      >
                        {formData.message.length}/{MESSAGE_MAX_LENGTH}
                      </span>
                    </div>
                  </div>
                  <div id="message-help" className="mt-2 text-xs md:text-sm text-gray-500 flex justify-between">
                    <span>Entre {MESSAGE_MIN_LENGTH} et {MESSAGE_MAX_LENGTH} caractères. Soyez précis pour une réponse adaptée.</span>
                    <span 
                      className="font-medium"
                      style={{ color: getCharacterCountColor() }}
                    >
                      {MESSAGE_MAX_LENGTH - formData.message.length} restants
                    </span>
                  </div>
                </div>

                {/* Checkbox RGPD obligatoire avec validation visuelle */}
                <fieldset className="flex items-start space-x-3">
                  <legend className="sr-only">Consentement RGPD</legend>
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    aria-required="true"
                    aria-describedby="consent-help"
                    checked={consentAccepted}
                    onChange={handleConsentChange}
                    className={`focus-minimal mt-1 w-4 h-4 rounded ${
                      validationErrors.some(error => error.includes('conditions')) 
                        ? 'border-red-500' 
                        : 'border-gray-300'
                    }`}
                    style={{ 
                      accentColor: '#d4af37',
                    }}
                  />
                  <div>
                    <label 
                      htmlFor="consent" 
                      className={`text-xs md:text-sm ${
                        validationErrors.some(error => error.includes('conditions'))
                          ? 'text-red-600' 
                          : 'text-gray-600'
                      }`}
                    >
                      <span className="text-red-600">*</span> J'accepte que mes données personnelles soient utilisées pour traiter ma demande.
                      Voir notre <a 
                        href="/politique-confidentialite" 
                        className="font-semibold underline transition-colors"
                        style={{ 
                          color: '#722f37',
                        }}
                        onMouseEnter={(e) => e.target.style.color = '#8b3a42'}
                        onMouseLeave={(e) => e.target.style.color = '#722f37'}
                      >
                        politique de confidentialité
                      </a>
                    </label>
                    <div id="consent-help" className="sr-only">
                      Case obligatoire pour accepter le traitement de vos données personnelles
                    </div>
                  </div>
                </fieldset>

                {/* Bouton d'envoi */}
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

        {/* Section FAQ avec couleurs Jazz en Tech */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Questions fréquentes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Billetterie</h3>
              <p className="text-gray-600 text-sm">Comment acheter mes billets ? Quand ouvre la billetterie ?</p>
              <a 
                href="/programmation" 
                className="text-sm font-semibold mt-2 inline-block underline transition-colors"
                style={{ color: '#d4af37' }}
                onMouseEnter={(e) => e.target.style.color = '#b8941f'}
                onMouseLeave={(e) => e.target.style.color = '#d4af37'}
              >
                Voir la programmation →
              </a>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Bénévolat</h3>
              <p className="text-gray-600 text-sm">Comment rejoindre l'équipe ? Quelles sont les missions ?</p>
              <a 
                href="/benevoles" 
                className="text-sm font-semibold mt-2 inline-block underline transition-colors"
                style={{ color: '#d4af37' }}
                onMouseEnter={(e) => e.target.style.color = '#b8941f'}
                onMouseLeave={(e) => e.target.style.color = '#d4af37'}
              >
                Devenir bénévole →
              </a>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Artistes</h3>
              <p className="text-gray-600 text-sm">Vous êtes artiste ? Proposez votre projet musical !</p>
              <a 
                href="/artistes" 
                className="text-sm font-semibold mt-2 inline-block underline transition-colors"
                style={{ color: '#d4af37' }}
                onMouseEnter={(e) => e.target.style.color = '#b8941f'}
                onMouseLeave={(e) => e.target.style.color = '#d4af37'}
              >
                Découvrir les artistes →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}