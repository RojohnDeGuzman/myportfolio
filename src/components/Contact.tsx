import { useState, useEffect, useRef, useMemo } from 'react'
import { ScrollReveal } from './ScrollReveal'

const TYPING_INTERVAL_MS = 45

export function Contact() {
  const [copyrightText, setCopyrightText] = useState('')
  const [startTyping, setStartTyping] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  const fullCopyright = useMemo(() => `© ${new Date().getFullYear()} Rojohn Michael De Guzman.`, [])

  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setStartTyping(true)
      },
      { threshold: 0.2, rootMargin: '0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!startTyping) return
    if (copyrightText.length >= fullCopyright.length) return
    const t = setTimeout(() => {
      setCopyrightText(fullCopyright.slice(0, copyrightText.length + 1))
    }, TYPING_INTERVAL_MS)
    return () => clearTimeout(t)
  }, [startTyping, copyrightText, fullCopyright])
  return (
    <section
      id="contact"
      style={{
        padding: 'var(--space-4xl) var(--space-xl)',
        maxWidth: '72rem',
        margin: '0 auto',
      }}
    >
      <ScrollReveal>
        <div
          className="contact-card"
          style={{
            padding: 'var(--space-4xl) var(--space-2xl)',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '3rem',
              height: '3px',
              background: 'var(--accent)',
              margin: '0 auto var(--space-lg)',
              borderRadius: 2,
            }}
          />
          <h2
            style={{
              fontFamily: 'var(--font-hero-title)',
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              letterSpacing: '-0.02em',
              margin: 0,
              marginBottom: 'var(--space-md)',
              color: 'var(--text)',
            }}
          >
            Let’s work together
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.0625rem',
              color: 'var(--text-muted)',
              margin: 0,
              marginBottom: 'var(--space-2xl)',
              maxWidth: '28ch',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Drop a line for projects, collabs, or just to say hi.
          </p>
          <div
            className="contact-links"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-md)',
              justifyContent: 'center',
              alignItems: 'stretch',
            }}
          >
            <a
              href="mailto:rojohn1123@gmail.com"
              className="contact-link contact-link--email"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-sm)',
                padding: 'var(--space-md) var(--space-xl)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                color: 'var(--text)',
                transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.background = 'var(--accent-muted)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.background = 'var(--bg-elevated)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span className="contact-link-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
              </span>
              <span>rojohn1123@gmail.com</span>
            </a>
            <a
              href="tel:+639217942076"
              className="contact-link contact-link--phone"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-sm)',
                padding: 'var(--space-md) var(--space-xl)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                color: 'var(--text)',
                transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.background = 'var(--accent-muted)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.background = 'var(--bg-elevated)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span className="contact-link-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span>+63 921 794 2076</span>
            </a>
          </div>
        </div>
      </ScrollReveal>
      <style>{`
        .contact-link-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }
        .contact-link-icon svg {
          width: 100%;
          height: 100%;
        }
        .typing-cursor {
          display: inline-block;
          margin-left: 1px;
          animation: typing-blink 0.8s step-end infinite;
          color: var(--accent);
        }
        @keyframes typing-blink {
          50% { opacity: 0; }
        }
        @media (max-width: 480px) {
          .contact-card {
            padding: var(--space-3xl) var(--space-lg);
          }
          .contact-links {
            flex-direction: column;
            align-items: center;
            width: 100%;
          }
          .contact-link {
            justify-content: center;
            width: 100%;
            max-width: 20rem;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .typing-cursor { animation: none; }
        }
      `}</style>
      <ScrollReveal delay={100}>
      <footer
        ref={footerRef}
        style={{
          marginTop: 'var(--space-3xl)',
          paddingTop: 'var(--space-xl)',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            margin: 0,
            minHeight: '1.5em',
          }}
          aria-label={fullCopyright}
        >
          {copyrightText}
          {startTyping && copyrightText.length < fullCopyright.length && (
            <span className="typing-cursor" aria-hidden>|</span>
          )}
        </p>
      </footer>
      </ScrollReveal>
    </section>
  )
}
