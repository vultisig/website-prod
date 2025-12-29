import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Download Vultisig - Free MPC Wallet for iOS, Android, Mac, Windows',
  description: 'Download Vultisig, the free MPC wallet for iOS, Android, macOS and Windows. Secure your crypto with multi-device signing. No seed phrases required.',
  openGraph: {
    title: 'Download Vultisig - Free MPC Wallet',
    description: 'Get the leading MPC wallet. Available on iOS, Android, Mac, and Windows. Free and open-source.',
  },
}

export default function DownloadsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
