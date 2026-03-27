'use client'
// components/ScrollReveal.tsx
// Lightweight Intersection Observer that adds .visible to .reveal elements
// Re-scans on route changes via usePathname()
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    )

    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale')
    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [pathname]) // Re-run observer when route changes

  return null
}
