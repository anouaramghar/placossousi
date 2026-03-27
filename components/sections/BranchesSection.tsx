// components/sections/BranchesSection.tsx
import { useTranslations, useLocale } from 'next-intl'
import { MapPin, Phone, ArrowUpRight } from 'lucide-react'
import branches from '@/data/branches.json'

export default function BranchesSection() {
  const t = useTranslations('branches')
  const locale = useLocale()

  return (
    <section id="branches" className="relative py-36 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 reveal">
          <span className="section-label">{t('label')}</span>
          <h2 className="font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-brand-200/50 text-[clamp(2.5rem,6vw,4.5rem)] tracking-[-0.04em] leading-[1.04] mt-4 text-glow-soft">{t('title')}</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Branch Cards List */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {branches.map((branch, i) => (
              <a
                key={branch.city}
                href={branch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`glass-card reveal delay-${Math.min(i + 1, 6)} block p-7 rounded-[2rem] border border-white/5 hover:border-brand-400/40 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(30,79,163,0.3)] transition-all duration-500 group relative overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent`}
              >
                {/* Background glow hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-400/0 via-brand-400/[0.05] to-brand-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -translate-x-full group-hover:translate-x-0"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-400/10 rounded-full blur-[40px] group-hover:bg-brand-400/20 transition-colors duration-500 z-0"></div>
                
                <div className="flex items-start justify-between relative z-10">
                  <div className="pr-4">
                    <h3 className="font-sans text-xl md:text-2xl font-bold text-white mb-3 tracking-[-0.01em] flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-900/50 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-brand-400/50 group-hover:bg-brand-400/10 transition-colors duration-500">
                        <MapPin className="text-brand-400 w-5 h-5 group-hover:scale-110 transition-transform duration-500" strokeWidth={2} />
                      </div>
                      {locale === 'ar' ? branch.cityAr : branch.city}
                    </h3>
                    
                    <div className="pl-12 space-y-2">
                       <p className="font-sans text-brand-100/60 text-sm md:text-base font-light flex items-start gap-2 max-w-[95%] tracking-wide leading-relaxed">
                         {locale === 'ar' ? branch.addressAr : branch.address}
                       </p>
                       <p className="font-sans text-brand-300/90 text-sm font-semibold tracking-widest flex items-center gap-2.5">
                         <Phone className="w-4 h-4 text-brand-400/60" strokeWidth={2} />
                         {branch.phone}
                       </p>
                    </div>
                  </div>
                  
                  {/* Arrow icon */}
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.01] group-hover:bg-brand-400 group-hover:border-brand-400 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex-shrink-0 duration-500 group-hover:rotate-45 relative overflow-hidden">
                     <ArrowUpRight className="w-5 h-5 text-brand-200 group-hover:text-white transition-colors relative z-10" strokeWidth={2} />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Right Column: Interactive Map */}
          <div className="lg:col-span-7 h-[450px] lg:h-auto lg:min-h-[600px] rounded-[2.5rem] overflow-hidden border border-brand-400/20 shadow-[0_15px_50px_rgba(0,0,0,0.5)] relative group lg:sticky lg:top-28 reveal delay-3">
            <div className="absolute inset-0 border-2 border-brand-400/5 rounded-[2.5rem] pointer-events-none z-10 transition-colors group-hover:border-brand-400/20"></div>
            <iframe
              title={t('map_label')}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000!2d-2.9335!3d35.1740!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7510b29c47e80b%3A0x4a09e93d52b11e5a!2sNador!5e0!3m2!1sfr!2sma!4v1710000000000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.1) saturate(1.2)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-700 filter grayscale-[20%]"
            />
            {/* Soft gradient overlay at the edges of the map to blend it into the dark theme better */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent to-brand-900/30 pointer-events-none z-0"></div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
