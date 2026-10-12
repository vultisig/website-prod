import type { Metadata } from "next"
import { OPEN_GRAPH_DEFAULTS, SHARE_IMAGE } from "@/lib/site"

export const metadata: Metadata = {
  title: "VULT Token: Price, Supply & Swap Fee Discounts | Vultisig",
  description:
    "VULT is Vultisig's ERC-20 token on Ethereum. Hold 1,500+ VULT in your vault to cut Vultisig's swap fee, down to zero at 1,000,000. Price, supply, contract.",
  alternates: {
    canonical: "https://vultisig.com/vult",
  },
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    title: "VULT Token: Price, Supply & Swap Fee Discounts",
    description:
      "Vultisig's ERC-20 token. Hold VULT in your vault to cut Vultisig's swap fee, down to zero at 1,000,000 VULT.",
    url: "https://vultisig.com/vult",
    images: [
      {
        ...SHARE_IMAGE,
        alt: "$VULT, the token of the Vultisig MPC wallet",
      },
    ],
  },
}

export default function VultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
