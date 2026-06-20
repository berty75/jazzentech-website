// PATH: src/components/OfficeTourismeSaintGenis.tsx
import { Ticket, ArrowUpRight, MapPin } from 'lucide-react'

const OT_BASE =
  'https://boutique.tourisme-pyrenees-mediterranee.com/evenements/festival-jazzentech-au-cloitre-saint-genis-des-fontaines'

type OTLink = {
  day?: string
  month?: string
  pass?: boolean
  title: string
  subtitle: string
  meta: string
  href: string
}

const links: OTLink[] = [
  {
    pass: true,
    title: 'Les 2 concerts de Saint-Génis',
    subtitle: 'Cécile L. Recchia Quintet + Knobil Trio',
    meta: '26 & 27 juillet',
    href: OT_BASE,
  },
  {
    day: '26',
    month: 'JUIL',
    title: 'Cecil L. Recchia Quintet',
    subtitle: '« sings Django Reinhardt »',
    meta: 'Samedi 26 juillet',
    href: `${OT_BASE}/26-07-cecile-l-recchia-quintet-sings-django-reinhardt`,
  },
  {
    day: '27',
    month: 'JUIL',
    title: 'Knobil Trio',
    subtitle: '« Chanson et Jazz pailleté »',
    meta: 'Dimanche 27 juillet',
    href: `${OT_BASE}/27-07-knobil-trio-chanson-et-jazz-paillete`,
  },
]

export default function OfficeTourismeSaintGenis() {
  return (
    <section
      aria-labelledby="ot-saint-genis-heading"
      className="rounded-2xl p-6 md:p-8"
      style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
    >
      {/* En-tête */}
      <div className="flex items-start gap-4 mb-6">
        <div
          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', border: '1px solid rgba(212, 175, 55, 0.35)' }}
        >
          <Ticket className="w-6 h-6" style={{ color: '#d4af37' }} aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-1" style={{ color: '#b87333' }}>
            Cloître de Saint-Génis-des-Fontaines
          </p>
          <h3 id="ot-saint-genis-heading" className="text-lg md:text-xl font-bold text-white leading-snug">
            Billetterie Office de Tourisme
          </h3>
        </div>
      </div>

      <p className="text-sm mb-6 leading-relaxed" style={{ color: '#f7f3e9', opacity: 0.85 }}>
        Les deux concerts du cloître sont aussi en vente auprès de l&apos;Office de Tourisme
        Pyrénées-Méditerranée.
      </p>

      {/* Liens */}
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ot-card group flex items-center gap-4 p-4 rounded-xl transition-colors duration-200"
              style={{
                backgroundColor: l.pass ? 'rgba(212, 175, 55, 0.10)' : 'rgba(114, 47, 55, 0.40)',
                border: l.pass ? '1px solid rgba(212, 175, 55, 0.45)' : '1px solid rgba(212, 175, 55, 0.20)',
              }}
            >
              {/* Pastille date / pass */}
              {l.pass ? (
                <span
                  className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-lg font-bold"
                  style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
                >
                  <Ticket className="w-6 h-6" aria-hidden="true" />
                </span>
              ) : (
                <span
                  className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-lg"
                  style={{ backgroundColor: 'rgba(26, 26, 26, 0.55)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
                >
                  <span className="text-xl font-bold leading-none" style={{ color: '#d4af37' }}>{l.day}</span>
                  <span className="text-[10px] font-semibold tracking-wide mt-0.5" style={{ color: '#b87333' }}>{l.month}</span>
                </span>
              )}

              {/* Texte */}
              <span className="flex-grow min-w-0">
                <span className="block font-bold text-white text-sm md:text-base truncate">{l.title}</span>
                <span className="block text-xs md:text-sm truncate" style={{ color: '#f7f3e9', opacity: 0.85 }}>
                  {l.subtitle}
                </span>
                <span className="flex items-center gap-1 text-[11px] mt-1" style={{ color: '#b87333' }}>
                  <MapPin className="w-3 h-3" aria-hidden="true" /> {l.meta}
                </span>
              </span>

              {/* CTA */}
              <span
                className="ot-cta flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                style={{
                  backgroundColor: l.pass ? '#d4af37' : 'transparent',
                  color: l.pass ? '#1a1a1a' : '#d4af37',
                  border: l.pass ? '1px solid #d4af37' : '1px solid rgba(212, 175, 55, 0.4)',
                }}
              >
                <span className="hidden sm:inline">Réserver</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <style>{`
        .ot-card:hover { border-color: rgba(212, 175, 55, 0.6) !important; }
        .ot-card:hover .ot-cta { background-color: #d4af37 !important; color: #1a1a1a !important; border-color: #d4af37 !important; }
      `}</style>
    </section>
  )
}
