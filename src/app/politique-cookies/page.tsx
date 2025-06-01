import React from 'react'
import { Cookie, Shield, Settings, AlertTriangle, Clock, Link as LinkIcon, Mail, Eye, Database, Users } from 'lucide-react'

export default function PolitiqueCookies() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - AJOUTÉE AVEC PALETTE JAZZ */}
      <section className="hero-gradient text-white pt-24 pb-8 sm:pt-28 sm:pb-12 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#d4af37' }}>
            Politique de Cookies
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#f7f3e9' }}>
            Comprendre l'utilisation des cookies sur le site Jazz en Tech
          </p>
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-4 py-2">
              <Cookie className="w-5 h-5" style={{ color: '#d4af37' }} />
              <span className="text-sm font-medium" style={{ color: '#f7f3e9' }}>Gestion transparente</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction - COULEURS JAZZ CORRIGÉES */}
          <section className="mb-8 md:mb-12">
            <div className="flex items-center mb-4 md:mb-6">
              <Cookie className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
              <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#722f37' }}>Qu'est-ce qu'un cookie ?</h2>
            </div>
            
            <div 
              className="p-4 md:p-6 rounded-xl"
              style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
            >
              <p className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                Un cookie est un petit fichier texte stocké sur votre ordinateur ou appareil mobile lors de 
                votre visite sur notre site web. Les cookies permettent au site de reconnaître votre appareil 
                et de mémoriser certaines informations sur vos préférences ou actions passées.
              </p>
            </div>
          </section>

          {/* Types de cookies - COULEURS JAZZ CORRIGÉES */}
          <section className="mb-8 md:mb-12">
            <div className="flex items-center mb-4 md:mb-6">
              <Settings className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
              <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#722f37' }}>Types de cookies utilisés</h2>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              {/* Cookies essentiels */}
              <div 
                className="p-4 md:p-6 rounded-xl border-l-4"
                style={{ 
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  borderColor: '#d4af37'
                }}
              >
                <div className="flex items-center mb-3 md:mb-4">
                  <Shield className="w-5 h-5 mr-2" style={{ color: '#722f37' }} />
                  <h3 className="text-lg md:text-xl font-semibold" style={{ color: '#722f37' }}>Cookies essentiels</h3>
                </div>
                <p className="mb-3 md:mb-4 text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                  Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: '#d4af37' }}
                    ></div>
                    <span className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                      Cookies de session pour maintenir votre connexion
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: '#b87333' }}
                    ></div>
                    <span className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                      Cookies de sécurité pour protéger contre les attaques
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: '#722f37' }}
                    ></div>
                    <span className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                      Cookies de préférences pour mémoriser vos choix
                    </span>
                  </div>
                </div>
              </div>

              {/* Cookies d'analyse */}
              <div 
                className="p-4 md:p-6 rounded-xl border-l-4"
                style={{ 
                  backgroundColor: 'rgba(114, 47, 55, 0.05)',
                  borderColor: '#722f37'
                }}
              >
                <div className="flex items-center mb-3 md:mb-4">
                  <Eye className="w-5 h-5 mr-2" style={{ color: '#722f37' }} />
                  <h3 className="text-lg md:text-xl font-semibold" style={{ color: '#722f37' }}>Cookies d'analyse</h3>
                </div>
                <p className="mb-3 md:mb-4 text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                  Ces cookies nous aident à comprendre comment vous utilisez notre site.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: '#d4af37' }}
                    ></div>
                    <span className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                      Google Analytics pour mesurer l'audience
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: '#b87333' }}
                    ></div>
                    <span className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                      Statistiques de navigation et de performance
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: '#722f37' }}
                    ></div>
                    <span className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                      Données anonymisées sur l'utilisation du site
                    </span>
                  </div>
                </div>
              </div>

              {/* Cookies de marketing */}
              <div 
                className="p-4 md:p-6 rounded-xl border-l-4"
                style={{ 
                  backgroundColor: 'rgba(184, 115, 51, 0.1)',
                  borderColor: '#b87333'
                }}
              >
                <div className="flex items-center mb-3 md:mb-4">
                  <Users className="w-5 h-5 mr-2" style={{ color: '#722f37' }} />
                  <h3 className="text-lg md:text-xl font-semibold" style={{ color: '#722f37' }}>Cookies de marketing</h3>
                </div>
                <p className="mb-3 md:mb-4 text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                  Ces cookies sont utilisés pour vous proposer du contenu personnalisé.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: '#d4af37' }}
                    ></div>
                    <span className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                      Cookies de réseaux sociaux (Facebook, Instagram)
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: '#b87333' }}
                    ></div>
                    <span className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                      Cookies de remarketing pour les publicités
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: '#722f37' }}
                    ></div>
                    <span className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                      Suivi des conversions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gestion des cookies - COULEURS JAZZ CORRIGÉES */}
          <section className="mb-8 md:mb-12">
            <div className="flex items-center mb-4 md:mb-6">
              <Settings className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
              <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#722f37' }}>Gestion de vos cookies</h2>
            </div>
            
            <p className="mb-4 md:mb-6 text-sm md:text-base" style={{ color: '#1a1a1a' }}>
              Vous pouvez contrôler et gérer les cookies de plusieurs façons :
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {/* Paramètres du navigateur */}
              <div 
                className="p-4 md:p-6 rounded-xl"
                style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
              >
                <h3 className="text-lg font-semibold mb-3 md:mb-4" style={{ color: '#722f37' }}>
                  Paramètres du navigateur
                </h3>
                <p className="mb-3 text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                  Vous pouvez modifier les paramètres de votre navigateur pour :
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: '#722f37' }}
                    ></div>
                    <span className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                      Bloquer tous les cookies
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: '#d4af37' }}
                    ></div>
                    <span className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                      Accepter seulement les cookies essentiels
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: '#b87333' }}
                    ></div>
                    <span className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                      Recevoir une notification avant qu'un cookie soit stocké
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: '#722f37' }}
                    ></div>
                    <span className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                      Supprimer les cookies existants
                    </span>
                  </div>
                </div>
              </div>

              {/* Outils de gestion */}
              <div className="bg-gray-50 p-4 md:p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-3 md:mb-4" style={{ color: '#722f37' }}>
                  Outils de gestion
                </h3>
                <div className="space-y-3 md:space-y-4">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <LinkIcon className="w-4 h-4 mr-2" style={{ color: '#722f37' }} />
                      <span className="font-medium text-xs md:text-sm" style={{ color: '#722f37' }}>Google Analytics</span>
                    </div>
                    <a 
                      href="https://tools.google.com/dlpage/gaoptout" 
                      className="text-xs md:text-sm hover:underline transition-colors"
                      style={{ color: '#722f37' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Plugin de désactivation →
                    </a>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <LinkIcon className="w-4 h-4 mr-2" style={{ color: '#722f37' }} />
                      <span className="font-medium text-xs md:text-sm" style={{ color: '#722f37' }}>Publicités personnalisées</span>
                    </div>
                    <a 
                      href="http://www.youronlinechoices.eu/" 
                      className="text-xs md:text-sm hover:underline transition-colors"
                      style={{ color: '#722f37' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Your Online Choices →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Durée de conservation - COULEURS JAZZ CORRIGÉES */}
          <section className="mb-8 md:mb-12">
            <div className="flex items-center mb-4 md:mb-6">
              <Clock className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
              <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#722f37' }}>Durée de conservation</h2>
            </div>
            
            <div className="overflow-x-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full">
                  <thead style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}>
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: '#722f37' }}>
                        Type de cookie
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: '#722f37' }}>
                        Durée
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm" style={{ color: '#1a1a1a' }}>Cookies de session</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Jusqu'à fermeture du navigateur</td>
                    </tr>
                    <tr className="bg-gray-50 border-t border-gray-100">
                      <td className="px-4 py-3 text-sm" style={{ color: '#1a1a1a' }}>Cookies de préférences</td>
                      <td className="px-4 py-3 text-sm text-gray-600">1 an</td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm" style={{ color: '#1a1a1a' }}>Google Analytics</td>
                      <td className="px-4 py-3 text-sm text-gray-600">2 ans</td>
                    </tr>
                    <tr className="bg-gray-50 border-t border-gray-100">
                      <td className="px-4 py-3 text-sm" style={{ color: '#1a1a1a' }}>Cookies marketing</td>
                      <td className="px-4 py-3 text-sm text-gray-600">6 mois à 2 ans</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Conséquences de la désactivation - COULEURS JAZZ CORRIGÉES */}
          <section className="mb-8 md:mb-12">
            <div className="flex items-center mb-4 md:mb-6">
              <AlertTriangle className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
              <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#722f37' }}>Conséquences de la désactivation</h2>
            </div>
            
            <div 
              className="p-4 md:p-6 rounded-xl border-l-4"
              style={{ 
                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                borderColor: '#ffc107'
              }}
            >
              <div className="flex items-start mb-3 md:mb-4">
                <AlertTriangle className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" style={{ color: '#722f37' }} />
                <p className="text-sm md:text-base font-semibold" style={{ color: '#722f37' }}>
                  Important : La désactivation de certains cookies peut affecter le fonctionnement du site
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div 
                    className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                    style={{ backgroundColor: '#722f37' }}
                  ></div>
                  <span className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                    Perte de vos préférences et paramètres
                  </span>
                </div>
                <div className="flex items-start">
                  <div 
                    className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                    style={{ backgroundColor: '#d4af37' }}
                  ></div>
                  <span className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                    Nécessité de vous identifier à chaque visite
                  </span>
                </div>
                <div className="flex items-start">
                  <div 
                    className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                    style={{ backgroundColor: '#b87333' }}
                  ></div>
                  <span className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                    Certaines fonctionnalités peuvent ne plus fonctionner
                  </span>
                </div>
                <div className="flex items-start">
                  <div 
                    className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                    style={{ backgroundColor: '#722f37' }}
                  ></div>
                  <span className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                    Expérience utilisateur dégradée
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Contact - COULEURS JAZZ CORRIGÉES */}
          <section>
            <div className="flex items-center mb-4 md:mb-6">
              <Mail className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
              <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#722f37' }}>Contact</h2>
            </div>
            
            <div 
              className="p-4 md:p-6 rounded-xl text-center"
              style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
            >
              <p className="mb-4 text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                Pour toute question concernant notre utilisation des cookies, contactez-nous à :
              </p>
              <a 
                href="mailto:contact@jazzentech.com" 
                className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90 text-sm md:text-base"
                style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
              >
                <Mail className="w-4 h-4 mr-2" />
                contact@jazzentech.com
              </a>
            </div>
          </section>

          {/* Navigation vers autres pages légales - COULEURS JAZZ CORRIGÉES */}
          <div 
            className="mt-8 md:mt-12 p-4 md:p-6 rounded-xl text-center"
            style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
          >
            <h3 className="text-lg font-semibold mb-3 md:mb-4" style={{ color: '#722f37' }}>
              Documents connexes
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a 
                href="/mentions-legales"
                className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:opacity-90 text-sm md:text-base"
                style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
              >
                Mentions légales
              </a>
              <a 
                href="/politique-confidentialite"
                className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:opacity-90 text-sm md:text-base"
                style={{ backgroundColor: '#d4af37', color: '#722f37' }}
              >
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}