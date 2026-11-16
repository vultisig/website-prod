import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { LandingButton } from "@/components/ui/landing-button"
import { cn } from "@/lib/utils"

type Strategy = {
  /** Figma badge: the dark disc, hairline ring and blue glyph are baked into the SVG. */
  icon: string
  title: string
  body: string
  live: boolean
}

const STRATEGIES: Strategy[] = [
  {
    icon: "/v5/agent-strategy-dca.svg",
    title: "Dollar-Cost Averaging",
    body: "Automatically buy BTC, ETH, or any token on a schedule you define. Daily, weekly, or custom intervals. Agent executes via THORChain without emotional decisions.",
    live: true,
  },
  {
    icon: "/v5/agent-strategy-yield.svg",
    title: "Yield Collection",
    body: "Auto-claim rewards from liquidity pools, staking positions, and DeFi protocols on a schedule. Never leave yield unclaimed due to gas timing or missed windows.",
    live: true,
  },
  {
    icon: "/v5/agent-strategy-rebalancing.svg",
    title: "Portfolio Rebalancing",
    body: "Maintain your target allocation automatically. Agent rebalances on schedule or when drift exceeds your threshold with conditional logic like gas price checks.",
    live: true,
  },
  {
    icon: "/v5/agent-strategy-recurring.svg",
    title: "Recurring Payments",
    body: "Schedule automatic sends to any address on any chain. Payroll, subscriptions, regular transfers - set once, agent handles every future transaction with MPC security.",
    live: true,
  },
  {
    icon: "/v5/agent-strategy-gas.svg",
    title: "Gas Monitoring",
    body: "Agents watch network conditions and alert you or trigger pending transactions when gas drops to your target. Never overpay on Ethereum again.",
    live: false,
  },
  {
    icon: "/v5/agent-strategy-conditional.svg",
    title: "Conditional Execution",
    body: 'Run transactions only when conditions are met. "Buy $50 extra BTC if it drops below $60k." "Rebalance only when gas is under 15 gwei." Real strategy logic, automated.',
    live: false,
  },
]

/**
 * Hovering lifts the fill 15% toward the white card behind it, which is what
 * dropping the alpha to 85% composites to - the same lift for both pills, with
 * the hue left alone, and no hover-only token to keep in step with the base.
 *
 * `duration-*` and `ease-*` are redefined by tailwindcss-animate and
 * tailwindcss-motion, which shadows core's arbitrary values, so the timing goes
 * through arbitrary properties - the same trap noted in landing-button.
 */
const PILL_MOTION =
  "transition-colors [transition-duration:250ms] [transition-timing-function:ease-out] motion-reduce:!transition-none"

function StatusPill({ live }: { live: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex cursor-pointer items-center rounded-full px-4 py-2 text-v5-body-s font-medium text-v5-text-primary",
        PILL_MOTION,
        live
          ? "bg-v5-info-dark hover:bg-v5-info-dark/85"
          : "bg-v5-text-tertiary hover:bg-v5-text-tertiary/85",
      )}
    >
      {live ? "Live now" : "Coming soon"}
    </span>
  )
}

export default function Strategies() {
  return (
    <section className="bg-v5-page px-4 pt-[30px] md:px-[30px]">
      <div className="mx-auto max-w-v5-content">
        <div className="flex flex-col gap-10 rounded-[20px] bg-v5-panel px-4 py-10 md:gap-[50px] md:rounded-[24px] md:p-[60px]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-[50px]">
            <div className="flex flex-col gap-4 text-v5-text-inverse">
              <h2 className="text-v5-display-sm font-semibold md:text-v5-display">
                Set it once. Let agents handle the rest.
              </h2>
              <p className="max-w-[798px] text-v5-body-m font-normal md:text-v5-subtitle">
                Deploy autonomous agents for any recurring crypto strategy. They
                act while you sleep.
              </p>
            </div>
            <LandingButton
              asChild
              size="sm"
              invertOnHover
              className="h-[50px] w-full shrink-0 md:w-[185px]"
            >
              <Link href="/downloads">
                Get Started
                <ArrowRight aria-hidden />
              </Link>
            </LandingButton>
          </div>

          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {STRATEGIES.map(({ icon, title, body, live }) => (
              <li
                key={title}
                className="flex flex-col gap-6 rounded-[20px] bg-v5-white p-[30px] md:gap-[35px]"
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Decorative — the heading below already names the strategy. */}
                  <Image
                    src={icon}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 shrink-0"
                  />
                  <StatusPill live={live} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-v5-subtitle font-semibold text-v5-text-inverse">
                    {title}
                  </h3>
                  <p className="text-v5-card-body font-normal text-v5-text-inverse">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
