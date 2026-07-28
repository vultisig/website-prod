import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { LandingButton } from "@/components/ui/landing-button"

type Protocol = {
  title: string
  body: string
  icon: { src: string; alt: string }
}

const PROTOCOLS: Protocol[] = [
  {
    title: "DKLS23 Threshold Signatures",
    body: "Vultisig implements the DKLS23 protocol: A modern threshold ECDSA scheme, extended with EdDSA possibility. Purpose-built for fast, secure multi-device signing with minimal communication rounds.",
    icon: {
      src: "/v5/mpc-protocol-dkls23.webp",
      alt: "A handwritten signature crossed through with an x",
    },
  },
  {
    title: "Off-Chain MPC, On-Chain Normality",
    body: "All MPC computation happens off-chain between your devices. On-chain, the transaction looks identical to a regular single-signature transaction, resulting in lower gas fees, full compatibility, zero fingerprint.",
    icon: {
      src: "/v5/mpc-protocol-offchain.webp",
      alt: "Two interlocking chain links",
    },
  },
  {
    title: "Multi-Device Key Sharding",
    body: "Key shares are generated and stored across your independent devices: Different operating systems, different locations, different attack surfaces. Compromising one device reveals nothing useful.",
    icon: {
      src: "/v5/mpc-protocol-sharding.webp",
      alt: "A ring inside a rotated square keyframe",
    },
  },
]

function ProtocolCard({ title, body, icon }: Protocol) {
  return (
    <li className="flex flex-1 flex-col gap-5 overflow-hidden rounded-[20px] bg-v5-white p-5 text-v5-text-inverse md:p-[30px]">
      <Image
        src={icon.src}
        alt={icon.alt}
        width={160}
        height={160}
        className="size-20"
      />
      <div className="flex flex-col gap-1.5">
        <h3 className="text-v5-subtitle font-semibold">{title}</h3>
        <p className="text-v5-card-body font-normal">{body}</p>
      </div>
    </li>
  )
}

export default function ProvenProtocols() {
  return (
    <section className="bg-v5-page px-4 pt-4 md:px-[30px] md:pt-[30px]">
      <div className="mx-auto max-w-v5-content">
        <div className="flex flex-col items-center gap-8 rounded-[20px] bg-v5-panel px-4 py-9 md:gap-[50px] md:rounded-3xl md:p-[60px]">
          <h2 className="text-center text-v5-display-sm-tight font-semibold text-v5-text-inverse md:text-v5-display-tight">
            Built on Proven MPC Protocols
          </h2>
          <ul className="flex w-full flex-col gap-5 md:flex-row md:items-stretch">
            {PROTOCOLS.map((protocol) => (
              <ProtocolCard key={protocol.title} {...protocol} />
            ))}
          </ul>
          <LandingButton
            asChild
            size="sm"
            className="h-[50px] w-full px-4 md:w-[185px]"
          >
            <Link
              href="/how-it-works"
              aria-label="Learn more about how Vultisig works"
            >
              Learn More
              <ArrowRight aria-hidden />
            </Link>
          </LandingButton>
        </div>
      </div>
    </section>
  )
}
