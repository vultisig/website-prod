import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Download Vultisig - Free MPC Wallet for iOS, Android, Mac, Windows',
  description: 'Download Vultisig, the free MPC wallet for iOS, Android, macOS and Windows. Secure your crypto with multi-device signing. No seed phrases required.',
  alternates: {
    canonical: 'https://vultisig.com/downloads',
  },
  openGraph: {
    title: 'Download Vultisig - Free MPC Wallet',
    description: 'Get the leading MPC wallet. Available on iOS, Android, Mac, and Windows. Free and open-source.',
    url: 'https://vultisig.com/downloads',
    images: [
      {
        url: 'https://vultisig.com/thumbnails/home.png',
        width: 1200,
        height: 630,
        alt: 'Download Vultisig — the free MPC wallet for iOS, Android, macOS and Windows',
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
