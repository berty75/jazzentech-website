// PATH: src/app/dashboard/settings/page.tsx
'use client'

import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import DashboardShell from '@/components/DashboardShell'

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    if (newPassword !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas')
      setIsError(true)
      return
    }
    if (newPassword.length < 8) {
      setMessage('Minimum 8 caractères')
      setIsError(true)
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      const data = await res.json()
      if (res.ok) {
        setMessage('Mot de passe changé avec succès.')
        setIsError(false)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        setMessage(data.error || 'Erreur')
        setIsError(true)
      }
    } catch {
      setMessage('Erreur réseau')
      setIsError(true)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', height: '44px', padding: '0 14px', fontSize: '14px',
    color: '#1a1a1a', background: '#f7f6f3', border: '1px solid #ddd',
    borderRadius: '8px', outline: 'none', boxSizing: 'border-box',
  }

  return (
    <DashboardShell>
      <div className="p-4 sm:p-6 md:p-10 max-w-2xl">
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl" style={{ fontWeight: 700, color: '#1a1a1a' }}>Paramètres</h2>
          <p style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>Gestion du compte administrateur</p>
        </div>

        <div className="rounded-xl p-4 sm:p-6" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '20px' }}>Changer le mot de passe</h3>

          {message && (
            <div className="mb-4 rounded-lg p-3 flex items-center gap-2"
              style={{ background: isError ? '#fef2f2' : '#f0fdf4', border: `1px solid ${isError ? '#fecaca' : '#bbf7d0'}` }}>
              {isError ? <AlertCircle className="w-4 h-4 shrink-0" style={{ color: '#991b1b' }} /> : <CheckCircle className="w-4 h-4 shrink-0" style={{ color: '#166534' }} />}
              <p style={{ color: isError ? '#991b1b' : '#166534', fontSize: '13px', margin: 0 }}>{message}</p>
            </div>
          )}

          <div onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#555', marginBottom: '6px', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                Mot de passe actuel
              </label>
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                required style={inputStyle} />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#555', marginBottom: '6px', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                Nouveau mot de passe
              </label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 8 caractères" required style={inputStyle} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#555', marginBottom: '6px', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                Confirmer le nouveau mot de passe
              </label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                required style={inputStyle} />
            </div>

            <button onClick={handleSubmit} disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm w-full sm:w-auto"
              style={{ background: '#722f37', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', opacity: loading ? 0.6 : 1 }}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Changer le mot de passe'}
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}