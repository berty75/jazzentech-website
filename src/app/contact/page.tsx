'use client'
import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'

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
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#E6A824' }}>
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
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
                <div className="flex-shrink-0 w-12 h-12 bg-jazz-yellow bg-opacity-20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6" style={{ color: '#E6A824' }} />
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
                <div className="flex-shrink-0 w-12 h-12 bg-jazz-red bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6" style={{ color: '#A8312F' }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                  <p className="text-gray-600">+33 1 23 45 67 89</p>
                  <p className="text-sm text-gray-500">Lun-Ven 9h-18h</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-jazz-yellow bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6" style={{ color: '#E6A824' }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">contact@jazzentech.com</p>
                  <p className="text-sm text-gray-500">Réponse sous 24h</p>
                </div>
              </div>

              {/* Horaires */}
              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-jazz-red bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6" style={{ color: '#A8312F' }} />
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
                <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <span className="text-sm font-bold">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-pink-600 text-white rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors">
                  <span className="text-sm font-bold">@</span>
                </a>
                <a href="#" className="w-10 h-10 bg-blue-400 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors">
                  <span className="text-sm font-bold">t</span>
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

              {/* Message de succès */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-800">Votre message a été envoyé avec succès !</p>
                </div>
              )}

              {/* Message d'erreur */}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-800">Une erreur s'est produite. Veuillez réessayer.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom et Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jazz-yellow focus:border-transparent transition-colors"
                      placeholder="Votre nom complet"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jazz-yellow focus:border-transparent transition-colors"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                {/* Sujet */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jazz-yellow focus:border-transparent transition-colors"
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
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Votre message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jazz-yellow focus:border-transparent transition-colors resize-y"
                    placeholder="Décrivez votre demande en détail..."
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Minimum 10 caractères. Soyez précis pour une réponse adaptée.
                  </p>
                </div>

                {/* Checkbox RGPD */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    className="mt-1 w-4 h-4 text-jazz-yellow border-gray-300 rounded focus:ring-jazz-yellow"
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600">
                    J'accepte que mes données personnelles soient utilisées pour traiter ma demande.
                    Voir notre <a href="#" className="text-jazz-yellow hover:underline">politique de confidentialité</a>.
                  </label>
                </div>

                {/* Bouton d'envoi */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-jazz-red text-white rounded-lg font-semibold hover:bg-jazz-red-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                  style={{ 
                    backgroundColor: isSubmitting ? '#7D2726' : '#A8312F',
                    transform: isSubmitting ? 'scale(1)' : undefined 
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>
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
              <a href="/programmation" className="text-jazz-yellow hover:underline text-sm font-medium mt-2 inline-block">
                Voir la programmation →
              </a>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Bénévolat</h3>
              <p className="text-gray-600 text-sm">Comment rejoindre l'équipe ? Quelles sont les missions ?</p>
              <a href="/benevoles" className="text-jazz-yellow hover:underline text-sm font-medium mt-2 inline-block">
                Devenir bénévole →
              </a>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Artistes</h3>
              <p className="text-gray-600 text-sm">Vous êtes artiste ? Proposez votre projet musical !</p>
              <a href="/artistes" className="text-jazz-yellow hover:underline text-sm font-medium mt-2 inline-block">
                Découvrir les artistes →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}