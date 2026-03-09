import type { VercelRequest, VercelResponse } from '@vercel/node'
import { retrieveChunks } from './knowledge'

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.1-8b-instant'

const SYSTEM_PROMPT = `You are the portfolio assistant for Rojohn Michael De Guzman. You help visitors learn about Rojohn's experience, projects, skills, and how to contact him. Answer only based on the context below. Be concise, professional, and friendly. If the question is out of scope or you don't have enough context, say so and suggest they check the portfolio sections or contact Rojohn directly. Do not make up details.`

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Chat is not configured (missing GROQ_API_KEY).' })
  }

  let body: { message?: string; history?: { role: string; content: string }[] }
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' })
  }

  const message = body.message?.trim()
  if (!message) {
    return res.status(400).json({ error: 'Missing message' })
  }

  const history = Array.isArray(body.history) ? body.history : []

  try {
    const chunks = retrieveChunks(message, 5)
    const context = chunks.map((c) => `[${c.section}]\n${c.text}`).join('\n\n')
    const systemContent = `${SYSTEM_PROMPT}\n\n## Context about Rojohn\n\n${context}`

    const messages: { role: string; content: string }[] = [
      { role: 'system', content: systemContent },
      ...history.slice(-10).map((m) => ({ role: m.role, content: m.content })),
      { role: 'user', content: message },
    ]

    const response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: 512,
        temperature: 0.4,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Groq API error:', response.status, err)
      return res.status(502).json({
        error: 'LLM request failed. Check GROQ_API_KEY and quota.',
      })
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>
    }
    const reply = data?.choices?.[0]?.message?.content?.trim() ?? 'I couldn’t generate a reply. Please try again.'
    return res.status(200).json({ reply })
  } catch (e) {
    console.error('Chat error:', e)
    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}
