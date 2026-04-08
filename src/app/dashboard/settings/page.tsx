// PATH: src/app/dashboard/settings/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, LayoutDashboard, Heart, FileText, Mail, Settings, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'

const nav = [
  { href: '/dashboard', label: 'Vue d\'ensemble', icon: LayoutDashboard },
  { href: '/dashboard/dons', label: 'Dons', icon: Heart },
  { href: '/dashboard/cerfa', label: 'Cerfa', icon: FileText },
  { href: '/dashboard/messagerie', label: 'Messagerie', icon: Mail },
  { href: '/dashboard/settings', label: 'Paramètres', icon: Settings },
]

export default function SettingsPage() {
  const router = useRouter()
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
      setMessage('Minimum 8 caracteres')
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
        setMessage('Mot de passe change. Relancez le serveur (npm run dev) pour appliquer.')
        setIsError(false)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        setMessage(data.error || 'Erreur')
        setIsError(true)
      }
    } catch {
      setMessage('Erreur reseau')
      setIsError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' })
    router.push('/dashboard/login')
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', height: '44px', padding: '0 14px', fontSize: '14px',
    color: '#1a1a1a', background: '#f7f6f3', border: '1px solid #ddd',
    borderRadius: '8px', outline: 'none', boxSizing: 'border-box',
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#f5f3ef' }}>
      <aside className="hidden md:flex flex-col w-[240px] border-r" style={{ background: '#fff', borderColor: '#e5e2dc' }}>
        <div className="px-6 py-5 border-b" style={{ borderColor: '#e5e2dc' }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '16px', fontWeight: 700, color: '#1a1a1a', letterSpacing: '0.04em' }}>JAZZ EN TECH</h1>
          <p style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>Administration</p>
        </div>
        <nav className="flex-1 px-3 py-4">
          {nav.map((item) => {
            const active = item.href === '/dashboard/settings'
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-colors"
                style={{ background: active ? 'rgba(114,47,55,0.08)' : 'transparent', color: active ? '#722f37' : '#666', fontWeight: active ? 600 : 400, textDecoration: 'none' }}>
                <item.icon className="w-4 h-4" /> {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="px-3 py-4 border-t" style={{ borderColor: '#e5e2dc' }}>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-sm"
            style={{ color: '#999', background: 'none', border: 'none', cursor: 'pointer' }}>
            <LogOut className="w-4 h-4" /> Deconnexion
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-10 max-w-2xl">
          <div className="mb-8">
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a1a1a' }}>Parametres</h2>
            <p style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>Gestion du compte administrateur</p>
          </div>

          <div className="rounded-xl p-6" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '20px' }}>Changer le mot de passe</h3>

            {message && (
              <div className="mb-4 rounded-lg p-3 flex items-center gap-2"
                style={{ background: isError ? '#fef2f2' : '#f0fdf4', border: `1px solid ${isError ? '#fecaca' : '#bbf7d0'}` }}>
                {isError ? <AlertCircle className="w-4 h-4" style={{ color: '#991b1b' }} /> : <CheckCircle className="w-4 h-4" style={{ color: '#166534' }} />}
                <p style={{ color: isError ? '#991b1b' : '#166534', fontSize: '13px', margin: 0 }}>{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#555', marginBottom: '6px', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                  Mot de passe actuel
                </label>
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                  required style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = '#722f37')}
                  onBlur={(e) => (e.target.style.borderColor = '#ddd')} />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#555', marginBottom: '6px', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                  Nouveau mot de passe
                </label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 caracteres" required style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = '#722f37')}
                  onBlur={(e) => (e.target.style.borderColor = '#ddd')} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#555', marginBottom: '6px', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                  Confirmer le nouveau mot de passe
                </label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  required style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = '#722f37')}
                  onBlur={(e) => (e.target.style.borderColor = '#ddd')} />
              </div>

              <button type="submit" disabled={loading}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 24px', background: '#722f37', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', opacity: loading ? 0.6 : 1 }}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Changer le mot de passe'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}