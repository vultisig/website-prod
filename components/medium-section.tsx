"use client"

import { useState, useEffect } from 'react'

interface Article {
  title: string
  description: string
  date: string
  image: string
  link: string
}

interface MediumRSSItem {
  title: string
  description: string
  pubDate: string
  thumbnail?: string
  link: string
}

interface MediumRSSResponse {
  status: string
  items: MediumRSSItem[]
}

export default function MediumSection() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMediumArticles = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@vultisig'
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles')
        }
        
        const data: MediumRSSResponse = await response.json()
        
        if (data.status === 'ok' && data.items) {
          // Take only the latest 3 articles and format them
          const formattedArticles: Article[] = data.items.slice(0, 3).map((item: MediumRSSItem) => {
            // Extract image from the first <img> tag in description
            const imgMatch = item.description.match(/<img[^>]+src="([^"]+)"[^>]*>/i)
            const extractedImage = imgMatch ? imgMatch[1] : null
            
            return {
              title: item.title,
              description: item.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
              date: new Date(item.pubDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
              image: extractedImage || item.thumbnail || '',
              link: item.link
            }
          })
          
          setArticles(formattedArticles)
        } else {
          throw new Error('Invalid response format')
        }
      } catch (err) {
        console.error('Error fetching Medium articles:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        
        // Fallback to static articles if API fails
        setArticles([
          {
            title: "Biweekly News Recap, May 7 — May 21",
            description: "Welcome to the first installment of Vultisig's Biweekly News Recap Series, where we run through the most important events...",
            date: "May 23, 2025",
            image: "/images/home-5.svg",
            link: "#"
          },
          {
            title: "Vultisig supports RUJIRA Merge",
            description: "When migrating from RUJIRA to RUJIRA, the Vultisig wallet on android and iOS testflight, now supports in-app steps to...",
            date: "May 1, 2025",
            image: "/images/home-6.svg",
            link: "#"
          },
          {
            title: "Major Partnership Unveiled: Vultisig Teams Up with Kraken",
            description: "We are thrilled to announce that our exchange partner will be Kraken, one of the most prestigious and trusted crypto...",
            date: "April 4, 2025",
            image: "/images/home-7.svg",
            link: "#"
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchMediumArticles()
  }, [])

  return (
    <section className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Explore More on <span className="text-cyan-400">Medium</span>
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl">
            Behind the vault: Insights, partnerships, and product updates
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
                  border border-[var(--border-color)]
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {articles.map((article, index) => (
              <a
                key={index}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  bg-[var(--background-secondary)]
                  border border-[var(--border-color)]
                  hover:border-[var(--border-color)]
                  hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
                  rounded-2xl p-4 sm:p-6
                  transition-colors cursor-pointer
                  flex flex-col
                  block
                "
              >
                <div className="aspect-video bg-slate-700 rounded-xl mb-4 sm:mb-6 overflow-hidden">
                  <img
                    src={article.image || "/images/placeholder-article.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/images/placeholder-article.svg"
                    }}
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 leading-tight">{article.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1">{article.description}</p>
                  <p className="text-gray-400 text-sm italic mt-auto">{article.date}</p>
                </div>
              </a>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="text-center text-red-400">
            <p>Unable to load latest articles. Showing fallback content.</p>
          </div>
        )}
      </div>
    </section>
  )
}
