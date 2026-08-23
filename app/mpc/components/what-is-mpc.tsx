import Image from "next/image"

import SectionHeading from "@/components/ui/section-heading"

type Explainer = {
  title: string
  /** "\n" keeps Figma's hard line break; rendered via whitespace-pre-line. */
  body: string
  image: { src: string; alt: string }
}

const EXPLAINERS: Explainer[] = [
  {
    title: "Key Never Exists",
    body: "An MPC wallet uses Multi-Party Computation to sign transactions without ever creating a complete private key. Each device holds only a partial key shard. The full key is never assembled, stored, or exposed anywhere. Not on your device, not on a server, not even during signing.",
    image: {
      src: "/v5/mpc-what-key-never-exists.webp",
      alt: "A shield in a glass tile wired to two blue key-share tiles",
    },
  },
  {
    title: "Distributed by Design",
    body: "Instead of trusting one device or one backup, MPC distributes cryptographic key shares across multiple independent devices. To authorize a transaction, a threshold of devices must cooperate. No single device can act alone, and no single compromise can drain your wallet.",
    image: {
      src: "/v5/mpc-what-distributed.webp",
      alt: "Stacked device cards labelled MacBook connected, iPhone this device, and one still waiting",
    },
  },
  {
    title: "The Key Difference",
    body: "Traditional wallets store your full private key in one place. Hardware wallets wrap it in better packaging, but it's still a single secret.\nMPC eliminates the single secret entirely. There is no master key to steal, no seed phrase to phish, and no backup to lose.",
    image: {
      src: "/v5/mpc-what-key-difference.webp",
      alt: "A honeycomb of hexagon tiles, three of them holding key, shield and signature glyphs",
    },
  },
]

function ExplainerCard({ title, body, image }: Explainer) {
  return (
    <li className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-v5-page p-5 text-v5-text-inverse md:h-[495px] md:rounded-3xl md:p-[30px]">
      <Image
        src={image.src}
        alt={image.alt}
        width={814}
        height={446}
        sizes="(max-width: 767px) 100vw, 407px"
        className="-mx-5 -mt-5 w-[calc(100%+2.5rem)] max-w-none md:-mx-[30px] md:-mt-[30px] md:w-[calc(100%+60px)]"
      />
      <div className="mt-auto flex flex-col gap-3.5 pt-3.5">
        <h3 className="text-v5-card-title-sm font-semibold md:text-v5-card-title">
          {title}
        </h3>
        {/* 6 body lines at 24px — keeps the three card titles on one baseline. */}
        <p className="whitespace-pre-line text-v5-body-m-tight font-normal md:min-h-[144px]">
          {body}
        </p>
      </div>
    </li>
  )
}

export default function WhatIsMpc() {
  return (
    <section className="bg-v5-page px-4 pt-4 md:px-[30px] md:pt-[30px]">
      <div className="mx-auto max-w-v5-content">
        <div className="flex flex-col items-center gap-8 rounded-[20px] bg-v5-white px-4 py-9 md:gap-[50px] md:rounded-v5-panel md:p-[60px]">
          <SectionHeading title="What Is an MPC Wallet?" />
          <ul className="flex w-full flex-col gap-5 md:flex-row md:items-stretch">
            {EXPLAINERS.map((explainer) => (
              <ExplainerCard key={explainer.title} {...explainer} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
