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
  api/              → API routes
  articles/         → Blog
  docs/
  downloads/
  how-it-works/
  privacy/
  support/
  vult/             → VULT token page
  layout.tsx        → Root layout
  page.tsx          → Homepage
  sitemap.ts        → SEO sitemap
components/         → Reusable UI components (shadcn/ui pattern)
content/            → Static content
hooks/              → Custom React hooks
lib/                → Utilities
public/             → Static assets
```

## Code Conventions

- Next.js App Router conventions
- Tailwind CSS for styling
- shadcn/ui + Radix UI for components
- Zod for form validation
- React Hook Form for forms
- Node.js 19+ (see .nvmrc)
