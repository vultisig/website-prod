import FaqSection from "@/components/ui/faq-section"

type AgentFaqItem = {
  question: string
  answer: string
}

const FAQ_ITEMS: AgentFaqItem[] = [
  {
    question: "What happens if I lose one of my devices?",
    answer:
      "Your vault uses a threshold model (e.g., 2-of-3), meaning you only need a subset of your devices to recover full access. If you lose one device, your remaining devices can re-share the vault to a new replacement device. No seed phrase needed, no company to contact. As long as you meet the threshold, your funds are safe.",
  },
  {
    question: "What is an MPC wallet",
    answer:
      "An MPC (Multi-Party Computation) wallet is a crypto wallet that splits your private key into multiple shares distributed across separate devices. When you sign a transaction, these devices compute the signature together without ever combining the key shares into a single private key. This eliminates the single point of failure that makes traditional wallets vulnerable to theft, phishing, and human error.",
  },
  {
    question: "How is MPC different from a multisig wallet?",
    answer:
      "Multisig wallets require multiple separate on-chain signatures, which means higher gas fees, limited chain compatibility, and visible multi-party transaction structures. MPC wallets perform all the multi-party computation off-chain and produce a single standard signature. This means lower fees, compatibility with any blockchain that supports standard signatures, and no on-chain footprint revealing your security setup.",
  },
  {
    question: "Can I use Vultisig for DeFi and swaps?",
    answer:
      "Yes. Vultisig supports native in-app swaps via THORChain and 1inch, plus full DeFi interaction through the Vultisig web extension. Because MPC transactions look identical to standard transactions on-chain, Vultisig is compatible with every DeFi protocol, DEX, and dApp that works with regular wallet signatures.",
  },
  {
    question: "Is Vultisig really free? What's the catch?",
    answer:
      "There is no catch. Vultisig is fully free and open source. There are no premium tiers, no subscription fees. The Vultisig codebase is publicly auditable on GitHub. Revenue comes from optional services and integrations like swap fees or plugins, not from charging users for basic wallet security.",
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

export default function ForAgentsFaq() {
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
