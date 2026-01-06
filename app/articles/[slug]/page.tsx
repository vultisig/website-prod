import { getArticleBySlug, getAllArticles } from '@/lib/articles'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

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

  if (!article) {
    notFound()
  }

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/articles"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          ← Back to Articles
        </Link>

        {/* Article Header */}
        <article className="bg-[var(--background-secondary)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 md:p-12">
          {article.image && (
            <div className="aspect-video bg-slate-700 rounded-xl mb-8 overflow-hidden relative">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-sm px-3 py-1 bg-blue-900/40 text-blue-300 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-400 text-sm mb-8 pb-8 border-b border-slate-700">
            <span>By {article.author}</span>
            <span>•</span>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {article.updatedAt && (
              <>
                <span>•</span>
                <span>Updated {new Date(article.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </>
            )}
          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-gray-300 leading-relaxed">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-white mt-6 mb-3">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold text-white mt-4 mb-2">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 text-gray-300">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-300">{children}</li>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                  code: ({ children }) => (
                    <code className="bg-slate-800 px-2 py-1 rounded text-sm text-blue-300">{children}</code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4">
                      {children}
                    </blockquote>
                  ),
                  img: ({ src, alt }) => (
                    <img src={src} alt={alt} className="rounded-lg my-4 max-w-full" />
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>

        {/* Back to Articles */}
        <div className="mt-8 text-center">
          <Link
            href="/articles"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Articles
          </Link>
        </div>
      </div>
    </main>
  )
}


