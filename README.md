
# Saas-App

A Next.js (App Router) learning platform that provides "Companions" — short, focused lessons users can launch and complete. Built with Next 16, TypeScript and Tailwind; it uses Clerk for authentication, Supabase for persistence, and is designed to be deployed on Vercel.

Live demo
- Deploy this repository to Vercel (button): https://vercel.com/new/clone?repository-url=https://github.com/chickeeteettaz-art/Saas-App
- After you deploy, your site will be available at your Vercel domain (for example: `https://<your-vercel-project>.vercel.app`). Replace the example with your actual deployed URL.

## Features

- List and browse "Companions" (lessons)
- Launch a lesson from a companion card
- Track recently completed sessions
- Create and manage companions (permissioned by user plan/features)
- Authenticated routes using Clerk
- Persistence via Supabase (companions + session history)
- Sentry integrated for error tracking
- Tailwind + Radix UI for components

## Stack

- Language(s): TypeScript, JavaScript
- Framework / runtime: Next.js (App Router) — Next 16
- Runtime libraries & services:
  - React 19
  - Tailwind CSS
  - Supabase (database + auth client)
  - Clerk (authentication)
  - Sentry (error monitoring)
  - Radix UI (UI primitives)
  - lottie-react, lucide-react for UI niceties
  - Vercel for deployment

Notable project files
- app/page.tsx — Home page (loads popular companions and recent sessions)
- components/ — UI components (CompanionCard, CompanionsList, forms, UI primitives)
- components/ui/ — shared UI building blocks (button, table, input, select, etc.)
- lib/actions/companion.actions.ts — server actions for companions & sessions (Supabase queries)
- instrumentation.* — Sentry / telemetry configuration
- next.config.ts, postcss.config.mjs, tailwind + eslint configs

## How it's organized

Top-level (relevant) tree (annotated)
```
app/                    Next.js App Router pages and route handlers
components/             UI components: CompanionCard, CompanionsList, Navbar, forms
components/ui/          Shared UI primitives (button, table, input, select)
lib/                    App logic helpers and server actions (Supabase adapters)
public/                 Static assets (icons, images, etc.)
constants/              App constants (colors, recentSessions placeholders)
types/                  Type definitions
next.config.ts          Next.js configuration (Edge / runtime settings)
package.json            Project scripts and dependencies
README.md               This file
```

How it fits together
- The app uses Next.js App Router. Server actions in lib/actions (e.g., getAllCompanions, getRecentSessions) talk to Supabase.
- app/page.tsx calls these server actions to render the home page with popular companions and recent sessions. Components in components/ render the UI and link to companion detail pages and lesson flows.
- Authentication is provided by Clerk; server-bound utilities are used in server actions and routes.

## Quick start (local)

1. Clone the repository
```bash
git clone https://github.com/chickeeteettaz-art/Saas-App.git
cd Saas-App
```

2. Install dependencies
```bash
npm install
# or
pnpm install
# or
yarn
```

3. Create a .env.local (see Required environment variables below) and start the dev server
```bash
npm run dev
# open http://localhost:3000
```

4. Build / run production locally
```bash
npm run build
npm start
```

## Required environment variables

This project integrates with third-party services. Add the appropriate keys to `.env.local` (example names below — confirm exact names in the repository code/config if you modify env handling):

- Supabase
  - NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
  - NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
  - (If server/service role is needed) SUPABASE_SERVICE_KEY=your-service-role-key

- Clerk
  - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
  - CLERK_SECRET=sk_...

- Sentry (optional)
  - SENTRY_DSN=your_sentry_dsn

- Any AI / API provider used (example)
  - VAPI_API_KEY=your_vapi_key

Notes:
- Server-only secrets (service keys, Sentry secret, Clerk secret) should not be exposed to the browser.
- When deploying to Vercel, add these environment variables in the Vercel project settings.

## Database / Supabase schema (recommended)

From code usage, the app expects at least:

- Table: companions
  - id (uuid or text primary key)
  - name, topic, subject, duration, author (user id), created_at, ...other metadata

- Table: session_history
  - id
  - companion_id (FK to companions.id)
  - user_id
  - created_at

Create these tables in Supabase (or adapt to your schema). The app queries:
- SELECT from `companions`
- INSERT into `companions`
- SELECT and INSERT into `session_history` (used for recent sessions & history)

## Deployment (Vercel)

Recommended: deploy directly from this GitHub repository using Vercel.

1. Go to Vercel and import the repository:
   https://vercel.com/new/clone?repository-url=https://github.com/chickeeteettaz-art/Saas-App

2. Add the environment variables (Supabase, Clerk, Sentry, etc.) in the Vercel project settings.

3. Vercel will automatically build Next.js and deploy. After deploy, your site will be accessible at the assigned Vercel domain (e.g., `https://<project>.vercel.app`).

Optional: configure custom domain in Vercel and update environment variables as needed.

## Development notes & conventions

- Pages use Next.js App Router with server actions. Some routes are marked dynamic to avoid static prerendering when server-bound auth is used.
- UI: Tailwind + Radix UI. Components live in components/ and components/ui/.
- Error monitoring using Sentry configuration files (sentry.edge.config.ts, sentry.server.config.ts).
- Auth checks reference Clerk features/plan to gate certain actions (e.g., newCompanionPermissions checks user plan/features).
- Supabase access uses a client helper in lib (createSubabaseClient) — review its implementation to ensure server/client keys are properly separated.

## Scripts

- npm run dev — development server
- npm run build — production build
- npm start — start built app
- npm run lint — run ESLint

## Contributing

- Open an issue or create a PR.
- Keep changes small and focused. Add or update tests where appropriate.
- Follow existing code style (TypeScript + Tailwind + Next patterns).

## Troubleshooting

- If server actions fail with auth errors, confirm Clerk keys and correct environment variables.
- If Supabase queries fail, verify your Supabase URL and keys and that the `companions` and `session_history` tables exist.
- Check Sentry logs (if configured) for runtime exceptions.

## License

Specify your preferred license (add a LICENSE file). If none is provided, you can add one (MIT is common for examples).

---

If you'd like, I can:
- Add a .env.example with recommended env variable names.
- Add Supabase migration SQL for the two tables used by the app.
- Generate a short "Deploy to Vercel" badge/button you can paste into the top of this README.
