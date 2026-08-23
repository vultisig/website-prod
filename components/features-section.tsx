import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { supportedChainCountLabel } from "@/content/chain-count"
import SectionHeading from "@/components/ui/section-heading"

type Feature = {
  title: string
  body: string
  image: { src: string; alt: string; width: number; height: number }
  /** Artwork width as a share of the card, desktop then mobile. */
  imageClass: string
}

const FEATURES: Feature[] = [
  {
    title: "Phishing-proof by design",
    body: "Vultisig's built in MFA architecture protects users against attacks used to drain traditional single point of failure wallets.",
    image: {
      src: "/v5/feature-phishing.webp",
      alt: "Shield deflecting phishing hooks",
      width: 726,
      height: 627,
    },
    imageClass: "w-[57.1%] md:w-[69.8%]",
  },
  {
    title: "No seed phrase, ever",
    body: "Vultisig provides simple-to-use vault shares that can be stored anywhere without compromising security.",
    image: {
      src: "/v5/feature-seedless.webp",
      alt: "Two vault doors standing open side by side",
      width: 1013,
      height: 666,
    },
    imageClass: "w-[67.5%] md:w-[97.3%]",
  },
  {
    title: "Truly omni-chain",
    body: `Our Vault system works across ${supportedChainCountLabel} chains already, while staying flexible and dynamic - enabling a truly seamless user experience.`,
    image: {
      src: "/v5/feature-omnichain.webp",
      alt: "Safe beside a stack of coins from different blockchains",
      width: 924,
      height: 606,
    },
    imageClass: "w-[68.7%] md:w-[88.8%]",
  },
]

function FeatureCard({ title, body, image, imageClass }: Feature) {
  return (
    <li className="flex h-[334px] flex-1 flex-col items-center justify-between rounded-2xl bg-v5-white p-4 text-v5-text-inverse md:h-[425px] md:items-start md:rounded-3xl md:p-[30px]">
      <h3 className="text-v5-card-title-sm font-semibold md:text-v5-card-title">
        {title}
      </h3>
      <Image
        {...image}
        sizes="(max-width: 767px) 60vw, 25vw"
        className={`${imageClass} h-auto self-center`}
      />
      <p className="text-center text-v5-body-m-tight font-normal md:text-left">
        {body}
      </p>
    </li>
  )
}

/**
 * Landing Page Button / Secondary, per Figma's Default and Hover variants.
 * Hovering fills the pill with the CTA blue, flips the label to white and pulls
 * the padding in from 24px to 16px. The arrow keeps the CTA blue rather than
 * turning white, so it dissolves into the new fill as its own slot collapses.
 * The reference instead holds the arrow still and lets the closing right edge
 * clip it, which no content-sized box can do — the fade reads the same and this
 * way the pill still hugs whatever the label says.
 *
 * Timings come off the reference clip: in, everything rides one ~360ms ease-out
 * (measured 0.24 / 0.56 / 0.88 of the travel at a quarter, half and three
 * quarters). Out is slower and springs ~7% past the resting width around 80% of
 * the way through, which the bezier below approximates; the colours land first
 * on a plain ease-out because overshooting them flashes the fill past #f0f4fc
 * to near-white.
 *
 * The transitions are written out in full because tailwindcss-animate and
 * tailwindcss-motion both redefine `duration-*` and `ease-*`, which shadows
 * core's arbitrary values — the same trap noted in chains-section.
 */
const AUDIT_MOTION =
  "[transition:padding_520ms_cubic-bezier(0.3,0.6,0.4,1.22),background-color_380ms_ease-out,border-color_380ms_ease-out,color_380ms_ease-out,box-shadow_380ms_ease-out] hover:[transition:all_360ms_ease-out] motion-reduce:!transition-none"

/** Matches AUDIT_MOTION so the slot and the padding close on the same curve. */
const AUDIT_ARROW_MOTION =
  "[transition:width_520ms_cubic-bezier(0.3,0.6,0.4,1.22),margin_520ms_cubic-bezier(0.3,0.6,0.4,1.22)] group-hover:[transition:all_360ms_ease-out] motion-reduce:!transition-none"

function AuditLink() {
  return (
    <Link
      href="https://docs.vultisig.com/other/security"
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex h-[50px] items-center whitespace-nowrap rounded-xl border border-v5-white bg-v5-page px-6 py-3.5 text-v5-button-sm font-medium text-v5-cta shadow-v5-button hover:border-transparent hover:bg-v5-cta hover:px-4 hover:text-v5-white hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-v5-white focus-visible:ring-offset-2 focus-visible:ring-offset-v5-purple ${AUDIT_MOTION}`}
    >
      Audited by Trail of Bits
      <span
        className={`ml-2 w-4 overflow-hidden text-v5-cta group-hover:ml-0 group-hover:w-0 ${AUDIT_ARROW_MOTION}`}
      >
        <ArrowRight className="size-4 max-w-none" aria-hidden />
      </span>
    </Link>
  )
}

export default function FeaturesSection() {
  return (
    <section className="bg-v5-page pt-4 md:px-[30px] md:pt-[30px]">
      <div className="mx-auto max-w-v5-content">
        <div className="flex flex-col items-center gap-8 rounded-[20px] bg-v5-purple px-4 pb-12 pt-5 md:gap-[50px] md:rounded-v5-panel md:p-[60px]">
          <SectionHeading
            tone="onDark"
            title="Built different. Secured different."
            subtitle="No tradeoffs. Just seamless, secure crypto management."
          />
          <ul className="flex w-full flex-col gap-5 md:flex-row md:items-start">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </ul>
          <AuditLink />
        </div>
      </div>
    </section>
  )
}
