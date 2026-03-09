# Portfolio

A dark-theme portfolio site with strong typography (Syne + DM Sans) and a single accent color. Single-page scroll, smooth navigation, and a subtle scroll progress bar.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Customize

- **Name & tagline:** Edit `src/components/Hero.tsx`
- **About:** `src/components/About.tsx`
- **Projects:** Update the `PROJECTS` array in `src/components/Projects.tsx`
- **Contact:** Email and links in `src/components/Contact.tsx`
- **Accent color:** Change `--accent` and `--accent-hover` in `src/index.css`

## Chat bot (Groq + RAG)

The site includes a chat assistant that answers questions about the portfolio using your **Groq** API key and **RAG** (retrieval over your profile content).

- **Setup:** Add your Groq API key as `GROQ_API_KEY` in Vercel (Project → Settings → Environment Variables). Never commit the key; use `.env.example` as a template for local use.
- **RAG:** The bot uses `api/knowledge.ts` — chunks from your About, Projects, How I work, Certifications, and Tech stack. On each question, the API retrieves relevant chunks and sends them to Groq so answers stay grounded in your profile.
- **Local testing:** The chat API runs as a Vercel serverless function. To test it locally, run `npx vercel dev` instead of `npm run dev` so both the app and `/api/chat` are available.

## Stack

- Vite + React + TypeScript
- No UI framework — custom CSS with design tokens
- Chat bot: Groq (LLM) + RAG over portfolio content (`api/chat`, `api/knowledge.ts`)
