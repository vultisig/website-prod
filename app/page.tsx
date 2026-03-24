import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import StatsBar from "@/components/stats-bar"
import FeaturesSection from "@/components/features-section"
import SetupSection from "@/components/setup-section"
import BestFeaturesSection from "@/components/best-features-section"
import EcosystemSection from "@/components/ecosystem-section"
import MediumSection from "@/components/medium-section"
import CtaSection from "@/components/cta-section"

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
