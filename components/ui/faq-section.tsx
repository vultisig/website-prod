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

type FaqSectionProps = {
  items: FaqItem[]
  title?: ReactNode
  subtitle?: ReactNode
  className?: string
}

export default function FaqSection({
  items,
  title,
  subtitle,
  className,
}: FaqSectionProps) {
  return (
    <section className={cn("bg-v5-page px-4 py-16 md:px-[30px]", className)}>
      <div className="mx-auto flex max-w-v5-content flex-col gap-10">
        {title && <SectionHeading title={title} subtitle={subtitle} />}
        <AccordionPrimitive.Root
          type="multiple"
          className="flex flex-col gap-5"
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
                  <Plus
                    className="mt-0.5 size-5 shrink-0 group-data-[state=open]:hidden"
                    aria-hidden
                  />
                  <Minus
                    className="mt-0.5 hidden size-5 shrink-0 group-data-[state=open]:block"
                    aria-hidden
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              {/* forceMount keeps every answer in the server HTML — crawlable + AI-citable */}
              <AccordionPrimitive.Content
                forceMount
                className="data-[state=closed]:hidden"
              >
                <div className="pt-5 text-v5-body-m font-normal text-v5-text-inverse [&_ul]:ml-6 [&_ul]:list-disc">
                  {item.answer}
                </div>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  )
}
