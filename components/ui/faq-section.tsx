"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Minus, Plus } from "lucide-react"
import type { ReactNode } from "react"

import SectionHeading from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

export type FaqItem = {
  question: string
  answer: ReactNode
}

/**
 * The answer opens and closes on a row track rather than a height.
 *
 * `forceMount` keeps every answer in the server HTML, which is what makes them
 * crawlable — but it also means Radix never hides the panel itself and never
 * measures it, so neither its own exit animation nor
 * `--radix-accordion-content-height` is available here. A grid whose single row
 * runs 0fr to 1fr animates to the content's real height without one being
 * declared, and the same transition plays in reverse on close.
 *
 * `visibility` rides along so a closed answer leaves the accessibility tree, as
 * it did when this was `display: none`. It is a discrete property: going closed
 * it holds until the run finishes, going open it flips immediately, which is
 * exactly the timing the panel wants.
 *
 * The track sits on a child rather than on Content itself. To measure a panel,
 * Radix writes `transition-duration: 0s` inline on that node, reads it back,
 * then restores what was there before — which for a class-driven duration is
 * nothing. The read forces the flush, so the row reaches its new size while the
 * run is still pinned at zero and the panel snaps. A child it never writes to
 * keeps its own timing, and `transition-duration` does not inherit.
 *
 * Durations are arbitrary properties because tailwindcss-animate and
 * tailwindcss-motion both redefine `duration-*`, the same reason
 * `chains-section` spells its own out.
 */
const RUN =
  "[transition-duration:300ms] [transition-timing-function:cubic-bezier(0.5,0,0,1)] motion-reduce:[transition-duration:0ms]"

const PANEL_OPEN = `invisible grid grid-rows-[0fr] [transition-property:grid-template-rows,visibility] ${RUN} group-data-[state=open]/answer:visible group-data-[state=open]/answer:grid-rows-[1fr]`

/** Same run as the panel, so the mark lands as the answer settles. */
const MARK = `[transition-property:transform,opacity] ${RUN}`

type FaqSectionProps = {
  items: FaqItem[]
  title?: ReactNode
  subtitle?: ReactNode
  /** Heading block rendered beside the list instead of centred above it. */
  aside?: ReactNode
  className?: string
  /**
   * Turns the content block into a tinted panel. The chain-family pages sit the
   * FAQ on a coloured card rather than the page surface.
   */
  panelClassName?: string
}

export default function FaqSection({
  items,
  title,
  subtitle,
  aside,
  className,
  panelClassName,
}: FaqSectionProps) {
  return (
    <section className={cn("bg-v5-page px-4 py-16 md:px-[30px]", className)}>
      <div
        className={cn(
          "mx-auto flex max-w-v5-content flex-col gap-10",
          aside &&
            "v5wide:flex-row v5wide:items-start v5wide:justify-center v5wide:gap-[50px]",
          panelClassName,
        )}
      >
        {title && <SectionHeading title={title} subtitle={subtitle} />}
        {aside}
        <AccordionPrimitive.Root
          type="multiple"
          className={cn(
            "flex flex-col gap-3 md:gap-5",
            aside && "v5wide:w-[810px] v5wide:shrink-0",
          )}
        >
          {items.map((item, index) => (
            <AccordionPrimitive.Item
              key={item.question}
              value={`faq-${index}`}
              className="rounded-3xl border border-v5-border-faint bg-v5-white px-5 py-6"
            >
              <AccordionPrimitive.Header>
                <AccordionPrimitive.Trigger className="group flex w-full items-start justify-between gap-5 text-left text-v5-text-inverse">
                  <span className="text-v5-title2 font-medium">
                    {item.question}
                  </span>
                  {/* Stacked so the two marks cross over each other in place. */}
                  <span aria-hidden className="relative mt-0.5 size-5 shrink-0">
                    <Plus
                      className={`absolute inset-0 size-5 ${MARK} group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0`}
                    />
                    <Minus
                      className={`absolute inset-0 size-5 -rotate-90 opacity-0 ${MARK} group-data-[state=open]:rotate-0 group-data-[state=open]:opacity-100`}
                    />
                  </span>
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              {/* forceMount keeps every answer in the server HTML — crawlable + AI-citable */}
              <AccordionPrimitive.Content forceMount className="group/answer">
                <div className={PANEL_OPEN}>
                  <div className="overflow-hidden">
                    <div className="pt-5 text-v5-body-m font-normal text-v5-text-inverse [&_ul]:ml-6 [&_ul]:list-disc">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  )
}
