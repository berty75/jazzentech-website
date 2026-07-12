// PATH: src/app/dashboard/signature/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Loader2, PenLine, CheckCircle2, AlertTriangle, Trash2 } from 'lucide-react'
import DashboardShell from '@/components/DashboardShell'
import SignaturePad from '@/components/SignaturePad'

const BORDEAUX = '#722f37'
const OR = '#d4af37'
const CREME = '#f7f3e9'

export default function SignaturePage() {
  const [signature, setSignature] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState<{ ok: boolean; msg: string } | null>(null)

  const load = async () => {
    try {
      const res = await fetch('/api/signature')
      const data = await res.json()
      if (res.ok) setSignature(data.signature || null)
    } catch { /* silencieux */ }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const save = async (dataUrl: string) => {
    setSaving(true); setNotice(null)
    try {
      const res = await fetch('/api/signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl }),
      })
      const data = await res.json()
      if (!res.ok) setNotice({ ok: false, msg: data.error || 'Échec de l’enregistrement' })
      else {
        setNotice({ ok: true, msg: 'Signature enregistrée. Elle apparaîtra sur tous les prochains reçus fiscaux.' })
        setSignature(dataUrl)
      }
    } catch (e: any) { setNotice({ ok: false, msg: 'Erreur réseau : ' + e.message }) }
    finally { setSaving(false) }
  }

  const remove = async () => {
    setSaving(true); setNotice(null)
    try {
      const res = await fetch('/api/signature', { method: 'DELETE' })
      if (res.ok) {
        setSignature(null)
        setNotice({ ok: true, msg: 'Signature supprimée. Les reçus seront générés sans signature manuscrite.' })
      }
    } catch { /* silencieux */ }
    finally { setSaving(false) }
  }

  return (
    <DashboardShell>
      <div className="p-4 sm:p-6 md:p-10" style={{ maxWidth: '720px' }}>
        <div className="mb-6 flex items-center gap-3">
          <div style={{ width: '46px', height: '46px', borderRadius: '13px', background: `linear-gradient(135deg, ${BORDEAUX}, #8f3d47)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(114,47,55,0.25)' }}>
            <PenLine className="w-5 h-5" style={{ color: OR }} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl" style={{ fontWeight: 700, color: '#1a1a1a', fontFamily: "'Playfair Display', Georgia, serif" }}>Signature du président</h2>
            <p style={{ fontSize: '14px', color: '#8a8478' }}>Apposée automatiquement sur les reçus fiscaux Cerfa</p>
          </div>
        </div>

        <div className="rounded-2xl p-4 mb-6 flex items-start gap-3" style={{ background: CREME, border: '1px solid #e8dfc8' }}>
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#b8860b' }} />
          <p style={{ fontSize: '13px', color: '#7a5c00', margin: 0, lineHeight: 1.55 }}>
            Alain Brunet trace sa signature ci-dessous (souris, trackpad, ou doigt sur tablette). Elle est ensuite
            reproduite sur chaque reçu fiscal généré. Il s&apos;agit d&apos;une <strong>signature manuscrite numérisée</strong>,
            acceptée par l&apos;administration pour les reçus Cerfa — ce n&apos;est pas une signature électronique
            qualifiée au sens eIDAS (qui nécessiterait un prestataire certifié).
          </p>
        </div>

        <div className="rounded-3xl p-6 md:p-8" style={{ background: '#fff', border: '1px solid #ece7dd', boxShadow: '0 4px 24px rgba(26,26,26,0.04)' }}>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin" style={{ color: BORDEAUX }} />
            </div>
          ) : (
            <>
              <SignaturePad onSave={save} saving={saving} initial={signature} />

              {signature && (
                <div className="mt-6 pt-6" style={{ borderTop: '1px solid #f0ece3' }}>
                  <button onClick={remove} disabled={saving}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
                    style={{ background: 'transparent', color: '#c0392b', border: '1.5px solid #fecaca', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                    <Trash2 className="w-4 h-4" />Supprimer la signature enregistrée
                  </button>
                </div>
              )}
            </>
          )}

          {notice && (
            <div className="rounded-xl p-4 mt-5 flex items-start gap-3" style={{ background: notice.ok ? '#eef6ee' : '#fef2f2', border: `1px solid ${notice.ok ? '#c3e0c3' : '#fecaca'}` }}>
              {notice.ok ? <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: '#166534' }} /> : <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: '#991b1b' }} />}
              <p style={{ fontSize: '13.5px', margin: 0, color: notice.ok ? '#166534' : '#991b1b', lineHeight: 1.5 }}>{notice.msg}</p>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  )
}
