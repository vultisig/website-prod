import { cn } from "@/lib/utils"
import React from "react"

export default function Heading({
  children,
  withMargin = true,
  className,
}: {
  children: React.ReactNode
  withMargin?: boolean
  className?: string
}) {
  return (
    <h2
      className={cn(
        "text-textPrimary text-center text-2xl md:text-[40px] md:leading-tight font-medium intersect-once intersect:motion-preset-slide-up-md",
        withMargin && "mb-8 md:mb-16",
        className,
      )}
    >
      {children}
    </h2>
  )
}
