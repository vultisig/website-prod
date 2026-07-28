import FaqSection from "@/components/ui/faq-section"

type VultFaqItem = {
  question: string
  answer: string
}

const FAQ_ITEMS: VultFaqItem[] = [
  {
    question: "What is Vultisig?",
    answer:
      "It is a secure, multi-authentication wallet based on MPC technology that is used to manage digital assets. Transactions require approval from multiple devices.",
  },
  {
    question: "Why should I use Vultisig over a standard wallet?",
    answer:
      "Vultisig offers enhanced security with multi-device authentication, support for many blockchains, easy recovery options, and no seed phrases or user tracking.",
  },
  {
    question: "What happens if I lose one of my devices?",
    answer:
      "Yes, as long as you saved and have access to your backups when creating the vault. You can import these backups on a new device to regain access to your assets.",
  },
]

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
}

export default function VultFaq() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <FaqSection
        className="py-9 md:py-[60px]"
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
