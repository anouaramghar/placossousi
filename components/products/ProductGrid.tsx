// components/products/ProductGrid.tsx
'use client'
import { useState, useMemo, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import ProductCard from './ProductCard'
import type { Product } from '@/lib/products'

interface Props { products: Product[] }

export default function ProductGrid({ products }: Props) {
  const t = useTranslations('products.categories')
  const [active, setActive] = useState<string>('all')
  const categories = useMemo(
    () => ['all', ...Array.from(new Set(products.map(p => p.category)))],
    [products]
  )

  useEffect(() => {
    if (!categories.includes(active)) setActive('all')
  }, [categories, active])

  const filtered = active === 'all' ? products : products.filter(p => p.category === active)

  return (
    <div>
      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-3 mb-12 justify-center lg:justify-start pt-4">
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className={`px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${active === cat
                ? 'bg-brand-400 text-white shadow-[0_4px_20px_rgba(30,79,163,0.5)] scale-105 border border-transparent'
                : 'bg-white/[0.03] text-brand-300 hover:text-white hover:bg-white/[0.08] border border-white/10 hover:border-brand-400/40 backdrop-blur-md'
              }`}
          >
            {t(cat as Parameters<typeof t>[0])}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product, i) => (
          <div key={product.slug} className="animate-fade-in-up h-full" style={{ animationDelay: `${(i % 10) * 0.05}s` }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
