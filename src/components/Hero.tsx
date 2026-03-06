import { ScrollReveal } from './ScrollReveal'

export function Hero() {
  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'var(--space-4xl) var(--space-xl) var(--space-3xl)',
        maxWidth: '72rem',
        margin: '0 auto',
      }}
    >
      <div style={{ width: '100%' }} className="hero-content">
        <ScrollReveal rootMargin="0px" threshold={0} direction="up">
          <h1
            className="hero-title"
            style={{
              fontFamily: 'var(--font-hero-title)',
              fontWeight: 800,
              fontSize: 'clamp(1.5rem, 5.5vw, 4.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: 0,
              marginBottom: 'var(--space-lg)',
              whiteSpace: 'nowrap',
            }}
          >
            Rojohn Michael De Guzman
          </h1>
        </ScrollReveal>
        <ScrollReveal rootMargin="0px" threshold={0} direction="down" delay={120}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.125rem',
              color: 'var(--text-muted)',
              maxWidth: '42ch',
              marginBottom: 'var(--space-2xl)',
            }}
          >
            Experience in building automations and AI solutions that make IT and operations more efficient, innovative and adaptive to evolving AI and business needs.
          </p>
          <div className="hero-buttons" style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
          <a
            href="#projects"
            className="hero-btn hero-btn-from-left"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.9375rem',
              padding: 'var(--space-md) var(--space-xl)',
              background: 'var(--accent)',
              color: 'var(--bg)',
              borderRadius: 'var(--radius)',
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent-hover)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--accent)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            View work
          </a>
          <a
            href="#contact"
            className="hero-btn hero-btn-from-right"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.9375rem',
              padding: 'var(--space-md) var(--space-xl)',
              background: 'transparent',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--text-muted)'
              e.currentTarget.style.color = 'var(--text)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text)'
            }}
          >
            Get in touch
          </a>
          </div>
        </ScrollReveal>
      </div>
      <style>{`
        .hero-btn-from-left {
          opacity: 0;
          animation: hero-btn-from-left 0.55s ease-out 0.45s forwards;
        }
        .hero-btn-from-right {
          opacity: 0;
          animation: hero-btn-from-right 0.55s ease-out 0.55s forwards;
        }
        @keyframes hero-btn-from-left {
          from { opacity: 0; transform: translateX(-72px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes hero-btn-from-right {
          from { opacity: 0; transform: translateX(72px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-btn-from-left,
          .hero-btn-from-right {
            opacity: 1;
            animation: none;
          }
        }
        @media (max-width: 640px) {
          .hero-section {
            justify-content: center;
            text-align: center;
            padding: var(--space-3xl) var(--space-md) !important;
          }
          .hero-content { display: flex; flex-direction: column; align-items: center; text-align: center; }
          .hero-content p {
            font-size: 1rem !important;
            text-align: center;
            max-width: 100%;
          }
          .hero-title {
            white-space: normal !important;
            text-align: center;
            font-size: clamp(1.25rem, 6vw, 1.75rem) !important;
            line-height: 1.2;
          }
          .hero-buttons { justify-content: center; }
          .hero-btn {
            font-size: 0.875rem !important;
            padding: 0.625rem 1.25rem !important;
          }
        }
      `}</style>
    </section>
  )
}
