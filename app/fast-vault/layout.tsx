import type { Metadata } from "next"
import { OPEN_GRAPH_DEFAULTS, SHARE_IMAGE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Fast Vault: One Device, Instant Signing | Vultisig",
  description:
    "Fast Vault pairs your device with Vultiserver as an automatic second signer: single-signature speed with a 2-of-2 threshold signature scheme. No seed phrase.",
  alternates: {
    canonical: "https://vultisig.com/fast-vault",
  },
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    title: "Fast Vault: One Device. Instant Signing.",
    description:
      "Single-signature speed with the protection of a threshold signature scheme. Vultiserver co-signs, but can never initiate a transaction on its own.",
    url: "https://vultisig.com/fast-vault",
    images: [
      {
        ...SHARE_IMAGE,
        alt: "Vultisig Fast Vault — one device, instant signing",
      },
    ],
  },
}

export default function FastVaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
