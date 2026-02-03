# Security & Improvements Checklist

Summary of what was reviewed and what you can do next for your portfolio.

---

## Security

### What’s in good shape

- **No sensitive data in code** – Email and phone are public contact info; no API keys or secrets in the repo.
- **No `.env` in repo** – `.gitignore` now includes `.env`, `.env.local`, and `.env.*.local` so future secrets stay out of version control.
- **No risky patterns** – No `dangerouslySetInnerHTML`, `eval`, or user-controlled `innerHTML`; links use static `href` (mailto/tel/#).
- **localStorage** – Cookie notice only stores a non-sensitive flag (`portfolio-cookie-notice-seen`); access is wrapped in try/catch.
- **Referrer policy** – `index.html` now has `<meta name="referrer" content="strict-origin-when-cross-origin" />` so you don’t leak full URLs to third-party sites.

### Dependencies (npm audit)

- **Current finding:** 2 moderate issues in the **dev** toolchain (esbuild via Vite): a dev-server request-handling advisory ([GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99)).
- **Impact:** Affects `npm run dev` only (development server). Production build is static files; no Node server in production, so risk is low for the live site.
- **Options:**
  1. **Leave as-is** – Accept dev-only risk; avoid opening the dev server to untrusted networks.
  2. **Upgrade when ready** – Run `npm audit fix` (or `npm audit fix --force` for major upgrades). The fix may suggest Vite 7.x; test the build and dev server after upgrading.

### If you add backend or forms later

- Use **HTTPS** only in production.
- For **forms** (e.g. contact): use a serverless function or third-party service; don’t put API keys in client-side code. Keep secrets in env vars (e.g. Vite `import.meta.env.VITE_*` only for non-secret, public config).
- For **links that open in a new tab** (`target="_blank"`): add `rel="noopener noreferrer"` to avoid tab-napping and referrer leakage.

---

## Other improvements

### Hosting / headers (optional)

If you control response headers (e.g. Netlify, Vercel, or your own server), consider:

- **Content-Security-Policy (CSP)** – Restrict script/style sources to your domain and trusted CDNs (e.g. Google Fonts). Start with report-only if you prefer.
- **X-Content-Type-Options: nosniff** – Reduces MIME-sniffing issues.
- **Permissions-Policy** – Disable unneeded features (camera, mic, etc.) for a static portfolio.

### Accessibility

- Interactive elements use semantic HTML and keyboard-friendly patterns.
- Cookie notice uses `role="dialog"` and `aria-label`; consider `aria-describedby` if you add an ID to the message text.

### Performance

- Fonts use `preconnect` and a single stylesheet request; consider `font-display: swap` in the URL if you want to avoid invisible text.
- No heavy runtime dependencies; build output stays small.

### Maintenance

- Run **`npm audit`** and **`npm update`** occasionally.
- When adding dependencies, prefer well-maintained packages and check for known vulnerabilities.

---

## Implemented in this pass

1. **`.gitignore`** – Added with entries for `node_modules`, `dist`, `.env*`, and common editor/OS files.
2. **Referrer policy** – Set in `index.html` to `strict-origin-when-cross-origin`.

Anything else (CSP, dependency upgrades, hosting headers) can be done when you’re ready.
