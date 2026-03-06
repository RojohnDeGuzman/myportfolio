import { useState, useEffect, useRef } from 'react'

export function ScrollProgress() {
  const [pct, setPct] = useState(0)
  const rafId = useRef<number | null>(null)
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      rafId.current = requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement
        const total = scrollHeight - clientHeight
        setPct(total > 0 ? (scrollTop / total) * 100 : 0)
        ticking.current = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId.current != null) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'var(--border)',
        zIndex: 100,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          transformOrigin: 'left',
          transform: `scaleX(${pct / 100})`,
          background: 'var(--accent)',
          transition: 'transform 0.12s ease-out',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
