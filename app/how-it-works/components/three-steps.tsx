import Image from "next/image"

import SectionHeading from "@/components/ui/section-heading"

type Step = {
  title: string
  body: string
  icon: { src: string; alt: string }
}

const STEPS: Step[] = [
  {
    title: "Vault creation",
    body: "Your devices run a distributed key generation ceremony. Each device produces its own cryptographic share - no full key is ever assembled anywhere.",
    icon: {
      src: "/v5/hiw-step-vault-creation.svg",
      alt: "Blue vault door icon",
    },
  },
  {
    title: "Shares distributed",
    body: "Each device gets its own Vault Share - a backup of its fragment only. Store it in iCloud, on a USB, anywhere.",
    icon: {
      src: "/v5/hiw-step-shares.svg",
      alt: "Purple padlock beside a key icon",
    },
  },
  {
    title: "Threshold signing",
    body: "Signing happens in fragments across your threshold - the setup depends on which vault type you chose.",
    icon: {
      src: "/v5/hiw-step-signing.svg",
      alt: "Green signed document icon",
    },
  },
]

function StepCard({ title, body, icon }: Step) {
  return (
    <li className="flex flex-1 flex-col items-center gap-4 rounded-2xl bg-v5-page p-4 text-center text-v5-text-inverse md:h-[296px] md:items-start md:gap-5 md:rounded-3xl md:p-[30px] md:text-left">
      <Image
        src={icon.src}
        alt={icon.alt}
        width={62}
        height={62}
        className="size-[42px] md:size-[62px]"
      />
      <div className="flex flex-col gap-3.5">
        <h3 className="text-v5-card-title-sm font-semibold md:text-v5-card-title">
          {title}
        </h3>
        <p className="text-v5-body-m-tight font-normal">{body}</p>
      </div>
    </li>
  )
}

export default function ThreeSteps() {
  return (
    <section
      id="three-steps"
      className="bg-v5-page pt-8 md:px-[30px] md:pt-[30px]"
    >
      <div className="mx-auto max-w-v5-content">
        <div className="flex flex-col items-center gap-8 rounded-[20px] bg-v5-white px-4 py-9 md:gap-[50px] md:rounded-v5-panel md:p-[60px]">
          <SectionHeading
            title="Three steps. No seed phrase."
            subtitle="From vault creation to signing, here's what actually happens under the hood."
          />
          <ul className="flex w-full flex-col gap-5 md:flex-row md:items-stretch">
            {STEPS.map((step) => (
              <StepCard key={step.title} {...step} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
