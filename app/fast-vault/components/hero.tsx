import Image from "next/image"
import Link from "next/link"

import { LandingButton } from "@/components/ui/landing-button"

import { TERTIARY_BUTTON_CLASS } from "./button-styles"
import { ArrowDownIcon, DownloadIcon } from "./icons"

const ILLUSTRATION_ALT =
  "A phone on a pedestal showing the Fast Vault setup screen, beside a shield on a server stack and floating lightning-bolt coins"

export default function Hero() {
  return (
    <section className="bg-v5-page px-4 pt-[74px] md:px-[30px] md:pt-[134px]">
      <div className="mx-auto max-w-v5-content">
        <div className="relative flex flex-col overflow-hidden rounded-[20px] bg-v5-fast-vault px-4 pb-8 pt-[60px] md:rounded-v5-panel md:px-[60px] md:pb-[60px] md:pt-[120px] xl:flex-row xl:items-center xl:py-[120px]">
          <div className="relative z-10 flex flex-col justify-center gap-6 xl:w-[582px]">
            <h1 className="text-v5-hero-sm font-semibold text-v5-text-primary md:w-[546px] md:text-v5-hero">
              One device.
              <br />
              Instant signing.
            </h1>
            <p className="text-v5-label font-normal text-v5-text-primary md:w-[500px] md:text-v5-subtitle">
              Fast Vault pairs your device with a secure Vultiserver as an
              automatic second signer. You get the speed of a single-signature
              wallet, with the protection of a threshold signature scheme.
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
                  <DownloadIcon />
                  Create a Fast Vault
                </Link>
              </LandingButton>
              <LandingButton
                asChild
                variant="secondary"
                size="sm"
                invertOnHover
                className={`h-[50px] w-full md:w-[231px] ${TERTIARY_BUTTON_CLASS}`}
              >
                <Link href="#comparison">
                  Secure Vault Comparison
                  <ArrowDownIcon />
                </Link>
              </LandingButton>
            </div>
          </div>

          {/*
            Below the copy until the row is wide enough to hold both; from xl it
            sits where the frame puts it, as shares of the card width so it
            shrinks with the card rather than sliding under the headline. The
            plate overhangs the right edge by design.
          */}
          <Image
            src="/v5/fast-vault-hero.webp"
            alt={ILLUSTRATION_ALT}
            width={1862}
            height={1142}
            priority
            sizes="(min-width: 1280px) 931px, 100vw"
            className="-mx-4 -mb-8 mt-6 block h-auto w-[calc(100%+2rem)] max-w-none md:-mx-[60px] md:-mb-[60px] md:mt-[30px] md:w-[calc(100%+120px)] xl:absolute xl:left-[35.36%] xl:top-1/2 xl:m-0 xl:w-[67.46%] xl:-translate-y-1/2"
          />
        </div>
      </div>
    </section>
  )
}
