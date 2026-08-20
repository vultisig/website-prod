import dynamic from "next/dynamic"
import Hero from "@/components/hero"

const FeaturesSection = dynamic(() => import("@/components/features-section"))
const BestFeaturesSection = dynamic(
  () => import("@/components/best-features-section"),
)
const SetupSection = dynamic(() => import("@/components/setup-section"))
const ChainsSection = dynamic(() => import("@/components/chains-section"))
const RatingsSection = dynamic(() => import("@/components/ratings-section"))
const LandingFaq = dynamic(() => import("@/components/landing-faq"))
const MediumSection = dynamic(() => import("@/components/medium-section"))
const FooterBanner = dynamic(() => import("@/components/footer-banner"))

export default function Home() {
  return (
    <main className="min-h-screen bg-v5-page">
      <Hero />
      <FeaturesSection />
      <BestFeaturesSection />
      <SetupSection />
      <ChainsSection id="chains" />
      <RatingsSection />
      <LandingFaq />
      <MediumSection />
      <FooterBanner />
    </main>
  )
}
