import type { Metadata } from "next"
import Link from "next/link"

import ArticleSearchGrid from "@/components/articles/article-search-grid"
import CategoryTabs from "@/components/articles/category-tabs"
import FeaturedArticle from "@/components/articles/featured-article"
import {
  buildCategoryTabs,
  filterByCategory,
  resolveCategory,
} from "@/lib/article-categories"
import { getAllArticles, type Article } from "@/lib/articles"

// Make articles page dynamic - articles change frequently
export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Articles - Vultisig Blog",
  description: "Read the latest articles, insights, and updates from Vultisig.",
  alternates: {
    canonical: "https://vultisig.com/articles",
    types: {
      "application/rss+xml": "https://vultisig.com/articles/feed.xml",
    },
  },
  openGraph: {
    title: "Vultisig Articles",
    description: "Latest articles, insights, and updates from Vultisig.",
    url: "https://vultisig.com/articles",
    type: "website",
    images: [
      {
        url: "https://vultisig.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vultisig Articles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vultisig Articles",
    description: "Latest articles, insights, and updates from Vultisig.",
    images: ["https://vultisig.com/og-image.png"],
  },
}

function CollectionPageJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Vultisig Articles",
    description: "Latest articles, insights, and updates from Vultisig.",
    url: "https://vultisig.com/articles",
    isPartOf: {
      "@type": "WebSite",
      name: "Vultisig",
      url: "https://vultisig.com",
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
        item: "https://vultisig.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: "https://vultisig.com/articles",
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

/** The promoted article: an explicit `featured` flag, else the most recent. */
function pickFeatured(articles: Article[]): Article | undefined {
  return articles.find((article) => article.featured) || articles[0]
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
  const tabs = buildCategoryTabs(articles)
  const inCategory = filterByCategory(articles, category)
  const featured = pickFeatured(inCategory)
  const rest = inCategory.filter((article) => article.slug !== featured?.slug)

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
            <>
              {featured && <FeaturedArticle article={featured} />}
              <ArticleSearchGrid
                articles={rest}
                category={category}
                initialQuery={rawQuery || ""}
                tabs={<CategoryTabs tabs={tabs} active={category} />}
              />
            </>
          )}
        </div>
      </main>
    </>
  )
}
