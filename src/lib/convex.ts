// PATH: src/lib/convex.ts
import { ConvexHttpClient } from 'convex/browser'

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL!

export function getConvexClient() {
  return new ConvexHttpClient(CONVEX_URL)
}