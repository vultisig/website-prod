import Link from "next/link"
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

function ArticleCard({ article }: { article: Article }) {
  const linkClass =
    "flex flex-col overflow-hidden rounded-3xl bg-v5-white transition-shadow hover:shadow-v5-menu"
  const content = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- covers remote Medium thumbnails */}
      <img
        src={article.image || "/images/home-5.svg"}
        alt={`Cover image for ${article.title}`}
        width={720}
        height={396}
        className="aspect-[720/396] w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-3.5 px-4 py-5 md:min-h-[206px]">
        <h3 className="text-v5-subtitle font-semibold text-v5-text-inverse">
          {article.title}
        </h3>
        <p className="flex-1 text-v5-card-body font-normal text-v5-text-inverse">
          {article.description}
        </p>
        <p className="text-v5-card-meta font-normal italic text-v5-text-tertiary">
          {article.date}
        </p>
      </div>
    </>
  )

  if (article.isInternal) {
    return (
      <Link href={article.link} className={linkClass}>
        {content}
      </Link>
    )
  }

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
    >
      {content}
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
    <section className="bg-v5-page px-4 py-9 md:px-[30px] md:pb-[60px] md:pt-[90px]">
      <div className="mx-auto flex max-w-v5-content flex-col gap-[30px]">
        <h2 className="text-v5-display-sm font-medium text-v5-text-inverse md:text-v5-display">
          Explore More on Medium
        </h2>

        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.link} article={article} />
          ))}
        </div>

        {hasInternalArticles && (
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 self-start text-v5-link font-medium text-v5-cta hover:underline"
          >
            View all articles
            <span aria-hidden>&rarr;</span>
          </Link>
        )}
      </div>
    </section>
  )
}
