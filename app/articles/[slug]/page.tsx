import { getArticleBySlug, getAllArticles, toMetaDescription } from "@/lib/articles"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import MarkdownRenderer from "@/components/markdown-renderer"

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
    robots: article.status === 'draft' ? { index: false, follow: false } : undefined,
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

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  return (
    <>
      <ArticleJsonLd article={article} slug={slug} />
      <BreadcrumbJsonLd article={article} slug={slug} />

      <main className="min-h-screen py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {article.status === 'draft' && (
            <div className="mb-8 p-4 bg-yellow-900/30 border border-yellow-700/50 rounded-xl text-yellow-200 text-center font-medium">
              ⚠️ You are viewing an unlisted draft. This page is not visible on the main articles list.
            </div>
          )}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/articles"
                  className="hover:text-white transition-colors"
                >
                  Articles
                </Link>
              </li>
              <li>/</li>
              <li className="text-white truncate max-w-[200px]">
                {article.title}
              </li>
            </ol>
          </nav>

          <article className="bg-backgroundSecondary border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 md:p-12">
            {article.image && (
              <div className="aspect-video bg-slate-700 rounded-xl mb-8 overflow-hidden relative">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-sm px-3 py-1 bg-blue-900/40 text-blue-300 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-gray-400 text-sm mb-8 pb-8 border-b border-slate-700">
              <span>By {article.author}</span>
              <span>•</span>
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
              {article.updatedAt && (
                <>
                  <span>•</span>
                  <span>Updated {formatDate(article.updatedAt)}</span>
                </>
              )}
            </div>

            <MarkdownRenderer content={article.content} />
          </article>

          <div className="mt-8 text-center">
            <Link
              href="/articles"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Back to Articles
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
