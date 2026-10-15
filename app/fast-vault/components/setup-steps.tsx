"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { LandingButton } from "@/components/ui/landing-button"

type Step = {
  title: string
  body: string
}

const STEPS: Step[] = [
  {
    title: "Download Vultisig & choose Fast Vault",
    body: "Available on iOS, Android, macOS, Windows, Linux, and as a browser extension.",
  },
  {
    title: "Name your vault & enter your email",
    body: "Your email is used once, to send your server share backup. Vultisig doesn't retain it.",
  },
  {
    title: "Set a password",
    body: "This encrypts your server share backup.",
  },
  {
    title: "Confirm and back up your device share",
    body: "Enter the verification code sent to your email, then store your device share somewhere other than the device itself.",
  },
  {
    title: "Start sending",
    body: "One tap on your device, one automatic co-sign from Vultiserver.",
  },
]

/**
 * Index 0 is the resting splash; 1-5 are the screens the frame's hover
 * variants swap in for the step under the pointer.
 */
const SCREENS = [
  "Vultisig app splash screen on a phone",
  "Vault setup screen asking how many devices you have, set to one",
  "Name your vault screen with the keyboard open",
  "Choose a password screen with both password fields filled",
  "Save backup to the cloud screen offering iCloud, Google Drive and Dropbox",
  "Vault home screen showing the portfolio balance and chain list",
].map((alt, index) => ({ src: `/v5/fast-vault-step-${index}.webp`, alt }))

// The frame's smart-animate between variants: 300ms, linear.
const SWAP =
  "transition-opacity [transition-duration:300ms] [transition-timing-function:linear] motion-reduce:[transition-duration:0ms]"

type SetupStepsProps = {
  /**
   * Font class for the 01-05 index. The page passes it in because a font
   * loader cannot run inside a client module's graph.
   */
  indexFontClassName: string
}

export default function SetupSteps({ indexFontClassName }: SetupStepsProps) {
  const [activeScreen, setActiveScreen] = useState(0)

  return (
    <section className="bg-v5-page pt-8 md:px-[30px] md:pt-[30px]">
      <div className="mx-auto flex max-w-v5-content flex-col gap-8 rounded-[20px] bg-v5-white px-4 py-9 md:gap-[50px] md:rounded-v5-panel md:p-[60px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-3.5">
          <div className="flex flex-col gap-3.5 text-v5-text-inverse md:max-w-[772px]">
            <h2 className="text-v5-display-sm font-medium md:text-v5-display">
              Live in under two minutes.
            </h2>
            <p className="text-v5-body-m font-normal md:text-v5-subtitle">
              From download to your first signed transaction.
            </p>
          </div>
          <LandingButton
            asChild
            variant="primary"
            size="sm"
            invertOnHover
            className="h-[50px] w-full shrink-0 text-v5-white md:w-[185px]"
          >
            <Link href="/downloads">Create Fast Vault</Link>
          </LandingButton>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-[50px]">
          <div className="relative aspect-[605/657] w-full overflow-hidden rounded-[20px] bg-v5-accent md:rounded-v5-panel lg:flex-1">
            {SCREENS.map((screen, index) => (
              <Image
                key={screen.src}
                src={screen.src}
                alt={screen.alt}
                aria-hidden={index !== activeScreen}
                fill
                sizes="(min-width: 1024px) 605px, 100vw"
                className={`object-cover ${SWAP} ${
                  index === activeScreen ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          {/*
            The list, not each card, hands the phone back to the splash, so the
            pointer crossing the gap between two cards does not flash it.

            The frame fixes each card at 115px with 20px padding and centres the
            content, so a two-line step overflows that padding and actually sits
            13.5px in. The vertical padding is that inset, with 115 as a floor,
            which lands both the one- and two-line cards where the frame has
            them without clipping a step that wraps further on a narrower row.
          */}
          <ol
            className="flex flex-col gap-5 lg:flex-1"
            onMouseLeave={() => setActiveScreen(0)}
          >
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                onMouseEnter={() => setActiveScreen(index + 1)}
                className="flex flex-col justify-center gap-2 rounded-[20px] bg-v5-page p-5 text-v5-text-inverse lg:min-h-[115px] lg:py-[13.5px]"
              >
                <div className="flex items-center gap-3.5">
                  <span
                    aria-hidden
                    className={`${indexFontClassName} shrink-0 text-v5-step-index font-medium text-v5-cta`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-v5-step-title font-semibold">
                    {step.title}
                  </h3>
                </div>
                <p className="text-v5-body-m-tight font-normal">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
