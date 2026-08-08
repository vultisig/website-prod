import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Backed By: The Funds and Builders Behind Vultisig",
  description:
    "Vultisig is backed by funds who bet on self-custody first, industry-leading investors, and the builders crypto actually listens to.",
  alternates: {
    canonical: "https://vultisig.com/backed-by",
  },
  openGraph: {
    title: "Backed by funds who bet on self-custody first",
    description:
      "The funds, investors, and builders backing Vultisig's seedless MPC wallet.",
    url: "https://vultisig.com/backed-by",
    images: [
      {
        url: "https://vultisig.com/thumbnails/home.png",
        width: 1200,
        height: 630,
        alt: "The funds and investors backing Vultisig",
      },
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
