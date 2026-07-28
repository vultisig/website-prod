import Link from "next/link"

import { cn } from "@/lib/utils"

import { TABS, type TabKey } from "./tabs"

const BASE =
  "flex h-[52px] flex-1 items-center justify-center border border-white/10 p-2.5 text-center text-v5-body-s font-medium md:h-16 md:text-v5-body-l"

export default function TabToggle({ activeTab }: { activeTab: TabKey }) {
  return (
    <div className="flex w-full items-center justify-center md:w-[675px] md:px-[35px]">
      {TABS.map((tab, index) => (
        <Link
          key={tab.key}
          href={tab.href}
          scroll={false}
          aria-current={tab.key === activeTab ? "page" : undefined}
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
