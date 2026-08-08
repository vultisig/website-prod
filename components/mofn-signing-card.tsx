import Image from "next/image"

import BentoCard, { BentoCopy } from "@/components/ui/bento-card"

const BADGE_CLASS =
  "shrink-0 rounded-[99px] border border-v5-border-faint bg-v5-surface-2 px-4 py-2 text-v5-caption font-medium text-v5-text-secondary"

const ROW_CLASS = "flex h-[68px] items-center gap-3 rounded-3xl p-4"

/**
 * Hovering the tile admits a second device: the MacBook row fades in and the
 * pending row slides down past it, its badge counting on from 2 of 3 to 3 of 3.
 *
 * One 400ms run for all three, measured off the reference — the pending row
 * travels 81px there against the 80px this layout gives it, and its slide and
 * the MacBook's fade share a window. Curve is the utilities' default ease-in-out,
 * which tracked the reference more closely than `v5-drift` did (53% vs a measured
 * 56% at a third of the way, where drift was already at 75%).
 *
 * `duration-[400ms]` cannot be used: tailwindcss-animate and tailwindcss-motion
 * both redefine `duration-*` and shadow core's arbitrary values, so this goes
 * through an arbitrary property instead.
 */
const RUN = "[transition-duration:400ms]"

/**
 * The MacBook row is out of flow so it costs no height at rest, which is what
 * lets the pending row sit in its slot until hover. `top` is the sum of the
 * list's pt-5, the iPhone row's 68px and one 12px gap.
 */
const MACBOOK_SLOT = "absolute inset-x-0 top-[100px]"

/** Held apart from the reference's own timing, which drifts out of step: there
 *  the badge swaps ~700ms late and on one cycle flips mid-way through the
 *  opposite transition, so it reads as a prototype variant swap rather than
 *  something designed. The count is the row's ordinal, so it moves with the row. */
function PendingBadge() {
  return (
    <span className="grid shrink-0">
      <span
        className={`${BADGE_CLASS} col-start-1 row-start-1 transition-opacity ${RUN} [@media(hover:hover)]:group-hover:opacity-0 motion-reduce:!opacity-100`}
      >
        2 of 3
      </span>
      <span
        aria-hidden
        className={`${BADGE_CLASS} col-start-1 row-start-1 opacity-0 transition-opacity ${RUN} [@media(hover:hover)]:group-hover:opacity-100 motion-reduce:!opacity-0`}
      >
        3 of 3
      </span>
    </span>
  )
}

function JoinedDevice({
  icon,
  name,
  status,
  position,
}: {
  icon: string
  name: string
  status: string
  position: string
}) {
  return (
    <>
      <Image
        src={icon}
        alt=""
        width={32}
        height={32}
        className="size-8 shrink-0 drop-shadow-[0px_1.131px_0.887px_rgba(0,0,0,0.08)]"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-v5-body-s font-medium text-v5-white">{name}</span>
        <span className="text-v5-caption font-medium text-v5-success">
          {status}
        </span>
      </div>
      <span className={BADGE_CLASS}>{position}</span>
    </>
  )
}

export default function MofNSigningCard() {
  return (
    <BentoCard height="tall" className="group justify-between">
      <ul className="relative flex w-full flex-col gap-3 pt-5">
        <li
          className={`${ROW_CLASS} border border-v5-border-light bg-v5-surface-1`}
        >
          <JoinedDevice
            icon="/v5/hiw-device-iphone.svg"
            name="iPhone"
            status="This device"
            position="1 of 3"
          />
        </li>

        <li
          aria-hidden
          className={`${ROW_CLASS} ${MACBOOK_SLOT} border border-v5-border-light bg-v5-surface-1 opacity-0 transition-opacity ${RUN} [@media(hover:hover)]:group-hover:opacity-100 motion-reduce:!opacity-0`}
        >
          <JoinedDevice
            icon="/v5/hiw-device-macbook.svg"
            name="MacBook"
            status="Connected"
            position="2 of 3"
          />
        </li>

        {/* Relative so it keeps painting over the absolute MacBook row it slides
            across — the upward shadow is drawn for exactly that overlap. */}
        <li
          className={`${ROW_CLASS} relative border border-dashed border-v5-border-faint bg-v5-surface-1/50 shadow-[0px_-4px_12px_0px_rgba(3,13,29,0.35)] transition-transform ${RUN} [@media(hover:hover)]:group-hover:translate-y-20 motion-reduce:!translate-y-0`}
        >
          <span className="relative size-8 shrink-0">
            <Image
              src="/v5/hiw-device-pending-ring.svg"
              alt=""
              width={32}
              height={32}
              className="size-full"
            />
            <Image
              src="/v5/hiw-device-pending-glyph.svg"
              alt=""
              width={16}
              height={16}
              className="absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </span>
          <span className="min-w-0 flex-1 text-v5-footnote font-medium text-v5-text-secondary">
            Waiting for device to join
          </span>
          <PendingBadge />
        </li>
      </ul>
      <BentoCopy
        title="M-of-N signing."
        body="Every transaction requires your threshold of devices. No single device can act alone."
      />
    </BentoCard>
  )
}
