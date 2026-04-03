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
    <main id="main-content" className="min-h-screen relative pt-32 pb-24 px-4 overflow-hidden z-10">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-400/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-300/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto">
        <Link
          href={`/${locale}/products`}
          className="inline-flex items-center gap-2 text-brand-300 hover:text-white text-sm md:text-base font-semibold transition-colors mb-12 animate-fade-in-up group"
        >
          <span className="group-hover:-translate-x-2 transition-transform duration-300">←</span>
          {t('products.label')}
        </Link>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-square glass-card p-3 rounded-[2rem] overflow-hidden group animate-fade-in-up md:order-1 order-2">
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-inner bg-brand-900/50">
              <Image
                src={product.image}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center animate-fade-in-up md:order-2 order-1" style={{ animationDelay: '0.1s' }}>
            <span className="text-brand-400 text-sm font-bold tracking-[0.3em] uppercase mb-4 inline-flex items-center gap-3">
              <span className="w-8 h-[2px] bg-gradient-to-r from-brand-400 to-transparent"></span>
              {product.category}
            </span>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-white to-brand-300 text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-[1.1] drop-shadow-sm tracking-tight">{name}</h1>
            <p className="text-brand-100 text-lg md:text-xl leading-[1.8] font-light mb-12">{description}</p>
            <a
              href="https://wa.me/212665652991"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-whatsapp hover:bg-whatsapp-dark shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)] text-white font-bold px-10 py-4 rounded-full transition-all duration-300 hover:-translate-y-1 w-fit group"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white drop-shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.832L.057 23.143a.75.75 0 00.913.913l5.34-1.47A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.682-.524-5.205-1.434l-.372-.22-3.862 1.063 1.062-3.844-.228-.38A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              <span className="tracking-wide text-lg">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
