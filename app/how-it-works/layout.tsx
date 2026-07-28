import type { Metadata } from "next"
import Script from "next/script"

export const metadata: Metadata = {
  title: "How Vultisig Works: MPC & TSS Technology Explained",
  description:
    "Learn how Vultisig uses MPC (Multi-Party Computation) and TSS (Threshold Signature Scheme) to secure your crypto without seed phrases. Multi-device signing explained.",
  alternates: {
    canonical: "https://vultisig.com/how-it-works",
  },
  openGraph: {
    title: "How Vultisig MPC Wallet Works",
    description:
      "Understand the technology behind the leading MPC wallet. Multi-device signing, threshold signatures, seedless security.",
    url: "https://vultisig.com/how-it-works",
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an MPC wallet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An MPC (Multi-Party Computation) wallet splits your private key across multiple devices using threshold signatures. No single device ever holds the complete key, eliminating single points of failure. Vultisig uses MPC technology to let multiple devices collaboratively sign transactions without ever reconstructing the full private key.",
      },
    },
    {
      "@type": "Question",
      name: "Is Vultisig safe if I lose a device?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Vultisig uses a threshold scheme (2-of-2 for Fast Vaults, 2-of-3 for Secure Vaults). You can recover your vault using the remaining devices and your encrypted Vault Share backups. Each device's Vault Share can be safely stored anywhere since it cannot access funds on its own.",
      },
    },
    {
      "@type": "Question",
      name: "What is a Vault Share?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Vault Share is a secure digital backup unique to each device in your vault. Unlike seed phrases, Vault Shares never contain your complete private key. They can be safely exported, stored in cloud storage, or backed up anywhere without compromising security. You need multiple Vault Shares together to sign transactions.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need special hardware to use Vultisig?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Vultisig works with your existing devices - phones, tablets, laptops, and desktops. You don't need to buy any special hardware wallets. Simply download Vultisig on 2 or more devices you already own to create a secure vault.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Fast Vault and Secure Vault?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fast Vault is a 2-of-2 setup using one device plus the Vultisig server for instant signing - perfect for everyday use. Secure Vault is a 2-of-3 (or higher) multi-device setup where you control all signing devices - ideal for storing larger amounts with maximum security.",
      },
    },
    {
      "@type": "Question",
      name: "Can Vultisig access my funds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Vultisig is fully self-custodial. Even with Fast Vaults where our server participates in signing, we only hold one share that cannot access funds alone. You always maintain control. Your vault, your keys, your crypto.",
      },
    },
  ],
}

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  )
}
