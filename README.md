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

## Stack

- Vite + React + TypeScript
- No UI framework — custom CSS with design tokens
