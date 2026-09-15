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

          {/* Phone-width crop on mobile; the 2200px plate on desktop. */}
          <picture className="contents">
            <source
              media="(min-width: 768px)"
              srcSet="/v5/mpc-hero.webp"
              width={2200}
              height={1068}
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- art direction needs <picture> */}
            <img
              src="/v5/mpc-hero-mobile.webp"
              alt={ILLUSTRATION_ALT}
              width={722}
              height={613}
              fetchPriority="high"
              className="-mx-4 -mb-8 mt-6 block aspect-[361/307] w-[calc(100%+2rem)] max-w-none md:absolute md:left-[10.72%] md:top-[-2.68%] md:m-0 md:aspect-[2200/1068] md:h-[111.65%] md:w-[105.8%]"
            />
          </picture>
        </div>
      </div>
    </section>
  )
}
