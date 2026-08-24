import type { Metadata } from "next"
import { OPEN_GRAPH_DEFAULTS, SHARE_IMAGE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Agents: Automation That Never Holds Your Keys",
  description:
    "Deploy an agent to trade, rebalance, and manage DeFi positions for you. It proposes the moves - your vault's MPC threshold still has to approve them.",
  alternates: {
    canonical: "https://vultisig.com/agent/for-agents",
  },
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    title: "Automation that never holds your keys",
    description:
      "Vultisig uses threshold signatures so agents can co-sign transactions without ever holding a complete private key.",
    url: "https://vultisig.com/agent/for-agents",
    images: [
      {
        ...SHARE_IMAGE,
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
