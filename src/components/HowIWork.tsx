import React from 'react'
import { ScrollReveal } from './ScrollReveal'

const PRINCIPLES = [
  { title: 'Start with the problem', text: 'I focus on the user’s pain first, then choose the simplest solution that fixes it.' },
  { title: 'Simple over clever', text: 'I prefer clear, maintainable code and straightforward flows over clever tricks.' },
  { title: 'Document as I build', text: 'I keep processes and decisions written down so the next person can run with it.' },
  { title: 'Ship and iterate', text: 'Get something useful out first, then improve based on feedback.' },
  { title: 'Listen before building', text: 'I ask questions and observe how people work before proposing or building a solution.' },
  { title: 'Automate the repetitive', text: 'If we do it more than twice, I look for a safe way to automate or streamline it.' },
  { title: 'Test with real use', text: 'I validate with real workflows and real users so the solution actually fits the job.' },
  { title: 'Security and clarity', text: 'I build with security and privacy in mind and keep access and data flow transparent.' },
]

export function HowIWork() {
  return (
    <section
      id="how-i-work"
      className="how-i-work-section"
      style={{
        padding: 'var(--space-4xl) var(--space-xl)',
        maxWidth: '72rem',
        margin: '0 auto',
      }}
    >
      <ScrollReveal>
        <h2
          style={{
            fontFamily: 'var(--font-hero-title)',
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            letterSpacing: '-0.02em',
            margin: 0,
            marginBottom: 'var(--space-md)',
            color: 'var(--text)',
            textAlign: 'center',
          }}
        >
          How I work
        </h2>
        <div
          className="how-i-work-accent"
          style={{
            width: '3rem',
            height: '3px',
            background: 'var(--accent)',
            margin: '0 auto var(--space-2xl)',
            borderRadius: 2,
          }}
          aria-hidden
        />
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
            margin: '0 auto var(--space-2xl)',
            maxWidth: '40ch',
            lineHeight: 1.6,
          }}
        >
          Principles I follow so the work stays clear, useful, and easy to hand off.
        </p>
        <ul className="how-i-work-list" style={{ listStyle: 'none', margin: '0 auto', padding: 0 }}>
          {PRINCIPLES.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 80}>
              <li
                className={`how-i-work-item how-i-work-item--${i % 2 === 0 ? 'left' : 'right'}`}
                style={{ '--i': i } as React.CSSProperties}
              >
                <>
                <span className="how-i-work-item-number" aria-hidden>
                  {i + 1}
                </span>
                <div className="how-i-work-item-inner">
                  <span className="how-i-work-item-title">{item.title}</span>
                  <p className="how-i-work-item-text">{item.text}</p>
                </div>
                </>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </ScrollReveal>
      <style>{`
        .how-i-work-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg) var(--space-xl);
          max-width: 56rem;
          margin: 0 auto;
          align-items: stretch;
          justify-items: stretch;
        }
        .how-i-work-list > * {
          min-height: 100%;
          display: flex;
        }
        .how-i-work-accent {
          transform-origin: center;
          animation: how-i-work-accent-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s backwards;
        }
        .how-i-work-item {
          display: flex;
          flex: 1;
          min-width: 0;
          gap: var(--space-md);
          align-items: center;
          padding: 0;
          opacity: 0;
          animation-duration: 0.65s;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          animation-fill-mode: forwards;
        }
        .how-i-work-item--left {
          animation-name: how-i-work-in-left;
          animation-delay: calc(var(--i, 0) * 0.08s);
        }
        .how-i-work-item--right {
          animation-name: how-i-work-in-right;
          animation-delay: calc(var(--i, 0) * 0.08s);
        }
        .how-i-work-item-inner {
          flex: 1;
          min-width: 0;
          padding: var(--space-lg) var(--space-xl);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .how-i-work-item-inner::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--accent);
          transform: scaleY(0);
          transform-origin: center top;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .how-i-work-item:hover .how-i-work-item-inner,
        .how-i-work-item:focus-within .how-i-work-item-inner {
          border-color: var(--accent);
          box-shadow: 0 12px 32px rgba(249, 115, 22, 0.15);
          transform: translateY(-4px);
        }
        .how-i-work-item:hover .how-i-work-item-inner::before,
        .how-i-work-item:focus-within .how-i-work-item-inner::before {
          transform: scaleY(1);
        }
        .how-i-work-item-number {
          flex-shrink: 0;
          width: 2.25rem;
          height: 2.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-hero-title);
          font-weight: 700;
          font-size: 0.875rem;
          color: var(--accent);
          background: var(--accent-muted);
          border-radius: 50%;
          transition: background 0.3s ease, color 0.3s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          animation: how-i-work-number-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: calc(var(--i, 0) * 0.08s + 0.15s);
          opacity: 0;
          transform: scale(0);
        }
        .how-i-work-item:hover .how-i-work-item-number,
        .how-i-work-item:focus-within .how-i-work-item-number {
          background: var(--accent);
          color: var(--bg);
          transform: scale(1.1);
        }
        .how-i-work-item-title {
          font-family: var(--font-hero-title);
          font-weight: 600;
          font-size: 1rem;
          color: var(--text);
          display: block;
          margin-bottom: var(--space-sm);
          transition: color 0.25s ease, transform 0.25s ease;
        }
        .how-i-work-item:hover .how-i-work-item-title,
        .how-i-work-item:focus-within .how-i-work-item-title {
          color: var(--accent);
        }
        .how-i-work-item-text {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          color: var(--text-muted);
          margin: 0;
          line-height: 1.6;
          transition: color 0.25s ease;
        }
        @keyframes how-i-work-in-left {
          from {
            opacity: 0;
            transform: translateX(-28px) translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }
        @keyframes how-i-work-in-right {
          from {
            opacity: 0;
            transform: translateX(28px) translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }
        @keyframes how-i-work-number-in {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes how-i-work-accent-in {
          from {
            opacity: 0;
            transform: scaleX(0);
          }
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }
        .how-i-work-item:focus-within .how-i-work-item-inner {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        @media (max-width: 768px) {
          .how-i-work-list {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          #how-i-work h2 {
            font-size: 1.375rem !important;
            text-align: center;
          }
          #how-i-work .how-i-work-accent {
            margin-bottom: var(--space-xl);
          }
          #how-i-work > div > p {
            font-size: 0.875rem !important;
            text-align: center;
          }
          .how-i-work-list {
            grid-template-columns: 1fr;
            gap: var(--space-md);
          }
          .how-i-work-item {
            flex-direction: row;
            align-items: center;
          }
          .how-i-work-item-inner {
            padding: var(--space-md) var(--space-lg) !important;
          }
          .how-i-work-item-title {
            font-size: 0.9375rem;
          }
          .how-i-work-item-text {
            font-size: 0.875rem !important;
          }
          .how-i-work-item-number {
            width: 2rem;
            height: 2rem;
            font-size: 0.8125rem;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .how-i-work-item {
            animation: none;
            opacity: 1;
            transform: none;
          }
          .how-i-work-item-number {
            animation: none;
            opacity: 1;
            transform: none;
          }
          .how-i-work-accent {
            animation: none;
          }
          .how-i-work-item-inner,
          .how-i-work-item-inner::before,
          .how-i-work-item-number {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}
