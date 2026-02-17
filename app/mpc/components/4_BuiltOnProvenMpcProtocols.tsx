import React from "react"
import Heading from "./Heading"
import Link from "next/link"
import { NotepadTextIcon } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const signatureIcon =
  "/images/figma/1843505b03f6ca672478713b2ab91800e46b8b40.svg"
const chainLinkLeft =
  "/images/figma/25c642c866d17ec973e906daadb51bbad75faca6.svg"
const chainLinkRight =
  "/images/figma/c25b2bb13110e204d88e03ad9097b9f45d015c19.svg"
const keyShardFrame =
  "/images/figma/669bcf3d0fb8e6a811d788ddabc6548e6097d365.svg"
const keyShardCenter =
  "/images/figma/48b468f9fd41527668d8fb0ed2c920bf9ec59122.svg"

const features = [
  {
    title: "DKLS23 Threshold Signatures",
    description:
      "Vultisig implements the DKLS23 protocol: A modern threshold ECDSA scheme, extended with EdDSA possibility. Purpose-built for fast, secure multi-device signing with minimal communication rounds.",
    textWidth: "max-w-[238px]",
    icon: (
      <div className="absolute right-[30px] top-[46px] h-[118px] w-[118px] overflow-hidden">
        <img
          src={signatureIcon}
          alt=""
          className="h-full w-full"
          aria-hidden="true"
        />
      </div>
    ),
  },
  {
    title: "Off-Chain MPC, On-Chain Normality",
    description:
      "All MPC computation happens off-chain between your devices. On-chain, the transaction looks identical to a regular single-signature transaction, resulting in lower gas fees, full compatibility, zero fingerprint.",
    textWidth: "max-w-[231px]",
    icon: (
      <div className="absolute right-[30px] top-[46px] h-[118px] w-[118px] overflow-hidden">
        <div className="absolute inset-[36.07%_40.37%_15.24%_11.07%]">
          <img
            src={chainLinkRight}
            alt=""
            className="h-full w-full"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-[19.41%_11.07%_31.9%_40.36%]">
          <img
            src={chainLinkLeft}
            alt=""
            className="h-full w-full"
            aria-hidden="true"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Multi-Device Key Sharding",
    description:
      "Key shares are generated and stored across your independent devices: Different operating systems, different locations, different attack surfaces. Compromising one device reveals nothing useful.",
    textWidth: "max-w-[238px]",
    icon: (
      <div className="absolute right-[30px] top-[46px] h-[118px] w-[118px] overflow-hidden">
        <div className="absolute inset-[11.78%_11.79%_11.79%_11.78%]">
          <img
            src={keyShardFrame}
            alt=""
            className="h-full w-full"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-[38.54%]">
          <img
            src={keyShardCenter}
            alt=""
            className="h-full w-full"
            aria-hidden="true"
          />
        </div>
      </div>
    ),
  },
]

export default function BuiltOnProvenMpcProtocols() {
  return (
    <section className="px-6 md:px-20 py-20 max-w-7xl mx-auto flex flex-col items-center gap-[70px]">
      <Heading withMargin={false}>Built on Proven MPC Protocols</Heading>

      <div className="w-full">
        <div className="grid gap-[20px] md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative flex min-h-[267px] flex-1 flex-col gap-[47px] overflow-hidden rounded-[20px] border border-borderLight bg-backgroundSecondary/40 p-[30px]"
            >
              <div
                className={`flex flex-col gap-[47px] leading-[1.35] ${feature.textWidth}`}
              >
                <p className="text-[20px] font-semibold tracking-[-0.44px] text-textPrimary">
                  {feature.title}
                </p>
                <p className="text-[15px] tracking-[-0.33px] text-textSecondary">
                  {feature.description}
                </p>
              </div>
              {feature.icon}
            </div>
          ))}
        </div>
      </div>

      <Link
        href="https://docs.vultisig.com/security-and-technology/security-technology/how-dkls23-works"
        className={cn(buttonVariants({ variant: "primaryBlue", size: "lg" }))}
      >
        <NotepadTextIcon />
        <span>Learn More</span>
      </Link>
    </section>
  )
}
