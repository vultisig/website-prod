# website-prod

Vultisig marketing website.

## Security Tier

LOW

## Critical Boundaries

- `app/api/` — API routes (handle with care, these run server-side)
- No crypto or wallet logic — this is a marketing site.

## Key Commands

```bash
# Dev
npm run dev

# Build
npm run build

# Start production
npm run start

# Lint
npm run lint
```

## Architecture

Next.js 15 (App Router) + Tailwind CSS + Radix UI.

```
app/                → Next.js app directory
  api/              → API routes (server-side)
  articles/         → Blog
  mpc/              → MPC explainer pages
  vult/             → VULT token page
  downloads/
  how-it-works/
  privacy/
  support/
  docs/
  termofservice/
  layout.tsx        → Root layout
  page.tsx          → Homepage
  sitemap.ts        → SEO sitemap
components/         → Reusable UI components (shadcn/ui pattern)
content/            → Static content (markdown, data)
hooks/              → Custom React hooks
lib/                → Utilities
types/              → TypeScript type definitions
workers/            → Web workers
assets/             → Static assets (images, icons)
public/             → Public static files
```

## Code Conventions

- Next.js App Router conventions
- Tailwind CSS for styling
- shadcn/ui + Radix UI for components
- Zod for form validation
- React Hook Form for forms
- npm as package manager (`package-lock.json`)

## Knowledge Base

For deeper context, see [vultisig-knowledge](https://github.com/vultisig/vultisig-knowledge). Read only when needed:

| Situation | Read |
|-----------|------|
| First time in this repo | [repos/website-prod.md](https://github.com/vultisig/vultisig-knowledge/blob/main/repos/website-prod.md) |
| Unsure about conventions | [coding/patterns.md](https://github.com/vultisig/vultisig-knowledge/blob/main/coding/patterns.md) |
| Checking dependency versions | [coding/dependencies.md](https://github.com/vultisig/vultisig-knowledge/blob/main/coding/dependencies.md) |
