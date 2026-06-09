import { Article } from "@/lib/articles"
import ArticleCard from "@/components/article-card"

interface RelatedArticlesProps {
  articles: Article[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles.length) return null

  return (
    <section aria-labelledby="related-reading" className="mt-16">
      <h2
        id="related-reading"
        className="text-2xl sm:text-3xl font-bold text-white mb-8"
      >
        Related reading
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}
