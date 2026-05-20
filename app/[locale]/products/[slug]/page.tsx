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
  return {
    title: `${locale === 'ar' ? product.nameAr : product.name} — Placo Sousi`,
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
