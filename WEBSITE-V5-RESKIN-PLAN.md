# Website V5 Reskin — Implementation Plan

**Branch:** `feat/website-v5-reskin`
**Scope:** Full-site reskin to the V5 light theme — 6 page groups + shared chrome (header, footers). Successor to `LANDING-PAGE-V4-PLAN.md` (same Figma file, same workflow).

**Figma file key:** `puB2fsVpPrBx3Sup7gaa3v`

> **CRITICAL FOR AGENTS:** Use Figma MCP tools (`get_design_context`, `get_screenshot`) with the `nodeId` listed per section. Every desktop frame is 1440px wide with a 1380px content frame (30px gutters); mobile frames are 393px. Fetch the design before writing code — never work from memory of a screenshot.

---

## Design language (V5)

- **Theme:** LIGHT. Page background is white/ice-blue (`#F0F4FC`-family), deep-navy text (`#02122b`), primary blue `#0b4eff` (accent `#4879fd`), secondary surface `#11284a` (dark buttons), success `#13c89d`, warning `#ffc25c`, purple `#8f65ff`, orange `#ffaa1c`.
- **Type:** Brockmann everywhere (already in `public/fonts/` + `tailwind.config.ts`). Figma text styles: Headline 40/42 -1px, Title2 22/24 -0.36, Title3 17/20 -0.3, Body M 16/24, Body S 14/20 500, Caption 12/16, Footnote 13/18.
- Dark sections still exist as accents (bento "Best features", chains diagram on MPC, dark cards) — dark is now the exception, light the rule.
- Exact values MUST come from `get_variable_defs` / `get_design_context` per node at build time, not from this summary.

## Phase 0 — Tokens + shared chrome (build FIRST, everything depends on it)

| Component | Figma node (desktop) | Mobile | Target file |
|---|---|---|---|
| Header + 2 dropdowns (Products: App/Extension · For Users/Agents/Builders) | `79718:62435`, dropdowns `80037:34335` + `80037:34336` | `79740:297806` | `components/navbar.tsx` |
| Footer 3.0 (link columns + Discord CTA block) | `79852:153003` | inside each mobile frame | `components/footer.tsx` |
| Footer banner ("The Only Wallet You'll Ever Need") | `79852:152953` | `79733:294246` | `components/footer-banner.tsx` (new, replaces `cta-section.tsx`/`discord-section.tsx`) |
| Landing Page Button (primary/secondary variants, used on every page) | instances everywhere, e.g. `79450:240727` | — | `components/ui/landing-button.tsx` (new, CVA variants) |
| Section heading block (title + subtitle pattern `Frame 1000005440`) | e.g. `79139:178171` | — | `components/ui/section-heading.tsx` (new) |
| FAQ accordion (same design on Landing / $VULT / MPC) | `79150:16071` | `79733:294056` | refactor `home-faq.tsx` → `components/ui/faq-section.tsx` (Radix accordion, data-driven) |
| Tailwind tokens + globals | variables on any V5 node | — | `tailwind.config.ts`, `app/globals.css` |

## Phase 1 — Landing page `/` (node `79733:294589`)

Desktop `79139:178136` · Mobile `79719:9503`

| # | Section | Desktop node | Mobile node | Component | Verdict |
|---|---|---|---|---|---|
| 1 | Hero "The wallet that made seed phrases obsolete" + stats row ($500M+/30+/50K+/0) | `79722:290338` (stats `79722:290339`) | `79722:291143` | `hero.tsx` + `stats-bar.tsx` | REWRITE (light theme) |
| 2 | "Built different. Secured different." 3 cards | `79139:178170` | `79722:293129` | `features-section.tsx` | REWRITE |
| 3 | "Best features in one place." dark bento | `79139:178207` | `79722:293821` | `best-features-section.tsx` | UPDATE (stays dark) |
| 4 | "The setup for your needs." | `79450:240726` | `79722:293146` | `setup-section.tsx` | REWRITE |
| 5 | "One Vault. 30+ Blockchains." chain diagram | `79937:156168` | `79733:293822` | `chains-section.tsx` (new; retire `ecosystem-section.tsx`) | NEW |
| 6 | Store ratings (Google Play / App Store + orange promo card) | `79937:155016` | `79733:294054`-adjacent | `ratings-section.tsx` (new) — wire to existing `/api/reviews` | NEW |
| 7 | FAQ | `79150:16050` | `79733:294054` | `faq-section.tsx` w/ home data | UPDATE |
| 8 | "Explore More on Medium" | `79139:178230` | `79733:294590` | `medium-section.tsx` | UPDATE |
| 9 | Footer banner + Footer 3.0 | shared (Phase 0) | `79733:294246`/`79733:294588` | shared | — |

## Phase 2 — How It Works `/how-it-works` (node `79740:297035`)

Desktop `79150:16893` · Mobile `79740:294865`

Sections: hero "Your key was never whole to begin with" (`79150:16895`) · "Three steps. No seed phrase." (`79150:16927`) · dark "Bring your own devices" (`79150:17818`) · dark "Backups that can't betray you" (`79344:203917`) · purple "Lost a device? Four steps back" (`79344:204338`, card components with hover variants: `79402:204472/204478/204484/204490`) · shared footers.
Existing route has its own `components/` + `images/` dirs — replace contents, keep structure.

## Phase 3 — $VULT `/vult` (node `79740:298080`)

Desktop `79402:205740` · Mobile `79740:297037`

Sections: hero + token stats strip (`79402:205742`, 100,000,000 supply figures + contract address w/ copy button) · Discount Tiers cards Bronze→Ultimate (`79426:214933`, tier card symbol `79426:215060`) · "What holding VULT gets you" phone + 3 benefits (`79987:157653`) · "Got an idea? Put it in front of the team" banner (`80021:26111`) + feature-request board w/ vote counts + All/Chains/Desktop/Mobile filter (`79978:157607`) · "Join the Vultisig Arena" cards (`79450:240782`, symbol `79450:241714`) · FAQ (`79581:8983`) · shared footers.
NOTE: feature-request board + vote counts — confirm data source (static in V5 or wired to an API). Static-first, flag for wiring.

## Phase 4 — Downloads `/downloads` (node `79740:298904`)

App: desktop `79740:298085` · mobile `79740:298478` — Extension: desktop `79978:156735` · mobile `79978:157004`

One route, "Mobile App | Browser Extension" tab toggle (`79978:156672`). Per tab: download platform cards (component `79978:157256`+ with Default/Hover variants) + SHA checksum cards + device mockup. Keep existing download-link/SHA data source (`app/downloads/`) — reskin only, don't regress the version/hash update workflow.

## Phase 5 — MPC `/mpc` (node `79852:152740`)

Desktop `79589:138342` (10,891px tall, 11 sections) · Mobile `79852:152531` — **⚠ mobile frame in Figma only contains the footer; mobile layout must be derived from desktop + the mobile patterns established in Phases 1–4.**

Sections: hero "The Free Open-Source MPC Wallet For Everyone" (`79589:138344`) · purple "Seed Phrases Are a $250 Billion Problem" 4 cards (`79589:138353`) · "What Is an MPC Wallet?" 3 cards (`79589:139024`) · "Not All MPC Wallets Are Equal" comparison table (`79589:139044`) · blue "How Vultisig Works" 3 phone cards (`79589:139155`) · "Built on Proven MPC Protocols" (`79589:139228`) · "Security You Can Verify" + green card (`79589:139300`) · dark "One Vault. 30+ Blockchains." (`79603:139511`, reuse Phase 1 chains-section) · "We Don't Track You. Period." (`79603:139601`) · long-form FAQ ~18 items (`79603:139736`) · shared footers.

## Phase 6 — Articles `/articles` + `/articles/[slug]` (node `79852:152741`)

Index (4 tab-state frames, build once data-driven): `79612:149149` (Updates) / `79625:9039` / `79640:9277` / `79643:83639`. Detail: `79643:83868`. **⚠ No mobile frames — derive.**

- Index: title + featured-article hero card (`79640:9495`) + category tabs with counts (All/Updates/Vultisig vs./Explainers/Security & Deep Dives) + search field + 3-col card grid. Categories/counts computed from front-matter — extend `lib/articles.ts`, don't hardcode.
- New `article-card.tsx` design (node `79625:8963`).
- Detail: breadcrumb + cover + byline/dates + prose + **sticky "Contents" TOC sidebar** (`79643:84082`, generate from headings) + Related Articles + shared footers.
- Keep: markdown pipeline, admin, RSS, existing slugs/URLs (SEO — zero URL changes).

## Phase 7 — QA, SEO, polish

- Pixel pass every page at 1440 / 768 / 393 vs Figma exports (protocol below).
- SEO: per-page `metadata` (title/description/canonical/OG) preserved or improved; JSON-LD — `FAQPage` on landing/$VULT/MPC FAQs, `Article`+`BreadcrumbList` on articles, `SoftwareApplication` on downloads; one `<h1>` per page, semantic section/heading order; `next/image` (or explicit width/height) everywhere; alt text from Figma layer names is NOT acceptable — write real alt text; verify `app/sitemap.xml` still emits all routes; no URL changes anywhere.
- Perf: keep `next/dynamic` for below-fold sections; images as optimized assets (Figma-exported → `public/`, compressed); Lighthouse ≥ current scores on / /mpc /articles.
- Animations layer (see below) after static sign-off.

## Animations — OPEN

Figma's MCP motion tool (`get_motion_context`) returns empty for every V5 node (checked recursively on all 6 sections). The Shift+Enter preview animations are not extractable through the API from these frames. Resolution options, in preference order:
1. Export the animated flows as MP4 from Figma (or `export_video` MCP tool if the file supports it) → implement with Motion/CSS to match.
2. Written spec per animated element (what moves, trigger, duration/easing).
Until resolved: static implementation proceeds; each section built so motion can be layered without rework (transform/opacity-friendly structure, no layout-dependent effects).

## Verification protocol (every section, before its commit)

1. `npm run dev` → screenshot at 1440px and 393px (browser tools).
2. Compare against `get_screenshot` export of the same node — spacing, type scale, radii, colors.
3. `npm run lint` + `npx tsc --noEmit` clean.
4. Commit message: `v5(<page>): <section>` — one commit per section.

## Rules

- Canonical repo only (this repo). Never edit the Giga copy.
- No hardcoded hex where a token exists — extend Tailwind theme first.
- Reuse Phase 0 primitives; if a page needs a new primitive used ≥2×, promote it to `components/ui/`.
- Existing data plumbing (reviews API, articles lib, download hashes, Medium feed) is kept and re-skinned, never forked.
- PR requires `## receipts` (lint + typecheck + screenshot pairs).
