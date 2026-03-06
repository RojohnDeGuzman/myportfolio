import { useState } from 'react'
import { ScrollReveal } from './ScrollReveal'

export function About() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section
      id="about"
      className={expanded ? 'about-section about-section--expanded' : 'about-section'}
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
            marginBottom: 'var(--space-3xl)',
            color: 'var(--text)',
            textAlign: 'center',
          }}
        >
          About
        </h2>
        <div className="about-grid">
          <ScrollReveal direction="left">
            <div className="about-card">
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.0625rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                I have hands-on experience designing and building internal tools, automation workflows, and websites that improve operational efficiency. I focus on creating clear processes, minimizing errors, and enabling teams to work smarter through solutions such as AI, ticketing systems, and streamlined cross-team coordination.
              </p>
            </div>
          </ScrollReveal>
          <div className="about-second-col">
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="about-expand-btn"
              aria-expanded={expanded}
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
            <div className="about-expandable">
              <ScrollReveal direction="right">
                <div className="about-card">
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1.0625rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    I also have experience with ticketing systems and remote-support tools, and I handle both hardware and software. My experience as technical support, together with a background in programming and a BS in Computer Science, drives me to keep deepening my skills in innovation and automation to deliver process improvements and adapt to modern IT trends.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </ScrollReveal>
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-xl);
          align-items: stretch;
        }
        .about-grid > * {
          height: 100%;
          min-height: 0;
        }
        .about-second-col {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .about-expand-btn {
          display: none;
        }
        .about-card {
          height: 100%;
          padding: var(--space-xl) var(--space-lg);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
        }
        .about-card:hover {
          border-color: var(--accent);
          box-shadow: 0 8px 24px rgba(249, 115, 22, 0.08);
          transform: translateY(-2px);
        }
        @media (max-width: 640px) {
          .about-section {
            padding: var(--space-3xl) var(--space-md) !important;
          }
          .about-section h2 {
            font-size: 1.375rem !important;
            text-align: center;
          }
          .about-grid {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
            text-align: center;
          }
          .about-grid > * { height: auto; }
          .about-card {
            padding: var(--space-lg) var(--space-md);
          }
          .about-card p {
            text-align: center;
            font-size: 0.9375rem !important;
            line-height: 1.65;
          }
          .about-second-col {
            flex-direction: column;
            gap: var(--space-md);
            align-items: stretch;
          }
          .about-expand-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: var(--space-md) var(--space-lg);
            font-family: var(--font-body);
            font-size: 0.875rem !important;
            font-weight: 600;
            color: var(--accent);
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            cursor: pointer;
            transition: border-color 0.2s, background 0.2s, color 0.2s;
          }
          .about-expand-btn:hover {
            border-color: var(--accent);
            background: var(--accent-muted);
          }
          .about-expandable {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease-out;
          }
          .about-section--expanded .about-expandable {
            max-height: 600px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-expandable { transition: none; }
        }
      `}</style>
    </section>
  )
}
