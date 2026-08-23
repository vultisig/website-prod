import type { ReactNode } from "react"

import {
  faqPageJsonLd,
  productFaqItems,
} from "@/content/product-faq"
import FaqSection from "@/components/ui/faq-section"

const COST_ANSWER: ReactNode = (
  <>
    <p>Vultisig is free to use.</p>
    <p className="pt-6">You only pay:</p>
    <ul>
      <li>Standard network fees when sending</li>
      <li>0.5% (50 bps) fee for swaps and bridges, reduced by $VULT tier</li>
    </ul>
  </>
)

const FAQ_ITEMS = productFaqItems.map((item) =>
  item.id === "cost"
    ? { question: item.question, answer: COST_ANSWER, text: item.text }
    : { question: item.question, answer: item.text, text: item.text },
)

export default function LandingFaq() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd(FAQ_ITEMS)),
        }}
      />
      <FaqSection
        className="py-9 md:pb-[60px] md:pt-[90px]"
        items={FAQ_ITEMS}
        aside={
          <h2
            id="faq"
            className="text-v5-hero-sm font-medium text-v5-text-inverse v5wide:w-[476px] v5wide:shrink-0 v5wide:text-v5-faq-title"
          >
            Frequently Asked Questions
          </h2>
        }
      />
    </>
  )
}
