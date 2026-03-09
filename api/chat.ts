import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readFileSync } from 'fs'
import { join } from 'path'

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.1-8b-instant'

const SYSTEM_PROMPT = `You are Rojohn's portfolio assistant — a fun, helpful, and human-like buddy who helps visitors get to know Rojohn and his work. Your personality: warm, conversational, and a little playful when it fits. Use a friendly tone (like a helpful colleague), not stiff or corporate. You can start replies with things like "Sure!", "Great question.", "So..." or "Honestly?" when it feels natural. Keep answers concise but lively; it's okay to crack a light joke or use a casual phrase if it fits. Never make up facts — answer only from the context below. When the context includes a "Common question" and "Answer", use that answer as the main source and keep the wording close. If you don't have enough context, say so and suggest they check the portfolio or contact Rojohn directly.

When your answer is based on a specific section of the portfolio, add at the end exactly one line on its own: (See: #SECTION_ID) so the user can jump to that section on the page. Use only these section IDs: tech-stack (for skills, technologies, tools), about (for background, experience), how-i-work (for work style, approach), projects (for projects), certifications (for certifications), contact (for contact info, email, LinkedIn). Only add (See: #SECTION_ID) when it clearly matches what they asked; do not add it for general or multi-topic answers.`

// RAG knowledge: static chunks inlined; FAQ loaded at runtime from api/faq-questions.json + api/faq-answers.json
// (Run "npm run faq" to be asked each question and save your answers.) No import of knowledge.ts or faq.ts.
function loadFaqChunks(): { id: string; section: string; text: string }[] {
  try {
    const dir = join(process.cwd(), 'api')
    const questions = JSON.parse(readFileSync(join(dir, 'faq-questions.json'), 'utf8')) as string[]
    const answers = JSON.parse(readFileSync(join(dir, 'faq-answers.json'), 'utf8')) as string[]
    return questions.map((q: string, i: number) => ({
      id: `faq-${i + 1}`,
      section: 'faq',
      text: `Common question: ${q} Answer: ${answers[i] || ''}`,
    }))
  } catch {
    return []
  }
}

const faqChunks = loadFaqChunks()

const STATIC_KNOWLEDGE_CHUNKS: { id: string; section: string; text: string }[] = [
  // Personal details (edit these to match Rojohn — or add more via FAQ)
  { id: 'personal-1', section: 'personal', text: 'Rojohn Michael De Guzman. Full name for formal use; he goes by Rojohn. Based in San Pedro, Laguna (GSIS Village), Philippines. Filipino. Contact: rojohn1123@gmail.com, +63 921 794 2076, LinkedIn: Rojohn Michael De Guzman.' },
  { id: 'personal-2', section: 'personal', text: 'Personal vibe: Rojohn likes building things that actually help people — automations, tools, and clear processes. He enjoys problem-solving and making day-to-day work easier for teams. Outside work he values continuous learning, especially in AI and tech.' },
  { id: 'personal-3', section: 'personal', text: 'Fun / human details: He has a BS in Computer Science and has been in IT and support for over 5 years. When not coding or fixing things, he’s likely exploring new tools or ideas to improve how people work. (Add your own hobbies or fun facts by running npm run faq or editing the FAQ answers.)' },
  // Hero / intro
  { id: 'hero-1', section: 'intro', text: 'Rojohn Michael De Guzman. Experience in building automations and AI solutions that make IT and operations more efficient, innovative and adaptive to evolving AI and business needs.' },
  { id: 'about-1', section: 'about', text: 'Rojohn has hands-on experience designing and building internal tools, automation workflows, and websites that improve operational efficiency. He focuses on creating clear processes, minimizing errors, and enabling teams to work smarter through solutions such as AI, ticketing systems, and streamlined cross-team coordination.' },
  { id: 'about-2', section: 'about', text: 'He has experience with ticketing systems and remote-support tools, and handles both hardware and software. His experience as technical support, together with a background in programming and a BS in Computer Science, drives him to keep deepening his skills in innovation and automation to deliver process improvements and adapt to modern IT trends.' },
  { id: 'how-1', section: 'how-i-work', text: 'How I work principles: Start with the problem — focus on the user\'s pain first, then choose the simplest solution that fixes it. Simple over clever — prefer clear, maintainable code and straightforward flows over clever tricks.' },
  { id: 'how-2', section: 'how-i-work', text: 'Document as I build — keep processes and decisions written down so the next person can run with it. Ship and iterate — get something useful out first, then improve based on feedback. Listen before building — ask questions and observe how people work before proposing or building a solution.' },
  { id: 'how-3', section: 'how-i-work', text: 'Automate the repetitive — if we do it more than twice, look for a safe way to automate or streamline it. Test with real use — validate with real workflows and real users so the solution actually fits the job. Security and clarity — build with security and privacy in mind and keep access and data flow transparent.' },
  { id: 'proj-1', section: 'projects', text: 'Organizational AI Bot: Designed and developed an AI bot that streamlined workflows and centralized operations across all departments at Casto Travel Philippines. Employees use an AI chatbot for common IT inquiries; the bot acts as Level 1 helpdesk support. Built as a Windows application widget with Python, PyQt5, Flask, integrated with Office 365 (MSAL) and REST APIs. Tags: AI, Automation, Workflow, API, Integration, Widget, Office 365.' },
  { id: 'proj-2', section: 'projects', text: 'Call Tracking Solution: A web-based application for call and transaction tracking so agents across departments can log and search client calls and transactions in one place, with automated reports. Built with PHP and Laravel, integration with Monday.com. Tags: Internal Tool, Coordination, Tracker, Monday.com, Automation, Reports.' },
  { id: 'proj-3', section: 'projects', text: 'HR Ticketing System (HRD Helpdesk): Internal HR service portal for employees to submit and track HR-related requests. Web-based application built with React, JavaScript, Node.js, Express, OAuth 2.0 login. Tags: HR, Ticketing, Internal, OAuth, Portal, Helpdesk.' },
  { id: 'proj-4', section: 'projects', text: 'Company Website Redesign: Redesigned and built a corporate website as a modern, fast, maintainable Next.js application. Next.js (App Router), React, TypeScript, Tailwind CSS. Tags: Web, Design, Next.js, React, TypeScript, Tailwind CSS, SEO, UI/UX.' },
  { id: 'cert-1', section: 'certifications', text: 'Certifications: Machine Learning using Python (Simplilearn/SkillUp); Introduction to ITIL® 4 Foundation (Simplilearn/SkillUp); Digital Security Fundamentals (Simplilearn/SkillUp); HP Customer Self-Repair Program and Basic Troubleshooting (Phil-Data Business Systems, Inc., Oct 2025).' },
  { id: 'tech-1', section: 'technical-skills', text: 'Technologies and tools: Git, GitHub, Microsoft 365, Entra, Postman, Monday.com, MySQL, ManageEngine, Bitdefender, Python, Windows, PostgreSQL, JSON, XML, Flask, PyQt5, LM Studio, SQLite, ChromaDB, MongoDB, JavaScript, React, CSS, HTML, Express, Nodemailer, REST, PHP, Laravel, Bootstrap, jQuery, Vue.js, Microsoft Graph.' },
  { id: 'tech-2', section: 'technical-skills', text: 'Technical support and IT skills: Hardware and software troubleshooting, desktop and laptop and printer repair, ticketing systems, remote desktop support, Microsoft Office, customer service, team collaboration, documentation, IT service management, incident and change management, Windows OS troubleshooting, HP Customer Self-Repair support, cybersecurity fundamentals.' },
  { id: 'contact-1', section: 'contact', text: 'Contact: Email rojohn1123@gmail.com, Phone +63 921 794 2076, LinkedIn profile Rojohn Michael De Guzman. Resume available on the portfolio.' },
  { id: 'resume-summary', section: 'resume', text: 'Resume — IT professional with 5+ years in technical support, systems administration, and automation. Technical Analyst at Casto Travel Philippines (Apr 2025 – Present). Technical Systems Analyst, IT Support & Automation. San Pedro, Laguna. Developed internal tools, automation workflows, and web systems for operational tracking and reporting.' },
  { id: 'resume-admin', section: 'resume', text: 'Resume — IT Administrator at Casto Travel Philippines (Dec 2020 – Apr 2025). L1–L2 technical support for desktops, laptops, printers, enterprise software. ManageEngine Endpoint Central, ServiceDesk Plus. Documentation and troubleshooting guides.' },
  { id: 'resume-tools', section: 'resume', text: 'Resume — Systems & tools: ManageEngine Endpoint Central, ServiceDesk Plus. Internal tool development, workflow automation. Incident management, technical documentation. Remote desktop support, Windows administration, Microsoft Office, end-user support.' },
  { id: 'resume-projects', section: 'resume', text: 'Resume — Key projects: Organizational AI Assistant; HR Ticketing System; Call Tracking System; Internal Operations Websites.' },
  { id: 'resume-edu-cert', section: 'resume', text: 'Resume — Certifications: System Administration and IT Infrastructure Services (Google); Machine Learning Using Python, ITIL® 4, Digital Security Fundamentals (Simplilearn); HP Customer Self-Repair (Phil-Data). Education: BS Computer Science, Eulogio "Amang" Rodriguez Institute of Science and Technology, 2016 – 2020.' },
  { id: 'resume-refs', section: 'resume', text: 'Resume — References: Juan Rafael Dela Fuente (+63 919 071 3639), Christopher Gomez (+63 917 875 2031).' },
]

const KNOWLEDGE_CHUNKS = [...STATIC_KNOWLEDGE_CHUNKS, ...faqChunks]

function retrieveChunks(query: string, k = 5): { id: string; section: string; text: string }[] {
  const words = query.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter((w) => w.length > 1)
  if (words.length === 0) return KNOWLEDGE_CHUNKS.slice(0, k)
  const scored = KNOWLEDGE_CHUNKS.map((chunk) => {
    const text = chunk.text.toLowerCase()
    let score = 0
    for (const w of words) {
      if (text.includes(w)) score += 1
    }
    return { chunk, score }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, k).map(({ chunk }) => chunk)
}

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
        temperature: 0.55,
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
