import Image from "next/image"

import BentoCard, { BentoCopy } from "@/components/ui/bento-card"

/**
 * Hovering the tile fades the vault diagram in, and that is the whole effect:
 * the art holds its size and position in Figma's hover variant, so only opacity
 * moves.
 *
 * Figma hangs the art group at (37, -46) in a 403x277 tile, which is what cuts
 * the top-right share tile off against the card's top edge — BentoCard's
 * `overflow-hidden` reproduces that, so the lift has to stay rather than being
 * flattened to `top-0`. It is written as -22.33% of the art's own height, which
 * is the same -46px once the box scales.
 *
 * Out of flow so the copy does not shift: the tile is `justify-end`, and the
 * variant keeps the copy in the same place in both states.
 *
 * The 329px cap holds the composition at its design size on the single-column
 * breakpoints, where a tile runs to twice Figma's width and a purely
 * proportional box would drop the diagram over the copy.
 */
const FADE_IN =
  "opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100 motion-reduce:!opacity-0"

export default function MaxSecurityCard() {
  return (
    <BentoCard height="short" className="group justify-end">
      <Image
        src="/v5/bento-max-security.svg"
        alt=""
        aria-hidden
        width={329}
        height={206}
        className={`pointer-events-none absolute left-[9.1811%] top-0 h-auto w-[81.6377%] max-w-[329px] -translate-y-[22.3301%] ${FADE_IN}`}
      />
      <BentoCopy
        title="Maximum security"
        body="Your vault shares can be stored anywhere without risk. No single piece can compromise your funds."
      />
    </BentoCard>
  )
}
