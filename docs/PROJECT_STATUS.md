# Project Status

_Last updated: 2026-06-29_

---

## 1. Project Purpose

AI Support Desk is a marketing/product landing page for an AI-powered customer support tool. Its value proposition is helping teams diagnose issues, follow guided troubleshooting steps, and escalate to the right specialist faster.

---

## 2. Framework and Runtime Versions

| Package | Version |
|---|---|
| Next.js | 16.2.9 |
| React | 19.2.4 |
| TypeScript | ^5 |
| Tailwind CSS | ^4 (via `@tailwindcss/postcss`) |
| lightningcss | ^1.32.0 |

> **Note:** Next.js 16 and React 19 have breaking changes. Per `AGENTS.md`, always read `node_modules/next/dist/docs/` before writing framework-specific code.

---

## 3. Architecture and Routes

**Router:** App Router (Next.js `app/` directory)

**File structure:**

```
app/
  components/
    header.tsx  — shared header with route links
    footer.tsx  — shared footer
  contact/
    actions.ts       — server action for contact form validation/submission state
    contact-form.tsx — client contact form using useActionState
    page.tsx         — contact route (/contact)
  features/
    page.tsx   — features route (/features)
  layout.tsx   — root layout; sets metadata, Geist fonts, body flex wrapper
  page.tsx     — home route (/)
  globals.css  — Tailwind v4 import + CSS custom properties for light/dark theme
public/        — static SVG assets (Next.js default placeholders)
```

**Routes:**

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Home page with hero and feature overview |
| `/features` | `app/features/page.tsx` | Dedicated features page expanding Diagnose, Troubleshoot, and Escalate |
| `/contact` | `app/contact/page.tsx` | Dedicated contact page with a validated form |

**Styling approach:** Tailwind CSS v4 utility classes plus CSS custom properties (`--background`, `--foreground`) for theming. System-level dark mode via `@media (prefers-color-scheme: dark)`. `color-mix()` is used for subtle tonal variants.

**Fonts:** Geist Sans and Geist Mono loaded via `next/font/google`, exposed as CSS variables.

**No API routes, no database, no auth, no external data fetching.**

---

## 4. Installed Development Tools

| Tool | Where configured |
|---|---|
| **Claude Code** | Global (`~/.claude/`); project settings in `.claude/settings.local.json` |
| **Codex MCP** | Available as `mcp__codex__codex` / `mcp__codex__codex-reply` in the Claude Code session |
| **Context7** | Global rule in `~/.claude/rules/context7.md`; project permission `Bash(npx ctx7@latest *)` in `.claude/settings.local.json` |
| **Vercel React best-practices skill** | Installed via `skills-lock.json` at `.agents/skills/vercel-react-best-practices`; also mirrored under `.claude/skills/vercel-react-best-practices` |

Additional skills installed (not requested but present):

- `agent-browser` — browser automation for agents
- `ai-elements` — AI UI component helpers
- `workflow` — agent workflow orchestration

---

## 5. Features Already Completed

- Root layout with `metadata` title template and site-wide description
- Shared responsive header with logo and route links (`/features`, `/contact`)
- Hero section with headline, subheadline, and two CTA buttons
- Features grid (3 cards): Diagnose, Troubleshoot, Escalate — each with an inline SVG icon, title, and description
- Dedicated `/features` route with per-page metadata and expanded content for the three core features
- Dedicated `/contact` route with per-page metadata and a Name / Email / Message form
- Contact form validation via server action, inline error messages, pending state, and success state
- Shared footer with copyright line
- Light/dark color scheme via CSS custom properties and `prefers-color-scheme`
- Full keyboard accessibility: `focus-visible` ring on all interactive elements, semantic `<nav>`, `<main>`, `<article>`, `aria-label`, `aria-hidden` on decorative SVGs, `aria-labelledby` on sections
- Per-page `metadata` export on `app/page.tsx`

---

## 6. Known Limitations

- **Contact form does not deliver messages externally yet** — the server action validates input and returns success, but no email/CRM/API endpoint is connected.
- **No tests** — zero unit, integration, or E2E tests.
- **No CI/CD pipeline** — no GitHub Actions or Vercel project linked yet.
- **No error boundary or 404 page** — Next.js defaults only.
- **`next.config.ts` is empty** — no image domains, redirects, headers, or bundle analysis configured.
- **`public/` contains only default Next.js placeholder SVGs** — no brand assets.
- **Build warning about workspace root inference** — `next build` warns that a parent `/mnt/c/Users/absou/package-lock.json` affects root detection; set `turbopack.root` or remove the extra lockfile when ready.

---

## 7. Acceptance Criteria — Features Page

The Features page (`app/features/page.tsx`, route `/features`) status:

- [x] Nav link in the header points to `/features` (not `#features`).
- [x] The page has its own `metadata` export with a descriptive `title` and `description`.
- [x] Content expands on the three core features (Diagnose, Troubleshoot, Escalate) with enough detail to persuade a prospective customer.
- [x] Each feature block includes a heading, supporting copy, and a visual treatment.
- [ ] Browser responsiveness verified on mobile (≥320 px) through desktop (≥1280 px).
- [ ] Keyboard navigation manually verified in browser (`Tab`, `Enter`) with visible `focus-visible` rings.
- [x] No inline `style` attributes except where Tailwind v4 cannot express the rule (e.g., `color-mix()`).
- [ ] TypeScript/build verification completed with zero errors.
- [ ] Lint verification completed with zero errors.

---

## 8. Acceptance Criteria — Contact Page

The Contact page (`app/contact/page.tsx`, route `/contact`) status:

- [x] Nav link in the header points to `/contact` (not `#contact`).
- [x] The page has its own `metadata` export with a descriptive `title` and `description`.
- [x] A contact form is present with at minimum: Name, Email, and Message fields.
- [x] Each field has a visible `<label>` associated via `htmlFor`/`id`.
- [x] Validation prevents submission of an empty required field and shows an inline error message.
- [x] Form submission returns a visible success state.
- [ ] Real message delivery is connected through email, CRM, API route, or approved fallback.
- [ ] Browser responsiveness verified at all breakpoints.
- [ ] Keyboard navigation manually verified for all form controls and the submit button.
- [ ] TypeScript/build verification completed with zero errors.
- [ ] Lint verification completed with zero errors.

---

## 9. Production-Readiness Concerns (address later)

- **No CI pipeline** — add GitHub Actions to run `tsc --noEmit`, `npm run lint`, and `next build` on every PR.
- **No deployment config** — connect a Vercel project; confirm Node.js runtime version matches.
- **No error pages** — add `app/not-found.tsx` and `app/error.tsx`.
- **No `robots.txt` or `sitemap.xml`** — needed for SEO before public launch.
- **No Open Graph / Twitter Card metadata** — add `openGraph` and `twitter` fields to `metadata` exports.
- **No analytics or monitoring** — add before sharing publicly.
- **`public/` placeholder SVGs** — replace with real brand assets before launch.
- **No security headers** — configure `Content-Security-Policy`, `X-Frame-Options`, etc. in `next.config.ts`.
- **No rate-limiting on the contact form** — required once the form POSTs to a real endpoint.
- **Turbopack root warning** — resolve the parent-lockfile root inference before relying on production build output.

---

## 10. Definition of Done — New Pages

A new page is **done** when all of the following are true:

1. **Route exists** — file at `app/<page>/page.tsx` renders without runtime errors.
2. **Metadata** — `export const metadata` with `title` and `description` is present.
3. **Navigation** — the corresponding header nav link points to the route URL (not an anchor).
4. **Content complete** — all acceptance criteria for that page (sections 7 or 8) are checked off.
5. **Responsive** — visually correct on mobile (375 px) and desktop (1280 px); verified in a browser.
6. **Accessible** — semantic HTML, labeled form controls, `aria-*` where needed, keyboard-navigable.
7. **Type-safe** — `tsc --noEmit` exits 0.
8. **Lint-clean** — `npm run lint` exits 0.
9. **No regressions** — the home page (`/`) still renders and all existing nav links work.
