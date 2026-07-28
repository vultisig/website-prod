import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { LandingButton } from "@/components/ui/landing-button"

type Step = {
  title: string
  body: string
  art: { src: string; alt: string }
}

const STEPS: Step[] = [
  {
    title: "Download app",
    body: "Start by downloading the Vultisig app from the App Store or Google Play to get access to the platform and airdrop.",
    art: {
      src: "/v5/vult-arena-download.webp",
      alt: "3D App Store and Google Play tiles with a download arrow badge",
    },
  },
  {
    title: "Setup Multi factor",
    body: "Create a Vault with multi-factor authentication to protect your assets and enhance your security.",
    art: {
      src: "/v5/vult-arena-multifactor.webp",
      alt: "3D login window with a passcode field and a padlocked profile badge",
    },
  },
  {
    title: "Backup your Vault",
    body: "Each device in a vault has its own backup share. Back it up.",
    art: {
      src: "/v5/vult-arena-backup.webp",
      alt: "3D cloud-storage icons for iCloud, Google Drive and Dropbox around an upload tile",
    },
  },
  {
    title: "Transfer funds",
    body: "Deposit funds into Vultisig vaults to qualify for the arena and participate in platform activities.",
    art: {
      src: "/v5/vult-arena-transfer.webp",
      alt: "3D coins moving between two wallet tiles",
    },
  },
  {
    title: "Join the arena",
    body: "Your vault activity earns your position. The more you engage, the higher you climb.",
    art: {
      src: "/v5/vult-arena-arena.webp",
      alt: "3D leaderboard podium with a trophy on top",
    },
  },
]

/** No public Arena URL exists yet — the journey starts at the app download. */
const ARENA_URL = "/downloads"

function JoinButton({ className }: { className?: string }) {
  return (
    <LandingButton asChild variant="light" size="sm" className={className}>
      <Link href={ARENA_URL}>
        Join Now
        <ArrowRight aria-hidden />
      </Link>
    </LandingButton>
  )
}

export default function Arena() {
  return (
    <section className="bg-v5-page pt-8 md:px-[30px] md:pt-[30px]">
      <div className="mx-auto max-w-v5-content">
        <div className="overflow-hidden rounded-[20px] bg-v5-deep py-9 md:rounded-v5-panel md:py-[60px]">
          <div className="flex items-center justify-between gap-6 px-4 md:px-[60px]">
            <h2 className="text-v5-display-sm font-medium text-v5-text-primary md:text-v5-display">
              Join the Vultisig Arena
            </h2>
            <JoinButton className="hidden h-[50px] w-[185px] shrink-0 md:inline-flex" />
          </div>

          <ol className="mt-[30px] flex snap-x snap-mandatory scroll-pl-4 gap-5 overflow-x-auto px-4 [scrollbar-width:none] md:mt-[50px] md:scroll-pl-[60px] md:gap-[30px] md:px-[60px] [&::-webkit-scrollbar]:hidden">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="flex h-[452px] w-[calc(100vw-2rem)] max-w-[361px] shrink-0 snap-start flex-col gap-5 overflow-hidden rounded-[20px] bg-v5-white p-6 md:w-[406px] md:max-w-none md:rounded-v5-panel"
              >
                <span
                  aria-hidden
                  className="flex size-11 shrink-0 items-center justify-center rounded-[13px] bg-v5-page text-v5-step-badge font-semibold text-v5-accent"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-[11.5px] text-v5-text-inverse">
                  <h3 className="text-v5-title1 font-medium">{step.title}</h3>
                  <p className="text-v5-body-s font-medium">{step.body}</p>
                </div>
                <Image
                  src={step.art.src}
                  alt={step.art.alt}
                  width={358}
                  height={243}
                  className="mt-auto h-[243px] w-full shrink-0 object-contain object-bottom"
                />
              </li>
            ))}
          </ol>

          <div className="mt-8 flex justify-center px-4 md:hidden">
            <JoinButton className="h-[50px] w-[300px]" />
          </div>
        </div>
      </div>
    </section>
  )
}
