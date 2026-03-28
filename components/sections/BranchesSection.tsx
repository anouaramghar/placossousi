'use client'
import { useTranslations, useLocale } from 'next-intl'
import { Phone, MapPin, ExternalLink, Clock } from 'lucide-react'
import branches from '@/data/branches.json'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

export default function BranchesSection() {
  const t = useTranslations('branches')
  const locale = useLocale()
  
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // Group branches by region logically based on index
  // 0-3: Oriental, 4-5: Casablanca-Settat
  const regions = [
    {
      title: locale === 'ar' ? 'جهة الشرق' : "Région de l'Oriental",
      startIndex: 0,
      endIndex: 3
    },
    {
      title: locale === 'ar' ? 'جهة الدار البيضاء سطات' : "Région Casablanca-Settat",
      startIndex: 4,
      endIndex: 5
    }
  ]

  return (
    <section id="branches" className="relative py-16 md:py-24 px-6 z-10" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-400/3 to-transparent pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16 reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="section-label">{t('label')}</span>
            <h2 className="font-display text-white text-[clamp(2.5rem,6vw,4.5rem)] tracking-normal leading-[1.1] mt-4 text-glow-soft">
              {t('title')}
            </h2>
          </div>
          <p className="font-sans text-brand-300/50 text-sm tracking-[0.12em] font-medium sm:mb-2 flex-shrink-0">
            {branches.length} {t('label').toLowerCase()}
          </p>
        </div>

        {/* Route line */}
        <div className="relative">
          {/* Background track line */}
          <div
            aria-hidden="true"
            className="absolute ltr:left-[0.875rem] rtl:right-[0.875rem] md:ltr:left-1/2 md:rtl:right-auto md:left-1/2 md:-translate-x-1/2
                       top-1 bottom-1 w-px pointer-events-none bg-white/5"
          />
          {/* Animated fill line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute ltr:left-[0.875rem] rtl:right-[0.875rem] md:ltr:left-1/2 md:rtl:right-auto md:left-1/2 md:-translate-x-1/2
                       top-1 w-px pointer-events-none bg-gradient-to-b from-brand-400 via-brand-500 to-brand-300 shadow-[0_0_15px_rgba(37,99,235,0.8)] z-0"
          />

          {branches.map((branch, i) => {
            const isLeft = i % 2 === 0
            const cityName = locale === 'ar' ? branch.cityAr : branch.city
            const address  = locale === 'ar' ? branch.addressAr : branch.address
            const isSoon = branch.mapUrl === '#'
            const region = regions.find(r => r.startIndex === i)

            return (
              <div key={branch.city}>
                {/* Region Marker */}
                {region && (
                  <div className="reveal relative flex justify-start md:justify-center mb-8 mt-4 z-10 ltr:pl-10 rtl:pr-10 md:px-0">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-brand-400/20 bg-brand-900/60 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                      <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                      <span className="font-sans text-brand-100/90 text-sm tracking-widest uppercase font-semibold">
                        {region.title}
                      </span>
                    </div>
                  </div>
                )}

                <div
                  className={`reveal delay-${Math.min((i % 4) + 1, 4)} relative ${
                    i < branches.length - 1 ? 'mb-10 md:mb-12' : ''
                  }`}
                >
                  {/* ─── MOBILE layout ─── */}
                  <div className="md:hidden flex items-start gap-5 relative z-10">
                    {/* Stop dot */}
                    <div className="flex-shrink-0 flex justify-center w-[1.75rem] pt-[0.8rem] relative z-10">
                      <div className={`w-3.5 h-3.5 rounded-full ring-[4px] ring-brand-900 ${isSoon ? 'bg-white/20 border-2 border-dashed border-white/30' : 'bg-brand-400 shadow-[0_0_12px_rgba(37,99,235,0.8)]'}`} />
                    </div>
                    {/* Card */}
                    <div className="flex-1">
                      <CardWrapper isSoon={isSoon} branch={branch}>
                        <RouteCard cityName={cityName} address={address} phone={branch.phone} index={i} isSoon={isSoon} locale={locale} />
                      </CardWrapper>
                    </div>
                  </div>

                  {/* ─── DESKTOP layout — alternating ─── */}
                  <div className="hidden md:flex items-center relative z-10">
                    {/* Left slot */}
                    <div className="flex-1 flex justify-end pe-9">
                      {isLeft ? (
                        <div className="w-full max-w-[22rem]">
                          <CardWrapper isSoon={isSoon} branch={branch}>
                            <RouteCard cityName={cityName} address={address} phone={branch.phone} index={i} isSoon={isSoon} locale={locale} />
                          </CardWrapper>
                        </div>
                      ) : (
                        <div className={`self-center w-8 h-px ${isSoon ? 'bg-gradient-to-r from-transparent to-white/10' : 'bg-gradient-to-r from-transparent to-brand-400/40'}`} />
                      )}
                    </div>

                    {/* Centre stop indicator */}
                    <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-9 h-9">
                      <div className="absolute inset-0 rounded-full border border-brand-900 bg-brand-900/80" />
                      <div className={`relative w-3.5 h-3.5 rounded-full ${isSoon ? 'bg-white/20 border-2 border-dashed border-white/30' : 'bg-brand-400 shadow-[0_0_16px_rgba(37,99,235,0.9)]'}`} />
                    </div>

                    {/* Right slot */}
                    <div className="flex-1 flex ps-9">
                      {!isLeft ? (
                        <div className="w-full max-w-[22rem]">
                          <CardWrapper isSoon={isSoon} branch={branch}>
                            <RouteCard cityName={cityName} address={address} phone={branch.phone} index={i} isSoon={isSoon} locale={locale} />
                          </CardWrapper>
                        </div>
                      ) : (
                        <div className={`self-center w-8 h-px ${isSoon ? 'bg-gradient-to-r from-white/10 to-transparent' : 'bg-gradient-to-r from-brand-400/40 to-transparent'}`} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CardWrapper({ isSoon, branch, children }: { isSoon?: boolean, branch?: { mapUrl: string }, children: React.ReactNode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const baseClasses = `group p-6 md:p-8 rounded-2xl transition-all duration-500 relative overflow-hidden ` +
    (isSoon 
      ? `border-2 border-dashed border-white/10 bg-white/[0.015] opacity-80 cursor-default` 
      : `border border-white/6 bg-white/[0.025] hover:border-brand-400/25 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(37,99,235,0.08),inset_0_0_28px_rgba(37,99,235,0.03)] block w-full text-left cursor-pointer`);

  const Inner = (
    <>
      {!isSoon && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37,99,235,0.1), transparent 40%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </>
  )

  if (isSoon) {
    return <div className={baseClasses}>{Inner}</div>
  }

  return (
    <a
      href={branch?.mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={baseClasses}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {Inner}
    </a>
  )
}

function RouteCard({
  cityName,
  address,
  phone,
  index,
  isSoon,
  locale
}: { cityName: string, address: string, phone: string, index: number, isSoon?: boolean, locale?: string }) {
  return (
    <div>
      {/* Top row: index + icon mapping */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-display text-brand-700/60 text-xs tracking-[0.15em] select-none group-hover:text-brand-500/70 transition-colors duration-300">
          {String(index + 1).padStart(2, '0')}
        </span>
        {isSoon ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold tracking-wider text-white/50 uppercase">
            <Clock className="w-3 h-3" strokeWidth={2} />
            {locale === 'ar' ? 'قريباً' : 'Bientôt'}
          </span>
        ) : (
          <ExternalLink className="w-4 h-4 text-brand-400/0 -translate-y-2 translate-x-2 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-brand-400/80 transition-all duration-300" strokeWidth={2} />
        )}
      </div>

      {/* City name */}
      <h3 className={`font-display text-[clamp(1.6rem,3.5vw,2.4rem)] tracking-normal leading-[1.05] mb-3 ${isSoon ? 'text-white/60' : 'text-white'}`}>
        {cityName}
      </h3>

      {/* Expanding accent line */}
      <div className={`h-[2px] w-8 group-hover:w-14 transition-all duration-500 ease-out mb-5 ${isSoon ? 'bg-white/10' : 'bg-brand-400/30'}`} />

      {/* Address */}
      <div className="flex items-start gap-2.5 mb-5">
        <MapPin className={`w-3.5 h-3.5 flex-shrink-0 mt-[3px] ${isSoon ? 'text-white/20' : 'text-brand-400/45'}`} strokeWidth={2} />
        <p className={`font-sans text-sm font-light leading-relaxed tracking-[0.01em] ${isSoon ? 'text-white/30' : 'text-brand-100/40'}`}>
          {address}
        </p>
      </div>

      {/* Phone */}
      {!isSoon && (
        <div className="flex items-center gap-2.5 pt-4 border-t border-white/5">
          <Phone className="w-3.5 h-3.5 text-brand-400/50 flex-shrink-0" strokeWidth={2} />
          <span className="font-sans text-brand-300/65 text-sm font-semibold tracking-widest group-hover:text-brand-200/80 transition-colors duration-300">
            {phone}
          </span>
        </div>
      )}
    </div>
  )
}

