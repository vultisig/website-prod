import { LandingButton } from "@/components/ui/landing-button"

import { VULT_BUY_URL } from "../token"
import TokenStats from "./token-stats"

const ILLUSTRATION_ALT =
  "A scattered arc of 3D $VULT coins in green and blue, each stamped with the Vultisig mark"

export default function Hero() {
  return (
    <section className="bg-v5-page px-4 pt-[74px] md:px-[30px] md:pt-[134px]">
      <div className="mx-auto max-w-v5-content">
        <div className="relative z-10 flex flex-col overflow-hidden rounded-[20px] bg-v5-surface-dark px-4 pb-8 pt-[60px] md:flex-row md:items-center md:rounded-v5-panel md:px-[60px] md:py-[120px]">
          <div className="relative z-10 flex flex-col justify-center gap-6 md:w-[582px]">
            <h1 className="text-v5-hero-sm font-semibold text-v5-text-primary md:w-[546px] md:text-v5-hero">
              The <span className="text-v5-vult">$VULT</span> Token
            </h1>
            <p className="text-v5-label font-normal text-v5-text-primary md:w-[499px] md:text-v5-subtitle">
              Hold between 1,500 to 1 Million $VULT and reduce your trading fees
              between 20 - 100%!
            </p>
            <LandingButton
              asChild
              size="sm"
              invertOnHover
              className="h-[50px] w-full md:w-[185px]"
            >
              <a href={VULT_BUY_URL} target="_blank" rel="noopener noreferrer">
                Buy $VULT
              </a>
            </LandingButton>
          </div>

          {/* Mobile crop sits under the copy; desktop crop bleeds off the card's right edge. */}
          <picture className="contents">
            <source
              media="(min-width: 768px)"
              srcSet="/v5/vult-hero.webp"
              width={918}
              height={482}
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- art direction needs <picture> */}
            <img
              src="/v5/vult-hero-mobile.webp"
              alt={ILLUSTRATION_ALT}
              width={361}
              height={313}
              fetchPriority="high"
              className="-mx-4 -mb-8 mt-[52px] block aspect-[361/313] w-[calc(100%+2rem)] max-w-none md:absolute md:left-[43.91%] md:top-[4.96%] md:m-0 md:aspect-[918/482] md:h-[103.88%] md:w-[66.52%]"
            />
          </picture>
        </div>
        <TokenStats />
      </div>
    </section>
  )
}
