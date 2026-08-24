import type { Metadata } from "next"
import { OPEN_GRAPH_DEFAULTS, SHARE_IMAGE } from "@/lib/site"

export const metadata: Metadata = {
  title: "How Vultisig Works: MPC & TSS Technology Explained",
  description:
    "Learn how Vultisig uses MPC (Multi-Party Computation) and TSS (Threshold Signature Scheme) to secure your crypto without seed phrases. Multi-device signing explained.",
  alternates: {
    canonical: "https://vultisig.com/how-it-works",
  },
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    title: "How Vultisig MPC Wallet Works",
    description:
      "Understand the technology behind the leading MPC wallet. Multi-device signing, threshold signatures, seedless security.",
    url: "https://vultisig.com/how-it-works",
    images: [
      {
        ...SHARE_IMAGE,
        alt: "How Vultisig MPC Wallet Works — multi-device threshold signing explained",
      },
    ],
  },
}

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
