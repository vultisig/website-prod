import Link from "next/link"
import SectionBadge from "@/components/ui/section-badge"
import { getAllArticles } from "@/lib/articles"

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

const FALLBACK_ARTICLES: Article[] = [
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
]

function ArticleCard({
  article,
  index,
}: {
  article: Article
  index: number
}) {
  const cardContent = (
    <>
      <div className="aspect-video bg-slate-700 rounded-xl mb-4 sm:mb-6 overflow-hidden">
        <img
          src={article.image || "/images/home-5.svg"}
          alt={article.title}
          width="800"
          height="450"
          className="w-full h-full max-w-full object-cover"
        />
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-3 leading-tight">
          {article.title}
        </h3>
        <p className="text-textSecondary text-sm leading-relaxed mb-4 flex-1">
          {article.description}
        </p>
        <p className="text-gray-300 text-sm italic mt-auto">{article.date}</p>
      </div>
    </>
  )

  const cardClasses = `
    bg-backgroundSecondary
    border border-borderLight
    hover:border-primary
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

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

async function getServerArticles(): Promise<Article[]> {
  if (process.env.MONGODB_URI) {
    try {
      const internalArticles = await getAllArticles()
      if (internalArticles.length > 0) {
        return internalArticles
          .slice(0, 3)
          .map((article: InternalArticle) => ({
            title: article.title,
            description:
              article.description.length > 150
                ? article.description.substring(0, 150) + "..."
                : article.description,
            date: formatDate(article.publishedAt),
            image: article.image || "",
            link: `/articles/${article.slug}`,
            isInternal: true,
          }))
      }
    } catch {
      // Fall through to cached Medium fallback.
    }
  }

  try {
    const response = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@vultisig",
      {
        next: { revalidate: 3600 },
      },
    )

    if (!response.ok) throw new Error("Failed to fetch Medium feed")

    const data = await response.json()

    if (data.status === "ok" && data.items) {
      return data.items.slice(0, 3).map((item: MediumRSSItem) => {
        const imgMatch = item.description.match(/<img[^>]+src="([^"]+)"[^>]*>/i)
        return {
          title: item.title,
          description:
            item.description.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
          date: formatDate(item.pubDate),
          image: imgMatch?.[1] || item.thumbnail || "",
          link: item.link,
          isInternal: false,
        }
      })
    }
  } catch {
    // Fall back to shipped content if external data is unavailable.
  }

  return FALLBACK_ARTICLES
}

export default async function MediumSection() {
  const articles = await getServerArticles()
  const hasInternalArticles = articles.some((article) => article.isInternal)

  return (
    <section className="py-10 container">
      <div className="mb-16">
        <div className="mb-4">
          <SectionBadge label="Articles" />
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Explore More on{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(64deg, #33E6BF, #0439C7)",
            }}
          >
            Medium
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} index={index} />
        ))}
      </div>

      {hasInternalArticles && (
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
    </section>
  )
}
