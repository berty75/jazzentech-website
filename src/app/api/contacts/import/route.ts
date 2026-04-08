// PATH: src/app/api/contacts/import/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { ConvexHttpClient } from 'convex/browser'
import { api } from 'convex/_generated/api'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
const CONTACTS_FILE = resolve(process.cwd(), 'data/contacts.json')

export async function POST(req: NextRequest) {
  let contacts = []

  try {
    const body = await req.json()
    if (body.contacts?.length) contacts = body.contacts
  } catch {}

  if (!contacts.length) {
    try {
      const raw = await readFile(CONTACTS_FILE, 'utf-8')
      contacts = JSON.parse(raw)
    } catch {
      return NextResponse.json({ error: 'Aucun contact a importer' }, { status: 400 })
    }
  }

  let totalImported = 0, totalUpdated = 0

  for (let i = 0; i < contacts.length; i += 50) {
    const batch = contacts.slice(i, i + 50).map((c: any) => ({
      firstName: c.prenom || c.firstName || '',
      lastName: c.nom || c.lastName || '',
      email: c.email,
      phone: c.telephone || c.phone || undefined,
      editions: c.editions || [],
      ticketCount: c.nb_billets || c.ticketCount || 0,
    }))

    const result = await convex.mutation(api.clients.importClients, { clients: batch })
    totalImported += result.imported
    totalUpdated += result.updated
  }

  return NextResponse.json({ imported: totalImported, updated: totalUpdated, total: contacts.length })
}