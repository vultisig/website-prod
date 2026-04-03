import dynamic from "next/dynamic"
import Hero from "@/components/hero"
import StatsBar from "@/components/stats-bar"

const FeaturesSection = dynamic(() => import("@/components/features-section"))
const SetupSection = dynamic(() => import("@/components/setup-section"))
const BestFeaturesSection = dynamic(
  () => import("@/components/best-features-section"),
)
const EcosystemSection = dynamic(
  () => import("@/components/ecosystem-section"),
)
const MediumSection = dynamic(() => import("@/components/medium-section"))
const CtaSection = dynamic(() => import("@/components/cta-section"))

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <StatsBar />
      <FeaturesSection />
      <SetupSection />
      <BestFeaturesSection />
      <EcosystemSection />
      <MediumSection />
      <CtaSection />
    </main>
  )
}
