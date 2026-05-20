'use client'
import { useRef, useState, useLayoutEffect } from 'react'

export default function MagneticButton({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isTouch, setIsTouch] = useState(true)

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <div
      ref={ref}
      className={className || "inline-block"}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        willChange: (position.x !== 0 || position.y !== 0) ? 'transform' : 'auto',
      }}
    >
      {children}
    </div>
  )
}
