import Link from "next/link"

import { externalLinkAttrs } from "@/lib/external-link"

/** Files served from public/ (llms.txt, sitemap.xml) have no route for the client router. */
function isAppRoute(href: string) {
  return href.startsWith("/") && !href.includes(".")
}

type RecoveryLinkProps = { href: string; children: React.ReactNode }

/** Underlined inline text link: client routing for app routes, a plain anchor otherwise. */
export function RecoveryLink({ href, children }: RecoveryLinkProps) {
  const className = "underline underline-offset-4"
  if (isAppRoute(href)) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={className} {...externalLinkAttrs(href)}>
      {children}
    </a>
  )
}
