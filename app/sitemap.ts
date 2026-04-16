import type { MetadataRoute } from 'next'
import { getProducts } from '@/lib/products'
import { BASE_URL, LOCALES } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getProducts()

  const homePages = LOCALES.map(locale => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(LOCALES.map(l => [l, `${BASE_URL}/${l}`])),
    },
  }))

  const productListPages = LOCALES.map(locale => ({
    url: `${BASE_URL}/${locale}/products`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    alternates: {
      languages: Object.fromEntries(LOCALES.map(l => [l, `${BASE_URL}/${l}/products`])),
    },
  }))

  const productPages = LOCALES.flatMap(locale =>
    products.map(p => ({
      url: `${BASE_URL}/${locale}/products/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(LOCALES.map(l => [l, `${BASE_URL}/${l}/products/${p.slug}`])),
      },
    }))
  )

  return [...homePages, ...productListPages, ...productPages]
}
