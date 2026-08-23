import Image from "next/image"
import Link from "next/link"

import StarField from "@/components/star-field"
import { supportedChainCountLabel } from "@/content/chain-count"
import { chainHref } from "@/content/chains"
import { cn } from "@/lib/utils"

/** Orbit diameter the desktop pill coordinates below are expressed in. */
const ORBIT = 558

type Chain = {
  name: string
  /** Brand dot colour — data, so it stays inline rather than a theme token. */
  dot: string
  /** Chain mark, taken from the vultisig-windows icon set. */
  icon: string
  /**
   * Keys into the chain data for the destination. The slug rather than the
   * path, so a chain that changes family does not have to be fixed here — and
   * `chainHref` throws on a slug that no longer exists rather than shipping a
   * dead pill.
   */
  slug: string
  /** Pill top-left inside the orbit box, in orbit pixels. */
  x: number
  y: number
}

const CHAINS: Chain[] = [
  {
    name: "MayaChain",
    dot: "#2cfffc",
    icon: "mayachain",
    x: 216,
    y: -19,
    slug: "cacao",
  },
  {
    name: "Bitcoin",
    dot: "#f7931a",
    icon: "bitcoin",
    x: 368,
    y: 19,
    slug: "btc",
  },
  {
    name: "Hyperliquid",
    dot: "#97fce4",
    icon: "hyperliquid",
    x: 458,
    y: 120,
    slug: "hype",
  },
  {
    name: "Ethereum",
    dot: "#8c8c8c",
    icon: "ethereum",
    x: 500,
    y: 259,
    slug: "eth",
  },
  {
    name: "Dogecoin",
    dot: "#ba9f33",
    icon: "dogecoin",
    x: 464,
    y: 399,
    slug: "doge",
  },
  {
    name: "BNB Chain",
    dot: "#f0b90b",
    icon: "bnb",
    x: 358,
    y: 501,
    slug: "bnb",
  },
  {
    name: "THORChain",
    dot: "#18e4cd",
    icon: "thorchain",
    x: 216,
    y: 539,
    slug: "rune",
  },
  {
    name: "Solana",
    dot: "#aa51ea",
    icon: "solana",
    x: 93,
    y: 501,
    slug: "sol",
  },
  { name: "TRON", dot: "#ff060a", icon: "tron", x: -9, y: 399, slug: "trx" },
  {
    name: "XRP Ledger",
    dot: "#ffffff",
    icon: "xrp",
    x: -62,
    y: 259,
    slug: "xrp",
  },
  { name: "Zcash", dot: "#f3b724", icon: "zcash", x: -10, y: 119, slug: "zec" },
  {
    name: "Polygon",
    dot: "#6600ff",
    icon: "polygon",
    x: 89,
    y: 19,
    slug: "pol",
  },
]

function percent(value: number): string {
  return `${(value / ORBIT) * 100}%`
}

/**
 * Hovering a pill lifts its surface and trades the brand dot for the chain's
 * own mark, which widens the pill and carries the name along.
 *
 * All of it over one 380ms run, measured off the reference: the surface climbs
 * from lum 39 to 57 between 4.22s and 4.60s there, reaching half way at 48% of
 * the run — so linear, which is what the utilities' default curve is close
 * enough to at this length.
 *
 * The lifted fill is surface-2 under 9% white. Solving the reference's measured
 * fill per channel gives alpha 0.080 / 0.088 / 0.094, which is one overlay
 * rather than a jump to another surface token.
 *
 * `duration-[380ms]` cannot be used: tailwindcss-animate and tailwindcss-motion
 * both redefine `duration-*` and shadow core's arbitrary values.
 */
const RUN = "[transition-duration:380ms]"

/**
 * The mark is a different graphic from the dot, so those two do crossfade. The
 * name only slides — the reference dissolves between two pill variants and shows
 * the label at both positions at once, which would read as a blur on a real page.
 *
 * Reduced motion keeps the surface lift, which is not motion, and drops the
 * swap: without the width change the 16px mark would spill past its 8px slot.
 *
 * The pill carries `hover:` rather than `group-hover:` for its own fill — it is
 * the element holding `group`, and an element is not its own group ancestor.
 * `max-w-none` on the mark keeps the preflight's `max-width:100%` from clamping
 * it to the slot, which would scale it up from 8px instead of holding full size.
 */
function ChainPill({ name, dot, icon, x, y, slug }: Chain) {
  return (
    <li
      style={{ left: percent(x), top: percent(y) }}
      className="static md:absolute"
    >
      <Link
        href={chainHref(slug)}
        className={`group flex h-[38px] items-center gap-2 whitespace-nowrap rounded-[10px] border border-v5-border-light bg-v5-surface-2 px-[17px] text-v5-body-s font-medium text-v5-text-primary backdrop-blur-[2px] transition-colors ${RUN} [@media(hover:hover)]:hover:border-[#263b5a] [@media(hover:hover)]:hover:bg-[#263b5a]`}
      >
        <span
          aria-hidden
          className={`relative h-4 w-2 shrink-0 transition-[width] ${RUN} [@media(hover:hover)]:group-hover:w-4 motion-reduce:!w-2`}
        >
          <span
            style={{ backgroundColor: dot }}
            className={`absolute left-0 top-1/2 size-2 -translate-y-1/2 rounded-full transition-opacity ${RUN} [@media(hover:hover)]:group-hover:opacity-0 motion-reduce:!opacity-100`}
          />
          <Image
            src={`/v5/chains-${icon}.svg`}
            alt=""
            width={16}
            height={16}
            className={`absolute left-0 top-1/2 size-4 max-w-none -translate-y-1/2 opacity-0 transition-opacity ${RUN} [@media(hover:hover)]:group-hover:opacity-100 motion-reduce:!opacity-0`}
          />
        </span>
        {name}
      </Link>
    </li>
  )
}

type ChainsSectionProps = {
  /** Anchor id — only the landing instance owns "chains". */
  id?: string
  /** Figma sets Title2 on /mpc and Body M on the landing page. */
  captionClassName?: string
}

export default function ChainsSection({
  id,
  captionClassName = "text-v5-body-m",
}: ChainsSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-24 bg-v5-page pt-4 md:px-[30px] md:pt-[30px]"
    >
      <div className="mx-auto max-w-v5-content">
        <div className="relative isolate flex flex-col items-center gap-8 overflow-hidden rounded-[20px] bg-v5-surface-dark px-4 pb-12 pt-5 md:gap-[60px] md:rounded-v5-panel md:p-[60px]">
          <StarField />
          <h2 className="text-center text-v5-display-sm font-medium text-v5-text-primary md:text-v5-headline">
            One Vault.{" "}
            <span className="text-v5-accent">
              {supportedChainCountLabel} Blockchains.
            </span>
          </h2>

          <div className="flex flex-col items-center gap-8 md:relative md:size-[558px] md:rounded-full md:border md:border-v5-border-ring">
            <Image
              src="/v5/vultisig-mark.svg"
              alt="Vultisig vault"
              width={82}
              height={82}
              className="size-16 md:absolute md:left-1/2 md:top-1/2 md:size-[82px] md:-translate-x-1/2 md:-translate-y-1/2"
            />
            <ul className="flex flex-wrap justify-center gap-3 md:contents">
              {CHAINS.map((chain) => (
                <ChainPill key={chain.name} {...chain} />
              ))}
            </ul>
          </div>

          <p
            className={cn(
              "text-center font-normal text-v5-text-secondary",
              captionClassName,
            )}
          >
            Multi-chain support built-in. No additional setup required.
          </p>
        </div>
      </div>
    </section>
  )
}
