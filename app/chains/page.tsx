import type { Metadata } from "next"

import ChainsExplorer from "./components/chains-explorer"

export const metadata: Metadata = {
  title: "Supported Chains - Vultisig MPC Wallet",
  description:
    "Browse the 30+ blockchains Vultisig supports natively — Bitcoin, Ethereum, Solana, THORChain, Cosmos and more, each with the same MPC threshold security and no seed phrase.",
  alternates: {
    canonical: "https://vultisig.com/chains",
  },
  openGraph: {
    title: "All your chains. One vault.",
    description:
      "30+ chains with the same MPC threshold security on every one. No seed phrase, no single point of failure.",
    url: "https://vultisig.com/chains",
  },
}

export default function ChainsPage() {
  return (
    <main className="min-h-screen bg-v5-page px-4 pb-[112px] pt-[126px] md:px-[30px] md:pb-[30px] md:pt-[216px]">
      <div className="mx-auto flex max-w-v5-content flex-col gap-[30px]">
        <header className="flex flex-col gap-6">
          <h1 className="text-v5-hero-sm font-medium text-v5-text-inverse md:text-v5-hero">
            All your chains. One vault.
          </h1>
          <p className="max-w-[856px] text-v5-subtitle font-normal text-v5-text-inverse">
            Vultisig supports 30+ chains with the same MPC threshold security on
            every one. No seed phrase, no single point of failure, no matter
            which chain you&rsquo;re holding.
          </p>
        </header>

        <ChainsExplorer />
      </div>
    </main>
  )
}
