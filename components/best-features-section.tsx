import ChainsCard from "@/components/chains-card"
import CrossChainSwapsCard from "@/components/cross-chain-swaps-card"
import HoldVultCard from "@/components/hold-vult-card"
import MaxSecurityCard from "@/components/max-security-card"
import MofNSigningCard from "@/components/mofn-signing-card"
import OpenSourceCard from "@/components/open-source-card"
import SecureNotificationsCard from "@/components/secure-notifications-card"
import SectionHeading from "@/components/ui/section-heading"

/** Columns dissolve below lg so the cards can take the design's mobile order. */
const COLUMN_CLASS = "contents lg:flex lg:flex-1 lg:flex-col lg:gap-3.5"

export default function BestFeaturesSection() {
  return (
    <section className="bg-v5-page pt-4 md:px-[30px] md:pt-[30px]">
      <div className="mx-auto max-w-v5-content">
        <div className="flex flex-col items-center gap-8 rounded-[20px] bg-v5-surface-dark px-4 pb-12 pt-5 md:gap-[50px] md:rounded-v5-panel md:p-[60px]">
          <SectionHeading
            tone="onDark"
            title="Best features in one place."
            subtitle="Multi-chain asset management, keyless security, DeFi access, and built-in swaps - all inside one secure vault environment."
          />
          <div className="flex w-full flex-col gap-3.5 lg:flex-row lg:gap-4">
            <div className={COLUMN_CLASS}>
              <div className="order-1">
                <ChainsCard />
              </div>
              <div className="order-4">
                <MofNSigningCard />
              </div>
            </div>
            <div className={COLUMN_CLASS}>
              <div className="order-2">
                <MaxSecurityCard />
              </div>
              <div className="order-5">
                <SecureNotificationsCard />
              </div>
              <div className="order-6">
                <OpenSourceCard />
              </div>
            </div>
            <div className={COLUMN_CLASS}>
              <div className="order-3">
                <CrossChainSwapsCard />
              </div>
              <div className="order-7">
                <HoldVultCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
