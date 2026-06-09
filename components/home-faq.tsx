// Homepage FAQ. Rendered with native <details> so every answer ships in the
// initial server HTML — crawlable by Google and cited by AI answer engines —
// and the FAQPage JSON-LD below mirrors the visible copy exactly (Google
// requires markup to match on-page content). Q&A pairs deliberately seed our
// pillar terms: MPC wallet, seedless/seed-phrase, and agentic (AI agent) wallet.

const FAQ_ITEMS = [
  {
    question: "What is an MPC wallet?",
    answer:
      "An MPC (Multi-Party Computation) wallet splits your private key into multiple shares held on separate devices. To sign a transaction, the devices compute the signature together without ever reconstructing the full key in one place. This removes the single point of failure that makes traditional wallets vulnerable to theft, phishing, and lost seed phrases.",
  },
  {
    question: "Does Vultisig have a seed phrase?",
    answer:
      "No. Vultisig is a seedless wallet. Your vault is secured by distributed key shares across your devices, so there is no seed phrase to write down, store, lose, or have stolen. Recovery is handled through threshold-based re-sharing using your remaining devices.",
  },
  {
    question: "Can AI agents use Vultisig?",
    answer:
      "Yes. Vultisig offers a TypeScript SDK that lets AI agents hold and move funds through MPC threshold signatures. An agent can transact without ever controlling a full private key or seed phrase, so the same distributed-key security that protects human users also protects autonomous agents. This makes Vultisig an agentic wallet built for AI-driven workflows.",
  },
  {
    question: "How is MPC different from a multisig wallet?",
    answer:
      "Multisig wallets require multiple separate on-chain signatures, which means higher gas fees, limited chain compatibility, and a visible multi-party structure on-chain. MPC wallets do the multi-party computation off-chain and produce a single standard signature — lower fees, compatibility with any chain that supports standard signatures, and no on-chain footprint revealing your security setup.",
  },
  {
    question: "Which blockchains does Vultisig support?",
    answer:
      "Vultisig supports 30+ blockchains including Bitcoin, Ethereum, Solana, THORChain, Cosmos, Polygon, Avalanche, Arbitrum, Optimism, BNB Chain, Polkadot, and Cardano — all from a single vault. There is no need to create separate wallets or manage multiple seed phrases for different networks.",
  },
  {
    question: "Is an MPC wallet safe?",
    answer:
      "MPC wallets are among the most secure approaches to crypto custody because they eliminate the single private key — the most exploited attack vector in crypto theft. Vultisig adds open-source code for public verification, independent security audits, the modern DKLS23 protocol, and a fully self-custodial architecture where no company holds any key material.",
  },
  {
    question: "Is Vultisig really free?",
    answer:
      "Yes. Vultisig is free to download and use, with no subscription fees, premium tiers, or per-transaction charges from Vultisig. The only fees you pay are swap fees and standard blockchain network (gas) fees that go to network validators. The codebase is open source and publicly auditable on GitHub.",
  },
  {
    question: "What happens if I lose one of my devices?",
    answer:
      "Your vault uses a threshold model (for example, 2-of-3), so you only need a subset of your devices to recover full access. If you lose one device, your remaining devices can re-share the vault to a replacement device — no seed phrase, no company to contact. As long as you meet the threshold, your funds are safe.",
  },
]

function FaqJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function HomeFaq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="px-6 md:px-20 py-20 max-w-4xl mx-auto"
    >
      <FaqJsonLd />
      <h2
        id="faq-heading"
        className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center"
      >
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {FAQ_ITEMS.map((item) => (
          <details
            key={item.question}
            className="group border border-borderLight bg-backgroundSecondary/70 rounded-lg px-6"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-left text-white font-medium list-none [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                aria-hidden="true"
                className="text-textSecondary transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="text-textSecondary pb-5 leading-relaxed">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
