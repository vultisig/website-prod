import { cn } from "@/lib/utils"

type Stat = { value: string; label: string }

const STATS: Stat[] = [
  { value: "$500M+", label: "Assets secured" },
  { value: "30+", label: "Chains supported" },
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

export default function StatsBar() {
  return (
    <section className="bg-v5-page px-4 md:px-[30px]">
      <div className="mx-auto max-w-v5-content">
        <div className="relative z-10 -mt-9 flex flex-col gap-2 rounded-[20px] bg-v5-accent2 px-4 pb-5 pt-[30px] md:-mt-[53px] md:h-[258px] md:flex-row md:items-center md:gap-3 md:rounded-v5-panel md:px-[30px] md:pb-[30px] md:pt-[102px]">
          <StatRow left={STATS[0]} right={STATS[1]} />
          <div className={cn(DIVIDER_CLASS, "hidden md:block")} />
          <StatRow left={STATS[2]} right={STATS[3]} />
        </div>
      </div>
    </section>
  )
}
