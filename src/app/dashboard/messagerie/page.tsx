// PATH: src/app/dashboard/messagerie/page.tsx
'use client'

import { Loader2, Send, Plus, X, Bold, Italic, Link2, Image, AlignLeft, AlignCenter, Type, Palette, Users, Search, List, ListOrdered } from 'lucide-react'
import { useState, useRef, useCallback, useEffect } from 'react'
import DashboardShell from '@/components/DashboardShell'

const editorColors = ['#722f37', '#d4af37', '#b87333', '#1a1a1a', '#16a34a', '#2563eb', '#dc2626', '#ffffff']

type Contact = { _id: string; firstName: string; lastName: string; email: string; editions: string[]; unsubscribed: boolean }

type FormatState = {
  bold: boolean; italic: boolean; justifyLeft: boolean; justifyCenter: boolean;
  insertUnorderedList: boolean; insertOrderedList: boolean;
}

export default function MessageriePage() {
  const editorRef = useRef<HTMLDivElement>(null)
  const [subject, setSubject] = useState('')
  const [recipientInput, setRecipientInput] = useState('')
  const [recipients, setRecipients] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ sent: number; errors: number; results?: any[] } | null>(null)
  const [error, setError] = useState('')
  const [showSource, setShowSource] = useState(false)
  const [htmlSource, setHtmlSource] = useState('')
  const [showColors, setShowColors] = useState(false)
  const [editorContent, setEditorContent] = useState('')
  const [formatState, setFormatState] = useState<FormatState>({
    bold: false, italic: false, justifyLeft: false, justifyCenter: false,
    insertUnorderedList: false, insertOrderedList: false,
  })

  const [contacts, setContacts] = useState<Contact[]>([])
  const [showContacts, setShowContacts] = useState(false)
  const [contactSearch, setContactSearch] = useState('')
  const [contactFilter, setContactFilter] = useState('')

  useEffect(() => {
    fetch('/api/contacts').then(r => r.json()).then(d => {
      if (Array.isArray(d)) setContacts(d.filter(c => !c.unsubscribed))
    }).catch(() => {})
  }, [])

  const updateFormatState = useCallback(() => {
    setFormatState({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
    })
  }, [])

  const syncContent = useCallback(() => {
    setEditorContent(editorRef.current?.innerHTML || '')
    updateFormatState()
  }, [updateFormatState])

  const exec = useCallback((cmd: string, val?: string) => {
    document.execCommand(cmd, false, val)
    editorRef.current?.focus()
    setTimeout(syncContent, 10)
  }, [syncContent])

  const insertAtCursor = useCallback((html: string) => {
    editorRef.current?.focus()
    document.execCommand('insertHTML', false, html)
    setTimeout(syncContent, 10)
  }, [syncContent])

  const openButtonModal = () => {
    const url = window.prompt('URL du bouton :', 'https://jazzentech.com/billetterie')
    if (!url) return
    const text = window.prompt('Texte du bouton :', 'Réserver mes places')
    if (!text) return
    insertAtCursor('<p><a href="' + url + '" style="display:inline-block;background:#722f37;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">' + text + '</a></p><p><br></p>')
  }

  const openImageModal = () => {
    const url = window.prompt("URL de l'image :", 'https://')
    if (!url) return
    insertAtCursor('<p><img src="' + url + '" style="max-width:100%;border-radius:8px;" /></p><p><br></p>')
  }

  const openLinkModal = () => {
    const url = window.prompt('URL du lien :', 'https://jazzentech.com')
    if (!url) return
    const text = window.prompt('Texte du lien :', 'Cliquez ici')
    if (!text) return
    insertAtCursor('<a href="' + url + '" style="color:#722f37;text-decoration:underline;">' + text + '</a> ')
  }

  const insertDivider = () => insertAtCursor('<hr style="border:none;border-top:1px solid #e5e2dc;margin:16px 0;" />')

  const addRecipient = (email?: string) => {
    const e = (email || recipientInput).trim().toLowerCase()
    if (e && e.includes('@') && !recipients.includes(e)) {
      setRecipients([...recipients, e])
      if (!email) setRecipientInput('')
    }
  }

  const removeRecipient = (email: string) => setRecipients(recipients.filter(r => r !== email))

  const addAllFiltered = () => {
    const newEmails = filteredContacts.map(c => c.email).filter(e => !recipients.includes(e))
    setRecipients([...recipients, ...newEmails])
    setShowContacts(false)
  }

  const prepareHtmlForEmail = (html: string): string => {
    return html
      .replace(/<ul>/g, '<ul style="padding-left:24px;margin:12px 0;list-style-type:disc;">')
      .replace(/<ol>/g, '<ol style="padding-left:24px;margin:12px 0;list-style-type:decimal;">')
      .replace(/<li>/g, '<li style="margin-bottom:6px;">')
      .replace(/<h2>/g, '<h2 style="font-size:20px;font-weight:700;margin:16px 0 8px;color:#1a1a1a;">')
      .replace(/<img /g, '<img style="max-width:100%;border-radius:8px;display:block;margin:12px 0;" ')
  }

  const getRawContent = () => {
    if (showSource) return htmlSource
    return editorContent || editorRef.current?.innerHTML || ''
  }

  const getPreviewHtml = () => {
    const content = prepareHtmlForEmail(getRawContent())
    return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:linear-gradient(135deg,#722f37,#b87333,#d4af37);padding:32px 24px;text-align:center;border-radius:12px 12px 0 0;">
        <img src="https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_120/jazz_en_tech_logo_smkogd.png" width="60" height="60" alt="Jazz en Tech" style="display:block;margin:0 auto 12px;" />
        <h1 style="color:#fff;margin:0;font-size:24px;font-weight:700;font-family:Georgia,serif;">Jazz en Tech 2026</h1>
        <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">11eme edition - Ceret & Saint-Genis-des-Fontaines</p>
      </div>
      <div style="padding:32px 28px;background:#fff;border:1px solid #e5e2dc;border-top:none;border-radius:0 0 12px 12px;font-size:15px;line-height:1.7;color:#333;">${content}</div>
      <p style="text-align:center;color:#999;font-size:12px;margin-top:16px;">Association Jazz en Tech - Ceret (66)<br/>
      <a href="https://jazzentech.com" style="color:#722f37;">jazzentech.com</a></p>
    </div>`
  }

  const handleSend = async () => {
    const finalRecipients = [...recipients]
    const pending = recipientInput.trim()
    if (pending && pending.includes('@') && !finalRecipients.includes(pending)) {
      finalRecipients.push(pending)
      setRecipients(finalRecipients)
      setRecipientInput('')
    }
    if (!subject || !finalRecipients.length) { setError('Ajoutez un objet et au moins un destinataire'); return }
    const content = getRawContent()
    if (!content.trim()) { setError('Ecrivez votre message'); return }
    setLoading(true); setError(''); setResult(null)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, html: prepareHtmlForEmail(content), recipients: finalRecipients }),
      })
      const data = await res.json()
      if (res.ok) {
        setResult(data)
        if (data.errors > 0) {
          const errs = data.results?.filter((r: any) => r.status === 'error').map((r: any) => r.email + ': ' + r.error).join(', ')
          setError(errs || 'Erreurs lors de l\'envoi')
        }
      } else setError(data.error || 'Erreur')
    } catch { setError('Erreur reseau') }
    finally { setLoading(false) }
  }

  const years = [...new Set(contacts.flatMap(c => c.editions || []))].sort()

  const filteredContacts = contacts.filter(c => {
    const match = !contactSearch || `${c.firstName} ${c.lastName} ${c.email}`.toLowerCase().includes(contactSearch.toLowerCase())
    const matchYear = !contactFilter || c.editions?.includes(contactFilter)
    return match && matchYear
  })

  const labelStyle: React.CSSProperties = { display: 'block', fontSize: '12px', fontWeight: 600, color: '#555', marginBottom: '8px', letterSpacing: '0.03em', textTransform: 'uppercase' }
  const inputStyle: React.CSSProperties = { width: '100%', height: '44px', padding: '0 14px', fontSize: '14px', color: '#1a1a1a', background: '#f7f6f3', border: '1px solid #ddd', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }

  const getToolBtn = (active: boolean): React.CSSProperties => ({
    background: active ? '#f0eee9' : 'none',
    border: active ? '2px solid #722f37' : '1px solid #e5e2dc',
    borderRadius: '6px',
    padding: '6px 8px',
    cursor: 'pointer',
    color: active ? '#722f37' : '#555',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: active ? 700 : 400,
  })

  const toolBtn = getToolBtn(false)

  return (
    <DashboardShell>
      <div className="p-4 sm:p-6 md:p-10 max-w-4xl">
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl" style={{ fontWeight: 700, color: '#1a1a1a' }}>Nouvelle newsletter</h2>
          <p style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>Composez et envoyez votre email</p>
        </div>

        {/* Recipients */}
        <div className="mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <label style={labelStyle}>Destinataires ({recipients.length})</label>
            <button onClick={() => setShowContacts(!showContacts)}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md self-start"
              style={{ color: '#722f37', background: 'none', border: '1px solid #722f37', cursor: 'pointer' }}>
              <Users className="w-3 h-3" /> {showContacts ? 'Masquer contacts' : 'Choisir depuis la base'}
            </button>
          </div>

          <div className="flex gap-2">
            <input type="email" value={recipientInput} onChange={(e) => setRecipientInput(e.target.value)}
              placeholder="email@exemple.com" style={{ ...inputStyle, flex: 1 }}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addRecipient() } }} />
            <button onClick={() => addRecipient()}
              className="flex items-center gap-1 px-3 sm:px-4 rounded-lg text-sm shrink-0"
              style={{ background: '#722f37', color: '#fff', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Ajouter</span>
            </button>
          </div>

          {showContacts && (
            <div className="mt-3 rounded-xl p-3 sm:p-4" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
              <div className="flex flex-col sm:flex-row gap-2 mb-3">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#999' }} />
                  <input type="text" value={contactSearch} onChange={(e) => setContactSearch(e.target.value)}
                    placeholder="Rechercher..." style={{ ...inputStyle, paddingLeft: '36px', height: '36px', fontSize: '13px' }} />
                </div>
                <div className="flex gap-2">
                  <select value={contactFilter} onChange={(e) => setContactFilter(e.target.value)}
                    style={{ height: '36px', padding: '0 10px', fontSize: '12px', background: '#f7f6f3', border: '1px solid #ddd', borderRadius: '6px', color: '#555' }}>
                    <option value="">Toutes editions</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                  <button onClick={addAllFiltered}
                    className="text-xs px-3 rounded-md shrink-0"
                    style={{ background: '#722f37', color: '#fff', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    + Tous ({filteredContacts.length})
                  </button>
                </div>
              </div>
              <div style={{ maxHeight: '200px', overflow: 'auto' }}>
                {filteredContacts.slice(0, 50).map(c => {
                  const added = recipients.includes(c.email)
                  return (
                    <div key={c._id} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-gray-50 gap-2" style={{ fontSize: '13px' }}>
                      <div className="min-w-0">
                        <span className="truncate block sm:inline" style={{ fontWeight: 500, color: '#1a1a1a' }}>{c.firstName} {c.lastName}</span>
                        <span className="truncate block sm:inline sm:ml-2" style={{ color: '#999', fontSize: '12px' }}>{c.email}</span>
                      </div>
                      {added ? (
                        <span className="shrink-0 text-xs" style={{ color: '#16a34a' }}>Ajoute</span>
                      ) : (
                        <button onClick={() => addRecipient(c.email)}
                          className="shrink-0 text-xs px-2 py-0.5 rounded"
                          style={{ color: '#722f37', background: 'none', border: '1px solid #e5e2dc', cursor: 'pointer' }}>
                          + Ajouter
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {recipients.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {recipients.slice(0, 20).map((r) => (
                <span key={r} className="flex items-center gap-1 rounded-full px-3 py-1 text-xs sm:text-sm" style={{ background: '#f0eee9', color: '#555' }}>
                  <span className="truncate max-w-[150px] sm:max-w-none">{r}</span>
                  <button onClick={() => removeRecipient(r)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px', color: '#999' }}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {recipients.length > 20 && (
                <span className="rounded-full px-3 py-1 text-sm" style={{ background: '#f0eee9', color: '#722f37', fontWeight: 500 }}>
                  +{recipients.length - 20} autres
                </span>
              )}
              {recipients.length > 1 && (
                <button onClick={() => setRecipients([])}
                  style={{ fontSize: '12px', color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px' }}>
                  Tout supprimer
                </button>
              )}
            </div>
          )}
        </div>

        {/* Subject */}
        <div className="mb-5">
          <label style={labelStyle}>Objet</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
            placeholder="Objet de votre newsletter" style={inputStyle} />
        </div>

        {/* Editor */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <label style={{ ...labelStyle, margin: 0 }}>Message</label>
            <button onClick={() => {
              if (!showSource) setHtmlSource(editorRef.current?.innerHTML || '')
              else if (editorRef.current) { editorRef.current.innerHTML = htmlSource; syncContent() }
              setShowSource(!showSource)
            }} style={{ fontSize: '12px', color: '#722f37', background: 'none', border: 'none', cursor: 'pointer' }}>
              {showSource ? '< Editeur visuel' : 'Code HTML'}
            </button>
          </div>

          {!showSource && (
            <div className="flex flex-wrap gap-1 mb-0 p-2 rounded-t-lg" style={{ background: '#fff', border: '1px solid #ddd', borderBottom: 'none' }}>
              <button onClick={() => exec('bold')} style={getToolBtn(formatState.bold)} title="Gras"><Bold className="w-4 h-4" /></button>
              <button onClick={() => exec('italic')} style={getToolBtn(formatState.italic)} title="Italique"><Italic className="w-4 h-4" /></button>
              <button onClick={openLinkModal} style={toolBtn} title="Lien"><Link2 className="w-4 h-4" /></button>
              <button onClick={() => exec('justifyLeft')} style={getToolBtn(formatState.justifyLeft)} title="Gauche"><AlignLeft className="w-4 h-4" /></button>
              <button onClick={() => exec('justifyCenter')} style={getToolBtn(formatState.justifyCenter)} title="Centrer"><AlignCenter className="w-4 h-4" /></button>
              <div className="hidden sm:block" style={{ width: '1px', background: '#e5e2dc', margin: '0 4px' }} />
              <button onClick={() => exec('formatBlock', 'h2')} style={toolBtn} title="Titre"><Type className="w-4 h-4" /></button>
              <button onClick={() => exec('formatBlock', 'p')} style={{ ...toolBtn, fontSize: '12px' }}>P</button>
              <button onClick={() => exec('insertUnorderedList')} style={getToolBtn(formatState.insertUnorderedList)} title="Liste a puces"><List className="w-4 h-4" /></button>
              <button onClick={() => exec('insertOrderedList')} style={getToolBtn(formatState.insertOrderedList)} title="Liste numerotee"><ListOrdered className="w-4 h-4" /></button>
              <div className="hidden sm:block" style={{ width: '1px', background: '#e5e2dc', margin: '0 4px' }} />
              <div style={{ position: 'relative' }}>
                <button onClick={() => setShowColors(!showColors)} style={toolBtn}><Palette className="w-4 h-4" /></button>
                {showColors && (
                  <div className="absolute top-full left-0 mt-1 p-2 rounded-lg flex gap-1 z-50" style={{ background: '#fff', border: '1px solid #ddd', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    {editorColors.map(c => (
                      <button key={c} onClick={() => { exec('foreColor', c); setShowColors(false) }}
                        style={{ width: '24px', height: '24px', borderRadius: '4px', background: c, border: '1px solid #ddd', cursor: 'pointer' }} />
                    ))}
                  </div>
                )}
              </div>
              <div className="hidden sm:block" style={{ width: '1px', background: '#e5e2dc', margin: '0 4px' }} />
              <button onClick={openButtonModal} style={{ ...toolBtn, fontSize: '12px', gap: '4px' }}>Bouton</button>
              <button onClick={openImageModal} style={toolBtn} title="Image"><Image className="w-4 h-4" /></button>
              <button onClick={insertDivider} style={{ ...toolBtn, fontSize: '12px' }}>--</button>
            </div>
          )}

          {showSource ? (
            <textarea value={htmlSource} onChange={(e) => setHtmlSource(e.target.value)}
              style={{ width: '100%', height: '300px', padding: '14px', fontSize: '13px', fontFamily: 'monospace', color: '#1a1a1a', background: '#f7f6f3', border: '1px solid #ddd', borderRadius: '8px', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
          ) : (
            <>
              <div ref={editorRef} contentEditable suppressContentEditableWarning
                className="newsletter-editor"
                style={{ minHeight: '250px', padding: '16px', fontSize: '14px', lineHeight: '1.7', color: '#1a1a1a', background: '#fff', border: '1px solid #ddd', borderRadius: '0 0 8px 8px', outline: 'none', boxSizing: 'border-box' }}
                onInput={syncContent}
                onKeyUp={updateFormatState}
                onMouseUp={updateFormatState}
                onFocus={(e) => {
                  if (!e.currentTarget.textContent?.trim()) {
                    e.currentTarget.innerHTML = '<p>Cher(e) ami(e) du jazz,</p><p><br></p><p>Musicalement,<br>L\'equipe Jazz en Tech</p>'
                    syncContent()
                  }
                  updateFormatState()
                }}
              />
              <style>{`
                .newsletter-editor ul {
                  list-style-type: disc;
                  padding-left: 24px;
                  margin: 8px 0;
                }
                .newsletter-editor ol {
                  list-style-type: decimal;
                  padding-left: 24px;
                  margin: 8px 0;
                }
                .newsletter-editor li {
                  margin-bottom: 4px;
                }
                .newsletter-editor h2 {
                  font-size: 20px;
                  font-weight: 700;
                  margin: 16px 0 8px;
                  color: #1a1a1a;
                }
                .newsletter-editor img {
                  max-width: 100%;
                  border-radius: 8px;
                  margin: 8px 0;
                }
                .newsletter-editor a {
                  color: #722f37;
                }
              `}</style>
            </>
          )}
        </div>

        {/* Apercu */}
        <details className="mb-5">
          <summary style={{ fontSize: '13px', color: '#722f37', cursor: 'pointer', marginBottom: '8px' }}>Apercu de l&apos;email final</summary>
          <div className="rounded-lg p-3 sm:p-4 overflow-auto" style={{ background: '#e5e2dc', maxHeight: '500px' }}>
            <div dangerouslySetInnerHTML={{ __html: getPreviewHtml() }} />
          </div>
        </details>

        {result && result.results && result.results.length > 0 && (
          <div className="mb-4 rounded-lg p-3" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <p style={{ color: '#166534', fontSize: '13px', margin: 0 }}>
              {result.sent} email(s) envoye(s) via {result.results[0]?.via || 'inconnu'}
              {result.errors > 0 ? `, ${result.errors} erreur(s)` : ''}
            </p>
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg p-3" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
            <p style={{ color: '#991b1b', fontSize: '13px', margin: 0 }}>{error}</p>
          </div>
        )}

        <button onClick={handleSend} disabled={loading}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm w-full sm:w-auto justify-center"
          style={{ background: '#722f37', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', opacity: loading ? 0.6 : 1 }}>
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
          {loading ? 'Envoi en cours...' : `Envoyer (${recipients.length} destinataire${recipients.length > 1 ? 's' : ''})`}
        </button>
      </div>
    </DashboardShell>
  )
}