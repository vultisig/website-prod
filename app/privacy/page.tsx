import type { Metadata } from "next"

import { OPEN_GRAPH_DEFAULTS, SITE_URL } from "@/lib/site"

import LegalDocumentView from "@/components/legal/legal-document"

import { PRIVACY_POLICY } from "./privacy-policy"

const PRIVACY_URL = `${SITE_URL}/privacy`
const PRIVACY_TITLE = "Privacy Policy - Vultisig MPC Wallet"
const PRIVACY_DESCRIPTION =
  "Vultisig privacy policy: what data the Vultisig MPC wallet apps, browser extension and related services collect, how it is used, and your rights over it."

export const metadata: Metadata = {
  title: PRIVACY_TITLE,
  description: PRIVACY_DESCRIPTION,
  alternates: { canonical: PRIVACY_URL },
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    title: PRIVACY_TITLE,
    description: PRIVACY_DESCRIPTION,
    url: PRIVACY_URL,
  },
}

export default function PrivacyPolicy() {
  return <LegalDocumentView doc={PRIVACY_POLICY} />
}
