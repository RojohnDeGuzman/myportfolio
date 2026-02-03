import { useState, useEffect } from 'react'

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const SCROLL_THRESHOLD = 80
const AT_TOP_THRESHOLD = 100
const ACTIVE_SECTION_OFFSET = 120

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > SCROLL_THRESHOLD)
      setAtTop(y <= AT_TOP_THRESHOLD)
      const sectionIds = ['hero', 'about', 'projects', 'contact']
      let activeId: string | null = null
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= ACTIVE_SECTION_OFFSET && rect.bottom > ACTIVE_SECTION_OFFSET) {
          activeId = id
        }
      }
      setActiveSection(activeId)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <>
    <header
      className={`header-nav ${scrolled ? 'header-nav--scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? 'var(--space-sm) var(--space-xl)' : 'var(--space-md) var(--space-xl)',
        background: scrolled ? 'rgba(10, 10, 11, 0.95)' : 'rgba(10, 10, 11, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        boxShadow: scrolled ? undefined : 'none',
        transform: atTop ? 'translate(0, 0)' : 'translate(0, -100%)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <nav
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: scrolled ? '1.125rem' : '1.25rem',
            color: 'var(--text)',
            background: 'none',
            border: 'none',
            padding: 0,
            transition: 'font-size 0.3s ease',
          }}
        >
          Portfolio
        </button>

        <div className="nav-desktop-wrap">
          <ul
            style={{
              display: 'flex',
              gap: 'var(--space-xl)',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
            className={`nav-desktop ${atTop ? 'nav-desktop--visible' : ''}`}
          >
            {NAV.map(({ id, label }, index) => (
            <li
              key={id}
              className="nav-link-item"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <button
                type="button"
                onClick={() => scrollTo(id)}
                className={activeSection === id ? 'nav-link nav-link--active' : 'nav-link'}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: activeSection === id ? 'var(--text)' : 'var(--text-muted)',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== id) e.currentTarget.style.color = 'var(--text)'
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== id) e.currentTarget.style.color = 'var(--text-muted)'
                }}
              >
                {label}
              </button>
            </li>
          ))}
          </ul>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            padding: 'var(--space-sm)',
            color: 'var(--text)',
            flexDirection: 'column',
            gap: 6,
          }}
          className={`nav-mobile-trigger ${open ? 'nav-mobile-trigger--open' : ''}`}
        >
          <span className="burger-line burger-line--top" style={{ display: 'block', width: 24, height: 2, background: 'currentColor' }} />
          <span className="burger-line burger-line--mid" style={{ display: 'block', width: 24, height: 2, background: 'currentColor' }} />
          <span className="burger-line burger-line--bottom" style={{ display: 'block', width: 24, height: 2, background: 'currentColor' }} />
        </button>
      </nav>

      {open && (
        <div
          className="nav-mobile"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            padding: 'var(--space-lg)',
            background: 'var(--bg-elevated)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <ul className="nav-mobile-list" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', alignItems: 'center' }}>
            {NAV.map(({ id, label }) => (
              <li key={id} style={{ width: '100%', maxWidth: '72rem' }}>
                <button
                  type="button"
                  onClick={() => scrollTo(id)}
                  className="nav-mobile-link"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'var(--text)',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>{`
        .nav-desktop-wrap {
          display: flex;
          align-items: center;
        }
        .nav-link-item {
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .nav-desktop--visible .nav-link-item {
          opacity: 1;
          transform: translateY(0);
        }
        .nav-link {
          position: relative;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -4px;
          height: 2px;
          background: var(--accent);
          border-radius: 1px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .nav-link:hover::after,
        .nav-link--active::after {
          opacity: 1;
        }
        @media (max-width: 640px) {
          .header-nav {
            transform: translate(0, 0) !important;
          }
          .nav-desktop-wrap { display: none !important; }
          .nav-desktop { display: none !important; }
          .nav-mobile-trigger {
            display: flex !important;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s ease;
          }
          .nav-mobile-trigger:hover { transform: scale(1.05); }
          .burger-line {
            display: block;
            width: 24px;
            height: 2px;
            background: currentColor;
            border-radius: 1px;
            transition: transform 0.3s ease, opacity 0.25s ease;
            transform-origin: center;
          }
          .nav-mobile-trigger--open .burger-line--top {
            transform: translateY(8px) rotate(45deg);
          }
          .nav-mobile-trigger--open .burger-line--mid {
            opacity: 0;
            transform: scaleX(0);
          }
          .nav-mobile-trigger--open .burger-line--bottom {
            transform: translateY(-8px) rotate(-45deg);
          }
          .nav-mobile-list { align-items: center; }
          .nav-mobile-link { text-align: center !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nav-link-item { opacity: 1; transform: none; transition: none; }
          .nav-mobile-trigger .burger-line { transition: none; }
          .nav-mobile-trigger--open .burger-line--mid { opacity: 0; transform: none; }
        }
      `}</style>
    </header>

    {/* Top-right nav when main header is hidden (scrolled down) — desktop only */}
    <div
      className={`nav-top-right ${!atTop ? 'nav-top-right--visible' : ''}`}
      aria-hidden={atTop}
    >
      <div className="nav-top-right-wrap">
        <ul className="nav-top-right-list">
          <li>
            <button
              type="button"
              onClick={() => scrollTo('hero')}
              className="nav-top-right-title"
            >
              Portfolio
            </button>
          </li>
          {NAV.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => scrollTo(id)}
                className={activeSection === id ? 'nav-link nav-link--active' : 'nav-link'}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: activeSection === id ? 'var(--text)' : 'var(--text-muted)',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== id) e.currentTarget.style.color = 'var(--text)'
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== id) e.currentTarget.style.color = 'var(--text-muted)'
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        .nav-top-right {
          position: fixed;
          top: 0;
          right: 0;
          z-index: 45;
          opacity: 0;
          transform: translateY(-12px);
          pointer-events: none;
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-top-right--visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .nav-top-right-wrap {
          padding: var(--space-lg) var(--space-xl) var(--space-md) var(--space-lg);
          border-radius: 0 0 0 var(--radius-lg);
          border-left: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: rgba(10, 10, 11, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: -4px 4px 24px rgba(0, 0, 0, 0.2);
        }
        .nav-top-right-wrap:hover {
          border-left-color: var(--border);
          border-bottom-color: var(--border);
        }
        .nav-top-right-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          align-items: flex-end;
        }
        .nav-top-right-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1rem;
          color: var(--text);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: color 0.2s;
        }
        .nav-top-right-title:hover {
          color: var(--accent);
        }
        @media (max-width: 640px) {
          .nav-top-right { display: none !important; }
        }
      `}</style>
    </div>
    </>
  )
}
