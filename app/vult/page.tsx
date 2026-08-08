import dynamic from "next/dynamic"

import Hero from "./components/hero"

const DiscountTiers = dynamic(() => import("./components/discount-tiers"))
const HoldingBenefits = dynamic(() => import("./components/holding-benefits"))
const IdeaBanner = dynamic(() => import("./components/idea-banner"))
// Hidden for now: the feature-request board still renders placeholder data.
// const FeatureBoard = dynamic(() => import("./components/feature-board"))
const Arena = dynamic(() => import("./components/arena"))
const VultFaq = dynamic(() => import("./components/faq"))
const FooterBanner = dynamic(() => import("@/components/footer-banner"))

export default function VultPage() {
  return (
    <main className="min-h-screen bg-v5-page">
      <Hero />
      <DiscountTiers />
      <HoldingBenefits />
      <IdeaBanner />
      {/* <FeatureBoard /> */}
      <Arena />
      <VultFaq />
      <FooterBanner />
    </main>
  )
}
