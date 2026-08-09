import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import FaqSection from "@/components/ui/faq-section"
import {
  chainsInFamily,
  CHAIN_FAMILIES,
  FAMILY_ACTIONS,
  getChainFamily,
  type ChainFamily,
} from "@/content/chain-families"
import { getAllArticles, type Article } from "@/lib/articles"

import {
  BuyIcon,
  FunctionIcon,
  ReceiveIcon,
  SendIcon,
  SwapIcon,
} from "../components/action-icons"

const SITE = "https://vultisig.com"

/** Articles are the only part of the page that changes without a deploy. */
export const revalidate = 3600

/** Only the three families resolve; anything else under /chains/ is a 404. */
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

  const url = `${SITE}/chains/${family.slug}`
  return {
    title: family.meta.title,
    description: family.meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: family.meta.title,
      description: family.meta.description,
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
    twitter: {
      card: "summary_large_image",
      title: family.meta.title,
      description: family.meta.description,
    },
  }
}

const ACTION_ICONS = [SwapIcon, SendIcon, BuyIcon, FunctionIcon, ReceiveIcon]

/** Outer panel shared by the three lower sections. */
const PANEL = "rounded-[20px] px-5 py-10 md:rounded-v5-panel md:p-[60px]"

/**
 * Pulls the closing rail from the blog rather than a hand-kept list, so the
 * links stay alive as articles are published. `getAllArticles` returns an empty
 * array when the database is unreachable, which drops the section rather than
 * failing the build.
 */
async function relatedArticles(family: ChainFamily): Promise<Article[]> {
  const all = await getAllArticles()
  const scored = all
    .map((article) => {
      const haystack =
        `${article.title} ${article.description} ${(article.tags ?? []).join(" ")}`.toLowerCase()
      const hits = family.articleTerms.filter((term) =>
        haystack.includes(term),
      ).length
      return { article, hits }
    })
    .filter(({ hits }) => hits > 0)
    .sort((a, b) => b.hits - a.hits)
  return scored.slice(0, 3).map(({ article }) => article)
}

export default async function ChainFamilyPage({ params }: PageProps) {
  const family = getChainFamily((await params).family)
  if (!family) notFound()

  const chains = chainsInFamily(family)
  const articles = await relatedArticles(family)
  const url = `${SITE}/chains/${family.slug}`

  /**
   * FAQPage lets the answers surface as rich results, and BreadcrumbList gives
   * search engines the Chains -> family hierarchy the URL already implies. The
   * same answers are in the markup — the accordion force-mounts them — so this
   * describes visible content rather than adding hidden text.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: family.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
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
          { "@type": "ListItem", position: 3, name: family.name, item: url },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen bg-v5-page px-4 pb-[112px] pt-[126px] md:px-[30px] md:pb-[30px] md:pt-[216px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto flex max-w-v5-content flex-col gap-[30px]">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-v5-body-s text-v5-text-tertiary">
            <li>
              <Link href="/chains" className="hover:text-v5-text-inverse">
                Chains
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-v5-text-inverse">{family.name}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="flex flex-col gap-[30px] lg:flex-row lg:items-center">
          <div className="flex flex-col gap-6 lg:w-[696px] lg:shrink-0">
            <h1 className="text-v5-hero-sm font-medium text-v5-text-inverse md:text-v5-hero">
              {family.hero.title}
            </h1>
            <p className="text-v5-subtitle font-normal text-v5-text-inverse lg:w-[577px]">
              {family.hero.body}
            </p>
            <Link
              href="/downloads"
              className="flex h-[50px] w-fit items-center rounded-xl bg-v5-cta px-4 text-v5-button font-medium text-v5-text-primary transition-opacity hover:opacity-90"
            >
              {family.hero.cta}
            </Link>
          </div>

          {/*
            The device and coins overhang the tinted card below them, which is
            why the group exports taller than the 400px card and is not clipped
            to it. `priority` because it is the LCP element on all three pages.
          */}
          <Image
            src={`/v5/chains/${family.heroArt}.webp`}
            alt={`The Vultisig vault open on ${family.chainLabel}, with its balance and actions`}
            width={1308}
            height={1036}
            priority
            className="w-full lg:w-[654px] lg:shrink-0"
          />
        </section>

        {/* One vault view */}
        <section
          className={`${PANEL} flex flex-col gap-10 bg-v5-white md:gap-[50px]`}
        >
          <div className="flex flex-col gap-3.5 text-center">
            <h2 className="text-v5-display-sm font-medium text-v5-text-inverse md:text-v5-display">
              {family.vaultView.title}
            </h2>
            <p className="mx-auto max-w-[772px] text-v5-subtitle font-normal text-v5-text-inverse">
              {family.vaultView.body}
            </p>
          </div>

          <div className="flex flex-col gap-[30px] lg:flex-row lg:gap-[50px]">
            <div className="overflow-hidden rounded-v5-panel bg-v5-accent lg:w-[605px] lg:shrink-0">
              <Image
                src="/v5/chains-vault-view.webp"
                alt={`The Vultisig vault view showing ${family.name} balances alongside every other asset`}
                width={1308}
                height={1271}
                className="size-full object-cover"
              />
            </div>

            <ul className="flex flex-1 flex-col gap-[30px]">
              {family.vaultView.features.map((feature) => (
                <li
                  key={feature.title}
                  className="flex flex-1 flex-col justify-center gap-3.5 rounded-[20px] bg-v5-page p-5"
                >
                  <Image
                    src={`/v5/chains/${feature.icon}.svg`}
                    alt=""
                    width={42}
                    height={42}
                    className="size-[42px] max-w-none object-contain"
                  />
                  <h3 className="text-v5-prose-h3 font-semibold text-v5-text-inverse">
                    {feature.title}
                  </h3>
                  <p className="text-v5-body-m font-normal text-v5-text-inverse">
                    {feature.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Every action, one vault */}
        <section
          className={`${PANEL} flex flex-col gap-10 bg-v5-white md:gap-[50px]`}
        >
          <h2 className="text-center text-v5-display-sm font-semibold text-v5-text-inverse md:text-v5-display">
            Every action, one vault
          </h2>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {FAMILY_ACTIONS.map((action, index) => {
              const Icon = ACTION_ICONS[index]
              return (
                <li
                  key={action.label}
                  className="flex flex-col gap-3 rounded-[20px] bg-v5-page p-6"
                >
                  <span className="flex size-[49px] items-center justify-center rounded-[15px] bg-v5-white text-v5-text-inverse">
                    <Icon aria-hidden className="size-[19px]" />
                  </span>
                  <h3 className="text-v5-prose-h3 font-semibold text-v5-text-inverse">
                    {action.label}
                  </h3>
                  <p className="text-v5-body-l-relaxed font-normal text-v5-text-inverse">
                    {action.body.replace("{asset}", family.asset)}
                  </p>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      {/* FAQ — force-mounted answers keep every one in the server HTML */}
      <FaqSection
        className="bg-transparent px-0 py-[30px] md:px-0"
        panelClassName={`${PANEL} bg-v5-success`}
        aside={
          <h2 className="text-v5-display-sm font-medium text-v5-text-inverse v5wide:w-[476px] v5wide:shrink-0 v5wide:text-v5-faq-title">
            {family.faq.title}
          </h2>
        }
        items={family.faq.items}
      />

      {articles.length > 0 && (
        <div className="mx-auto max-w-v5-content">
          <section
            className={`${PANEL} flex flex-col gap-10 bg-v5-accent md:gap-[50px]`}
          >
            <h2 className="text-v5-display-sm font-medium text-v5-text-inverse md:text-v5-display">
              More on {family.chainLabel} and Vultisig
            </h2>
            <ul className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="flex h-full flex-col overflow-hidden rounded-3xl bg-v5-white transition-opacity hover:opacity-90"
                  >
                    {article.image && (
                      <Image
                        src={article.image}
                        alt=""
                        width={440}
                        height={242}
                        className="h-[242px] w-full object-cover"
                      />
                    )}
                    <span className="flex flex-1 flex-col gap-3.5 p-5">
                      <span className="text-v5-title2 font-medium text-v5-text-inverse">
                        {article.title}
                      </span>
                      <span className="line-clamp-3 text-v5-body-s text-v5-text-inverse/70">
                        {article.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </main>
  )
}
