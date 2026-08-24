import type { Metadata } from "next"
import Link from "next/link"

import ArticlesExplorer from "@/components/articles/articles-explorer"
import { buildCategoryTabs, resolveCategory } from "@/lib/article-categories"
import { getAllArticles, toArticleSummary } from "@/lib/articles"
import { OPEN_GRAPH_DEFAULTS, SHARE_IMAGE, SITE_URL } from "@/lib/site"

// Make articles page dynamic - articles change frequently
export const dynamic = "force-dynamic"
export const revalidate = 0

const ARTICLES_URL = `${SITE_URL}/articles`
const collectionName = "Vultisig Articles"
const collectionDescription =
  "Latest articles, insights, and updates from Vultisig."

export const metadata: Metadata = {
  title: "Articles - Vultisig Blog",
  description: "Read the latest articles, insights, and updates from Vultisig.",
  alternates: {
    canonical: ARTICLES_URL,
    types: {
      "application/rss+xml": `${ARTICLES_URL}/feed.xml`,
    },
  },
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    title: collectionName,
    description: collectionDescription,
    url: ARTICLES_URL,
    images: [{ ...SHARE_IMAGE, alt: collectionName }],
  },
}

function CollectionPageJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collectionName,
    description: collectionDescription,
    url: ARTICLES_URL,
    isPartOf: {
      "@type": "WebSite",
      name: "Vultisig",
      url: SITE_URL,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function BreadcrumbJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: ARTICLES_URL,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function EmptyState() {
  return (
    <div className="py-16 text-center">
      <p className="mb-4 text-v5-subtitle text-v5-text-tertiary">
        No articles yet.
      </p>
      <Link href="/articles/admin" className="text-v5-cta underline">
        Create your first article
      </Link>
    </div>
  )
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const category = resolveCategory(params?.category)
  const rawQuery = Array.isArray(params?.q) ? params?.q[0] : params?.q

  const articles = await getAllArticles()
  // Summaries only — full bodies would otherwise ship in the client payload.
  // Every category goes down, so switching one filters in place and can fade.
  const summaries = articles.map(toArticleSummary)
  const tabs = buildCategoryTabs(summaries)

  return (
    <>
      <CollectionPageJsonLd />
      <BreadcrumbJsonLd />
      <main className="min-h-screen bg-v5-page px-4 pb-[112px] pt-[126px] md:px-[30px] md:pb-[30px] md:pt-[216px]">
        <div className="mx-auto flex max-w-v5-content flex-col gap-[30px]">
          <div className="flex flex-col gap-6 text-v5-text-inverse">
            <h1 className="text-v5-display-xs font-medium md:text-v5-hero">
              Vultisig Articles
            </h1>
            <p className="text-v5-body-m-relaxed md:text-v5-subtitle">
              Insights, updates, and deep dives into MPC wallets, security, and
              blockchain technology.
            </p>
          </div>

          {articles.length === 0 ? (
            <EmptyState />
          ) : (
            <ArticlesExplorer
              articles={summaries}
              tabs={tabs}
              initialCategory={category}
              initialQuery={rawQuery || ""}
            />
          )}
        </div>
      </main>
    </>
  )
}
