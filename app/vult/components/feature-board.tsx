"use client"

import { ChevronRight } from "lucide-react"
import { useState } from "react"

import { LandingButton } from "@/components/ui/landing-button"
import { cn } from "@/lib/utils"

import { FEATURE_REQUEST_URL } from "../token"

const FILTERS = ["All", "Chains", "Desktop", "Mobile"] as const
type Filter = (typeof FILTERS)[number]

type Request = {
  title: string
  summary: string
  votes: number
  category: Exclude<Filter, "All">
}

/**
 * Placeholder board content taken from the V5 design. There is no feature-request
 * API in this repo yet — see the section note in WEBSITE-V5-RESKIN-PLAN.md.
 */
const REQUESTS: Request[] = [
  {
    title: "Add Sui swap support",
    summary: "Native swap routing for SUI, not just send/receive.",
    votes: 342,
    category: "Chains",
  },
  {
    title: "Dark mode widget for macOS menu bar",
    summary: "Quick balance check without opening the full app.",
    votes: 289,
    category: "Desktop",
  },
  {
    title: "Add Monero swap support",
    summary: "Native swap routing for Monero, not just send/receive.",
    votes: 85,
    category: "Chains",
  },
  {
    title: "Add Spanish as a Language",
    summary: "Translate the app into Spanish.",
    votes: 57,
    category: "Mobile",
  },
]

function UpvoteIcon() {
  return (
    <svg
      viewBox="0 0 19.2 19.2"
      className="size-6 fill-v5-success"
      aria-hidden
      focusable="false"
    >
      <path d="M9.6 19.2C14.8932 19.2 19.2 14.8932 19.2 9.6C19.2 4.3068 14.8932 0 9.6 0C4.3068 0 0 4.3068 0 9.6C0 14.8932 4.3068 19.2 9.6 19.2ZM5.94 10.08L8.64 6.48C8.8656 6.1776 9.222 6 9.6 6C9.978 6 10.3332 6.1776 10.56 6.48L13.26 10.08C13.5336 10.4436 13.5768 10.9296 13.374 11.3364C13.17 11.7432 12.7548 12 12.3 12H6.9C6.4452 12 6.03 11.7432 5.826 11.3364C5.6232 10.9296 5.6664 10.4436 5.94 10.08Z" />
    </svg>
  )
}

export default function FeatureBoard() {
  const [active, setActive] = useState<Filter>("All")
  const visible =
    active === "All"
      ? REQUESTS
      : REQUESTS.filter((request) => request.category === active)

  return (
    <section className="bg-v5-page px-4 pt-8 md:px-[30px] md:pt-[30px]">
      <div className="mx-auto flex max-w-v5-content flex-col gap-[30px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div
            role="tablist"
            aria-label="Filter feature requests by platform"
            className="flex gap-3 overflow-x-auto [scrollbar-width:none] md:gap-4 [&::-webkit-scrollbar]:hidden"
          >
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={active === filter}
                onClick={() => setActive(filter)}
                className={cn(
                  "shrink-0 rounded-[20px] px-[26px] py-2.5 text-v5-card-body font-normal capitalize transition-colors",
                  active === filter
                    ? "bg-v5-cta text-v5-text-primary"
                    : "bg-v5-white text-v5-text-inverse hover:bg-v5-surface-light",
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          <LandingButton
            asChild
            size="sm"
            className="h-[50px] w-full shrink-0 md:w-[185px]"
          >
            <a
              href={FEATURE_REQUEST_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Submit a Request
            </a>
          </LandingButton>
        </div>

        <ul className="grid gap-4 md:grid-cols-2 md:gap-x-4 md:gap-y-[30px]">
          {visible.map((request) => (
            <li key={request.title}>
              <a
                href={FEATURE_REQUEST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 rounded-3xl border border-v5-border-faint bg-v5-white p-5 text-v5-text-inverse transition-colors hover:bg-v5-surface-light md:gap-7 md:rounded-[24px] md:p-6"
              >
                <span className="flex size-[68px] shrink-0 flex-col items-center justify-center gap-[9px] rounded-2xl bg-v5-page md:size-[77px]">
                  <UpvoteIcon />
                  <span className="text-v5-body-m font-bold tracking-[0.2px]">
                    {request.votes}
                  </span>
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-3">
                  <span className="text-v5-title2 font-medium">
                    {request.title}
                  </span>
                  <span className="text-v5-body-m font-normal">
                    {request.summary}
                  </span>
                </span>
                <ChevronRight
                  className="size-6 shrink-0 text-v5-text-tertiary"
                  aria-hidden
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
