"use client"

import { ChevronDown, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { LandingButton } from "@/components/ui/landing-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type NavEntry = {
  label: string
  /** Absent while the destination page does not exist yet (Agent group). */
  href?: string
  children?: { label: string; href?: string }[]
}

const NAV_ENTRIES: NavEntry[] = [
  {
    label: "Wallet",
    children: [
      { label: "Vultisig App", href: "/downloads?tab=mobile" },
      { label: "Vultisig Extension", href: "/downloads?tab=browser" },
    ],
  },
  { label: "How It Works", href: "/how-it-works" },
  { label: "MPC Wallet", href: "/mpc" },
  {
    label: "Agent",
    children: [
      { label: "For Users" },
      { label: "For Agents" },
      { label: "For Builders" },
    ],
  },
  { label: "$VULT", href: "/vult" },
  { label: "Articles", href: "/articles" },
  { label: "Chains", href: "/#chains" },
]

const PILL_ITEM =
  "flex items-center gap-2 whitespace-nowrap rounded-full px-6 py-5 text-v5-link font-medium text-v5-text-inverse transition-colors"
const MENU_ITEM =
  "flex items-center justify-center rounded-full px-2.5 py-4 text-v5-link font-medium text-v5-text-inverse transition-colors"

function isActive(pathname: string, href?: string): boolean {
  if (!href || href.startsWith("/#")) return false
  const route = href.split("?")[0]
  if (route === "/") return pathname === "/"
  return pathname.startsWith(route)
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" title="Vultisig home">
      <Image
        src="/v5/vultisig-mark.svg"
        alt=""
        width={27}
        height={27}
        priority
      />
      <Image
        src="/v5/vultisig-wordmark.svg"
        alt="Vultisig"
        width={96}
        height={29}
        priority
      />
    </Link>
  )
}

function DesktopEntry({ entry }: { entry: NavEntry }) {
  const pathname = usePathname()

  if (!entry.children) {
    return (
      <Link
        href={entry.href ?? "#"}
        className={cn(
          PILL_ITEM,
          "hover:bg-v5-page",
          isActive(pathname, entry.href) && "bg-v5-page",
        )}
      >
        {entry.label}
      </Link>
    )
  }

  const groupActive = entry.children.some((child) =>
    isActive(pathname, child.href),
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          PILL_ITEM,
          "hover:bg-v5-page data-[state=open]:bg-v5-page",
          groupActive && "bg-v5-page",
        )}
      >
        {entry.label}
        <ChevronDown className="size-4" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        sideOffset={8}
        className="w-[204px] rounded-3xl border-0 bg-v5-white p-3 shadow-v5-menu"
      >
        {entry.children.map((child) =>
          child.href ? (
            <Link
              key={child.label}
              href={child.href}
              className={cn(
                MENU_ITEM,
                "hover:bg-v5-page",
                isActive(pathname, child.href) && "bg-v5-page",
              )}
            >
              {child.label}
            </Link>
          ) : (
            <span key={child.label} className={MENU_ITEM} aria-disabled>
              {child.label}
            </span>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function MobilePanel() {
  const pathname = usePathname()

  return (
    <div className="mx-4 mb-4 rounded-3xl bg-v5-white p-3 shadow-v5-menu xl:hidden">
      {NAV_ENTRIES.map((entry) => {
        if (!entry.children) {
          return (
            <Link
              key={entry.label}
              href={entry.href ?? "#"}
              className={cn(
                MENU_ITEM,
                "justify-start",
                isActive(pathname, entry.href) && "bg-v5-page",
              )}
            >
              {entry.label}
            </Link>
          )
        }

        return (
          <div key={entry.label} className="py-2">
            <p className="px-2.5 text-v5-caption font-medium uppercase text-v5-text-tertiary">
              {entry.label}
            </p>
            {entry.children.map((child) =>
              child.href ? (
                <Link
                  key={child.label}
                  href={child.href}
                  className={cn(
                    MENU_ITEM,
                    "justify-start",
                    isActive(pathname, child.href) && "bg-v5-page",
                  )}
                >
                  {child.label}
                </Link>
              ) : (
                <span
                  key={child.label}
                  className={cn(MENU_ITEM, "justify-start")}
                  aria-disabled
                >
                  {child.label}
                </span>
              ),
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setIsOpen(false), [pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Desktop — logo, centred nav pill, CTA (Figma 79718:62435) */}
      <div className="relative mx-auto hidden max-w-v5-content items-center justify-between px-[30px] pt-9 xl:flex">
        <Logo />
        <nav
          aria-label="Main"
          className="absolute left-1/2 flex w-max -translate-x-1/2 items-center gap-2.5 rounded-full bg-v5-white p-2"
        >
          {NAV_ENTRIES.map((entry) => (
            <DesktopEntry key={entry.label} entry={entry} />
          ))}
        </nav>
        <LandingButton asChild size="lg">
          <Link href="/downloads">Download App</Link>
        </LandingButton>
      </div>

      {/* Mobile / tablet (Figma 79740:297806) */}
      <div className="flex items-center gap-3 p-4 xl:hidden">
        <Link
          href="/"
          className="flex flex-1 items-center"
          title="Vultisig home"
        >
          <Image
            src="/v5/vultisig-mark.svg"
            alt="Vultisig"
            width={40}
            height={40}
            priority
          />
        </Link>
        <LandingButton asChild size="sm" className="rounded-full py-3">
          <Link href="/downloads">Download</Link>
        </LandingButton>
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="rounded-full bg-v5-white p-[11px] text-v5-text-inverse"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {isOpen && <MobilePanel />}
    </header>
  )
}
