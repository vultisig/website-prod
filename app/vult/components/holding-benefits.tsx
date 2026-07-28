import Image from "next/image"

import SectionHeading from "@/components/ui/section-heading"

type Benefit = {
  title: string
  body: string
  icon: { src: string; alt: string }
}

const BENEFITS: Benefit[] = [
  {
    title: "Lower swap fees",
    body: "Cut your swap fees by up to 100% as you climb tiers, from Bronze at 1,500 VULT to Ultimate at 1,000,000.",
    icon: {
      src: "/v5/vult-benefit-swap.svg",
      alt: "Isometric blue block with a downward price arrow",
    },
  },
  {
    title: "Feature request priority",
    body: "Submit and vote on what Vultisig builds next.",
    icon: {
      src: "/v5/vult-benefit-request.svg",
      alt: "Isometric blue block with a lightning bolt",
    },
  },
  {
    title: "Higher card cashback",
    body: "Your VULT tier sets your card cashback rate too.",
    icon: {
      src: "/v5/vult-benefit-cashback.svg",
      alt: "Isometric blue block shaped like a payment card",
    },
  },
]

const PHONE_ALT =
  "The Vultisig app's $VULT Discount Tiers screen, listing Bronze at 1,500 $VULT, Silver at 3,000 and Gold at 7,500 with its 20bps swap discount active"

export default function HoldingBenefits() {
  return (
    <section className="bg-v5-page pt-8 md:px-[30px] md:pt-[30px]">
      <div className="mx-auto max-w-v5-content">
        <div className="flex flex-col gap-8 rounded-[20px] bg-v5-white px-4 py-9 md:gap-[50px] md:rounded-v5-panel md:px-[60px] md:py-[60px]">
          <SectionHeading
            title="What holding VULT gets you"
            subtitle="The more you hold, the more it does."
          />

          <div className="flex flex-col gap-5 md:flex-row md:gap-[50px]">
            <Image
              src="/v5/vult-holding-phone.webp"
              alt={PHONE_ALT}
              width={605}
              height={719}
              className="h-auto w-full self-start rounded-[20px] md:min-w-0 md:flex-1 md:rounded-v5-panel"
            />

            <ul className="flex flex-col gap-5 md:min-w-0 md:flex-1 md:gap-[30px]">
              {BENEFITS.map((benefit) => (
                <li
                  key={benefit.title}
                  className="flex flex-1 flex-col gap-3.5 rounded-[20px] bg-v5-page p-5 text-v5-text-inverse"
                >
                  <Image
                    src={benefit.icon.src}
                    alt={benefit.icon.alt}
                    width={52}
                    height={52}
                    className="size-[52px]"
                  />
                  <h3 className="text-v5-card-title-sm font-semibold md:text-v5-card-title">
                    {benefit.title}
                  </h3>
                  <p className="text-v5-body-m font-normal md:text-v5-subtitle">
                    {benefit.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
