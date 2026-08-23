import { ArrowRight, Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import StatsBar from "@/components/stats-bar"
import { LandingButton } from "@/components/ui/landing-button"

/** The phrase repeats twice around the full 314px ring, so the closing "·" doubles as the seam. */
const RING_TEXT_LENGTH = 314
/* The trailing no-break space keeps the seam gap — SVG collapses an ordinary trailing space. */
const RING_TEXT = "OPEN-SOURCE · OPEN-SOURCE · "

function OpenSourceSeal() {
  return (
    <svg
      viewBox="0 0 128 127"
      className="size-16 shrink-0 origin-center animate-v5-seal-spin md:size-32 motion-reduce:animate-none"
      role="img"
      aria-label="Open-source"
    >
      <defs>
        <path id="hero-seal-ring" fill="none" d="M64 13.5a50 50 0 1 1-0.1 0" />
      </defs>
      <text
        className="fill-v5-text-inverse font-semibold"
        fontSize="15.5"
        dominantBaseline="alphabetic"
      >
        <textPath
          href="#hero-seal-ring"
          textLength={RING_TEXT_LENGTH}
          lengthAdjust="spacing"
        >
          {RING_TEXT}
        </textPath>
      </text>
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="bg-v5-page px-4 pt-[74px] md:px-[30px] md:pt-[134px]">
      <div className="mx-auto max-w-v5-content">
        <div className="relative flex flex-col overflow-hidden rounded-[20px] bg-v5-white p-4 md:flex-row md:items-center md:rounded-v5-panel md:p-[60px] md:pb-[265px]">
          <div className="relative z-10 flex flex-col gap-6 md:w-[582px]">
            <OpenSourceSeal />
            <h1 className="text-v5-hero-sm font-semibold text-v5-text-inverse md:w-[546px] md:text-v5-hero">
              The wallet that made seed phrases obsolete
            </h1>
            <p className="text-v5-label font-normal text-v5-surface-1 md:w-[520px] md:text-v5-subtitle">
              Vultisig uses multi-party computation to achieve native
              multi-factor authentication. No seed phrase, no single key, no
              single target. Available on 30+ chains.
            </p>
            <div className="flex flex-col gap-3 md:flex-row md:gap-5">
              <LandingButton
                asChild
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
            <div className="flex items-center gap-3 md:gap-5">
              <Image
                src="/v5/hero-avatars.webp"
                alt=""
                width={80}
                height={32}
                className="h-6 w-auto md:h-8"
              />
              <p className="text-v5-body-s font-normal text-v5-text-tertiary md:text-v5-link md:text-v5-text-primary">
                Trusted by <span className="font-medium">50,000+</span> vault
                creators worldwide
              </p>
            </div>
          </div>

          {/* The artwork is aspect-locked but the card height is not, so below 1440 it stops short of the stats row — this backs that gap in the same blue as its bottom edge */}
          <div className="hidden md:absolute md:inset-x-0 md:bottom-0 md:top-[31px] md:block md:bg-v5-accent2" />

          {/* Two crops of the same artwork — full-bleed on mobile, bled off the card edges on desktop */}
          <picture className="contents">
            <source
              media="(min-width: 768px)"
              srcSet="/v5/hero-vault.webp"
              width={1380}
              height={692}
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- art direction needs <picture> */}
            <img
              src="/v5/hero-vault-mobile.webp"
              alt="Vultisig mobile vault showing a $53,010.77 balance, a Bitcoin receive QR code and two devices co-signing a transaction"
              width={361}
              height={331}
              fetchPriority="high"
              className="-mx-4 mt-1 block aspect-[361/331] w-[calc(100%+2rem)] max-w-none md:absolute md:left-0 md:top-[31px] md:m-0 md:aspect-[1380/692] md:w-full"
            />
          </picture>
          <StatsBar />
        </div>
      </div>
    </section>
  )
}
