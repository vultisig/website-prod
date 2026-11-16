import type { Metadata } from "next"
import { OPEN_GRAPH_DEFAULTS, SHARE_IMAGE } from "@/lib/site"

const PAGE_URL = "https://vultisig.com/seedless-wallet"

export const metadata: Metadata = {
  title: "Seedless Wallet: Crypto Without a Seed Phrase | Vultisig",
  description:
    "Vultisig is a free, open-source seedless crypto wallet. No seed phrase to lose: threshold signatures split your key into shares, with backups you control.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    title: "The Seedless Wallet With No Single Point of Failure",
    description:
      "No seed phrase to write down, store, or lose. Vultisig splits signing power into key shares, so there is no single secret to steal.",
    url: PAGE_URL,
    images: [
      {
        ...SHARE_IMAGE,
        alt: "Vultisig — the free, open-source seedless wallet",
      },
    ],
  },
}

export default function SeedlessWalletLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
