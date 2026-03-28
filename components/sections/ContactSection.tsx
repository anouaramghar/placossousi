// components/sections/ContactSection.tsx
'use client'
import { useTranslations, useLocale } from 'next-intl'
import { useState } from 'react'
import { Phone } from 'lucide-react'

export default function ContactSection() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.currentTarget)
    const res = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })
    setStatus(res.ok ? 'success' : 'error')
    if (res.ok) (e.target as HTMLFormElement).reset()
  }

  return (
    <section id="contact" className="relative py-36 px-6 z-10 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-400/8 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto">
        <div className="mb-20 reveal">
          <span className="section-label">{t('label')}</span>
          <h2 className="font-display text-white text-[clamp(2.8rem,7vw,5.5rem)] tracking-[-0.04em] leading-[1.04] mt-5 text-glow-soft">{t('title')}</h2>
        </div>


        <div className="grid md:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Contact info - take 2 cols */}
          <div className="md:col-span-2 space-y-6">
            <a
              href="tel:0665652991"
              className="glass-card flex items-center gap-6 rounded-3xl p-6 border border-white/5 hover:border-brand-400/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(30,79,163,0.2)] transition-all duration-300 group bg-gradient-to-r from-white/[0.02] to-transparent"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-800/80 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-400/20 transition-colors">
                <Phone className="w-7 h-7 text-brand-300 drop-shadow-md group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-brand-300 text-xs md:text-sm mb-1 uppercase tracking-widest font-semibold">{t('phone_label')}</p>
                <p className="text-white font-bold text-lg">0665 652 991</p>
                <p className="text-brand-200/70 text-sm">0661 827 712</p>
              </div>
            </a>

            <a
              href="https://wa.me/212665652991"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-center gap-6 rounded-3xl p-6 border border-white/5 hover:border-whatsapp/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(37,211,102,0.15)] transition-all duration-300 group bg-gradient-to-r from-white/[0.02] to-transparent"
            >
              <div className="w-16 h-16 rounded-2xl bg-whatsapp-bg/80 flex items-center justify-center flex-shrink-0 group-hover:bg-whatsapp-bg transition-colors relative">
                <div className="absolute inset-0 rounded-2xl bg-whatsapp opacity-0 group-hover:opacity-20 blur-md transition-opacity"></div>
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-whatsapp drop-shadow-[0_0_10px_rgba(37,211,102,0.5)] relative z-10 transition-transform group-hover:scale-110">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.832L.057 23.143a.75.75 0 00.913.913l5.34-1.47A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.682-.524-5.205-1.434l-.372-.22-3.862 1.063 1.062-3.844-.228-.38A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
              </div>
              <div>
                <p className="text-whatsapp/80 text-xs md:text-sm mb-1 uppercase tracking-widest font-semibold">{t('whatsapp_label')}</p>
                <p className="text-white font-bold text-lg">0665 652 991</p>
              </div>
            </a>
          </div>

          {/* Form - take 3 cols */}
          <div className="md:col-span-3 mt-8 md:mt-0">
            <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 md:p-10 border border-white/10 space-y-6 relative overflow-hidden shadow-2xl bg-white/[0.01]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-400/5 rounded-full blur-[80px] -z-10"></div>

              <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                <div>
                  <label htmlFor="contact-name" className="block text-brand-200/70 text-xs font-semibold tracking-wide mb-2 uppercase">{t('form_name')}</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder={t('form_name')}
                    className="w-full bg-white/[0.04] border border-white/[0.14] rounded-2xl px-6 py-4 text-white placeholder-brand-300/40 focus:outline-none focus:border-brand-400/50 focus:bg-white/[0.07] focus:shadow-[0_0_15px_rgba(30,79,163,0.3)] transition-all font-medium backdrop-blur-md"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-brand-200/70 text-xs font-semibold tracking-wide mb-2 uppercase">{t('form_phone')}</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder={t('form_phone')}
                    className="w-full bg-white/[0.04] border border-white/[0.14] rounded-2xl px-6 py-4 text-white placeholder-brand-300/40 focus:outline-none focus:border-brand-400/50 focus:bg-white/[0.07] focus:shadow-[0_0_15px_rgba(30,79,163,0.3)] transition-all font-medium backdrop-blur-md"
                  />
                </div>
              </div>
              <div className="relative z-10">
                <label htmlFor="contact-message" className="block text-brand-200/70 text-xs font-semibold tracking-wide mb-2 uppercase">{t('form_message')}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder={t('form_message')}
                  className="w-full bg-white/[0.04] border border-white/[0.14] rounded-2xl px-6 py-4 text-white placeholder-brand-300/40 focus:outline-none focus:border-brand-400/50 focus:bg-white/[0.07] focus:shadow-[0_0_15px_rgba(30,79,163,0.3)] transition-all font-medium resize-none backdrop-blur-md"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                aria-busy={status === 'sending'}
                className="w-full relative overflow-hidden group bg-brand-400 text-white font-bold py-5 rounded-2xl transition-all shadow-[0_4px_20px_rgba(30,79,163,0.4)] hover:shadow-[0_8px_30px_rgba(30,79,163,0.6)] transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:transform-none z-10 block"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                {status === 'sending' ? <span className="animate-pulse">...</span> : t('form_submit')}
              </button>

              {status === 'success' && (
                <div role="status" aria-live="polite" aria-atomic="true" className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-semibold p-4 rounded-xl flex items-center justify-center animate-fade-in-up relative z-10">
                  {t('form_success')}
                </div>
              )}
              {status === 'error' && (
                <div role="alert" aria-atomic="true" className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-semibold p-4 rounded-xl flex flex-col items-center gap-3 animate-fade-in-up relative z-10">
                  <span>{t('form_error')}</span>
                  <a
                    href="https://wa.me/212665652991"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-whatsapp hover:text-green-400 font-bold transition-colors underline underline-offset-2"
                  >
                    {locale === 'ar' ? 'واتساب ←' : '→ WhatsApp'}
                  </a>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
