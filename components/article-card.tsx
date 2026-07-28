"use client"

import Image from "next/image"
import Link from "next/link"

import { formatArticleDate } from "@/lib/article-format"
import type { Article } from "@/lib/articles"

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-v5-white transition-shadow hover:shadow-v5-menu"
    >
      <div className="relative aspect-[720/396] w-full bg-v5-panel">
        {article.image && (
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 440px"
            className="object-cover"
            onError={(event) => {
              event.currentTarget.style.display = "none"
            }}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3.5 px-4 py-5 md:min-h-[206px]">
        <h3 className="text-v5-subtitle font-semibold text-v5-text-inverse group-hover:text-v5-cta">
          {article.title}
        </h3>
        <p className="line-clamp-4 flex-1 text-v5-card-body text-v5-text-inverse">
          {article.description}
        </p>
        <time
          dateTime={article.publishedAt}
          className="text-v5-card-meta italic text-v5-text-tertiary"
        >
          {formatArticleDate(article.publishedAt)}
        </time>
      </div>
    </Link>
  )
}
