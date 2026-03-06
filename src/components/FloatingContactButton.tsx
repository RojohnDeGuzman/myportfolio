import { useState, useEffect } from 'react'

const SCROLL_THRESHOLD = 400

const contactItemBase = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--space-sm)',
  minWidth: 120,
  width: 120,
  minHeight: 44,
  height: 44,
  padding: 'var(--space-sm) var(--space-md)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  fontFamily: 'var(--font-body)',
  fontWeight: 600,
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: 'var(--text)',
  transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, color 0.2s, background 0.2s, border-color 0.2s',
  boxSizing: 'border-box' as const,
}

const iconSize = 18

function EnvelopeIcon() {
  return (
    <span className="floating-contact-icon" aria-hidden>
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    </span>
  )
}

function PhoneIcon() {
  return (
    <span className="floating-contact-icon" aria-hidden>
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    </span>
  )
}

function LinkedInIcon() {
  return (
    <span className="floating-contact-icon" aria-hidden>
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    </span>
  )
}

function ContactsIcon() {
  return (
    <span className="floating-contact-icon" aria-hidden>
      <svg width={iconSize + 2} height={iconSize + 2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M20 21a8 8 0 0 0-16 0" />
      </svg>
    </span>
  )
}

const MOBILE_BREAKPOINT = 640

export function FloatingContactButton() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  const MAIN_BUTTON_SIZE = 56

  const handleMouseEnter = () => {
    if (!isMobile) setExpanded(true)
  }
  const handleMouseLeave = () => {
    if (!isMobile) setExpanded(false)
  }
  const handleTriggerClick = () => {
    if (isMobile) setExpanded((prev) => !prev)
  }

  const PILL_WIDTH = 120
  const PILL_HEIGHT = 44

  return (
    <div
      className="floating-contact-wrapper"
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 40,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 'var(--space-xl)',
        pointerEvents: 'none',
      }}
    >
    <div
      className="floating-contact"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 'var(--space-sm)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.35s ease-out, transform 0.35s ease-out',
      }}
    >
      <a
        href="tel:+639217942076"
        aria-label="Phone"
        className="floating-contact-item"
        style={{
          ...contactItemBase,
          width: PILL_WIDTH,
          minHeight: PILL_HEIGHT,
          background: expanded ? 'var(--surface)' : 'transparent',
          color: expanded ? 'var(--text)' : 'transparent',
          boxShadow: expanded ? '0 4px 12px rgba(0,0,0,0.3)' : 'none',
          opacity: expanded ? 1 : 0,
          transform: expanded ? 'translateY(0)' : 'translateY(6px)',
          pointerEvents: expanded ? 'auto' : 'none',
        }}
      >
        <PhoneIcon />
        Phone
      </a>
      <a
        href="mailto:rojohn1123@gmail.com"
        aria-label="Email"
        className="floating-contact-item"
        style={{
          ...contactItemBase,
          width: PILL_WIDTH,
          minHeight: PILL_HEIGHT,
          background: expanded ? 'var(--surface)' : 'transparent',
          color: expanded ? 'var(--text)' : 'transparent',
          boxShadow: expanded ? '0 4px 12px rgba(0,0,0,0.3)' : 'none',
          opacity: expanded ? 1 : 0,
          transform: expanded ? 'translateY(0)' : 'translateY(6px)',
          pointerEvents: expanded ? 'auto' : 'none',
        }}
      >
        <EnvelopeIcon />
        Email
      </a>
      <a
        href="https://www.linkedin.com/in/rojohn-michael-de-guzman-41322a180/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="floating-contact-item"
        style={{
          ...contactItemBase,
          width: PILL_WIDTH,
          minHeight: PILL_HEIGHT,
          background: expanded ? 'var(--surface)' : 'transparent',
          color: expanded ? 'var(--text)' : 'transparent',
          boxShadow: expanded ? '0 4px 12px rgba(0,0,0,0.3)' : 'none',
          opacity: expanded ? 1 : 0,
          transform: expanded ? 'translateY(0)' : 'translateY(6px)',
          pointerEvents: expanded ? 'auto' : 'none',
        }}
      >
        <LinkedInIcon />
        LinkedIn
      </a>
      <button
        type="button"
        aria-label="Contacts"
        aria-expanded={expanded}
        className="floating-contact-trigger"
        style={{
          width: MAIN_BUTTON_SIZE,
          height: MAIN_BUTTON_SIZE,
          minWidth: MAIN_BUTTON_SIZE,
          minHeight: MAIN_BUTTON_SIZE,
          alignSelf: 'flex-end',
          borderRadius: '50%',
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          color: 'var(--text)',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={handleTriggerClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--accent)'
          e.currentTarget.style.color = 'var(--bg)'
          e.currentTarget.style.borderColor = 'var(--accent)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--surface)'
          e.currentTarget.style.color = 'var(--text)'
          e.currentTarget.style.borderColor = 'var(--border)'
        }}
      >
        <ContactsIcon />
      </button>
      </div>
      <style>{`
        .floating-contact-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }
        .floating-contact-icon svg {
          width: 100%;
          height: 100%;
        }
        .floating-contact-trigger .floating-contact-icon {
          width: 20px;
          height: 20px;
        }
        .floating-contact-trigger .floating-contact-icon svg {
          width: 100%;
          height: 100%;
        }
        .floating-contact-item {
          flex-shrink: 0;
        }
        .floating-contact-item:hover {
          background: var(--bg-elevated) !important;
          border-color: var(--accent) !important;
          color: var(--text) !important;
        }
        @media (max-width: 640px) {
          .floating-contact-wrapper {
            padding: var(--space-md);
          }
          .floating-contact {
            align-items: flex-end !important;
          }
          .floating-contact-item {
            min-height: 44px;
            height: 44px;
            width: 120px !important;
            min-width: 120px;
          }
        }
      `}</style>
    </div>
  )
}
