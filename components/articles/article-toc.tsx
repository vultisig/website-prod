"use client"

import { useEffect, useState } from "react"

import type { TocHeading } from "@/lib/article-toc"
import { cn } from "@/lib/utils"

/** Highlights the heading nearest the top of the viewport. */
function useActiveHeading(headings: TocHeading[]): string {
  const [active, setActive] = useState(headings[0]?.id || "")

  useEffect(() => {
    const nodes = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((node): node is HTMLElement => node !== null)
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) setActive(visible[0].target.id)
      },
      { rootMargin: "-120px 0px -70% 0px" },
    )
    nodes.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [headings])

  return active
}

type ArticleTocProps = {
  headings: TocHeading[]
  /** sidebar = sticky desktop rail; inline = collapsed card above the prose. */
  variant: "sidebar" | "inline"
}

export default function ArticleToc({ headings, variant }: ArticleTocProps) {
  const active = useActiveHeading(headings)

  if (headings.length === 0) return null

  const list = (
    <ol className="flex flex-col">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            aria-current={heading.id === active ? "location" : undefined}
            className={cn(
              "block py-3 font-medium text-v5-text-inverse hover:text-v5-cta",
              heading.level === 3 ? "pl-8" : "pl-4",
              heading.id === active
                ? "border-l-2 border-v5-highlight text-v5-label"
                : "border-l border-v5-text-tertiary text-v5-eyebrow",
            )}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  )

  if (variant === "inline") {
    return (
      <details className="rounded-[20px] bg-v5-panel p-5 lg:hidden">
        <summary className="cursor-pointer text-v5-label font-semibold text-v5-text-inverse">
          Contents
        </summary>
        <div className="mt-4">{list}</div>
      </details>
    )
  }

  return (
    <nav
      aria-label="Contents"
      className="sticky top-[126px] hidden flex-col gap-[30px] rounded-[20px] bg-v5-panel p-[30px] lg:flex"
    >
      <p className="text-v5-label font-semibold text-v5-text-inverse">
        Contents
      </p>
      {list}
    </nav>
  )
}
