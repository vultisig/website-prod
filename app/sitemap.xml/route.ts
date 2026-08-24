import { SITE_URL } from "@/lib/site"
import { xmlResponse } from "@/lib/sitemap"

export const revalidate = 3600

// Sitemap index. robots.txt points here; it fans out to the per-type sitemaps.
export async function GET() {
  const sitemaps = ["/sitemap-pages.xml", "/sitemap-posts.xml"]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (path) => `  <sitemap>
    <loc>${SITE_URL}${path}</loc>
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>`

  return xmlResponse(body)
}
