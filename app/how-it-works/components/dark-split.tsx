import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type DarkSplitProps = {
  /** Pill label above the heading. */
  eyebrow: string
  title: ReactNode
  body: ReactNode
  media: ReactNode
  /** Media first on desktop (the copy stays first in the DOM on mobile). */
  mediaFirst?: boolean
  /** Mobile corner rounding — the two dark blocks form one panel on mobile. */
  rounding: "top" | "bottom"
  className?: string
}

/**
 * The two dark "Bring your own devices" / "Backups that can't betray you"
 * blocks: side-by-side panels on desktop, one continuous stacked panel on
 * mobile, which is why the corner rounding is a prop.
 */
export default function DarkSplit({
  eyebrow,
  title,
  body,
  media,
  mediaFirst = false,
  rounding,
  className,
}: DarkSplitProps) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-v5-content flex-col gap-8 overflow-hidden bg-v5-surface-dark px-4 md:flex-row md:items-start md:justify-center md:gap-[50px] md:rounded-v5-panel md:p-[60px]",
        rounding === "top"
          ? "rounded-t-[20px] pb-8 pt-9"
          : "rounded-b-[20px] pb-9",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col justify-center gap-5 md:flex-1",
          mediaFirst && "md:order-2",
        )}
      >
        <span className="flex h-8 w-fit items-center justify-center rounded-[50px] border border-v5-accent/50 bg-v5-accent/10 px-4 text-v5-eyebrow font-medium uppercase text-v5-accent">
          {eyebrow}
        </span>
        <h2 className="text-v5-display-md font-medium text-v5-text-primary md:text-v5-display">
          {title}
        </h2>
        <div className="flex flex-col gap-6 text-v5-link font-normal text-v5-text-secondary md:max-w-[531px] md:text-v5-body-m-relaxed md:text-v5-text-primary">
          {body}
        </div>
      </div>
      {media}
    </div>
  )
}
