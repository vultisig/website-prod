const STATS = [
  { value: "$500M+", label: "Assets secured" },
  { value: "30+", label: "Chains supported" },
  { value: "50K+", label: "Active vaults" },
  { value: "0", label: "Security incidents" },
] as const

export default function StatsBar() {
  return (
    <section className="w-full py-10 md:py-14">
      <div className="container">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-0">
          {STATS.map((stat, index) => (
            <div key={stat.label} className="contents">
              {/* Vertical separator between stats — desktop only */}
              {index > 0 && (
                <div className="hidden md:block w-px h-[92px] bg-borderLight shrink-0" />
              )}

              <div className="flex flex-col items-center">
                <span
                  className="text-[40px] md:text-[45px] font-semibold leading-tight tracking-tight bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(64deg, #33E6BF 8%, #0439C7 134%)",
                  }}
                >
                  {stat.value}
                </span>
                <span className="text-base md:text-lg text-textTertiary font-['Satoshi',sans-serif] mt-1">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
