import { useState } from 'react'
import { ScrollReveal } from './ScrollReveal'

/* Icon URL from Simple Icons CDN; Microsoft family use alternate CDNs (Simple Icons removed them) */
const ICON_BASE = 'https://cdn.simpleicons.org'
const ACCENT_HEX = 'f97316'

/** icon = Simple Icons slug; iconUrl = full URL override (for logos missing from Simple Icons) */
const TECH_ITEMS: { name: string; icon?: string; iconUrl?: string }[] = [
  { name: 'Git', icon: 'git' },
  { name: 'GitHub', icon: 'github' },
  { name: 'Microsoft 365', iconUrl: 'https://api.iconify.design/mdi/microsoft-office.svg?color=%23f97316' },
  { name: 'Entra', iconUrl: 'https://api.iconify.design/mdi/microsoft.svg?color=%23f97316' },
  { name: 'API', icon: 'postman' },
  { name: 'Monday.com', icon: 'trello' },
  { name: 'MySQL', icon: 'mysql' },
  { name: 'ManageEngine SD Plus', icon: 'zoho' },
  { name: 'ManageEngine Endpoint Central', icon: 'zoho' },
  { name: 'Bitdefender', icon: 'bitdefender' },
  { name: 'Python', icon: 'python' },
  { name: 'Windows', iconUrl: 'https://api.iconify.design/simple-icons/windows.svg?color=%23f97316' },
  { name: 'SQL', icon: 'postgresql' },
  { name: 'JSON', icon: 'json' },
  { name: 'XML', icon: 'xml' },
  { name: 'Flask', icon: 'flask' },
  { name: 'PyQt5', icon: 'qt' },
  { name: 'Waitress', icon: 'gunicorn' },
  { name: 'LM Studio', icon: 'huggingface' },
  { name: 'SQLite', icon: 'sqlite' },
  { name: 'ChromaDB', icon: 'pandas' },
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'React', icon: 'react' },
  { name: 'JSX', icon: 'react' },
  { name: 'CSS', iconUrl: 'https://api.iconify.design/simple-icons/css3.svg?color=%23f97316' },
  { name: 'HTML', icon: 'html5' },
  { name: 'Express', icon: 'express' },
  { name: 'Nodemailer', icon: 'nodedotjs' },
  { name: 'REST', icon: 'swagger' },
  { name: 'PHP', icon: 'php' },
  { name: 'Blade', icon: 'laravel' },
  { name: 'Laravel', icon: 'laravel' },
  { name: 'Bootstrap', icon: 'bootstrap' },
  { name: 'jQuery', icon: 'jquery' },
  { name: 'Vue.js', icon: 'vuedotjs' },
  { name: 'Microsoft Graph', iconUrl: 'https://api.iconify.design/mdi/microsoft.svg?color=%23f97316' },
]

/** Tech support & IT skills — focused set for tag cloud; size 0–3 */
const TECH_SUPPORT_TAGS: { name: string; size: number }[] = [
  { name: 'Hardware & software troubleshooting', size: 0 },
  { name: 'Desktop, laptop & printer repair', size: 1 },
  { name: 'Diagnostic tools & software', size: 2 },
  { name: 'Ticketing systems', size: 3 },
  { name: 'Remote desktop support', size: 0 },
  { name: 'Microsoft Office', size: 1 },
  { name: 'Customer service', size: 2 },
  { name: 'Team collaboration', size: 3 },
  { name: 'Documentation & clear instructions', size: 0 },
  { name: 'Explaining technical issues to non-technical users', size: 1 },
  { name: 'Problem-solving & critical thinking', size: 2 },
  { name: 'IT service management', size: 3 },
  { name: 'Incident & change management', size: 0 },
  { name: 'Windows OS troubleshooting', size: 1 },
  { name: 'Remote user support', size: 2 },
  { name: 'HP Customer Self-Repair support', size: 3 },
  { name: 'Cybersecurity fundamentals', size: 0 },
  { name: 'Network security basics', size: 1 },
]

/** Resolve icon URL: use iconUrl if set, else build from Simple Icons slug */
function getIconUrl(item: { name: string; icon?: string; iconUrl?: string }): string | null {
  if (item.iconUrl) return item.iconUrl
  if (item.icon) return `${ICON_BASE}/${item.icon}/${ACCENT_HEX}`
  return null
}

function TechItem({ name, icon, iconUrl }: { name: string; icon?: string; iconUrl?: string }) {
  const url = getIconUrl({ name, icon, iconUrl })
  const [iconError, setIconError] = useState(false)
  const showIcon = url && !iconError
  return (
    <div
      className="tech-stack-item"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-sm)',
        flexShrink: 0,
        padding: 'var(--space-sm) var(--space-md)',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        fontFamily: 'var(--font-body)',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: 'var(--text)',
        whiteSpace: 'nowrap',
      }}
    >
      {showIcon ? (
        <img
          src={url!}
          alt=""
          aria-hidden
          width={22}
          height={22}
          style={{ display: 'block', objectFit: 'contain' }}
          onError={() => setIconError(true)}
        />
      ) : null}
      <span>{name}</span>
    </div>
  )
}

function MarqueeStrip({
  items,
  direction,
  className,
}: {
  items: typeof TECH_ITEMS
  direction: 'ltr' | 'rtl'
  className: string
}) {
  return (
    <div
      className={className}
      style={{
        overflow: 'hidden',
        width: '100%',
        maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
      }}
      aria-hidden
    >
      <div
        className={direction === 'ltr' ? 'tech-marquee-inner tech-marquee-ltr' : 'tech-marquee-inner tech-marquee-rtl'}
        style={{
          display: 'flex',
          gap: 'var(--space-md)',
          width: 'max-content',
        }}
      >
        {[...items, ...items].map((item, i) => (
          <TechItem key={`${item.name}-${i}`} name={item.name} icon={item.icon} iconUrl={item.iconUrl} />
        ))}
      </div>
    </div>
  )
}

export function TechStack() {
  const half = Math.ceil(TECH_ITEMS.length / 2)
  const row1 = TECH_ITEMS.slice(0, half)
  const row2 = TECH_ITEMS.slice(half)

  return (
    <>
    <section
      id="tech-stack"
      style={{
        padding: 'var(--space-4xl) var(--space-xl)',
        maxWidth: '72rem',
        margin: '0 auto',
      }}
    >
      <ScrollReveal>
        <h2
          className="tech-stack-title"
          style={{
            fontFamily: 'var(--font-hero-title)',
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            letterSpacing: '-0.02em',
            margin: 0,
            marginBottom: 'var(--space-sm)',
            color: 'var(--text)',
            textAlign: 'center',
          }}
        >
          Technologies & tools
        </h2>
        <div
          className="tech-stack-accent"
          style={{
            width: '3rem',
            height: '3px',
            background: 'var(--accent)',
            margin: '0 auto var(--space-xl)',
            borderRadius: 2,
          }}
          aria-hidden
        />
        <div
          className="tech-stack-rows"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-lg)',
          }}
        >
          <MarqueeStrip items={row1} direction="ltr" className="tech-marquee-row tech-marquee-row--1" />
          <MarqueeStrip items={row2} direction="rtl" className="tech-marquee-row tech-marquee-row--2" />
        </div>
      </ScrollReveal>
      <style>{`
        /* Technologies & tools – entrance and hover */
        .tech-stack-title {
          opacity: 0;
          transform: translateY(14px);
          animation: tech-stack-title-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
        }
        .tech-stack-accent {
          opacity: 0;
          transform: scaleX(0);
          transform-origin: center;
          animation: tech-stack-accent-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.25s forwards;
        }
        .tech-marquee-row--1 {
          opacity: 0;
          transform: translateY(10px);
          animation: tech-stack-row-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.35s forwards;
        }
        .tech-marquee-row--2 {
          opacity: 0;
          transform: translateY(10px);
          animation: tech-stack-row-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
        }
        @keyframes tech-stack-title-in {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tech-stack-accent-in {
          to { opacity: 1; transform: scaleX(1); }
        }
        @keyframes tech-stack-row-in {
          to { opacity: 1; transform: translateY(0); }
        }
        #tech-stack .tech-stack-item {
          transition: transform 0.25s ease, border-color 0.2s ease, box-shadow 0.25s ease;
        }
        #tech-stack .tech-stack-item:hover {
          transform: scale(1.04);
          border-color: var(--accent);
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.15);
        }
        .tech-marquee-row {
          --marquee-duration: 45s;
        }
        .tech-marquee-inner {
          animation: var(--marquee-duration) linear infinite;
        }
        .tech-marquee-ltr {
          animation-name: tech-scroll-ltr;
        }
        .tech-marquee-rtl {
          animation-name: tech-scroll-rtl;
        }
        @keyframes tech-scroll-ltr {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes tech-scroll-rtl {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tech-marquee-inner {
            animation: none;
          }
          .tech-stack-title,
          .tech-stack-accent,
          .tech-marquee-row--1,
          .tech-marquee-row--2 {
            animation: none;
            opacity: 1;
            transform: none;
          }
          #tech-stack .tech-stack-item {
            transition: none;
          }
        }
        @media (max-width: 640px) {
          #tech-stack h2 {
            font-size: 1.375rem !important;
            text-align: center;
          }
          .tech-stack-item {
            font-size: 0.8125rem !important;
          }
        }
      `}</style>
    </section>
    <section
      id="technical-skills"
      style={{
        padding: 'var(--space-4xl) var(--space-xl)',
        maxWidth: '72rem',
        margin: '0 auto',
      }}
    >
      <ScrollReveal>
        <h2
          className="tech-support-title"
          style={{
            fontFamily: 'var(--font-hero-title)',
            fontWeight: 700,
            fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
            letterSpacing: '-0.02em',
            margin: 0,
            marginBottom: 'var(--space-md)',
            color: 'var(--text)',
            textAlign: 'center',
          }}
        >
          Technical Skills
        </h2>
        <div
          className="tech-support-accent-line"
          style={{
            width: '3rem',
            height: '3px',
            background: 'var(--accent)',
            margin: '0 auto var(--space-lg)',
            borderRadius: 2,
          }}
          aria-hidden
        />
        <p
          className="tech-support-desc"
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
            lineHeight: 1.6,
          }}
        >
          From hands-on support to building the tools, skills that bridge users and systems.
        </p>
        <div className="tech-support-tagcloud" aria-label="Technical skills">
          {TECH_SUPPORT_TAGS.map(({ name, size }, index) => (
            <span
              key={name}
              className={`tag-cloud-tag tag-cloud-tag--size-${size}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {name}
            </span>
          ))}
        </div>
      </ScrollReveal>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .tech-support-title,
          .tech-support-accent-line,
          .tech-support-desc {
            animation: none;
            opacity: 1;
            transform: none;
          }
          .tag-cloud-tag {
            animation: none;
            opacity: 1;
          }
        }
        .tech-support-title {
          display: block;
          animation: tech-skills-title-in 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
        }
        .tech-support-accent-line {
          transform-origin: center;
          animation: tech-skills-line-draw 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.25s both;
        }
        .tech-support-desc {
          display: block;
          animation: tech-skills-desc-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both;
        }
        @keyframes tech-skills-title-in {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(16px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes tech-skills-line-draw {
          from {
            opacity: 0;
            transform: scaleX(0);
          }
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }
        @keyframes tech-skills-desc-in {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .tech-support-tagcloud {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: var(--space-sm) var(--space-md);
          padding: var(--space-md) 0 0;
          max-width: 48rem;
          margin: 0 auto;
        }
        .tag-cloud-tag {
          display: inline-block;
          padding: var(--space-xs) var(--space-md);
          min-height: 2rem;
          line-height: 2rem;
          box-sizing: border-box;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: 999px;
          font-family: var(--font-body);
          font-weight: 500;
          color: var(--text);
          opacity: 0;
          transform-origin: center center;
          animation: tech-tag-pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s ease, box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes tech-tag-pop-in {
          from {
            opacity: 0;
            transform: scale(0.6) rotate(-8deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        .tag-cloud-tag--size-0 { font-size: 0.75rem; }
        .tag-cloud-tag--size-1 { font-size: 0.875rem; }
        .tag-cloud-tag--size-2 { font-size: 1rem; }
        .tag-cloud-tag--size-3 { font-size: 1.0625rem; }
        #technical-skills .tag-cloud-tag:hover {
          opacity: 1;
          transform: scale(1.12);
          border-color: var(--accent);
          box-shadow: 0 4px 16px rgba(249, 115, 22, 0.25);
        }
        @media (max-width: 640px) {
          #technical-skills .tech-support-title {
            font-size: 1.375rem !important;
            text-align: center;
          }
          .tech-support-desc {
            font-size: 0.875rem !important;
            text-align: center;
          }
          .tech-support-tagcloud {
            justify-content: center;
            padding: var(--space-md) 0 0;
            gap: var(--space-sm);
          }
          .tag-cloud-tag {
            min-height: 1.75rem;
            line-height: 1.75rem;
            padding: var(--space-xs) var(--space-sm);
          }
          .tag-cloud-tag--size-0 { font-size: 0.6875rem !important; }
          .tag-cloud-tag--size-1 { font-size: 0.75rem !important; }
          .tag-cloud-tag--size-2 { font-size: 0.8125rem !important; }
          .tag-cloud-tag--size-3 { font-size: 0.875rem !important; }
        }
      `}</style>
    </section>
    </>
  )
}
