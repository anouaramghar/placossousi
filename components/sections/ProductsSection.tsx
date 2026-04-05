// components/sections/ProductsSection.tsx
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import ProductCard from '@/components/products/ProductCard'
import { getFeaturedProducts } from '@/lib/products'

export default function ProductsSection() {
  const t = useTranslations('products')
  const locale = useLocale()
  const featured = getFeaturedProducts()
  const isAr = locale === 'ar'

  return (
    <section id="products" className="relative py-10 md:py-24 z-10 overflow-hidden">

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-10 lg:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between reveal">
          <div>
            <span className="section-label">{t('label')}</span>
            <h2 className="font-display text-white text-[clamp(2.5rem,6vw,4.5rem)] tracking-normal leading-[1.1] mt-4 text-glow-soft">
              {t('title')}
            </h2>
          </div>
          <Link
            href={`/${locale}/products`}
            className={`group hidden md:inline-flex items-center gap-2 mb-2 font-sans text-brand-300/60 hover:text-brand-300 text-sm font-semibold tracking-[0.08em] uppercase transition-colors duration-200`}
          >
            {t('see_all')}
            <span className={`transition-transform duration-200 ${isAr ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
              {isAr ? '←' : '→'}
            </span>
          </Link>
        </div>
      </div>

      {/* ── Mobile / tablet: horizontal scroll strip ── */}
      <div className="lg:hidden relative">
        <div className="flex gap-5 overflow-x-auto pb-6 px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2))] snap-x snap-mandatory scrollbar-hide cursor-[url('/drag-cursor.svg')_30_30,_ew-resize]">
          {featured.map((product, i) => (
            <div
              key={product.slug}
              className={`snap-start flex-shrink-0 w-[280px] md:w-[340px] reveal delay-${Math.min(i + 1, 6)} h-full`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-brand-900 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-brand-900 to-transparent pointer-events-none z-10" />
      </div>

      {/* ── Desktop: 3-column grid ── */}
      <div className="hidden lg:block max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-3 gap-6 xl:gap-8">
          {featured.map((product, i) => (
            <div
              key={product.slug}
              className={`reveal delay-${Math.min(i + 1, 6)} h-full`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Prominent "see all" CTA below the grid */}
        <div className="mt-12 flex justify-center">
          <Link
            href={`/${locale}/products`}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/[0.03] hover:border-brand-400/40 hover:bg-white/[0.06] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] transition-all duration-300 font-sans text-brand-200/70 hover:text-brand-200 text-sm font-semibold tracking-[0.08em] uppercase"
          >
            {t('see_all')}
            <span className={`transition-transform duration-300 text-base ${isAr ? 'group-hover:-translate-x-1.5' : 'group-hover:translate-x-1.5'}`}>
              {isAr ? '←' : '→'}
            </span>
          </Link>
        </div>
      </div>

    </section>
  )
}
