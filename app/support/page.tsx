import type { Metadata } from "next"
import type { ReactNode } from "react"

import FaqSection from "@/components/ui/faq-section"
import { LandingButton } from "@/components/ui/landing-button"

export const metadata: Metadata = {
  title: "Vultisig Support - MPC Wallet Help & FAQ",
  description:
    "Get help with Vultisig MPC wallet. FAQs, troubleshooting, and support for multi-device signing, vault creation, and crypto transactions.",
  alternates: {
    canonical: "https://vultisig.com/support",
  },
  openGraph: {
    title: "Vultisig MPC Wallet Support",
    description:
      "Help center for the leading MPC wallet. FAQs, guides, and troubleshooting.",
    url: "https://vultisig.com/support",
  },
}

const DISCORD_URL = "https://discord.gg/thq64eaYVN"

/** Placeholder until the booking link exists — the CTA lands in Discord for now. */
const BOOK_A_CALL_URL = DISCORD_URL

type SupportCard = {
  icon: string
  title: string
  body: string
  linkLabel: string
  href: string
  external?: boolean
}

const SUPPORT_CARDS: SupportCard[] = [
  {
    icon: "/v5/support-contact.svg",
    title: "Contact support",
    body: "Please contact us for any inquiries or questions regarding Vultisig.",
    linkLabel: "support@vultisig.com",
    href: "mailto:support@vultisig.com",
  },
  {
    icon: "/v5/support-discord.svg",
    title: "User Support",
    body: "Join our Discord and chat with the team to get direct help.",
    linkLabel: "Join Discord",
    href: DISCORD_URL,
    external: true,
  },
  {
    icon: "/v5/support-docs.svg",
    title: "Read the docs",
    body: "Get educated and enjoy safer asset management.",
    linkLabel: "Go to Docs",
    href: "/docs",
  },
  {
    icon: "/v5/support-company.svg",
    title: "Vulti Holdings Limited",
    body: "Intershore Chambers, Road Town, Tortola, British Virgin Islands",
    linkLabel: "contact@vultisig.com",
    href: "mailto:contact@vultisig.com",
  },
]

type SupportFaq = {
  question: string
  answer: ReactNode
  /** Plain-text twin for the FAQPage schema, needed where `answer` is JSX. */
  text?: string
}

const faqs: SupportFaq[] = [
  {
    question: "What is Vultisig?",
    answer:
      "It is a secure, multi-authentication wallet based on MPC technology that is used to manage digital assets. Transactions require approval from multiple devices.",
  },
  {
    question: "Why should I use Vultisig over a standard wallet?",
    answer:
      "Vultisig offers enhanced security with multi-device authentication, support for many blockchains, easy recovery options, and no seed phrases or user tracking.",
  },
  {
    question: "What happens if I lose one of my devices?",
    answer:
      "Yes, as long as you saved and have access to your backups when creating the vault. You can import these backups on a new device to regain access to your assets.",
  },
  {
    question: "How do I use Vultisig to send or swap crypto?",
    answer:
      "Vultisig securely stores and manages digital assets. All actions, such as sending or swapping, require the threshold of devices to sign transactions.",
  },
  {
    question: "Does using Vultisig cost anything?",
    answer: (
      <>
        Vultisig is free to use. You only pay:
        <ul className="mt-2">
          <li>Standard network fees when sending</li>
          <li>0.5% (50 bps) fee for swaps and bridges</li>
        </ul>
      </>
    ),
    text: "Vultisig is free to use. You only pay standard network fees when sending, and a 0.5% (50 bps) fee for swaps and bridges.",
  },
  {
    question: "Which chains and tokens does Vultisig currently support?",
    answer:
      "Vultisig supports major cryptocurrencies and tokens, with over 30 chains and their tokens, currently available.",
  },
  {
    question: "Has Vultisig been independently audited?",
    answer:
      "Yes, Vultisig is open source and has undergone security audits. Both the audit reports and the source code are accessible.",
  },
  {
    question: "What personal data does Vultisig collect?",
    answer:
      "Vultisig does not store any user information from its mobile apps.",
  },
  {
    question: "What makes Vultisig different from other multisig wallets?",
    answer:
      "It is built on MPC technology, which eliminates the need for seed phrases and supports multiple blockchains, making Vultisig flexible and chain-agnostic.",
  },
]

function FAQPageJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.text ?? faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function SupportCardTile({
  icon,
  title,
  body,
  linkLabel,
  href,
  external,
}: SupportCard) {
  return (
    <li className="flex h-full flex-col gap-5 rounded-[20px] bg-v5-white p-5 text-v5-text-inverse md:gap-[30px] md:px-[30px]">
      <img
        src={icon}
        alt=""
        aria-hidden
        className="size-[42px] shrink-0 object-contain"
      />
      <div className="flex flex-1 flex-col gap-2.5">
        <h3 className="text-v5-subtitle font-semibold">{title}</h3>
        <p className="text-v5-card-body font-normal">{body}</p>
      </div>
      <a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : undefined)}
        className="mt-auto break-words text-v5-link font-medium text-v5-cta hover:underline"
      >
        {linkLabel}
      </a>
    </li>
  )
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-v5-page">
      <FAQPageJsonLd />
      <section className="px-4 pb-9 pt-[74px] md:px-[30px] md:pb-[60px] md:pt-[134px]">
        <div className="mx-auto flex max-w-v5-content flex-col gap-8 pt-9 md:gap-[50px] md:pt-[60px]">
          <div className="flex flex-col items-center gap-3.5 text-center text-v5-text-inverse">
            <h1 className="text-v5-display-xs font-semibold md:text-v5-display md:font-medium">
              SUPPORT
            </h1>
            <p className="max-w-[720px] text-v5-body-m-relaxed font-normal md:text-v5-subtitle">
              Need Help? We're Here for You. If you're experiencing issues, have
              questions, or need help with your Vultisig Producs, our team is
              ready to assist.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 md:gap-5 xl:grid-cols-4">
            {SUPPORT_CARDS.map((card) => (
              <SupportCardTile key={card.title} {...card} />
            ))}
          </ul>
        </div>
      </section>

      <div id="faq">
        <FaqSection
          className="pb-[60px] pt-0 md:pb-[90px]"
          items={faqs}
          aside={
            <div className="flex flex-col gap-8 v5wide:w-[476px] v5wide:shrink-0 v5wide:gap-[50px]">
              <h2 className="text-v5-hero-sm font-medium text-v5-text-inverse v5wide:text-v5-faq-title">
                Frequently Asked Questions
              </h2>
              <div className="flex flex-col gap-4">
                <p className="text-v5-body-m font-normal text-v5-text-inverse">
                  Still have questions?
                </p>
                <div className="flex flex-col gap-[22px] sm:flex-row">
                  <LandingButton asChild className="w-full md:w-[176px]">
                    <a
                      href={DISCORD_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join our Discord
                    </a>
                  </LandingButton>
                  <LandingButton
                    asChild
                    variant="secondary"
                    className="w-full md:w-[176px]"
                  >
                    <a
                      href={BOOK_A_CALL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book a Call
                    </a>
                  </LandingButton>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </main>
  )
}
