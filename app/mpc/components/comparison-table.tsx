import { Check, X } from "lucide-react"

import { supportedChainCountLabel } from "@/content/chain-count"

type ComparisonRow = {
  feature: string
  others: string
  vultisig: string
}

const ROWS: ComparisonRow[] = [
  {
    feature: "Share location",
    others: "Company servers + devices",
    vultisig: "Your devices only",
  },
  {
    feature: "Custody model",
    others: "Hybrid / delegated",
    vultisig: "Self-custody",
  },
  {
    feature: "Privacy",
    others: "KYC, email required",
    vultisig: "No tracking, no accounts",
  },
  {
    feature: "Cost",
    others: "Subscription fees",
    vultisig: "Free",
  },
  {
    feature: "Chains",
    others: "Limited selection",
    vultisig: `${supportedChainCountLabel} blockchains`,
  },
  {
    feature: "Recovery Model",
    others: "Depends on company storage",
    vultisig: "User choses backup location",
  },
  {
    feature: "Source code",
    others: "Proprietary / closed",
    vultisig: "100% open source",
  },
]

const CELL = "h-[73px] px-6 align-middle"

function Marker({ verdict }: { verdict: "yes" | "no" }) {
  const Glyph = verdict === "yes" ? Check : X

  return (
    <span
      aria-hidden
      className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
        verdict === "yes" ? "bg-v5-positive/20" : "bg-v5-negative/20"
      }`}
    >
      <Glyph
        className={`size-4 ${
          verdict === "yes" ? "text-v5-positive" : "text-v5-negative-mark"
        }`}
      />
    </span>
  )
}

export default function ComparisonTable() {
  return (
    <section className="bg-v5-page px-4 py-12 md:px-[30px] md:py-[60px]">
      <div className="mx-auto flex max-w-v5-content flex-col items-center gap-8 md:gap-[30px]">
        <h2 className="text-center text-v5-display-sm font-medium text-v5-text-inverse md:text-v5-headline">
          Not All MPC Wallets Are Equal
        </h2>

        <div className="flex w-full flex-col items-center gap-6">
          {/* overflow-x-auto also clips the rows to the panel radius */}
          <div className="w-full max-w-[1024px] overflow-x-auto rounded-[20px] border border-v5-text-secondary/30 p-px md:rounded-v5-panel">
            <table className="w-full min-w-[760px] table-fixed border-collapse text-left text-v5-text-inverse">
              <caption className="sr-only">
                Vultisig compared with other MPC wallets across share location,
                custody, privacy, cost, chains, recovery and source code
              </caption>
              <thead>
                <tr className="border-b border-v5-text-secondary bg-v5-white">
                  <th scope="col" className="h-[70px] px-6 align-middle">
                    <span className="text-v5-title3 font-medium">Feature</span>
                  </th>
                  <th scope="col" className="h-[70px] px-6 align-middle">
                    <span className="text-v5-title3 font-medium">
                      Other MPC Wallets
                    </span>
                  </th>
                  <th scope="col" className="h-[70px] px-6 align-middle">
                    <span className="text-v5-subtitle font-semibold text-v5-accent">
                      Vultisig
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={`bg-v5-white/[0.54] ${
                      index < ROWS.length - 1
                        ? "border-b border-v5-text-secondary"
                        : ""
                    }`}
                  >
                    <th scope="row" className={`${CELL} font-medium`}>
                      <span className="text-v5-body-s">{row.feature}</span>
                    </th>
                    <td className={CELL}>
                      <span className="flex items-center gap-3 text-v5-body-s font-normal">
                        <Marker verdict="no" />
                        {row.others}
                      </span>
                    </td>
                    <td className={CELL}>
                      <span className="flex items-center gap-3 text-v5-body-s font-medium">
                        <Marker verdict="yes" />
                        {row.vultisig}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-v5-footnote font-medium text-v5-text-tertiary">
            * Comparison based on typical competitor offerings as of January
            2026
          </p>
        </div>
      </div>
    </section>
  )
}
