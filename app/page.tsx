import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import ClientsSection from "@/components/clients-section"
import FeaturesSection from "@/components/features-section"
import SetupSection from "@/components/setup-section"
import BestFeaturesSection from "@/components/best-features-section"
import TestimonialsSection from "@/components/testimonials-section"
import MediumSection from "@/components/medium-section"
import CtaSection from "@/components/cta-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ClientsSection />
      <FeaturesSection />
      <SetupSection />
      <BestFeaturesSection />
      <TestimonialsSection />
      <MediumSection />
      <CtaSection />
    </div>
  )
}
