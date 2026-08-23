import { ArrowRight, Rocket } from "lucide-react"
import Link from "next/link"

import AudienceToggle from "@/app/agent/components/audience-toggle"
import { LandingButton } from "@/components/ui/landing-button"

const ILLUSTRATION_ALT =
  "An isometric blue vault flanked by floating transaction tiles, with an autonomous agent module wired into one of its key shares"

export default function Hero() {
  return (
    <section className="bg-v5-page px-4 pt-[74px] md:px-[30px] md:pt-[134px]">
      <div className="mx-auto max-w-v5-content">
        <div className="relative flex flex-col overflow-hidden rounded-[20px] bg-v5-agent-deep px-4 pb-8 pt-[60px] md:flex-row md:items-center md:rounded-v5-panel md:px-[60px] md:py-[120px]">
          <div className="relative z-10 flex flex-col justify-center gap-6 md:w-[582px]">
            <AudienceToggle active="agents" />
            <h1 className="text-v5-hero-sm font-semibold text-v5-text-primary md:w-[546px] md:text-v5-hero">
              Automation that never holds your keys.
            </h1>
            <p className="text-v5-label font-normal text-v5-text-primary md:w-[503px] md:text-v5-subtitle">
              Deploy an agent to trade, rebalance, and manage DeFi positions for
              you. It proposes the moves. Your vault&apos;s threshold still has
              to approve them.
            </p>
            <div className="flex flex-col gap-3 md:flex-row md:gap-5">
              <LandingButton
                asChild
                variant="light"
                size="sm"
                invertOnHover
                className="h-[50px] w-full md:w-[185px]"
              >
                <Link href="/downloads">
                  <Rocket aria-hidden />
                  Get Started
                </Link>
              </LandingButton>
              <LandingButton
                asChild
                variant="secondary"
                size="sm"
                invertOnHover
                className="h-[50px] w-full md:w-[185px]"
              >
                <Link href="/how-it-works">
                  How It Works
                  <ArrowRight aria-hidden />
                </Link>
              </LandingButton>
            </div>
          </div>

          {/* Mobile pans across the render inside a full-bleed clip; desktop
              bleeds it off the card's right edge the way Figma does. */}
          <div className="-mx-4 -mb-8 mt-6 overflow-hidden md:contents">
            {/* eslint-disable-next-line @next/next/no-img-element -- panned crop, not a layout-sized image */}
            <img
              src="/v5/agent-agents-hero.webp"
              alt={ILLUSTRATION_ALT}
              width={1548}
              height={1270}
              fetchPriority="high"
              className="block aspect-[1548/1270] w-[150%] max-w-none -translate-x-[16%] md:absolute md:right-0 md:top-0 md:h-full md:w-[56.09%] md:translate-x-0 md:object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
