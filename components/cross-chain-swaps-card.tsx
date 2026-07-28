import Image from "next/image"

import BentoCard, { BentoCopy } from "@/components/ui/bento-card"

type Leg = {
  label: string
  chain: string
  chainIcon: string
  balance: string
  coin: string
  coinIcon: string
  amount: string
  fiat: string
  /** The From leg is the focused input, so Figma parks a caret after the amount. */
  caret?: boolean
}

const FROM: Leg = {
  label: "From",
  chain: "THORChain",
  chainIcon: "/v5/bento-chain-thorchain.svg",
  balance: "4,200.52 RUNE",
  coin: "RUNE",
  coinIcon: "/v5/bento-coin-rune.svg",
  amount: "1,000",
  fiat: "$1,116.28",
  caret: true,
}

const TO: Leg = {
  label: "To",
  chain: "Bitcoin",
  chainIcon: "/v5/bento-chain-bitcoin.svg",
  balance: "0.004 BTC",
  coin: "BTC",
  coinIcon: "/v5/bento-coin-btc.svg",
  amount: "0.0125",
  fiat: "$1,115.12",
}

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

function SwapArrows() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-6">
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

function SwapLeg({ leg, className }: { leg: Leg; className: string }) {
  return (
    <div
      className={`flex w-full flex-col gap-4 border border-v5-border-light p-4 ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="text-v5-caption font-medium text-v5-text-tertiary">
            {leg.label}
          </span>
          <span className="flex min-w-0 items-center gap-1 text-v5-text-primary">
            <Image
              src={leg.chainIcon}
              alt=""
              width={16}
              height={16}
              className="size-4 shrink-0"
            />
            <span className="truncate text-v5-caption font-medium">
              {leg.chain}
            </span>
            <ChevronDown className="size-4 shrink-0" />
          </span>
        </div>
        <span className="shrink-0 text-v5-caption font-medium text-v5-text-tertiary">
          {leg.balance}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex shrink-0 items-center gap-1 rounded-[99px] bg-v5-surface-2 py-1.5 pl-1.5 pr-3">
          <div className="flex items-center gap-2">
            <Image
              src={leg.coinIcon}
              alt=""
              width={36}
              height={36}
              className="size-9 shrink-0 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-v5-caption font-medium text-v5-text-primary">
                {leg.coin}
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
              {leg.amount}
            </span>
            {leg.caret && (
              <span
                aria-hidden
                className="h-7 w-px shrink-0 bg-v5-text-primary"
              />
            )}
          </div>
          <span className="text-v5-caption font-medium text-v5-text-tertiary">
            {leg.fiat}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function CrossChainSwapsCard() {
  return (
    <BentoCard height="tall" className="justify-between">
      <div className="relative flex w-full flex-col gap-2">
        <SwapLeg
          leg={FROM}
          className="rounded-b-xl rounded-t-3xl bg-v5-surface-1"
        />
        <SwapLeg
          leg={TO}
          className="rounded-b-3xl rounded-t-xl bg-v5-surface-disabled"
        />
        <div className="absolute left-1/2 top-1/2 w-[69px] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute left-0.5 top-1/2 flex w-[65px] -translate-y-1/2 items-center justify-between">
            <span className="h-2 w-2.5 bg-v5-surface-dark/50" />
            <span className="h-2 w-[11px] bg-v5-surface-dark/50" />
          </div>
          <div className="relative mx-auto flex size-12 items-center justify-center rounded-full border border-v5-border-light bg-v5-surface-dark/50">
            <span className="flex size-8 items-center justify-center rounded-[18px] bg-v5-sapphire">
              <SwapArrows />
            </span>
          </div>
        </div>
      </div>
      <BentoCopy title="Cross-chain swaps" />
    </BentoCard>
  )
}
