import Image from "next/image"

import SectionHeading from "@/components/ui/section-heading"

import { ArrowRightLargeIcon } from "./icons"

type Scenario = {
  title: string
  body: string
  icon: { src: string; alt: string }
}

const SCENARIOS: Scenario[] = [
  {
    title: "Vultiserver gets compromised",
    body: "It holds only one of two shares and can never initiate a transaction alone. An attacker would still need your device's share.",
    icon: {
      src: "/v5/fast-vault-risk-compromised.svg",
      alt: "Dark server tower with orange drive bays",
    },
  },
  {
    title: "Your device is lost or stolen",
    body: "You store and hold both backups, import your device backup into a new device if your old one is lost or stolen. Recovered in minutes.",
    icon: {
      src: "/v5/fast-vault-risk-lost-device.svg",
      alt: "Orange phone lying flat on a grey slab",
    },
  },
  {
    title: "Vultiserver goes offline",
    body: "You are in full control. Import the Server backup into a second device and use it as a normal Secure Vault.",
    icon: {
      src: "/v5/fast-vault-risk-offline.svg",
      alt: "Orange box with a downward arrow",
    },
  },
]

// The frame's hover variant inverts the card to navy with light ink: 300ms,
// linear. Touch screens skip it so a tap does not leave a card stuck dark.
const HOVER =
  "transition-colors [transition-duration:300ms] [transition-timing-function:linear] motion-reduce:[transition-duration:0ms] [@media(hover:hover)]:hover:bg-v5-surface-dark [@media(hover:hover)]:hover:text-v5-text-primary"

function ScenarioCard({ title, body, icon }: Scenario) {
  return (
    // The frame fixes the card at 199px, which the two-line body overruns by
    // 3px into the bottom padding; 17px there reproduces that height.
    <li
      className={`flex flex-col gap-3.5 rounded-[20px] bg-v5-page p-5 text-v5-text-inverse lg:pb-[17px] ${HOVER}`}
    >
      <div className="flex items-center justify-between gap-3.5">
        <Image
          src={icon.src}
          alt={icon.alt}
          width={42}
          height={42}
          className="size-[42px]"
        />
        <ArrowRightLargeIcon className="size-6 shrink-0" />
      </div>
      <h3 className="text-v5-card-title-sm font-semibold md:text-v5-card-title">
        {title}
      </h3>
      <p className="text-v5-body-m-tight font-normal md:text-v5-body-l-relaxed">
        {body}
      </p>
    </li>
  )
}

export default function ThresholdScenarios() {
  return (
    <section className="bg-v5-page pt-8 md:px-[30px] md:pt-[30px]">
      <div className="mx-auto flex max-w-v5-content flex-col gap-8 rounded-[20px] bg-v5-white px-4 py-9 md:gap-[50px] md:rounded-v5-panel md:p-[60px]">
        <SectionHeading
          title="Fast Vault is still a threshold signature scheme."
          subtitle="Vultiserver holds one of two shares and has no ability to act on its own."
        />
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-[50px]">
          <ul className="flex flex-col gap-5 md:gap-[30px] lg:flex-1">
            {SCENARIOS.map((scenario) => (
              <ScenarioCard key={scenario.title} {...scenario} />
            ))}
          </ul>
          <div className="relative aspect-[605/657] w-full overflow-hidden rounded-[20px] bg-v5-surface-dark md:rounded-v5-panel lg:flex-1">
            <Image
              src="/v5/fast-vault-threshold.webp"
              alt="A shield standing on a server on a dark tiled floor"
              fill
              sizes="(min-width: 1024px) 605px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
