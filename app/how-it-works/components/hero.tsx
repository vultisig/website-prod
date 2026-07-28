import { ArrowRight, Download } from "lucide-react"
import Link from "next/link"

import { LandingButton } from "@/components/ui/landing-button"

const ILLUSTRATION_ALT =
  "Three vault shares shown as isometric blue blocks — iPhone signed, MacBook connected, a third device still waiting — linked to a pairing QR code"

export default function Hero() {
  return (
    <section className="bg-v5-page px-4 pb-2 pt-[74px] md:px-[30px] md:pb-0 md:pt-[134px]">
      <div className="mx-auto max-w-v5-content">
        <div className="relative flex flex-col overflow-hidden rounded-[20px] bg-v5-deep px-4 pb-8 pt-[60px] md:flex-row md:items-center md:rounded-v5-panel md:px-[60px] md:py-[120px]">
          <div className="relative z-10 flex flex-col justify-center gap-6 md:w-[582px]">
            <h1 className="text-v5-hero-sm font-semibold text-v5-text-primary md:w-[546px] md:text-v5-hero">
              Your key was never whole to begin with
            </h1>
            <p className="text-v5-label font-normal text-v5-text-primary md:w-[478px] md:text-v5-subtitle">
              Vultisig splits your vault across multiple devices using MPC
              threshold signatures. No single device holds the full key.
              There&apos;s nothing to steal, lose, or leak.
            </p>
            <div className="flex flex-col gap-3 md:flex-row md:gap-5">
              <LandingButton
                asChild
                variant="light"
                size="sm"
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
                className="h-[50px] w-full md:w-[185px]"
              >
                <Link href="#three-steps">
                  How It Works
                  <ArrowRight aria-hidden />
                </Link>
              </LandingButton>
            </div>
          </div>

          {/* Two crops of the same render — full-bleed under the copy on mobile,
              bled off the card's right edge on desktop. */}
          <picture className="contents">
            <source
              media="(min-width: 768px)"
              srcSet="/v5/hiw-hero.webp"
              width={912}
              height={563}
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- art direction needs <picture> */}
            <img
              src="/v5/hiw-hero-mobile.webp"
              alt={ILLUSTRATION_ALT}
              width={361}
              height={342}
              fetchPriority="high"
              className="-mx-4 -mb-8 mt-3.5 block aspect-[361/342] w-[calc(100%+2rem)] max-w-none md:absolute md:left-[32.32%] md:top-0 md:m-0 md:aspect-[912/563] md:h-full md:w-[66.09%]"
            />
          </picture>
        </div>
      </div>
    </section>
  )
}
