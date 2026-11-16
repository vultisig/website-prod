import type { ReactNode } from "react"

import {
  faqPageJsonLd,
  productFaqItems,
  type ProductFaqId,
} from "@/content/product-faq"
import { RecoveryLink } from "@/components/recovery-link"
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

const SEEDLESS_ANSWER: ReactNode = (
  <p>
    Yes. Vultisig is a{" "}
    <RecoveryLink href="/seedless-wallet">seedless wallet</RecoveryLink>: there
    is no seed phrase to write down. Your key is split into key shares, so there
    is no single secret to steal, and each device exports its own backup file.
  </p>
)

/** Visible JSX for answers that need markup; the schema keeps `item.text`. */
const RICH_ANSWERS: Partial<Record<ProductFaqId, ReactNode>> = {
  cost: COST_ANSWER,
  seedless: SEEDLESS_ANSWER,
}

const FAQ_ITEMS = productFaqItems.map((item) => ({
  question: item.question,
  answer: RICH_ANSWERS[item.id] ?? item.text,
  text: item.text,
}))

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
