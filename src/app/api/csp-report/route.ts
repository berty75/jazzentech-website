// PATH: src/app/api/csp-report/route.ts
import { NextRequest, NextResponse } from 'next/server'

// POST /api/csp-report
// Reçoit les violations CSP signalées par les navigateurs.
//
// Sans cette adresse, Firefox refuse purement et simplement de rapporter
// les violations en mode Report-Only — on ne verrait donc jamais rien.
//
// Les rapports sont écrits dans les logs (visibles en local dans le terminal,
// et sur Vercel dans l'onglet Logs). Objectif : recenser les sources à
// autoriser avant de passer la CSP en mode bloquant.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Deux formats coexistent selon les navigateurs :
    // { "csp-report": {...} } (historique) ou [{ body: {...} }] (Reporting API)
    const report = body['csp-report'] || body?.[0]?.body || body

    const directive = report['violated-directive'] || report.effectiveDirective || '?'
    const blocked = report['blocked-uri'] || report.blockedURL || '?'
    const page = report['document-uri'] || report.documentURL || '?'

    // Le bruit sans intérêt : extensions de navigateur, données inline
    const noise = ['about:', 'chrome-extension:', 'moz-extension:', 'data:', 'inline', 'eval']
    if (!noise.some((n) => String(blocked).startsWith(n) || blocked === n)) {
      console.warn(`[CSP] ${directive} → ${blocked}   (page: ${page})`)
    }
  } catch {
    // Un rapport malformé ne doit jamais faire échouer la requête
  }

  // 204 : le navigateur n'attend aucun contenu en retour
  return new NextResponse(null, { status: 204 })
}
