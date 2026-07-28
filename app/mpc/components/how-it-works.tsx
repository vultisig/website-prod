import { Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { LandingButton } from "@/components/ui/landing-button"
import SectionHeading from "@/components/ui/section-heading"

type Step = {
  title: string
  body: string
  kicker: string
  screen: { src: string; alt: string }
}

const STEPS: Step[] = [
  {
    title: "Create Vault",
    body: "Pair two or more of your own devices: phones, tablets, or desktops. Vultisig generates distributed key shares using the DKLS23 threshold signature protocol. No servers involved, no accounts to create.",
    kicker: "No seed phrases to write down or store",
    screen: {
      src: "/v5/mpc-step-create-vault.webp",
      alt: "Vultisig on iPhone asking how many devices the vault should use, with the slider set to 2",
    },
  },
  {
    title: "Sign Together",
    body: "When you send crypto, your devices communicate directly to co-sign the transaction. Each device contributes its key share without ever revealing it. The result is a standard blockchain transaction: No one can tell it was signed by MPC.",
    kicker: "For Bitcoin, Ethereum, Solana, and 30+ chains",
    screen: {
      src: "/v5/mpc-step-sign-together.webp",
      alt: "Vultisig on iPhone showing a pairing QR code while it waits for the second device to join",
    },
  },
  {
    title: "Stay Sovereign",
    body: "You control every vault share. No company holds a key share on your behalf. No server needs to be online. If Vultisig disappeared tomorrow, your vault shares still work. The code is open source and the protocol is standard.",
    kicker: "Fully self-custodial, fully open source",
    screen: {
      src: "/v5/mpc-step-stay-sovereign.webp",
      alt: "Vultisig on iPhone offering to save an encrypted backup file to iCloud, Google Drive or Dropbox",
    },
  },
]

function StepCard({ title, body, kicker, screen }: Step) {
  return (
    <li className="flex flex-1 flex-col gap-3.5 rounded-2xl bg-v5-white px-6 py-[30px] text-v5-text-inverse md:h-[705px] md:rounded-3xl">
      <h3 className="text-center text-v5-card-title-sm font-semibold md:text-v5-card-title">
        {title}
      </h3>
      <Image
        src={screen.src}
        alt={screen.alt}
        width={718}
        height={750}
        sizes="(max-width: 767px) 90vw, 359px"
        className="w-full"
      />
      {/* 6 body lines at 24px — keeps the three kicker lines on one baseline. */}
      <p className="text-v5-body-m-tight font-normal md:min-h-[144px]">{body}</p>
      <p className="flex min-h-[46px] items-center text-v5-body-m-tight font-semibold text-v5-highlight">
        {kicker}
      </p>
    </li>
  )
}

export default function HowItWorks() {
  return (
    <section className="bg-v5-page px-4 pt-4 md:px-[30px] md:pt-[30px]">
      <div className="mx-auto max-w-v5-content">
        <div className="flex flex-col items-center gap-8 rounded-[20px] bg-v5-deep px-4 py-9 md:gap-[50px] md:rounded-v5-panel md:p-[60px]">
          <SectionHeading tone="onDark" title="How Vultisig Works" />
          <ul className="flex w-full flex-col gap-5 md:flex-row md:items-stretch">
            {STEPS.map((step) => (
              <StepCard key={step.title} {...step} />
            ))}
          </ul>
          <LandingButton
            asChild
            variant="light"
            size="sm"
            className="h-[50px] w-full md:w-[185px]"
          >
            <Link href="/downloads">
              <Download aria-hidden />
              Download App
            </Link>
          </LandingButton>
        </div>
      </div>
    </section>
  )
}
