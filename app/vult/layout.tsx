import type { Metadata } from "next"
import { OPEN_GRAPH_DEFAULTS, SHARE_IMAGE } from "@/lib/site"

export const metadata: Metadata = {
  title: "$VULT Token - Vultisig MPC Wallet Utility Token",
  description:
    "$VULT is the utility token powering Vultisig, the leading MPC wallet. Learn about tokenomics and how $VULT enhances wallet security.",
  alternates: {
    canonical: "https://vultisig.com/vult",
  },
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    title: "$VULT Token - Vultisig Utility Token",
    description:
      "The utility token powering the leading MPC wallet. Tokenomics and ecosystem benefits.",
    url: "https://vultisig.com/vult",
    images: [
      {
        ...SHARE_IMAGE,
        alt: "$VULT — the utility token powering the Vultisig MPC wallet",
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
