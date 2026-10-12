import { faqPageJsonLd } from "@/content/product-faq"
import FaqSection from "@/components/ui/faq-section"

import { VULT_CONTRACT_ADDRESS, VULT_MAX_SUPPLY } from "../token"

const MAX_SUPPLY_LABEL = VULT_MAX_SUPPLY.toLocaleString("en-US")

const FAQ_ITEMS: { question: string; text: string }[] = [
  {
    question: "What is VULT?",
    text: "VULT is the token of Vultisig, the self-custodial MPC wallet. It is an ERC-20 token on Ethereum. Holding it lowers the fee you pay on swaps inside Vultisig.",
  },
  {
    question: "What does holding VULT do?",
    text: "Vultisig reads the VULT balance on your vault's Ethereum address and applies a discount tier to your swaps. Tiers run from Bronze at 1,500 VULT to Ultimate at 1,000,000 VULT, where Vultisig's own swap fee drops to zero. Network and provider fees still apply.",
  },
  {
    question: "Where can I buy VULT?",
    text: "VULT trades on Uniswap on Ethereum. The Buy $VULT button on this page opens VULT on Uniswap. Always check the contract address before you trade.",
  },
  {
    question: "What is the VULT contract address?",
    text: `The VULT contract on Ethereum is ${VULT_CONTRACT_ADDRESS}.`,
  },
  {
    question: "What is the maximum supply of VULT?",
    text: `VULT has a maximum supply of ${MAX_SUPPLY_LABEL} tokens.`,
  },
  {
    question: "Where can I see the VULT price?",
    text: "This page shows the live VULT price, max supply and contract address at the top. CoinGecko and CoinMarketCap also list VULT under the name Vultisig.",
  },
]

export default function VultFaq() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd(FAQ_ITEMS)),
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
