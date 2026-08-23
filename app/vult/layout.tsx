import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '$VULT Token - Vultisig MPC Wallet Utility Token',
  description: '$VULT is the utility token powering Vultisig, the leading MPC wallet. Learn about tokenomics and how $VULT enhances wallet security.',
  alternates: {
    canonical: 'https://vultisig.com/vult',
  },
  openGraph: {
    title: '$VULT Token - Vultisig Utility Token',
    description: 'The utility token powering the leading MPC wallet. Tokenomics and ecosystem benefits.',
    url: 'https://vultisig.com/vult',
    images: [
      {
        url: 'https://vultisig.com/thumbnails/home.png',
        width: 1200,
        height: 630,
        alt: '$VULT — the utility token powering the Vultisig MPC wallet',
      },
    ],
  },
}

export default function VultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
