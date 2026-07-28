import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import ArticleToc from "@/components/articles/article-toc"
import MarkdownRenderer from "@/components/markdown-renderer"
import RelatedArticles from "@/components/related-articles"
import { pickRelatedArticles } from "@/lib/article-categories"
import { formatArticleDate } from "@/lib/article-format"
import { extractHeadings } from "@/lib/article-toc"
import {
  getAllArticles,
  getArticleBySlug,
  toMetaDescription,
} from "@/lib/articles"

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

// Disable static generation - articles are dynamic and change frequently
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function generateStaticParams() {
  // Return empty array to disable static generation
  // Articles will be fetched dynamically at request time
  return []
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: "Article Not Found" }

  const url = `https://vultisig.com/articles/${slug}`
  // Ensure image URLs are absolute for OpenGraph
  const imageUrl = article.image
    ? article.image.startsWith("http")
      ? article.image
      : `https://vultisig.com${article.image}`
    : undefined

  const metaDescription = toMetaDescription(article.description)

  return {
    title: `${article.title} - Vultisig`,
    description: metaDescription,
    robots:
      article.status === "draft" ? { index: false, follow: false } : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: metaDescription,
      url,
      images: imageUrl ? [imageUrl] : [],
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: metaDescription,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

function ArticleJsonLd({
  article,
  slug,
}: {
  article: NonNullable<Awaited<ReturnType<typeof getArticleBySlug>>>
  slug: string
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: toMetaDescription(article.description),
    image: article.image
      ? article.image.startsWith("http")
        ? article.image
        : `https://vultisig.com${article.image}`
      : "https://vultisig.com/og-image.png",
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Organization",
      name: article.author,
      url: "https://vultisig.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Vultisig",
      logo: {
        "@type": "ImageObject",
        url: "https://vultisig.com/vultisig-logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://vultisig.com/articles/${slug}`,
    },
    keywords: article.tags?.join(", "),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function BreadcrumbJsonLd({
  article,
  slug,
}: {
  article: NonNullable<Awaited<ReturnType<typeof getArticleBySlug>>>
  slug: string
}) {
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
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://vultisig.com/articles/${slug}`,
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

const BREADCRUMB_TITLE_MAX = 40

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const headings = extractHeadings(article.content)
  const related = pickRelatedArticles(await getAllArticles(), article, 3)

  const shortTitle =
    article.title.length > BREADCRUMB_TITLE_MAX
      ? `${article.title.slice(0, BREADCRUMB_TITLE_MAX)}...`
      : article.title

  return (
    <>
      <ArticleJsonLd article={article} slug={slug} />
      <BreadcrumbJsonLd article={article} slug={slug} />

      <main className="min-h-screen bg-v5-page px-4 pb-[112px] pt-[110px] md:px-[30px] md:pb-[30px] md:pt-[134px]">
        <div className="mx-auto max-w-v5-content">
          {article.status === "draft" && (
            <div className="mb-8 rounded-xl border border-v5-warning bg-v5-warning/20 p-4 text-center text-v5-body-m font-medium text-v5-text-inverse">
              You are viewing an unlisted draft. This page is not visible on the
              main articles list.
            </div>
          )}

          <div className="flex flex-col gap-[30px] lg:flex-row lg:gap-[84px]">
            <div className="flex flex-col gap-[30px] lg:w-[938px]">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-1.5 text-v5-card-body text-v5-text-inverse">
                  <li>
                    <Link href="/" className="underline hover:text-v5-cta">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li>
                    <Link
                      href="/articles"
                      className="underline hover:text-v5-cta"
                    >
                      Articles
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li className="font-medium">{shortTitle}</li>
                </ol>
              </nav>

              {article.image && (
                <div className="relative aspect-[1200/675] w-full overflow-hidden rounded-[20px] bg-v5-panel">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 938px"
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <h1 className="text-v5-display-xs font-semibold text-v5-text-inverse md:text-v5-hero">
                {article.title}
              </h1>

              <p className="text-v5-body-m-relaxed font-medium text-v5-text-tertiary md:text-v5-subtitle">
                <span>By {article.author}</span>
                {"  •  "}
                <time dateTime={article.publishedAt}>
                  {formatArticleDate(article.publishedAt)}
                </time>
                {article.updatedAt && (
                  <>
                    {"  •  "}
                    <span>Updated {formatArticleDate(article.updatedAt)}</span>
                  </>
                )}
              </p>

              <ArticleToc headings={headings} variant="inline" />

              <MarkdownRenderer
                content={article.content}
                currentPath={`/articles/${article.slug}`}
              />
            </div>

            <div className="lg:w-[358px] lg:shrink-0">
              <ArticleToc headings={headings} variant="sidebar" />
            </div>
          </div>

          <RelatedArticles articles={related} />
        </div>
      </main>
    </>
  )
}
