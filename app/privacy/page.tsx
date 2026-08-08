import type { Metadata } from "next"

import LegalDocumentView from "@/components/legal/legal-document"

import { PRIVACY_POLICY } from "./privacy-policy"

export const metadata: Metadata = {
  title: "Privacy Policy - Vultisig MPC Wallet",
  description:
    "Vultisig privacy policy. Learn how the MPC wallet protects your data and maintains self-custody security.",
  alternates: {
    canonical: "https://vultisig.com/privacy",
  },
}

export default function PrivacyPolicy() {
  return <LegalDocumentView doc={PRIVACY_POLICY} />
}
