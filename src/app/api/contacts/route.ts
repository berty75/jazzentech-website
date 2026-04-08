// PATH: src/app/api/contacts/route.ts
import { NextResponse } from 'next/server'
import { ConvexHttpClient } from 'convex/browser'
import { api } from 'convex/_generated/api'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function GET() {
  try {
    const clients = await convex.query(api.clients.listClients)
    return NextResponse.json(clients)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}