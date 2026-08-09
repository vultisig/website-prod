import { fill, type ChainFamily } from "@/content/chain-families"
import type { Chain } from "@/content/chains"
import { getAllArticles, type Article } from "@/lib/articles"

export const SITE = "https://vultisig.com"

type Subject = Pick<Chain, "name" | "ticker">

/**
 * Pulls the closing rail from the blog rather than a hand-kept list, so the
 * links stay alive as articles are published. `getAllArticles` returns an empty
 * array when the database is unreachable, which drops the section rather than
 * failing the build.
 */
export async function relatedArticles(terms: string[]): Promise<Article[]> {
  const all = await getAllArticles()
  return all
    .map((article) => {
      const haystack =
        `${article.title} ${article.description} ${(article.tags ?? []).join(" ")}`.toLowerCase()
      return {
        article,
        hits: terms.filter((term) => haystack.includes(term)).length,
      }
    })
    .filter(({ hits }) => hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, 3)
    .map(({ article }) => article)
}

/**
 * FAQPage lets the answers surface as rich results, and BreadcrumbList gives
 * search engines the Chains -> family -> chain hierarchy the URL already
 * implies. The same answers are in the markup — the accordion force-mounts them
 * — so this describes visible content rather than adding hidden text.
 */
export function familyJsonLd({
  url,
  family,
  subject,
  trail,
}: {
  url: string
  family: ChainFamily
  subject: Subject
  trail: { name: string; item: string }[]
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: family.faq.items.map((item) => ({
          "@type": "Question",
          name: fill(item.question, subject),
          acceptedAnswer: {
            "@type": "Answer",
            text: fill(item.answer, subject),
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          {
            "@type": "ListItem",
            position: 2,
            name: "Chains",
            item: `${SITE}/chains`,
          },
          ...trail.map((step, index) => ({
            "@type": "ListItem",
            position: 3 + index,
            name: step.name,
            item: step.item,
          })),
        ],
      },
    ],
  }
}
