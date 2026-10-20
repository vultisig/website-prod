import FaqSection, { type FaqMarks } from "@/components/ui/faq-section"

import { MinusIcon, PlusIcon } from "./icons"

type FastVaultFaqItem = {
  question: string
  answer: string
}

const FAQ_ITEMS: FastVaultFaqItem[] = [
  {
    question: "Is Fast Vault less secure than Secure Vault?",
    answer:
      "Fast Vault trades one factor of device redundancy for convenience: it's a 2-of-2 setup instead of 2-of-3. It's still threshold signing with no single point of failure, which is why it's recommended for daily spending rather than long-term holdings.",
  },
  {
    question: "What happens if Vultiserver is down?",
    answer:
      "You won't be able to sign new transactions until it's back, since Fast Vault still needs both shares to reach threshold. Your funds stay exactly where they are; nothing is at risk during downtime.",
  },
  {
    question: "Can Vultiserver move my funds without me?",
    answer:
      "No. Vultiserver holds one of two shares and can only participate in a signing ceremony your device starts. It's configured so it can never initiate a transaction on its own.",
  },
  {
    question: "What if I lose my password?",
    answer:
      "Your password encrypts the server share backup that was emailed to you at setup. Vultisig can't recover it for you, so store it somewhere you won't lose it, separately from the backup itself.",
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

// This frame inks the marks in the CTA blue and draws them heavier than lucide.
const FAQ_MARKS: FaqMarks = {
  plus: <PlusIcon className="size-5" />,
  minus: <MinusIcon className="size-5" />,
  className: "text-v5-cta",
}

export default function FastVaultFaq() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <FaqSection
        className="py-9 md:py-[60px]"
        items={FAQ_ITEMS}
        marks={FAQ_MARKS}
        aside={
          <h2
            id="faq"
            className="text-v5-hero-sm font-medium text-v5-text-inverse v5wide:w-[476px] v5wide:shrink-0 v5wide:text-v5-faq-title"
          >
            Common questions about Fast Vault
          </h2>
        }
      />
    </>
  )
}
