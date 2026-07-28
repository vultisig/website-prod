import dynamic from "next/dynamic"

import Hero from "./components/hero"

const ThreeSteps = dynamic(() => import("./components/three-steps"))
const FooterBanner = dynamic(() => import("@/components/footer-banner"))

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-v5-page">
      <Hero />
      <ThreeSteps />
      <FooterBanner />
    </main>
  )
}
