import Image from "next/image"

import BentoCard, { BentoCopy } from "@/components/ui/bento-card"

const ROW_CLASS =
  "flex items-center gap-4 rounded-3xl border border-v5-border-light bg-v5-surface-1 px-6 py-4"

/**
 * Hovering the tile lifts the GitHub row's surface and reveals an audit badge on
 * the Trail of Bits row, sliding that row's text 40px clear of it.
 *
 * Uses the config's `v5-drift` curve, which is documented there as the bento
 * hover motion from the Figma/Lottie source. Reference travel reaches 50% at
 * ~127ms, 78% at ~197ms and settles by ~444ms; v5-drift over 500ms predicts
 * 156ms / 219ms / 500ms, so this tile runs slower than the 300ms ones.
 *
 * Note `duration-[450ms]` cannot work here: tailwindcss-animate and
 * tailwindcss-motion both redefine `duration-*`, shadowing core's arbitrary
 * values, so only theme durations resolve.
 *
 * The badge is positioned out of flow and only fades — in the reference it
 * appears at full size and briefly overlaps the text, so it is not the flex gap
 * opening up. 40px is exactly what an in-flow `size-6` icon plus `gap-4` would
 * have cost, which is why the text lands where a real icon slot would put it.
 */
/** Trail of Bits' audit badge. Stroke reads as v5-accent at ~80% coverage. */
function ShieldCheck({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2.6c2.85 1.6 5.9 2.5 9.2 2.7v6.9c0 4.3-3.7 7.6-9.2 9.4-5.5-1.8-9.2-5.1-9.2-9.4V5.3c3.3-.2 6.35-1.1 9.2-2.7Z" />
        <path d="m8.4 12.1 2.5 2.5 4.7-4.9" />
      </g>
    </svg>
  )
}

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="size-5 shrink-0"
    >
      <path
        d="M14.167 14.167V5.833H5.833M14.167 5.833 5.833 14.167"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function OpenSourceCard() {
  return (
    <BentoCard height="short" className="group justify-between">
      <ul className="flex w-full flex-col gap-3">
        <li
          className={`${ROW_CLASS} text-v5-text-primary transition-colors duration-500 ease-v5-drift [@media(hover:hover)]:group-hover:bg-v5-surface-2`}
        >
          <Image
            src="/v5/bento-github.svg"
            alt=""
            width={24}
            height={24}
            className="size-6 shrink-0"
          />
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
            <span className="truncate text-v5-body-s font-medium">
              github.com/vultisig
            </span>
            <span className="truncate text-v5-caption font-medium text-v5-text-secondary">
              All source code - public
            </span>
          </div>
          <ArrowUpRight />
        </li>
        <li className={`${ROW_CLASS} relative`}>
          <ShieldCheck
            className={`absolute left-6 top-1/2 size-6 -translate-y-1/2 text-v5-accent opacity-0 transition-opacity duration-500 ease-v5-drift [@media(hover:hover)]:group-hover:opacity-100 motion-reduce:!opacity-0`}
          />
          {/* Paired with the badge's fade: without the slide the two would sit on
              top of each other, so reduced motion has to suppress both. */}
          <div
            className={`flex min-w-0 flex-col justify-center gap-1 transition-transform duration-500 ease-v5-drift [@media(hover:hover)]:group-hover:translate-x-10 motion-reduce:!translate-x-0`}
          >
            <span className="truncate text-v5-body-s font-medium text-v5-text-primary">
              Trail of Bits
            </span>
            <span className="truncate text-v5-caption font-medium text-v5-text-secondary">
              DKLS23 protocol audit
            </span>
          </div>
        </li>
      </ul>
      <BentoCopy title="100% open source." />
    </BentoCard>
  )
}
