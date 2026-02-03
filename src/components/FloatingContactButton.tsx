import { useState, useEffect } from 'react'

const SCROLL_THRESHOLD = 400

const contactItemBase = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-sm)',
  padding: 'var(--space-sm) var(--space-md)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  fontFamily: 'var(--font-body)',
  fontWeight: 600,
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: 'var(--text)',
  transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, color 0.2s, background 0.2s, border-color 0.2s',
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

  return (
    <div
      className="floating-contact"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'fixed',
        bottom: 'var(--space-xl)',
        right: 'var(--space-xl)',
        zIndex: 40,
        display: 'grid',
        gridTemplateColumns: 'auto ' + MAIN_BUTTON_SIZE + 'px',
        gridTemplateRows: 'auto auto',
        gap: 'var(--space-sm)',
        alignItems: 'center',
        justifyItems: 'end',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.35s ease-out, transform 0.35s ease-out',
      }}
    >
      {/* Row 1 col 1: invisible placeholder so column 1 matches Phone width */}
      <span
        aria-hidden
        style={{
          visibility: 'hidden',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-sm)',
          padding: 'var(--space-sm) var(--space-md)',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          fontSize: '0.875rem',
          whiteSpace: 'nowrap',
        }}
      >
        <PhoneIcon />
        Phone
      </span>
      {/* Row 1 col 2: Email centered above main button */}
      <div
        style={{
          width: MAIN_BUTTON_SIZE,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <a
          href="mailto:rojohn1123@gmail.com"
          aria-label="Email"
          className="floating-contact-item"
          style={{
            ...contactItemBase,
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
      </div>
      {/* Row 2 col 1: Phone */}
      <a
        href="tel:+639217942076"
        aria-label="Phone"
        className="floating-contact-item"
        style={{
          ...contactItemBase,
          background: expanded ? 'var(--surface)' : 'transparent',
          color: expanded ? 'var(--text)' : 'transparent',
          boxShadow: expanded ? '0 4px 12px rgba(0,0,0,0.3)' : 'none',
          opacity: expanded ? 1 : 0,
          transform: expanded ? 'translateX(0)' : 'translateX(8px)',
          pointerEvents: expanded ? 'auto' : 'none',
        }}
      >
        <PhoneIcon />
        Phone
      </a>
      {/* Row 2 col 2: Main button */}
      <button
        type="button"
        aria-label="Contacts"
        aria-expanded={expanded}
        className="floating-contact-trigger"
        style={{
          width: MAIN_BUTTON_SIZE,
          height: MAIN_BUTTON_SIZE,
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
        .floating-contact-item:hover {
          background: var(--bg-elevated) !important;
          border-color: var(--accent) !important;
          color: var(--text) !important;
        }
      `}</style>
    </div>
  )
}
