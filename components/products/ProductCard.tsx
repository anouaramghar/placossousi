// components/products/ProductCard.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import type { Product } from '@/lib/products'

export default function ProductCard({ product }: { product: Product }) {
  const locale = useLocale()
  const t = useTranslations('products')
  const name = locale === 'ar' ? product.nameAr : product.name
  const description = locale === 'ar' ? product.descriptionAr : product.description

  return (
    <Link
      href={`/${locale}/products/${product.slug}`}
      className="glass-card card-tilt rounded-2xl p-4 group flex flex-col h-full overflow-hidden border border-white/5 hover:border-brand-400/25 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_-10px_rgba(37,99,235,0.2)]"
    >
      {/* Image container */}
      <div className="relative w-full aspect-[4/3] mb-4 bg-brand-800/60 rounded-xl overflow-hidden">
        <Image
          src={product.image}
          alt={name}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
        {/* Category badge */}
        <div className="absolute top-3 start-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-sans text-[10px] uppercase tracking-[0.15em] font-bold bg-brand-400/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col flex-grow px-1">
        <h3 className="font-sans text-white/90 font-semibold text-base mb-1.5 group-hover:text-white transition-colors duration-200 tracking-[-0.01em] leading-snug">
          {name}
        </h3>
        <p className="font-sans text-brand-200/60 text-xs leading-relaxed line-clamp-2 flex-grow group-hover:text-brand-200/80 transition-colors duration-200">
          {description}
        </p>
        {/* CTA */}
        <div className="mt-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          <span className="font-sans text-brand-300 text-xs font-semibold tracking-[0.04em]">{t('view_product')}</span>
          <span className="text-brand-400 text-xs">{locale === 'ar' ? '←' : '→'}</span>
        </div>
      </div>
    </Link>
  )
}
