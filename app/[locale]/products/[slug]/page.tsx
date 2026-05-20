// app/[locale]/products/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { LOCALES, BASE_URL } from '@/lib/config'
import { getProductBySlug, getProducts } from '@/lib/products'
import ProductDetail from '@/components/products/ProductDetail'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { robots: { index: false } }

  const name = locale === 'ar' ? product.nameAr : product.name
  const description = locale === 'ar' ? product.descriptionAr : product.description
  const imageUrl = product.image.startsWith('/')
    ? `${BASE_URL}${product.image}`
    : product.image

  return {
    title: `${name} — Placo Sousi`,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/products/${slug}`,
      languages: {
        fr: `${BASE_URL}/fr/products/${slug}`,
        ar: `${BASE_URL}/ar/products/${slug}`,
        'x-default': `${BASE_URL}/fr/products/${slug}`,
      },
    },
    openGraph: {
      title: `${name} — Placo Sousi`,
      description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_MA' : 'fr_FR',
      siteName: 'Placo Sousi',
      images: [{ url: imageUrl, width: 800, height: 600, alt: name }],
    },
  }
}

export async function generateStaticParams() {
  return (LOCALES as readonly string[]).flatMap(locale =>
    getProducts().map(p => ({ locale, slug: p.slug }))
  )
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const product = getProductBySlug(slug)
  if (!product) notFound()
  return <ProductDetail product={product} />
}
