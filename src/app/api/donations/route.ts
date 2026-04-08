// PATH: src/app/api/donations/route.ts
import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

const DONATIONS_FILE = resolve(process.cwd(), 'data/donations.json')

export async function GET() {
  try {
    const raw = await readFile(DONATIONS_FILE, 'utf-8')
    return NextResponse.json(JSON.parse(raw))
  } catch {
    return NextResponse.json([])
  }
}