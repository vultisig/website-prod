import dynamic from "next/dynamic"

import Hero from "./components/hero"

const SeedPhraseProblem = dynamic(
  () => import("./components/seed-phrase-problem"),
)
const WhatIsMpc = dynamic(() => import("./components/what-is-mpc"))
const ComparisonTable = dynamic(
  () => import("./components/comparison-table"),
)
const FooterBanner = dynamic(() => import("@/components/footer-banner"))

export default function MpcPage() {
  return (
    <main className="min-h-screen bg-v5-page">
      <Hero />
      <SeedPhraseProblem />
      <WhatIsMpc />
      <ComparisonTable />
      <FooterBanner />
    </main>
  )
}
