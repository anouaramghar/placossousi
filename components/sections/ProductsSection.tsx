// components/sections/ProductsSection.tsx
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import ProductCard from '@/components/products/ProductCard'
import { getFeaturedProducts } from '@/lib/products'

export default function ProductsSection() {
  const t = useTranslations('products')
  const locale = useLocale()
  const featured = getFeaturedProducts()

  return (
    <section id="products" className="bg-brand-800 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-brand-300 text-xs tracking-[0.3em] uppercase mb-2">{t('label')}</p>
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-white text-3xl md:text-4xl font-black">{t('title')}</h2>
          <Link
            href={`/${locale}/products`}
            className="text-brand-400 hover:text-white text-sm font-semibold transition-colors"
          >
            {t('see_all')}
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {featured.map(product => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
