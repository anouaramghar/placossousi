// components/Footer.tsx
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="relative bg-brand-900 border-t border-white/5 pt-12 md:pt-20 pb-8 md:pb-10 px-6 overflow-hidden z-10">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-400/25 to-transparent"></div>
      {/* Subtle ambient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-400/4 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Logo & brand */}
        <div className="mb-8 md:mb-12 text-center group cursor-default">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden mx-auto mb-5 shadow-[0_0_20px_rgba(37,99,235,0.25)] group-hover:shadow-[0_0_35px_rgba(37,99,235,0.45)] transition-shadow duration-500">
            <Image
              src="/images/logo.png"
              alt="Placo Sousi Logo"
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <p className="font-display text-white text-2xl md:text-3xl tracking-[-0.03em] mb-2">
            {t('brand_name')}
          </p>
          <p className="font-sans text-brand-300/70 text-xs tracking-[0.25em] uppercase font-semibold">{t('tagline')}</p>
        </div>

        {/* Bottom bar */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5 pt-8 border-t border-white/4">
          <p className="font-sans text-brand-300/70 text-xs font-medium tracking-wider order-2 md:order-1">{t('copyright')}</p>

          <div className="flex items-center gap-2 order-1 md:order-2">
            <a
              href="https://www.instagram.com/placosousi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-300/50 hover:text-white transition-all duration-200 hover:scale-110 flex items-center justify-center w-11 h-11 rounded-full hover:bg-white/5"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a
              href="https://www.facebook.com/placosousi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-300/50 hover:text-white transition-all duration-200 hover:scale-110 flex items-center justify-center w-11 h-11 rounded-full hover:bg-white/5"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
