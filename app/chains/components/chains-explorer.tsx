"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useRef, useState } from "react"

import {
  chainHref,
  CHAIN_CATEGORIES,
  CHAINS,
  type Chain,
} from "@/content/chains"
import { cn } from "@/lib/utils"

import {
  BuyIcon,
  FunctionIcon,
  ReceiveIcon,
  SendIcon,
  SwapIcon,
} from "./action-icons"

/** The wallet's main-view actions, in the order it renders them. */
const ACTIONS = [
  { label: "Swap", Icon: SwapIcon },
  { label: "Send", Icon: SendIcon },
  { label: "Buy", Icon: BuyIcon },
  { label: "Function", Icon: FunctionIcon },
  { label: "Receive", Icon: ReceiveIcon },
]

/**
 * Hovering a card shows what the vault can do on that chain.
 *
 * The reference recording holds the whole change to one run: the fill lifts off
 * the slate to white, the brand glow blooms, the mark and its label climb, and
 * the action row arrives already at its resting height — it fades, it does not
 * slide. Measured on the recording, entry covers 0 to 45.5px in ~500ms passing
 * half way at about 48% of the run, which is what `v5-drift` traces. Leaving is
 * a different curve: it snaps back in ~200ms, so the run length is set on hover
 * and the shorter one is what applies on the way out.
 *
 * Nothing here is interactive. The row illustrates the app rather than linking
 * into it, so it stays inert and only the labels reach the accessibility tree.
 */
const RUN =
  "duration-200 ease-v5-drift [@media(hover:hover)]:group-hover:duration-500"

/**
 * The lift is exactly what the layout would do on its own. Card padding is 43
 * over 30, and stacking mark, label and action row inside it — 72 + 20 + 72 +
 * 20 + 71 — fills the 328px card to the pixel. Without the row the remaining
 * pair centres 45.5px lower, so hovering translates by that difference instead
 * of animating the row into flow, which would thrash layout on 38 cards.
 */
const LIFT =
  "[@media(hover:hover)]:group-hover:-translate-y-[45.5px] motion-reduce:!translate-y-0"

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
 *
 * It settles at 28% rather than Figma's opaque fill. Sampled across the
 * recording the wash falls off on the same curve as this layer but reaches only
 * about a quarter of its strength, so the blur is right and the alpha is not —
 * at full strength the card reads as tinted rather than lit.
 */
const GLOW =
  "pointer-events-none absolute left-1/2 top-[3px] size-[152px] -translate-x-1/2 rounded-full opacity-0 transition-opacity [@media(hover:hover)]:group-hover:opacity-[0.28] motion-reduce:transition-none"

/**
 * One chain tile: mark over name over ticker, centred in the space left by the
 * card's uneven 43/30 padding — which is what puts the mark 88.5px down from
 * the card's top edge on the Figma frame.
 *
 * The card carries `hover:` rather than `group-hover:` for its own fill: it is
 * the element holding `group`, and an element is not its own group ancestor.
 */
function ChainCard({ name, ticker, icon, glow, slug }: Chain) {
  return (
    <li>
      <Link
        href={chainHref(slug)}
        className={cn(
          "group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-v5-panel px-4 pb-[30px] pt-[43px] transition-colors md:h-[328px]",
          RUN,
          "[@media(hover:hover)]:hover:bg-v5-white",
        )}
      >
        <span
          aria-hidden
          style={{ backgroundColor: glow, filter: "blur(57.5px)" }}
          className={cn(GLOW, RUN)}
        />

        <div
          className={cn(
            "relative flex flex-col items-center gap-5 transition-transform",
            RUN,
            LIFT,
          )}
        >
          {/*
          The slot is 72px because that is what the card's stack measures
          against, but Figma fits the mark itself into 54 inside it — its
          Ethereum lands at exactly 33x54 there. Rendering at the full 72 makes
          every mark a third too big.
        */}
          <span className="flex size-[72px] items-center justify-center">
            <Image
              src={`/v5/chains/chain-${icon}.svg`}
              alt=""
              width={54}
              height={54}
              className="size-[54px] max-w-none object-contain"
            />
          </span>

          <span className="flex flex-col items-center gap-1.5 pb-3 text-center text-v5-text-inverse">
            <span className="text-v5-title1 font-medium">{name}</span>
            <span className="text-v5-card-body font-normal">{ticker}</span>
          </span>
        </div>

        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-[30px] flex justify-center gap-[11px] opacity-0 transition-opacity",
            RUN,
            "[@media(hover:hover)]:group-hover:opacity-100",
          )}
        >
          {ACTIONS.map(({ label, Icon }) => (
            <span key={label} className="flex flex-col items-center gap-2">
              <span className="flex size-12 items-center justify-center rounded-xl bg-v5-page text-v5-text-inverse">
                <Icon aria-hidden className="size-[18px]" />
              </span>
              <span className="text-v5-caption text-v5-text-tertiary">
                {label}
              </span>
            </span>
          ))}
        </div>
      </Link>
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

/** Matches the magnifier's weight so the two ends of the field agree. */
function ClearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-4">
      <path
        d="M6 6l12 12M18 6L6 18"
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
  /** Clearing returns focus to the field rather than dropping it on the body. */
  const inputRef = useRef<HTMLInputElement>(null)

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

        {/*
          Figma leaves 60px clear on the right of the field. That is the room
          for the clear control, so the input's text stops there and the button
          sits 16px in from the edge, mirroring the magnifier's inset.

          `type="search"` keeps the semantics and the Escape-to-clear the
          platform gives for free, but WebKit's own cancel button is dropped:
          it renders at the input's right edge, which the 60px padding strands
          in the middle of the field.
        */}
        <label className="relative flex h-11 w-full items-center gap-2.5 rounded-[20px] border border-v5-text-secondary bg-v5-white pl-4 pr-[60px] transition-colors focus-within:border-v5-cta md:w-[509px]">
          <SearchIcon />
          <span className="sr-only">Search chains</span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search chains..."
            className="w-full bg-transparent text-v5-card-body font-medium text-v5-text-inverse outline-none placeholder:text-v5-text-tertiary [&::-webkit-search-cancel-button]:appearance-none"
          />
          {query !== "" && (
            <button
              type="button"
              onClick={() => {
                setQuery("")
                inputRef.current?.focus()
              }}
              aria-label="Clear search"
              className="absolute right-4 flex size-6 items-center justify-center rounded-full text-v5-text-tertiary transition-colors hover:text-v5-text-inverse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-v5-cta"
            >
              <ClearIcon />
            </button>
          )}
        </label>
      </div>

      {/* Results change without focus moving, so they are announced instead. */}
      <p aria-live="polite" className="sr-only">
        {visible.length} of {CHAINS.length} chains shown
      </p>

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
