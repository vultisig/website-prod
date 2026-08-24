import { getAllArticles } from "@/lib/articles"
import { SITE_URL } from "@/lib/site"
import { absoluteUrl, escapeXml, xmlResponse } from "@/lib/sitemap"

// Always reflect the live article DB — never serve a build-time empty snapshot.
export const dynamic = "force-dynamic"

// Article URLs. Hero images are declared inline via the image sitemap
// extension, so this doubles as the image sitemap for editorial content.
export async function GET() {
  const articles = await getAllArticles()

  const urls = articles
    .map((article) => {
      const loc = `${SITE_URL}/articles/${article.slug}`
      const lastmod = article.updatedAt || article.publishedAt
      const image = article.image
        ? `
    <image:image>
      <image:loc>${escapeXml(absoluteUrl(article.image))}</image:loc>
      <image:title>${escapeXml(article.title)}</image:title>
    </image:image>`
        : ""

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>${image}
  </url>`
    })
    .join("\n")

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`

  return xmlResponse(body)
}
