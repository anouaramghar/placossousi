'use client'
import { useTranslations, useLocale } from 'next-intl'
import { useState, useRef, FormEvent } from 'react'
import { Phone, Check, Loader2, Send } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactSection() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  
  // Spotlight state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    if (!formRef.current) return
    const rect = formRef.current.getBoundingClientRect()
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.currentTarget)
    const res = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })
    
    if (res.ok) {
      setStatus('success')
      e.currentTarget.reset()
      // Reset after 3 seconds back to idle
      setTimeout(() => setStatus('idle'), 3000)
    } else {
      setStatus('error')
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
  }

  return (
    <section id="contact" className="relative py-16 md:py-24 px-6 z-10 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-400/8 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-12 md:mb-16">
          <span className="section-label">{t('label')}</span>
          <h2 className="font-display text-white text-[clamp(2.5rem,6vw,5.5rem)] tracking-normal leading-[1.1] mt-5 text-glow-soft">{t('title')}</h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10 lg:gap-12 items-start">
          
          {/* Contact info - take 2 cols */}
          <div className="md:col-span-2 space-y-6">
            <motion.a
              variants={itemVariants}
              href="tel:0665652991"
              className="glass-card flex items-center gap-6 rounded-3xl p-6 border border-white/5 hover:border-brand-400/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(30,79,163,0.2)] transition-all duration-300 group bg-gradient-to-r from-white/[0.02] to-transparent relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-800/80 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-400/20 transition-colors pointer-events-none">
                <Phone className="w-7 h-7 text-brand-300 drop-shadow-md group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-brand-300 text-xs md:text-sm mb-1 uppercase tracking-widest font-semibold">{t('phone_label')}</p>
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
              <div className="absolute inset-0 bg-whatsapp/5 animate-pulse rounded-3xl -z-10 pointer-events-none"></div>

              <div className="w-16 h-16 rounded-2xl bg-whatsapp-bg/80 flex items-center justify-center flex-shrink-0 group-hover:bg-whatsapp-bg transition-colors relative pointer-events-none">
                <div className="absolute inset-0 rounded-2xl border-[3px] border-whatsapp/50 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                <div className="absolute inset-0 rounded-2xl bg-whatsapp opacity-0 group-hover:opacity-20 blur-md transition-opacity"></div>
                
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-whatsapp drop-shadow-[0_0_10px_rgba(37,211,102,0.5)] relative z-10 transition-transform group-hover:scale-110">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.832L.057 23.143a.75.75 0 00.913.913l5.34-1.47A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.682-.524-5.205-1.434l-.372-.22-3.862 1.063 1.062-3.844-.228-.38A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
              </div>
              <div>
                <p className="text-whatsapp/80 text-xs md:text-sm mb-1 uppercase tracking-widest font-semibold">{t('whatsapp_label')}</p>
                <p className="text-white font-bold text-[1.3rem] tracking-tight">0665 652 991</p>
              </div>
            </motion.a>

            {/* Instagram Card */}
            <motion.a
              variants={itemVariants}
              href="https://www.instagram.com/placosousi"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-center gap-6 rounded-3xl p-6 border border-pink-500/20 hover:border-pink-500/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(236,72,153,0.15)] transition-all duration-300 group bg-gradient-to-r from-pink-500/[0.03] to-transparent relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl -z-10 pointer-events-none"></div>

              <div className="w-16 h-16 rounded-2xl bg-brand-900/80 flex items-center justify-center flex-shrink-0 transition-colors relative pointer-events-none border border-white/5 group-hover:border-pink-500/30">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity"></div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.3)] relative z-10 transition-transform group-hover:scale-110">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <div>
                <p className="text-pink-400/80 text-xs md:text-sm mb-1 uppercase tracking-widest font-semibold">Instagram</p>
                <p className="text-white font-bold text-[1.2rem] tracking-tight">@placosousi</p>
              </div>
            </motion.a>
          </div>

          {/* Form - take 3 cols */}
          <motion.div variants={itemVariants} className="md:col-span-3 mt-8 md:mt-0">
            <form 
              ref={formRef}
              onSubmit={handleSubmit} 
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="glass-card rounded-3xl p-8 md:p-10 border border-white/10 space-y-6 relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] bg-[#030712]/40 backdrop-blur-xl"
            >
              {/* Inner Mouse Spotlight */}
              {isHovered && (
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                  style={{
                    background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37,99,235,0.08), transparent 40%)`,
                    opacity: 1
                  }}
                />
              )}

              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-400/5 rounded-full blur-[80px] -z-10"></div>

              <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                <div className="relative group/input">
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder=" "
                    className="peer w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-5 pt-7 pb-3 text-white text-base focus:outline-none focus:border-brand-400/60 focus:bg-white/[0.05] focus:shadow-[inset_0_2px_10px_rgba(0,0,0,0.3),_0_0_15px_rgba(30,79,163,0.3)] transition-all font-medium backdrop-blur-sm"
                  />
                  <label 
                    htmlFor="contact-name" 
                    className={`absolute ltr:left-5 rtl:right-5 top-5 text-brand-200/50 text-base font-medium tracking-wide transition-all pointer-events-none 
                                peer-focus:text-brand-400 peer-focus:text-[11px] peer-focus:top-2.5 peer-focus:font-semibold peer-focus:tracking-widest peer-focus:uppercase
                                peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-brand-200/70 peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:uppercase`}
                  >
                    {t('form_name')}
                  </label>
                </div>
                
                <div className="relative group/input">
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder=" "
                    className="peer w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-5 pt-7 pb-3 text-white text-base focus:outline-none focus:border-brand-400/60 focus:bg-white/[0.05] focus:shadow-[inset_0_2px_10px_rgba(0,0,0,0.3),_0_0_15px_rgba(30,79,163,0.3)] transition-all font-medium backdrop-blur-sm"
                  />
                  <label 
                    htmlFor="contact-phone" 
                    className={`absolute ltr:left-5 rtl:right-5 top-5 text-brand-200/50 text-base font-medium tracking-wide transition-all pointer-events-none 
                                peer-focus:text-brand-400 peer-focus:text-[11px] peer-focus:top-2.5 peer-focus:font-semibold peer-focus:tracking-widest peer-focus:uppercase
                                peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-brand-200/70 peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:uppercase`}
                  >
                    {t('form_phone')}
                  </label>
                </div>
              </div>
              
              <div className="relative z-10 group/input">
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder=" "
                  className="peer w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-5 pt-7 pb-3 text-white text-base focus:outline-none focus:border-brand-400/60 focus:bg-white/[0.05] focus:shadow-[inset_0_2px_10px_rgba(0,0,0,0.3),_0_0_15px_rgba(30,79,163,0.3)] transition-all font-medium resize-none backdrop-blur-sm"
                />
                <label 
                  htmlFor="contact-message" 
                  className={`absolute ltr:left-5 rtl:right-5 top-5 text-brand-200/50 text-base font-medium tracking-wide transition-all pointer-events-none 
                              peer-focus:text-brand-400 peer-focus:text-[11px] peer-focus:top-3 peer-focus:font-semibold peer-focus:tracking-widest peer-focus:uppercase
                              peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-brand-200/70 peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:uppercase`}
                >
                  {t('form_message')}
                </label>
              </div>

              {/* Animated Submit Button */}
              <div className="relative z-10 w-full h-14">
                <motion.button
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  animate={{
                    backgroundColor: status === 'success' ? "#16a34a" : "#2563eb",
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-full h-full relative overflow-hidden group bg-brand-500 text-white font-bold rounded-2xl transition-shadow shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.5)] transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-90 disabled:transform-none disabled:shadow-none disabled:pointer-events-none flex items-center justify-center gap-3"
                >
                  {status === 'idle' || status === 'error' ? (
                    <>
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                      <span>{t('form_submit')}</span>
                      <Send className="w-5 h-5 ltr:ml-1 rtl:mr-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  ) : status === 'sending' ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, rotate: 360 }}
                      transition={{ rotate: { repeat: Infinity, ease: "linear", duration: 1 } }}
                    >
                      <Loader2 className="w-6 h-6 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-6 h-6 text-white" strokeWidth={3} />
                      <span className="text-white font-black uppercase tracking-wider">{t('form_success')}</span>
                    </motion.div>
                  )}
                </motion.button>
              </div>

              {/* Only show error externally now because success is built into the button */}
              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert" 
                  aria-atomic="true" 
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
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
