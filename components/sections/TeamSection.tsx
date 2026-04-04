'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion } from 'framer-motion'

const teamMembers = [
  {
    name: 'AMGHAR Adil',
    roleKey: 'responsable_administratif',
    image: '/images/team/amghar.png', // Changed to PNG to support transparent cutout
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
    imageClass: 'scale-[0.85] group-hover:scale-[0.9] origin-bottom',
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

// Helper component to dry up the code and allow different styling for the top leader
function TeamMemberCard({ member, idx, t, isTop = false }: { member: TeamMember, idx: number, t: any, isTop?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group flex flex-col items-center text-center shrink-0 ${isTop ? 'w-[260px] md:w-[300px]' : 'w-[170px] md:w-[220px]'
        }`}
    >
      <div className={`relative mb-5 transition-colors duration-500 ${isTop
        ? 'w-[240px] h-[320px] md:w-[280px] md:h-[380px]' // Larger portrait sizing for leader
        : 'w-[155px] h-[205px] md:w-[200px] md:h-[260px]' // Standard portrait sizing for team
        }`}>
        <div className={`relative w-full h-full overflow-hidden flex items-center justify-center ${!member.image ? 'bg-brand-900/30 border border-white/5 rounded-2xl group-hover:border-brand-400/20' : ''}`}>
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              priority
              className={`transform ${member.imageClass || 'group-hover:scale-105'} transition-transform duration-700 object-contain object-bottom drop-shadow-[0_10px_20px_rgba(37,99,235,0.15)]`}
              sizes={isTop ? "(max-width: 768px) 240px, 280px" : "(max-width: 768px) 155px, 200px"}
            />
          ) : (
            <span className="font-display text-[5rem] text-brand-400/10 group-hover:text-brand-400/20 transition-colors duration-500 select-none">
              {member.name.charAt(0)}
            </span>
          )}
        </div>
      </div>
      <h3 className={`font-display text-white tracking-normal leading-snug mb-1 group-hover:text-brand-300 transition-colors duration-300 w-full ${isTop ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
        }`}>
        {member.name}
      </h3>
      <p className="font-sans text-brand-300/70 text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-semibold">
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

        {/* Hierarchical Team grid */}
        <div className="flex flex-col items-center relative w-full">
          {/* Top Level - Leaders */}
          <div className="relative mb-10 md:mb-20 flex justify-center items-center gap-10 md:gap-14 w-full z-20">
            {leaders.map((leader, idx) => (
              <TeamMemberCard key={leader.name} member={leader} idx={idx} t={t} isTop={true} />
            ))}

            {/* Visual connector line dropping down */}
            <div className="absolute top-[calc(100%-8px)] left-1/2 w-px h-16 md:h-24 bg-gradient-to-b from-brand-400/40 to-transparent -translate-x-1/2 hidden md:block -z-10"></div>
          </div>

          {/* Bottom Level - Team Members */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-14 w-full relative z-20 pt-6 md:pt-0 border-t border-brand-400/10 md:border-t-0">
            {team.map((member, idx) => (
              <TeamMemberCard key={member.name} member={member} idx={idx + 1} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
