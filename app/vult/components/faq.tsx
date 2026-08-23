import {
  faqPageJsonLd,
  productFaqItems,
  type ProductFaqId,
} from "@/content/product-faq"
import FaqSection from "@/components/ui/faq-section"

const VULT_FAQ_IDS: ProductFaqId[] = ["what", "whyMpc", "lostDevice"]

const FAQ_ITEMS = productFaqItems.filter((item) =>
  VULT_FAQ_IDS.includes(item.id),
)

export default function VultFaq() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqPageJsonLd(
              FAQ_ITEMS.map((item) => ({
                question: item.question,
                text: item.text,
              })),
            ),
          ),
        }}
      />
      <FaqSection
        className="py-9 md:py-[60px]"
        items={FAQ_ITEMS.map((item) => ({
          question: item.question,
          answer: item.text,
        }))}
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
