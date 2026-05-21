'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView, animate } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import founderImg from '@/public/images/founder.webp'

function AnimatedCounter({ from = 0, to, duration = 2.5 }: { from?: number, to: number, duration?: number }) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, Math.round)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" })

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration, ease: "easeOut" })
      return controls.stop
    }
  }, [count, to, duration, isInView])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

function Image3DCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d", width: '100%', height: '100%' }}>
        {children}
      </div>
    </motion.div>
  )
}

export default function AboutSection() {
  const t = useTranslations('about')
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Slower parallax for rings — disabled on mobile
  const y1Raw = useTransform(scrollYProgress, [0, 1], [0, 80])
  const y2Raw = useTransform(scrollYProgress, [0, 1], [0, -60])
  const y1 = isMobile ? 0 : y1Raw
  const y2 = isMobile ? 0 : y2Raw

  return (
    <section id="about" className="relative py-10 md:py-24 px-6 z-10 overflow-hidden" ref={sectionRef}>
      {/* Subtle ambient light */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-400/4 to-transparent pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="reveal mb-10 md:mb-12">
          <span className="section-label">{t('label')}</span>
          <h2 className="font-display text-white text-[clamp(2.5rem,6vw,5.5rem)] tracking-normal leading-[1.1] mt-5 text-glow-soft">
            {t('title')}
          </h2>
        </div>

        {/* Two-column editorial layout — reversed on mobile so photo leads */}
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-14 items-center">
          {/* Left — description (appears below photo on mobile) */}
          <div className="reveal-left delay-1 relative z-20">
            <p className="font-sans text-brand-100/70 text-xl md:text-2xl leading-[1.75] font-light tracking-[-0.01em]">
              {t.rich('description', {
                highlight: (chunks) => <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500 font-medium drop-shadow-sm">{chunks}</span>
              })}
            </p>

            {/* Stats inline */}
            <div className="mt-14 pt-10 border-t border-white/6 grid grid-cols-2 gap-8">
              <div className="reveal delay-2 group">
                <p className="font-display text-5xl md:text-6xl text-white tracking-normal mb-2 group-hover:text-brand-300 transition-colors duration-500">
                  <AnimatedCounter to={10} />+
                </p>
                <p className="font-sans text-brand-300/80 text-xs md:text-sm uppercase tracking-[0.18em] font-semibold">{t('stat_years')}</p>
              </div>
              <div className="reveal delay-3 group">
                <p className="font-display text-5xl md:text-6xl text-white tracking-normal mb-2 group-hover:text-brand-300 transition-colors duration-500">
                  <AnimatedCounter to={6} />
                </p>
                <p className="font-sans text-brand-300/80 text-xs md:text-sm uppercase tracking-[0.18em] font-semibold">{t('stat_cities')}</p>
              </div>
            </div>
          </div>

          {/* Right — founder  */}
          <div className="flex flex-col items-center text-center reveal delay-2">
            {/* Floating avatar with ring */}
            <div className="relative mb-8 md:mb-14 group w-52 h-[16rem] sm:w-64 sm:h-[20rem] md:w-72 md:h-[22rem] perspective-[1000px]">
              {/* Outer decorative rings — tighter insets on mobile to avoid overflow */}
              <motion.div suppressHydrationWarning style={{ y: y1 }} className="absolute -inset-2 md:-inset-6 border border-brand-400/15 rounded-[1.75rem] md:rounded-[2.5rem] rotate-3 transition-colors duration-700 group-hover:border-brand-400/30"></motion.div>
              <motion.div suppressHydrationWarning style={{ y: y2 }} className="absolute -inset-3 md:-inset-8 border border-white/5 rounded-[2rem] md:rounded-[3rem] -rotate-3 transition-colors duration-700 group-hover:border-brand-300/20"></motion.div>

              {/* Glow blob */}
              <div className="absolute inset-0 bg-brand-400/20 rounded-3xl blur-2xl scale-110 animate-pulse-slow"></div>

              {/* Avatar with 3D MOUSE PARALLAX */}
              <Image3DCard className="relative w-full h-full rounded-3xl z-10">
                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(37,99,235,0.35)] bg-white">
                  <Image
                    src={founderImg}
                    alt={t('founder')}
                    fill
                    placeholder="blur"
                    className="object-cover object-top"
                    sizes="288px"
                  />
                  {/* Subtle inner reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay"></div>
                </div>
              </Image3DCard>
            </div>

            <p className="font-display text-white text-3xl md:text-4xl tracking-normal mb-1">{t('founder')}</p>
            <p className="font-sans text-brand-300/80 text-xs tracking-[0.25em] uppercase font-semibold mb-3">{t('founder_title')}</p>

            {/* Signature Element */}
            <div className="font-display italic text-brand-300 text-[2.5rem] leading-none opacity-80 -rotate-3 select-none tracking-[-0.02em] mt-2">
              {t('founder_signature')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
