import { fill, type ChainFamily } from "@/content/chain-families"
import type { Chain } from "@/content/chains"

export const SITE = "https://vultisig.com"

type Subject = Pick<Chain, "name" | "ticker">

/**
 * FAQPage lets the answers surface as rich results, and BreadcrumbList gives
 * search engines the Chains -> chain hierarchy. The family sits in the URL but
 * has no page, so it is not a breadcrumb step — every entry in the list has to
 * resolve to something. The same answers are in the markup — the accordion force-mounts them
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
