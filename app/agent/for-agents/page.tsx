import dynamic from "next/dynamic"

import Hero from "./components/hero"

const Sovereignty = dynamic(() => import("./components/sovereignty"))
const Toolchain = dynamic(() => import("./components/toolchain"))
const Strategies = dynamic(() => import("./components/strategies"))
const MachineReadable = dynamic(() => import("./components/machine-readable"))
const ForAgentsFaq = dynamic(() => import("./components/faq"))

export default function ForAgentsPage() {
  return (
    <main className="min-h-screen bg-v5-page">
      <Hero />
      <Sovereignty />
      <Toolchain />
      <Strategies />
      <MachineReadable />
      <ForAgentsFaq />
    </main>
  )
}
