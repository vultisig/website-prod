import { SITE_URL } from "@/lib/site"
import { STATIC_PAGES, xmlResponse } from "@/lib/sitemap"

export const revalidate = 3600

// Static, indexable HTML pages only. No lastmod: an always-"now" timestamp teaches crawlers to ignore it.
export async function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC_PAGES.map(
  (page) => `  <url>
    <loc>${SITE_URL}${page.path === "/" ? "" : page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`,
).join("\n")}
</urlset>`

  return xmlResponse(body)
}
