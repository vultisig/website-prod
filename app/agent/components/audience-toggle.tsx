import Link from "next/link"

import { cn } from "@/lib/utils"

export type AudienceKey = "agents" | "builders"

const AUDIENCES = [
  { key: "agents", label: "For Agents", href: "/agent/for-agents" },
  { key: "builders", label: "For Builders", href: "/agent/for-builders" },
] as const satisfies readonly {
  key: AudienceKey
  label: string
  href: string
}[]

const SEGMENT =
  "flex h-11 flex-1 items-center justify-center rounded-full px-6 text-v5-body-s font-medium transition-colors duration-300 ease-v5-drift motion-reduce:transition-none md:w-[142px] md:flex-none"

/**
 * Segmented switch between the two Agent landing pages. Which side reads as
 * active is decided by the page rendering it, so this stays a plain pair of
 * links — no client state, and both destinations are still crawlable.
 */
export default function AudienceToggle({ active }: { active: AudienceKey }) {
  return (
    <nav
      aria-label="Agent audience"
      className="flex w-full items-center rounded-full bg-v5-surface-light p-1.5 md:w-fit"
    >
      {AUDIENCES.map((audience) => (
        <Link
          key={audience.key}
          href={audience.href}
          aria-current={audience.key === active ? "page" : undefined}
          className={cn(
            SEGMENT,
            audience.key === active
              ? "bg-v5-white text-v5-text-inverse"
              : "text-v5-text-inverse/70 hover:text-v5-text-inverse",
          )}
        >
          {audience.label}
        </Link>
      ))}
    </nav>
  )
}
