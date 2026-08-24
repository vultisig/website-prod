import { getAllArticles } from '@/lib/articles'
import { SITE_URL } from '@/lib/site'

export async function GET() {
  const articles = await getAllArticles()

  const rssItems = articles
    .map(article => {
      const url = `${SITE_URL}/articles/${article.slug}`
      const pubDate = new Date(article.publishedAt).toUTCString()

      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${article.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>marketing@vultisig.com (${article.author})</author>
      ${article.tags?.map(tag => `<category>${tag}</category>`).join('\n      ') || ''}
    </item>`
    })
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Vultisig Articles</title>
    <link>${SITE_URL}/articles</link>
    <description>Insights, updates, and deep dives into MPC wallets, security, and blockchain technology from Vultisig.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/articles/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/logo.svg</url>
      <title>Vultisig Articles</title>
      <link>${SITE_URL}/articles</link>
    </image>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
