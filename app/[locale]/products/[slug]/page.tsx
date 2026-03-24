// app/[locale]/products/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, getProducts } from '@/lib/products'
import ProductDetail from '@/components/products/ProductDetail'

const LOCALES = ['fr', 'ar']

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${locale === 'ar' ? product.nameAr : product.name} — Placo Sousi`,
  }
}

export async function generateStaticParams() {
  return LOCALES.flatMap(locale =>
    getProducts().map(p => ({ locale, slug: p.slug }))
  )
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()
  return <ProductDetail product={product} />
}
