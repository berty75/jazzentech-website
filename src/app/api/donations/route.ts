// PATH: src/app/api/donations/route.ts
import { NextResponse } from 'next/server'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../../../convex/_generated/api'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function GET() {
  try {
    const donations = await convex.query(api.donations.listDonations, {})
    // Map to legacy format for backward compatibility
    const mapped = donations.map((d: any) => ({
      id: d._id,
      amount: d.amountEur,
      email: d.email,
      name: `${d.firstName} ${d.lastName}`.trim(),
      prenom: d.firstName,
      nom: d.lastName,
      phone: d.phone || '',
      address: d.address ? { line1: d.address, city: d.city, postal_code: d.postalCode, country: d.country } : null,
      message: d.message || '',
      date: new Date(d.createdAt).toISOString(),
      status: d.stripeStatus,
      payment_method: d.paymentMethod || '',
      cerfa_generated: d.cerfaGenerated,
      cerfa_hash: d.cerfaHash || null,
    }))
    return NextResponse.json(mapped)
  } catch (err: any) {
    console.error('Convex query error:', err.message)
    return NextResponse.json([])
  }
}