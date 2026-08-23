import FaqSection from "@/components/ui/faq-section"

type BuilderFaqItem = {
  question: string
  /** Paragraphs; rendered in order. Lines starting with "- " become a list. */
  paragraphs: string[]
}

const FAQ_ITEMS: BuilderFaqItem[] = [
  {
    question: "What is an AI agent crypto wallet?",
    paragraphs: [
      "An AI agent crypto wallet combines secure self-custody with programmable automation.",
      "Instead of manually signing every action, you can install agents that execute tasks on your behalf, such as recurring swaps, portfolio rebalancing, or yield strategies. These agents operate under rules and policies you define.",
      "Under the hood, Vultisig uses multi-device MPC (multi-party computation). Your private key is never stored in one place and never exposed. Agents do not hold your funds. They request approvals based on the policies you set.",
    ],
  },
  {
    question: "What is the Vultisig SDK?",
    paragraphs: [
      "The Vultisig SDK allows developers to build secure agents and plugins on top of Vultisig wallets. It provides:",
      "- Access to threshold signing via MPC",
      "- Policy enforcement and risk checks",
      "- Cross-chain transaction support",
      "- A standardized interface for agent execution",
      "Developers can integrate Vultisig into apps, AI frameworks, trading systems, or automation tools without handling private keys directly.",
    ],
  },
  {
    question: "Do I need to be a developer to use plugins?",
    paragraphs: [
      "No. Plugins are built by developers but installed by users. You pick a plugin, set its policy limits, and approve it into your vault. Everything after that runs under the rules you defined, and you can pause or remove it at any time.",
    ],
  },
]

/** Bullet runs are grouped so they render as one list rather than stray lines. */
function Answer({ paragraphs }: { paragraphs: string[] }) {
  const blocks: { type: "p" | "ul"; lines: string[] }[] = []
  for (const line of paragraphs) {
    const isBullet = line.startsWith("- ")
    const last = blocks[blocks.length - 1]
    if (isBullet && last?.type === "ul") {
      last.lines.push(line.slice(2))
    } else {
      blocks.push({ type: isBullet ? "ul" : "p", lines: [line.replace(/^- /, "")] })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, index) =>
        block.type === "ul" ? (
          <ul key={index}>
            {block.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : (
          <p key={index}>{block.lines[0]}</p>
        ),
      )}
    </div>
  )
}

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.paragraphs.map((line) => line.replace(/^- /, "")).join(" "),
    },
  })),
}

export default function ForBuildersFaq() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <FaqSection
        className="py-9 md:py-[60px]"
        items={FAQ_ITEMS.map((item) => ({
          question: item.question,
          answer: <Answer paragraphs={item.paragraphs} />,
        }))}
        aside={
          <h2
            id="faq"
            className="text-v5-hero-sm font-medium text-v5-text-inverse v5wide:w-[476px] v5wide:shrink-0 v5wide:text-v5-faq-title"
          >
            Built for builders
          </h2>
        }
      />
    </>
  )
}
