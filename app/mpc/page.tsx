import CtaSection from "@/components/cta-section"
import Hero from "./components/0_Hero"
import MpcWallet from "./components/1_MpcWallet"
import NotAllMpcWalletsAreEqual from "./components/2_NotAllMpcWalletsAreEqual"
import HowVultisigWorks from "./components/3_HowVultisigWorks"
import BuiltOnProvenMpcProtocols from "./components/4_BuiltOnProvenMpcProtocols"
import SecurityFeatures from "./components/5_SecurityFeatures"
import Blockchains from "./components/6_Blockchains"
import NoTrack from "./components/7_NoTrack"
import Faq from "./components/8_Faq"

export default function MPCPage() {
  return (
    <div className="w-full bg-gradient-to-b from-[#0a1423] via-[#0d1a2d] to-[#0a1423] text-white overflow-x-hidden min-h-screen">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 -right-32 w-96 h-96 bg-[#0b4eff] rounded-full blur-3xl opacity-5"></div>
        <div className="absolute top-96 -left-40 w-96 h-96 bg-primaryAccent rounded-full blur-3xl opacity-5"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0b4eff] rounded-full blur-3xl opacity-5"></div>
      </div>

      <div className="relative z-10">
        <main className="pt-24 space-y-8 lg:space-y-24 xl:space-y-40">
          <Hero />
          <MpcWallet />
          <NotAllMpcWalletsAreEqual />
          <HowVultisigWorks />
          <BuiltOnProvenMpcProtocols />
          <SecurityFeatures />
          <Blockchains />
          <NoTrack />
          <Faq />
          <CtaSection />
        </main>
      </div>
    </div>
  )
}
