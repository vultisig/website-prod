"use client"

import { useState, type ReactNode } from "react"
import { Search } from "lucide-react"

import ArticleCard from "@/components/article-card"
import type { CategorySlug } from "@/lib/article-categories"
import type { ArticleSummary } from "@/lib/articles"

type ArticleSearchGridProps = {
  articles: ArticleSummary[]
  category: CategorySlug
  initialQuery: string
  /** Server-rendered category pills — they share the row with the search box. */
  tabs: ReactNode
}

function matches(article: ArticleSummary, query: string): boolean {
  const haystack = `${article.title} ${article.description}`.toLowerCase()
  return haystack.includes(query)
}

/**
 * The <form> keeps search working without JS (GET ?q=… re-renders on the
 * server); the state below turns the same input into a live filter when it does.
 */
export default function ArticleSearchGrid({
  articles,
  category,
  initialQuery,
  tabs,
}: ArticleSearchGridProps) {
  const [query, setQuery] = useState(initialQuery)

  const trimmed = query.trim().toLowerCase()
  const visible = trimmed
    ? articles.filter((article) => matches(article, trimmed))
    : articles

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
        {tabs}
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
    </>
  )
}
