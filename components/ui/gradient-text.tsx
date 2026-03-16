import { cn } from "@/lib/utils"
import React from "react"

export default function GradientText({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-[#33e6bf] to-cyan-400 bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </span>
  )
}
