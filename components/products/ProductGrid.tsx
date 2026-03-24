// components/products/ProductGrid.tsx
'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import ProductCard from './ProductCard'
import type { Product } from '@/lib/products'

const CATEGORIES = ['all', 'platre', 'peinture', 'pasta', 'armstrong', 'led', 'visserie'] as const

interface Props { products: Product[] }

export default function ProductGrid({ products }: Props) {
  const t = useTranslations('products.categories')
  const [active, setActive] = useState<string>('all')

  const filtered = active === 'all' ? products : products.filter(p => p.category === active)

  return (
    <div>
      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              active === cat
                ? 'bg-brand-400 text-white'
                : 'bg-brand-700 text-brand-300 hover:text-white'
            }`}
          >
            {t(cat)}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(product => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  )
}
