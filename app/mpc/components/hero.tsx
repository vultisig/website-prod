import { ArrowRight, Download } from "lucide-react"
import Link from "next/link"

import { LandingButton } from "@/components/ui/landing-button"

const ILLUSTRATION_ALT =
  "Three isometric blue vaults in a row, the nearest one open with a green key inside, beside floating coins and key-share tiles"

export default function Hero() {
  return (
    <section className="bg-v5-page px-4 pt-[74px] md:px-[30px] md:pt-[134px]">
      <div className="mx-auto max-w-v5-content">
        <div className="relative flex flex-col overflow-hidden rounded-[20px] bg-v5-sky px-4 pb-8 pt-[60px] md:flex-row md:items-center md:rounded-v5-panel md:px-[60px] md:py-[120px]">
          <div className="relative z-10 flex flex-col justify-center gap-6 md:w-[582px]">
            <h1 className="text-v5-hero-sm font-semibold text-v5-text-primary md:w-[546px] md:text-v5-hero">
              The Free Open-Source MPC Wallet For Everyone
            </h1>
            <p className="text-v5-label font-normal text-v5-text-primary md:w-[546px] md:text-v5-subtitle">
              Split signing power across your devices. No seed phrases, no
              single point of failure, no company holding your keys. Vultisig
              uses threshold signatures so your crypto stays yours.
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
                  <Download aria-hidden />
                  Download App
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

          {/* Mobile pans across the same render inside a full-bleed clip;
              desktop bleeds it off the card's right edge as Figma does. */}
          <div className="-mx-4 -mb-8 mt-6 overflow-hidden md:contents">
            {/* eslint-disable-next-line @next/next/no-img-element -- panned crop, not a layout-sized image */}
            <img
              src="/v5/mpc-hero.webp"
              alt={ILLUSTRATION_ALT}
              width={2200}
              height={1068}
              fetchPriority="high"
              className="block aspect-[2200/1068] w-[175%] max-w-none -translate-x-[18%] md:absolute md:left-[10.72%] md:top-[-2.68%] md:h-[111.65%] md:w-[105.8%] md:translate-x-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
