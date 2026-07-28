type FontSizeToken = [string, { lineHeight: string; letterSpacing: string }]

/**
 * V5 type scale — the Figma text styles plus the display sizes the V5 frames use.
 * Shared by tailwind.config.ts (to emit the utilities) and lib/utils.ts (so cn()
 * knows these `text-*` classes are sizes, not colours).
 */
export const v5FontSize = {
  "v5-headline": ["40px", { lineHeight: "42px", letterSpacing: "-1px" }],
  "v5-title2": ["22px", { lineHeight: "24px", letterSpacing: "-0.36px" }],
  "v5-title3": ["17px", { lineHeight: "20px", letterSpacing: "-0.3px" }],
  "v5-body-m": ["16px", { lineHeight: "24px", letterSpacing: "0" }],
  "v5-body-s": ["14px", { lineHeight: "20px", letterSpacing: "0" }],
  "v5-footnote": ["13px", { lineHeight: "18px", letterSpacing: "0.06px" }],
  "v5-caption": ["12px", { lineHeight: "16px", letterSpacing: "0.12px" }],
  "v5-caption-sm": ["10px", { lineHeight: "14px", letterSpacing: "0.12px" }],
  "v5-button": ["14px", { lineHeight: "18px", letterSpacing: "0" }],
  "v5-button-sm": ["13px", { lineHeight: "18px", letterSpacing: "0" }],
  "v5-tile-label": ["8px", { lineHeight: "12px", letterSpacing: "0.08px" }],
  "v5-card-body": ["15px", { lineHeight: "1.35", letterSpacing: "-0.33px" }],
  "v5-card-meta": ["13px", { lineHeight: "1.35", letterSpacing: "-0.286px" }],
  "v5-faq-title": ["76px", { lineHeight: "1.18", letterSpacing: "-1.672px" }],
  "v5-display-tight": [
    "48px",
    { lineHeight: "1.09", letterSpacing: "-1.056px" },
  ],
  // MPC "Secured across every chain" green card
  "v5-display-lg-tight": [
    "56px",
    { lineHeight: "1.09", letterSpacing: "-1.232px" },
  ],
  "v5-display-sm-tight": [
    "32px",
    { lineHeight: "1.09", letterSpacing: "-0.704px" },
  ],
  "v5-score": ["36px", { lineHeight: "1.09", letterSpacing: "-0.792px" }],
  "v5-quote": ["20px", { lineHeight: "1.29", letterSpacing: "-0.38px" }],
  "v5-card-title": ["32px", { lineHeight: "1.19", letterSpacing: "-0.608px" }],
  "v5-card-title-sm": [
    "26px",
    { lineHeight: "1.19", letterSpacing: "-0.494px" },
  ],
  "v5-card-title-md": [
    "28px",
    { lineHeight: "normal", letterSpacing: "-0.532px" },
  ],
  "v5-body-l-relaxed": [
    "18px",
    { lineHeight: "1.5", letterSpacing: "-0.342px" },
  ],
  "v5-body-m-tight": ["16px", { lineHeight: "1.5", letterSpacing: "-0.304px" }],
  "v5-body-m-relaxed": [
    "16px",
    { lineHeight: "1.5", letterSpacing: "-0.352px" },
  ],
  "v5-footnote-relaxed": [
    "13px",
    { lineHeight: "1.5", letterSpacing: "-0.247px" },
  ],
  "v5-hero": ["60px", { lineHeight: "72px", letterSpacing: "-1.5px" }],
  "v5-hero-sm": ["46px", { lineHeight: "51px", letterSpacing: "-1px" }],
  "v5-stat": ["45px", { lineHeight: "1.2", letterSpacing: "0" }],
  "v5-stat-sm": ["31px", { lineHeight: "1.2", letterSpacing: "0" }],
  "v5-display-lg": ["64px", { lineHeight: "0.89", letterSpacing: "-1.408px" }],
  "v5-display": ["48px", { lineHeight: "normal", letterSpacing: "-1.056px" }],
  "v5-display-md": ["40px", { lineHeight: "normal", letterSpacing: "-0.88px" }],
  "v5-eyebrow": ["14px", { lineHeight: "1.35", letterSpacing: "-0.308px" }],
  // Vultisig/Headings/Title1 — Arena step-card titles
  "v5-title1": ["28px", { lineHeight: "34px", letterSpacing: "-0.64px" }],
  // Numbered step badge on the Arena cards
  "v5-step-badge": [
    "22.9px",
    { lineHeight: "1.35", letterSpacing: "-0.504px" },
  ],
  // Vultisig/Headings/Large Title — $VULT tier card names
  "v5-tier-title": ["34px", { lineHeight: "37px", letterSpacing: "-1px" }],
  // Oversized fee-reduction percentage on the tier cards
  "v5-tier-figure": ["96px", { lineHeight: "1.354", letterSpacing: "0" }],
  "v5-tier-figure-sm": ["64px", { lineHeight: "1.354", letterSpacing: "0" }],
  // $VULT token-stat figures (Satoshi optical tracking on the green strip)
  "v5-figure-lg": ["41px", { lineHeight: "1.15", letterSpacing: "-0.449px" }],
  "v5-figure-md": ["32px", { lineHeight: "1.35", letterSpacing: "-0.449px" }],
  "v5-figure-sm": ["24px", { lineHeight: "1.35", letterSpacing: "-0.449px" }],
  "v5-display-sm": ["32px", { lineHeight: "1.35", letterSpacing: "-0.704px" }],
  "v5-subtitle": ["20px", { lineHeight: "1.35", letterSpacing: "-0.44px" }],
  "v5-label": ["18px", { lineHeight: "1.35", letterSpacing: "-0.396px" }],
  "v5-link": ["16px", { lineHeight: "1.35", letterSpacing: "-0.352px" }],
  // Vultisig/Body/Body L (Medium) — downloads tab toggle
  "v5-body-l": ["18px", { lineHeight: "28px", letterSpacing: "-0.09px" }],
  // Downloads page title on mobile
  "v5-display-xs": ["30px", { lineHeight: "normal", letterSpacing: "-0.66px" }],
  // Download tile + SHA checksum tile labels
  "v5-download-label": ["28px", { lineHeight: "42px", letterSpacing: "-1px" }],
  "v5-download-label-sm": [
    "20px",
    { lineHeight: "42px", letterSpacing: "-1px" },
  ],
  "v5-download-heading": [
    "24px",
    { lineHeight: "37px", letterSpacing: "-1px" },
  ],
  // Articles — featured hero title
  "v5-headline-lg": ["36px", { lineHeight: "1.35", letterSpacing: "-0.792px" }],
  // Articles — "Related Articles" section title
  "v5-section-title": [
    "48px",
    { lineHeight: "1.35", letterSpacing: "-1.056px" },
  ],
  // Articles — h3 inside article prose
  "v5-prose-h3": ["24px", { lineHeight: "1.35", letterSpacing: "-0.528px" }],
  // Landing bento — iOS notification mock inside the "Secure notifications" card
  "v5-notification": [
    "10.24px",
    { lineHeight: "13.659px", letterSpacing: "-0.23px" },
  ],
  "v5-notification-time": [
    "8.88px",
    { lineHeight: "13.659px", letterSpacing: "0" },
  ],
} satisfies Record<string, FontSizeToken>

export const v5FontSizeNames = Object.keys(v5FontSize)
