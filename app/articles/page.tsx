import { getAllArticles } from '@/lib/articles'
import Link from 'next/link'
import ArticleCard from '@/components/article-card'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Articles - Vultisig Blog',
  description: 'Read the latest articles, insights, and updates from Vultisig. Learn about MPC wallets, security, and blockchain technology.',
  openGraph: {
    title: 'Vultisig Articles',
    description: 'Latest articles, insights, and updates from Vultisig.',
  },
}

export default function ArticlesPage() {
  const articles = getAllArticles()

  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Articles
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-0">
            Insights, updates, and deep dives into MPC wallets, security, and blockchain technology
          </p>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-4">No articles yet.</p>
            <Link 
              href="/articles/admin"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Create your first article
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

