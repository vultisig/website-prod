import CtaSection from "@/components/cta-section"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Key, Lock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FiUploadCloud } from "react-icons/fi"
import { IoChatboxEllipsesOutline } from "react-icons/io5"
import {
  LuBadgeCheck,
  LuFileQuestion,
  LuTabletSmartphone,
} from "react-icons/lu"
import { MdArrowOutward } from "react-icons/md"
import feature1Png from "./images/feature1.png"
import feature2Png from "./images/feature2.png"
import feature3Png from "./images/feature3.png"
import { Box } from "@/components/ui/box"
import GradientText from "@/components/ui/gradient-text"

export default function HowItWorks() {
  return (
    <main className="min-h-screen container pt-32 pb-20 space-y-32">
      {/* HERO SECTION */}
      <section>
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <Heading subtitle="Introducing Vultisig recovery: Vault shares instead of seed phrases.">
            Wallet recovery <GradientText>re-imagined</GradientText>
          </Heading>
        </div>

        <div className="relative flex flex-col gap-4">
          {features.map((feature, index) => (
            <Box
              key={index}
              style={{
                top: `${index * 30 + 100}px`,
                zIndex: 10 + index,
              }}
              className="sticky overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4 pt-8 p-5 md:p-10">
                  <div className="inline-block bg-secondaryAccent/[0.13] border border-secondaryAccent/[0.5] text-secondaryAccent px-3 py-1 rounded-full text-sm font-medium">
                    {feature.tag}
                  </div>
                  <h3 className="text-2xl lg:text-4xl text-balance font-medium tracking-[-0.792px] text-white">
                    {feature.title}
                  </h3>
                  <div className="text-textSecondary text-base lg:text-lg leading-relaxed">
                    {feature.description}
                  </div>
                </div>
                <div className="w-full place-self-end h-[300px] md:h-[365px] md:w-[648px] relative">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Box>
          ))}
          {/* Spacer to allow cards to scroll past viewport */}
          <div className="h-[50vh]"></div>
        </div>
      </section>

      <section className="mb-32 text-center">
        <Heading subtitle="Simple, secure recovery. No seed phrases needed.">
          How to <GradientText>recover?</GradientText>
        </Heading>

        <div className="grid md:grid-cols-4 gap-5 my-12">
          {recoverySteps.map((step, i) => (
            <Box key={step.question} className="p-5 pb-8 grid gap-6 group">
              <div className="flex justify-between items-center">
                <div className="size-9 flex items-center justify-center bg-primaryAccent/10 text-primaryAccent rounded-lg">
                  <step.icon className="size-6" />
                </div>
                <div className="size-9 grid place-content-center rounded-full border border-borderLight bg-backgroundSecondary font-semibold">
                  {(i + 1).toString().padStart(2, "0")}
                </div>
              </div>
              <h3 className="text-2xl leading-6 font-bold mb-2">
                {step.question}
              </h3>
              <div className="w-full h-px bg-gradient-to-r from-backgroundSecondary/0 via-divider to-backgroundSecondary/0"></div>
              <p className="text-secondary md:opacity-0 md:group-hover:motion-preset-fade-md md:group-hover:opacity-100 md:transition-opacity md:duration-300">
                {step.answer}
              </p>
            </Box>
          ))}
        </div>
      </section>

      {/* TRADITIONAL WALLETS SECTION */}
      <section>
        <Heading>
          How do <GradientText>traditional wallets</GradientText> work?
        </Heading>

        <div className="grid md:grid-cols-3 gap-10 mt-12">
          {traditionalWalletCards.map((item) => (
            <Box
              key={item.title}
              className="px-10 py-8 flex flex-col gap-4 items-start min-h-[240px] max-w-sm"
            >
              <div className="size-9 flex items-center justify-center bg-primaryAccent/10 text-primaryAccent rounded-lg">
                <item.icon className="size-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-textSecondary text-base leading-relaxed">
                {item.description}
              </p>
            </Box>
          ))}
        </div>
      </section>

      {/* SINGLE POINT OF FAILURE SECTION */}
      <section>
        <Heading subtitle="Vultisig eliminates the risks of traditional key management with next-gen crypto vaults.">
          Private keys: a <GradientText>single</GradientText> point of failure
        </Heading>

        <div className="grid md:grid-cols-2 gap-8 my-7">
          {singlePointFailureCards.map((item) => (
            <Box
              key={item.title}
              className="p-5 pb-52 md:p-10 md:pb-60 flex flex-col items-start min-h-[340px] overflow-hidden relative"
            >
              <img
                src={item.image}
                className="absolute bottom-0 right-0 w-full h-auto min-w-96 max-w-[500px] object-contain opacity-80 pointer-events-none select-none"
              />
              <h3 className="text-2xl font-medium mb-4 md:mb-6 relative z-10">
                {item.title}
              </h3>
              <p className="text-textSecondary mb-3 md:mb-4 relative z-10">
                {item.line1}
              </p>
              <p className="text-textSecondary relative z-10 w-3/4">
                {item.line2}
              </p>
            </Box>
          ))}
        </div>
        <Box className="p-5 md:px-10 md:py-4 flex max-md:flex-col justify-center items-center gap-8">
          <div className="grid place-items-start gap-4">
            <h3 className="text-2xl md:text-3xl font-medium">
              Why Vultisig is <GradientText>Better</GradientText>
            </h3>
            <ul className="md:list-disc md:list-inside text-textSecondary">
              With Vultisig, there’s:
              {[
                "No seed phrases to lose or leak.",
                "No single key that can be stolen.",
                "No hardware dependency or hidden risks.",
              ].map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className="text-textSecondary">
              Instead, your security is built on{" "}
              <span className="text-white">
                collaboration between your own devices
              </span>
              , making it safer, simpler, and truly seedless.
            </p>
            <Link
              href="/downloads"
              className={cn(
                buttonVariants({ variant: "primaryBlue", size: "lg" }),
                "px-6 max-md:w-full",
              )}
            >
              Protect Your Vaults Today
              <MdArrowOutward className="size-5" />
            </Link>
          </div>
          <img
            src={"/images/hiw-5.svg"}
            className="w-full h-auto max-w-[500px] object-contain opacity-80 pointer-events-none select-none"
          />
        </Box>
      </section>

      <CtaSection />
    </main>
  )
}

function Heading({
  children,
  className,
  subtitle,
}: {
  children: React.ReactNode
  className?: string
  subtitle?: React.ReactNode
}) {
  return (
    <>
      <h2
        className={cn(
          "text-4xl md:text-5xl font-medium text-center",
          subtitle && "mb-5",
          className,
        )}
      >
        {children}
      </h2>
      {subtitle && (
        <p className="text-textSecondary md:text-xl text-center mx-auto text-balance">
          {subtitle}
        </p>
      )}
    </>
  )
}

const features = [
  {
    tag: "Multi-device",
    title: "No special hardware needed",
    description:
      "With Vultisig, you bring your own trusted devices - phone, desktop, laptops or tablets. No special hardware needed. Together, your devices create vaults that no single device can access.",
    image: feature1Png,
  },
  {
    tag: "Vault Share",
    title: "Vault Shares = secure backups",
    description: (
      <p>
        Each device has a unique backup called "Vault Share", which are secure
        digital backups that eliminate the hassle of physical storage.
        <br />
        <span className="text-primaryAccent">
          <strong>Individual Vault-shares never store funds</strong> and can be
          safely imported/exported anywhere.
        </span>
      </p>
    ),
    image: feature2Png,
  },
  {
    tag: "Multi-Factor",
    title: "Private keys never exist in Vultisig",
    description:
      "Each vault is natively multi-factor. No assets can be accessed without collaboration. Access them remotely from anywhere in the world. Store each device's Vault Share separately and sleep soundly.",
    image: feature3Png,
  },
]
const recoverySteps = [
  {
    icon: LuFileQuestion,
    question: "Lose device",
    answer:
      "Don’t panic. Your vault remains safe even if a device is lost, stolen, or broken.",
  },
  {
    icon: LuTabletSmartphone,
    question: "Get new device",
    answer:
      "Set up a new phone, desktop, or tablet just like you would normally.",
  },
  {
    icon: FiUploadCloud,
    question: "Import backup",
    answer:
      "Use the backup Vault Share you stored securely to re-import your lost device.",
  },
  {
    icon: LuBadgeCheck,
    question: "Respawned",
    answer:
      "Your vault is fully restored and ready to use. No keys exposed, no funds at risk.",
  },
]

const traditionalWalletCards = [
  {
    title: "Private keys",
    description:
      "You need to trust the key generation process or you could lose your keys.",
    icon: Lock,
  },
  {
    title: "Seed phrases",
    description:
      "A seed phrase is a human-readable representation of your private key using standardized words - stored in plain text accessible to anyone.",
    icon: IoChatboxEllipsesOutline,
  },
  {
    title: "One Click. Gone.",
    description:
      "With traditional wallets, it only takes one click to drain your funds. One malicious transaction or signature could cost you your assets.",
    icon: Key,
  },
]

const singlePointFailureCards = [
  {
    image: "/images/hiw-3.svg",
    title: "Private key creation",
    line1:
      "Generating keys on a single device is a ticking time bomb. One breach, one compromise - and it's game over.",
    line2:
      "Self-custody shouldn't mean playing defense with your entire net worth.",
  },
  {
    image: "/images/hiw-4.svg",
    title: "Storage of private keys",
    line1:
      "Keeping keys in one place? That's a single point of failure begging to be exploited.",
    line2:
      "Whether it's a hack, misstep, or hardware loss - your access is only as strong as its weakest link.",
  },
]
