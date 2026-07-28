import { Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { LandingButton } from "@/components/ui/landing-button"
import { cn } from "@/lib/utils"

type Guarantee = {
  title: string
  body: string
  icon: { src: string; alt: string }
  /** Figma mirrors the shield on the TSS card. */
  mirrored?: boolean
}

const GUARANTEES: Guarantee[] = [
  {
    title: "Open Source",
    body: "Every line of code is public and auditable. No backdoors, no hidden logic.",
    icon: {
      src: "/v5/mpc-security-open-source.svg",
      alt: "A dark tile stamped with the Vultisig mark",
    },
  },
  {
    title: "Independently Audited",
    body: "Independent security firms have audited Vultisig's cryptographic implementation and core signing protocols.",
    icon: {
      src: "/v5/mpc-security-audited.svg",
      alt: "A green disc with a check mark",
    },
  },
  {
    title: "Battle-Tested TSS",
    body: "Vultisig brings Threshold Signature Schemes, the cryptographic gold standard to personal self-custody. For free.",
    icon: {
      src: "/v5/mpc-security-tss.svg",
      alt: "A blue shield",
    },
    mirrored: true,
  },
  {
    title: "No Seed Phrases",
    body: "Nothing to write down, lose, or have stolen. Key shards can't be reverse-engineered.",
    icon: {
      src: "/v5/mpc-security-no-seed.svg",
      alt: "A red notebook crossed out",
    },
  },
]

function GuaranteeCard({ title, body, icon, mirrored }: Guarantee) {
  return (
    <li className="flex flex-1 flex-col justify-center gap-5 overflow-hidden rounded-[20px] bg-v5-white p-5 text-v5-text-inverse md:p-[30px]">
      <Image
        src={icon.src}
        alt={icon.alt}
        width={52}
        height={52}
        className={cn("size-[52px]", mirrored && "-scale-x-100")}
      />
      <div className="flex flex-col gap-2.5">
        <h3 className="text-v5-subtitle font-semibold">{title}</h3>
        <p className="text-v5-card-body font-normal">{body}</p>
      </div>
    </li>
  )
}

export default function Security() {
  return (
    <section className="bg-v5-page px-4 pt-4 md:px-[30px] md:pt-[30px]">
      <div className="mx-auto max-w-v5-content">
        <div className="flex flex-col gap-8 rounded-[20px] bg-v5-accent px-4 py-9 md:gap-[50px] md:rounded-3xl md:p-[60px]">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className="text-center text-v5-display-sm-tight font-semibold text-v5-text-primary md:text-left md:text-v5-display-tight">
              Security You Can Verify
            </h2>
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

          <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
            {/* grid-flow-col reproduces Figma's two stacked pairs, not row order */}
            <ul className="grid flex-1 gap-4 md:h-[458px] md:grid-flow-col md:grid-rows-2">
              {GUARANTEES.map((guarantee) => (
                <GuaranteeCard key={guarantee.title} {...guarantee} />
              ))}
            </ul>
            {/* "\n" is Figma's hard break after "Secured"; mobile wraps freely */}
            <p className="flex items-end rounded-[20px] bg-v5-vult p-5 text-v5-display-sm-tight font-semibold text-v5-text-inverse md:h-[458px] md:w-[501px] md:shrink-0 md:whitespace-pre-line md:p-[30px] md:text-v5-display-lg-tight">
              {"Secured \nacross every chain Vultisig supports"}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
