import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Ticket } from 'lucide-react'

function Footer() {
  return (
    <footer style={{ backgroundColor: '#1a1a1a' }} className="text-white" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#d4af37' }}>
              Jazz en Tech
            </h3>
            <p className="mb-6 leading-relaxed" style={{ color: '#f7f3e9' }}>
              Le festival qui marie tradition jazz et innovation technologique.
            </p>
            <nav aria-label="Réseaux sociaux">
              <div className="flex space-x-4">
                <Link 
                  href="https://facebook.com/festivaljazzentech" 
                  className="nav-link hover:opacity-80 transition-colors rounded-lg p-1" 
                  style={{ color: '#d4af37' }}
                  aria-label="Suivez Jazz en Tech sur Facebook"
                >
                  <Facebook size={20} aria-hidden="true" />
                </Link>
                <Link 
                  href="https://instagram.com/festivaljazzentech" 
                  className="nav-link hover:opacity-80 transition-colors rounded-lg p-1" 
                  style={{ color: '#d4af37' }}
                  aria-label="Suivez Jazz en Tech sur Instagram"
                >
                  <Instagram size={20} aria-hidden="true" />
                </Link>
                <Link 
                  href="https://twitter.com/jazzentech" 
                  className="nav-link hover:opacity-80 transition-colors rounded-lg p-1" 
                  style={{ color: '#d4af37' }}
                  aria-label="Suivez Jazz en Tech sur Twitter"
                >
                  <Twitter size={20} aria-hidden="true" />
                </Link>
              </div>
            </nav>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#d4af37' }}>
              Navigation
            </h4>
            <nav aria-label="Navigation footer - Pages principales">
              <ul className="space-y-2">
                <li><Link href="/" className="nav-link hover:opacity-80 transition-colors rounded" style={{ color: '#f7f3e9' }}>Accueil</Link></li>
                <li><Link href="/mot-du-president" className="nav-link hover:opacity-80 transition-colors rounded" style={{ color: '#f7f3e9' }}>Mot du Président</Link></li>
                <li><Link href="/programmation" className="nav-link hover:opacity-80 transition-colors rounded" style={{ color: '#f7f3e9' }}>Programmation</Link></li>
                <li><Link href="/billetterie" className="nav-link hover:opacity-80 transition-colors rounded" style={{ color: '#f7f3e9' }}>Billetterie</Link></li>
              </ul>
            </nav>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#d4af37' }}>
              Informations
            </h4>
            <nav aria-label="Navigation footer - Informations">
              <ul className="space-y-2">
                <li><Link href="/benevoles" className="nav-link hover:opacity-80 transition-colors rounded" style={{ color: '#f7f3e9' }}>Devenir bénévole</Link></li>
                <li><Link href="/dossier-presse" className="nav-link hover:opacity-80 transition-colors rounded" style={{ color: '#f7f3e9' }}>Dossier de presse</Link></li>
                <li><Link href="/contact" className="nav-link hover:opacity-80 transition-colors rounded" style={{ color: '#f7f3e9' }}>Contact</Link></li>
                <li><Link href="/plan-site" className="nav-link hover:opacity-80 transition-colors rounded" style={{ color: '#f7f3e9' }}>Plan du site</Link></li>
              </ul>
            </nav>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#d4af37' }}>
              Contact
            </h4>
            <address className="space-y-3 not-italic">
              <div className="flex items-center space-x-3">
                <Mail size={16} style={{ color: '#d4af37' }} aria-hidden="true" />
                <a 
                  href="mailto:contact@jazzentech.com"
                  className="nav-link text-sm hover:opacity-80 transition-colors rounded" 
                  style={{ color: '#f7f3e9' }}
                >
                  contact@jazzentech.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} style={{ color: '#d4af37' }} aria-hidden="true" />
                <a 
                  href="tel:+33608758767"
                  className="nav-link text-sm hover:opacity-80 transition-colors rounded" 
                  style={{ color: '#f7f3e9' }}
                >
                  06 08 75 87 67
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} style={{ color: '#d4af37' }} aria-hidden="true" />
                <span className="text-sm" style={{ color: '#f7f3e9' }}>
                  Céret et Saint-Génis-des-Fontaines (66)
                </span>
              </div>
            </address>

            {/* CTA Billetterie dans footer */}
            <div className="mt-6">
              <Link
                href="/billetterie"
                className="inline-flex items-center px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105"
                style={{ 
                  background: 'linear-gradient(45deg, #d4af37, #b87333)', 
                  color: '#1a1a1a' 
                }}
              >
                <Ticket className="w-4 h-4 mr-2" />
                Billetterie
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8" style={{ borderTop: '1px solid #722f37' }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0" style={{ color: '#f7f3e9' }}>
              © 2025 Jazz en Tech. Tous droits réservés.
            </p>
            <nav aria-label="Liens légaux">
              <div className="flex space-x-6 text-sm">
                <Link href="/mentions-legales" className="nav-link hover:opacity-80 transition-colors rounded" style={{ color: '#f7f3e9' }}>
                  Mentions légales
                </Link>
                <Link href="/politique-confidentialite" className="nav-link hover:opacity-80 transition-colors rounded" style={{ color: '#f7f3e9' }}>
                  Confidentialité
                </Link>
                <Link href="/politique-cookies" className="nav-link hover:opacity-80 transition-colors rounded" style={{ color: '#f7f3e9' }}>
                  Cookies
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer