'use client'
import { useTranslations, useLocale } from 'next-intl'
import { useState, useRef, FormEvent } from 'react'
import { Phone, Check, Loader2, Send, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type Status = 'idle' | 'sending' | 'success' | 'error'

// ─── Shared form fields ──────────────────────────────────────────────────────

function ContactForm({
  t,
  locale,
  status,
  onSubmit,
  formRef,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  mousePosition,
  isHovered,
  spotlight = false,
}: {
  t: any
  locale: string
  status: Status
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  formRef?: React.RefObject<HTMLFormElement | null>
  onMouseMove?: (e: React.MouseEvent<HTMLFormElement>) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  mousePosition?: { x: number; y: number }
  isHovered?: boolean
  spotlight?: boolean
}) {
  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="glass-card rounded-3xl p-6 md:p-10 border border-white/10 space-y-4 md:space-y-6 relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] bg-[#030712]/40 backdrop-blur-xl"
    >
      {/* Spotlight (desktop only) */}
      {spotlight && isHovered && mousePosition && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37,99,235,0.08), transparent 40%)`,
          }}
        />
      )}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-400/5 rounded-full blur-[80px] -z-10" />

      <div className="grid sm:grid-cols-2 gap-4 md:gap-6 relative z-10">
        <FloatingInput id="contact-name" name="name" type="text" label={t('form_name')} required />
        <FloatingInput id="contact-phone" name="phone" type="tel" label={t('form_phone')} required />
      </div>

      <div className="relative z-10">
        <FloatingTextarea id="contact-message" name="message" label={t('form_message')} required />
      </div>

      {/* Submit button */}
      <div className="relative z-10 w-full h-14">
        <motion.button
          type="submit"
          disabled={status === 'sending' || status === 'success'}
          animate={{ backgroundColor: status === 'success' ? '#16a34a' : '#2563eb' }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="w-full h-full relative overflow-hidden group bg-brand-500 text-white font-bold rounded-2xl transition-shadow shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.5)] transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-90 disabled:transform-none disabled:shadow-none disabled:pointer-events-none flex items-center justify-center gap-3"
        >
          {status === 'idle' || status === 'error' ? (
            <>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span>{t('form_submit')}</span>
              <Send className="w-5 h-5 ltr:ml-1 rtl:mr-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </>
          ) : status === 'sending' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              transition={{ rotate: { repeat: Infinity, ease: 'linear', duration: 1 } }}
            >
              <Loader2 className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="flex items-center gap-2"
            >
              <Check className="w-6 h-6 text-white" strokeWidth={3} />
              <span className="text-white font-black uppercase tracking-wider">{t('form_success')}</span>
            </motion.div>
          )}
        </motion.button>
      </div>

      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-semibold p-4 rounded-xl flex flex-col items-center gap-3 relative z-10"
        >
          <span>{t('form_error')}</span>
          <a
            href="https://wa.me/212665652991"
            target="_blank"
            rel="noopener noreferrer"
            className="text-whatsapp hover:text-green-400 font-bold transition-colors underline underline-offset-2"
          >
            {locale === 'ar' ? 'واتساب ←' : '→ WhatsApp'}
          </a>
        </motion.div>
      )}
    </form>
  )
}

function FloatingInput({
  id, name, type, label, required,
}: {
  id: string; name: string; type: string; label: string; required?: boolean
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder=" "
        className="peer w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-5 pt-7 pb-3 text-white text-base focus:outline-none focus:border-brand-400/60 focus:bg-white/[0.05] focus:shadow-[inset_0_2px_10px_rgba(0,0,0,0.3),_0_0_15px_rgba(30,79,163,0.3)] transition-all font-medium backdrop-blur-sm"
      />
      <label
        htmlFor={id}
        className="absolute ltr:left-5 rtl:right-5 top-5 text-brand-200/50 text-base font-medium tracking-wide transition-all pointer-events-none
          peer-focus:text-brand-400 peer-focus:text-[11px] peer-focus:top-2.5 peer-focus:font-semibold peer-focus:tracking-widest peer-focus:uppercase
          peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-brand-200/70 peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:uppercase"
      >
        {label}
      </label>
    </div>
  )
}

function FloatingTextarea({ id, name, label, required }: { id: string; name: string; label: string; required?: boolean }) {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        required={required}
        rows={4}
        placeholder=" "
        className="peer w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-5 pt-7 pb-3 text-white text-base focus:outline-none focus:border-brand-400/60 focus:bg-white/[0.05] focus:shadow-[inset_0_2px_10px_rgba(0,0,0,0.3),_0_0_15px_rgba(30,79,163,0.3)] transition-all font-medium resize-none backdrop-blur-sm"
      />
      <label
        htmlFor={id}
        className="absolute ltr:left-5 rtl:right-5 top-5 text-brand-200/50 text-base font-medium tracking-wide transition-all pointer-events-none
          peer-focus:text-brand-400 peer-focus:text-[11px] peer-focus:top-3 peer-focus:font-semibold peer-focus:tracking-widest peer-focus:uppercase
          peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-brand-200/70 peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:uppercase"
      >
        {label}
      </label>
    </div>
  )
}

// ─── Mobile layout ───────────────────────────────────────────────────────────

function MobileContact({
  t, locale, status, onSubmit,
}: {
  t: any; locale: string; status: Status; onSubmit: (e: FormEvent<HTMLFormElement>) => void
}) {
  const [formOpen, setFormOpen] = useState(false)
  const isAr = locale === 'ar'

  return (
    <div className="md:hidden space-y-3">

      {/* ── WhatsApp hero CTA ── */}
      <motion.a
        href="https://wa.me/212665652991"
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.97 }}
        className="relative flex items-center justify-center gap-3 w-full h-[68px] rounded-2xl overflow-hidden border border-whatsapp/35 bg-whatsapp/10"
      >
        {/* Subtle pulse ring */}
        <div className="absolute inset-0 rounded-2xl bg-whatsapp/8 animate-pulse pointer-events-none" />
        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_30px_rgba(37,211,102,0.08)] pointer-events-none" />

        <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0 fill-whatsapp drop-shadow-[0_0_8px_rgba(37,211,102,0.6)] relative z-10">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.832L.057 23.143a.75.75 0 00.913.913l5.34-1.47A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.682-.524-5.205-1.434l-.372-.22-3.862 1.063 1.062-3.844-.228-.38A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>

        <div className="relative z-10">
          <p className="text-white font-bold text-[1.05rem] leading-tight">
            {isAr ? 'تواصل عبر واتساب' : 'Contacter sur WhatsApp'}
          </p>
          <p className="text-whatsapp/70 text-[11px] tracking-wide">
            {isAr ? '0665 652 991' : '0665 652 991'}
          </p>
        </div>
      </motion.a>

      {/* ── Phone + Instagram pills ── */}
      <div className="grid grid-cols-2 gap-3">
        {/* Phone */}
        <a
          href="tel:0665652991"
          className="flex items-center justify-center gap-2.5 h-12 rounded-xl border border-white/8 bg-white/[0.025] hover:border-brand-400/30 hover:bg-white/[0.04] transition-all duration-200"
        >
          <Phone className="w-4 h-4 text-brand-300/70 flex-shrink-0" strokeWidth={2} />
          <span className="font-semibold text-white/80 text-sm tracking-wide">0665 652 991</span>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/placosousi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 h-12 rounded-xl border border-pink-500/15 bg-white/[0.025] hover:border-pink-500/30 hover:bg-white/[0.04] transition-all duration-200"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-pink-400 flex-shrink-0">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          <span className="font-semibold text-white/80 text-sm">@placosousi</span>
        </a>
      </div>

      {/* ── Form toggle ── */}
      <button
        onClick={() => setFormOpen(v => !v)}
        className="w-full flex items-center gap-3 py-4 group"
      >
        <div className="flex-1 h-px bg-white/8" />
        <span className="font-sans text-brand-300/50 text-[11px] tracking-[0.15em] uppercase font-semibold whitespace-nowrap group-hover:text-brand-300/70 transition-colors duration-200">
          {isAr ? 'أو أرسل رسالة' : 'ou envoyez un message'}
        </span>
        <motion.div
          animate={{ rotate: formOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <ChevronDown className="w-4 h-4 text-brand-300/40 group-hover:text-brand-300/60 transition-colors duration-200" strokeWidth={2} />
        </motion.div>
        <div className="flex-1 h-px bg-white/8" />
      </button>

      {/* ── Collapsible form ── */}
      <AnimatePresence initial={false}>
        {formOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <ContactForm t={t} locale={locale} status={status} onSubmit={onSubmit} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function ContactSection() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const [status, setStatus] = useState<Status>('idle')

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLFormElement>) => {
    if (!formRef.current) return
    const rect = formRef.current.getBoundingClientRect()
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.currentTarget)
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID
    if (!formspreeId) {
      if (process.env.NODE_ENV === 'development') console.error('[ContactSection] NEXT_PUBLIC_FORMSPREE_ID is not set.')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
      return
    }
    const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })
    if (res.ok) {
      setStatus('success')
      e.currentTarget.reset()
      setTimeout(() => setStatus('idle'), 3000)
    } else {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 20 } },
  }

  return (
    <section id="contact" className="relative py-10 md:py-24 px-6 z-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-400/8 rounded-full blur-[120px] pointer-events-none -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8 md:mb-16">
          <span className="section-label">{t('label')}</span>
          <h2 className="font-display text-white text-[clamp(2.5rem,6vw,5.5rem)] tracking-normal leading-[1.1] mt-5 text-glow-soft">
            {t('title')}
          </h2>
        </motion.div>

        {/* ── Mobile layout ── */}
        <MobileContact t={t} locale={locale} status={status} onSubmit={handleSubmit} />

        {/* ── Desktop layout ── */}
        <div className="hidden md:grid md:grid-cols-5 gap-10 lg:gap-12 items-start">

          {/* Contact cards */}
          <div className="md:col-span-2 space-y-6">
            <motion.a
              variants={itemVariants}
              href="tel:0665652991"
              className="glass-card flex items-center gap-6 rounded-3xl p-6 border border-white/5 hover:border-brand-400/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(30,79,163,0.2)] transition-all duration-300 group bg-gradient-to-r from-white/[0.02] to-transparent relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-800/80 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-400/20 transition-colors">
                <Phone className="w-7 h-7 text-brand-300 drop-shadow-md group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-brand-300 text-sm mb-1 uppercase tracking-widest font-semibold">{t('phone_label')}</p>
                <p className="text-white font-bold text-[1.3rem] tracking-tight">0665 652 991</p>
              </div>
            </motion.a>

            <motion.a
              variants={itemVariants}
              href="https://wa.me/212665652991"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-center gap-6 rounded-3xl p-6 border border-whatsapp/30 hover:border-whatsapp/60 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(37,211,102,0.15)] transition-all duration-300 group bg-gradient-to-r from-whatsapp/[0.05] to-transparent relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-whatsapp/5 animate-pulse rounded-3xl -z-10 pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-whatsapp-bg/80 flex items-center justify-center flex-shrink-0 group-hover:bg-whatsapp-bg transition-colors relative">
                <div className="absolute inset-0 rounded-2xl border-[3px] border-whatsapp/50 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                <div className="absolute inset-0 rounded-2xl bg-whatsapp opacity-0 group-hover:opacity-20 blur-md transition-opacity" />
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-whatsapp drop-shadow-[0_0_10px_rgba(37,211,102,0.5)] relative z-10 transition-transform group-hover:scale-110">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.832L.057 23.143a.75.75 0 00.913.913l5.34-1.47A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.682-.524-5.205-1.434l-.372-.22-3.862 1.063 1.062-3.844-.228-.38A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
              </div>
              <div>
                <p className="text-whatsapp/80 text-sm mb-1 uppercase tracking-widest font-semibold">{t('whatsapp_label')}</p>
                <p className="text-white font-bold text-[1.3rem] tracking-tight">0665 652 991</p>
              </div>
            </motion.a>

            <motion.a
              variants={itemVariants}
              href="https://www.instagram.com/placosousi"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-center gap-6 rounded-3xl p-6 border border-pink-500/20 hover:border-pink-500/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(236,72,153,0.15)] transition-all duration-300 group bg-gradient-to-r from-pink-500/[0.03] to-transparent relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl -z-10 pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-brand-900/80 flex items-center justify-center flex-shrink-0 relative border border-white/5 group-hover:border-pink-500/30 transition-colors">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity" />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.3)] relative z-10 transition-transform group-hover:scale-110">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <div>
                <p className="text-pink-400/80 text-sm mb-1 uppercase tracking-widest font-semibold">Instagram</p>
                <p className="text-white font-bold text-[1.2rem] tracking-tight">placosousi</p>
              </div>
            </motion.a>
          </div>

          {/* Desktop form */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <ContactForm
              t={t}
              locale={locale}
              status={status}
              onSubmit={handleSubmit}
              formRef={formRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              mousePosition={mousePosition}
              isHovered={isHovered}
              spotlight
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
