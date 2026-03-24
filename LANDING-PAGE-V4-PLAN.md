# Landing Page V4 Redesign — Implementation Plan

**Branch:** `feat/landing-page-v4-redesign`
**Repo:** `/Users/paaaotc/Documents/Vultisig/GitHub/website-prod`
**Scope:** All sections between header and footer (header + footer unchanged)

**Figma Master Link (full page):**
https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71822-12938

> **CRITICAL FOR AGENTS:** Use the Figma MCP tools (`get_design_context`, `get_screenshot`) with `fileKey: "puB2fsVpPrBx3Sup7gaa3v"` and the `nodeId` listed per section to fetch exact designs, copy, and assets before implementing. Every section below includes its Figma URL — open it to verify copy, spacing, colors, and layout before writing code.

---

## Current Page Structure (`app/page.tsx`)

```
<Hero />              → REWRITE
<ClientsSection />    → DELETE (replaced by StatsBar)
<FeaturesSection />   → UPDATE
<SetupSection />      → UPDATE
<BestFeaturesSection /> → REWRITE
<TestimonialsSection /> → REWRITE
<MediumSection />     → UPDATE
<CtaSection />        → UPDATE
```

## Target Page Structure

```
<Hero />              → Split layout with phone mockup
<StatsBar />          → NEW: 4 stats with gradient text
<FeaturesSection />   → Updated copy, left-aligned, pill badge
<SetupSection />      → Updated copy, vault badges, new CTAs
<BestFeaturesSection /> → Bento grid, 7 cards
<EcosystemSection />  → Replaces testimonials, split layout
<MediumSection />     → Updated title, left-aligned
<CtaSection />        → New copy, remove discord banner
```

---

## Section 1: Hero

**Figma URLs:**
- Full hero section: https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71857-35179
- Left container (text/CTAs): https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71822-13868
- Right phone mockup: https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71857-35178

**Figma MCP params:** `fileKey: "puB2fsVpPrBx3Sup7gaa3v"`, `nodeId: "71857:35179"` (parent), `"71822:13868"` (left), `"71857:35178"` (right)

**File:** `components/hero.tsx`

**Changes:**

### 1.1 Layout
- FROM: Centered single-column with Spline 3D background
- TO: Split layout — left text (~47%) / right phone mockup (~53%)
- Remove Spline 3D import and lazy loading logic
- Background: dark gradient with subtle glow ellipse at bottom center

### 1.2 Badge
- Text: "Open-Source Audited" (unchanged)
- Style change: `bg-[rgba(51,230,191,0.13)]` border `rgba(51,230,191,0.5)` (currently teal bg `#092e3e`)
- Position: left-aligned (currently centered)

### 1.3 Heading
- FROM: "NEVER GET [DRAINED/HACKED/PHISHED] AGAIN" (uppercase, centered, typewriter)
- TO: "The wallet that made seed phrases obsolete"
- Style: 60px Brockmann Medium, sentence case, static, white `#f0f4fc`, `tracking-[-1.5px]`, max-width 546px
- Remove typewriter effect entirely

### 1.4 Subheading (NEW)
- Text: "Vultisig uses multi-party computation to achieve native multi-factor authentication. No seed phrase, no single key, no single target. Available on 30+ chains."
- Style: 20px Satoshi Regular, `#c9d6e8`, `tracking-[-0.4492px]`, max-width 478px

### 1.5 CTA Buttons (2 buttons side-by-side)
- FROM: Single centered "Download Vultisig" button
- TO:
  - **Primary:** "Download Free" with download icon — `bg-[#0b4eff]`, border `#4879fd`, rounded-[12px], h-[50px]
  - **Secondary:** "How It Works →" with arrow icon — `bg-[#11284a]`, rounded-[12px], h-[50px]
- Both: 12px Brockmann Medium, `tracking-[0.12px]`, gap-[20px]

### 1.6 Social Proof Row (NEW)
- 3 overlapping avatar circles (32px each, -8px overlap)
- Text: "Trusted by **50,000+** vault creators worldwide"
- "50,000+" in bold white `#f0f4fc`, rest in `#c9d6e8`
- Font: 16px Satoshi Regular

### 1.7 Right Side — Phone Mockup (NEW)
- iPhone Space Black showing Vultisig app (portfolio $53,010.77)
- Floating UI cards around phone:
  - Swap widget (RUNE 1,000 → BTC 0.0125) — top-left
  - "Daily Vault" badge — top-right
  - "Holding Vault" dropdown — top of phone
  - Device pairing card ("iPhone 1 of 2", "Waiting for device 2 of 2") — right
  - "Receive Bitcoin" QR card — bottom-left
- Implementation: Export phone + floating elements as optimized images from Figma, position with absolute/relative CSS
- Bottom glow ellipse: `514x190px` at bottom of hero

---

## Section 2: Stats Bar (NEW)

**Figma URL:** https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71822-35533
**Figma MCP params:** `fileKey: "puB2fsVpPrBx3Sup7gaa3v"`, `nodeId: "71822:35533"`

**File:** `components/stats-bar.tsx` (NEW)

**Content:**
| Stat | Label |
|------|-------|
| $500M+ | Assets secured |
| 30+ | Chains supported |
| 50K+ | Active vaults |
| 0 | Security incidents |

**Style:**
- Stats text: 45px Satoshi Medium, gradient text `linear-gradient(64deg, #33E6BF 8%, #0439C7 134%)`
- Labels: 18px Satoshi Regular, `#8295ae`, `tracking-[-0.4492px]`
- Vertical line separators between stats (92px height, 1px)
- Horizontal layout, centered, evenly distributed
- Container: full-width, 100px side padding

---

## Section 3: Features ("Why Vultisig")

**Figma URL:** https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71822-35537
**Figma MCP params:** `fileKey: "puB2fsVpPrBx3Sup7gaa3v"`, `nodeId: "71822:35537"`

**File:** `components/features-section.tsx`

**Changes:**

### 3.1 Add Pill Badge
- Text: "WHY VULTISIG" (uppercase)
- Style: `bg-[rgba(72,121,253,0.1)]`, border `rgba(72,121,253,0.5)`, rounded-[50px], 14px Brockmann Medium, `#4879fd`

### 3.2 Title
- FROM: "Vultisig is **different**" (centered, gradient on "different")
- TO: "Built different.\n**Secured different.**" (left-aligned, 48px Brockmann Medium)
- "Built different." in white `#f0f4fc`
- "Secured different." in gradient `linear-gradient(64deg, #33E6BF 8%, #0439C7 134%)`

### 3.3 Subtitle
- Text: "No tradeoffs. Just seamless, secure crypto management." (unchanged text)
- Alignment: left-aligned (was centered)
- Style: 20px Brockmann Regular, `#c9d6e8`

### 3.4 Feature Cards (3 cards, same count)
- FROM titles: "Phishing Proof Architecture", "Private Key Free Design", "Omni-Chain"
- TO titles: "Phishing-proof by design", "No seed phrase, ever", "Truly omni-chain"
- Card style: `bg-[rgba(11,26,58,0.5)]`, border `#11284a`, rounded-[24px], padding 30px
- Icons: same icons, wrapped in `bg-[rgba(72,121,253,0.1)]` rounded-[8px] container
- Title font: 20px Brockmann SemiBold, `#eff2f6`
- Body font: 16px Brockmann Regular, `#c9d6e8`, `leading-[1.5]`
- Layout: 3 equal columns with 20px gap
- Remove hover border effect
- Left-align all card text

---

## Section 4: Setup ("Choose your setup")

**Figma URL:** https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71825-36132
**Figma MCP params:** `fileKey: "puB2fsVpPrBx3Sup7gaa3v"`, `nodeId: "71825:36132"`

**File:** `components/setup-section.tsx`

**Changes:**

### 4.1 Add Pill Badge
- Text: "CHOOSE YOUR SETUP" (uppercase)
- Same blue pill style as features section

### 4.2 Title
- FROM: "The **setup** for your needs" (centered, gradient on "setup")
- TO: "The setup for **your needs.**" (left-aligned)
- "The setup for" in white `#f0f4fc`
- "your needs." in gradient `linear-gradient(67deg, #33E6BF 8%, #0439C7 134%)`
- 48px Brockmann Medium

### 4.3 Subtitle (NEW)
- Text: "Fast Vault for daily spending. Secure Vault for maximum protection.\nBoth are keyless and require no seed phrase."
- Style: 20px Brockmann Regular, `#c9d6e8`

### 4.4 Card 1: Fast Vault
- Add vault type pill: "Fast Vault" with lightning icon — `bg-[rgba(255,194,92,0.05)]`, border same, rounded-[99px]
- Heading: FROM "Fast Vault" → TO "For daily use" (32px Brockmann Medium)
- Body text unchanged
- CTA: FROM "Create a Fast Vault" → TO "Learn More" with arrow-up-right icon
- CTA style: `bg-[#0b4eff]`, border `rgba(255,255,255,0.15)`, rounded-[12px], absolute positioned at bottom

### 4.5 Card 2: Secure Vault
- Add vault type pill: "Secure Vault" with shield icon — `bg-[rgba(19,200,157,0.05)]`, border same, rounded-[99px]
- Heading: FROM "Secure Vault" → TO "For maximum security" (32px Brockmann Medium)
- Body text unchanged
- CTA: same "Learn More" style as card 1

### 4.6 Card Style
- `bg-[rgba(11,26,58,0.5)]`, border `#11284a`, rounded-[24px], h-[515px], overflow-clip, padding 36px
- Isometric device illustrations overflow on right side (keep existing SVGs, reposition)

---

## Section 5: Best Features (Bento Grid)

**Figma URL:** https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-147569
**Figma MCP params:** `fileKey: "puB2fsVpPrBx3Sup7gaa3v"`, `nodeId: "71839:147569"`

**File:** `components/best-features-section.tsx` (REWRITE)

**Changes:**

### 5.1 Header
- Add pill badge: "EVERYTHING IN ONE PLACE" (centered, blue pill)
- Title: "Best features in one place" — 48px Brockmann Medium, centered, white (no gradient)
- Subtitle: "Multi-chain asset management, keyless security, DeFi access, and built-in swaps - all inside one secure vault environment." — centered, `#c9d6e8`
- Remove "Download Vultisig" button

### 5.2 Layout
- FROM: 3 vertically stacked sticky-scroll full-width cards
- TO: Bento grid — 3 columns, variable row heights
- Grid Figma URL: https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-119611
- Grid structure:
  - **Column 1** (403px): 2 tall cards stacked
  - **Column 2** (402px): 3 medium cards stacked
  - **Column 3** (403px): 2 tall cards stacked

### 5.3 Seven Feature Cards

**Col 1, Card 1 — Maximum Security** (403x423)
- Figma: https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-146623
- MCP: `nodeId: "71839:146623"`
- Image: gradient blue background with vault/shield visual
- Title: "Maximum security"
- Body: "Your vault shares can be stored anywhere without risk. No single piece can compromise your funds."

**Col 1, Card 2 — M-of-N Signing** (403x423)
- Figma: https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-146737
- MCP: `nodeId: "71839:146737"`
- Image: device pairing UI ("iPhone - This device 1 of 3", "Waiting for device to join 2 of 3")
- Title: "M-of-N signing."
- Body: "Every transaction requires your threshold of devices. No single device can act alone."

**Col 2, Card 1 — Cross-chain Swaps** (402x277)
- Figma: https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-146628
- MCP: `nodeId: "71839:146628"`
- Image: Swap component (RUNE 1,000 → BTC 0.0125)
- Title: "Cross-chain swaps"

**Col 2, Card 2 — Secure Notifications** (402x277)
- Figma: https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-146684
- MCP: `nodeId: "71839:146684"`
- Image: macOS notification ("Join keysign - MacBook Pro wants to sign")
- Title: "Secure notifications"

**Col 2, Card 3 — 100% Open Source** (402x277)
- Figma: https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-146718
- MCP: `nodeId: "71839:146718"`
- Image: GitHub link card ("github.com/vultisig - All source code - public") + Trail of Bits audit card
- Title: "100% open source."

**Col 3, Card 1 — 30+ Chains** (403x423)
- Figma: https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-146354
- MCP: `nodeId: "71839:146354"`
- Image: 2 rows of chain logos (AVAX, BTC, DASH, BNB, ETH, MAYA, SOL, VULT, etc.)
- Title: "30+ chains.\nOne vault."
- Body: "Bitcoin to Solana to Cosmos - every major chain, natively supported. No bridging needed."

**Col 3, Card 2 — Hold $VULT** (403x423)
- Figma: https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-146548
- MCP: `nodeId: "71839:146548"`
- Image: VULT tier card showing Diamond (35bps discount) and Ultimate (No Fee) tiers
- Title: "Hold $VULT.\nTrade for free."
- Body: "Reduce swap fees from 50bps down to 0. Six tiers - starting at 1,500 $VULT."

### 5.4 Card Style
- Dark cards: `bg-[rgba(11,26,58,0.5)]`, border `#11284a`, rounded-[24px], overflow-clip
- 14px gap between cards in same column, 16px gap between columns

---

## Section 6: Ecosystem (replaces Testimonials)

**Figma URL:** https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-147485
**Figma MCP params:** `fileKey: "puB2fsVpPrBx3Sup7gaa3v"`, `nodeId: "71839:147485"`

**Testimonial card sub-node:**
- Figma URL: https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-147827
- MCP: `nodeId: "71839:147827"`

**File:** `components/testimonials-section.tsx` → rename to `components/ecosystem-section.tsx`

**Changes:**

### 6.1 Layout
- FROM: Centered title + subtitle + 3-column testimonial carousel with pagination dots
- TO: Split layout — left text area (868px) + right testimonial card (357px)

### 6.2 Left Side
- Pill badge: "TRUSTED BY THOUSANDS" (blue pill)
- Title: "A wallet backed by a **growing ecosystem.**" — large heading, white
- Subtitle: "Vultisig isn't just a wallet - it's a growing ecosystem of users, developers, and partners building the future of self-custody together."
- CTA: "Download Vultisig" button (blue, same style as hero primary)

### 6.3 Right Side — Single Testimonial Card
- Quote icon (open quote mark)
- Review text from Mattj89iii
- Review title: "Novel approach to self-custody"
- Avatar + username "Mattj89iii" + 5 gold stars
- Card navigation: left/right arrows + dot indicators at bottom
- Card style: dark card with subtle border

---

## Section 7: Articles

**Figma URL:** https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-147462
**Figma MCP params:** `fileKey: "puB2fsVpPrBx3Sup7gaa3v"`, `nodeId: "71839:147462"`

**File:** `components/medium-section.tsx`

**Changes:**

### 7.1 Header
- Add pill badge: "ARTICLES" (blue pill, left-aligned)
- Title: FROM "Latest **Articles**" (centered) → TO "Explore More on **Medium**" (left-aligned)
- "Medium" in gradient text
- Remove subtitle text
- Remove "View all articles" link

### 7.2 Article Cards
- Keep 3-column grid, keep API-driven content
- Cards style unchanged (dark cards with image + title + description + date)

---

## Section 8: CTA Bottom

**Figma URL:** https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-147742
**Figma MCP params:** `fileKey: "puB2fsVpPrBx3Sup7gaa3v"`, `nodeId: "71839:147742"`

**File:** `components/cta-section.tsx`

**Changes:**

### 8.1 Content
- Logo: Vultisig logo (unchanged)
- Heading: FROM "Secure your digital **assets** now!" → TO "The Only Wallet You'll Ever Need."
- Subtitle (NEW): "No seed phrase. No subscription. No custodian. Just your crypto, secured by math - not trust."
- CTA: "Download Vultisig" (unchanged)

### 8.2 Background
- Keep phone mockup images (DeFi Portfolio + THORChain staking)
- Update positioning if needed to match Figma

### 8.3 Remove Discord Banner
- Delete the "JOIN THE DISCORD TO REQUEST NEW FEATURES!" banner + Discord button that sits between CTA and footer

---

## Section 9: Page-level Changes

**File:** `app/page.tsx`

- Remove `ClientsSection` import
- Add `StatsBar` import
- Rename `TestimonialsSection` → `EcosystemSection`
- Update component order:

```tsx
<Hero />
<StatsBar />
<FeaturesSection />
<SetupSection />
<BestFeaturesSection />
<EcosystemSection />
<MediumSection />
<CtaSection />
```

---

## Asset Requirements

Export from Figma (use `get_design_context` asset URLs or export manually):
1. Hero phone mockup composite image (or individual floating cards)
2. Bento card images/illustrations (7 cards)
3. Vault type icons (lightning for Fast, shield for Secure)
4. Chain logos for 30+ chains card
5. VULT tier card image
6. Swap widget image
7. Notification mockup image
8. GitHub/audit card image
9. Avatar images for social proof
10. Ecosystem testimonial card avatar

---

## Implementation Order

1. **Hero** (biggest visual change, foundational)
2. **Stats Bar** (new component, simple)
3. **Features** (copy + alignment changes)
4. **Setup** (copy + badge additions)
5. **Best Features** (full rewrite to bento grid)
6. **Ecosystem** (full rewrite from testimonials)
7. **Articles** (minor copy changes)
8. **CTA** (copy change + remove discord)
9. **Page-level** (update imports/order)

---

## Figma Node Reference (all clickable)

| Section | MCP nodeId | Figma URL |
|---------|-----------|-----------|
| Full page | `71822:12938` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71822-12938 |
| Hero (parent) | `71857:35179` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71857-35179 |
| Hero (left text) | `71822:13868` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71822-13868 |
| Hero (right mockup) | `71857:35178` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71857-35178 |
| Stats bar | `71822:35533` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71822-35533 |
| Features | `71822:35537` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71822-35537 |
| Setup | `71825:36132` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71825-36132 |
| Best Features | `71839:147569` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-147569 |
| Best Features grid | `71839:119611` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-119611 |
| Bento: Max Security | `71839:146623` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-146623 |
| Bento: M-of-N | `71839:146737` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-146737 |
| Bento: Swaps | `71839:146628` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-146628 |
| Bento: Notifications | `71839:146684` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-146684 |
| Bento: Open Source | `71839:146718` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-146718 |
| Bento: 30+ Chains | `71839:146354` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-146354 |
| Bento: $VULT | `71839:146548` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-146548 |
| Ecosystem | `71839:147485` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-147485 |
| Ecosystem testimonial | `71839:147827` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-147827 |
| Articles | `71839:147462` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-147462 |
| CTA bottom | `71839:147742` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71839-147742 |
| Header (unchanged) | `71822:13700` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71822-13700 |
| Footer (unchanged) | `71822:13615` | https://www.figma.com/design/puB2fsVpPrBx3Sup7gaa3v/Vultisig-App?node-id=71822-13615 |

**All nodes use `fileKey: "puB2fsVpPrBx3Sup7gaa3v"`** — pass to `get_design_context` or `get_screenshot` MCP tools.
