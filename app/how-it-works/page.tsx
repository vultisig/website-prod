import BestFeaturesSection from "@/components/best-features-section"
import CtaSection from "@/components/cta-section"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { MdArrowOutward } from "react-icons/md"
import { HiArrowDown } from "react-icons/hi2"
import heroIllustration from "./images/hero-illustration.png"
import mechanismStep1 from "./images/mechanism-step1.png"
import mechanismStep2 from "./images/mechanism-step2.png"
import mechanismStep3 from "./images/mechanism-step3.png"
import multiDevice from "./images/multi-device.png"
import vaultShares from "./images/vault-shares.png"

export default function HowItWorks() {
  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/how-it-works/hero-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="relative container pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge>How Vultisig works</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-semibold leading-[1.1] tracking-tight text-textPrimary">
                Your key was never
                <br />
                <span className="text-textPrimary/70">whole</span> to begin
                with.
              </h1>
              <p className="text-textSecondary text-lg md:text-xl leading-relaxed max-w-lg">
                Vultisig splits your vault across multiple devices using MPC
                threshold signatures. No single device holds the full key.
                There&apos;s nothing to steal, lose, or leak.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/downloads"
                  className={cn(
                    buttonVariants({ variant: "primaryBlue", size: "default" }),
                    "rounded-xl gap-2"
                  )}
                >
                  <HiArrowDown className="size-4" />
                  Download Free
                </Link>
                <Link
                  href="#mechanism"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "default" }),
                    "rounded-xl gap-2"
                  )}
                >
                  How It Works
                  <MdArrowOutward className="size-4" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src={heroIllustration}
                alt="Vultisig MPC vault illustration"
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* THE MECHANISM SECTION */}
      <section
        id="mechanism"
        className="relative py-20 md:py-32 overflow-hidden"
      >
        <div className="absolute -left-40 top-20 w-[1776px] h-[400px] bg-[radial-gradient(circle,rgba(4,57,199,0.24)_0%,transparent_100%)] blur-[51px]" />

        <div className="relative container">
          <div className="mb-16 space-y-5 intersect-once intersect:motion-preset-slide-up-md">
            <Badge>The mechanism</Badge>
            <h2 className="text-4xl md:text-5xl font-semibold text-textPrimary">
              Three steps.
              <br />
              No seed phrase.
            </h2>
            <p className="text-textSecondary text-lg md:text-xl max-w-lg">
              From vault creation to signing, here&apos;s what actually happens
              under the hood.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {mechanismSteps.map((step) => (
              <div
                key={step.number}
                className="bg-gradient-to-b from-background to-backgroundSecondary border border-borderLight rounded-3xl p-6 flex flex-col gap-5 intersect-once intersect:motion-preset-slide-up-md"
              >
                <span className="text-5xl font-semibold text-primaryBlue/20">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    {step.title}
                  </h3>
                </div>
                <p className="text-textSecondary text-sm leading-relaxed">
                  {step.description}
                </p>
                <div className="mt-auto">
                  <Image
                    src={step.image}
                    alt={step.title}
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MULTI-DEVICE SECTION */}
      <section className="relative py-20 md:py-32">
        <div className="relative container">
          <div className="grid lg:grid-cols-2 gap-12 items-start intersect-once intersect:motion-preset-slide-up-md">
            <div className="space-y-5">
              <Badge>Multi-device</Badge>
              <h2 className="text-4xl md:text-5xl font-semibold text-textPrimary">
                Bring your
                <br />
                own devices.
              </h2>
              <div className="text-textTertiary text-base md:text-lg leading-relaxed space-y-4">
                <p>
                  Phone, desktop, tablet &mdash; any device you already own
                  becomes part of your vault.{" "}
                  <span className="text-[#F0F4FC]">
                    No hardware wallet required. No extra purchases.
                  </span>{" "}
                  Just the devices in your pocket and on your desk.
                </p>
                <p>
                  Together, your devices form a vault that no single one of them
                  can access alone. If one is lost or stolen, your funds are
                  safe.
                </p>
              </div>
            </div>
            <div>
              <Image
                src={multiDevice}
                alt="Multi-device vault setup showing iPhone, MacBook, and waiting device"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VAULT SHARES SECTION */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -left-40 top-20 bottom-0 w-[1776px] h-[400px] bg-[radial-gradient(circle,rgba(4,57,199,0.24)_0%,transparent_100%)] blur-[51px]" />
        </div>

        <div className="relative container">
          <div className="grid lg:grid-cols-2 gap-12 items-start intersect-once intersect:motion-preset-slide-up-md">
            <div>
              <Image
                src={vaultShares}
                alt="Vault shares distributed across devices with share 1, 2, and 3"
                className="w-full h-auto"
              />
            </div>
            <div className="space-y-5">
              <Badge>Vault Shares</Badge>
              <h2 className="text-4xl md:text-5xl font-semibold text-textPrimary">
                Backups that
                <br />
                can&apos;t betray you.
              </h2>
              <div className="text-textTertiary text-base md:text-lg leading-relaxed space-y-4">
                <p>
                  Each device produces a Vault Share &mdash; a secure backup of
                  only its own fragment.{" "}
                  <span className="text-[#F0F4FC]">
                    A single Vault Share contains no funds and reveals nothing
                    on its own.
                  </span>
                </p>
                <p>
                  Store each share anywhere: cloud, USB, email. It doesn&apos;t
                  matter where &mdash; it takes two to sign and zero single
                  shares hold value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECOVERY SECTION */}
      <section className="relative py-20 md:py-32">
        <div className="relative container">
          <div className="mb-16 space-y-5 intersect-once intersect:motion-preset-slide-up-md">
            <Badge>Recovery</Badge>
            <h2 className="text-4xl md:text-5xl font-semibold text-textPrimary">
              Lost a device?
              <br />
              Four steps back.
            </h2>
            <p className="text-textSecondary text-lg md:text-xl max-w-lg">
              Recovery is simple, seedless, and doesn&apos;t expose your funds
              at any point.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recoverySteps.map((step) => (
              <div
                key={step.number}
                className="relative bg-gradient-to-b from-[#0B1D3A] to-background border border-borderLight rounded-[20px] p-6 flex flex-col gap-4 overflow-hidden intersect-once intersect:motion-preset-slide-up-md"
              >
                <span className="absolute top-4 right-5 text-7xl font-bold text-primaryBlue/10 leading-none">
                  {step.number}
                </span>
                <img src={step.icon} alt="" className="h-9 w-auto" />
                <h3 className="text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <div className="w-full h-px bg-borderLight" />
                <p className="text-sm text-white/80 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <CtaSection />
    </main>
  )
}

function Badge({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center bg-[#4879FD]/[0.06] border border-[#4879FD]/20 text-[#4879FD] px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest w-fit",
        className
      )}
    >
      {children}
    </div>
  )
}

const mechanismSteps = [
  {
    number: "1",
    title: "Vault creation",
    description:
      "Your devices run a distributed key generation ceremony. Each device produces its own cryptographic share - no full key is ever assembled anywhere.",
    image: mechanismStep1,
  },
  {
    number: "2",
    title: "Shares distributed",
    description:
      "Each device gets its own Vault Share - a backup of its fragment only. Store it in iCloud, on a USB, anywhere.",
    image: mechanismStep2,
  },
  {
    number: "3",
    title: "Threshold signing",
    description:
      "Signing happens in fragments across your threshold - the setup depends on which vault type you chose.",
    image: mechanismStep3,
  },
]

const recoverySteps = [
  {
    number: "1",
    title: "Lose device",
    description:
      "Don't panic. Your vault remains safe even if a device is lost, stolen, or broken.",
    icon: "/images/how-it-works/recovery-icon-1.svg",
  },
  {
    number: "2",
    title: "Get new device",
    description:
      "Set up a new phone, desktop, or tablet just like you would normally.",
    icon: "/images/how-it-works/recovery-icon-2.svg",
  },
  {
    number: "3",
    title: "Import backup",
    description:
      "Use the backup Vault Share you stored securely to re-import your lost device.",
    icon: "/images/how-it-works/recovery-icon-3.svg",
  },
  {
    number: "4",
    title: "Respawned",
    description:
      "Your vault is fully restored and ready to use. No keys exposed, no funds at risk.",
    icon: "/images/how-it-works/recovery-icon-4.svg",
  },
]
