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
}

export default function Navigation({ mobile = false, onItemClick }: NavigationProps) {
  const pathname = usePathname()

  return (
    <nav>
      <ul className={mobile ? "space-y-2 pt-4" : "flex space-x-6"}>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onItemClick}
              className={`
                nav-link font-medium transition-all duration-300 hover:scale-105 rounded-lg
                ${mobile ? "block py-2 px-3" : "px-3 py-2"}
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