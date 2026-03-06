import { useState } from 'react'
import { ScrollReveal } from './ScrollReveal'

const PROJECTS = [
  {
    title: 'Organizational AI Bot',
    description: 'Designed and developed an AI bot that streamlined workflows and centralized operations across all departments at Casto Travel Philippines.',
    builtFor: 'Internal use · All departments',
    details: `Core purpose
Employees use an AI chatbot for common IT inquiries. The bot acts as Level 1 helpdesk support and is designed to help users from beginner to intermediate with their concerns step by step. It includes an escalation path: when the AI cannot help, users are directed to create a ticket or message the engineer on duty. The AI bot also has a company knowledge base with web scraping for company profile, HR inquiries, and GDS commands. It is a conversational AI trained for humanlike behavior.

Application
A Windows application widget built with Python, PyQt5, and Flask, integrated with Office 365 (MSAL) and REST APIs. Features include TTS (text-to-speech) and real-time conversation with the AI bot. Designed for easier use across the company.

`,
    tags: ['AI', 'Automation', 'Workflow', 'API', 'Integration', 'Widget', 'Office 365'],
    href: '#',
  },
  {
    title: 'Call Tracking Solution',
    description: 'A web-based application for call and transaction tracking, built so that agents across departments can log and search client calls and transactions in one place, with automated reports for internal and client requirements.',
    builtFor: '30+ departments · Internal & client reporting',
    details: `Core purpose
Centralize call and transaction records for 30+ departments, each with different requirements. Each logged entry captures all required inputs from calls, emails, and chats so client requirements and coordination are properly tracked and auditable.

Application
Internal web-based application built with PHP and Laravel, with login, call log trackers, and integration with Monday.com for automated reports. Reduces manual report creation before work proceeds to client requirements. Flexible automated reporting: monthly, quarterly, or annually.`,
    tags: ['Internal Tool', 'Coordination', 'Streamlined Process', 'Tracker', 'Monday.com', 'Automation', 'Reports'],
    href: '#',
  },
  {
    title: 'HR Ticketing System',
    description: 'HRD Helpdesk is an internal HR service portal created for employees to submit and track HR-related requests.',
    builtFor: 'Internal HR · Company-wide',
    details: `Core purpose
One place for employees to request HR services (recruitment/onboarding, payroll, employee data, benefits/leave, policy, employee relations, reassignment, equipment/facilities, exit/offboarding) and for HR to receive, track, and respond. Reduces email back-and-forth and keeps requests organized.

Application
Web-based application built with React, JavaScript, Node.js, and Express, with OAuth 2.0 login. Designed so employees can easily create a ticket for any HR inquiry. Features an engaging card-based layout for inquiry categories so users can quickly find what they need and submit a ticket to HR.`,
    tags: ['HR', 'Ticketing', 'Internal', 'OAuth', 'Portal', 'Helpdesk'],
    href: '#',
  },
  {
    title: 'Company Website Redesign',
    description: 'Redesigned and built a corporate website as a modern, fast, and maintainable Next.js application.',
    builtFor: 'Corporate · Public-facing',
    details: `Core purpose
Introduce a more modern, engaging, and improved website for the company, with improved SEO, stronger security, and smooth UI and UX for users.

Application
Next.js (App Router), React, TypeScript, and Tailwind CSS for a fast, responsive build. Designed for performance and maintainability.`,
    tags: ['Web', 'Design', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'SEO', 'UI/UX'],
    href: '#',
  },
]

export function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section
      id="projects"
      className="projects-section"
      style={{
        padding: 'var(--space-4xl) var(--space-xl)',
        maxWidth: '72rem',
        margin: '0 auto',
      }}
    >
      <ScrollReveal>
        <h2
          className="projects-title"
          style={{
            fontFamily: 'var(--font-hero-title)',
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            letterSpacing: '-0.02em',
            margin: 0,
            marginBottom: 'var(--space-3xl)',
            color: 'var(--text)',
          }}
        >
          Project highlights
        </h2>
      </ScrollReveal>
      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-lg)',
        }}
      >
        {PROJECTS.map(({ title, description, builtFor, details, tags }, index) => {
          const isExpanded = expandedIndex === index
          return (
            <li key={title}>
              <ScrollReveal delay={index * 80}>
              <div
                className="project-card"
                role="button"
                tabIndex={0}
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setExpandedIndex(isExpanded ? null : index)
                  }
                }}
                style={{
                  display: 'block',
                  padding: 'var(--space-xl)',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.background = 'var(--bg-elevated)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.background = 'var(--surface)'
                }}
              >
                <div className="project-card-row">
                  <div className="project-card-content">
                    <h3
                      style={{
                        fontFamily: 'var(--font-hero-title)',
                        fontWeight: 600,
                        fontSize: '1.25rem',
                        margin: 0,
                        marginBottom: 'var(--space-sm)',
                        color: 'var(--text)',
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9375rem',
                        color: 'var(--text-muted)',
                        margin: 0,
                        marginBottom: 'var(--space-sm)',
                      }}
                    >
                      {description}
                    </p>
                    {builtFor && (
                      <p
                        className="project-built-for"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.8125rem',
                          color: 'var(--accent)',
                          fontWeight: 500,
                          margin: 0,
                          marginBottom: 'var(--space-md)',
                        }}
                      >
                        Built for {builtFor}
                      </p>
                    )}
                    <div className="project-card-tags">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            padding: 'var(--space-xs) var(--space-sm)',
                            background: 'var(--accent-muted)',
                            color: 'var(--accent)',
                            borderRadius: 'var(--radius)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    className="project-card-chevron"
                    aria-hidden
                    style={{
                      flexShrink: 0,
                      display: 'inline-block',
                      width: 24,
                      height: 24,
                      transition: 'transform 0.35s ease-out',
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    ▼
                  </span>
                </div>
                <div
                  className="project-card-details"
                  style={{
                    display: 'grid',
                    gridTemplateRows: isExpanded ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.4s ease-out',
                  }}
                >
                  <div style={{ minHeight: 0, overflow: 'hidden' }}>
                    <div
                      className="project-card-details-inner"
                      style={{
                        marginTop: 'var(--space-xl)',
                        paddingTop: 'var(--space-xl)',
                        borderTop: '1px solid var(--border)',
                        opacity: isExpanded ? 1 : 0,
                        transition: 'opacity 0.35s ease-out',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '1rem',
                          color: 'var(--text-muted)',
                          lineHeight: 1.7,
                          margin: 0,
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {details.split(/(Core purpose|Application)\n/).map((part, i) =>
                          part === 'Core purpose' || part === 'Application' ? (
                            <span key={i}><span style={{ color: 'var(--text)' }}>{part}</span>{'\n'}</span>
                          ) : (
                            part
                          )
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              </ScrollReveal>
            </li>
          )
        })}
      </ul>
      <style>{`
        .project-card-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--space-md);
        }
        .project-card-content {
          flex: 1;
          min-width: 0;
        }
        .project-card:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        .project-card-tags {
          display: flex;
          gap: var(--space-sm);
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .projects-section h2 {
            font-size: 1.375rem !important;
            text-align: center;
          }
          .project-card {
            padding: var(--space-lg) var(--space-md) !important;
          }
          .project-card-row {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
          .project-card-content {
            text-align: center;
            width: 100%;
          }
          .project-card-content h3 {
            font-size: 1.125rem !important;
          }
          .project-card-content p {
            font-size: 0.875rem !important;
          }
          .project-built-for {
            font-size: 0.75rem !important;
            text-align: center;
          }
          .project-card-tags {
            justify-content: center;
          }
          .project-card-tags span {
            font-size: 0.6875rem !important;
          }
          .project-card-chevron {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: var(--space-xs);
          }
          .project-card-details-inner {
            text-align: center;
          }
          .project-card-details-inner p {
            font-size: 0.9375rem !important;
          }
        }
      `}</style>
    </section>
  )
}
