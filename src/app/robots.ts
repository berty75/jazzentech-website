import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/debug/', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/debug/'],
      }
    ],
    sitemap: 'https://jazzentech.com/sitemap.xml',
    host: 'https://jazzentech.com'
  }
}