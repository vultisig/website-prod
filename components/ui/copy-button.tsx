"use client"

import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

const COPY_FEEDBACK_MS = 1600

type CopyButtonProps = {
  /** Text written to the clipboard. */
  value: string
  /** Names what is being copied, for the screen-reader label. */
  label: string
  className?: string
}

/**
 * Square icon button that copies `value` and briefly swaps to a tick. Renders
 * nothing to the clipboard when the API is unavailable (insecure origins), so
 * the surrounding code block stays usable either way.
 */
export default function CopyButton({
  value,
  label,
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      return
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), COPY_FEEDBACK_MS)
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-v5-border-light bg-v5-surface-2/60 text-v5-text-secondary transition-colors hover:text-v5-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-v5-accent",
        className,
      )}
    >
      {copied ? (
        <Check className="size-5 text-v5-success" aria-hidden />
      ) : (
        <Copy className="size-5" aria-hidden />
      )}
    </button>
  )
}
