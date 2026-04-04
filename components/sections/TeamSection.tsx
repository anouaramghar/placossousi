'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

const teamMembers = [
  {
    name: 'AMGHAR Adil',
    roleKey: 'responsable_administratif',
    image: '/images/team/amghar.png',
  },
  {
    name: 'AGUENCHICH Abd errazzak',
    roleKey: 'responsable_commercial',
    image: '/images/team/abdrazak.png',
  },
  {
    name: 'AMECHTAL Said',
    roleKey: 'commercial',
    image: '/images/team/said.png',
  },
  {
    name: 'AYOUBI Ahmed',
    roleKey: 'commercial',
    image: '/images/team/ahmed.png',
    imageClass: 'scale-[0.85] origin-bottom',
  },
  {
    name: 'NAJIH Ayoub',
    roleKey: 'commercial',
    image: '/images/team/ayoub.png',
  },
  {
    name: 'ZEROUAL Mohamed',
    roleKey: 'chef_chantier',
    image: '/images/team/mohamed.png',
  },
]

interface TeamMember {
  name: string
  roleKey: string
  image: string
  imageClass?: string
}

// Slide transition variants for the carousel
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '62%' : '-62%',
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-62%' : '62%',
    opacity: 0,
    scale: 0.9,
  }),
}

const AUTO_DELAY = 3600 // ms between slides

// Mobile-only auto-playing carousel for the team members
function MobileTeamCarousel({ members, t }: { members: TeamMember[]; t: any }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  // Incrementing this key resets the auto-play interval (used after user interaction)
  const [autoKey, setAutoKey] = useState(0)

  // Navigate in a given direction, and reset the auto-play timer
  const go = useCallback(
    (dir: number) => {
      setDirection(dir)
      setCurrent(prev => (prev + dir + members.length) % members.length)
      setAutoKey(k => k + 1)
    },
    [members.length],
  )

  // Auto-advance: restarts whenever autoKey changes (i.e. after user interaction)
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent(prev => (prev + 1) % members.length)
    }, AUTO_DELAY)
    return () => clearInterval(timer)
  }, [autoKey, members.length])

  const member = members[current]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center w-full"
    >
      {/* Fixed-height viewport — both entering and exiting cards sit absolutely inside */}
      <div className="relative w-full h-[295px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            // Swipe support
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, { offset, velocity }) => {
              if (offset.x < -40 || velocity.x < -400) go(1)
              else if (offset.x > 40 || velocity.x > 400) go(-1)
            }}
            className="absolute inset-0 flex flex-col items-center cursor-grab active:cursor-grabbing select-none"
          >
            {/* Portrait image */}
            <div className="relative w-[155px] h-[210px] mb-4">
              {/* Atmospheric glow beneath the image */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-brand-400/20 blur-xl rounded-full pointer-events-none" />
              <Image
                src={member.image}
                alt={member.name}
                fill
                className={`object-contain object-bottom drop-shadow-[0_12px_32px_rgba(37,99,235,0.22)] ${member.imageClass ?? ''}`}
                sizes="155px"
                draggable={false}
              />
            </div>

            {/* Name */}
            <h3 className="font-display text-white text-xl tracking-normal leading-snug mb-1.5">
              {member.name}
            </h3>

            {/* Role */}
            <p className="font-sans text-brand-300/70 text-[9px] tracking-[0.22em] uppercase font-semibold">
              {t(`roles.${member.roleKey}`)}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pill-dot indicators */}
      <div className="flex items-center gap-[7px]">
        {members.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (idx === current) return
              setDirection(idx > current ? 1 : -1)
              setCurrent(idx)
              setAutoKey(k => k + 1)
            }}
            aria-label={`Go to team member ${idx + 1}`}
            className={`h-[5px] rounded-full transition-all duration-300 ease-out ${
              idx === current ? 'w-6 bg-brand-400' : 'w-[5px] bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </motion.div>
  )
}

// Standard card used for leader portraits (desktop + mobile leaders row)
function TeamMemberCard({
  member,
  idx,
  t,
  isTop = false,
}: {
  member: TeamMember
  idx: number
  t: any
  isTop?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group flex flex-col items-center text-center shrink-0 ${
        isTop ? 'w-[155px] sm:w-[260px] md:w-[300px]' : 'w-[170px] md:w-[220px]'
      }`}
    >
      <div
        className={`relative mb-5 transition-colors duration-500 ${
          isTop
            ? 'w-[145px] h-[195px] sm:w-[240px] sm:h-[320px] md:w-[280px] md:h-[380px]'
            : 'w-[155px] h-[205px] md:w-[200px] md:h-[260px]'
        }`}
      >
        <div
          className={`relative w-full h-full overflow-hidden flex items-center justify-center ${
            !member.image ? 'bg-brand-900/30 border border-white/5 rounded-2xl group-hover:border-brand-400/20' : ''
          }`}
        >
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              priority
              className={`transform ${member.imageClass || 'group-hover:scale-105'} transition-transform duration-700 object-contain object-bottom drop-shadow-[0_10px_20px_rgba(37,99,235,0.15)]`}
              sizes={isTop ? '(max-width: 768px) 240px, 280px' : '(max-width: 768px) 155px, 200px'}
            />
          ) : (
            <span className="font-display text-[5rem] text-brand-400/10 group-hover:text-brand-400/20 transition-colors duration-500 select-none">
              {member.name.charAt(0)}
            </span>
          )}
        </div>
      </div>
      <h3
        className={`font-display text-white tracking-normal leading-snug mb-1 group-hover:text-brand-300 transition-colors duration-300 w-full ${
          isTop ? 'text-[1.15rem] sm:text-2xl md:text-3xl' : 'text-lg md:text-xl'
        }`}
      >
        {member.name}
      </h3>
      <p className="font-sans text-brand-300/70 text-[8.5px] sm:text-[10px] md:text-[11px] tracking-[0.05em] sm:tracking-[0.2em] uppercase font-semibold whitespace-nowrap">
        {t(`roles.${member.roleKey}`)}
      </p>
    </motion.div>
  )
}

export default function TeamSection() {
  const t = useTranslations('team')
  const leaders = teamMembers.slice(0, 2)
  const team = teamMembers.slice(2)

  return (
    <section id="team" className="relative py-10 md:py-24 px-6 z-10 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-20">
          <span className="section-label inline-block">{t('label')}</span>
          <h2 className="font-display text-white text-[clamp(2rem,5vw,4rem)] tracking-normal leading-[1.1] mt-5 max-w-3xl mx-auto text-glow-soft">
            {t('title')}
          </h2>
        </div>

        {/* Hierarchical layout */}
        <div className="flex flex-col items-center relative w-full">
          {/* Leaders row — desktop only (mobile uses the carousel below) */}
          <div className="relative mb-10 md:mb-20 hidden md:flex flex-row justify-center items-center gap-2 sm:gap-10 md:gap-14 w-full z-20">
            {leaders.map((leader, idx) => (
              <TeamMemberCard key={leader.name} member={leader} idx={idx} t={t} isTop={true} />
            ))}

            {/* Connector line (desktop only) */}
            <div className="absolute top-[calc(100%-8px)] left-1/2 w-px h-16 md:h-24 bg-gradient-to-b from-brand-400/40 to-transparent -translate-x-1/2 hidden md:block -z-10" />
          </div>

          {/* Mobile: auto-playing carousel (all 6 members) */}
          <div className="w-full md:hidden">
            <MobileTeamCarousel members={teamMembers} t={t} />
          </div>

          {/* Desktop: static flex-wrap grid */}
          <div className="hidden md:flex w-full flex-wrap justify-center gap-14 z-20">
            {team.map((member, idx) => (
              <TeamMemberCard key={member.name} member={member} idx={idx + 1} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
