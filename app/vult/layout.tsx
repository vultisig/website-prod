import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '$VULT Token - Vultisig MPC Wallet Utility Token',
  description: '$VULT is the utility token powering Vultisig, the leading MPC wallet. Learn about tokenomics, airdrop, and how $VULT enhances wallet security.',
  openGraph: {
    title: '$VULT Token - Vultisig Utility Token',
    description: 'The utility token powering the leading MPC wallet. Tokenomics, airdrop details, and ecosystem benefits.',
  },
}

export default function VultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
