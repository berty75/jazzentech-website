// PATH: src/components/DatePicker.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Calendar, ChevronDown, Check } from 'lucide-react'

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
const DAYS = ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim']

// Mini menu déroulant maison (mois / année) — charte Jazz en Tech
function PickerDropdown({
  value, options, onChange, capitalize = false, width,
}: {
  value: number
  options: { value: number; label: string }[]
  onChange: (v: number) => void
  capitalize?: boolean
  width?: number   // largeur fixe : évite que « Décembre » pousse les chevrons hors du cadre
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    if (open) document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])
  const current = options.find((o) => o.value === value)
  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between gap-1"
        style={{
          border: `1px solid ${open ? '#722f37' : '#e8dfc8'}`, background: '#fff', color: '#722f37',
          fontWeight: 700, fontSize: '13px', borderRadius: '8px', padding: '5px 7px', cursor: 'pointer',
          textTransform: capitalize ? 'capitalize' : 'none', outline: 'none',
          width: width ? `${width}px` : undefined,
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {current?.label ?? ''}
        </span>
        <ChevronDown className="w-3 h-3 shrink-0" style={{ transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 60, background: '#fff',
          border: '1px solid #e8dfc8', borderRadius: '10px', boxShadow: '0 10px 28px rgba(26,26,26,0.18)',
          padding: '4px', maxHeight: '200px', overflowY: 'auto', minWidth: '100%',
        }}>
          {options.map((o) => {
            const active = o.value === value
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => { onChange(o.value); setOpen(false) }}
                className="w-full flex items-center justify-between gap-2"
                style={{
                  padding: '7px 10px', borderRadius: '7px', border: 'none',
                  background: active ? 'rgba(114,47,55,0.08)' : 'transparent',
                  color: active ? '#722f37' : '#1a1a1a', fontWeight: active ? 700 : 400,
                  fontSize: '13px', cursor: 'pointer', textAlign: 'left', whiteSpace: 'nowrap',
                  textTransform: capitalize ? 'capitalize' : 'none',
                }}
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = '#f7f3e9' }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                {o.label}
                {active && <Check className="w-3.5 h-3.5" style={{ color: '#722f37' }} />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

const iso = (d: Date) => {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}
const parse = (s: string) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, (m || 1) - 1, d || 1)
}
const fmt = (s: string) => {
  if (!s) return 'JJ/MM/AAAA'
  const [y, m, d] = s.split('-')
  return `${d}/${m}/${y}`
}
const clampToRange = (d: Date, min?: string, max?: string) => {
  let cur = iso(d)
  if (min && cur < min) return parse(min)
  if (max && cur > max) return parse(max)
  return d
}

export default function DatePicker({
  value,
  onChange,
  min,
  max,
  minYear = 2022,
}: {
  value: string
  onChange: (v: string) => void
  min?: string
  max?: string
  minYear?: number
}) {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState(() => (value ? parse(value) : new Date()))
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && value) setView(parse(value))
  }, [open, value])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  const year = view.getFullYear()
  const month = view.getMonth()
  const firstDay = new Date(year, month, 1)
  // getDay(): 0=dim..6=sam → on veut lun=0
  const offset = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (number | null)[] = []
  for (let i = 0; i < offset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const disabled = (d: number) => {
    const cur = iso(new Date(year, month, d))
    if (min && cur < min) return true
    if (max && cur > max) return true
    return false
  }

  const select = (d: number) => {
    onChange(iso(new Date(year, month, d)))
    setOpen(false)
  }

  const goMonth = (delta: number) => setView(clampToRange(new Date(year, month + delta, 1), min, max))
  const goYear = (delta: number) => setView(clampToRange(new Date(year + delta, month, 1), min, max))
  const setMonth = (m: number) => setView(clampToRange(new Date(year, m, 1), min, max))
  const setYear = (y: number) => setView(clampToRange(new Date(y, month, 1), min, max))

  const todayStr = iso(new Date())

  // Bornes années pour le menu déroulant
  const maxYear = max ? Number(max.slice(0, 4)) : new Date().getFullYear()
  const lowYear = min ? Number(min.slice(0, 4)) : minYear
  const years: number[] = []
  for (let y = lowYear; y <= Math.max(maxYear, year); y++) years.push(y)

  const navBtn: React.CSSProperties = { border: 'none', background: '#f7f3e9', cursor: 'pointer', borderRadius: '8px', padding: '5px', flexShrink: 0, lineHeight: 0 }

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
        style={{ border: '1px solid #ddd', background: '#fff', color: '#1a1a1a', cursor: 'pointer', minWidth: '150px' }}
      >
        <Calendar className="w-4 h-4" style={{ color: '#722f37' }} />
        {fmt(value)}
      </button>

      {open && (
        <div
          style={{
            position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 50,
            background: '#fff', border: '1px solid #e8dfc8', borderRadius: '14px',
            boxShadow: '0 12px 32px rgba(26,26,26,0.18)', padding: '14px', width: '340px',
          }}
        >
          {/* En-tête : navigation année + mois/année déroulants */}
          <div className="flex items-center justify-between mb-2" style={{ gap: '2px' }}>
            <div className="flex" style={{ gap: '2px', flexShrink: 0 }}>
              <button type="button" title="Année précédente" onClick={() => goYear(-1)} style={navBtn}>
                <ChevronsLeft className="w-4 h-4" style={{ color: '#722f37' }} />
              </button>
              <button type="button" title="Mois précédent" onClick={() => goMonth(-1)} style={navBtn}>
                <ChevronLeft className="w-4 h-4" style={{ color: '#722f37' }} />
              </button>
            </div>

            <div className="flex items-center" style={{ gap: '3px', minWidth: 0 }}>
              <PickerDropdown
                value={month}
                onChange={setMonth}
                capitalize
                width={104}
                options={MONTHS.map((m, i) => ({ value: i, label: m }))}
              />
              <PickerDropdown
                value={year}
                onChange={setYear}
                width={72}
                options={years.map((y) => ({ value: y, label: String(y) }))}
              />
            </div>

            <div className="flex" style={{ gap: '2px', flexShrink: 0 }}>
              <button type="button" title="Mois suivant" onClick={() => goMonth(1)} style={navBtn}>
                <ChevronRight className="w-4 h-4" style={{ color: '#722f37' }} />
              </button>
              <button type="button" title="Année suivante" onClick={() => goYear(1)} style={navBtn}>
                <ChevronsRight className="w-4 h-4" style={{ color: '#722f37' }} />
              </button>
            </div>
          </div>

          {/* Jours de la semaine */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px', marginBottom: '4px' }}>
            {DAYS.map((d) => (
              <div key={d} style={{ textAlign: 'center', fontSize: '11px', color: '#b87333', fontWeight: 600, padding: '4px 0' }}>{d}</div>
            ))}
          </div>

          {/* Grille jours */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px' }}>
            {cells.map((d, i) => {
              if (d === null) return <div key={i} />
              const cur = iso(new Date(year, month, d))
              const isSel = value === cur
              const isToday = todayStr === cur
              const off = disabled(d)
              return (
                <button
                  key={i}
                  type="button"
                  disabled={off}
                  onClick={() => select(d)}
                  style={{
                    aspectRatio: '1', border: 'none', borderRadius: '8px',
                    cursor: off ? 'not-allowed' : 'pointer',
                    background: isSel ? '#722f37' : 'transparent',
                    color: off ? '#ccc' : isSel ? '#fff' : '#1a1a1a',
                    fontWeight: isSel || isToday ? 700 : 400,
                    fontSize: '13px',
                    outline: isToday && !isSel ? '1px solid #d4af37' : 'none',
                  }}
                  onMouseEnter={(e) => { if (!off && !isSel) (e.target as HTMLElement).style.background = '#f7f3e9' }}
                  onMouseLeave={(e) => { if (!isSel) (e.target as HTMLElement).style.background = 'transparent' }}
                >
                  {d}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
