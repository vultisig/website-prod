import ArticleCard from "@/components/article-card"
import type { Article } from "@/lib/articles"

interface RelatedArticlesProps {
  articles: Article[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles.length) return null

  return (
    <section
      aria-labelledby="related-articles"
      className="flex flex-col gap-8 pt-[30px] md:gap-[50px] md:pt-[60px]"
    >
      <h2
        id="related-articles"
        className="text-v5-display-xs font-semibold text-v5-text-inverse md:text-center md:text-v5-section-title"
      >
        Related Articles
      </h2>
      <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}
