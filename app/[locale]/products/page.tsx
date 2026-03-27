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
    <main className="min-h-screen relative pt-32 pb-24 px-4 overflow-hidden z-10">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-400/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-300/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 animate-fade-in-up">
          <p className="text-brand-300 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 inline-flex items-center gap-4 font-semibold">
            <span className="w-8 h-[2px] bg-gradient-to-r from-brand-400 to-transparent"></span>
            {t('label')}
          </p>
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-200 text-4xl md:text-5xl lg:text-6xl font-black drop-shadow-sm">{t('title')}</h1>
        </div>
        <ProductGrid products={products} />
      </div>
    </main>
  )
}
