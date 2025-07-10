import React from 'react'
import { Scale, Building, Shield, Mail, FileText, Users, AlertTriangle, Phone } from 'lucide-react'

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - AJOUTÉE AVEC PALETTE JAZZ */}
      <section className="hero-gradient text-white pt-36 pb-8 sm:pt-40 sm:pb-12 md:pt-44 md:pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#d4af37' }}>
            Mentions Légales
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#f7f3e9' }}>
            Informations légales et réglementaires concernant le site Jazz en Tech
          </p>
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-4 py-2">
              <Scale className="w-5 h-5" style={{ color: '#d4af37' }} />
              <span className="text-sm font-medium" style={{ color: '#f7f3e9' }}>Conformité légale</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Editeur du site */}
          <section className="mb-8 md:mb-12">
            <div className="flex items-center mb-4 md:mb-6">
              <Building className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
              <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#722f37' }}>Editeur du site</h2>
            </div>
            
            <div 
              className="p-4 md:p-6 rounded-xl mb-4"
              style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
            >
              <p className="mb-3 md:mb-4 text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                L'association (loi 1901) <strong>Jazz En Tech</strong><br />
                SIRET 838 417 012 00013 / APE 0499Z<br />
                10 rue Companyo, 66400 Céret, France<br />
                Représentée par son président <strong>Alain Brunet</strong>
              </p>
              
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" style={{ color: '#722f37' }} />
                <span className="text-sm md:text-base">E-mail : </span>
                <a 
                  href="mailto:contact@jazzentech.com" 
                  className="font-medium hover:underline transition-colors text-sm md:text-base"
                  style={{ color: '#722f37' }}
                >
                  contact@jazzentech.com
                </a>
              </div>
              
              <div className="flex items-center space-x-2 mt-2">
                <Phone className="w-4 h-4" style={{ color: '#722f37' }} />
                <span className="text-sm md:text-base">Téléphone : </span>
                <span className="font-medium text-sm md:text-base" style={{ color: '#722f37' }}>+33 6 37 58 18 86</span>
              </div>
            </div>
          </section>

          {/* Hébergement */}
          <section className="mb-8 md:mb-12">
            <div className="flex items-center mb-4 md:mb-6">
              <Shield className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
              <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#722f37' }}>Hébergement</h2>
            </div>
            
            <div className="bg-gray-50 p-4 md:p-6 rounded-xl">
              <p className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                Ce site est hébergé sur les serveurs de la société <strong>OVH</strong><br />
                2, rue Kellermann, 59100 Roubaix, France
              </p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section className="mb-8 md:mb-12">
            <div className="flex items-center mb-4 md:mb-6">
              <FileText className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
              <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#722f37' }}>Propriété intellectuelle</h2>
            </div>
            
            <div className="space-y-4">
              <div 
                className="p-4 md:p-6 rounded-xl border-l-4"
                style={{ 
                  backgroundColor: 'rgba(114, 47, 55, 0.05)',
                  borderColor: '#722f37'
                }}
              >
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#722f37' }} />
                  <p className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                    <strong>Interdiction de reproduction :</strong> Toute reproduction ou distribution non autorisée 
                    de tout ou partie des éléments et informations de ce site est interdite. Le contenu est 
                    disponible pour un usage privé et non collectif.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 md:p-6 rounded-xl">
                <p className="text-sm md:text-base mb-3 md:mb-4" style={{ color: '#1a1a1a' }}>
                  Le code de la propriété intellectuelle n'autorisant, aux termes de l'article L. 122-5.2° et 3°a, 
                  d'une part, que les « copies ou reproductions strictement réservées à l'usage privé du copiste et 
                  non destinées à une utilisation collective » et, d'autre part, que les analyses et les courtes 
                  citations dans un but d'exemple et d'illustration.
                </p>
                <p className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                  « Toute représentation ou reproduction intégrale ou partielle faite sans le consentement de 
                  l'auteur ou de ses ayants droit ou ayants cause est illicite » (art. L. 122-4). Cette représentation 
                  ou reproduction constituerait une contrefaçon sanctionnée par les articles L. 335-2 et suivants 
                  du code de la propriété intellectuelle.
                </p>
              </div>
            </div>
          </section>

          {/* CNIL */}
          <section className="mb-8 md:mb-12">
            <div className="flex items-center mb-4 md:mb-6">
              <Users className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
              <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#722f37' }}>
                CNIL (Commission Nationale Informatique et Libertés)
              </h2>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4" style={{ color: '#722f37' }}>
                  Protection et utilisation des données
                </h3>
                
                <div className="bg-gray-50 p-4 md:p-6 rounded-xl space-y-3 md:space-y-4">
                  <p className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                    Les utilisateurs ayant déposé dans le site des informations nominatives peuvent demander la 
                    communication des informations nominatives les concernant à l'administrateur du site et les 
                    faire rectifier le cas échéant, conformément à la loi française N° 78-17 du 6 janvier 1978 
                    relative à l'informatique, aux fichiers et aux libertés.
                  </p>
                  
                  <p className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                    Ils peuvent exercer ces droits en adressant un courrier à l'éditeur du site.
                  </p>
                  
                  <p className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                    Les informations nominatives peuvent être utilisées par l'éditeur pour proposer ses services 
                    et/ou produits et faire connaître ceux de ses partenaires. Elles ne seront communiquées aux 
                    tiers que pour permettre la gestion des opérations ou pour satisfaire aux obligations légales. 
                    Chaque utilisateur peut s'y opposer en adressant un courrier à l'adresse ci-dessus.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Marques et logos */}
          <section className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6" style={{ color: '#722f37' }}>
              Marques et logos, liens hypertextes
            </h2>
            
            <div className="bg-gray-50 p-4 md:p-6 rounded-xl">
              <p className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                Toute utilisation quelle qu'elle soit des noms de marques et logos de ce site est interdite 
                sans l'autorisation de l'éditeur. De même tous liens hypertextes visant ce site sont soumis 
                à autorisation préalable.
              </p>
            </div>
          </section>

          {/* Données personnelles */}
          <section className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6" style={{ color: '#722f37' }}>
              Utilisation des données personnelles collectées
            </h2>
            
            <div className="grid gap-4 md:gap-6">
              {/* Commentaires */}
              <div 
                className="p-4 md:p-6 rounded-xl"
                style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
              >
                <h3 className="text-lg font-semibold mb-2 md:mb-3" style={{ color: '#722f37' }}>Commentaires</h3>
                <p className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                  Quand vous laissez un commentaire sur notre site web, les données inscrites dans le formulaire 
                  de commentaire, mais aussi votre adresse IP et l'agent utilisateur de votre navigateur sont 
                  collectés pour nous aider à la détection des commentaires indésirables.
                </p>
              </div>

              {/* Formulaires */}
              <div 
                className="p-4 md:p-6 rounded-xl"
                style={{ backgroundColor: 'rgba(114, 47, 55, 0.1)' }}
              >
                <h3 className="text-lg font-semibold mb-2 md:mb-3" style={{ color: '#722f37' }}>Formulaires de contact</h3>
                <p className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                  Les données saisies sur nos formulaires de contact sont enregistrées dans la base de données 
                  du site (nom, adresse e-mail, commentaire, adresse IP de connexion, date et heure de connexion, 
                  navigateur utilisé).
                </p>
              </div>

              {/* Cookies */}
              <div 
                className="p-4 md:p-6 rounded-xl"
                style={{ backgroundColor: 'rgba(184, 115, 51, 0.1)' }}
              >
                <h3 className="text-lg font-semibold mb-2 md:mb-3" style={{ color: '#722f37' }}>Cookies</h3>
                <p className="text-sm md:text-base mb-3" style={{ color: '#1a1a1a' }}>
                  Un « Cookie » permet l'identification de l'Utilisateur, la personnalisation de sa consultation 
                  du présent site et l'accélération de la mise en page du site grâce à l'enregistrement d'un 
                  fichier de données sur son ordinateur.
                </p>
                <p className="text-sm md:text-base">
                  Voir notre page 
                  <a 
                    href="/politique-cookies" 
                    className="font-medium hover:underline transition-colors ml-1"
                    style={{ color: '#722f37' }}
                  >
                    « Politique de cookies »
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Contact et informations supplémentaires */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <section>
              <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4" style={{ color: '#722f37' }}>
                Informations de contact
              </h2>
              <div className="bg-gray-50 p-4 md:p-6 rounded-xl">
                <p className="text-sm md:text-base">
                  Vous pouvez nous contacter via notre 
                  <a 
                    href="/contact" 
                    className="font-medium hover:underline transition-colors ml-1"
                    style={{ color: '#722f37' }}
                  >
                    formulaire de contact
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4" style={{ color: '#722f37' }}>
                Informations supplémentaires
              </h2>
              <div className="bg-gray-50 p-4 md:p-6 rounded-xl">
                <p className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
                  Ce site n'a pas pour objet l'exploitation commerciale de vos données personnelles.
                </p>
              </div>
            </section>
          </div>

          {/* Navigation vers autres pages légales */}
          <div 
            className="mt-8 md:mt-12 p-4 md:p-6 rounded-xl text-center"
            style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
          >
            <h3 className="text-lg font-semibold mb-3 md:mb-4" style={{ color: '#722f37' }}>
              Documents connexes
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a 
                href="/politique-confidentialite"
                className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:opacity-90 text-sm md:text-base"
                style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
              >
                Politique de confidentialité
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