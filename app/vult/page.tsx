import dynamic from "next/dynamic"

import Hero from "./components/hero"

const FooterBanner = dynamic(() => import("@/components/footer-banner"))

export default function VultPage() {
  return (
    <main className="min-h-screen bg-v5-page">
      <Hero />
      <FooterBanner />
    </main>
  )
}
