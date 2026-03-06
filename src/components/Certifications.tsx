import { ScrollReveal } from './ScrollReveal'

/** Certifications — Simplilearn URLs are your certificate verification pages; Phil-Data has no URL */
const CERTIFICATIONS: { name: string; issuer: string; year?: string; url?: string }[] = [
  { name: 'Machine Learning using Python', issuer: 'Simplilearn (SkillUp)', url: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI2ODciLCJjZXJ0aWZpY2F0ZV91cmwiOiJodHRwczpcL1wvY2VydGlmaWNhdGVzLnNpbXBsaWNkbi5uZXRcL3NoYXJlXC85OTEyOTc3XzEwMTg1OTg2XzE3NzI1MTMxMjMzODUucG5nIiwidXNlcm5hbWUiOiJSb2pvaG4gTWljaGFlbCBEZSBHdXptYW4ifQ%3D%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F2789%2FMachine%2520Learning%2520using%2520Python%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1538902048035945694&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVdzJKNA1PzXVPNkyyrytKTUstKsrMS49PKsovL04tsvUBqkpN8cwDAGcoxVJBAAAA' },
  { name: 'Introduction to ITIL® 4 Foundation', issuer: 'Simplilearn (SkillUp)', url: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0MTg0IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvdGh1bWJfOTg5ODYxNy5wbmciLCJ1c2VybmFtZSI6bnVsbH0%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fdashboard%2Fcertificate&%24web_only=true&_branch_match_id=1538902048035945694&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVDysvK%2FTPDUgxM0iyrytKTUstKsrMS49PKsovL04tsvUBqkpN8cwDAKFyAeFBAAAA' },
  { name: 'Digital Security Fundamentals (IT Safety & Security Essentials)', issuer: 'Simplilearn (SkillUp)', url: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0NTQ2IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvOTg5ODI5NV8xMDE4NTk4Nl8xNzcyMTg5MzY1ODY0LnBuZyIsInVzZXJuYW1lIjoiUm9qb2huIE1pY2hhZWwgRGUgR3V6bWFuIn0%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fdashboard%2Fcertificate&%24web_only=true&_branch_match_id=1538902048035945694&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVL3YvMvEMy08yM0iyrytKTUstKsrMS49PKsovL04tsvUBqkpN8cwDAO0JMfhBAAAA' },
  { name: 'HP Customer Self-Repair Program and Basic Troubleshooting', issuer: 'Phil-Data Business Systems, Inc.', year: 'Oct 2025' },
]

function CertificateIcon() {
  return (
    <span className="cert-icon" aria-hidden>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    </span>
  )
}

export function Certifications() {
  return (
    <section
      id="certifications"
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
          Certifications
        </h2>
        <p
          className="cert-subtitle"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
            margin: 0,
            marginBottom: 'var(--space-2xl)',
            maxWidth: '36ch',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Professional and learning credentials.
        </p>
        <ul
          className="cert-list"
          style={{
            listStyle: 'none',
            margin: '0 auto',
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'var(--space-md)',
            maxWidth: '56rem',
          }}
        >
          {CERTIFICATIONS.map((cert, i) => (
            <ScrollReveal key={cert.name} delay={i * 50} direction={i % 2 === 0 ? 'left' : 'right'}>
              <li>
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-row"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-lg)',
                      padding: 'var(--space-lg) var(--space-xl)',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-lg)',
                      fontFamily: 'var(--font-body)',
                      textDecoration: 'none',
                      color: 'var(--text)',
                      transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 115, 22, 0.08)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <span className="cert-row-icon" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 'var(--radius)', background: 'var(--accent-muted)', color: 'var(--accent)' }}>
                      <CertificateIcon />
                    </span>
                    <span className="cert-row-content" style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontWeight: 700, fontSize: '1rem', display: 'block', marginBottom: 'var(--space-xs)' }}>
                        {cert.name}
                      </span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        {cert.issuer}
                        {cert.year ? ` · ${cert.year}` : ''}
                      </span>
                    </span>
                  </a>
                ) : (
                  <div
                    className="cert-row"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-lg)',
                      padding: 'var(--space-lg) var(--space-xl)',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-lg)',
                      fontFamily: 'var(--font-body)',
                      color: 'var(--text)',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 115, 22, 0.08)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <span className="cert-row-icon" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 'var(--radius)', background: 'var(--accent-muted)', color: 'var(--accent)' }}>
                      <CertificateIcon />
                    </span>
                    <span className="cert-row-content" style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontWeight: 700, fontSize: '1rem', display: 'block', marginBottom: 'var(--space-xs)' }}>
                        {cert.name}
                      </span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        {cert.issuer}
                        {cert.year ? ` · ${cert.year}` : ''}
                      </span>
                    </span>
                  </div>
                )}
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </ScrollReveal>
      <style>{`
        .cert-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .cert-icon svg {
          width: 28px;
          height: 28px;
        }
        .cert-row:hover .cert-row-icon {
          background: var(--accent);
          color: var(--bg);
        }
        .cert-row-icon {
          transition: background 0.2s ease, color 0.2s ease;
        }
        .cert-list {
          align-items: stretch;
        }
        .cert-list li {
          display: flex;
          min-height: 100%;
        }
        .cert-list li > * {
          flex: 1;
          min-width: 0;
          min-height: 0;
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .cert-list .cert-row {
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          text-align: center;
        }
        .cert-list .cert-row .cert-row-content {
          text-align: center;
        }
        @media (max-width: 640px) {
          #certifications h2 {
            font-size: 1.375rem !important;
            text-align: center;
          }
          #certifications .cert-subtitle {
            font-size: 0.875rem !important;
            text-align: center;
          }
          .cert-list {
            grid-template-columns: 1fr;
            padding: 0;
            max-width: 100%;
            width: 100%;
            gap: var(--space-lg);
          }
          .cert-list li {
            width: 100%;
            min-width: 0;
          }
          .cert-row {
            flex-direction: column !important;
            align-items: center;
            text-align: center;
            gap: var(--space-sm);
            padding: var(--space-lg) var(--space-md) !important;
            width: 100%;
            max-width: 100%;
            min-width: 0;
            min-height: 11rem;
            box-sizing: border-box;
          }
          .cert-row-icon {
            width: 48px !important;
            height: 48px !important;
            min-width: 48px;
            min-height: 48px;
            flex-shrink: 0;
          }
          .cert-row-content {
            min-width: 0;
            width: 100%;
            overflow-wrap: break-word;
            word-break: break-word;
            text-align: center;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .cert-row-content span:first-child {
            font-size: 0.9375rem !important;
            line-height: 1.4;
            margin-bottom: var(--space-xs);
          }
          .cert-row-content span:last-child {
            font-size: 0.8125rem !important;
            line-height: 1.4;
          }
          .cert-icon svg {
            width: 26px;
            height: 26px;
          }
        }
      `}</style>
    </section>
  )
}
