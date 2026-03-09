/**
 * RAG knowledge base: chunks from Rojohn's portfolio (About, Projects, How I work, Certifications, Tech)
 * and from his resume (RojohnMichaelDeGuzman.pdf).
 */
export type KnowledgeChunk = { id: string; section: string; text: string }

export const KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  // Hero / intro
  {
    id: 'hero-1',
    section: 'intro',
    text: 'Rojohn Michael De Guzman. Experience in building automations and AI solutions that make IT and operations more efficient, innovative and adaptive to evolving AI and business needs.',
  },
  // About
  {
    id: 'about-1',
    section: 'about',
    text: 'Rojohn has hands-on experience designing and building internal tools, automation workflows, and websites that improve operational efficiency. He focuses on creating clear processes, minimizing errors, and enabling teams to work smarter through solutions such as AI, ticketing systems, and streamlined cross-team coordination.',
  },
  {
    id: 'about-2',
    section: 'about',
    text: 'He has experience with ticketing systems and remote-support tools, and handles both hardware and software. His experience as technical support, together with a background in programming and a BS in Computer Science, drives him to keep deepening his skills in innovation and automation to deliver process improvements and adapt to modern IT trends.',
  },
  // How I work
  {
    id: 'how-1',
    section: 'how-i-work',
    text: 'How I work principles: Start with the problem — focus on the user\'s pain first, then choose the simplest solution that fixes it. Simple over clever — prefer clear, maintainable code and straightforward flows over clever tricks.',
  },
  {
    id: 'how-2',
    section: 'how-i-work',
    text: 'Document as I build — keep processes and decisions written down so the next person can run with it. Ship and iterate — get something useful out first, then improve based on feedback. Listen before building — ask questions and observe how people work before proposing or building a solution.',
  },
  {
    id: 'how-3',
    section: 'how-i-work',
    text: 'Automate the repetitive — if we do it more than twice, look for a safe way to automate or streamline it. Test with real use — validate with real workflows and real users so the solution actually fits the job. Security and clarity — build with security and privacy in mind and keep access and data flow transparent.',
  },
  // Projects
  {
    id: 'proj-1',
    section: 'projects',
    text: 'Organizational AI Bot: Designed and developed an AI bot that streamlined workflows and centralized operations across all departments at Casto Travel Philippines. Employees use an AI chatbot for common IT inquiries; the bot acts as Level 1 helpdesk support. It includes escalation to create a ticket or message the engineer on duty. The AI bot has a company knowledge base with web scraping for company profile, HR inquiries, and GDS commands. Built as a Windows application widget with Python, PyQt5, Flask, integrated with Office 365 (MSAL) and REST APIs. Features include TTS and real-time conversation with the AI bot. Tags: AI, Automation, Workflow, API, Integration, Widget, Office 365.',
  },
  {
    id: 'proj-2',
    section: 'projects',
    text: 'Call Tracking Solution: A web-based application for call and transaction tracking so agents across departments can log and search client calls and transactions in one place, with automated reports for internal and client requirements. Centralizes call and transaction records for 30+ departments. Built with PHP and Laravel, with login, call log trackers, and integration with Monday.com for automated reports. Tags: Internal Tool, Coordination, Streamlined Process, Tracker, Monday.com, Automation, Reports.',
  },
  {
    id: 'proj-3',
    section: 'projects',
    text: 'HR Ticketing System (HRD Helpdesk): Internal HR service portal for employees to submit and track HR-related requests — recruitment/onboarding, payroll, employee data, benefits/leave, policy, employee relations, reassignment, equipment/facilities, exit/offboarding. Web-based application built with React, JavaScript, Node.js, Express, OAuth 2.0 login. Card-based layout for inquiry categories. Tags: HR, Ticketing, Internal, OAuth, Portal, Helpdesk.',
  },
  {
    id: 'proj-4',
    section: 'projects',
    text: 'Company Website Redesign: Redesigned and built a corporate website as a modern, fast, maintainable Next.js application. Next.js (App Router), React, TypeScript, Tailwind CSS. Improved SEO, security, and UI/UX. Tags: Web, Design, Next.js, React, TypeScript, Tailwind CSS, SEO, UI/UX.',
  },
  // Certifications
  {
    id: 'cert-1',
    section: 'certifications',
    text: 'Certifications: Machine Learning using Python (Simplilearn/SkillUp); Introduction to ITIL® 4 Foundation (Simplilearn/SkillUp); Digital Security Fundamentals - IT Safety & Security Essentials (Simplilearn/SkillUp); HP Customer Self-Repair Program and Basic Troubleshooting (Phil-Data Business Systems, Inc., Oct 2025).',
  },
  // Technical skills (from TechStack)
  {
    id: 'tech-1',
    section: 'technical-skills',
    text: 'Technologies and tools: Git, GitHub, Microsoft 365, Entra, API (Postman), Monday.com, MySQL, ManageEngine SD Plus, ManageEngine Endpoint Central, Bitdefender, Python, Windows, SQL (PostgreSQL), JSON, XML, Flask, PyQt5, Waitress, LM Studio, SQLite, ChromaDB, MongoDB, JavaScript, React, JSX, CSS, HTML, Express, Nodemailer, REST, PHP, Blade, Laravel, Bootstrap, jQuery, Vue.js, Microsoft Graph.',
  },
  {
    id: 'tech-2',
    section: 'technical-skills',
    text: 'Technical support and IT skills: Hardware and software troubleshooting, desktop and laptop and printer repair, diagnostic tools and software, ticketing systems, remote desktop support, Microsoft Office, customer service, team collaboration, documentation and clear instructions, explaining technical issues to non-technical users, problem-solving and critical thinking, IT service management, incident and change management, Windows OS troubleshooting, remote user support, HP Customer Self-Repair support, cybersecurity fundamentals, network security basics.',
  },
  // Contact
  {
    id: 'contact-1',
    section: 'contact',
    text: 'Contact: Email rojohn1123@gmail.com, Phone +63 921 794 2076, LinkedIn profile Rojohn Michael De Guzman. Resume available on the portfolio.',
  },
  // Resume — professional summary & current role
  {
    id: 'resume-summary',
    section: 'resume',
    text: 'Resume — Professional summary: IT professional with 5+ years of experience in technical support, systems administration, and automation. Skilled in troubleshooting hardware and software issues, managing endpoints, and building internal tools that improve workflow efficiency. Experienced in supporting users, developing internal systems, and implementing automation to reduce manual operations across departments. Current role: Technical Analyst at Casto Travel Philippines (Apr 2025 – Present). Technical Systems Analyst, IT Support & Automation. Location: San Pedro, Laguna (GSIS Village). Developed internal tools to support multiple departments and improve operational efficiency. Designed automation workflows that reduced manual processes and improved coordination. Built internal web systems used for operational tracking and reporting. Supported innovation initiatives focused on improving company systems and automation capabilities.',
  },
  // Resume — previous role
  {
    id: 'resume-admin',
    section: 'resume',
    text: 'Resume — IT Administrator at Casto Travel Philippines (Dec 2020 – Apr 2025). Provided L1–L2 technical support for desktops, laptops, printers, and enterprise software. Diagnosed and resolved hardware, network, and system issues for company users. Managed endpoints using ManageEngine Endpoint Central. Handled service requests and incidents using ServiceDesk Plus. Created documentation and troubleshooting guides for internal users.',
  },
  // Resume — systems, tools, skills
  {
    id: 'resume-tools',
    section: 'resume',
    text: 'Resume — Systems & tools: ManageEngine Endpoint Central, ManageEngine ServiceDesk Plus. Automation & development: internal tool development, workflow automation. Core skills: incident management, technical documentation. Experience: remote desktop support, user account support, Windows administration, Microsoft Office environment, web-based internal systems, end-user support, problem solving. IT support: desktop and laptop troubleshooting, printer and peripheral support.',
  },
  // Resume — key projects (concise)
  {
    id: 'resume-projects',
    section: 'resume',
    text: 'Resume — Key projects: Organizational AI Assistant — developed an AI bot used internally to help automate workflows and support multiple departments. HR Ticketing System — built a ticketing platform to track employee requests and improve response time. Call Tracking System — developed a system to monitor client calls and coordinate departmental communication. Internal Operations Websites — built web-based systems used internally to support operations and reporting.',
  },
  // Resume — certifications & education
  {
    id: 'resume-edu-cert',
    section: 'resume',
    text: 'Resume — Certifications and courses: System Administration and IT Infrastructure Services (Google); Machine Learning Using Python (Simplilearn); Introduction to ITIL® 4 (Simplilearn); Digital Security Fundamentals (Simplilearn); HP Customer Self-Repair Program and Basic Troubleshooting (Phil-Data Business Systems, Inc.). Education: Bachelor of Science in Computer Science, Eulogio "Amang" Rodriguez Institute of Science and Technology, 2016 – 2020.',
  },
  // Resume — references (for “who can vouch” type questions)
  {
    id: 'resume-refs',
    section: 'resume',
    text: 'Resume — References: Juan Rafael Dela Fuente (+63 919 071 3639), Christopher Gomez (+63 917 875 2031).',
  },
]

/** Simple keyword-based retrieval: score chunks by overlap with query words, return top k */
export function retrieveChunks(query: string, k = 5): KnowledgeChunk[] {
  const words = query
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1)
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
