import dynamic from "next/dynamic"

import Hero from "./components/hero"

const DiscountTiers = dynamic(() => import("./components/discount-tiers"))
const HoldingBenefits = dynamic(() => import("./components/holding-benefits"))
const IdeaBanner = dynamic(() => import("./components/idea-banner"))
const FeatureBoard = dynamic(() => import("./components/feature-board"))
const FooterBanner = dynamic(() => import("@/components/footer-banner"))

export default function VultPage() {
  return (
    <main className="min-h-screen bg-v5-page">
      <Hero />
      <DiscountTiers />
      <HoldingBenefits />
      <IdeaBanner />
      <FeatureBoard />
      <FooterBanner />
    </main>
  )
}
