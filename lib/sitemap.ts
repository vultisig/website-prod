// Shared helpers for the split sitemap (index + pages + posts).
// Only indexable HTML routes belong here — non-HTML assets such as llms.txt,
// llms-full.txt and SKILL.md are intentionally excluded from the sitemap.

export const SITE_URL = "https://vultisig.com"

export interface StaticPage {
  path: string
  changefreq: "daily" | "weekly" | "monthly" | "yearly"
  priority: number
}

export const STATIC_PAGES: StaticPage[] = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/articles", changefreq: "daily", priority: 0.9 },
  { path: "/downloads", changefreq: "monthly", priority: 0.9 },
  { path: "/mpc", changefreq: "monthly", priority: 0.8 },
  { path: "/how-it-works", changefreq: "monthly", priority: 0.8 },
  { path: "/chains", changefreq: "monthly", priority: 0.8 },
  { path: "/docs", changefreq: "monthly", priority: 0.8 },
  { path: "/vult", changefreq: "weekly", priority: 0.8 },
  { path: "/agent/for-agents", changefreq: "monthly", priority: 0.8 },
  { path: "/agent/for-builders", changefreq: "monthly", priority: 0.8 },
  { path: "/backed-by", changefreq: "monthly", priority: 0.7 },
  { path: "/support", changefreq: "monthly", priority: 0.7 },
  { path: "/privacy", changefreq: "yearly", priority: 0.5 },
  { path: "/termofservice", changefreq: "yearly", priority: 0.5 },
]

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http")) return pathOrUrl
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`
}

export function xmlResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
