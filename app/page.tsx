import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react"

import Hero from "@/components/hero"
import MediumSection, {
  MediumSectionFallback,
} from "@/components/medium-section"
import RatingsSection, {
  RatingsSectionFallback,
} from "@/components/ratings-section"
import { OPEN_GRAPH_DEFAULTS, SITE_URL } from "@/lib/site"

const FeaturesSection = dynamic(() => import("@/components/features-section"))
const BestFeaturesSection = dynamic(
  () => import("@/components/best-features-section"),
)
const SetupSection = dynamic(() => import("@/components/setup-section"))
const ChainsSection = dynamic(() => import("@/components/chains-section"))
const LandingFaq = dynamic(() => import("@/components/landing-faq"))
const FooterBanner = dynamic(() => import("@/components/footer-banner"))

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
  openGraph: { ...OPEN_GRAPH_DEFAULTS, url: SITE_URL },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-v5-page">
      <Hero />
      <FeaturesSection />
      <BestFeaturesSection />
      <SetupSection />
      <ChainsSection id="chains" />
      <Suspense fallback={<RatingsSectionFallback />}>
        <RatingsSection />
      </Suspense>
      <LandingFaq />
      <Suspense fallback={<MediumSectionFallback />}>
        <MediumSection />
      </Suspense>
      <FooterBanner />
    </main>
  )
}
