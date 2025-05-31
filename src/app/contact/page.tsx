'use client'
import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, MessageCircle, Users, Ticket } from 'lucide-react'

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
    
    // Simulation d'envoi (remplacez par votre logique d'envoi)
    setTimeout(() => {
      setSubmitStatus('success')
      setIsSubmitting(false)
      // Reset form après succès
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - COULEURS JAZZ CORRIGÉES */}
      <section className="hero-gradient text-white pt-24 pb-8 sm:pt-28 sm:pb-12 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#d4af37' }}>
            Contactez-nous
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#f7f3e9' }}>
            Une question ? Un projet ? Notre équipe est là pour vous accompagner 
            dans votre aventure Jazz en Tech
          </p>
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-4 py-2">
              <MessageCircle className="w-5 h-5" style={{ color: '#d4af37' }} />
              <span className="text-sm font-medium" style={{ color: '#f7f3e9' }}>Réponse sous 24h</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Informations de contact - RESPONSIVE ET COULEURS JAZZ */}
          <div className="lg:col-span-1">
            <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8" style={{ color: '#1a1a1a' }}>
              Restons en contact
            </h2>
            
            <div className="space-y-4 md:space-y-6">
              {/* Adresse - CORRIGÉE POUR CÉRET */}
              <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div 
                  className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}
                >
                  <MapPin className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#d4af37' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-sm md:text-base" style={{ color: '#1a1a1a' }}>Adresse</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    10 rue Companyo<br />
                    66400 Céret, France
                  </p>
                </div>
              </div>

              {/* Téléphone - COULEURS JAZZ */}
              <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div 
                  className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(114, 47, 55, 0.2)' }}
                >
                  <Phone className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#722f37' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-sm md:text-base" style={{ color: '#1a1a1a' }}>Téléphone</h3>
                  <p className="text-gray-600 text-sm md:text-base">06 08 75 87 67</p>
                  <p className="text-xs md:text-sm text-gray-500">Lun-Ven 9h-18h</p>
                </div>
              </div>

              {/* Email - COULEURS JAZZ */}
              <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div 
                  className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}
                >
                  <Mail className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#d4af37' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-sm md:text-base" style={{ color: '#1a1a1a' }}>Email</h3>
                  <p className="text-gray-600 text-sm md:text-base">contact@jazzentech.com</p>
                  <p className="text-xs md:text-sm text-gray-500">Réponse sous 24h</p>
                </div>
              </div>

              {/* Horaires - COULEURS JAZZ */}
              <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div 
                  className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(114, 47, 55, 0.2)' }}
                >
                  <Clock className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#722f37' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-sm md:text-base" style={{ color: '#1a1a1a' }}>Horaires</h3>
                  <div className="text-gray-600 text-xs md:text-sm space-y-1">
                    <p>Lundi - Vendredi: 9h - 18h</p>
                    <p>Samedi: 10h - 16h</p>
                    <p>Dimanche: Fermé</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux - COULEURS JAZZ CORRIGÉES */}
            <div className="mt-6 md:mt-8 p-4 md:p-6 bg-white rounded-xl shadow-sm">
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base" style={{ color: '#1a1a1a' }}>Suivez-nous</h3>
              <div className="flex space-x-3 md:space-x-4">
                <a 
                  href="#" 
                  className="w-8 h-8 md:w-10 md:h-10 text-white rounded-lg flex items-center justify-center transition-all duration-300 hover:opacity-80"
                  style={{ backgroundColor: '#722f37' }}
                >
                  <span className="text-xs md:text-sm font-bold">f</span>
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 md:w-10 md:h-10 text-white rounded-lg flex items-center justify-center transition-all duration-300 hover:opacity-80"
                  style={{ backgroundColor: '#b87333' }}
                >
                  <span className="text-xs md:text-sm font-bold">@</span>
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:opacity-80"
                  style={{ backgroundColor: '#d4af37', color: '#722f37' }}
                >
                  <span className="text-xs md:text-sm font-bold">t</span>
                </a>
              </div>
            </div>
          </div>

          {/* Formulaire de contact - RESPONSIVE ET COULEURS JAZZ */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6" style={{ color: '#1a1a1a' }}>
                Envoyez-nous un message
              </h2>

              {/* Message de succès */}
              {submitStatus === 'success' && (
                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  <p className="text-green-800 text-sm md:text-base">Votre message a été envoyé avec succès !</p>
                </div>
              )}

              {/* Message d'erreur */}
              {submitStatus === 'error' && (
                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                  <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
                  <p className="text-red-800 text-sm md:text-base">Une erreur s'est produite. Veuillez réessayer.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Nom et Email */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a' }}>
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg transition-colors text-sm md:text-base"
                      style={{ 
                        '--tw-ring-color': '#d4af37',
                      }}
                      onFocus={(e) => {
                        e.target.style.outline = 'none'
                        e.target.style.borderColor = '#d4af37'
                        e.target.style.boxShadow = '0 0 0 2px rgba(212, 175, 55, 0.2)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db'
                        e.target.style.boxShadow = 'none'
                      }}
                      placeholder="Votre nom complet"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a' }}>
                      Adresse email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg transition-colors text-sm md:text-base"
                      onFocus={(e) => {
                        e.target.style.outline = 'none'
                        e.target.style.borderColor = '#d4af37'
                        e.target.style.boxShadow = '0 0 0 2px rgba(212, 175, 55, 0.2)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db'
                        e.target.style.boxShadow = 'none'
                      }}
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                {/* Sujet */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a' }}>
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg transition-colors text-sm md:text-base"
                    onFocus={(e) => {
                      e.target.style.outline = 'none'
                      e.target.style.borderColor = '#d4af37'
                      e.target.style.boxShadow = '0 0 0 2px rgba(212, 175, 55, 0.2)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db'
                      e.target.style.boxShadow = 'none'
                    }}
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
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a' }}>
                    Votre message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg transition-colors resize-y text-sm md:text-base"
                    onFocus={(e) => {
                      e.target.style.outline = 'none'
                      e.target.style.borderColor = '#d4af37'
                      e.target.style.boxShadow = '0 0 0 2px rgba(212, 175, 55, 0.2)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db'
                      e.target.style.boxShadow = 'none'
                    }}
                    placeholder="Décrivez votre demande en détail..."
                  />
                  <p className="mt-2 text-xs md:text-sm text-gray-500">
                    Minimum 10 caractères. Soyez précis pour une réponse adaptée.
                  </p>
                </div>

                {/* Checkbox RGPD */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    className="mt-1 w-4 h-4 rounded"
                    style={{ 
                      accentColor: '#d4af37',
                      borderColor: '#d1d5db'
                    }}
                  />
                  <label htmlFor="consent" className="text-xs md:text-sm text-gray-600">
                    J'accepte que mes données personnelles soient utilisées pour traiter ma demande.
                    Voir notre <a href="/politique-confidentialite" className="hover:underline" style={{ color: '#d4af37' }}>politique de confidentialité</a>.
                  </label>
                </div>

                {/* Bouton d'envoi - COULEURS JAZZ CORRIGÉES */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 px-4 md:px-6 py-3 md:py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                  style={{ 
                    backgroundColor: isSubmitting ? '#5a242b' : '#722f37',
                    color: '#f7f3e9',
                    transform: isSubmitting ? 'scale(1)' : undefined 
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = '#5a242b'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = '#722f37'
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white"></div>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Section FAQ rapide - COULEURS JAZZ CORRIGÉES */}
        <div className="mt-12 md:mt-16">
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center" style={{ color: '#1a1a1a' }}>
            Questions fréquentes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <Ticket className="w-5 h-5 mr-2" style={{ color: '#d4af37' }} />
                <h3 className="font-semibold text-sm md:text-base" style={{ color: '#1a1a1a' }}>Billetterie</h3>
              </div>
              <p className="text-gray-600 text-xs md:text-sm mb-3">Comment acheter mes billets ? Quand ouvre la billetterie ?</p>
              <a 
                href="/programmation" 
                className="text-xs md:text-sm font-medium inline-block hover:underline transition-colors"
                style={{ color: '#d4af37' }}
              >
                Voir la programmation →
              </a>
            </div>
            
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <Users className="w-5 h-5 mr-2" style={{ color: '#722f37' }} />
                <h3 className="font-semibold text-sm md:text-base" style={{ color: '#1a1a1a' }}>Bénévolat</h3>
              </div>
              <p className="text-gray-600 text-xs md:text-sm mb-3">Comment rejoindre l'équipe ? Quelles sont les missions ?</p>
              <a 
                href="/benevoles" 
                className="text-xs md:text-sm font-medium inline-block hover:underline transition-colors"
                style={{ color: '#d4af37' }}
              >
                Devenir bénévole →
              </a>
            </div>
            
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-3">
                <MessageCircle className="w-5 h-5 mr-2" style={{ color: '#b87333' }} />
                <h3 className="font-semibold text-sm md:text-base" style={{ color: '#1a1a1a' }}>Artistes</h3>
              </div>
              <p className="text-gray-600 text-xs md:text-sm mb-3">Vous êtes artiste ? Proposez votre projet musical !</p>
              <a 
                href="/artistes" 
                className="text-xs md:text-sm font-medium inline-block hover:underline transition-colors"
                style={{ color: '#d4af37' }}
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