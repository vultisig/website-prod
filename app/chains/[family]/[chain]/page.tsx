import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  chainsInFamily,
  fill,
  getChainInFamily,
} from "@/content/chain-families"
import { CHAINS } from "@/content/chains"

import ChainPageBody from "../page-body"
import { familyJsonLd, SITE } from "../seo"

/** Only the 38 real pairs resolve; a chain under the wrong family is a 404. */
export const dynamicParams = false

export function generateStaticParams() {
  return CHAINS.map((chain) => ({ family: chain.family, chain: chain.slug }))
}

type PageProps = { params: Promise<{ family: string; chain: string }> }

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { family: familySlug, chain: chainSlug } = await params
  const found = getChainInFamily(familySlug, chainSlug)
  if (!found) return {}

  const { family, chain } = found
  const url = `${SITE}/chains/${family.slug}/${chain.slug}`
  const meta = family.chainMeta ?? family.meta
  const title = fill(meta.title, chain)
  const description = fill(meta.description, chain)

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
          alt: `Vultisig — ${chain.name}`,
        },
      ],
    },
    twitter: { card: "summary_large_image", title, description },
  }
}

export default async function ChainPage({ params }: PageProps) {
  const { family: familySlug, chain: chainSlug } = await params
  const found = getChainInFamily(familySlug, chainSlug)
  if (!found) notFound()

  const { family, chain } = found

  return (
    <main className="min-h-screen bg-v5-page px-4 pb-[112px] pt-[126px] md:px-[30px] md:pb-[30px] md:pt-[216px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            familyJsonLd({
              url: `${SITE}/chains/${family.slug}/${chain.slug}`,
              family,
              subject: chain,
              trail: [
                {
                  name: chain.name,
                  item: `${SITE}/chains/${family.slug}/${chain.slug}`,
                },
              ],
            }),
          ),
        }}
      />

      <ChainPageBody
        family={family}
        subject={chain}
        headline={chain.name}
        heroArt={`hero-${chain.slug}`}
        breadcrumb={{ label: chain.name }}
        chains={chainsInFamily(family)}
        currentSlug={chain.slug}
      />
    </main>
  )
}
