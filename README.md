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
- **Local testing:** The chat API runs as a Vercel serverless function. Either run `npx vercel dev` so both the app and `/api/chat` run locally, or run `npm run dev` and set `VITE_CHAT_API_BASE` in `.env.local` to your Vercel URL (e.g. `https://myportfolio-lac-delta.vercel.app`) so the chat calls your deployed API.

## Stack

- Vite + React + TypeScript
- No UI framework — custom CSS with design tokens
- Chat bot: Groq (LLM) + RAG over portfolio content (`api/chat`, `api/knowledge.ts`)

## Deploy on Vercel

The project includes `vercel.json` and `engines.node: "20.x"` in `package.json` so builds and serverless functions use Node 20 (updated TLS certificates).

**If you see a certificate error during deploy:**

1. **Check the exact error** in Vercel → your project → Deployments → click the failed deployment → Build or Function logs. Common messages:
   - `UNABLE_TO_VERIFY_LEAF_SIGNATURE` / `unable to verify the first certificate` — often fixed by using Node 20 (already set above).
   - `certificate has expired` — the *remote* server (e.g. npm registry or Groq) had an expired cert; usually resolved by them or by retrying later.
   - `CERT_HAS_EXPIRED` — same as above.

2. **Force Node 20 in Vercel:** In the dashboard go to Project → **Settings** → **General** → **Node.js Version** and choose **20.x** if it's not already.

3. **If it's during `npm install`:** Ensure no corporate proxy or custom registry is overriding the install; Vercel's default registry uses valid certs.

4. **If it's when the chat calls Groq:** Groq's API uses valid TLS; with Node 20 the function should verify correctly. If it still fails, paste the full error from the *Function* log (not the build log) for targeted help.
