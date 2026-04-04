'use client'
import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export default function MagneticButton({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches)
  }, [])

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 }
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 })
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  if (isTouch) {
    return <div className={className || "inline-block"}>{children}</div>
  }

  return (
    <motion.div
      className={className || "inline-block"}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  )
}
