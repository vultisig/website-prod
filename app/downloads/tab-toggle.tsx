"use client"

import Link from "next/link"
import type { MouseEvent } from "react"

import { cn } from "@/lib/utils"

import { TABS, type TabKey } from "./tabs"

const BASE =
  "flex h-[52px] flex-1 items-center justify-center border border-white/10 p-2.5 text-center text-v5-body-s font-medium transition-colors duration-300 ease-v5-drift motion-reduce:transition-none md:h-16 md:text-v5-body-l"

/** Modified clicks (open in a new tab, save, …) belong to the browser. */
const isPlainClick = (event: MouseEvent<HTMLAnchorElement>) =>
  !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey

/**
 * The tabs stay real links so they can be opened in a new tab and crawled;
 * a plain left click is handled in-page instead so the panels can crossfade.
 */
export default function TabToggle({
  activeTab,
  onSelect,
}: {
  activeTab: TabKey
  onSelect: (tab: TabKey, href: string) => void
}) {
  return (
    <div className="flex w-full items-center justify-center md:w-[675px] md:px-[35px]">
      {TABS.map((tab, index) => (
        <Link
          key={tab.key}
          href={tab.href}
          scroll={false}
          aria-current={tab.key === activeTab ? "page" : undefined}
          onClick={(event) => {
            if (!isPlainClick(event)) return
            event.preventDefault()
            onSelect(tab.key, tab.href)
          }}
          className={cn(
            BASE,
            index === 0 ? "rounded-l-[34px]" : "rounded-r-[34px]",
            tab.key === activeTab
              ? "bg-v5-cta text-v5-text-primary"
              : "bg-v5-white text-v5-text-inverse",
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  )
}
