import { getAllArticles } from '@/lib/articles'
import Link from 'next/link'
import ArticleCard from '@/components/article-card'
import type { Metadata } from 'next'

// Make articles page dynamic - articles change frequently
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Articles - Vultisig Blog',
  description: 'Read the latest articles, insights, and updates from Vultisig.',
  alternates: {
    canonical: 'https://vultisig.com/articles',
    types: {
      'application/rss+xml': 'https://vultisig.com/articles/feed.xml',
    },
  },
  openGraph: {
    title: 'Vultisig Articles',
    description: 'Latest articles, insights, and updates from Vultisig.',
    url: 'https://vultisig.com/articles',
    type: 'website',
    images: [
      {
        url: 'https://vultisig.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vultisig Articles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vultisig Articles',
    description: 'Latest articles, insights, and updates from Vultisig.',
    images: ['https://vultisig.com/og-image.png'],
  },
}

function CollectionPageJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Vultisig Articles',
    description: 'Latest articles, insights, and updates from Vultisig.',
    url: 'https://vultisig.com/articles',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Vultisig',
      url: 'https://vultisig.com',
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
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://vultisig.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Articles',
        item: 'https://vultisig.com/articles',
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

export default async function ArticlesPage() {
  const articles = await getAllArticles()
  
  // Debug: Log article count (remove in production if needed)
  if (process.env.NODE_ENV === 'development') {
    console.log(`[ArticlesPage] Rendering with ${articles.length} articles`)
  }

  return (
    <>
      <CollectionPageJsonLd />
      <BreadcrumbJsonLd />
      <main className="min-h-screen pt-32 pb-20 px-4">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white">Articles</h1>
            <a
              href="/articles/feed.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 transition-colors"
              title="RSS Feed"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z"/>
              </svg>
            </a>
          </div>
          <p className="text-gray-300 text-xl max-w-2xl">
            Insights, updates, and deep dives into MPC wallets, security, and blockchain technology
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-4">No articles yet.</p>
            <Link href="/articles/admin" className="text-blue-400 hover:text-blue-300 underline">
              Create your first article
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {articles.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </main>
    </>
  )
}
