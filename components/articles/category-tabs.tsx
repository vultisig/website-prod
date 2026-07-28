import Link from "next/link"

import type { CategorySlug, CategoryTab } from "@/lib/article-categories"
import { cn } from "@/lib/utils"

type CategoryTabsProps = {
  tabs: CategoryTab[]
  active: CategorySlug
}

export default function CategoryTabs({ tabs, active }: CategoryTabsProps) {
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
          aria-current={tab.slug === active ? "page" : undefined}
          className={cn(
            "rounded-[20px] px-4 py-2 text-v5-card-body capitalize md:px-[26px] md:py-2.5",
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
