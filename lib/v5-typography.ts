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
  "v5-hero": ["60px", { lineHeight: "72px", letterSpacing: "-1.5px" }],
  "v5-hero-sm": ["46px", { lineHeight: "51px", letterSpacing: "-1px" }],
  "v5-stat": ["45px", { lineHeight: "1.2", letterSpacing: "0" }],
  "v5-stat-sm": ["31px", { lineHeight: "1.2", letterSpacing: "0" }],
  "v5-display-lg": ["64px", { lineHeight: "0.89", letterSpacing: "-1.408px" }],
  "v5-display": ["48px", { lineHeight: "normal", letterSpacing: "-1.056px" }],
  "v5-display-sm": ["32px", { lineHeight: "1.35", letterSpacing: "-0.704px" }],
  "v5-subtitle": ["20px", { lineHeight: "1.35", letterSpacing: "-0.44px" }],
  "v5-label": ["18px", { lineHeight: "1.35", letterSpacing: "-0.396px" }],
  "v5-link": ["16px", { lineHeight: "1.35", letterSpacing: "-0.352px" }],
} satisfies Record<string, FontSizeToken>

export const v5FontSizeNames = Object.keys(v5FontSize)
