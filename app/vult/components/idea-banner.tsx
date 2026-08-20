import { ArrowRight } from "lucide-react"
import Image from "next/image"

import { LandingButton } from "@/components/ui/landing-button"

import { FEATURE_REQUEST_URL } from "../token"

const ART_ALT =
  "Four stacked 3D speech bubbles reading More Chains, Price Alerts and Solana NFTs, angled toward a white spotlight"

export default function IdeaBanner() {
  return (
    <section className="bg-v5-page pt-8 md:px-[30px] md:pt-[30px]">
      <div className="relative mx-auto flex max-w-v5-content flex-col overflow-hidden rounded-[20px] bg-v5-royal md:block md:aspect-[1380/495] md:rounded-v5-panel">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-v5-dots bg-v5-dots-tile opacity-20"
        />

        {/*
          Layered like the design: the white beam sits over the dotted blue,
          and the chips are clipped to the same beam polygon so nothing spills
          onto the blue. Inside the beam the chips file's white ground blends
          into the beam's white.
        */}
        <div className="relative order-last aspect-[781/495] w-full md:absolute md:right-0 md:top-0 md:aspect-auto md:h-full md:w-[56.59%]">
          <svg
            aria-hidden
            viewBox="0 0 781 507"
            preserveAspectRatio="none"
            className="absolute left-0 top-0 h-[102.42%] w-full"
          >
            <path d="M17.5 220L781 0V507L0 275.5L17.5 220Z" fill="white" />
          </svg>
          <div className="absolute inset-0 [clip-path:polygon(2.24%_44.44%,100%_0%,100%_102.42%,0%_55.66%)]">
            <Image
              src="/v5/vult-idea-chips.webp"
              alt={ART_ALT}
              width={985}
              height={479}
              className="absolute left-[2.56%] top-[4.04%] w-[126.12%] max-w-none"
            />
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-[18px] px-6 pb-9 pt-9 md:absolute md:left-[49px] md:top-1/2 md:w-[586px] md:-translate-y-1/2 md:px-0 md:pb-9 md:pt-0">
          <h2 className="text-v5-display-sm-tight font-semibold capitalize text-v5-text-primary md:text-v5-display-lg">
            <span className="block">Got an idea?</span>
            <span className="block">Put it in</span>
            <span className="block">front of the team</span>
          </h2>
          <p className="text-v5-link font-normal text-v5-text-primary">
            Hold VULT, submit a request, and vote on what ships next.
          </p>
          <LandingButton
            asChild
            variant="light"
            size="sm"
            className="h-[50px] w-full md:w-[212px]"
          >
            <a
              href={FEATURE_REQUEST_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Submit a Request
              <ArrowRight aria-hidden />
            </a>
          </LandingButton>
        </div>
      </div>
    </section>
  )
}
