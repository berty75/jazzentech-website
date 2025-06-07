import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/debug/'],
    },
    sitemap: 'https://jazzentech.com/sitemap.xml',
  }
}