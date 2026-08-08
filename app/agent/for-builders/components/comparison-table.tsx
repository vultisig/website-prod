import { Check } from "lucide-react"

type ComparisonRow = {
  feature: string
  /** One entry per competitor column, in COMPETITORS order. */
  others: string[]
  vultisig: string
}

const COMPETITORS = [
  "Coinbase Agentic Wallets",
  "Privy / Openfort",
  "LIT Protocol",
]

const ROWS: ComparisonRow[] = [
  {
    feature: "Key architecture",
    others: [
      "MPC + TEE, Coinbase-hosted",
      "MPC-based, Stripe-owned",
      "Decentralized MPC across independent nodes",
    ],
    vultisig: "MPC threshold (no full key)",
  },
  {
    feature: "Self-custody",
    others: [
      "Partial - Coinbase custody primitive",
      "Provider-custodied",
      "Non-custodial, but relies on Lit's node network",
    ],
    vultisig: "Full self-custody",
  },
  {
    feature: "Agent permissions",
    others: [
      "Session caps, per-tx limits, allowlists",
      "Policy engine, rule-based approvals",
      "Admin-defined policies via on-chain Lit Actions",
    ],
    vultisig: "Action + Risk Agent model",
  },
  {
    feature: "Multi-chain",
    others: ["Base, EVM, Solana", "EVM, Solana, Bitcoin", "Chain-agnostic"],
    vultisig: "30+ native chains",
  },
  {
    feature: "Open source",
    others: [
      "Partially open",
      "Closed source",
      "Node network + SDKs open source",
    ],
    vultisig: "100% open source",
  },
  {
    feature: "Cost",
    others: [
      "Platform fees + gas",
      "Platform fees + gas",
      "Network signing fees + gas",
    ],
    vultisig: "Free + $VULT for plugins",
  },
  {
    feature: "Token incentives",
    others: ["None", "None", "LIT token"],
    vultisig: "$VULT builder rewards",
  },
]

const HEAD_CELL = "h-[66px] px-4 align-middle md:px-6"
// h-* on a cell is a row minimum, so the rows that wrap to two lines still grow.
const CELL = "h-[72px] px-4 py-5 align-middle md:px-6"
const ROW_BORDER = "border-b border-v5-text-secondary/60"
// The tinted column carries its own divider — the grey one disappears into it.
const HIGHLIGHT_BORDER = "border-b border-v5-white/70"

/** Blue check badge marking the Vultisig column's answer on every row. */
function CheckMark() {
  return (
    <span
      aria-hidden
      className="flex size-5 shrink-0 items-center justify-center rounded-full bg-v5-cta"
    >
      <Check className="size-3 text-v5-white" strokeWidth={3} />
    </span>
  )
}

export default function ComparisonTable() {
  return (
    <section className="bg-v5-page px-4 py-12 md:px-[30px] md:py-[60px]">
      <div className="mx-auto flex max-w-v5-content flex-col items-center gap-8 md:gap-[30px]">
        <h2 className="text-center text-v5-display-sm font-medium text-v5-text-inverse md:text-v5-display-md">
          Not All Agent Wallets Are Equal
        </h2>

        <div className="flex w-full flex-col items-center gap-6">
          {/* overflow-x-auto also clips the rows to the panel radius */}
          <div className="w-full max-w-[1240px] overflow-x-auto rounded-[20px] border border-v5-text-secondary p-px md:rounded-v5-panel">
            <table className="w-full min-w-[1000px] table-fixed border-collapse text-left text-v5-text-inverse">
              <caption className="sr-only">
                Vultisig compared with Coinbase Agentic Wallets, Privy /
                Openfort and LIT Protocol across key architecture, custody,
                agent permissions, chain coverage, licensing, cost and token
                incentives
              </caption>
              {/*
                Figma column proportions. Auto layout hands the widest prose
                column too much room, which pushes the header labels and the
                Vultisig verdicts onto a second line.
              */}
              <colgroup>
                <col className="w-[175px]" />
                <col className="w-[270px]" />
                <col className="w-[267px]" />
                <col className="w-[254px]" />
                <col className="w-[272px]" />
              </colgroup>
              <thead>
                <tr className={`bg-v5-white ${ROW_BORDER}`}>
                  <th scope="col" className={HEAD_CELL}>
                    <span className="text-v5-title3 font-medium">Feature</span>
                  </th>
                  {COMPETITORS.map((name) => (
                    <th key={name} scope="col" className={HEAD_CELL}>
                      <span className="text-v5-title3 font-medium">{name}</span>
                    </th>
                  ))}
                  <th
                    scope="col"
                    className={`${HEAD_CELL} ${HIGHLIGHT_BORDER} bg-v5-highlight-soft`}
                  >
                    <span className="text-v5-subtitle font-semibold text-v5-cta">
                      Vultisig
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, index) => {
                  const border = index < ROWS.length - 1 ? ROW_BORDER : ""
                  return (
                    <tr key={row.feature} className={`bg-v5-white/[0.54]`}>
                      <th
                        scope="row"
                        className={`${CELL} ${border} text-v5-body-s font-medium`}
                      >
                        {row.feature}
                      </th>
                      {row.others.map((value, column) => (
                        <td
                          key={COMPETITORS[column]}
                          className={`${CELL} ${border} text-v5-body-s font-normal`}
                        >
                          {value}
                        </td>
                      ))}
                      <td
                        className={`${CELL} ${
                          border ? HIGHLIGHT_BORDER : ""
                        } bg-v5-highlight-soft`}
                      >
                        <span className="flex items-center gap-2.5 text-v5-body-s font-medium">
                          <CheckMark />
                          {row.vultisig}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <p className="text-center text-v5-button-sm font-medium text-v5-text-tertiary">
            * Comparison based on typical competitor offerings as of January 2026
          </p>
        </div>
      </div>
    </section>
  )
}
