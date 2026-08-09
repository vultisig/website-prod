import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  chainsInFamily,
  CHAIN_FAMILIES,
  fill,
  getChainFamily,
} from "@/content/chain-families"

import { familyJsonLd, relatedArticles, SITE } from "./seo"
import ChainPageBody from "./page-body"

/** Articles are the only part of the page that changes without a deploy. */
export const revalidate = 3600

/** Only the four families resolve; anything else under /chains/ is a 404. */
export const dynamicParams = false

export function generateStaticParams() {
  return CHAIN_FAMILIES.map((family) => ({ family: family.slug }))
}

type PageProps = { params: Promise<{ family: string }> }

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const family = getChainFamily((await params).family)
  if (!family) return {}
  const subject = { name: family.chainLabel, ticker: family.asset }
  const url = `${SITE}/chains/${family.slug}`
  const title = fill(family.meta.title, subject)
  const description = fill(family.meta.description, subject)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: `${SITE}/thumbnails/home.png`,
          width: 1200,
          height: 630,
          alt: `Vultisig — ${family.name}`,
        },
      ],
    },
    twitter: { card: "summary_large_image", title, description },
  }
}

export default async function ChainFamilyPage({ params }: PageProps) {
  const family = getChainFamily((await params).family)
  if (!family) notFound()

  const chains = chainsInFamily(family)
  const subject = { name: family.chainLabel, ticker: family.asset }
  const articles = await relatedArticles(family.articleTerms)

  return (
    <main className="min-h-screen bg-v5-page px-4 pb-[112px] pt-[126px] md:px-[30px] md:pb-[30px] md:pt-[216px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            familyJsonLd({
              url: `${SITE}/chains/${family.slug}`,
              family,
              subject,
              trail: [
                { name: family.name, item: `${SITE}/chains/${family.slug}` },
              ],
            }),
          ),
        }}
      />

      <ChainPageBody
        family={family}
        subject={subject}
        headline={family.name}
        heroArt={family.heroArt}
        breadcrumb={{ label: family.name }}
        chains={chains}
        articles={articles}
      />
    </main>
  )
}
