import Image from "next/image"

import BentoCard, { BentoCopy } from "@/components/ui/bento-card"

/**
 * Discount-tier cards fanned out behind the top one. At rest only the Ultimate
 * card is fully visible; the ones behind it show a sliver, so they stay as
 * shells. Widths are percentages of the 343px Figma block so the fan never
 * overflows.
 */
type TierShell = {
  key: string
  style: string
  /** Hover travel. Written out in full because Tailwind only sees literals. */
  slide: string
  /** Badge ring colour peeking above the card in front of it. */
  ring?: string
  badgeSize?: string
}

/** Gold and platinum never gain content; diamond does, so it lives inline below. */
const SHELLS: TierShell[] = [
  {
    key: "gold",
    style:
      "left-[9.038%] top-[30px] h-[60.62px] w-[81.924%] rounded-[13.108px] border-[0.819px] opacity-50",
    slide: "[@media(hover:hover)]:group-hover:translate-y-[2px]",
  },
  {
    key: "platinum",
    style:
      "left-[4.665%] top-[43.54px] h-[67.096px] w-[90.671%] rounded-[14.507px] border-[0.907px] p-[14.507px] opacity-70",
    slide: "[@media(hover:hover)]:group-hover:translate-y-[5px]",
    ring: "border-[#33e6bf] border-[0.907px]",
    badgeSize: "size-[38.082px]",
  },
]

/**
 * Hovering the tile fans the deck open. Every card travels, each roughly 3x the
 * one behind it (2 / 5 / 16 / 48px), so the deck spreads instead of the front
 * card sliding off a static stack.
 *
 * The 3x ratio and the 48px front travel are both pinned by the reference: its
 * diamond card moves ~15.5px against the Ultimate card's ~47px, and the 31.5px
 * between them is exactly what it takes to uncover the diamond badge — any less
 * and the Ultimate card clips it, since the badge sits 15.25px below its own
 * card's top edge.
 *
 * Under reduced motion the whole reveal is suppressed rather than snapped: the
 * uncovering *is* the effect, so a version without the travel would leave the
 * diamond row hidden behind a card that never moved.
 */
const REVEAL =
  "opacity-0 transition-opacity duration-300 ease-out [@media(hover:hover)]:group-hover:opacity-100 motion-reduce:!opacity-0"

const MOVE = "transition-transform duration-300 ease-out motion-reduce:!translate-y-0"

/**
 * The diamond tier's radial burst. Hand-drawn rather than exported: the badge
 * ring already exists as a bordered circle, and only the petals inside it are
 * missing. Petals sit at 22.5deg offsets so none points straight up, per Figma.
 *
 * Endpoints are precomputed instead of rotating each petal, because a
 * `userSpaceOnUse` gradient resolves in the referencing element's own
 * coordinate system — rotating the petal rotates its gradient with it, and
 * every petal ends up sampling the same purple end.
 */
const BURST_PETALS = Array.from({ length: 8 }, (_, i) => {
  const rad = ((22.5 + i * 45) * Math.PI) / 180
  const at = (r: number) =>
    [12 + r * Math.sin(rad), 12 - r * Math.cos(rad)].map(
      (n) => Math.round(n * 100) / 100,
    ) as [number, number]
  const [x1, y1] = at(4)
  const [x2, y2] = at(8.6)
  return { x1, y1, x2, y2 }
})

function TierBurst({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient
          id="tier-burst"
          gradientUnits="userSpaceOnUse"
          x1="12"
          y1="4"
          x2="12"
          y2="20"
        >
          <stop stopColor="#9747ff" />
          <stop offset="1" stopColor="#33e6bf" />
        </linearGradient>
      </defs>
      <g stroke="url(#tier-burst)" strokeWidth="2" strokeLinecap="round">
        {BURST_PETALS.map((p) => (
          <line key={`${p.x1}-${p.y1}`} {...p} />
        ))}
      </g>
    </svg>
  )
}

function TierFan() {
  return (
    <div className="relative h-[205px] w-full shrink-0">
      {SHELLS.map(({ key, style, slide, ring, badgeSize }) => (
        <div
          key={key}
          className={`absolute border-v5-border-light bg-v5-surface-1 ${style} ${MOVE} ${slide}`}
        >
          {ring && (
            <span
              className={`block rounded-full bg-[#041733] ${ring} ${badgeSize}`}
            />
          )}
        </div>
      ))}

      {/* Diamond: a shell at rest, a full row once the Ultimate card slides clear. */}
      <div
        className={`absolute left-[2.332%] top-[66.18px] flex h-[70.549px] w-[95.335%] items-center justify-between gap-2 rounded-[15.254px] border-[0.953px] border-v5-border-light bg-v5-surface-1 p-[15.254px] ${MOVE} [@media(hover:hover)]:group-hover:translate-y-[16px]`}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="relative block size-[40.041px] shrink-0 rounded-full border-[0.953px] border-[#9747ff] bg-[#041733]">
            <TierBurst className={`absolute inset-[6%] ${REVEAL}`} />
          </span>
          <span
            className={`truncate text-v5-title3 font-medium text-v5-text-primary ${REVEAL}`}
          >
            Diamond
          </span>
        </div>
        <span
          className={`shrink-0 text-v5-footnote font-medium text-v5-text-secondary ${REVEAL}`}
        >
          Discount: 35bps
        </span>
      </div>

      <div
        className={`absolute left-0 top-[92.02px] h-[74px] w-full rounded-2xl border-2 border-v5-border-light bg-v5-surface-1 ${MOVE} [@media(hover:hover)]:group-hover:translate-y-[48px] [@media(hover:hover)]:group-hover:scale-105 motion-reduce:!scale-100`}
      >
        {/* Sapphire fill as its own layer: background-image cannot transition
            from `none` to a gradient, so the highlight fades in instead.
            -inset-2px covers the card's own border ring as well. */}
        <span
          className={`absolute -inset-[2px] rounded-[18px] bg-gradient-to-r from-[#133fcd] to-[#295ae8] ${REVEAL}`}
        />
        <div className="relative flex h-full w-full items-center justify-between p-4">
          <div className="flex min-w-0 items-center gap-2">
            <Image
              src="/v5/bento-tier-ultimate.webp"
              alt=""
              width={168}
              height={168}
              className="size-[42px] shrink-0 rounded-full shadow-[0px_3.16px_8.138px_0px_rgba(0,0,0,0.25)]"
            />
            <span className="truncate text-v5-title3 font-medium text-v5-text-primary">
              Ultimate
            </span>
          </div>
          <span className="shrink-0 text-v5-footnote font-medium text-v5-text-secondary">
            No Fee
          </span>
        </div>
      </div>
    </div>
  )
}

export default function HoldVultCard() {
  return (
    <BentoCard height="tall" className="group justify-between">
      <TierFan />
      <BentoCopy
        title={
          <>
            Hold $VULT.
            <br />
            Trade for free.
          </>
        }
        body={
          <>
            Reduce swap fees from 50bps down to 0.
            <br />
            Six tiers - starting at 1,500 $VULT.
          </>
        }
      />
    </BentoCard>
  )
}
