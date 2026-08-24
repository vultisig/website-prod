import type { Metadata } from "next"
import Link from "next/link"

import { LandingButton } from "@/components/ui/landing-button"
import { RecoveryLink } from "@/components/recovery-link"

const RECOVERY_LINKS = [
  { href: "/downloads", label: "Download Vultisig" },
  { href: "/articles", label: "Articles" },
  { href: "/support", label: "Support" },
  { href: "/about", label: "About Vultisig" },
  { href: "https://docs.vultisig.com", label: "Documentation" },
  { href: "/sitemap.xml", label: "Sitemap" },
  { href: "/llms.txt", label: "llms.txt (for AI agents)" },
] as const

export const metadata: Metadata = {
  title: "Page not found - Vultisig",
  robots: { index: false, follow: false },
}

/** Real 404 status with the routes an agent or a person needs to recover. */
export default function NotFound() {
  return (
    <main className="min-h-screen bg-v5-page px-4 pb-[112px] pt-[126px] text-v5-text-inverse md:px-[30px] md:pt-[216px]">
      <div className="mx-auto flex max-w-[720px] flex-col items-start gap-6">
        <h1 className="text-v5-display-xs font-semibold md:text-v5-display md:font-medium">
          Page not found
        </h1>
        <p className="text-v5-body-m-relaxed md:text-v5-subtitle">
          That address does not exist on vultisig.com. Where to look next:
        </p>
        <ul className="flex flex-col gap-2 text-v5-body-m">
          {RECOVERY_LINKS.map(({ href, label }) => (
            <li key={href}>
              <RecoveryLink href={href}>{label}</RecoveryLink>
            </li>
          ))}
        </ul>
        <LandingButton asChild invertOnHover className="h-[50px] px-6">
          <Link href="/">Back to the homepage</Link>
        </LandingButton>
      </div>
    </main>
  )
}
