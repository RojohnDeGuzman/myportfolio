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
              aria-label="Email rojohn1123@gmail.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
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
              <span>Email</span>
            </a>
            <a
              href="tel:+639217942076"
              className="contact-link contact-link--phone"
              aria-label="Call +63 921 794 2076"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
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
              <span>Phone</span>
            </a>
            <a
              href="https://www.linkedin.com/in/rojohn-michael-de-guzman-41322a180/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link contact-link--linkedin"
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </span>
              <span>LinkedIn</span>
            </a>
          </div>
          <div className="contact-cta-row" style={{ marginTop: 'var(--space-xl)' }}>
            <a
              href="/RojohnMichaelDeGuzman.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link contact-link--resume"
              aria-label="View resume (PDF)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-sm)',
                padding: 'var(--space-md) var(--space-xl)',
                background: 'var(--accent)',
                color: 'var(--bg)',
                border: 'none',
                borderRadius: 'var(--radius)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                textDecoration: 'none',
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
              <span className="contact-link-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </span>
              <span>View resume (PDF)</span>
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
        .contact-link--resume:focus-visible {
          outline: 2px solid var(--bg);
          outline-offset: 2px;
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
        @media (max-width: 640px) {
          .contact-card {
            padding: var(--space-3xl) var(--space-md) !important;
          }
          .contact-card h2 {
            font-size: 1.375rem !important;
            text-align: center;
          }
          .contact-card > p {
            font-size: 0.9375rem !important;
            text-align: center;
          }
          .contact-links {
            flex-direction: column;
            align-items: center;
            width: 100%;
            gap: var(--space-sm);
          }
          .contact-link {
            justify-content: center;
            width: 100%;
            max-width: 22rem;
            padding: var(--space-sm) var(--space-md) !important;
            font-size: 0.875rem !important;
          }
          #contact footer p {
            font-size: 0.8125rem !important;
            text-align: center;
          }
          .contact-cta-row {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
          }
          .contact-link--resume {
            width: 100%;
            max-width: 22rem;
          }
        }
        @media (max-width: 480px) {
          .contact-card {
            padding: var(--space-2xl) var(--space-md) !important;
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
