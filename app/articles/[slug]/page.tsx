import { getArticleBySlug, getAllArticles } from '@/lib/articles'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import MarkdownRenderer from '@/components/markdown-renderer'

interface ArticlePageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllArticles().map(article => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return { title: 'Article Not Found' }

  return {
    title: `${article.title} - Vultisig`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.image ? [article.image] : [],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
    },
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/articles" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          ← Back to Articles
        </Link>

        <article className="bg-[var(--background-secondary)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 md:p-12">
          {article.image && (
            <div className="aspect-video bg-slate-700 rounded-xl mb-8 overflow-hidden relative">
              <Image src={article.image} alt={article.title} fill className="object-cover" priority />
            </div>
          )}

          {article.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag, idx) => (
                <span key={idx} className="text-sm px-3 py-1 bg-blue-900/40 text-blue-300 rounded-md">{tag}</span>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">{article.title}</h1>

          <div className="flex items-center gap-4 text-gray-400 text-sm mb-8 pb-8 border-b border-slate-700">
            <span>By {article.author}</span>
            <span>•</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
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
          <Link href="/articles" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Articles
          </Link>
        </div>
      </div>
    </main>
  )
}
