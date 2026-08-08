import Image from "next/image"

import BentoCard, { BentoCopy } from "@/components/ui/bento-card"

/**
 * Hovering the tile fades the vault-shares diagram in. That is the whole effect:
 * measured against the reference the art holds its size and position — its
 * bounding box stays centred on the card's axis at a constant width from the
 * first frame it is visible, so only opacity moves.
 *
 * Absolutely positioned so the copy does not shift. The tile is `justify-end`
 * with the copy pinned to the bottom, and in the reference that copy sits at the
 * same place in both states, which an in-flow art block would break.
 *
 * `fill` rather than intrinsic dimensions: the art carries its own dark surround
 * that blends into the tile, so the box is what places it, not its pixel size.
 */
const FADE_IN =
  "opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100 motion-reduce:!opacity-0"

export default function MaxSecurityCard() {
  return (
    <BentoCard height="short" className="group justify-end">
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 aspect-[420/200] ${FADE_IN}`}
      >
        <Image
          src="/v5/bento-max-security.webp"
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-contain"
        />
      </div>
      <BentoCopy
        title="Maximum security"
        body="Your vault shares can be stored anywhere without risk. No single piece can compromise your funds."
      />
    </BentoCard>
  )
}
