import { useState, useEffect } from 'react'

const STORAGE_KEY = 'portfolio-cookie-notice-seen'

export function CookieNotice() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const seen = localStorage.getItem(STORAGE_KEY)
      if (!seen) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    try {
      localStorage.setItem(STORAGE_KEY, 'true')
    } catch {}
  }

  if (!visible) return null

  return (
    <div
      className="cookie-notice"
      role="dialog"
      aria-label="Cookie notice"
      style={{
        position: 'fixed',
        bottom: 'var(--space-xl)',
        left: '50%',
        transform: 'translateX(-50%) translateY(20px)',
        maxWidth: 'min(520px, calc(100vw - 2 * var(--space-xl)))',
        minWidth: 'min(360px, calc(100vw - 2 * var(--space-xl)))',
        zIndex: 60,
        padding: 'var(--space-xl) var(--space-2xl)',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(249, 115, 22, 0.08)',
        opacity: 0,
        animation: 'cookie-notice-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      }}
    >
      <div className="cookie-notice-inner">
        <span
          className="cookie-notice-icon"
          aria-hidden
          style={{
            flexShrink: 0,
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--accent-muted)',
            borderRadius: 'var(--radius)',
            color: 'var(--accent)',
            fontSize: '1.25rem',
          }}
        >
          ✦
        </span>
        <button
          type="button"
          onClick={dismiss}
          className="cookie-notice-btn"
          style={{
            flexShrink: 0,
            marginLeft: 'auto',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: '0.875rem',
            padding: 'var(--space-sm) var(--space-md)',
            background: 'var(--accent)',
            color: 'var(--bg)',
            border: 'none',
            borderRadius: 'var(--radius)',
            cursor: 'pointer',
            transition: 'background 0.2s, transform 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--accent-hover)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--accent)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Got it
        </button>
        <div
          className="cookie-notice-content"
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 'var(--space-md)',
            flexWrap: 'wrap',
          }}
        >
          <p className="cookie-notice-text" style={{
            flex: 1,
            minWidth: 0,
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: 'var(--text)',
            margin: 0,
            lineHeight: 1.5,
          }}>
            <strong style={{ fontFamily: 'var(--font-heading)' }}>No cookies, no tracking.</strong>
            {' '}
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>
              This site keeps it simple, nothing is stored, nothing is tracked.
            </span>
          </p>
          <span className="cookie-notice-title-mobile">
            No cookies, no tracking.
          </span>
          <span className="cookie-notice-desc-mobile">
            This site keeps it simple, nothing is stored, nothing is tracked.
          </span>
        </div>
      </div>
      <style>{`
        @keyframes cookie-notice-in {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        .cookie-notice {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .cookie-notice-inner {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: var(--space-lg);
          width: 100%;
        }
        .cookie-notice-content {
          order: 2;
        }
        .cookie-notice-btn {
          order: 3;
        }
        .cookie-notice-title-mobile,
        .cookie-notice-desc-mobile {
          display: none;
        }
        @media (max-width: 480px) {
          .cookie-notice-inner {
            display: grid;
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto;
            gap: var(--space-xs) var(--space-sm);
            align-items: center;
          }
          .cookie-notice-content {
            grid-column: 1;
            grid-row: 1 / -1;
            order: unset;
            align-self: center;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0;
          }
          .cookie-notice-text {
            display: none !important;
          }
          .cookie-notice-title-mobile {
            display: block;
            font-family: var(--font-hero-title);
            font-size: 0.9375rem;
            font-weight: 700;
            color: var(--text);
            margin: 0 0 var(--space-xs) 0;
            line-height: 1.3;
            letter-spacing: -0.02em;
          }
          .cookie-notice-desc-mobile {
            display: block;
            font-family: var(--font-body);
            font-size: 0.8125rem;
            font-weight: 400;
            color: var(--text-muted);
            line-height: 1.5;
            margin: 0;
            text-align: left;
            padding-right: var(--space-xs);
          }
          .cookie-notice-icon {
            grid-column: 2;
            grid-row: 1;
            justify-self: center;
          }
          .cookie-notice-btn {
            grid-column: 2;
            grid-row: 2;
            order: unset;
            margin-left: 0;
            padding: var(--space-xs) var(--space-sm);
            font-size: 0.75rem;
            justify-self: center;
          }
          .cookie-notice {
            left: 50%;
            right: auto;
            width: calc(100% - 2 * var(--space-xs));
            max-width: none;
            min-width: 0;
            padding: var(--space-sm) var(--space-sm) var(--space-sm) var(--space-xs);
            bottom: var(--space-sm);
            border-radius: var(--radius);
          }
          .cookie-notice .cookie-notice-icon {
            width: 28px;
            height: 28px;
            font-size: 0.875rem;
          }
          @keyframes cookie-notice-in {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .cookie-notice {
            animation: none;
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
