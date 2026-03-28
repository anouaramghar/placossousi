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
    <section id="products" className="relative py-36 z-10 overflow-hidden">
      {/* Header — contained */}
      <div className="max-w-6xl mx-auto px-6 mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between reveal">
          <div>
            <span className="section-label">{t('label')}</span>
            <h2 className="font-display text-white text-[clamp(2.5rem,6vw,4.5rem)] tracking-[-0.04em] leading-[1.04] mt-4 text-glow-soft">
              {t('title')}
            </h2>
          </div>
          <Link
            href={`/${locale}/products`}
            className="group link-underline font-sans mt-6 md:mt-0 md:mb-2 inline-flex items-center gap-2.5 text-brand-300/70 hover:text-brand-200 text-sm font-medium tracking-[0.04em] transition-colors duration-300"
          >
            {t('see_all')}
            <span className={`transition-transform duration-300 text-base ${locale === 'ar' ? 'group-hover:-translate-x-1.5' : 'group-hover:translate-x-1.5'}`}>
              {locale === 'ar' ? '←' : '→'}
            </span>
          </Link>
        </div>
      </div>

      {/* Horizontal scroll showcase — breaks out of container */}
      <div className="relative">
        <div className="flex gap-5 overflow-x-auto pb-6 px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2))] snap-x snap-mandatory scrollbar-hide">
          {featured.map((product, i) => (
            <div
              key={product.slug}
              className={`snap-start flex-shrink-0 w-[280px] md:w-[340px] reveal delay-${Math.min(i + 1, 6)} h-full`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Edge gradients */}
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-brand-900 to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-brand-900 to-transparent pointer-events-none z-10"></div>
      </div>
    </section>
  )
}
