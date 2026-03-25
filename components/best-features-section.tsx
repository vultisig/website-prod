import SectionBadge from "@/components/ui/section-badge"
import MaxSecurityCard from "@/components/max-security-card"
import OpenSourceCard from "@/components/open-source-card"
import SecureNotificationsCard from "@/components/secure-notifications-card"
import MofNSigningCard from "@/components/mofn-signing-card"
import HoldVultCard from "@/components/hold-vult-card"
import CrossChainSwapsCard from "@/components/cross-chain-swaps-card"
import ChainsCard from "@/components/chains-card"

/* ───────── Main Bento Grid ───────── */
export default function BestFeaturesSection() {
  return (
    <section className="py-16 container">
      {/* Header */}
      <div className="text-center mb-12 flex flex-col items-center gap-4">
        <SectionBadge label="Everything in one place" />

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-textPrimary tracking-tight">
          Best features in one place
        </h2>

        <p className="text-lg text-textSecondary tracking-tight max-w-2xl">
          Multi-chain asset management, keyless security, DeFi access, and
          built-in swaps - all inside one secure vault environment.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {/* Column 1 — 2 tall cards */}
        <div className="flex flex-col gap-3.5">
          <MaxSecurityCard />
          <MofNSigningCard />
        </div>

        {/* Column 2 — 3 medium cards */}
        <div className="flex flex-col gap-3.5">
          <CrossChainSwapsCard />
          <SecureNotificationsCard />
          <OpenSourceCard />
        </div>

        {/* Column 3 — 2 tall cards */}
        <div className="flex flex-col gap-3.5">
          <ChainsCard />
          <HoldVultCard />
        </div>
      </div>
    </section>
  )
}
