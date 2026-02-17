import React from "react"
import Heading from "./Heading"
import { Check, X } from "lucide-react"
import RadialBackground from "./RadialBackground"

const comparisonData = [
  {
    feature: "Share location",
    vultisig: { status: "yes", text: "Your devices only" },
    competitors: { status: "no", text: "Company servers + devices" },
  },
  {
    feature: "Custody model",
    vultisig: { status: "yes", text: "Self-custody" },
    competitors: { status: "no", text: "Hybrid / delegated" },
  },
  {
    feature: "Privacy",
    vultisig: { status: "yes", text: "No tracking, no accounts" },
    competitors: { status: "no", text: "KYC, email required" },
  },
  {
    feature: "Cost",
    vultisig: { status: "yes", text: "Free forever" },
    competitors: { status: "no", text: "Subscription fees" },
  },
  {
    feature: "Chains",
    vultisig: { status: "yes", text: "30+ blockchains" },
    competitors: { status: "no", text: "Limited selection" },
  },
  {
    feature: "Recovery Model",
    vultisig: { status: "yes", text: "User chooses backup location" },
    competitors: { status: "no", text: "Depends on company storage" },
  },
  {
    feature: "Source code",
    vultisig: { status: "yes", text: "100% open source" },
    competitors: { status: "no", text: "Proprietary / closed" },
  },
]

export default function NotAllMpcWalletsAreEqual() {
  return (
    <section className="py-20 container relative">
      <RadialBackground />
      <Heading>Not All MPC Wallets Are Equal</Heading>

      <div className="flex flex-col gap-6 items-center intersect-once intersect:motion-preset-slide-up-md">
        <div className="border border-borderLight rounded-[16px] w-full max-w-4xl">
          {/* Header Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 bg-backgroundSecondary/70 border-b border-borderLight">
            <div className="p-4 md:p-6 max-md:hidden">
              <p className="text-textSecondary text-[17px] font-medium leading-5">
                Feature
              </p>
            </div>
            <div className="p-4 md:p-6">
              <p className="text-textSecondary text-[17px] font-medium text-center leading-5">
                Other MPC Wallets
              </p>
            </div>
            <div className="p-4 md:p-6">
              <p className="text-primaryAccent text-[20px] font-semibold text-center leading-5">
                Vultisig
              </p>
            </div>
          </div>

          {/* Data Rows */}
          {comparisonData.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-2 md:grid-cols-3 bg-[rgba(2,18,43,0.54)] border-b border-borderLight last:border-b-0"
            >
              {/* Feature Name */}
              <div className="p-4 md:p-6 flex items-center max-md:col-span-2 max-md:justify-center max-md:uppercase max-md:font-semibold">
                <p className="text-sm leading-5 whitespace-nowrap">
                  {row.feature}
                </p>
              </div>

              {/* Competitors Column */}
              <div className="p-4 md:p-6 flex flex-col max-md:text-center md:flex-row items-center gap-3 justify-start">
                <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[rgba(251,44,54,0.2)]">
                  <X size={16} className="text-[#fb2c36]" strokeWidth={3} />
                </div>
                <p className="text-textSecondary text-sm font-normal leading-5">
                  {row.competitors.text}
                </p>
              </div>

              {/* Vultisig Column */}
              <div className="p-4 md:p-6 flex flex-col max-md:text-center md:flex-row items-center gap-3 justify-start">
                <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[rgba(51,230,191,0.2)]">
                  <Check
                    size={16}
                    className="text-secondaryAccent"
                    strokeWidth={3}
                  />
                </div>
                <p className="text-textPrimary text-sm font-normal leading-5">
                  {row.vultisig.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-textSecondary text-[13px] font-medium text-center leading-[18px]">
          * Comparison based on typical competitor offerings as of January 2026
        </p>
      </div>
    </section>
  )
}
