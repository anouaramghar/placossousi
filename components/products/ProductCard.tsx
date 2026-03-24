// components/products/ProductCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import type { Product } from '@/lib/products'

export default function ProductCard({ product }: { product: Product }) {
  const locale = useLocale()
  const name = locale === 'ar' ? product.nameAr : product.name
  const description = locale === 'ar' ? product.descriptionAr : product.description

  return (
    <Link
      href={`/${locale}/products/${product.slug}`}
      className="bg-brand-700 rounded-xl border-t-2 border-brand-400 p-5 hover:bg-brand-600 transition-colors group"
    >
      <div className="relative w-full aspect-video mb-4 bg-brand-800 rounded overflow-hidden">
        <Image
          src={product.image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="text-white font-bold text-sm mb-1">{name}</h3>
      <p className="text-brand-300 text-xs line-clamp-2">{description}</p>
    </Link>
  )
}
