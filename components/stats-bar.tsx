import { supportedChainCountLabel } from "@/content/chain-count"
import { cn } from "@/lib/utils"

type Stat = { value: string; label: string }

const STATS: Stat[] = [
  { value: "$500M+", label: "Assets secured" },
  { value: supportedChainCountLabel, label: "Chains supported" },
  { value: "50K+", label: "Active vaults" },
  { value: "0", label: "Security incidents" },
]

const DIVIDER_CLASS =
  "h-[59px] w-px shrink-0 bg-v5-text-primary/30 md:h-[92px]"

function StatCell({ value, label }: Stat) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-4 text-center text-v5-text-primary md:gap-1">
      <span className="text-v5-stat-sm font-bold md:text-v5-stat">{value}</span>
      <span className="text-v5-body-s font-normal md:text-v5-label">
        {label}
      </span>
    </div>
  )
}

/** `md:contents` flattens the two mobile rows into the single desktop row. */
function StatRow({ left, right }: { left: Stat; right: Stat }) {
  return (
    <div className="flex w-full items-center py-2 md:contents">
      <StatCell {...left} />
      <div className={DIVIDER_CLASS} />
      <StatCell {...right} />
    </div>
  )
}

/**
 * Lives inside the hero card: the artwork's platform blue runs straight into
 * this row, so it carries no rounding or section wrapper of its own.
 */
export default function StatsBar() {
  return (
    <div className="order-3 -mx-4 -mb-4 flex w-[calc(100%+2rem)] flex-col gap-2 bg-v5-accent2 px-4 pb-5 pt-6 md:absolute md:inset-x-0 md:bottom-0 md:m-0 md:h-[205px] md:w-full md:flex-row md:items-center md:gap-3 md:px-[30px] md:py-0">
      <StatRow left={STATS[0]} right={STATS[1]} />
      <div className={cn(DIVIDER_CLASS, "hidden md:block")} />
      <StatRow left={STATS[2]} right={STATS[3]} />
    </div>
  )
}
