import Image from "next/image"

import BentoCard, { BentoCopy } from "@/components/ui/bento-card"
import { cn } from "@/lib/utils"

/**
 * The chain grid, laid out as Figma has it. Each row is wider than the card and
 * overhangs both edges, which is what gives the hover drift somewhere to
 * travel: on hover, neighbouring rows slide half a column in opposite
 * directions, so clipped pills come into view and vice versa.
 *
 * Offsets are percentages of the 403x423 art board so the grid scales with the
 * card rather than pinning to one breakpoint. The shift is half the 88.6px
 * column pitch measured against the row's own width, since that is what a
 * percentage translate resolves against.
 */
const ROWS = [
  {
    top: "8.5189%",
    left: "-21.0463%",
    shift: "group-hover:-translate-x-[8.4309%]",
  },
  {
    top: "25.0591%",
    left: "-6.85%",
    shift: "group-hover:translate-x-[8.4309%]",
  },
  {
    top: "41.6159%",
    left: "-21.0463%",
    shift: "group-hover:-translate-x-[8.4309%]",
  },
] as const

/** Figma paints the card with a solid base under a linear gradient. */
const BACKDROP = "bg-[linear-gradient(-18.94deg,#2f63ec_7.87%,#0439c7_92.13%)]"

export default function ChainsCard() {
  return (
    <BentoCard height="tall" className={cn("group justify-end", BACKDROP)}>
      {/* Sized to the art board's aspect so the rows track the card's width,
          the way the flattened artwork used to be covered and top-anchored. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 aspect-[403/423]">
        {ROWS.map((row, index) => (
          <div
            key={row.top}
            style={{ top: row.top, left: row.left }}
            className={cn(
              "absolute h-[16.0673%] w-[130.3773%] translate-x-0 transition-transform",
              "duration-700 ease-v5-drift",
              "motion-reduce:transition-none motion-reduce:group-hover:translate-x-0",
              row.shift,
            )}
          >
            <Image
              src={`/v5/bento-chains-row-${index + 1}.webp`}
              alt=""
              fill
              sizes="(max-width: 1023px) 130vw, 44vw"
              className="object-fill"
            />
          </div>
        ))}
      </div>
      <BentoCopy
        title={
          <>
            30+ chains.
            <br />
            One vault.
          </>
        }
        body="Bitcoin to Solana to Cosmos - every major chain, natively supported. No bridging needed."
      />
    </BentoCard>
  )
}
