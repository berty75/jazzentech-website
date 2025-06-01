import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Debug Test Page',
  description: 'Test page'
}

export default function Debug() {
  return (
    <div>
      <title>Debug Test Page</title>
      <h1>Debug Test</h1>
      <p>Cette page teste les métadonnées</p>
    </div>
  )
}