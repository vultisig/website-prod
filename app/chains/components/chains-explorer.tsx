"use client"

import Image from "next/image"
import { useMemo, useState } from "react"

import { CHAIN_CATEGORIES, CHAINS, type Chain } from "@/content/chains"
import { cn } from "@/lib/utils"

/**
 * Each card hides a 152px brand-coloured circle under a 115px blur, centred
 * 45px above the mark, and fades it in on hover — Figma ships it on every card
 * with `visible: false`, which is how it stores the hover state.
 *
 * Unlike the bento tiles' FADE_IN this keeps the glow under `motion-reduce`:
 * nothing here travels, so the preference has no motion to remove. It drops the
 * transition instead, so the wash snaps in rather than animating.
 *
 * The circle is its own layer so the filter cannot reach the mark above it, and
 * the radius halves on the way out: Figma's layer-blur radius is a diameter
 * where CSS `blur()` takes a standard deviation, so 115 lands at 57.5px.
 */
const GLOW =
  "pointer-events-none absolute left-1/2 top-[3px] size-[152px] -translate-x-1/2 rounded-full opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100 motion-reduce:transition-none"

/**
 * One chain tile: mark over name over ticker, centred in the space left by the
 * card's uneven 43/30 padding — which is what puts the mark 88.5px down from
 * the card's top edge on the Figma frame.
 */
function ChainCard({ name, ticker, icon, glow }: Chain) {
  return (
    <li className="group relative flex flex-col items-center justify-center gap-5 overflow-hidden rounded-3xl bg-v5-panel px-4 pb-[30px] pt-[43px] md:h-[328px]">
      <span
        aria-hidden
        style={{ backgroundColor: glow, filter: "blur(57.5px)" }}
        className={GLOW}
      />

      <Image
        src={`/v5/chains/chain-${icon}.svg`}
        alt=""
        width={72}
        height={72}
        className="relative size-[72px] max-w-none object-contain"
      />

      <span className="relative flex flex-col items-center gap-1.5 pb-3 text-center text-v5-text-inverse">
        <span className="text-v5-title1 font-medium">{name}</span>
        <span className="text-v5-card-body font-normal">{ticker}</span>
      </span>
    </li>
  )
}

/** Magnifier from the Figma icon set — 2px strokes on Text/Tertiary. */
function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="size-6 shrink-0 text-v5-text-tertiary"
    >
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
      <path
        d="m16.5 16.5 3.3 3.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

const PILL =
  "flex h-10 items-center rounded-full px-[26px] text-v5-card-body transition-colors"

/**
 * Filter chips and the search field narrow the same grid, so they compose: a
 * query inside "EVM" searches only EVM chains. Matching runs over name and
 * ticker because the ticker is the half most people type ("BTC", not "Bitcoin").
 */
export default function ChainsExplorer() {
  const [category, setCategory] = useState<string>("all")
  const [query, setQuery] = useState("")

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return CHAINS.filter((chain) => {
      const inCategory =
        category === "all" ||
        chain.categories.includes(category as (typeof chain.categories)[number])
      if (!inCategory) return false
      if (!q) return true
      return (
        chain.name.toLowerCase().includes(q) ||
        chain.ticker.toLowerCase().includes(q)
      )
    })
  }, [category, query])

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-[30px]">
        <div className="-mx-4 flex items-center gap-4 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
          {CHAIN_CATEGORIES.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setCategory(id)}
              aria-pressed={category === id}
              className={cn(
                PILL,
                "shrink-0",
                category === id
                  ? "bg-v5-cta text-v5-page"
                  : "bg-v5-white text-v5-text-inverse hover:bg-v5-surface-light",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <label className="flex h-11 w-full items-center gap-2.5 rounded-[20px] border border-v5-text-secondary bg-v5-white pl-4 pr-[60px] md:w-[509px]">
          <SearchIcon />
          <span className="sr-only">Search chains</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search chains..."
            className="w-full bg-transparent text-v5-card-body font-medium text-v5-text-inverse outline-none placeholder:text-v5-text-tertiary"
          />
        </label>
      </div>

      {visible.length > 0 ? (
        <ul className="grid grid-cols-2 gap-x-5 gap-y-[30px] md:grid-cols-3 lg:grid-cols-4">
          {visible.map((chain) => (
            <ChainCard key={`${chain.name}-${chain.ticker}`} {...chain} />
          ))}
        </ul>
      ) : (
        <p className="py-20 text-center text-v5-subtitle text-v5-text-inverse">
          No chains match <span className="font-medium">“{query.trim()}”</span>.
        </p>
      )}
    </>
  )
}
