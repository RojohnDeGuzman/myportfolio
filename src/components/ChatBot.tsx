import { useState, useRef, useEffect } from 'react'

type Message = { role: 'user' | 'assistant'; content: string }

/** Typewriter reveal for assistant messages */
function TypewriterText({ text, speed = 18, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [revealed, setRevealed] = useState(0)
  const isDone = revealed >= text.length
  useEffect(() => {
    if (isDone) {
      onDone?.()
      return
    }
    const t = setTimeout(() => setRevealed((r) => Math.min(r + 1, text.length)), speed)
    return () => clearTimeout(t)
  }, [revealed, text.length, speed, isDone, onDone])
  return <>{text.slice(0, revealed)}{!isDone && <span className="chat-bot-caret" aria-hidden />}</>
}

/** Section IDs on the portfolio page → display label for "View in portfolio" link */
const SECTION_LABELS: Record<string, string> = {
  'tech-stack': 'Tech Stack',
  'about': 'About',
  'how-i-work': 'How I Work',
  'projects': 'Projects',
  'certifications': 'Certifications',
  'contact': 'Contact',
  'hero': 'Hero',
}

/** Parses (See: #section-id) from the end of a message; returns main text and optional section id */
function parseSeeSection(content: string): { main: string; sectionId: string | null } {
  const match = content.match(/\s*\(See:\s*#([a-z0-9-]+)\)\s*$/i)
  if (!match) return { main: content.trim(), sectionId: null }
  const sectionId = match[1].toLowerCase()
  if (!SECTION_LABELS[sectionId]) return { main: content.trim(), sectionId: null }
  return {
    main: content.slice(0, match.index).trim(),
    sectionId,
  }
}

const CHAT_API = `${import.meta.env.VITE_CHAT_API_BASE ?? ''}/api/chat`

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Hey! I'm here to help you get to know Rojohn, his work, skills, projects, or just how to reach him. Pick a prompt below or ask me anything!",
}

const SUGGESTED_PROMPTS = [
  "What are Rojohn's key projects?",
  "What's his experience and background?",
  "How can I contact him?",
  "What technologies does he use?",
  "Tell me about his certifications.",
]

/** Follow-up prompts shown after the bot replies. Section-specific when the last reply links to a section. */
const FOLLOW_UP_PROMPTS: string[] = [
  "Tell me more",
  "What are his key projects?",
  "What technologies does he use?",
  "How can I contact him?",
  "What's his experience?",
]

const FOLLOW_UP_BY_SECTION: Record<string, string[]> = {
  'tech-stack': [
    "What projects use these technologies?",
    "What's his experience with Python?",
    "How can I contact him?",
    "Tell me about his certifications.",
  ],
  'about': [
    "What are his key projects?",
    "How does he approach work?",
    "How can I contact him?",
    "What technologies does he use?",
  ],
  'how-i-work': [
    "What are his key projects?",
    "What's his experience?",
    "How can I contact him?",
  ],
  'projects': [
    "What technologies did he use for these?",
    "How can I contact him?",
    "What's his experience?",
    "Tell me about his certifications.",
  ],
  'certifications': [
    "What's his educational background?",
    "What technologies does he use?",
    "How can I contact him?",
  ],
  'contact': [
    "What are his key projects?",
    "What technologies does he use?",
    "Is he open to new opportunities?",
  ],
  'hero': FOLLOW_UP_PROMPTS,
}

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [typewriterCompletedUpToIndex, setTypewriterCompletedUpToIndex] = useState(-1)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const showSuggestions = messages.length === 1 && !loading

  useEffect(() => {
    if (open && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [open, messages])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  const close = () => {
    setOpen(false)
    setTypewriterCompletedUpToIndex(messages.length - 1)
  }

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE])
    setInput('')
    setTypewriterCompletedUpToIndex(0)
    inputRef.current?.focus()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      close()
    }
  }

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    setInput('')
    const userMessage: Message = { role: 'user', content: trimmed }
    setMessages((prev) => [...prev, userMessage])
    setLoading(true)
    try {
      const history = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }))
      const res = await fetch(CHAT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history }),
      })
      const raw = await res.text()
      let data: { reply?: string; error?: string }
      try {
        data = raw.length > 0 ? JSON.parse(raw) : {}
      } catch {
        throw new Error(
          res.ok
            ? 'Invalid response from chat.'
            : res.status === 404
              ? 'Chat API not found. Locally: add VITE_CHAT_API_BASE in .env.local to your Vercel URL (e.g. https://your-app.vercel.app) and restart the dev server.'
              : 'Chat API is unavailable. If GROQ_API_KEY is set in Vercel, trigger a new deployment so the function picks it up.'
        )
      }
      if (!res.ok) {
        const msg = data?.error ?? 'Request failed'
        throw new Error(
          msg.includes('GROQ_API_KEY') || msg.includes('not configured')
            ? 'Server: GROQ_API_KEY not set for this deployment. In Vercel → Settings → Environment Variables, add GROQ_API_KEY for Production, then redeploy.'
            : msg
        )
      }
      const reply = data.reply?.trim()
      const content = reply || 'No reply from the assistant.'
      setMessages((prev) => [...prev, { role: 'assistant', content }])
    } catch (e) {
      const err = e instanceof Error ? e.message : 'Something went wrong.'
      setMessages((prev) => [...prev, { role: 'assistant', content: `Sorry — ${err}` }])
    } finally {
      setLoading(false)
    }
  }

  const send = () => sendMessage(input)
  const onSuggestionClick = (prompt: string) => sendMessage(prompt)

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        className="chat-bot-trigger"
        onClick={() => setOpen((o) => !o)}
        style={{
          position: 'fixed',
          bottom: 'var(--floating-ui-inset)',
          left: 'var(--floating-ui-inset)',
          zIndex: 40,
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: '1px solid var(--border)',
          background: open ? 'var(--accent)' : 'var(--surface)',
          color: open ? 'var(--bg)' : 'var(--text)',
          cursor: 'pointer',
          boxShadow: open ? '0 6px 24px rgba(249, 115, 22, 0.35)' : '0 4px 16px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
        }}
        onMouseEnter={(e) => {
          if (!open) {
            e.currentTarget.style.background = 'var(--accent)'
            e.currentTarget.style.color = 'var(--bg)'
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(249, 115, 22, 0.35)'
          }
        }}
        onMouseLeave={(e) => {
          if (!open) {
            e.currentTarget.style.background = 'var(--surface)'
            e.currentTarget.style.color = 'var(--text)'
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)'
          }
        }}
      >
        <span aria-hidden className="chat-bot-trigger-icon" style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </span>
      </button>

      {open && (
        <div
          className="chat-bot-backdrop"
          aria-hidden
          onClick={handleBackdropClick}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 38,
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(2px)',
            animation: 'chat-backdrop-in 0.25s ease forwards',
          }}
        />
      )}

      {open && (
        <div
          ref={panelRef}
          className="chat-bot-panel"
          role="dialog"
          aria-label="Chat about Rojohn"
          style={{
            position: 'fixed',
            bottom: 'calc(var(--floating-ui-inset) + 64px)',
            left: 'var(--floating-ui-inset)',
            zIndex: 39,
            width: 'min(420px, calc(100vw - 2 * var(--floating-ui-inset)))',
            maxHeight: 'min(520px, 70vh)',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            boxShadow: '0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.1), 0 0 0 3px rgba(249, 115, 22, 0.12)',
            overflow: 'hidden',
            animation: 'chat-panel-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          }}
        >
          {/* Header with accent bar */}
          <header className="chat-bot-header" style={{ flexShrink: 0 }}>
            <div
              style={{
                height: 3,
                background: 'linear-gradient(90deg, var(--accent) 0%, rgba(249, 115, 22, 0.5) 100%)',
                borderRadius: '16px 16px 0 0',
              }}
            />
            <div
              style={{
                padding: 'var(--space-md) var(--space-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--space-md)',
                background: 'var(--bg-elevated)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }} className="chat-bot-header-title-block">
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--bg)',
                    flexShrink: 0,
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-hero-title)', fontWeight: 700, fontSize: '1rem', color: 'var(--text)', lineHeight: 1.2 }}>
                    Rojohn's Assistant
                  </div>
                  <div className="chat-bot-header-subtitle" style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    Ask me anything about his work
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                <button type="button" onClick={clearChat} aria-label="Clear chat" className="chat-bot-header-btn">
                  Clear
                </button>
                <button type="button" onClick={close} aria-label="Close chat" className="chat-bot-close-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* Messages + suggested prompts */}
          <div
            className="chat-bot-messages"
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: 'var(--space-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {messages.map((m, i) => {
              const isLast = i === messages.length - 1
              const isAssistantReply = m.role === 'assistant' && i > 0
              const isNewAndNotYetShown = i > typewriterCompletedUpToIndex
              const useTypewriter = isLast && isAssistantReply && !loading && isNewAndNotYetShown
              const { main, sectionId } = parseSeeSection(m.content)
              const sectionLabel = sectionId ? SECTION_LABELS[sectionId] : null
              const handleTypewriterDone = () => setTypewriterCompletedUpToIndex(i)
              const scrollToSection = (id: string) => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                setOpen(false)
              }
              return (
              <div
                key={i}
                className={`chat-bot-msg chat-bot-msg--${m.role}`}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: 'var(--space-sm) var(--space-md)',
                  borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: m.role === 'user' ? 'var(--accent)' : 'var(--bg-elevated)',
                  color: m.role === 'user' ? 'var(--bg)' : 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  lineHeight: 1.55,
                  border: m.role === 'assistant' ? '1px solid var(--border)' : 'none',
                  boxShadow: m.role === 'user' ? '0 2px 12px rgba(249, 115, 22, 0.28)' : '0 1px 3px rgba(0,0,0,0.06)',
                  ...(isLast ? { animation: 'chat-msg-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards' } : {}),
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  {useTypewriter ? (
                    <TypewriterText text={main} speed={14} onDone={handleTypewriterDone} />
                  ) : (
                    main
                  )}
                  {sectionId && sectionLabel && m.role === 'assistant' && (
                    <button
                      type="button"
                      onClick={() => scrollToSection(sectionId)}
                      className="chat-bot-section-link"
                      style={{
                        alignSelf: 'flex-start',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        marginTop: 2,
                        padding: '4px 10px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: 'var(--accent)',
                        background: 'transparent',
                        border: '1px solid var(--accent)',
                        borderRadius: 'var(--radius)',
                        cursor: 'pointer',
                        transition: 'background 0.2s, color 0.2s',
                      }}
                    >
                      <span>View in portfolio</span>
                      <span aria-hidden>→</span>
                      <span>{sectionLabel}</span>
                    </button>
                  )}
                </div>
              </div>
            )})}

            {/* Pop-up suggested prompts */}
            {showSuggestions && (
              <div
                className="chat-suggestions"
                style={{
                  animation: 'chat-suggestions-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: 'var(--space-sm)',
                  }}
                >
                  Try asking
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--space-sm)',
                  }}
                >
                  {SUGGESTED_PROMPTS.map((prompt, j) => (
                    <button
                      key={j}
                      type="button"
                      onClick={() => onSuggestionClick(prompt)}
                      className="chat-suggestion-chip"
                      style={{
                        padding: 'var(--space-sm) var(--space-md)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8125rem',
                        color: 'var(--text)',
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border)',
                        borderRadius: '999px',
                        cursor: 'pointer',
                        transition: 'background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s',
                        textAlign: 'left',
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Follow-up suggestions after bot reply — only when typing is done */}
            {messages.length > 1 && !loading && messages[messages.length - 1].role === 'assistant' && typewriterCompletedUpToIndex >= messages.length - 1 && (() => {
              const lastContent = messages[messages.length - 1].content
              const { sectionId } = parseSeeSection(lastContent)
              const prompts = sectionId && FOLLOW_UP_BY_SECTION[sectionId] ? FOLLOW_UP_BY_SECTION[sectionId] : FOLLOW_UP_PROMPTS
              return (
                <div
                  className="chat-suggestions chat-follow-up"
                  style={{
                    animation: 'chat-suggestions-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                  }}
                >
                  <div
                    className="chat-follow-up-list"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                      gap: 'var(--space-sm)',
                      overflowX: 'auto',
                      overflowY: 'visible',
                      paddingTop: 8,
                      paddingBottom: 8,
                      scrollbarGutter: 'stable',
                    }}
                  >
                    {prompts.map((prompt, j) => (
                      <button
                        key={j}
                        type="button"
                        onClick={() => onSuggestionClick(prompt)}
                        className="chat-suggestion-chip"
                        style={{
                          flexShrink: 0,
                          padding: 'var(--space-sm) var(--space-md)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.8125rem',
                          color: 'var(--text)',
                          background: 'var(--bg-elevated)',
                          border: '1px solid var(--border)',
                          borderRadius: '999px',
                          cursor: 'pointer',
                          transition: 'background 0.25s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.25s cubic-bezier(0.22, 1, 0.36, 1), color 0.25s cubic-bezier(0.22, 1, 0.36, 1), transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                          textAlign: 'left',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })()}

            {loading && (
              <div
                className="chat-bot-typing"
                style={{
                  alignSelf: 'flex-start',
                  padding: 'var(--space-sm) var(--space-md)',
                  borderRadius: '16px 16px 16px 4px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  animation: 'chat-msg-in 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                }}
              >
                <span className="chat-bot-typing-dots">
                  <span className="chat-bot-dot" />
                  <span className="chat-bot-dot" />
                  <span className="chat-bot-dot" />
                </span>
                <span className="chat-bot-typing-label">typing</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send()
            }}
            style={{
              padding: 'var(--space-md)',
              borderTop: '1px solid var(--border)',
              background: 'var(--surface)',
              flexShrink: 0,
            }}
          >
            <div className="chat-bot-input-wrap" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', padding: '6px 6px 6px var(--space-md)', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '999px', transition: 'border-color 0.2s, box-shadow 0.2s' }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything…"
                disabled={loading}
                aria-label="Message"
                className="chat-bot-input"
                style={{
                  flex: 1,
                  padding: 'var(--space-sm) 0',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  color: 'var(--text)',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  minWidth: 0,
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send()
                  }
                }}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="chat-bot-send"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--bg)',
                  background: 'var(--accent)',
                  border: 'none',
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  opacity: loading || !input.trim() ? 0.5 : 1,
                  transition: 'opacity 0.2s, transform 0.2s, background 0.2s',
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2 11 13M22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      <style>{`
        .chat-bot-header-btn, .chat-bot-close-btn {
          padding: var(--space-xs) var(--space-sm);
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-muted);
          background: transparent;
          border: 1px solid transparent;
          border-radius: var(--radius);
          cursor: pointer;
          transition: color 0.2s, background 0.2s, border-color 0.2s;
        }
        .chat-bot-close-btn {
          padding: var(--space-xs);
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
        }
        .chat-bot-header-btn:hover, .chat-bot-close-btn:hover {
          color: var(--text) !important;
          background: var(--bg) !important;
          border-color: var(--border) !important;
        }
        .chat-bot-close-btn:hover { border: none; }
        .chat-bot-input-wrap:focus-within {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.2) !important;
        }
        .chat-bot-send:hover:not(:disabled) {
          background: var(--accent-hover) !important;
          transform: scale(1.06);
        }
        .chat-bot-section-link:hover {
          background: var(--accent) !important;
          color: var(--bg) !important;
        }
        .chat-bot-send:active:not(:disabled) {
          transform: scale(0.96);
        }
        .chat-bot-trigger-icon {
          display: flex !important;
          align-items: center;
          justify-content: center;
          width: 24px !important;
          height: 24px !important;
          flex-shrink: 0;
        }
        .chat-bot-trigger-icon svg {
          width: 24px !important;
          height: 24px !important;
          min-width: 24px;
          min-height: 24px;
        }
        .chat-bot-msg, .chat-bot-typing {
          contain: layout;
        }
        .chat-suggestion-chip:hover {
          background: var(--bg) !important;
          border-color: var(--accent) !important;
          color: var(--accent) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          backface-visibility: hidden;
        }
        .chat-follow-up-list {
          scrollbar-width: thin;
          scrollbar-color: var(--accent) transparent;
        }
        .chat-follow-up-list::-webkit-scrollbar {
          height: 6px;
        }
        .chat-follow-up-list::-webkit-scrollbar-button {
          display: none;
          width: 0;
          height: 0;
        }
        .chat-follow-up-list::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 4px;
        }
        .chat-follow-up-list::-webkit-scrollbar-thumb {
          background: var(--accent);
          border-radius: 4px;
        }
        .chat-follow-up-list::-webkit-scrollbar-thumb:hover {
          background: var(--accent);
        }
        @keyframes chat-backdrop-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes chat-panel-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes chat-msg-in {
          from { opacity: 0; transform: translateY(8px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes chat-suggestions-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .chat-bot-caret {
          display: inline-block;
          width: 2px;
          height: 1em;
          margin-left: 1px;
          vertical-align: -0.2em;
          background: var(--accent);
          animation: chat-caret-blink 0.8s step-end infinite;
        }
        @keyframes chat-caret-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .chat-bot-typing-dots {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .chat-bot-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-muted);
        }
        .chat-bot-dot:nth-child(1) { animation: chat-typing-wave 0.8s ease-in-out 0s infinite; }
        .chat-bot-dot:nth-child(2) { animation: chat-typing-wave 0.8s ease-in-out 0.15s infinite; }
        .chat-bot-dot:nth-child(3) { animation: chat-typing-wave 0.8s ease-in-out 0.3s infinite; }
        @keyframes chat-typing-wave {
          0%, 60%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          30% { transform: translateY(-5px) scale(1.2); opacity: 1; }
        }
        .chat-bot-typing-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-left: 2px;
          animation: chat-typing-pulse 1.2s ease-in-out infinite;
        }
        @keyframes chat-typing-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .chat-bot-backdrop, .chat-bot-panel, .chat-bot-msg, .chat-bot-typing, .chat-suggestions {
            animation: none !important;
          }
          .chat-bot-dot, .chat-bot-caret, .chat-bot-typing-label { animation: none !important; }
          .chat-bot-caret { opacity: 1; }
        }
        @media (max-width: 640px) {
          .chat-bot-panel {
            left: var(--floating-ui-inset) !important;
            right: var(--floating-ui-inset) !important;
            width: auto !important;
            max-width: none !important;
            bottom: calc(var(--floating-ui-inset) + 60px) !important;
            max-height: 75vh !important;
            border-radius: 12px !important;
          }
          .chat-bot-trigger {
            position: fixed !important;
            left: var(--floating-ui-inset) !important;
            right: auto !important;
            margin-left: 0 !important;
            bottom: var(--floating-ui-inset) !important;
            width: 56px !important;
            height: 56px !important;
            min-width: 56px !important;
            min-height: 56px !important;
          }
          .chat-bot-trigger .chat-bot-trigger-icon,
          .chat-bot-trigger .chat-bot-trigger-icon svg {
            width: 24px !important;
            height: 24px !important;
            min-width: 24px !important;
            min-height: 24px !important;
          }
          .chat-bot-trigger:not([aria-expanded="true"]):hover {
            transform: scale(1.05) !important;
          }
          .chat-bot-header .chat-bot-header-title-block {
            min-width: 0;
          }
          .chat-bot-header .chat-bot-header-title-block .chat-bot-header-subtitle {
            font-size: 0.6875rem;
          }
          .chat-bot-header > div:last-child {
            padding: var(--space-sm) var(--space-md) !important;
          }
          .chat-bot-msg {
            max-width: 85% !important;
            font-size: 0.875rem !important;
            padding: var(--space-sm) var(--space-md) !important;
          }
          .chat-bot-typing {
            padding: var(--space-sm) var(--space-md) !important;
            border-radius: 16px 16px 16px 4px !important;
          }
          .chat-bot-messages {
            padding: var(--space-sm) !important;
          }
          .chat-suggestion-chip {
            font-size: 0.75rem !important;
            padding: var(--space-xs) var(--space-sm) !important;
          }
          .chat-bot-input-wrap {
            padding: 4px 4px 4px var(--space-sm) !important;
          }
          .chat-bot-input {
            font-size: 0.875rem !important;
          }
          .chat-bot-send {
            width: 36px !important;
            height: 36px !important;
          }
          .chat-bot-panel form {
            padding: var(--space-sm) var(--space-md) !important;
          }
        }
      `}</style>
    </>
  )
}
