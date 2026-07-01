# AI Support Desk

An AI-powered technical support platform built on Next.js 16 (App Router). A visitor describes an issue and gets back a streamed, structured diagnosis — root cause, verification steps, and a fix — from Claude Opus. There's also a real contact form and a small admin dashboard for reviewing submissions.

This isn't a demo shell: the contact form actually sends email and persists to a database, both write paths are rate-limited, and there's a real (if small) test suite around the validation logic.

## Features

- **AI Diagnosis** (`/diagnose`) — streams a structured root-cause analysis from Claude Opus via the Anthropic SDK, rate-limited to 10 requests/hour per IP
- **Contact Form** (`/contact`) — validated server action, honeypot spam guard, 3 submissions/hour per IP, delivers email via Resend and persists to Supabase
- **Admin Dashboard** (`/admin`) — Clerk-gated, further restricted to a single hardcoded admin email; shows submission stats and a table of contact entries
- **Dark / light mode** — system-aware theme, no flash on load
- **Security headers** — `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` set globally in `next.config.ts`
- **Custom 404** and an edge-rendered Open Graph image
- **19 passing Vitest tests** covering contact and diagnose input validation

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| AI | Claude Opus via `@anthropic-ai/sdk` |
| Auth | Clerk (`proxy.ts` middleware protects `/admin`) |
| Database | Supabase (`contact_submissions` table) |
| Email | Resend |
| Rate limiting | Upstash Redis (sliding window) |
| Styling | Tailwind CSS v4 |
| Testing | Vitest |
| Deployment | Vercel |

## Architecture notes

- **Validation is pure and shared.** `lib/validate-contact.ts` has no framework dependencies, which is what makes it directly unit-testable (`tests/contact-validation.test.ts`) instead of needing a rendered form or a mocked server action.
- **Rate limiting is centralized** in `lib/rate-limit.ts` — one Upstash Redis client, two `Ratelimit` instances (`contact`: 3/hr, `diagnose`: 10/hr) keyed by IP, so both write paths share the same Redis connection instead of each route rolling its own.
- **`/api/diagnose` streams the response** back to the client as `text/plain` with `X-Accel-Buffering: no`, piping tokens from the Anthropic stream straight into a `ReadableStream` rather than buffering the full completion.
- **Admin auth is two-layered:** `proxy.ts` (Clerk middleware) blocks unauthenticated requests to `/admin(.*)`, and `app/admin/page.tsx` additionally checks the signed-in user's email against a single hardcoded address. If you fork this, that email check is the first thing you'll want to replace with a real roles table.
- **`app/opengraph-image.tsx`** generates the OG image at request time on the edge runtime rather than shipping a static asset.

## Local Setup

### Prerequisites

- Node.js 20+
- A Clerk account and application
- A Supabase project with a `contact_submissions` table
- A Resend account (and a verified sending domain for production use)
- An Upstash Redis database
- An Anthropic API key

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/ai-support-desk.git
cd ai-support-desk
npm install
```

### 2. Environment variables

Create `.env.local` in the project root:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJ...

# Resend
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=you@example.com

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=...

# Anthropic
CLAUDE_API_KEY=sk-ant-...
```

`.env.local` is gitignored — never commit real keys.

### 3. Supabase table

Run this in the Supabase SQL editor:

```sql
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);
```

The app uses the anon key with no RLS policy assumptions baked in — if you enable Row Level Security on this table, add a policy that allows inserts from the anon role, or the contact form will silently fail to persist (it still validates and emails either way, since the Supabase call isn't in the critical path).

### 4. Admin access

`app/admin/page.tsx` hardcodes a single allowed admin email. Update `ADMIN_EMAIL` in that file to your own address before relying on the dashboard.

### 5. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev        # Start dev server (Turbopack)
npm run build      # Production build
npm run start      # Start production server
npm test           # Run Vitest test suite once
npm run test:watch # Run tests in watch mode
npm run lint       # ESLint
```

## Project Structure

```
app/
  api/diagnose/route.ts   # Streaming Claude API route, rate-limited
  admin/page.tsx          # Clerk-protected admin dashboard + stats
  contact/
    actions.ts            # Server action: honeypot, rate limit, validate, email, persist
    contact-form.tsx       # Client form using useActionState
    page.tsx
  diagnose/
    diagnose-form.tsx      # Streaming chat-style UI for the diagnosis flow
    page.tsx
  components/              # Header, footer, button, theme toggle
  not-found.tsx             # Custom 404
  opengraph-image.tsx       # Edge-rendered OG image
lib/
  supabase.ts              # Supabase client (server-only)
  rate-limit.ts            # Upstash Ratelimit instances (contact, diagnose)
  validate-contact.ts       # Pure, framework-free validation — the tested surface
tests/
  contact-validation.test.ts
  diagnose-validation.test.ts
proxy.ts                    # Next.js 16 middleware — Clerk auth on /admin
next.config.ts               # Security headers
```

## Known limitations

- Admin authorization is a single hardcoded email, not a roles table — fine for a solo project, not for a team.
- No CI pipeline wired up yet (no GitHub Actions running lint/typecheck/tests on PRs).
- No `robots.txt` / `sitemap.xml` — add before a public launch if SEO matters.
- No application monitoring or error tracking beyond `console.error` in the contact action.

## License

MIT
