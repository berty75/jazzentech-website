// PATH: src/components/Navigation.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Labels : full = affiché à xl+, short = affiché à lg uniquement
const navItems = [
  { href: '/accueil', label: 'Accueil', short: 'Accueil' },
  { href: '/mot-du-president', label: 'Mot du Président', short: 'Président' },
  { href: '/programmation', label: 'Programme', short: 'Programme' },
  { href: '/soutenir', label: 'Soutenir', short: 'Soutenir' },
  { href: '/galerie', label: 'Galerie Photos', short: 'Galerie' },
  { href: '/benevoles', label: 'Bénévoles', short: 'Bénévoles' },
  { href: '/dossier-presse', label: 'Presse', short: 'Presse' },
  { href: '/contact', label: 'Contact', short: 'Contact' },
]

interface NavigationProps {
  mobile?: boolean
  onItemClick?: () => void
  compact?: boolean
  isScrolled?: boolean
}

export default function Navigation({ mobile = false, onItemClick, compact = false, isScrolled = false }: NavigationProps) {
  const pathname = usePathname()

  return (
    <nav>
      <ul className={
        mobile
          ? (compact
            ? "grid grid-cols-2 gap-x-4 gap-y-1 pt-2"
            : "space-y-2 pt-4"
          )
          : "flex items-center space-x-0.5 xl:space-x-1"
      }>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onItemClick}
              className={`
                nav-link font-medium transition-all duration-300 hover:scale-105 rounded-lg whitespace-nowrap
                ${mobile
                  ? (compact
                    ? "block py-1 px-2 text-sm text-center"
                    : "block py-2 px-3"
                  )
                  : "px-2 py-1.5 xl:px-3 xl:py-2 text-xs xl:text-sm"
                }
                ${pathname === item.href
                  ? "font-bold"
                  : "hover:opacity-80"
                }
              `}
              style={{
                color: pathname === item.href
                  ? (isScrolled || mobile ? '#d4af37' : '#ffffff')
                  : '#f7f3e9',
                backgroundColor: mobile && pathname === item.href ? 'rgba(90, 30, 37, 0.6)' : 'transparent',
                textDecoration: pathname === item.href && !isScrolled && !mobile ? 'underline' : 'none',
                textUnderlineOffset: '4px',
              }}
            >
              {mobile ? (
                item.label
              ) : (
                <>
                  <span className="lg:inline xl:hidden">{item.short}</span>
                  <span className="hidden xl:inline">{item.label}</span>
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}