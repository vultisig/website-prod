import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  title: ReactNode
  subtitle?: ReactNode
  /** onLight = navy text for light surfaces, onDark = ice text for dark/coloured surfaces */
  tone?: "onLight" | "onDark"
  as?: "h1" | "h2" | "h3"
  className?: string
}

export default function SectionHeading({
  title,
  subtitle,
  tone = "onLight",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  const toneClass =
    tone === "onLight" ? "text-v5-text-inverse" : "text-v5-text-primary"

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3.5 text-center",
        toneClass,
        className,
      )}
    >
      <Heading className="text-v5-display-sm font-medium md:text-v5-display">
        {title}
      </Heading>
      {subtitle && (
        <p className="max-w-[720px] text-v5-body-m font-normal md:text-v5-subtitle">
          {subtitle}
        </p>
      )}
    </div>
  )
}
