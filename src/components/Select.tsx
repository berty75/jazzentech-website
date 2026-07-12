// PATH: src/components/Select.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'

export type SelectOption = { value: string; label: string; hint?: string }

// Menu déroulant maison — charte Jazz en Tech (bordeaux #722f37, or #d4af37, crème #f7f3e9)
export default function Select({
  value,
  onChange,
  options,
  placeholder = '— Choisir —',
  disabled = false,
  loading = false,
  compact = false,
}: {
  value: string
  onChange: (v: string) => void
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  compact?: boolean   // aligne la taille sur les champs de date (compta, billets)
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  const selected = options.find((o) => o.value === value)
  const isDisabled = disabled || loading

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        onClick={() => !isDisabled && setOpen((o) => !o)}
        disabled={isDisabled}
        className="w-full flex items-center justify-between gap-2"
        style={{
          padding: compact ? '8px 12px' : '11px 14px',
          borderRadius: compact ? '8px' : '12px',
          border: compact
            ? `1px solid ${open ? '#722f37' : '#ddd'}`
            : `1.5px solid ${open ? '#722f37' : '#e3ddd0'}`,
          background: isDisabled ? '#f6f4ef' : '#fff',
          color: selected ? '#1a1a1a' : '#9a9488',
          fontSize: '14px',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          textAlign: 'left',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          boxShadow: open ? '0 0 0 3px rgba(114,47,55,0.08)' : 'none',
          outline: 'none',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
          {loading ? 'Chargement…' : selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className="w-4 h-4 shrink-0"
          style={{ color: '#722f37', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}
        />
      </button>

      {open && !isDisabled && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            zIndex: 50,
            background: '#fff',
            border: '1px solid #e3ddd0',
            borderRadius: '14px',
            boxShadow: '0 16px 40px rgba(26,26,26,0.16)',
            padding: '6px',
            maxHeight: '280px',
            overflowY: 'auto',
            animation: 'jetSelectIn 0.14s ease-out',
          }}
        >
          <style>{`
            @keyframes jetSelectIn {
              from { opacity: 0; transform: translateY(-4px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          {options.length === 0 && (
            <div style={{ padding: '12px 14px', fontSize: '13px', color: '#9a9488' }}>Aucune option</div>
          )}
          {options.map((o) => {
            const active = o.value === value
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => { onChange(o.value); setOpen(false) }}
                className="w-full flex items-center justify-between gap-2"
                style={{
                  padding: '10px 12px',
                  borderRadius: '9px',
                  border: 'none',
                  background: active ? 'rgba(114,47,55,0.08)' : 'transparent',
                  color: active ? '#722f37' : '#1a1a1a',
                  fontSize: '14px',
                  fontWeight: active ? 600 : 400,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.12s',
                }}
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = '#f7f3e9' }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {o.label}
                  {o.hint && <span style={{ color: '#b87333', fontWeight: 400 }}> · {o.hint}</span>}
                </span>
                {active && <Check className="w-4 h-4 shrink-0" style={{ color: '#722f37' }} />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
