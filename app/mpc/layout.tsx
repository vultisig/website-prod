import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MPC Wallet: Free & Open-Source Multi-Party Computation Wallet",
  description:
    "Vultisig is a free, open-source MPC wallet. Threshold signatures split signing across your own devices - no seed phrase, no single point of failure, no custodian.",
  alternates: {
    canonical: "https://vultisig.com/mpc",
  },
  openGraph: {
    title: "The Free Open-Source MPC Wallet For Everyone",
    description:
      "Threshold signatures split signing across your own devices. No seed phrase, no single point of failure, no company holding your keys.",
    url: "https://vultisig.com/mpc",
    images: [
      {
        url: "https://vultisig.com/thumbnails/home.png",
        width: 1200,
        height: 630,
        alt: "Vultisig — the free, open-source MPC wallet with threshold signatures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MPC Wallet: Free & Open-Source Multi-Party Computation Wallet",
    description:
      "Vultisig is a free, open-source MPC wallet. Threshold signatures split signing across your own devices - no seed phrase, no single point of failure, no custodian.",
  },
}

export default function MpcLayout({ children }: { children: React.ReactNode }) {
  return children
}
