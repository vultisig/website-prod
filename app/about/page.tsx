import type { Metadata } from "next"

import { supportedChainCountLabel } from "@/content/chain-count"
import { RecoveryLink } from "@/components/recovery-link"
import { OPEN_GRAPH_DEFAULTS, ORGANIZATION_ID, SITE_URL } from "@/lib/site"

const ABOUT_URL = `${SITE_URL}/about`

const ABOUT_DESCRIPTION = `Vultisig is a free, open-source, self-custodial MPC wallet. DKLS23 threshold signatures mean your key never exists in one place, on ${supportedChainCountLabel} chains.`

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
    href: "https://docs.vultisig.com/help-and-legal/security",
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
          <h2 className="text-v5-title3 font-semibold">How a vault works</h2>
          <p className="text-v5-body-m-relaxed">
            Think of a vault as a safe that opens only when enough keyholders
            turn their keys together. In a Secure Vault, every key share lives
            on a device you own, from 2-of-2 to setups like 2-of-3 or 3-of-4,
            and no server takes part in signing. In a Fast Vault, your device holds one
            share and VultiServer holds the other. VultiServer co-signs but can
            never sign alone, and its share is emailed to you, encrypted with
            your password.
          </p>
          <p className="text-v5-body-m-relaxed">
            Each device exports its own backup file. If Vultisig&apos;s software
            ever became unavailable, a documented emergency recovery path
            rebuilds your key from your shares.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-v5-title3 font-semibold">Security</h2>
          <p className="text-v5-body-m-relaxed">
            Vultisig signs with DKLS23 threshold signatures, using Silence
            Laboratories&apos; implementation, which Trail of Bits audited. The
            wallet code is open source on GitHub, so anyone can check what it
            does.
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
