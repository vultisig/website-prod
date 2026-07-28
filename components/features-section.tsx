import Image from "next/image"

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
    body: "Our Vault system works across over 30 chains already, while staying flexible and dynamic - enabling a truly seamless user experience.",
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
        </div>
      </div>
    </section>
  )
}
