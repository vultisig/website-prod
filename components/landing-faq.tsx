import type { ReactNode } from "react"

import FaqSection from "@/components/ui/faq-section"

type LandingFaqItem = {
  question: string
  /** Rendered answer. */
  answer: ReactNode
  /** Plain-text mirror of `answer` for the FAQPage schema. */
  text: string
}

const FAQ_ITEMS: LandingFaqItem[] = [
  {
    question: "What is Vultisig?",
    answer:
      "It is a secure, multi-authentication wallet based on MPC technology that is used to manage digital assets. Transactions require approval from multiple devices.",
    text: "It is a secure, multi-authentication wallet based on MPC technology that is used to manage digital assets. Transactions require approval from multiple devices.",
  },
  {
    question: "Why should I use Vultisig over a standard wallet?",
    answer:
      "Vultisig offers enhanced security with multi-device authentication, support for many blockchains, easy recovery options, and no seed phrases or user tracking.",
    text: "Vultisig offers enhanced security with multi-device authentication, support for many blockchains, easy recovery options, and no seed phrases or user tracking.",
  },
  {
    question: "What happens if I lose one of my devices?",
    answer:
      "Yes, as long as you saved and have access to your backups when creating the vault. You can import these backups on a new device to regain access to your assets.",
    text: "Yes, as long as you saved and have access to your backups when creating the vault. You can import these backups on a new device to regain access to your assets.",
  },
  {
    question: "How do I use Vultisig to send or swap crypto?",
    answer:
      "Vultisig securely stores and manages digital assets. All actions, such as sending or swapping, require the threshold of devices to sign transactions.",
    text: "Vultisig securely stores and manages digital assets. All actions, such as sending or swapping, require the threshold of devices to sign transactions.",
  },
  {
    question: "Does using Vultisig cost anything?",
    answer: (
      <>
        <p>Vultisig is free to use.</p>
        <p className="pt-6">You only pay:</p>
        <ul>
          <li>Standard network fees when sending</li>
          <li>0.05% fee for swaps and bridges</li>
        </ul>
      </>
    ),
    text: "Vultisig is free to use. You only pay: standard network fees when sending, and a 0.05% fee for swaps and bridges.",
  },
  {
    question: "Which chains and tokens does Vultisig currently support?",
    answer:
      "Vultisig supports major cryptocurrencies and tokens, with over 30 chains and their tokens, currently available.",
    text: "Vultisig supports major cryptocurrencies and tokens, with over 30 chains and their tokens, currently available.",
  },
  {
    question: "Has Vultisig been independently audited?",
    answer:
      "Yes, Vultisig is open source and has undergone security audits. Both the audit reports and the source code are accessible.",
    text: "Yes, Vultisig is open source and has undergone security audits. Both the audit reports and the source code are accessible.",
  },
  {
    question: "What personal data does Vultisig collect?",
    answer: "Vultisig does not store any user information from its mobile apps.",
    text: "Vultisig does not store any user information from its mobile apps.",
  },
  {
    question: "What makes Vultisig different from other multisig wallets?",
    answer:
      "It is built on MPC technology, which eliminates the need for seed phrases and supports multiple blockchains, making Vultisig flexible and chain-agnostic.",
    text: "It is built on MPC technology, which eliminates the need for seed phrases and supports multiple blockchains, making Vultisig flexible and chain-agnostic.",
  },
]

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.text },
  })),
}

export default function LandingFaq() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <FaqSection
        className="py-9 md:pb-[60px] md:pt-[90px]"
        items={FAQ_ITEMS}
        aside={
          <h2
            id="faq"
            className="text-v5-hero-sm font-medium text-v5-text-inverse md:w-[476px] md:shrink-0 md:text-v5-faq-title"
          >
            Frequently Asked Questions
          </h2>
        }
      />
    </>
  )
}
