import type { Metadata } from "next"

import LegalDocumentView from "@/components/legal/legal-document"

import { TERMS_OF_SERVICE } from "./terms-of-service"

export const metadata: Metadata = {
  title: "Terms of Service - Vultisig MPC Wallet",
  description:
    "Vultisig terms of service and user agreement for the MPC wallet application.",
  alternates: {
    canonical: "https://vultisig.com/termofservice",
  },
}

export default function TermsOfService() {
  return <LegalDocumentView doc={TERMS_OF_SERVICE} />
}
