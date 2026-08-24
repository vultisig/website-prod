import type { Metadata } from "next"
import { OPEN_GRAPH_DEFAULTS, SHARE_IMAGE } from "@/lib/site"

export const metadata: Metadata = {
  // Unlinked and noindexed until the handles and affiliations are verified.
  robots: { index: false, follow: false },
  title: "Backed By: The Funds and Builders Behind Vultisig",
  description:
    "Vultisig is backed by funds who bet on self-custody first, industry-leading investors, and the builders crypto actually listens to.",
  alternates: {
    canonical: "https://vultisig.com/backed-by",
  },
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    title: "Backed by funds who bet on self-custody first",
    description:
      "The funds, investors, and builders backing Vultisig's seedless MPC wallet.",
    url: "https://vultisig.com/backed-by",
    images: [
      { ...SHARE_IMAGE, alt: "The funds and investors backing Vultisig" },
    ],
  },
}

export default function BackedByLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
