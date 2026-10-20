import dynamic from "next/dynamic"

import Hero from "./components/hero"
import { JETBRAINS_MONO } from "./fonts"

const TwoShares = dynamic(() => import("./components/two-shares"))
const SetupSteps = dynamic(() => import("./components/setup-steps"))
const ThresholdScenarios = dynamic(
  () => import("./components/threshold-scenarios"),
)
const VaultComparison = dynamic(() => import("./components/vault-comparison"))
const FastVaultFaq = dynamic(() => import("./components/faq"))
const FooterBanner = dynamic(() => import("@/components/footer-banner"))

export default function FastVaultPage() {
  return (
    <main className="min-h-screen bg-v5-page">
      <Hero />
      <TwoShares />
      <SetupSteps indexFontClassName={JETBRAINS_MONO.className} />
      <ThresholdScenarios />
      <VaultComparison />
      <FastVaultFaq />
      <FooterBanner />
    </main>
  )
}
