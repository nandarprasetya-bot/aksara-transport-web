import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/booking/',
        '/detail-pesanan/',
        '/pesan-event',
        '/pesan-multiday',
        '/pesan-sopir',
        '/pesan-wedding',
        '/pesan-wisata',
        '/pesan-wisuda',
      ],
    },
    sitemap: 'https://jogjasewamobil.com/sitemap.xml',
  }
}
