import { useState, useRef, useEffect } from 'react'

type Message = { role: 'user' | 'assistant'; content: string }

const CHAT_API = `${import.meta.env.VITE_CHAT_API_BASE ?? ''}/api/chat`

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Hi! I'm Rojohn's portfolio assistant. Pick a prompt below or type your own question.",
}

const SUGGESTED_PROMPTS = [
  "What are Rojohn's key projects?",
  "What's his experience and background?",
  "How can I contact him?",
  "What technologies does he use?",
  "Tell me about his certifications.",
]

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
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

  const close = () => setOpen(false)

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE])
    setInput('')
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
      setMessages((prev) => [...prev, { role: 'assistant', content: reply || 'No reply from the assistant.' }])
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
          bottom: 'var(--space-xl)',
          left: 'var(--space-xl)',
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
        <span aria-hidden className="chat-bot-trigger-icon" style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            bottom: 'calc(var(--space-xl) + 64px)',
            left: 'var(--space-xl)',
            zIndex: 39,
            width: 'min(420px, calc(100vw - 2 * var(--space-xl)))',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
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
                <div>
                  <div style={{ fontFamily: 'var(--font-hero-title)', fontWeight: 700, fontSize: '1rem', color: 'var(--text)', lineHeight: 1.2 }}>
                    Rojohn's Assistant
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
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
              padding: 'var(--space-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chat-bot-msg chat-bot-msg--${m.role}`}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '90%',
                  padding: 'var(--space-sm) var(--space-md)',
                  borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: m.role === 'user' ? 'var(--accent)' : 'var(--bg-elevated)',
                  color: m.role === 'user' ? 'var(--bg)' : 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  lineHeight: 1.5,
                  border: m.role === 'assistant' ? '1px solid var(--border)' : 'none',
                  boxShadow: m.role === 'user' ? '0 2px 12px rgba(249, 115, 22, 0.25)' : 'none',
                  ...(i === messages.length - 1 ? { animation: 'chat-msg-in 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards' } : {}),
                }}
              >
                {m.content}
              </div>
            ))}

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

            {loading && (
              <div
                className="chat-bot-typing"
                style={{
                  alignSelf: 'flex-start',
                  padding: 'var(--space-md) var(--space-lg)',
                  borderRadius: '14px 14px 14px 4px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  gap: 5,
                  alignItems: 'center',
                  animation: 'chat-msg-in 0.25s ease forwards',
                }}
              >
                <span className="chat-bot-dot" />
                <span className="chat-bot-dot" />
                <span className="chat-bot-dot" />
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
        .chat-bot-send:active:not(:disabled) {
          transform: scale(0.96);
        }
        .chat-suggestion-chip:hover {
          background: var(--bg) !important;
          border-color: var(--accent) !important;
          color: var(--accent) !important;
          transform: translateY(-1px);
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
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes chat-suggestions-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .chat-bot-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-muted);
        }
        .chat-bot-dot:nth-child(1) { animation: chat-typing-bounce 0.6s ease-in-out 0s infinite; }
        .chat-bot-dot:nth-child(2) { animation: chat-typing-bounce 0.6s ease-in-out 0.15s infinite; }
        .chat-bot-dot:nth-child(3) { animation: chat-typing-bounce 0.6s ease-in-out 0.3s infinite; }
        @keyframes chat-typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .chat-bot-backdrop, .chat-bot-panel, .chat-bot-msg, .chat-bot-typing, .chat-suggestions {
            animation: none !important;
          }
          .chat-bot-dot { animation: none !important; }
        }
        @media (max-width: 640px) {
          .chat-bot-panel {
            left: var(--space-md) !important;
            right: var(--space-md) !important;
            bottom: calc(var(--space-md) + 60px) !important;
            width: auto !important;
            max-height: 75vh !important;
          }
          .chat-bot-trigger {
            left: var(--space-md) !important;
            bottom: var(--space-md) !important;
          }
        }
      `}</style>
    </>
  )
}
