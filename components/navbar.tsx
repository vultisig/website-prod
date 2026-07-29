"use client"

import { ChevronDown, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { LandingButton } from "@/components/ui/landing-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wordmark } from "@/components/ui/wordmark"
import { cn } from "@/lib/utils"

/**
 * Routes whose first viewport is dark (the not-yet-reskinned V4 pages inherit the
 * dark `body` background). They need the light wordmark from the very first paint,
 * before the scroll probe below has run.
 */
const DARK_TOP_ROUTES = ["/support", "/docs", "/privacy", "/termofservice"]

/** Luminance of the two wordmark colours: text-inverse #02122b and text-primary #f0f4fc. */
const INK_LUMINANCE = 0.00752
const PAPER_LUMINANCE = 0.90671

function relativeLuminance(r: number, g: number, b: number): number {
  const channel = (v: number) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

function contrast(a: number, b: number): number {
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}

/**
 * Picks whichever wordmark colour contrasts better with the backdrop, rather than
 * thresholding on "is it dark". Mid-tone brand blues (#538bff) are dark enough to
 * look dark but still read better with the navy wordmark than the light one.
 */
function prefersLightWordmark(backdrop: number): boolean {
  return contrast(PAPER_LUMINANCE, backdrop) > contrast(INK_LUMINANCE, backdrop)
}

/** First opaque background colour painted behind `point`, ignoring the header itself. */
function backdropLuminance(x: number, y: number, header: Element): number | null {
  for (const hit of document.elementsFromPoint(x, y)) {
    if (header.contains(hit)) continue
    for (
      let node: Element | null = hit;
      node && node !== document.documentElement;
      node = node.parentElement
    ) {
      const match = getComputedStyle(node).backgroundColor.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/,
      )
      if (!match) continue
      const alpha = match[4] === undefined ? 1 : Number(match[4])
      if (alpha <= 0.5) continue
      return relativeLuminance(Number(match[1]), Number(match[2]), Number(match[3]))
    }
  }
  return null
}

/**
 * Tracks whether the section scrolled behind the logo is dark, so the wordmark can
 * flip to white. Figma annotates this on the header ("adaptive color on scroll").
 * The toggle is instant — no transition — to stay within the static-only rule.
 */
function useLogoOnDark(
  initialOnDark: boolean,
  pathname: string,
): [boolean, (el: HTMLElement | null) => void] {
  const [onDark, setOnDark] = useState(initialOnDark)
  const logoRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const logo = logoRef.current
      const header = logo?.closest("header")
      if (!logo || !header) return
      const box = logo.getBoundingClientRect()
      if (box.width === 0) return
      const luminance = backdropLuminance(
        box.left + box.width / 2,
        box.top + box.height / 2,
        header,
      )
      if (luminance !== null) setOnDark(prefersLightWordmark(luminance))
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [pathname])

  return [onDark, (el) => { logoRef.current = el }]
}

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

function Logo({
  onDark,
  innerRef,
}: {
  onDark: boolean
  innerRef: (el: HTMLElement | null) => void
}) {
  return (
    <Link
      ref={innerRef}
      href="/"
      className={cn(
        "flex items-center gap-2.5",
        onDark ? "text-v5-text-primary" : "text-v5-text-inverse",
      )}
      title="Vultisig home"
    >
      <Image
        src="/v5/vultisig-mark.svg"
        alt=""
        width={27}
        height={27}
        priority
      />
      <Wordmark className="h-[29px] w-24" />
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
  const [onDark, logoRef] = useLogoOnDark(
    DARK_TOP_ROUTES.includes(pathname),
    pathname,
  )

  useEffect(() => setIsOpen(false), [pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Desktop — logo, centred nav pill, CTA (Figma 79718:62435) */}
      <div className="relative mx-auto hidden max-w-v5-content items-center justify-between px-[30px] pt-9 xl:flex">
        <Logo onDark={onDark} innerRef={logoRef} />
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
