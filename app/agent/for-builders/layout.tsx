import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Builders: Give Any Agent a Self-Custodial Wallet",
  description:
    "Vultisig's TypeScript SDK lets your agent create, hold, and sign from an MPC vault. No server sits in between holding keys on its behalf.",
  alternates: {
    canonical: "https://vultisig.com/agent/for-builders",
  },
  openGraph: {
    title: "Give any agent a self-custodial wallet",
    description:
      "TypeScript SDK for integrating MPC vault signing into any AI agent, bot, or automated workflow.",
    url: "https://vultisig.com/agent/for-builders",
    images: [
      {
        url: "https://vultisig.com/thumbnails/home.png",
        width: 1200,
        height: 630,
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
