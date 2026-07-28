import Image from "next/image"

import BentoCard, { BentoCopy } from "@/components/ui/bento-card"

/**
 * Discount-tier cards fanned out behind the top one. Only the Ultimate card is
 * fully visible; the three behind it show a sliver, so they stay as shells.
 * Widths are percentages of the 343px Figma block so the fan never overflows.
 */
type TierShell = {
  key: string
  style: string
  /** Badge ring colour peeking above the card in front of it. */
  ring?: string
  badgeSize?: string
}

const SHELLS: TierShell[] = [
  {
    key: "gold",
    style:
      "left-[9.038%] top-[30px] h-[60.62px] w-[81.924%] rounded-[13.108px] border-[0.819px] opacity-50",
  },
  {
    key: "platinum",
    style:
      "left-[4.665%] top-[43.54px] h-[67.096px] w-[90.671%] rounded-[14.507px] border-[0.907px] p-[14.507px] opacity-70",
    ring: "border-[#33e6bf] border-[0.907px]",
    badgeSize: "size-[38.082px]",
  },
  {
    key: "diamond",
    style:
      "left-[2.332%] top-[66.18px] h-[70.549px] w-[95.335%] rounded-[15.254px] border-[0.953px] p-[15.254px]",
    ring: "border-[#9747ff] border-[0.953px]",
    badgeSize: "size-[40.041px]",
  },
]

function TierFan() {
  return (
    <div className="relative h-[205px] w-full shrink-0">
      {SHELLS.map(({ key, style, ring, badgeSize }) => (
        <div
          key={key}
          className={`absolute border-v5-border-light bg-v5-surface-1 ${style}`}
        >
          {ring && (
            <span
              className={`block rounded-full bg-[#041733] ${ring} ${badgeSize}`}
            />
          )}
        </div>
      ))}
      <div className="absolute left-0 top-[92.02px] flex h-[74px] w-full items-center justify-between rounded-2xl border-2 border-v5-border-light bg-v5-surface-1 p-4">
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
  )
}

export default function HoldVultCard() {
  return (
    <BentoCard height="tall" className="justify-between">
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
