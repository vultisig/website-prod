import Image from "next/image"

import BentoCard, { BentoCopy } from "@/components/ui/bento-card"

/**
 * Hovering the tile lifts the notification 26px, and that is the whole effect —
 * measured against the reference, the toast keeps its size, its horizontal
 * position and its opacity. It only reads as brighter at the top of the travel
 * because it clears the phone's lit bottom bezel and sits over darker screen.
 *
 * Suppressed under reduced motion: the lift is decoration, and the resting
 * position is already the complete composition.
 */
const LIFT =
  "transition-transform duration-300 ease-out [@media(hover:hover)]:group-hover:-translate-y-[26px] motion-reduce:!translate-y-0"

/** The Figma mock parks an iPhone so only its bottom edge reaches into the card. */
function PhoneMock() {
  return (
    <div className="absolute left-1/2 top-[59px] h-[194px] w-[241.317px] -translate-x-1/2">
      <div className="absolute inset-x-[1%] top-[-367px] h-[487.412px] rounded-[36.883px] bg-v5-surface-2 shadow-[inset_0px_-1.072px_4.289px_0px_rgba(255,255,255,0.2),inset_-2.144px_0px_5.146px_-3.217px_rgba(255,255,255,0.4)]" />
      <div className="absolute inset-x-[5.6%] top-[-357.57px] h-[465.968px] rounded-[30px] bg-[#071229]" />
      <div
        className={`absolute inset-x-[-3.35%] top-[19.875px] flex h-[45.073px] items-center gap-[6.829px] rounded-3xl bg-v5-surface-1/70 px-[9.561px] backdrop-blur-[51.22px] ${LIFT}`}
      >
        <Image
          src="/v5/bento-notification-icon.webp"
          alt=""
          width={60}
          height={60}
          className="size-[25.951px] shrink-0 rounded-[8.5px]"
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start gap-[10.927px] pr-[5.463px]">
            <p className="min-w-0 flex-1 truncate text-v5-notification font-semibold text-v5-text-primary">
              Join keysign
            </p>
            <span className="shrink-0 text-v5-notification-time font-normal text-v5-text-tertiary">
              9:41 AM
            </span>
          </div>
          <p className="truncate text-v5-notification font-normal text-v5-text-primary">
            MacBook Pro wants to sign
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SecureNotificationsCard() {
  return (
    <BentoCard height="short" className="group justify-end">
      <PhoneMock />
      <BentoCopy title="Secure notifications" />
    </BentoCard>
  )
}
