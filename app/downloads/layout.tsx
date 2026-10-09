import type { Metadata } from "next"
import { OPEN_GRAPH_DEFAULTS, SHARE_IMAGE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Download Vultisig - Free MPC Wallet for Mobile, Desktop, Browser",
  description:
    "Download Vultisig, the free MPC wallet for iOS, Android, macOS, Windows, Linux and your browser. Multi-device signing, no seed phrase.",
  alternates: {
    canonical: "https://vultisig.com/downloads",
  },
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    title: "Download Vultisig - Free MPC Wallet",
    description:
      "The free, open-source MPC wallet for iOS, Android, macOS, Windows, Linux and your browser.",
    url: "https://vultisig.com/downloads",
    images: [
      {
        ...SHARE_IMAGE,
        alt: "Download Vultisig, the free MPC wallet for iOS, Android, macOS, Windows, Linux and your browser",
      },
    ],
  },
}

export default function DownloadsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
