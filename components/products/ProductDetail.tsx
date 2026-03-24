// components/products/ProductDetail.tsx
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import type { Product } from '@/lib/products'

export default function ProductDetail({ product }: { product: Product }) {
  const locale = useLocale()
  const t = useTranslations()
  const name = locale === 'ar' ? product.nameAr : product.name
  const description = locale === 'ar' ? product.descriptionAr : product.description

  return (
    <main className="min-h-screen bg-brand-800 pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href={`/${locale}/products`}
          className="text-brand-300 hover:text-white text-sm mb-8 inline-block transition-colors"
        >
          ← {t('products.label')}
        </Link>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative aspect-square bg-brand-700 rounded-xl overflow-hidden">
            <Image
              src={product.image}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-brand-400 text-xs font-bold tracking-widest uppercase">
              {product.category}
            </span>
            <h1 className="text-white text-3xl font-black mt-2 mb-4">{name}</h1>
            <p className="text-brand-300 leading-relaxed">{description}</p>
            <a
              href="https://wa.me/212665652991"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-whatsapp hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
            >
              <span>💬</span> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
