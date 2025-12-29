import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How Vultisig Works: MPC & TSS Technology Explained',
  description: 'Learn how Vultisig uses MPC (Multi-Party Computation) and TSS (Threshold Signature Scheme) to secure your crypto without seed phrases. Multi-device signing explained.',
  openGraph: {
    title: 'How Vultisig MPC Wallet Works',
    description: 'Understand the technology behind the leading MPC wallet. Multi-device signing, threshold signatures, seedless security.',
  },
}

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
