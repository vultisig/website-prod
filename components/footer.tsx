import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import {
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaTelegram,
  FaXTwitter,
} from "react-icons/fa6"

import { LandingButton } from "@/components/ui/landing-button"
import { cn } from "@/lib/utils"

const DISCORD_URL = "https://discord.gg/thq64eaYVN"
const ICON = "size-4 shrink-0"

type FooterLink = {
  label: string
  href: string
  icon?: ReactNode
}

type FooterColumn = {
  title: string
  /** Figma stacks the columns Vultisig / About / Socials / Legal on mobile. */
  mobileOrder: string
  links: FooterLink[]
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Vultisig",
    mobileOrder: "max-md:order-1",
    links: [
      { label: "Products", href: "/downloads" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "MPC", href: "/mpc" },
      { label: "Articles", href: "/articles" },
      { label: "Backed By", href: "/#backed-by" },
      { label: "$VULT", href: "/vult" },
    ],
  },
  {
    title: "About",
    mobileOrder: "max-md:order-2",
    links: [
      { label: "FAQs", href: "/support" },
      { label: "Docs", href: "/docs" },
      {
        label: "Integrate Vultisig",
        href: "https://docs.vultisig.com/developer-docs/vultisig-extension-integration-guide",
      },
      { label: "Audits", href: "https://docs.vultisig.com/other/security" },
      { label: "Contact Us", href: "/support" },
    ],
  },
  {
    title: "Legal",
    mobileOrder: "max-md:order-4",
    links: [
      { label: "Terms of Service", href: "/termofservice" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "Socials",
    mobileOrder: "max-md:order-3",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/vultisig",
        icon: <FaGithub className={ICON} aria-hidden />,
      },
      {
        label: "Discord",
        href: DISCORD_URL,
        icon: <FaDiscord className={ICON} aria-hidden />,
      },
      {
        label: "X.com",
        href: "https://x.com/vultisig",
        icon: <FaXTwitter className={ICON} aria-hidden />,
      },
      {
        label: "Telegram",
        href: "https://t.me/vultisig",
        icon: <FaTelegram className={ICON} aria-hidden />,
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/vultisig",
        icon: <FaInstagram className={ICON} aria-hidden />,
      },
    ],
  },
]

function FooterLinkItem({ label, href, icon }: FooterLink) {
  const isExternal = href.startsWith("http")

  return (
    <Link
      href={href}
      title={label}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      className="flex items-center gap-1.5 text-v5-link font-medium text-v5-text-inverse hover:text-v5-cta"
    >
      {icon}
      {label}
    </Link>
  )
}

export default function Footer() {
  return (
    <footer className="flex flex-col gap-[30px] bg-v5-page px-4 pb-4 md:px-[30px] md:pb-[30px]">
      <div className="mx-auto w-full max-w-v5-content rounded-v5-panel bg-v5-panel p-6 md:flex md:items-start md:justify-between md:p-[60px]">
        <Image
          src="/v5/vultisig-mark.svg"
          alt="Vultisig"
          width={84}
          height={84}
          className="hidden md:block"
        />

        <div className="flex w-full min-w-0 flex-col gap-10 md:max-w-[793px] md:gap-[86px]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-end md:gap-[27px]">
            <h2 className="text-v5-display-sm font-semibold uppercase text-v5-text-inverse md:max-w-[595px]">
              Join the Discord to request new features!
            </h2>
            <LandingButton asChild className="w-full md:w-[176px]">
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                Discord
              </a>
            </LandingButton>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:flex md:justify-between md:gap-8 v5wide:gap-[84px]">
            {FOOTER_COLUMNS.map((column) => (
              <div
                key={column.title}
                className={cn("flex flex-col gap-3", column.mobileOrder)}
              >
                <p className="text-v5-label font-semibold uppercase text-v5-text-inverse">
                  {column.title}
                </p>
                {column.links.map((link) => (
                  <FooterLinkItem key={link.label} {...link} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 md:hidden">
          <Image src="/v5/vultisig-mark.svg" alt="" width={48} height={48} />
          <Image
            src="/v5/vultisig-wordmark.svg"
            alt="Vultisig"
            width={144}
            height={43}
          />
        </div>
      </div>

      <p className="mx-auto w-full max-w-v5-content text-v5-caption font-semibold text-v5-text-inverse">
        @ Copyright {new Date().getFullYear()} - Vultisig
      </p>
    </footer>
  )
}
