import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { LandingButton } from "@/components/ui/landing-button"
import { cn } from "@/lib/utils"

/**
 * Figma's hover for the "Learn More" CTA, timed off the button1.mov reference.
 * The fill and the label swap colours, the arrow fades out where it stands, and
 * the label slides right to re-centre on the pill without it. Everything rides
 * one 350ms ease-out: the clip fits 340-350ms on that curve in both directions,
 * and the label's travel tracks the same curve as the fill (measured 0.58 /
 * 0.70 / 0.87 of the slide at the fill's 0.58 / 0.70 / 0.87).
 *
 * The label is translated rather than letting the arrow's slot collapse, which
 * is how the sibling audit button does it: that pill is content-sized, these are
 * pinned to a fixed width, so a closing slot would drag the arrow 4px right as
 * the content re-centres and the reference holds it perfectly still. 12px is the
 * half of the arrow's 16px box plus its 8px gap that the label stops sharing.
 *
 * The arrow keeps the CTA blue instead of flipping with the label, so it
 * dissolves into the arriving fill as it fades - the clip's arrow loses
 * contrast about twice as fast as a white one would.
 *
 * The transitions are written out in full because tailwindcss-animate and
 * tailwindcss-motion both redefine `duration-*` and `ease-*`, which shadows
 * core's arbitrary values - the same trap noted in features-section.
 */
const CTA_MOTION =
  "[transition:background-color_350ms_ease-out,color_350ms_ease-out] motion-reduce:!transition-none"

/** Matches CTA_MOTION so the label re-centres on the same curve as the fill. */
const CTA_LABEL_MOTION =
  "[transition:transform_350ms_ease-out] motion-reduce:!transition-none"

/** Matches CTA_MOTION so the arrow is gone by the time the fill lands. */
const CTA_ARROW_MOTION =
  "[transition:opacity_350ms_ease-out] motion-reduce:!transition-none"

export type LearnMoreButtonProps = {
  href: string
  /** Screen-reader label, since "Learn More" alone says nothing about the target. */
  ariaLabel: string
  /** Sizing for the pill; the hover needs it pinned to a fixed width. */
  className?: string
  /** Opens in a new tab - for docs and other off-site targets. */
  external?: boolean
  children?: React.ReactNode
}

/**
 * The light "Learn More" pill used across the V5 sections, with the hover
 * documented in CTA_MOTION above.
 */
export function LearnMoreButton({
  href,
  ariaLabel,
  className,
  external = false,
  children = "Learn More",
}: LearnMoreButtonProps) {
  return (
    <LandingButton
      asChild
      variant="light"
      size="sm"
      className={cn(
        "group hover:bg-v5-cta hover:text-v5-text-primary",
        CTA_MOTION,
        className,
      )}
    >
      <Link
        href={href}
        aria-label={ariaLabel}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : null)}
      >
        <span
          className={cn(
            "translate-x-0 group-hover:translate-x-3",
            CTA_LABEL_MOTION,
          )}
        >
          {children}
        </span>
        <ArrowRight
          aria-hidden
          className={cn("text-v5-cta group-hover:opacity-0", CTA_ARROW_MOTION)}
        />
      </Link>
    </LandingButton>
  )
}
