import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agents: Automation That Never Holds Your Keys",
  description:
    "Deploy an agent to trade, rebalance, and manage DeFi positions for you. It proposes the moves - your vault's MPC threshold still has to approve them.",
  alternates: {
    canonical: "https://vultisig.com/agent/for-agents",
  },
  openGraph: {
    title: "Automation that never holds your keys",
    description:
      "Vultisig uses threshold signatures so agents can co-sign transactions without ever holding a complete private key.",
    url: "https://vultisig.com/agent/for-agents",
    images: [
      {
        url: "https://vultisig.com/thumbnails/home.png",
        width: 1200,
        height: 630,
        alt: "Vultisig agents - autonomous execution with human sovereignty",
      },
    ],
  },
}

export default function ForAgentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
