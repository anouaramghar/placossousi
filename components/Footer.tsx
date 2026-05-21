// components/Footer.tsx
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { PHONE_NUMBER, WHATSAPP_HREF } from '@/lib/config'

const NAV_LINKS = [
  { key: 'home' as const, hash: 'about' },
  { key: 'products' as const, hash: 'products' },
  { key: 'services' as const, hash: 'services' },
  { key: 'portfolio' as const, hash: 'portfolio' },
  { key: 'branches' as const, hash: 'branches' },
  { key: 'contact' as const, hash: 'contact' },
]

export default function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const locale = useLocale()

  return (
    <footer className="relative bg-brand-900 border-t border-white/5 pt-12 md:pt-20 pb-8 md:pb-10 px-6 overflow-hidden z-10">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-400/25 to-transparent"></div>
      {/* Subtle ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-400/4 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto">
        {/* === MOBILE: stacked, centered === */}
        {/* === DESKTOP: three-column grid === */}
        <div className="flex flex-col items-center md:grid md:grid-cols-3 md:items-start mb-10 md:mb-16 gap-10 md:gap-8">

          {/* ── Column 1: Logo & Brand ── */}
          <div className="text-center md:text-start group cursor-default">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden mx-auto md:mx-0 mb-5 shadow-[0_0_20px_rgba(37,99,235,0.25)] group-hover:shadow-[0_0_35px_rgba(37,99,235,0.45)] transition-shadow duration-500">
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
            <p className="font-sans text-brand-300/70 text-xs tracking-[0.25em] uppercase font-semibold">
              {t('tagline')}
            </p>
          </div>

          {/* ── Column 2: Navigation links ── */}
          <div className="text-center md:text-start">
            <p className="font-sans text-brand-300/40 text-[10px] tracking-[0.3em] uppercase font-semibold mb-5">
              {t('nav_title')}
            </p>
            <nav>
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map(({ key, hash }) => (
                  <li key={key}>
                    <Link
                      href={`/${locale}#${hash}`}
                      className="font-sans text-sm text-brand-300/60 hover:text-white transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {tNav(key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Column 3: Contact info ── */}
          <div className="text-center md:text-start">
            <p className="font-sans text-brand-300/40 text-[10px] tracking-[0.3em] uppercase font-semibold mb-5">
              {t('contact_title')}
            </p>
            <div className="flex flex-col gap-4">
              {/* Phone */}
              <a
                href={`tel:${PHONE_NUMBER}`}
                aria-label={t('phone_aria')}
                className="inline-flex items-center gap-2.5 text-brand-300/60 hover:text-white transition-colors duration-200 group/link justify-center md:justify-start"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-white/5 group-hover/link:bg-brand-400/15 flex items-center justify-center transition-colors duration-200">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </span>
                <span className="font-sans text-sm font-medium tracking-wide" dir="ltr">{PHONE_NUMBER}</span>
              </a>

              {/* WhatsApp */}
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('whatsapp_aria')}
                className="inline-flex items-center gap-2.5 text-brand-300/60 hover:text-[#25d366] transition-colors duration-200 group/link justify-center md:justify-start"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-white/5 group-hover/link:bg-[#25d366]/15 flex items-center justify-center transition-colors duration-200">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                </span>
                <span className="font-sans text-sm font-medium">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom bar: copyright + socials ── */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5 pt-7 border-t border-white/[0.06]">
          <p className="font-sans text-brand-300/50 text-xs font-medium tracking-wider order-2 md:order-1">
            {t('copyright')}
          </p>

          <div className="flex items-center gap-2 order-1 md:order-2">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/placosousi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-300/50 hover:text-white transition-all duration-200 hover:scale-110 flex items-center justify-center w-11 h-11 rounded-full hover:bg-white/5"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            {/* Facebook */}
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
