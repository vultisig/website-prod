import dynamic from "next/dynamic"

import Hero from "@/app/mpc/components/hero"

import {
  COMPARISON,
  EXPLAINERS,
  FAQ_ITEMS,
  HERO,
} from "./content"

const SeedPhraseProblem = dynamic(
  () => import("@/app/mpc/components/seed-phrase-problem"),
)
const WhatIsMpc = dynamic(() => import("@/app/mpc/components/what-is-mpc"))
const ComparisonTable = dynamic(
  () => import("@/app/mpc/components/comparison-table"),
)
const SetupSection = dynamic(() => import("@/components/setup-section"))
const Security = dynamic(() => import("@/app/mpc/components/security"))
const ChainsSection = dynamic(() => import("@/components/chains-section"))
const MpcFaq = dynamic(() => import("@/app/mpc/components/faq"))
const FooterBanner = dynamic(() => import("@/components/footer-banner"))

export default function SeedlessWalletPage() {
  return (
    <main className="min-h-screen bg-v5-page">
      <Hero {...HERO} />
      <SeedPhraseProblem />
      <WhatIsMpc title="What Is a Seedless Wallet?" explainers={EXPLAINERS} />
      <ComparisonTable {...COMPARISON} />
      <SetupSection />
      <Security />
      <ChainsSection captionClassName="text-v5-title2" />
      <MpcFaq items={FAQ_ITEMS} />
      <FooterBanner />
    </main>
  )
}
