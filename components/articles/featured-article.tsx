import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { LandingButton } from "@/components/ui/landing-button"
import { formatArticleDate } from "@/lib/article-format"
import type { ArticleSummary } from "@/lib/articles"

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-v5-accent/10 px-2 py-1 text-v5-card-meta font-medium text-v5-surface-1">
      {children}
    </span>
  )
}

export default function FeaturedArticle({
  article,
}: {
  article: ArticleSummary
}) {
  const href = `/articles/${article.slug}`

  return (
    <article className="flex flex-col gap-5 rounded-[30px] bg-v5-white p-5 lg:flex-row lg:gap-10">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="relative aspect-[560/315] w-full overflow-hidden rounded-[20px] bg-v5-panel lg:w-[560px] lg:min-w-0"
      >
        {article.image && (
          <Image
            src={article.image}
            alt=""
            fill
            sizes="(max-width: 1023px) 100vw, 560px"
            className="object-cover"
            priority
          />
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-3.5 lg:p-3">
        <div className="flex flex-wrap gap-2.5">
          <Pill>By {article.author}</Pill>
          <Pill>{formatArticleDate(article.publishedAt)}</Pill>
          {article.updatedAt && (
            <Pill>Updated {formatArticleDate(article.updatedAt)}</Pill>
          )}
        </div>

        <h2 className="text-v5-display-xs font-semibold text-v5-text-inverse lg:text-v5-headline-lg">
          <Link href={href} className="hover:text-v5-cta">
            {article.title}
          </Link>
        </h2>

        {/* Same fill/ink inversion the "Get Started" CTAs run on hover. */}
        <LandingButton
          asChild
          invertOnHover
          className="h-[50px] w-full lg:w-[200px]"
        >
          <Link href={href} aria-label={`Read ${article.title}`}>
            Learn More
            <ArrowRight aria-hidden />
          </Link>
        </LandingButton>
      </div>
    </article>
  )
}
