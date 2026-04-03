'use client'
import { useTranslations } from 'next-intl'
import { Hammer, Palette, Paintbrush, Lightbulb, ArrowUpRight } from 'lucide-react'
import servicesData from '@/data/services.json'
import { motion, useInView, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'

const ICONS: Record<string, React.ElementType> = {
  Hammer, Palette, Paintbrush, Lightbulb
}

// Premium generated service photography
const SERVICE_IMAGES = [
  "/images/services/service_platre.png",
  "/images/services/service_decoration.png",
  "/images/services/service_peinture.png",
  "/images/services/service_conseil.png"
]

export default function ServicesSection() {
  const t = useTranslations('services')
  const items = t.raw('items') as string[]
  
  // Safe fallback if descriptions aren't fully loaded dynamically yet for some reason
  let descriptions: string[] = []
  try {
    descriptions = t.raw('descriptions') as string[]
  } catch(e) {
    descriptions = items.map(() => "Description non disponible.")
  }

  return (
    <section id="services" className="relative py-16 md:py-24 z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-400/3 to-transparent pointer-events-none -z-10"></div>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <div className="reveal mb-12 md:mb-14">
          <span className="section-label">{t('label')}</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between mt-5">
            <h2 className="font-display text-white text-[clamp(2.5rem,6vw,5.5rem)] tracking-normal leading-[1.1] text-glow-soft">
              {t('title')}
            </h2>
            <div className="mt-4 md:mt-0 md:mb-3 inline-flex items-center px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="font-sans text-brand-200/80 text-sm tracking-wide font-medium">
                {items.length} {t('label').toLowerCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Stacked editorial list */}
        <div className="border-t border-white/10 relative">
          {items.map((item, i) => {
            const iconName = servicesData[i]?.icon ?? 'Paintbrush'
             // Make sure we have enough placeholder images mapping to the items length
            const imgPath = SERVICE_IMAGES[i % SERVICE_IMAGES.length]
            return (
              <ServiceRow 
                key={servicesData[i]?.id ?? i} 
                item={item} 
                description={descriptions[i]} 
                index={i} 
                iconName={iconName} 
                imagePath={imgPath} 
              />
            )
          })}
        </div>

      </div>
    </section>
  )
}

function ServiceRow({ item, description, index, iconName, imagePath }: { item: string, description: string, index: number, iconName: string, imagePath: string }) {
  const IconComponent = ICONS[iconName] ?? Paintbrush
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
  // Mouse tracking for floating image
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for tracking
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const rowRef = useRef(null)
  const isInView = useInView(rowRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative border-b border-white/5 group bg-transparent transition-colors duration-500 hover:bg-white/[0.01]"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Animated Drawing Border */}
      <motion.div 
        className="absolute bottom-[-1px] left-0 h-px bg-brand-400 z-10"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: 0.2 + (index * 0.1), duration: 0.8, ease: "anticipate" }}
        style={{ transformOrigin: "left" }}
      />
      
      {/* Hover glow fill */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-400/[0.04] via-brand-400/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center py-8 md:py-10 cursor-pointer">
        {/* Left side: Icon + Title */}
        <div className="flex items-center gap-6 md:gap-10 flex-1 px-4 md:px-6">
          {/* Index number */}
          <span className="font-display text-brand-700/40 text-4xl md:text-6xl tabular-nums min-w-[50px] md:min-w-[80px] text-right select-none group-hover:text-brand-500/70 transition-colors duration-500 leading-none">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Animated Icon Box */}
          <motion.div 
             initial={{ scale: 0, rotate: -30 }}
             animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -30 }}
             transition={{ type: "spring", delay: 0.2 + (index * 0.1) }}
             className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-brand-800 to-brand-900 rounded-2xl flex items-center justify-center border border-white/10 flex-shrink-0 group-hover:scale-110 group-hover:-rotate-6 group-hover:border-brand-400/50 transition-all duration-500 shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
          >
            <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-brand-300 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
          </motion.div>

          {/* Title with Liquid Text Fill */}
          <h3 className="font-sans text-brand-100/90 text-xl md:text-3xl font-light tracking-[-0.02em] leading-tight flex-1 relative overflow-hidden group-hover:text-white transition-colors">
            {/* The actual text */}
            <span className="relative z-10">{item}</span>
            {/* The liquid overlay */}
            <span 
              className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-brand-300 via-white to-brand-300 w-0 group-hover:w-full transition-all duration-[800ms] ease-out truncate z-20 pointer-events-none drop-shadow-[0_0_15px_rgba(37,99,235,0.8)]"
              style={{ backgroundSize: '150% auto' }}
            >
              {item}
            </span>
          </h3>
        </div>

        {/* Arrow Reveal */}
        <div className="hidden md:flex items-center justify-end px-6 relative z-10 pointer-events-none flex-shrink-0">
          <motion.div
             animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 1 : 0.8 }}
             className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-brand-500 border-brand-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'group-hover:border-brand-400 group-hover:bg-brand-900'}`}
          >
             <ArrowUpRight className={`w-6 h-6 transition-colors duration-500 ${isOpen ? 'text-white' : 'text-brand-300/40 group-hover:text-brand-300'}`} strokeWidth={1.5} />
          </motion.div>
        </div>
      </div>

      {/* Expandable Accordion */}
      <AnimatePresence>
        {isOpen && description && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-8 px-6 md:px-6 ltr:pl-[6.5rem] rtl:pr-[6.5rem] md:ltr:pl-[14rem] md:rtl:pr-[14rem]">
              <div className="p-6 md:p-8 rounded-2xl bg-brand-900/40 border border-brand-400/10 shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)]">
                <p className="font-sans text-brand-100/70 text-base md:text-lg leading-relaxed md:leading-[1.8]">
                  {description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Mouse Image (Awwwards Style) */}
      <AnimatePresence>
        {isHovered && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute z-0 pointer-events-none w-[200px] h-[140px] md:w-[280px] md:h-[180px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-brand-400/30 hidden md:block"
            style={{
              x: springX,
              y: springY,
              // Offset so mouse is slightly below center to not block text
              translateX: "-10%",
              translateY: "-20%",
            }}
          >
            {/* If the exact image isn't found, it defaults to a beautiful premium blurred box */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-brand-900 z-0"></div>
            <Image
               src={imagePath}
               alt={item}
               fill
               className="object-cover opacity-50 mix-blend-screen scale-110"
               sizes="(max-width: 768px) 0vw, 280px"
               onError={(e) => {
                 (e.target as HTMLImageElement).style.opacity = '0';
               }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
