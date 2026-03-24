// app/[locale]/products/page.tsx
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getProducts } from '@/lib/products'
import ProductGrid from '@/components/products/ProductGrid'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'ar'
      ? 'المنتجات — بلاكو سوسي'
      : 'Produits — Placo Sousi',
  }
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'ar' }]
}

export default function ProductsPage() {
  const t = useTranslations('products')
  const products = getProducts()

  return (
    <main className="min-h-screen bg-brand-800 pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-brand-300 text-xs tracking-[0.3em] uppercase mb-2">{t('label')}</p>
        <h1 className="text-white text-4xl font-black mb-10">{t('title')}</h1>
        <ProductGrid products={products} />
      </div>
    </main>
  )
}
