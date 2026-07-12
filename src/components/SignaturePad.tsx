// PATH: src/components/SignaturePad.tsx
'use client'

import { useRef, useState, useEffect } from 'react'
import { Eraser, Check, Loader2 } from 'lucide-react'

const BORDEAUX = '#722f37'
const CREME = '#f7f3e9'

type Props = {
  onSave: (dataUrl: string) => Promise<void> | void
  saving?: boolean
  initial?: string | null
}

// Pad de signature : Alain dessine à la souris (ou au doigt sur tablette).
// Rend un PNG transparent (dataURL) prêt à être inséré dans le PDF Cerfa.
export default function SignaturePad({ onSave, saving = false, initial = null }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawing, setDrawing] = useState(false)
  const [hasInk, setHasInk] = useState(false)

  // Prépare le canvas (haute résolution pour un trait net dans le PDF)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ratio = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * ratio
    canvas.height = rect.height * ratio
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(ratio, ratio)
    ctx.lineWidth = 2.2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#1a1a1a'
  }, [])

  const pos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const p = 'touches' in e ? e.touches[0] : (e as React.MouseEvent)
    return { x: p.clientX - rect.left, y: p.clientY - rect.top }
  }

  const start = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const { x, y } = pos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    setDrawing(true)
    setHasInk(true)
  }

  const move = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return
    e.preventDefault()
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const { x, y } = pos(e)
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const end = () => setDrawing(false)

  const clear = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasInk(false)
  }

  const save = async () => {
    const canvas = canvasRef.current
    if (!canvas || !hasInk) return
    // PNG à fond transparent → s'intègre proprement au PDF
    await onSave(canvas.toDataURL('image/png'))
  }

  return (
    <div>
      {initial && !hasInk && (
        <div className="mb-4">
          <p style={{ fontSize: '12px', color: '#8a8478', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
            Signature actuelle
          </p>
          <div className="rounded-xl p-3 inline-block" style={{ background: '#fff', border: '1px solid #ece7dd' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={initial} alt="Signature enregistrée" style={{ height: '60px', display: 'block' }} />
          </div>
        </div>
      )}

      <p style={{ fontSize: '12px', color: '#8a8478', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
        {initial ? 'Nouvelle signature' : 'Signez dans le cadre'}
      </p>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: `2px dashed ${hasInk ? BORDEAUX : '#d8d2c6'}`, background: '#fff', position: 'relative', transition: 'border-color 0.2s' }}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
          onTouchStart={start} onTouchMove={move} onTouchEnd={end}
          style={{ width: '100%', height: '180px', display: 'block', cursor: 'crosshair', touchAction: 'none' }}
        />
        {!hasInk && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <span style={{ color: '#c9c2b4', fontSize: '14px', fontStyle: 'italic' }}>Tracez la signature ici</span>
          </div>
        )}
        {/* ligne de signature */}
        <div style={{ position: 'absolute', bottom: '38px', left: '32px', right: '32px', height: '1px', background: '#ece7dd', pointerEvents: 'none' }} />
      </div>

      <div className="flex gap-3 mt-4">
        <button type="button" onClick={clear} disabled={!hasInk}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl"
          style={{ background: 'transparent', color: hasInk ? '#8a8478' : '#c9c2b4', border: '1.5px solid #e3ddd0', fontWeight: 600, fontSize: '14px', cursor: hasInk ? 'pointer' : 'not-allowed' }}>
          <Eraser className="w-4 h-4" />Effacer
        </button>
        <button type="button" onClick={save} disabled={!hasInk || saving}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl"
          style={{ background: hasInk && !saving ? `linear-gradient(135deg, ${BORDEAUX}, #8f3d47)` : '#d8d2c6', color: '#fff', border: 'none', fontWeight: 600, fontSize: '14px', cursor: hasInk && !saving ? 'pointer' : 'not-allowed', boxShadow: hasInk && !saving ? '0 6px 16px rgba(114,47,55,0.25)' : 'none' }}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          {saving ? 'Enregistrement…' : 'Enregistrer la signature'}
        </button>
      </div>

      <p style={{ fontSize: '12px', color: '#8a8478', marginTop: '12px', lineHeight: 1.5, background: CREME, padding: '10px 12px', borderRadius: '10px' }}>
        Cette signature sera apposée automatiquement sur tous les reçus fiscaux Cerfa générés.
        Utilisez une souris, un trackpad, ou votre doigt sur tablette.
      </p>
    </div>
  )
}
