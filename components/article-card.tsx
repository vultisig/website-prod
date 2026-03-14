"use client"

import Link from "next/link"
import Image from "next/image"
import { Article } from "@/lib/articles"

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="
        bg-backgroundSecondary
        border border-[var(--border-color)]
        hover:border-[var(--border-color)]
        hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
        rounded-2xl p-4 sm:p-6
        transition-all cursor-pointer
        flex flex-col
        group
      "
    >
      {article.image && (
        <div className="aspect-video bg-slate-700 rounded-xl mb-4 sm:mb-6 overflow-hidden relative">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = "none"
            }}
          />
        </div>
      )}
      <div className="flex flex-col flex-1">
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {article.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 bg-blue-900/40 text-blue-300 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors">
          {article.title}
        </h2>
        <p className="text-textSecondary text-sm leading-relaxed mb-4 flex-1">
          {article.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700">
          <p className="text-gray-400 text-sm">
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <span className="text-blue-400 text-sm group-hover:translate-x-1 transition-transform inline-block">
            Read more →
          </span>
        </div>
      </div>
    </Link>
  )
}
