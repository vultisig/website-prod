import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import SectionHeading from "@/components/ui/section-heading"
import { LandingButton } from "@/components/ui/landing-button"

type Step = {
  title: string
  body: string
  art: {
    src: string
    alt: string
    width: number
    height: number
    /** Share of the card width, mobile then desktop. */
    widthClass: string
    /** Distance from the card top, mobile then desktop. */
    topClass: string
  }
}

const STEPS: Step[] = [
  {
    title: "Lose device",
    body: "Don't panic. Your vault remains safe with your backups even if a device is lost, stolen, or broken.",
    art: {
      src: "/v5/hiw-recovery-lose-device.webp",
      alt: "A phone lying face up with a warning sign floating above it",
      width: 300,
      height: 212,
      widthClass: "w-[72.6%] md:w-full",
      topClass: "top-[113px] md:top-[157px]",
    },
  },
  {
    title: "Get new device",
    body: "Set up a new phone, desktop, or tablet just like you would normally.",
    art: {
      src: "/v5/hiw-recovery-new-device.webp",
      alt: "An open laptop showing a completed setup step",
      width: 300,
      height: 246,
      widthClass: "w-[66.5%] md:w-full",
      topClass: "top-[108px] md:top-[127px]",
    },
  },
  {
    title: "Import backup",
    body: "Use the backup Vault Share you stored securely to re-import your lost device.",
    art: {
      src: "/v5/hiw-recovery-import-backup.webp",
      alt: "A cloud with an upload arrow, representing a stored Vault Share",
      width: 300,
      height: 216,
      widthClass: "w-[72.6%] md:w-full",
      topClass: "top-[106px] md:top-[148px]",
    },
  },
  {
    title: "Respawned",
    body: "Your vault is fully restored and ready to use. No keys exposed, no funds at risk.",
    art: {
      src: "/v5/hiw-recovery-respawned.webp",
      alt: "A safe with a shield resting on top of it",
      width: 300,
      height: 231,
      widthClass: "w-[72.6%] md:w-full",
      topClass: "top-[117px] md:top-[148px]",
    },
  },
]

function StepCard({ title, body, art }: Step) {
  return (
    // The artwork deliberately overhangs the card's bottom edge, so no clipping.
    <li className="group relative flex h-[240px] w-full flex-col items-center gap-3 rounded-2xl bg-v5-white p-5 text-center text-v5-text-inverse md:h-[299px] md:flex-1 md:items-start md:gap-4 md:rounded-[20px] md:text-left">
      <h3 className="text-v5-card-title-sm font-semibold md:text-v5-card-title-md">
        {title}
      </h3>
      <p className="w-full text-v5-body-m-tight font-normal md:text-v5-body-l-relaxed">
        {body}
      </p>
      <Image
        src={art.src}
        alt={art.alt}
        width={art.width}
        height={art.height}
        sizes="(max-width: 767px) 72vw, 300px"
        className={`absolute left-1/2 h-auto max-w-none -translate-x-1/2 group-hover:-rotate-[11.4deg] group-hover:scale-[1.134] md:left-0 md:translate-x-0 ${art.widthClass} ${art.topClass}`}
      />
    </li>
  )
}

export default function Recovery() {
  return (
    <section className="bg-v5-page pt-8 md:px-[30px] md:pt-[30px]">
      <div className="mx-auto flex max-w-v5-content flex-col items-center rounded-[20px] bg-v5-purple px-4 pb-[58px] pt-9 md:rounded-v5-panel md:px-[60px] md:pb-[100px] md:pt-[60px]">
        <SectionHeading
          tone="onDark"
          title="Lost a device? Four steps back."
          subtitle="Recovery is simple, seedless, and doesn't expose your funds at any point."
        />
        <ul className="mt-8 flex w-full flex-col gap-[70px] md:mt-[50px] md:h-[369px] md:flex-row md:items-start md:gap-5">
          {STEPS.map((step) => (
            <StepCard key={step.title} {...step} />
          ))}
        </ul>
        <LandingButton
          asChild
          variant="light"
          size="sm"
          className="mt-[112px] h-[50px] w-[300px] md:mt-[50px] md:w-[185px]"
        >
          <Link href="/mpc" aria-label="Learn more about MPC wallets">
            Learn More
            <ArrowRight aria-hidden />
          </Link>
        </LandingButton>
      </div>
    </section>
  )
}
