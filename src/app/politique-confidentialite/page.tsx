import React from 'react'
import { Shield, Eye, Lock, FileText, Users, Mail, AlertTriangle, Database, Settings } from 'lucide-react'

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - AJOUTÉE AVEC PALETTE JAZZ */}
      <section className="hero-gradient text-white pt-36 pb-8 sm:pt-40 sm:pb-12 md:pt-44 md:pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#d4af37' }}>
            Politique de Confidentialité
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#f7f3e9' }}>
            Protection et traitement de vos données personnelles dans le respect du RGPD
          </p>
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-4 py-2">
              <Shield className="w-5 h-5" style={{ color: '#d4af37' }} />
              <span className="text-sm font-medium" style={{ color: '#f7f3e9' }}>Vos données protégées</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction - RESPONSIVE ET COULEURS JAZZ */}
          <div 
            className="p-4 md:p-6 rounded-xl mb-8 md:mb-12"
            style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
          >
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
              <h2 className="text-lg md:text-xl font-semibold" style={{ color: '#722f37' }}>À propos de cette politique</h2>
            </div>
            
            <p className="mb-4 text-sm md:text-base" style={{ color: '#1a1a1a' }}>
              L'association (loi 1901) Jazz En Tech (« nous », « notre », « nos ») exploite le site web 
              <a href="https://www.jazzentech.com" className="font-medium hover:underline mx-1" style={{ color: '#722f37' }}>
                https://www.jazzentech.com
              </a> 
              (ci-après désigné par le terme « Service »).
            </p>
            <p className="mb-4 text-sm md:text-base" style={{ color: '#1a1a1a' }}>
              Cette page vous explique nos politiques en matière de collecte, d'utilisation et de communication 
              des données à caractère personnel lorsque vous utilisez notre Service ainsi que les choix qui 
              s'offrent à vous en ce qui concerne ces données.
            </p>
            <p className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
              Nous utilisons vos données pour fournir et améliorer le Service. En utilisant le Service, vous 
              consentez à la collecte et à l'utilisation d'informations conformément à la présente politique.
            </p>
          </div>

          {/* Définitions - COULEURS JAZZ CORRIGÉES */}
          <section className="mb-8 md:mb-12">
            <div className="flex items-center mb-4 md:mb-6">
              <Database className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
              <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#722f37' }}>Définitions</h2>
            </div>
            
            <div className="bg-gray-50 p-4 md:p-6 rounded-xl space-y-4">
              <div 
                className="p-3 md:p-4 rounded-lg"
                style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
              >
                <h3 className="font-semibold mb-2 text-sm md:text-base" style={{ color: '#722f37' }}>Service</h3>
                <p className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                  Par Service on entend le site web https://www.jazzentech.com exploité par l'association (loi 1901) Jazz En Tech.
                </p>
              </div>
              
              <div 
                className="p-3 md:p-4 rounded-lg"
                style={{ backgroundColor: 'rgba(114, 47, 55, 0.1)' }}
              >
                <h4 className="font-semibold mb-2 text-sm md:text-base" style={{ color: '#722f37' }}>Données à caractère personnel</h4>
                <p className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                  Données concernant un individu vivant qui peut être identifié à partir de ces données.
                </p>
              </div>
              
              <div 
                className="p-3 md:p-4 rounded-lg"
                style={{ backgroundColor: 'rgba(184, 115, 51, 0.1)' }}
              >
                <h4 className="font-semibold mb-2 text-sm md:text-base" style={{ color: '#722f37' }}>Données d'Utilisation</h4>
                <p className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                  Données recueillies automatiquement et générées par l'utilisation du Service.
                </p>
              </div>
              
              <div 
                className="p-3 md:p-4 rounded-lg"
                style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
              >
                <h4 className="font-semibold mb-2 text-sm md:text-base" style={{ color: '#722f37' }}>Cookies</h4>
                <p className="text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                  Petits fichiers enregistrés sur votre dispositif (ordinateur ou dispositif mobile).
                </p>
              </div>
            </div>
          </section>

          {/* Collecte et utilisation des données - COULEURS JAZZ CORRIGÉES */}
          <section className="mb-8 md:mb-12">
            <div className="flex items-center mb-4 md:mb-6">
              <Eye className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
              <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#722f37' }}>Collecte et utilisation des données</h2>
            </div>
            
            <div className="space-y-6 md:space-y-8">
              {/* Données à Caractère Personnel */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4" style={{ color: '#722f37' }}>
                  Données à Caractère Personnel
                </h3>
                <p className="mb-4 text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                  Lorsque vous utilisez notre Service, il est possible que nous vous demandions de nous fournir 
                  certaines données personnelles nominatives qui peuvent servir à vous contacter ou à vous identifier :
                </p>
                <div className="grid sm:grid-cols-3 gap-3 md:gap-4">
                  <div 
                    className="p-3 rounded-lg text-center"
                    style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                  >
                    <Mail className="w-5 h-5 mx-auto mb-2" style={{ color: '#722f37' }} />
                    <p className="text-xs md:text-sm font-medium" style={{ color: '#722f37' }}>Adresse e-mail</p>
                  </div>
                  <div 
                    className="p-3 rounded-lg text-center"
                    style={{ backgroundColor: 'rgba(114, 47, 55, 0.1)' }}
                  >
                    <Users className="w-5 h-5 mx-auto mb-2" style={{ color: '#722f37' }} />
                    <p className="text-xs md:text-sm font-medium" style={{ color: '#722f37' }}>Nom et prénom</p>
                  </div>
                  <div 
                    className="p-3 rounded-lg text-center"
                    style={{ backgroundColor: 'rgba(184, 115, 51, 0.1)' }}
                  >
                    <Settings className="w-5 h-5 mx-auto mb-2" style={{ color: '#722f37' }} />
                    <p className="text-xs md:text-sm font-medium" style={{ color: '#722f37' }}>Cookies & Usage</p>
                  </div>
                </div>
              </div>

              {/* Données d'Utilisation */}
              <div className="bg-gray-50 p-4 md:p-6 rounded-xl">
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4" style={{ color: '#722f37' }}>
                  Données d'Utilisation
                </h3>
                <p className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                  Nous pouvons également recueillir des informations relatives au mode d'accès et d'utilisation 
                  du Service. Ces données peuvent comprendre l'adresse IP de votre ordinateur, le type de navigateur, 
                  la version du navigateur, les pages consultées, la date et l'heure de visite, etc.
                </p>
              </div>
            </div>
          </section>

          {/* Utilisation des données - COULEURS JAZZ CORRIGÉES */}
          <section className="mb-8 md:mb-12">
            <div className="flex items-center mb-4 md:mb-6">
              <Settings className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
              <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#722f37' }}>Utilisation des données</h2>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
              <p className="mb-4 text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                Nous utilisons les données recueillies à des fins diverses :
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div 
                    className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                    style={{ backgroundColor: '#d4af37' }}
                  ></div>
                  <span className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                    Pour fournir et assurer notre Service
                  </span>
                </div>
                <div className="flex items-start">
                  <div 
                    className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                    style={{ backgroundColor: '#b87333' }}
                  ></div>
                  <span className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                    Pour vous faire part des changements apportés à notre Service
                  </span>
                </div>
                <div className="flex items-start">
                  <div 
                    className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                    style={{ backgroundColor: '#722f37' }}
                  ></div>
                  <span className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                    Pour assurer l'assistance client
                  </span>
                </div>
                <div className="flex items-start">
                  <div 
                    className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                    style={{ backgroundColor: '#d4af37' }}
                  ></div>
                  <span className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                    Pour améliorer notre Service
                  </span>
                </div>
                <div className="flex items-start">
                  <div 
                    className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                    style={{ backgroundColor: '#b87333' }}
                  ></div>
                  <span className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                    Pour détecter, prévenir et régler les problèmes techniques
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Droits RGPD - COULEURS JAZZ CORRIGÉES */}
          <section className="mb-8 md:mb-12">
            <div className="flex items-center mb-4 md:mb-6">
              <Shield className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
              <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#722f37' }}>Droits RGPD</h2>
            </div>
            
            <div 
              className="p-4 md:p-6 rounded-xl border-l-4"
              style={{ 
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                borderColor: '#d4af37'
              }}
            >
              <p className="mb-4 text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                Si vous résidez dans l'Espace économique européen (EEE), vous avez certains droits en matière 
                de protection des données :
              </p>
              
              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                <div className="bg-white p-3 rounded-lg">
                  <h3 className="font-semibold text-xs md:text-sm mb-1" style={{ color: '#722f37' }}>
                    Droit d'accès
                  </h3>
                  <p className="text-xs text-gray-600">Aux informations que nous détenons</p>
                </div>
                
                <div className="bg-white p-3 rounded-lg">
                  <h4 className="font-semibold text-xs md:text-sm mb-1" style={{ color: '#722f37' }}>
                    Droit de rectification
                  </h4>
                  <p className="text-xs text-gray-600">Modifier vos données inexactes</p>
                </div>
                
                <div className="bg-white p-3 rounded-lg">
                  <h4 className="font-semibold text-xs md:text-sm mb-1" style={{ color: '#722f37' }}>
                    Droit d'opposition
                  </h4>
                  <p className="text-xs text-gray-600">Vous opposer au traitement</p>
                </div>
                
                <div className="bg-white p-3 rounded-lg">
                  <h4 className="font-semibold text-xs md:text-sm mb-1" style={{ color: '#722f37' }}>
                    Droit de limitation
                  </h4>
                  <p className="text-xs text-gray-600">Limiter le traitement</p>
                </div>
                
                <div className="bg-white p-3 rounded-lg">
                  <h4 className="font-semibold text-xs md:text-sm mb-1" style={{ color: '#722f37' }}>
                    Droit à la portabilité
                  </h4>
                  <p className="text-xs text-gray-600">Récupérer vos données</p>
                </div>
                
                <div className="bg-white p-3 rounded-lg">
                  <h4 className="font-semibold text-xs md:text-sm mb-1" style={{ color: '#722f37' }}>
                    Droit de retrait
                  </h4>
                  <p className="text-xs text-gray-600">Retirer votre consentement</p>
                </div>
              </div>
            </div>
          </section>

          {/* Sécurité des données - COULEURS JAZZ CORRIGÉES */}
          <section className="mb-8 md:mb-12">
            <div className="flex items-center mb-4 md:mb-6">
              <Lock className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
              <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#722f37' }}>Sécurité des données</h2>
            </div>
            
            <div 
              className="p-4 md:p-6 rounded-xl border-l-4"
              style={{ 
                backgroundColor: 'rgba(114, 47, 55, 0.05)',
                borderColor: '#722f37'
              }}
            >
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" style={{ color: '#722f37' }} />
                <p className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                  La sécurité de vos données nous tient à cœur. Nous nous efforçons d'utiliser des méthodes 
                  commercialement acceptables pour protéger vos données personnelles, bien qu'aucune méthode 
                  de transmission ou de stockage ne soit sûre à 100%.
                </p>
              </div>
            </div>
          </section>

          {/* Contact - COULEURS JAZZ CORRIGÉES */}
          <section>
            <div className="flex items-center mb-4 md:mb-6">
              <Mail className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
              <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#722f37' }}>Nous contacter</h2>
            </div>
            
            <div 
              className="p-4 md:p-6 rounded-xl text-center"
              style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
            >
              <p className="mb-4 text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                Pour toute question relative à cette Politique de Confidentialité, veuillez nous contacter à :
              </p>
              <a 
                href="mailto:contactjazzentech@gmail.com" 
                className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90 text-sm md:text-base"
                style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
              >
                <Mail className="w-4 h-4 mr-2" />
                contactjazzentech@gmail.com
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
                href="/politique-cookies"
                className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:opacity-90 text-sm md:text-base"
                style={{ backgroundColor: '#d4af37', color: '#722f37' }}
              >
                Politique de cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}