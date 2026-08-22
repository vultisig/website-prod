import type { Article, ArticleSummary } from "@/lib/articles"

/**
 * Articles carry no category field — only free-form `tags` plus the title.
 * These rules map both onto the four buckets the design ships, in order:
 * the first rule that matches wins, everything left over is an explainer.
 */
export const ARTICLE_CATEGORIES = [
  { slug: "all", label: "All" },
  { slug: "updates", label: "Updates" },
  { slug: "vultisig-vs", label: "Vultisig Vs." },
  { slug: "explainers", label: "Explainers" },
  { slug: "security", label: "Security & Deep Dives" },
] as const

export type CategorySlug = (typeof ARTICLE_CATEGORIES)[number]["slug"]

type CategoryRule = {
  slug: Exclude<CategorySlug, "all" | "explainers">
  title: RegExp
  tags: string[]
}

const RULES: CategoryRule[] = [
  {
    slug: "updates",
    title: /\b(weekly|community|monthly)\s+update\b/i,
    tags: ["update", "updates", "announcement", "release"],
  },
  {
    slug: "vultisig-vs",
    title: /\bvs\.?\b/i,
    tags: ["comparison", "wallet comparison"],
  },
  {
    slug: "security",
    title: /\b(hacked|exploit|breach)\b/i,
    tags: ["security", "crypto hacks", "audit", "audits"],
  },
]

const DEFAULT_SLUG: CategorySlug = "explainers"

export function categoryOf(article: ArticleSummary): CategorySlug {
  const tags = (article.tags || []).map((tag) => tag.toLowerCase())
  const rule = RULES.find(
    (r) => r.title.test(article.title) || r.tags.some((t) => tags.includes(t)),
  )
  return rule ? rule.slug : DEFAULT_SLUG
}

export function resolveCategory(raw?: string | string[]): CategorySlug {
  const value = Array.isArray(raw) ? raw[0] : raw
  const match = ARTICLE_CATEGORIES.find((c) => c.slug === value)
  return match ? match.slug : "all"
}

export type CategoryTab = {
  slug: CategorySlug
  label: string
  count: number
  href: string
}

export function buildCategoryTabs(articles: ArticleSummary[]): CategoryTab[] {
  const counts = new Map<CategorySlug, number>()
  for (const article of articles) {
    const slug = categoryOf(article)
    counts.set(slug, (counts.get(slug) || 0) + 1)
  }

  return ARTICLE_CATEGORIES.map(({ slug, label }) => ({
    slug,
    label,
    count: slug === "all" ? articles.length : counts.get(slug) || 0,
    href: slug === "all" ? "/articles" : `/articles?category=${slug}`,
  }))
}

export function filterByCategory<T extends ArticleSummary>(
  articles: T[],
  category: CategorySlug,
): T[] {
  if (category === "all") return articles
  return articles.filter((article) => categoryOf(article) === category)
}

/**
 * Same category first, then shared tags. `articles` arrives newest-first and
 * Array.sort is stable, so ties fall back to recency.
 */
export function pickRelatedArticles(
  articles: Article[],
  current: Article,
  limit = 3,
): Article[] {
  const category = categoryOf(current)
  const tags = new Set((current.tags || []).map((tag) => tag.toLowerCase()))

  return articles
    .filter((article) => article.slug !== current.slug)
    .map((article) => ({
      article,
      score:
        (categoryOf(article) === category ? 10 : 0) +
        (article.tags || []).filter((tag) => tags.has(tag.toLowerCase()))
          .length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.article)
}
