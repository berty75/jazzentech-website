// PATH: src/app/api/upload-image/route.ts
import { NextRequest, NextResponse } from 'next/server'

const CLOUD_NAME = 'dpgfensnv'
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || 'newsletter_uploads'
const API_KEY = process.env.CLOUDINARY_API_KEY
const API_SECRET = process.env.CLOUDINARY_API_SECRET

const MAX_SIZE = 500 * 1024 // 500 KB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier' }, { status: 400 })
    }

    // Vérifier le type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Seules les images sont acceptées' }, { status: 400 })
    }

    // Vérifier la taille
    if (file.size > MAX_SIZE) {
      const sizeMB = (file.size / 1024 / 1024).toFixed(1)
      return NextResponse.json({
        error: `Image trop lourde (${sizeMB} Mo). Maximum : 500 Ko. Compressez-la avant de l'envoyer.`
      }, { status: 400 })
    }

    // Upload vers Cloudinary avec transformation auto
    const buffer = Buffer.from(await file.arrayBuffer())
    const base64 = buffer.toString('base64')
    const dataUri = `data:${file.type};base64,${base64}`

    const uploadData = new FormData()
    uploadData.append('file', dataUri)
    uploadData.append('upload_preset', UPLOAD_PRESET)
    uploadData.append('folder', 'newsletter')

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: uploadData,
    })

    if (!res.ok) {
      const err = await res.json()
      console.error('Cloudinary error:', err)
      return NextResponse.json({ error: 'Erreur Cloudinary : ' + (err.error?.message || 'upload échoué') }, { status: 500 })
    }

    const data = await res.json()

    // Retourner l'URL optimisée pour email (600px, qualité auto)
    const optimizedUrl = data.secure_url.replace('/upload/', '/upload/w_600,q_auto,f_auto/')

    return NextResponse.json({
      url: optimizedUrl,
      width: data.width,
      height: data.height,
      size: data.bytes,
      format: data.format,
    })

  } catch (err: any) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}