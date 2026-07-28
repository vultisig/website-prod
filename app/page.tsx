import dynamic from "next/dynamic"
import Hero from "@/components/hero"
import StatsBar from "@/components/stats-bar"
import HomeFaq from "@/components/home-faq"

const FeaturesSection = dynamic(() => import("@/components/features-section"))
const BestFeaturesSection = dynamic(
  () => import("@/components/best-features-section"),
)
const SetupSection = dynamic(() => import("@/components/setup-section"))
const ChainsSection = dynamic(() => import("@/components/chains-section"))
const MediumSection = dynamic(() => import("@/components/medium-section"))
const FooterBanner = dynamic(() => import("@/components/footer-banner"))

export default function Home() {
  return (
    <main className="min-h-screen bg-v5-page">
      <Hero />
      <StatsBar />
      <FeaturesSection />
      <BestFeaturesSection />
      <SetupSection />
      <ChainsSection />
      <HomeFaq />
      <MediumSection />
      <FooterBanner />
    </main>
  )
}
