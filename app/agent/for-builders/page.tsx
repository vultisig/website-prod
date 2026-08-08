import dynamic from "next/dynamic"

import Hero from "./components/hero"

const SdkOverview = dynamic(() => import("./components/sdk-overview"))
const TwoWays = dynamic(() => import("./components/two-ways"))
const ComparisonTable = dynamic(() => import("./components/comparison-table"))
const Resources = dynamic(() => import("./components/resources"))
const ForBuildersFaq = dynamic(() => import("./components/faq"))

export default function ForBuildersPage() {
  return (
    <main className="min-h-screen bg-v5-page">
      <Hero />
      <SdkOverview />
      <TwoWays />
      <ComparisonTable />
      <Resources />
      <ForBuildersFaq />
    </main>
  )
}
