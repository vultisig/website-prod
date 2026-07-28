import Image from "next/image"

import BentoCard, { BentoCopy } from "@/components/ui/bento-card"

const BADGE_CLASS =
  "shrink-0 rounded-[99px] border border-v5-border-faint bg-v5-surface-2 px-4 py-2 text-v5-caption font-medium text-v5-text-secondary"

export default function MofNSigningCard() {
  return (
    <BentoCard height="tall" className="justify-between">
      <ul className="flex w-full flex-col gap-3 pt-5">
        <li className="flex h-[68px] items-center gap-3 rounded-3xl border border-v5-border-light bg-v5-surface-1 p-4">
          <Image
            src="/v5/hiw-device-iphone.svg"
            alt=""
            width={32}
            height={32}
            className="size-8 shrink-0 drop-shadow-[0px_1.131px_0.887px_rgba(0,0,0,0.08)]"
          />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-v5-body-s font-medium text-v5-white">
              iPhone
            </span>
            <span className="text-v5-caption font-medium text-v5-success">
              This device
            </span>
          </div>
          <span className={BADGE_CLASS}>1 of 3</span>
        </li>
        <li className="flex h-[68px] items-center gap-3 rounded-3xl border border-dashed border-v5-border-faint bg-v5-surface-1/50 p-4 shadow-[0px_-4px_12px_0px_rgba(3,13,29,0.35)]">
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
          <span className={BADGE_CLASS}>2 of 3</span>
        </li>
      </ul>
      <BentoCopy
        title="M-of-N signing."
        body="Every transaction requires your threshold of devices. No single device can act alone."
      />
    </BentoCard>
  )
}
