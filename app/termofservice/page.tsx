import type { Metadata } from "next"

import { OPEN_GRAPH_DEFAULTS, SITE_URL } from "@/lib/site"

import LegalDocumentView from "@/components/legal/legal-document"

import { TERMS_OF_SERVICE } from "./terms-of-service"

const TERMS_URL = `${SITE_URL}/termofservice`
const TERMS_TITLE = "Terms of Service - Vultisig MPC Wallet"
const TERMS_DESCRIPTION =
  "Vultisig terms of service and user agreement for the MPC wallet application."

export const metadata: Metadata = {
  title: TERMS_TITLE,
  description: TERMS_DESCRIPTION,
  alternates: { canonical: TERMS_URL },
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    title: TERMS_TITLE,
    description: TERMS_DESCRIPTION,
    url: TERMS_URL,
  },
}

export default function TermsOfService() {
  return <LegalDocumentView doc={TERMS_OF_SERVICE} />
}
