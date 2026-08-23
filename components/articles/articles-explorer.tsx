"use client"

import { useEffect, useMemo, useState } from "react"
import { Search } from "lucide-react"

import ArticleCard from "@/components/article-card"
import CategoryTabs from "@/components/articles/category-tabs"
import FeaturedArticle from "@/components/articles/featured-article"
import {
  filterByCategory,
  resolveCategory,
  type CategorySlug,
  type CategoryTab,
} from "@/lib/article-categories"
import type { ArticleSummary } from "@/lib/articles"

/** Kept in step with the v5-fade-out animation in tailwind.config.ts. */
const FADE_OUT_MS = 220

/** No animation in the `rest` state, so the first paint doesn't fade in. */
const FADE =
  "data-[state=in]:animate-v5-fade-in data-[state=out]:animate-v5-fade-out motion-reduce:!animate-none"

/** The promoted article: an explicit `featured` flag, else the most recent. */
function pickFeatured(articles: ArticleSummary[]): ArticleSummary | undefined {
  return articles.find((article) => article.featured) || articles[0]
}

function matches(article: ArticleSummary, query: string): boolean {
  const haystack = `${article.title} ${article.description}`.toLowerCase()
  return haystack.includes(query)
}

type ArticlesExplorerProps = {
  /** Every published article, so a category switch never needs the server. */
  articles: ArticleSummary[]
  tabs: CategoryTab[]
  initialCategory: CategorySlug
  initialQuery: string
}

/**
 * Owns the category so switching can fade the old set out and the new one in,
 * the way the chains explorer and the downloads tabs do, rather than swapping
 * on a server round trip.
 *
 * Only the category cross-fades. A pill is one deliberate switch between two
 * whole sets, which is worth a beat; the search field narrows the same set on
 * every keystroke, so fading it would strobe.
 */
export default function ArticlesExplorer({
  articles,
  tabs,
  initialCategory,
  initialQuery,
}: ArticlesExplorerProps) {
  // `category` flips on click so the pill reacts at once; `shown` trails it by
  // one fade, and `entering` is what keeps the first paint animation-free.
  const [category, setCategory] = useState(initialCategory)
  const [shown, setShown] = useState(initialCategory)
  const [entering, setEntering] = useState(false)
  const [query, setQuery] = useState(initialQuery)

  // Each switch pushes a history entry, so Back has to walk the categories too.
  useEffect(() => {
    const onPopState = () =>
      setCategory(
        resolveCategory(
          new URLSearchParams(window.location.search).get("category") ??
            undefined,
        ),
      )

    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  useEffect(() => {
    if (category === shown) return

    const swap = () => {
      setShown(category)
      setEntering(true)
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      swap()
      return
    }

    const timer = window.setTimeout(swap, FADE_OUT_MS)
    return () => window.clearTimeout(timer)
  }, [category, shown])

  // The featured slot is picked before the search runs: a query narrows the
  // grid under it rather than promoting a different article on every keystroke.
  const { featured, visible, total } = useMemo(() => {
    const inCategory = filterByCategory(articles, shown)
    const promoted = pickFeatured(inCategory)
    const rest = inCategory.filter((article) => article.slug !== promoted?.slug)
    const q = query.trim().toLowerCase()

    return {
      featured: promoted,
      visible: q ? rest.filter((article) => matches(article, q)) : rest,
      total: rest.length,
    }
  }, [articles, shown, query])

  const state = category === shown ? (entering ? "in" : "rest") : "out"

  const select = (slug: CategorySlug, href: string) => {
    setCategory(slug)
    // Native history keeps the URL shareable without re-rendering the page.
    window.history.pushState(null, "", href)
  }

  return (
    <>
      {featured && (
        <div data-state={state} className={FADE}>
          <FeaturedArticle article={featured} />
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <CategoryTabs tabs={tabs} active={category} onSelect={select} />

        {/*
          The <form> keeps search working without JS (GET ?q=… re-renders on
          the server); the state above turns the same input into a live filter
          when it does.
        */}
        <form
          action="/articles"
          method="get"
          role="search"
          className="flex w-full shrink-0 items-center gap-2.5 rounded-[20px] border border-v5-text-secondary bg-v5-white py-2.5 pl-4 pr-4 md:w-[509px] md:pr-[60px]"
        >
          {category !== "all" && (
            <input type="hidden" name="category" value={category} />
          )}
          <Search
            className="size-6 shrink-0 text-v5-text-tertiary"
            aria-hidden
          />
          <label className="sr-only" htmlFor="article-search">
            Search all articles
          </label>
          <input
            id="article-search"
            type="search"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search all articles"
            className="w-full bg-transparent text-v5-card-body text-v5-text-inverse outline-none placeholder:text-v5-text-tertiary"
          />
        </form>
      </div>

      {/* A pill no longer navigates, so the result count is announced instead. */}
      <p aria-live="polite" className="sr-only">
        {visible.length} of {total} articles shown
      </p>

      {/* Grid and empty state share one fading wrapper so a pill that empties
          the grid still hands over on the same beat. */}
      <div data-state={state} className={FADE}>
        {visible.length === 0 ? (
          <p className="py-16 text-center text-v5-subtitle text-v5-text-tertiary">
            No articles match your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
            {visible.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
