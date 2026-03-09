import { useState, useRef, useEffect } from 'react'

type Message = { role: 'user' | 'assistant'; content: string }

const CHAT_API = '/api/chat'

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Hi! I'm Rojohn's portfolio assistant. Ask me about his experience, projects, skills, or how to get in touch.",
}

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

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

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const userMessage: Message = { role: 'user', content: text }
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
        body: JSON.stringify({ message: text, history }),
      })
      const raw = await res.text()
      let data: { reply?: string; error?: string }
      try {
        data = raw.length > 0 ? JSON.parse(raw) : {}
      } catch {
        throw new Error(
          res.ok
            ? 'Invalid response from chat.'
            : 'Chat API is not available. If testing locally, run "npx vercel dev" so the API runs. On production, set GROQ_API_KEY in Vercel.'
        )
      }
      if (!res.ok) {
        throw new Error(data?.error || 'Request failed')
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
        <span aria-hidden className="chat-bot-trigger-icon" style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.3s ease' }}>
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
            background: 'rgba(0,0,0,0.25)',
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
            width: 'min(400px, calc(100vw - 2 * var(--space-xl)))',
            maxHeight: 'min(480px, 65vh)',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(249, 115, 22, 0.08)',
            overflow: 'hidden',
            animation: 'chat-panel-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          }}
        >
          <header
            style={{
              padding: 'var(--space-md) var(--space-lg)',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-md)',
              background: 'var(--bg-elevated)',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  boxShadow: '0 0 8px rgba(249, 115, 22, 0.6)',
                  animation: 'chat-dot-pulse 1.5s ease-in-out infinite',
                }}
                aria-hidden
              />
              <span
                style={{
                  fontFamily: 'var(--font-hero-title)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: 'var(--text)',
                }}
              >
                Ask about Rojohn
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
              <button
                type="button"
                onClick={clearChat}
                aria-label="Clear chat"
                className="chat-bot-header-btn"
                style={{
                  padding: 'var(--space-xs) var(--space-sm)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                  background: 'transparent',
                  border: '1px solid transparent',
                  borderRadius: 'var(--radius)',
                  cursor: 'pointer',
                  transition: 'color 0.2s, background 0.2s, border-color 0.2s',
                }}
              >
                Clear
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Close chat"
                className="chat-bot-header-btn"
                style={{
                  padding: 'var(--space-xs)',
                  color: 'var(--text-muted)',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s, background 0.2s',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </header>

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
                  maxWidth: '88%',
                  padding: 'var(--space-sm) var(--space-md)',
                  borderRadius: m.role === 'user' ? 'var(--radius) var(--radius) 2px var(--radius)' : 'var(--radius) var(--radius) var(--radius) 2px',
                  background: m.role === 'user' ? 'var(--accent)' : 'var(--bg-elevated)',
                  color: m.role === 'user' ? 'var(--bg)' : 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  lineHeight: 1.55,
                  border: m.role === 'assistant' ? '1px solid var(--border)' : 'none',
                  boxShadow: m.role === 'user' ? '0 2px 8px rgba(249, 115, 22, 0.2)' : 'none',
                  ...(i === messages.length - 1 ? { animation: 'chat-msg-in 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards' } : {}),
                }}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div
                className="chat-bot-typing"
                style={{
                  alignSelf: 'flex-start',
                  padding: 'var(--space-md) var(--space-lg)',
                  borderRadius: 'var(--radius) var(--radius) var(--radius) 2px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  gap: 4,
                  alignItems: 'center',
                  animation: 'chat-msg-in 0.25s ease forwards',
                }}
              >
                <span className="chat-bot-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)' }} />
                <span className="chat-bot-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)' }} />
                <span className="chat-bot-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

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
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-sm)',
                alignItems: 'center',
                padding: 'var(--space-xs)',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              className="chat-bot-input-wrap"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about experience, projects, skills…"
                disabled={loading}
                aria-label="Message"
                className="chat-bot-input"
                style={{
                  flex: 1,
                  padding: 'var(--space-sm) var(--space-md)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  color: 'var(--text)',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
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
                  padding: 'var(--space-sm) var(--space-md)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: 'var(--bg)',
                  background: 'var(--accent)',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  opacity: loading || !input.trim() ? 0.5 : 1,
                  transition: 'opacity 0.2s, transform 0.2s, background 0.2s',
                }}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      <style>{`
        .chat-bot-header-btn:hover {
          color: var(--text) !important;
          background: var(--bg) !important;
          border-color: var(--border) !important;
        }
        .chat-bot-input-wrap:focus-within {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.2);
        }
        .chat-bot-send:hover:not(:disabled) {
          background: var(--accent-hover) !important;
          transform: scale(1.02);
        }
        .chat-bot-send:active:not(:disabled) {
          transform: scale(0.98);
        }
        @keyframes chat-backdrop-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes chat-panel-in {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes chat-msg-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .chat-bot-msg--user {
          transform-origin: right bottom;
        }
        .chat-bot-msg--assistant {
          transform-origin: left bottom;
        }
        @keyframes chat-dot-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.9); }
        }
        .chat-bot-dot:nth-child(1) { animation: chat-typing-bounce 0.6s ease-in-out 0s infinite; }
        .chat-bot-dot:nth-child(2) { animation: chat-typing-bounce 0.6s ease-in-out 0.15s infinite; }
        .chat-bot-dot:nth-child(3) { animation: chat-typing-bounce 0.6s ease-in-out 0.3s infinite; }
        @keyframes chat-typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .chat-bot-backdrop,
          .chat-bot-panel,
          .chat-bot-msg,
          .chat-bot-typing,
          .chat-bot-trigger-icon {
            animation: none !important;
          }
          .chat-bot-dot {
            animation: none !important;
          }
          [style*="chat-dot-pulse"] {
            animation: none !important;
          }
        }
        @media (max-width: 640px) {
          .chat-bot-panel {
            left: var(--space-md) !important;
            right: var(--space-md) !important;
            bottom: calc(var(--space-md) + 60px) !important;
            width: auto !important;
            max-height: 70vh !important;
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
