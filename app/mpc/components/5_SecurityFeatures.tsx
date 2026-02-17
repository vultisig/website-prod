import { GoChecklist, GoCodeSquare } from "react-icons/go"
import { DownloadIcon, KeyRoundIcon, ShieldIcon } from "lucide-react"
import React from "react"
import Heading from "./Heading"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function SecurityFeatures() {
  return (
    <section className="px-6 md:px-20 py-20 max-w-7xl mx-auto flex flex-col items-center gap-[70px]">
      <Heading withMargin={false}>Security You Can Verify</Heading>
      <div className="grid md:grid-cols-4 gap-6">
        {[
          {
            icon: <GoCodeSquare size={24} />,
            title: "Open Source",
            description:
              "Every line of code is public and auditable. No backdoors, no hidden logic.",
          },
          {
            icon: <GoChecklist size={24} />,
            title: "Independently Audited",
            description: (
              <>
                Independent security firms have audited Vultisig's cryptographic
                implementation and core signing protocols.
                <br />
                Full audit reports are public.
              </>
            ),
          },
          {
            icon: <KeyRoundIcon strokeWidth={1.5} />,
            title: "No Seed Phrases",
            description:
              "Nothing to write down, lose, or have stolen. Key shards can't be reverse-engineered.",
          },
          {
            icon: <ShieldIcon strokeWidth={1.5} />,
            title: "Battle-Tested TSS",
            description:
              "Vultisig brings Threshold Signature Schemes, the cryptographic gold standard to personal self-custody. For free.",
          },
        ].map((feature, idx) => {
          return (
            <div
              key={idx}
              className="bg-backgroundSecondary/40 border border-borderLight rounded-[20px] p-8 transition group"
            >
              <div className="bg-primaryAccent/10 text-primaryAccent w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-4 text-textPrimary">
                {feature.title}
              </h3>
              <p className="text-sm text-textSecondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          )
        })}
      </div>
      <Link
        href="/downloads"
        className={cn(buttonVariants({ variant: "primaryBlue", size: "lg" }))}
      >
        <DownloadIcon />
        <span>Download App</span>
      </Link>
    </section>
  )
}
