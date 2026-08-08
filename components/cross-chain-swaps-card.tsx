import Image from "next/image"

import BentoCard, { BentoCopy } from "@/components/ui/bento-card"

/** One side of the quote — the pair of tokens trades places between the two slots. */
type Token = {
  chain: string
  chainIcon: string
  balance: string
  coin: string
  coinIcon: string
  amount: string
  fiat: string
}

const RUNE: Token = {
  chain: "THORChain",
  chainIcon: "/v5/bento-chain-thorchain.svg",
  balance: "4,200.52 RUNE",
  coin: "RUNE",
  coinIcon: "/v5/bento-coin-rune.svg",
  amount: "1,000",
  fiat: "$1,116.28",
}

const BTC: Token = {
  chain: "Bitcoin",
  chainIcon: "/v5/bento-chain-bitcoin.svg",
  balance: "0.004 BTC",
  coin: "BTC",
  coinIcon: "/v5/bento-coin-btc.svg",
  amount: "0.0125",
  fiat: "$1,115.12",
}

/**
 * Hovering the tile swaps the two legs. Both tokens are always in the DOM, stacked
 * in one grid cell, and only their opacity crossfades — the slots themselves never
 * move, which is what makes the two labels overlap mid-transition.
 */
// Linear, not eased: an eased crossfade front-loads the fade and the two labels
// barely overlap, where the reference holds a readable 50/50 for ~a third of the run.
const LAYER =
  "col-start-1 row-start-1 flex flex-col gap-4 duration-300 ease-linear"
const SETTLED = `${LAYER} transition-opacity [@media(hover:hover)]:group-hover:opacity-0`
const INCOMING = `${LAYER} opacity-0 transition-opacity [@media(hover:hover)]:group-hover:opacity-100`

function ChevronDown({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="m5.333 6.667 2.667 2.666 2.667-2.666"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRight({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <path
        d="m8.333 6.667 3.334 3.333-3.334 3.333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SwapArrows({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <g
        stroke="#F0F4FC"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M5.241 3.652 4.525 8.157l4.494-.783-3.778-3.722Z"
          fill="#F0F4FC"
        />
        <path d="M6.121 6.002a8.374 8.374 0 0 1 5.879-2.4 8.4 8.4 0 0 1 8.4 8.4" />
        <path
          d="m18.759 20.349.716-4.505-4.494.784 3.778 3.721Z"
          fill="#F0F4FC"
        />
        <path d="M17.878 18a8.374 8.374 0 0 1-5.878 2.4 8.4 8.4 0 0 1-8.4-8.4" />
        <path
          d="M12.001 13.201a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z"
          fill="#F0F4FC"
        />
      </g>
    </svg>
  )
}

/**
 * `label` and `caret` belong to the slot rather than the token: the caret stays
 * parked on the From row no matter which token is sitting in it.
 */
function LegContent({
  label,
  caret,
  token,
}: {
  label: string
  caret?: boolean
  token: Token
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="text-v5-caption font-medium text-v5-text-tertiary">
            {label}
          </span>
          <span className="flex min-w-0 items-center gap-1 text-v5-text-primary">
            <Image
              src={token.chainIcon}
              alt=""
              width={16}
              height={16}
              className="size-4 shrink-0"
            />
            <span className="truncate text-v5-caption font-medium">
              {token.chain}
            </span>
            <ChevronDown className="size-4 shrink-0" />
          </span>
        </div>
        <span className="shrink-0 text-v5-caption font-medium text-v5-text-tertiary">
          {token.balance}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex shrink-0 items-center gap-1 rounded-[99px] bg-v5-surface-2 py-1.5 pl-1.5 pr-3">
          <div className="flex items-center gap-2">
            <Image
              src={token.coinIcon}
              alt=""
              width={36}
              height={36}
              className="size-9 shrink-0 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-v5-caption font-medium text-v5-text-primary">
                {token.coin}
              </span>
              <span className="text-v5-caption-sm font-bold text-v5-text-tertiary">
                Native
              </span>
            </div>
          </div>
          <ChevronRight className="size-5 shrink-0 text-v5-text-primary" />
        </div>
        <div className="flex min-w-0 flex-col items-end justify-center gap-1.5">
          <div className="flex items-center gap-0.5">
            <span className="truncate text-v5-title2 font-medium text-v5-text-secondary">
              {token.amount}
            </span>
            {caret && (
              <span
                aria-hidden
                className="h-7 w-px shrink-0 bg-v5-text-primary"
              />
            )}
          </div>
          <span className="text-v5-caption font-medium text-v5-text-tertiary">
            {token.fiat}
          </span>
        </div>
      </div>
    </>
  )
}

function SwapLeg({
  label,
  caret,
  settled,
  incoming,
  className,
}: {
  label: string
  caret?: boolean
  settled: Token
  incoming: Token
  className: string
}) {
  return (
    <div
      className={`grid w-full border border-v5-border-light p-4 ${className}`}
    >
      <div className={SETTLED}>
        <LegContent label={label} caret={caret} token={settled} />
      </div>
      {/* The duplicate reads as noise to a screen reader, so only the settled leg is exposed. */}
      <div className={INCOMING} aria-hidden>
        <LegContent label={label} caret={caret} token={incoming} />
      </div>
    </div>
  )
}

export default function CrossChainSwapsCard() {
  return (
    <BentoCard height="tall" className="group justify-between">
      <div className="relative flex w-full flex-col gap-2">
        <SwapLeg
          label="From"
          caret
          settled={RUNE}
          incoming={BTC}
          className="rounded-b-xl rounded-t-3xl bg-v5-surface-1"
        />
        <SwapLeg
          label="To"
          settled={BTC}
          incoming={RUNE}
          className="rounded-b-3xl rounded-t-xl bg-v5-surface-disabled"
        />
        <div className="absolute left-1/2 top-1/2 w-[69px] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute left-0.5 top-1/2 flex w-[65px] -translate-y-1/2 items-center justify-between">
            <span className="h-2 w-2.5 bg-v5-surface-dark/50" />
            <span className="h-2 w-[11px] bg-v5-surface-dark/50" />
          </div>
          <div className="relative mx-auto flex size-12 items-center justify-center rounded-full border border-v5-border-light bg-v5-surface-dark/50">
            <span className="flex size-8 items-center justify-center rounded-[18px] bg-v5-sapphire">
              <SwapArrows className="size-6 transition-transform duration-300 ease-out motion-reduce:!rotate-0 [@media(hover:hover)]:group-hover:rotate-180" />
            </span>
          </div>
        </div>
      </div>
      <BentoCopy title="Cross-chain swaps" />
    </BentoCard>
  )
}
