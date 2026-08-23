import { supportedChainCountLabel } from "@/content/chain-count"

/** Stable id so pages can override one answer (JSX cost copy) without forking the list. */
export type ProductFaqId =
  | "what"
  | "whyMpc"
  | "lostDevice"
  | "sendSwap"
  | "cost"
  | "chains"
  | "audit"
  | "privacy"
  | "vsMultisig"

/** One Q&A. `text` is the schema string and the default visible answer. */
export type ProductFaqItem = {
  id: ProductFaqId
  question: string
  text: string
}

/**
 * Shared product FAQ. Homepage, support, and $VULT all render from this list
 * so the answers cannot drift.
 */
export const productFaqItems: ProductFaqItem[] = [
  {
    id: "what",
    question: "What is the Vultisig MPC wallet?",
    text: "Vultisig is a free MPC wallet. It uses multi-party computation for multi-device authentication, so you manage digital assets without a seed phrase. Transactions require approval from multiple devices.",
  },
  {
    id: "whyMpc",
    question: "Why use an MPC wallet instead of a standard wallet?",
    text: `Vultisig offers enhanced security with multi-device authentication, support for ${supportedChainCountLabel} blockchains, easy recovery options, and no seed phrases or user tracking.`,
  },
  {
    id: "lostDevice",
    question: "What happens if I lose one of my devices?",
    text: "If you saved your vault backups when creating the vault, import them on a new device to regain access to your assets.",
  },
  {
    id: "sendSwap",
    question: "How do I send or swap crypto in Vultisig?",
    text: "Vultisig securely stores and manages digital assets. Sending or swapping requires your device threshold to sign the transaction.",
  },
  {
    id: "cost",
    question: "Is Vultisig free to use?",
    text: "Vultisig is free to use. You only pay: standard network fees when sending, and a 0.5% (50 bps) fee for swaps and bridges, reduced by your $VULT tier.",
  },
  {
    id: "chains",
    question: "Which blockchains does Vultisig support?",
    text: `Vultisig supports ${supportedChainCountLabel} chains and their tokens from a single vault, including major networks such as Bitcoin, Ethereum, and Solana.`,
  },
  {
    id: "audit",
    question: "Has Vultisig been independently audited?",
    text: "Yes. Vultisig is open source and has undergone security audits. The audit reports and the source code are public.",
  },
  {
    id: "privacy",
    question: "What personal data does Vultisig collect?",
    text: "Vultisig does not store any user information from its mobile apps.",
  },
  {
    id: "vsMultisig",
    question: "How is Vultisig different from a multisig wallet?",
    text: `Vultisig is built on MPC technology, which eliminates the need for seed phrases and supports ${supportedChainCountLabel} blockchains, making it flexible and chain-agnostic.`,
  },
]

type FaqJsonLd = {
  "@context": "https://schema.org"
  "@type": "FAQPage"
  mainEntity: {
    "@type": "Question"
    name: string
    acceptedAnswer: { "@type": "Answer"; text: string }
  }[]
}

/** FAQPage JSON-LD from the visible Q&A strings. */
export function faqPageJsonLd(
  items: { question: string; text: string }[],
): FaqJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.text },
    })),
  }
}
