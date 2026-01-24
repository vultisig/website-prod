"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Article {
  title: string
  description: string
  date: string
  image: string
  link: string
  isInternal?: boolean
}

interface MediumRSSItem {
  title: string
  description: string
  pubDate: string
  thumbnail?: string
  link: string
}

interface InternalArticle {
  slug: string
  title: string
  description: string
  publishedAt: string
  image?: string
}

export default function MediumSection() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState<"internal" | "medium">("medium")

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)

        const internalRes = await fetch("/api/articles")
        if (internalRes.ok) {
          const internalData = await internalRes.json()
          if (internalData.articles?.length > 0) {
            const formatted: Article[] = internalData.articles
              .slice(0, 3)
              .map((a: InternalArticle) => ({
                title: a.title,
                description:
                  a.description.length > 150
                    ? a.description.substring(0, 150) + "..."
                    : a.description,
                date: new Date(a.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
                image: a.image || "",
                link: `/articles/${a.slug}`,
                isInternal: true,
              }))
            setArticles(formatted)
            setSource("internal")
            return
          }
        }

        await fetchMediumArticles()
      } catch {
        await fetchMediumArticles()
      } finally {
        setLoading(false)
      }
    }

    const fetchMediumArticles = async () => {
      try {
        const response = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@vultisig",
        )

        if (!response.ok) throw new Error("Failed to fetch")

        const data = await response.json()

        if (data.status === "ok" && data.items) {
          const formatted: Article[] = data.items
            .slice(0, 3)
            .map((item: MediumRSSItem) => {
              const imgMatch = item.description.match(
                /<img[^>]+src="([^"]+)"[^>]*>/i,
              )
              return {
                title: item.title,
                description:
                  item.description.replace(/<[^>]*>/g, "").substring(0, 150) +
                  "...",
                date: new Date(item.pubDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
                image: imgMatch?.[1] || item.thumbnail || "",
                link: item.link,
                isInternal: false,
              }
            })
          setArticles(formatted)
          setSource("medium")
        } else {
          setFallbackArticles()
        }
      } catch {
        setFallbackArticles()
      }
    }

    const setFallbackArticles = () => {
      setArticles([
        {
          title: "Biweekly News Recap, May 7 - May 21",
          description:
            "Welcome to the first installment of Vultisig's Biweekly News Recap Series, where we run through the most important events...",
          date: "May 23, 2025",
          image: "/images/home-5.svg",
          link: "#",
          isInternal: false,
        },
        {
          title: "Vultisig supports RUJIRA Merge",
          description:
            "When migrating from RUJIRA to RUJIRA, the Vultisig wallet on android and iOS testflight, now supports in-app steps to...",
          date: "May 1, 2025",
          image: "/images/home-6.svg",
          link: "#",
          isInternal: false,
        },
        {
          title: "Major Partnership Unveiled: Vultisig Teams Up with Kraken",
          description:
            "We are thrilled to announce that our exchange partner will be Kraken, one of the most prestigious and trusted crypto...",
          date: "April 4, 2025",
          image: "/images/home-7.svg",
          link: "#",
          isInternal: false,
        },
      ])
      setSource("medium")
    }

    fetchArticles()
  }, [])

  const ArticleCard = ({
    article,
    index,
  }: {
    article: Article
    index: number
  }) => {
    const cardContent = (
      <>
        <div className="aspect-video bg-slate-700 rounded-xl mb-4 sm:mb-6 overflow-hidden">
          <img
            src={article.image || "/images/placeholder-article.svg"}
            alt={article.title}
            width="800"
            height="450"
            className="w-full h-full max-w-full object-cover"
            // onError={(e) => {
            //   const target = e.target as HTMLImageElement
            //   target.src = "/images/placeholder-article.svg"
            // }}
          />
        </div>
        <div className="flex flex-col flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-3 leading-tight">
            {article.title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1">
            {article.description}
          </p>
          <p className="text-gray-400 text-sm italic mt-auto">{article.date}</p>
        </div>
      </>
    )

    const cardClasses = `
      bg-[var(--background-secondary)]
      border border-borderLight
      hover:border-[var(--border-color)]
      rounded-2xl p-4 sm:p-6
      transition-colors cursor-pointer
      flex flex-col
      block
    `

    if (article.isInternal) {
      return (
        <Link key={index} href={article.link} className={cardClasses}>
          {cardContent}
        </Link>
      )
    }

    return (
      <a
        key={index}
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
      >
        {cardContent}
      </a>
    )
  }

  return (
    <section className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {source === "internal" ? (
              <>
                Latest <span className="text-cyan-400">Articles</span>
              </>
            ) : (
              <>
                Explore More on <span className="text-cyan-400">Medium</span>
              </>
            )}
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl">
            Behind the vault: Insights, partnerships, and product updates{" "}
            <br className="hidden sm:block" />
            from the team building Vultisig.
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="
                  bg-[var(--background-secondary)]
                  border border-borderLight
                  rounded-2xl p-4 sm:p-6
                  animate-pulse
                "
              >
                <div className="aspect-video bg-slate-700 rounded-xl mb-4 sm:mb-6"></div>
                <div className="space-y-3">
                  <div className="h-6 bg-slate-700 rounded"></div>
                  <div className="h-4 bg-slate-700 rounded"></div>
                  <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {articles.map((article, index) => (
                <ArticleCard key={index} article={article} index={index} />
              ))}
            </div>

            {source === "internal" && (
              <div className="text-center mt-10">
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  View all articles
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
