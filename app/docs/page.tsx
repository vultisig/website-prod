import type { Metadata } from "next"
import Image from "next/image"

import { LandingButton } from "@/components/ui/landing-button"

export const metadata: Metadata = {
  title: "Vultisig Documentation - MPC Wallet Guides & API",
  description:
    "Official Vultisig documentation. Guides for MPC wallet setup, multi-device signing, vault management, and developer API.",
  alternates: {
    canonical: "https://vultisig.com/docs",
  },
  openGraph: {
    title: "Vultisig MPC Wallet Documentation",
    description:
      "Complete documentation for the leading MPC wallet. Setup guides, API reference, and developer resources.",
    url: "https://vultisig.com/docs",
  },
}

const PANEL =
  "flex flex-col items-center gap-8 rounded-[20px] bg-v5-white px-4 py-9 text-v5-text-inverse md:gap-[50px] md:rounded-v5-panel md:p-[60px]"
// The isometric art ships with a soft dark halo, so it sits on the page tint
// rather than pure white — otherwise the halo reads as a grey smudge.
const MEDIA =
  "relative aspect-square w-full max-w-[320px] shrink-0 overflow-hidden rounded-3xl bg-v5-page md:w-[380px] md:max-w-none v5wide:w-[440px]"

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-v5-page px-4 pb-9 pt-[74px] md:px-[30px] md:pb-[60px] md:pt-[134px]">
      <div className="mx-auto flex max-w-v5-content flex-col gap-4 pt-9 md:gap-[30px] md:pt-[60px]">
        <section className={`${PANEL} md:flex-row`}>
          <div className="flex flex-1 flex-col items-start gap-5 md:gap-6">
            <h1 className="text-v5-display-xs font-semibold md:text-v5-display md:font-medium">
              READ THE DOCS
            </h1>
            <p className="text-v5-body-m-relaxed font-normal md:max-w-[531px] md:text-v5-subtitle">
              Vultisig is different. Get educated and enjoy safer asset
              management.
            </p>
            <LandingButton asChild>
              <a
                href="https://docs.vultisig.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOCS
              </a>
            </LandingButton>
          </div>
          <div className={MEDIA}>
            <Image
              src="/images/docs-1.png"
              alt="Docs Placeholder"
              fill
              sizes="(max-width: 768px) 320px, 440px"
              className="object-contain"
              priority
            />
          </div>
        </section>

        <section className={`${PANEL} md:flex-row-reverse`}>
          <div className="flex flex-1 flex-col items-start gap-5 md:gap-6">
            <h2 className="text-v5-display-xs font-semibold md:text-v5-display md:font-medium">
              INTEGRATE VULTISIG
            </h2>
            <p className="text-v5-body-m-relaxed font-normal md:max-w-[531px] md:text-v5-subtitle">
              Any DeFi app, chrome extension or wallet can integrate the
              Vultisig SDK - safely let your users generate/upload vault shares
              and co-sign transactions.
            </p>
            <LandingButton asChild>
              <a
                href="https://docs.vultisig.com/developer-docs/vultisig-extension-integration-guide"
                target="_blank"
                rel="noopener noreferrer"
              >
                LEARN MORE
              </a>
            </LandingButton>
          </div>
          <div className={MEDIA}>
            <Image
              src="/images/docs-2.png"
              alt="Integrate Placeholder"
              fill
              sizes="(max-width: 768px) 320px, 440px"
              className="object-contain"
            />
          </div>
        </section>
      </div>
    </main>
  )
}
