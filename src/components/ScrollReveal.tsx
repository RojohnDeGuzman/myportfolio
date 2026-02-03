import { useRef, useEffect, useState, type ReactNode } from 'react'

type ScrollRevealProps = {
  children: ReactNode
  /** CSS class name for the wrapper */
  className?: string
  /** Slide direction: up (default), down, left, or right */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** Delay in ms before animation (e.g. for stagger) */
  delay?: number
  /** Offset from viewport bottom (px) to trigger earlier/later */
  rootMargin?: string
  /** Fraction of element visibility to trigger (0–1) */
  threshold?: number
}

export function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  rootMargin = '0px 0px -48px 0px',
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            const t = setTimeout(() => setVisible(true), delay)
            return () => clearTimeout(t)
          }
          setVisible(true)
        }
      },
      { rootMargin, threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, rootMargin, threshold])

  const directionClass = direction !== 'up' ? `scroll-reveal--${direction}` : ''
  return (
    <div
      ref={ref}
      className={`scroll-reveal ${directionClass} ${visible ? 'scroll-reveal--visible' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  )
}
