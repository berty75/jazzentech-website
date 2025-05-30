'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/mot-du-president', label: 'Mot du Président' },
  { href: '/programmation', label: 'Programmation' },
  { href: '/artistes', label: 'Artistes' },
  { href: '/benevoles', label: 'Bénévoles' },
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
                font-medium transition-colors
                ${mobile ? "block py-2" : ""}
                ${pathname === item.href 
                  ? "text-yellow-400" 
                  : "text-white hover:text-yellow-400"
                }
              `}
              style={{
                color: pathname === item.href ? '#E6A824' : 'white'
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