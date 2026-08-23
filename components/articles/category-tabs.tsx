"use client"

import Link from "next/link"
import type { MouseEvent } from "react"

import type { CategorySlug, CategoryTab } from "@/lib/article-categories"
import { cn } from "@/lib/utils"

type CategoryTabsProps = {
  tabs: CategoryTab[]
  active: CategorySlug
  /** Filters in place; the href is still what the URL becomes. */
  onSelect: (slug: CategorySlug, href: string) => void
}

export default function CategoryTabs({
  tabs,
  active,
  onSelect,
}: CategoryTabsProps) {
  // Real links, so no-JS and open-in-new-tab both keep working; only a plain
  // left click is taken over to filter on the client.
  const handle =
    (tab: CategoryTab) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }
      event.preventDefault()
      onSelect(tab.slug, tab.href)
    }

  return (
    <nav
      aria-label="Article categories"
      className="flex flex-wrap items-center gap-2 md:gap-4"
    >
      {tabs.map((tab) => (
        <Link
          key={tab.slug}
          href={tab.href}
          scroll={false}
          onClick={handle(tab)}
          aria-current={tab.slug === active ? "page" : undefined}
          className={cn(
            "rounded-[20px] px-4 py-2 text-v5-card-body capitalize transition-colors md:px-[26px] md:py-2.5",
            tab.slug === active
              ? "bg-v5-cta text-v5-text-primary"
              : "bg-v5-white text-v5-text-inverse hover:bg-v5-panel",
          )}
        >
          {tab.label} ({tab.count})
        </Link>
      ))}
    </nav>
  )
}
