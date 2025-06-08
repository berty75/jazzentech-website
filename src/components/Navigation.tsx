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
  compact?: boolean // Mode paysage
}

export default function Navigation({ mobile = false, onItemClick, compact = false }: NavigationProps) {
  const pathname = usePathname()

  return (
    <nav>
      <ul className={
        mobile 
          ? (compact 
              ? "grid grid-cols-2 gap-x-4 gap-y-1 pt-2" // 2 COLONNES en paysage
              : "space-y-2 pt-4"                         // 1 colonne en portrait
            )
          : "flex space-x-6"                             // Desktop normal
      }>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onItemClick}
              className={`
                nav-link font-medium transition-all duration-300 hover:scale-105 rounded-lg
                ${mobile 
                  ? (compact 
                      ? "block py-1 px-2 text-sm text-center" // Compact + centré
                      : "block py-2 px-3"                     // Mobile normal
                    )
                  : "px-3 py-2"                               // Desktop
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