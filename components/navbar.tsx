"use client"

import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { ChevronDown, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react"

import { LandingButton } from "@/components/ui/landing-button"
import { Wordmark } from "@/components/ui/wordmark"
import { cn } from "@/lib/utils"

/** Luminance of the two wordmark colours: text-inverse #02122b and text-primary #f0f4fc. */
const INK_LUMINANCE = 0.00752
const PAPER_LUMINANCE = 0.90671

/** Horizontal sample positions across the glass bar, as a fraction of its width. */
const SAMPLE_STOPS = [0.12, 0.5, 0.88]

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
function prefersLightInk(backdrop: number): boolean {
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
 * Tracks whether the section scrolled *under* the glass bar is dark, so the bar can
 * swap to its dark material and everything on it (wordmark, links, chips) can flip
 * to the light ink. Sampling ignores the header subtree, so it reads the page
 * content the glass is tinted by — never the glass itself. The bar is spanned by
 * three samples because it now runs the full content width rather than hugging the
 * logo. The toggle is instant — no transition — to stay within the static-only rule.
 */
function useOnDarkBackdrop(
  pathname: string,
): [boolean, (el: HTMLElement | null) => void] {
  const [onDark, setOnDark] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const header = headerRef.current
      if (!header) return
      const bar = Array.from(
        header.querySelectorAll<HTMLElement>("[data-glass-bar]"),
      ).find((el) => el.getBoundingClientRect().width > 0)
      if (!bar) return

      const box = bar.getBoundingClientRect()
      const y = box.top + box.height / 2
      const samples = SAMPLE_STOPS.map((stop) =>
        backdropLuminance(box.left + box.width * stop, y, header),
      ).filter((value): value is number => value !== null)
      if (!samples.length) return

      const mean = samples.reduce((sum, value) => sum + value, 0) / samples.length
      setOnDark(prefersLightInk(mean))
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

  return [onDark, (el) => { headerRef.current = el }]
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
      // "For Users" has no page in the V5 design yet, so it stays unlinked.
      { label: "For Users" },
      { label: "For Agents", href: "/agent/for-agents" },
      { label: "For Builders", href: "/agent/for-builders" },
    ],
  },
  { label: "$VULT", href: "/vult" },
  { label: "Articles", href: "/articles" },
  { label: "Chains", href: "/#chains" },
]

/**
 * One translucent bar behind logo + nav + CTA. `backdrop-blur` is the enhancement;
 * the base fill is near-opaque so browsers without backdrop-filter still get a
 * readable bar instead of a washed-out one.
 */
const GLASS_BAR =
  "rounded-full border shadow-v5-glass backdrop-blur-xl backdrop-saturate-150"
const GLASS_LIGHT =
  "border-v5-glass-light-edge bg-v5-glass-light-solid text-v5-text-inverse supports-[backdrop-filter:blur(0px)]:bg-v5-glass-light"
const GLASS_DARK =
  "border-v5-glass-dark-edge bg-v5-glass-dark-solid text-v5-text-primary shadow-v5-glass-dark supports-[backdrop-filter:blur(0px)]:bg-v5-glass-dark"

const glassTone = (onDark: boolean) => (onDark ? GLASS_DARK : GLASS_LIGHT)

/**
 * Thick variant of the same material, for the menus. They hang below the bar and
 * can span a section boundary, so their tone is chosen from the bar's backdrop
 * but has to stay readable over the opposite one too — 0.92 keeps the worst case
 * (light ink over a dark sheet on the page surface) at 10.7:1.
 */
const SHEET =
  "rounded-3xl border backdrop-blur-xl backdrop-saturate-150"
const SHEET_LIGHT =
  "border-v5-glass-light-edge bg-v5-glass-light-solid text-v5-text-inverse shadow-v5-glass"
const SHEET_DARK =
  "border-v5-glass-dark-edge bg-v5-glass-dark-solid text-v5-text-primary shadow-v5-glass-dark"

const sheetTone = (onDark: boolean) => (onDark ? SHEET_DARK : SHEET_LIGHT)

/** Hover / open / active chip behind a nav item, on either material. */
const chipHover = (onDark: boolean) =>
  onDark ? "hover:bg-v5-glass-dark-chip" : "hover:bg-v5-glass-light-chip"
const chipOpen = (onDark: boolean) =>
  onDark
    ? "data-[state=open]:bg-v5-glass-dark-chip"
    : "data-[state=open]:bg-v5-glass-light-chip"
const chipActive = (onDark: boolean) =>
  onDark ? "bg-v5-glass-dark-chip" : "bg-v5-white"

const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-v5-accent focus-visible:ring-offset-0"

const PILL_ITEM =
  "flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-5 text-v5-link font-medium transition-colors v5wide:px-6"
const MENU_ITEM =
  "flex items-center justify-center rounded-full px-2.5 py-4 text-v5-link font-medium transition-colors"

/** ~180ms in, ~140ms out, both suppressed under prefers-reduced-motion. */
const MENU_MOTION =
  "origin-top data-[state=open]:animate-v5-menu-in data-[state=closed]:animate-v5-menu-out motion-reduce:!animate-none"

function isActive(pathname: string, href?: string): boolean {
  if (!href || href.startsWith("/#")) return false
  const route = href.split("?")[0]
  if (route === "/") return pathname === "/"
  return pathname.startsWith(route)
}

/** Up/Down/Home/End through the links of an open menu. Radix only wires Tab. */
function moveFocus(event: ReactKeyboardEvent<HTMLElement>) {
  const keys = ["ArrowDown", "ArrowUp", "Home", "End"]
  if (!keys.includes(event.key)) return
  const items = Array.from(
    event.currentTarget.querySelectorAll<HTMLAnchorElement>("a[href]"),
  )
  if (!items.length) return
  const current = items.indexOf(document.activeElement as HTMLAnchorElement)
  const next =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? items.length - 1
        : event.key === "ArrowDown"
          ? Math.min(current + 1, items.length - 1)
          : Math.max(current - 1, 0)
  items[next]?.focus()
  event.preventDefault()
}

function Mark({
  onDark,
  size,
  radius,
  alt = "",
}: {
  onDark: boolean
  size: number
  radius: string
  alt?: string
}) {
  return (
    <span
      className={cn(
        "block shrink-0",
        radius,
        // The mark's gradient bottoms out at #0d39b1, which all but vanishes
        // against the dark material — a hairline ring keeps its silhouette.
        onDark && "ring-1 ring-v5-glass-dark-edge",
      )}
    >
      <Image
        src="/v5/vultisig-mark.svg"
        alt={alt}
        width={size}
        height={size}
        priority
      />
    </span>
  )
}

function DesktopEntry({ entry, onDark }: { entry: NavEntry; onDark: boolean }) {
  const pathname = usePathname()

  if (!entry.children) {
    const active = isActive(pathname, entry.href)
    return (
      <NavigationMenu.Item>
        <NavigationMenu.Link asChild active={active}>
          <Link
            href={entry.href ?? "#"}
            className={cn(
              PILL_ITEM,
              FOCUS_RING,
              chipHover(onDark),
              active && chipActive(onDark),
            )}
          >
            {entry.label}
          </Link>
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    )
  }

  const groupActive = entry.children.some((child) =>
    isActive(pathname, child.href),
  )

  return (
    <NavigationMenu.Item className="relative">
      <NavigationMenu.Trigger
        className={cn(
          PILL_ITEM,
          FOCUS_RING,
          "group",
          chipHover(onDark),
          chipOpen(onDark),
          groupActive && chipActive(onDark),
        )}
      >
        {entry.label}
        <ChevronDown
          className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180 motion-reduce:transition-none"
          aria-hidden
        />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content
        onKeyDown={moveFocus}
        className={cn(
          // pt-2 is the hover bridge: the visual gap belongs to the panel's hit
          // area, so the pointer can cross it without the menu closing.
          "absolute left-1/2 top-full z-50 w-[204px] pt-2 [transform:translateX(-50%)]",
          MENU_MOTION,
        )}
      >
        <div className={cn(SHEET, sheetTone(onDark), "p-3")}>
          {entry.children.map((child) =>
            child.href ? (
              <NavigationMenu.Link
                key={child.label}
                asChild
                active={isActive(pathname, child.href)}
              >
                <Link
                  href={child.href}
                  className={cn(
                    MENU_ITEM,
                    FOCUS_RING,
                    chipHover(onDark),
                    isActive(pathname, child.href) && chipActive(onDark),
                  )}
                >
                  {child.label}
                </Link>
              </NavigationMenu.Link>
            ) : (
              <span key={child.label} className={MENU_ITEM} aria-disabled>
                {child.label}
              </span>
            ),
          )}
        </div>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  )
}

function MobilePanel({ onDark }: { onDark: boolean }) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        SHEET,
        sheetTone(onDark),
        "pointer-events-auto mx-4 mb-4 p-3 xl:hidden",
      )}
    >
      {NAV_ENTRIES.map((entry) => {
        if (!entry.children) {
          return (
            <Link
              key={entry.label}
              href={entry.href ?? "#"}
              className={cn(
                MENU_ITEM,
                FOCUS_RING,
                "justify-start",
                chipHover(onDark),
                isActive(pathname, entry.href) && chipActive(onDark),
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
                    FOCUS_RING,
                    "justify-start",
                    chipHover(onDark),
                    isActive(pathname, child.href) && chipActive(onDark),
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
  const [onDark, headerRef] = useOnDarkBackdrop(pathname)

  useEffect(() => setIsOpen(false), [pathname])

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
    >
      {/* Desktop — one glass bar spanning logo, nav and CTA (Figma 79718:62435) */}
      {/* Gutter sits on the wrapper and max-width on the bar itself, so the bar
          measures the same 1380px as every page's content container — putting
          both on one element would subtract the padding from the max-width. */}
      <div className="hidden px-[30px] pt-8 xl:block">
        <div
          data-glass-bar
          className={cn(
            GLASS_BAR,
            glassTone(onDark),
            "pointer-events-auto relative mx-auto flex max-w-v5-content items-center justify-between py-2 pl-7 pr-2",
          )}
        >
          <Link
            href="/"
            className={cn("flex items-center gap-2.5", FOCUS_RING, "rounded-full")}
            title="Vultisig home"
          >
            <Mark onDark={onDark} size={27} radius="rounded-[8.5px]" />
            <Wordmark className="h-[29px] w-24" />
          </Link>

          <NavigationMenu.Root
            aria-label="Main"
            delayDuration={90}
            skipDelayDuration={250}
            className="absolute left-1/2 w-max -translate-x-1/2"
          >
            <NavigationMenu.List className="flex items-center gap-2.5">
              {NAV_ENTRIES.map((entry) => (
                <DesktopEntry key={entry.label} entry={entry} onDark={onDark} />
              ))}
            </NavigationMenu.List>
          </NavigationMenu.Root>

          <LandingButton asChild size="lg">
            <Link href="/downloads">Download App</Link>
          </LandingButton>
        </div>
      </div>

      {/* Mobile / tablet (Figma 79740:297806) */}
      {/* Gutter tracks the pages' own `px-4 md:px-[30px]`, so the bar stays
          flush with content through the tablet range too. */}
      <div className="px-4 pb-3 pt-3 md:px-[30px] xl:hidden">
        <div
          data-glass-bar
          className={cn(
            GLASS_BAR,
            glassTone(onDark),
            "pointer-events-auto flex items-center gap-3 p-2 pl-3",
          )}
        >
          <Link
            href="/"
            className={cn("flex flex-1 items-center", FOCUS_RING, "rounded-full")}
            title="Vultisig home"
          >
            <Mark
              onDark={onDark}
              size={40}
              radius="rounded-[12.5px]"
              alt="Vultisig"
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
            className={cn(
              "rounded-full p-[11px] transition-colors",
              FOCUS_RING,
              onDark ? "bg-v5-glass-dark-chip" : "bg-v5-white",
            )}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {isOpen && <MobilePanel onDark={onDark} />}
    </header>
  )
}
