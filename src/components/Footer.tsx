import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

function Footer() {
  return (
    <footer style={{ backgroundColor: '#1a1a1a' }} className="text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#d4af37' }}>
              Jazz en Tech
            </h3>
            <p className="mb-6 leading-relaxed" style={{ color: '#f7f3e9' }}>
              Le festival qui marie tradition jazz et innovation technologique.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:opacity-80 transition-colors" style={{ color: '#d4af37' }}>
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:opacity-80 transition-colors" style={{ color: '#d4af37' }}>
                <Instagram size={20} />
              </Link>
              <Link href="#" className="hover:opacity-80 transition-colors" style={{ color: '#d4af37' }}>
                <Twitter size={20} />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#d4af37' }}>
              Navigation
            </h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:opacity-80 transition-colors" style={{ color: '#f7f3e9' }}>Accueil</Link></li>
              <li><Link href="/mot-du-president" className="hover:opacity-80 transition-colors" style={{ color: '#f7f3e9' }}>Mot du Président</Link></li>
              <li><Link href="/programmation" className="hover:opacity-80 transition-colors" style={{ color: '#f7f3e9' }}>Programmation</Link></li>
              <li><Link href="/artistes" className="hover:opacity-80 transition-colors" style={{ color: '#f7f3e9' }}>Artistes</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#d4af37' }}>
              Informations
            </h4>
            <ul className="space-y-2">
              <li><Link href="/benevoles" className="hover:opacity-80 transition-colors" style={{ color: '#f7f3e9' }}>Devenir bénévole</Link></li>
              <li><Link href="/contact" className="hover:opacity-80 transition-colors" style={{ color: '#f7f3e9' }}>Contact</Link></li>
              <li><Link href="/plan-site" className="hover:opacity-80 transition-colors" style={{ color: '#f7f3e9' }}>Plan du site</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#d4af37' }}>
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={16} style={{ color: '#d4af37' }} />
                <span className="text-sm" style={{ color: '#f7f3e9' }}>contact@jazzentech.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} style={{ color: '#d4af37' }} />
                <span className="text-sm" style={{ color: '#f7f3e9' }}>Céret (66)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8" style={{ borderTop: '1px solid #722f37' }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0" style={{ color: '#f7f3e9' }}>
              © 2025 Jazz en Tech. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/mentions-legales" className="hover:opacity-80 transition-colors" style={{ color: '#f7f3e9' }}>
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="hover:opacity-80 transition-colors" style={{ color: '#f7f3e9' }}>
                Confidentialité
              </Link>
              <Link href="/politique-cookies" className="hover:opacity-80 transition-colors" style={{ color: '#f7f3e9' }}>
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer