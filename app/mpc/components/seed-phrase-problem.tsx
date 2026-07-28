import Image from "next/image"

import SectionHeading from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

type Risk = {
  /** A "\n" forces the desktop line break Figma sets; it collapses on mobile. */
  title: string
  body: string
  icon: { src: string; alt: string }
  /** Figma mirrors the padlock on the last card. */
  mirrored?: boolean
}

const RISKS: Risk[] = [
  {
    title: "Phishing Attacks",
    body: "Seed phrases are prime targets for sophisticated phishing schemes and social engineering. One error and your assets are gone.",
    icon: {
      src: "/v5/mpc-risk-phishing.svg",
      alt: "A fish hook pulling a key out of a dark wallet",
    },
  },
  {
    title: "Physical \nTheft",
    body: "A seed phrase on paper or a single hardware device is a honeypot. Anyone who finds it controls your funds instantly.",
    icon: {
      src: "/v5/mpc-risk-theft.svg",
      alt: "A closed wallet holding a green banknote",
    },
  },
  {
    title: "Human \nError",
    body: "Lost phrases, typos, or forgotten locations mean permanent loss of funds.",
    icon: {
      src: "/v5/mpc-risk-human-error.svg",
      alt: "A dark disc marked with a cross",
    },
  },
  {
    title: "Single Point of Failure",
    body: "One seed phrase means one point of failure. Compromise it once and every asset across every chain is lost forever.",
    icon: {
      src: "/v5/mpc-risk-single-point.svg",
      alt: "A single padlock with its shackle open",
    },
    mirrored: true,
  },
]

function RiskCard({ title, body, icon, mirrored }: Risk) {
  return (
    <li className="flex flex-1 flex-col items-start gap-3.5 rounded-2xl bg-v5-white p-5 text-v5-text-inverse md:h-[335px] md:rounded-3xl md:p-[30px]">
      <Image
        src={icon.src}
        alt={icon.alt}
        width={52}
        height={52}
        className={cn("size-[52px]", mirrored && "-scale-x-100")}
      />
      <h3 className="text-v5-card-title-sm font-semibold md:whitespace-pre-line md:text-v5-card-title">
        {title}
      </h3>
      <p className="text-v5-body-m-tight font-normal">{body}</p>
    </li>
  )
}

export default function SeedPhraseProblem() {
  return (
    <section className="bg-v5-page px-4 pt-4 md:px-[30px] md:pt-[30px]">
      <div className="mx-auto max-w-v5-content">
        <div className="flex flex-col items-center gap-8 rounded-[20px] bg-v5-purple px-4 py-9 md:gap-[50px] md:rounded-v5-panel md:p-[60px]">
          <SectionHeading
            tone="onDark"
            title={
              <>
                Seed Phrases Are a{" "}
                <span className="text-v5-white">$250 Billion</span> Problem
              </>
            }
          />
          <ul className="flex w-full flex-col gap-5 md:flex-row md:items-stretch">
            {RISKS.map((risk) => (
              <RiskCard key={risk.title} {...risk} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
