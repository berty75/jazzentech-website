import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-oxford-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-persian-blue mb-4">
              Jazz en Tech
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Le festival qui marie tradition jazz et innovation technologique.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-persian-blue transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-persian-blue transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-persian-blue transition-colors">
                <Twitter size={20} />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-persian-blue mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link href="/mot-du-president" className="text-gray-300 hover:text-white transition-colors">Mot du Président</Link></li>
              <li><Link href="/programmation" className="text-gray-300 hover:text-white transition-colors">Programmation</Link></li>
              <li><Link href="/artistes" className="text-gray-300 hover:text-white transition-colors">Artistes</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-persian-blue mb-4">
              Informations
            </h4>
            <ul className="space-y-2">
              <li><Link href="/benevoles" className="text-gray-300 hover:text-white transition-colors">Devenir bénévole</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/plan-site" className="text-gray-300 hover:text-white transition-colors">Plan du site</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-persian-blue mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-persian-blue" />
                <span className="text-gray-300 text-sm">contact@jazzentech.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-persian-blue" />
                <span className="text-gray-300 text-sm">Céret (66)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-penn-blue mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2025 Jazz en Tech. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/mentions-legales" className="text-gray-300 hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="text-gray-300 hover:text-white transition-colors">
                Confidentialité
              </Link>
              <Link href="/politique-cookies" className="text-gray-300 hover:text-white transition-colors">
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