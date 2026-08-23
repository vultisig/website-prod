import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/** Figma pins the bento tiles to two fixed heights on every breakpoint. */
const HEIGHT = {
  tall: "min-h-[423px] lg:h-[423px]",
  short: "min-h-[277.33px] lg:h-[277.33px]",
} as const

type BentoCardProps = {
  height: keyof typeof HEIGHT
  className?: string
  children: ReactNode
}

export default function BentoCard({
  height,
  className,
  children,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-3xl border border-v5-border-light bg-v5-surface-disabled p-5 md:p-[30px]",
        HEIGHT[height],
        className,
      )}
    >
      {children}
    </div>
  )
}

type BentoCopyProps = {
  title: ReactNode
  body?: ReactNode
}

export function BentoCopy({ title, body }: BentoCopyProps) {
  return (
    <div className="relative flex w-full flex-col gap-[18px]">
      <h3 className="text-v5-title2 font-medium text-v5-text-primary">
        {title}
      </h3>
      {body && (
        <p className="text-v5-eyebrow font-normal text-v5-text-secondary">
          {body}
        </p>
      )}
    </div>
  )
}
