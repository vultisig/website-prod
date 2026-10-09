import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  chainCopy,
  chainsInFamily,
  fill,
  getChainInFamily,
} from "@/content/chain-families"
import { CHAINS } from "@/content/chains"
import { OPEN_GRAPH_DEFAULTS, SHARE_IMAGE, SITE_URL } from "@/lib/site"

import ChainPageBody from "../page-body"
import { familyJsonLd } from "../seo"

/** Only real family/chain pairs resolve; a chain under the wrong family is a 404. */
export const dynamicParams = false

export function generateStaticParams() {
  return CHAINS.map((chain) => ({ family: chain.family, chain: chain.slug }))
}

type PageProps = { params: Promise<{ family: string; chain: string }> }

function chainUrl(familySlug: string, chainSlug: string): string {
  return `${SITE_URL}/chains/${familySlug}/${chainSlug}`
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { family: familySlug, chain: chainSlug } = await params
  const found = getChainInFamily(familySlug, chainSlug)
  if (!found) return {}

  const { family, chain } = found
  const url = chainUrl(family.slug, chain.slug)
  const { meta } = chainCopy(family, chain)
  const title = fill(meta.title, chain)
  const description = fill(meta.description, chain)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...OPEN_GRAPH_DEFAULTS,
      title,
      description,
      url,
      images: [{ ...SHARE_IMAGE, alt: `Vultisig — ${chain.name}` }],
    },
  }
}

export default async function ChainPage({ params }: PageProps) {
  const { family: familySlug, chain: chainSlug } = await params
  const found = getChainInFamily(familySlug, chainSlug)
  if (!found) notFound()

  const { family, chain } = found
  const url = chainUrl(family.slug, chain.slug)
  const copy = chainCopy(family, chain)
  const jsonLd = familyJsonLd({
    url,
    faq: copy.faq.items,
    subject: chain,
    trail: [{ name: chain.name, item: url }],
  })

  return (
    <main className="min-h-screen bg-v5-page px-4 pb-[112px] pt-[126px] md:px-[30px] md:pb-[30px] md:pt-[216px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ChainPageBody
        family={family}
        subject={chain}
        copy={copy}
        headline={chain.name}
        heroArt={`hero-${chain.slug}`}
        vaultArt={`vault-view-${chain.slug}`}
        breadcrumb={{ label: chain.name }}
        chains={chainsInFamily(family)}
        currentSlug={chain.slug}
      />
    </main>
  )
}
