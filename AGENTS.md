# website-prod — Agent Reference

## Overview

Vultisig marketing website. Next.js 15 + Tailwind CSS + Radix UI.

## Quick Start

```bash
git clone https://github.com/vultisig/website-prod.git
cd website-prod
nvm use    # Node 19+
npm install
npm run dev
npm run build   # Verify production build
```

## Before You Change Code

1. Run `npm run build` to verify current state
2. This is a marketing site — no crypto/wallet logic
3. If touching app/api/: these are server-side routes, handle carefully

## Patterns

- Next.js App Router (app/ directory)
- shadcn/ui + Radix UI for components
- Tailwind CSS for styling
- React Hook Form + Zod for forms
- Static content in content/ directory

## Security Notes

- No wallet or crypto logic — low security tier
- API routes run server-side — validate inputs
- Don't expose internal service URLs in client-side code

## Knowledge Base

For deeper context beyond this file, see [vultisig-knowledge](https://github.com/vultisig/vultisig-knowledge).

Key docs for this repo:
- [repos/website-prod.md](https://github.com/vultisig/vultisig-knowledge/blob/main/repos/website-prod.md)
- [coding/patterns.md](https://github.com/vultisig/vultisig-knowledge/blob/main/coding/patterns.md)
- [coding/dependencies.md](https://github.com/vultisig/vultisig-knowledge/blob/main/coding/dependencies.md)
