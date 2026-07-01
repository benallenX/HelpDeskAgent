# AI Support Desk

An AI-powered technical support platform built with Next.js 16 App Router. Describe an issue and get a structured diagnosis — root cause, verification steps, and a fix — streamed in real-time by Claude Opus.

## Features

- **AI Diagnosis** — Stream a structured root-cause analysis from Claude Opus 4.8 for any technical issue
- **Contact Form** — Rate-limited (3/hr per IP), spam-protected via honeypot, email delivery via Resend
- **Admin Dashboard** — Protected by Clerk auth; view all contact submissions with stats
- **Dark / Light Mode** — System-aware theme with manual toggle, no flash on load
- **Custom 404** — Friendly not-found page
- **OG Image** — Dynamically generated Open Graph image at the edge
- **19 Passing Tests** — Vitest suite covering form validation and input guards

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| AI | Anthropic Claude Opus 4.8 via `@anthropic-ai/sdk` |
| Auth | Clerk (sign-in modal, admin protection) |
| Database | Supabase (contact submissions) |
| Email | Resend |
| Rate limiting | Upstash Redis |
| Styling | Tailwind CSS v4 |
| Testing | Vitest |
| Deployment | Vercel |

## Local Setup

### Prerequisites

- Node.js 20+
- A Clerk account and app
- A Supabase project with a `contact_submissions` table
- A Resend account
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

### 3. Supabase table

Run this in your Supabase SQL editor:

```sql
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev        # Start dev server (Turbopack)
npm run build      # Production build
npm run start      # Start production server
npm test           # Run Vitest test suite
npm run test:watch # Run tests in watch mode
npm run lint       # ESLint
```

## Project Structure

```
app/
  api/diagnose/    # Streaming Claude API route
  admin/           # Clerk-protected admin dashboard
  contact/         # Contact form + server action
  diagnose/        # AI diagnosis page
  components/      # Header, footer, button, theme toggle
  not-found.tsx    # Custom 404
  opengraph-image.tsx  # Edge-rendered OG image
lib/
  supabase.ts      # Supabase client
  rate-limit.ts    # Upstash rate limiter config
  validate-contact.ts  # Pure validation (shared + tested)
tests/
  contact-validation.test.ts
  diagnose-validation.test.ts
proxy.ts           # Next.js 16 middleware (Clerk auth)
```

## License

MIT
