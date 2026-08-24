import type { Metadata } from "next"

import { supportedChainCountLabel } from "@/content/chain-count"
import { RecoveryLink } from "@/components/recovery-link"
import { OPEN_GRAPH_DEFAULTS, ORGANIZATION_ID, SITE_URL } from "@/lib/site"

const ABOUT_URL = `${SITE_URL}/about`

const ABOUT_DESCRIPTION = `Vultisig is a free, open-source, self-custodial MPC wallet built by the founders of THORChain. No seed phrase: DKLS23 threshold signatures split signing across your own devices, on ${supportedChainCountLabel} chains.`

export const metadata: Metadata = {
  title: "About Vultisig - The Company Behind the Seedless MPC Wallet",
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: ABOUT_URL },
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    title: "About Vultisig",
    description: ABOUT_DESCRIPTION,
    url: ABOUT_URL,
  },
}

const RESOURCES = [
  {
    href: "https://docs.vultisig.com/other/security",
    label: "Security audits",
  },
  { href: "https://github.com/vultisig", label: "Source code on GitHub" },
  { href: "https://docs.vultisig.com", label: "Documentation" },
  { href: "/downloads", label: "Download the apps" },
  { href: "/support", label: "Support and FAQs" },
] as const

const CONTACTS = [
  { label: "Support", email: "support@vultisig.com" },
  { label: "Partnerships and press", email: "contact@vultisig.com" },
] as const

const ABOUT_PAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": ABOUT_URL,
  url: ABOUT_URL,
  name: "About Vultisig",
  description: ABOUT_DESCRIPTION,
  about: { "@id": ORGANIZATION_ID },
}

/** Company facts already published in the Organization schema, in one readable place. */
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-v5-page px-4 pb-[112px] pt-[126px] text-v5-text-inverse md:px-[30px] md:pt-[216px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_PAGE_JSON_LD) }}
      />
      <div className="mx-auto flex max-w-[720px] flex-col gap-8">
        <header className="flex flex-col gap-4">
          <h1 className="text-v5-display-xs font-semibold md:text-v5-display md:font-medium">
            About Vultisig
          </h1>
          <p className="text-v5-body-m-relaxed md:text-v5-subtitle">
            Vultisig is a free, open-source, self-custodial crypto wallet. It
            replaces the seed phrase with multi-party computation: your private
            key never exists in one place, and every transaction is signed by a
            threshold of your own devices using the DKLS23 threshold signature
            scheme. One vault holds {supportedChainCountLabel} chains.
          </p>
        </header>

        <section className="flex flex-col gap-3">
          <h2 className="text-v5-title3 font-semibold">The company</h2>
          <p className="text-v5-body-m-relaxed">
            Vultisig was founded in 2024 by the founders of THORChain and is
            developed by Vulti Holdings Limited, Intershore Chambers, Road Town,
            Tortola, British Virgin Islands. The wallet ships on iOS, Android,
            macOS, Windows, Linux and as a browser extension, with a TypeScript
            SDK for developers and AI agents.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-v5-title3 font-semibold">Verify it yourself</h2>
          <ul className="flex flex-col gap-2 text-v5-body-m">
            {RESOURCES.map(({ href, label }) => (
              <li key={href}>
                <RecoveryLink href={href}>{label}</RecoveryLink>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-v5-title3 font-semibold">Contact</h2>
          <ul className="flex flex-col gap-2 text-v5-body-m">
            {CONTACTS.map(({ label, email }) => (
              <li key={email}>
                {label}:{" "}
                <a
                  href={`mailto:${email}`}
                  className="underline underline-offset-4"
                >
                  {email}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
