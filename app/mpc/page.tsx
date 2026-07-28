import dynamic from "next/dynamic"

import Hero from "./components/hero"

const SeedPhraseProblem = dynamic(
  () => import("./components/seed-phrase-problem"),
)
const WhatIsMpc = dynamic(() => import("./components/what-is-mpc"))
const ComparisonTable = dynamic(
  () => import("./components/comparison-table"),
)
const HowItWorks = dynamic(() => import("./components/how-it-works"))
const ProvenProtocols = dynamic(
  () => import("./components/proven-protocols"),
)
const Security = dynamic(() => import("./components/security"))
const ChainsSection = dynamic(() => import("@/components/chains-section"))
const FooterBanner = dynamic(() => import("@/components/footer-banner"))

export default function MpcPage() {
  return (
    <main className="min-h-screen bg-v5-page">
      <Hero />
      <SeedPhraseProblem />
      <WhatIsMpc />
      <ComparisonTable />
      <HowItWorks />
      <ProvenProtocols />
      <Security />
      <ChainsSection captionClassName="text-v5-title2" />
      <FooterBanner />
    </main>
  )
}
