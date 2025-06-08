'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/mot-du-president', label: 'Mot du Président' },
  { href: '/programmation', label: 'Programme' },
  { href: '/benevoles', label: 'Bénévoles' },
  { href: '/dossier-presse', label: 'Presse' },
  { href: '/contact', label: 'Contact' },
]

interface NavigationProps {
  mobile?: boolean
  onItemClick?: () => void
  compact?: boolean // NOUVEAU : pour le mode paysage
}

export default function Navigation({ mobile = false, onItemClick, compact = false }: NavigationProps) {
  const pathname = usePathname()

  return (
    <nav>
      <ul className={mobile ? (compact ? "space-y-1 pt-2" : "space-y-2 pt-4") : "flex space-x-6"}>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onItemClick}
              className={`
                nav-link font-medium transition-all duration-300 hover:scale-105 rounded-lg
                ${mobile 
                  ? (compact 
                      ? "block py-1 px-3 text-sm" // Mode paysage compact
                      : "block py-2 px-3"         // Mode mobile normal
                    )
                  : "px-3 py-2"                   // Mode desktop
                }
                ${pathname === item.href 
                  ? "font-bold" 
                  : "hover:opacity-80"
                }
              `}
              style={{
                color: pathname === item.href ? '#d4af37' : '#f7f3e9',
                backgroundColor: mobile && pathname === item.href ? 'rgba(212, 175, 55, 0.1)' : 'transparent'
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}