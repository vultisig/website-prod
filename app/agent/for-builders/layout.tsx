import type { Metadata } from "next"
import { OPEN_GRAPH_DEFAULTS, SHARE_IMAGE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Builders: Give Any Agent a Self-Custodial Wallet",
  description:
    "Vultisig's TypeScript SDK lets your agent create, hold, and sign from an MPC vault. No server sits in between holding keys on its behalf.",
  alternates: {
    canonical: "https://vultisig.com/agent/for-builders",
  },
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    title: "Give any agent a self-custodial wallet",
    description:
      "TypeScript SDK for integrating MPC vault signing into any AI agent, bot, or automated workflow.",
    url: "https://vultisig.com/agent/for-builders",
    images: [
      {
        ...SHARE_IMAGE,
        alt: "Vultisig SDK - build agents with MPC-grade security",
      },
    ],
  },
}

export default function ForBuildersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
