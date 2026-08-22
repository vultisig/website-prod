"use client"

import { Shield, Zap } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

import SectionHeading from "@/components/ui/section-heading"
import { LearnMoreButton } from "@/components/ui/learn-more-button"
import { cn } from "@/lib/utils"

type VaultId = "fast" | "secure"

type Vault = {
  id: VaultId
  tab: string
  title: string
  paragraphs: [string, string]
  href: string
  image: string
  imageAlt: string
  /** Tint of the selected tab pill. */
  activeClass: string
}

const VAULTS: Vault[] = [
  {
    id: "fast",
    tab: "Fast Vault",
    title: "For daily use",
    paragraphs: [
      "This is a fast, one-device setup perfect for storing and using smaller amounts every day.",
      "It requires only one user device, and our Vultiserver co-signs your transactions instantly - giving you speed and simplicity without compromising usability.",
    ],
    href: "https://docs.vultisig.com/vultisig-vault-user-actions/creating-a-vault#fast-vaults",
    image: "/v5/setup-fast-vault.webp",
    imageAlt:
      "Single server tray guarded by a shield, next to a phone signing a transaction",
    activeClass: "border-v5-warning/5 bg-v5-warning/20",
  },
  {
    id: "secure",
    tab: "Secure Vault",
    title: "For maximum security",
    paragraphs: [
      "Built for maximum protection, the Secure Vault uses multiple devices to sign transactions and safeguard your assets.",
      "It's always accessible through backups of the devices, making it the most reliable way to secure any amount of assets - even if a device fails.",
    ],
    href: "https://docs.vultisig.com/vultisig-vault-user-actions/creating-a-vault#secure-vault",
    image: "/v5/setup-secure-vault.webp",
    imageAlt:
      "Three stacked device trays co-signing a transaction under a shield",
    activeClass: "border-v5-success/5 bg-v5-success/20",
  },
]

/**
 * Switching tabs swaps the copy and the art on a fade-out/fade-in rather than a
 * cross-fade: the panel drops to 0, the content is swapped while it is invisible,
 * then it comes back. Written out in full because the animation plugins shadow
 * core's arbitrary `duration-*`/`ease-*`, as noted in learn-more-button.
 */
const PANEL_MOTION =
  "[transition:opacity_200ms_ease-out] motion-reduce:!transition-none"

/** Must match PANEL_MOTION's duration - it times the swap at the panel's floor. */
const PANEL_FADE_MS = 200

const TAB_ICONS: Record<VaultId, typeof Zap> = { fast: Zap, secure: Shield }
const TAB_ICON_COLOR: Record<VaultId, string> = {
  fast: "text-v5-warning",
  secure: "text-v5-success",
}

function VaultTabs({
  selected,
  onSelect,
}: {
  selected: VaultId
  onSelect: (id: VaultId) => void
}) {
  return (
    <div
      role="tablist"
      aria-label="Vault type"
      className="flex w-fit gap-2 rounded-full bg-v5-white p-1.5"
    >
      {VAULTS.map((vault) => {
        const Icon = TAB_ICONS[vault.id]
        const isSelected = vault.id === selected
        return (
          <button
            key={vault.id}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelect(vault.id)}
            className={cn(
              "flex h-[38px] items-center gap-2 rounded-full border-[1.5px] border-transparent px-3.5 py-2 text-v5-body-s font-medium text-v5-text-inverse",
              isSelected && vault.activeClass,
            )}
          >
            <Icon className={cn("size-4", TAB_ICON_COLOR[vault.id])} aria-hidden />
            {vault.tab}
          </button>
        )
      })}
    </div>
  )
}

export default function SetupSection() {
  const [selected, setSelected] = useState<VaultId>("fast")
  // What the panel is painting, which trails `selected` by the fade-out.
  const [shown, setShown] = useState<VaultId>("fast")
  const swapping = shown !== selected
  const vault = VAULTS.find((item) => item.id === shown) ?? VAULTS[0]

  useEffect(() => {
    if (!swapping) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(selected)
      return
    }
    const timer = setTimeout(() => setShown(selected), PANEL_FADE_MS)
    return () => clearTimeout(timer)
  }, [swapping, selected])

  return (
    <section className="bg-v5-page pt-4 md:px-[30px] md:pt-[30px]">
      <div className="mx-auto max-w-v5-content">
        <div className="flex flex-col items-center gap-8 rounded-[20px] bg-v5-deep px-4 pb-5 pt-5 md:gap-[50px] md:rounded-v5-panel md:p-[60px]">
          <SectionHeading
            tone="onDark"
            title="The setup for your needs."
            subtitle="Fast Vault for daily spending. Secure Vault for maximum protection. Both are keyless and require no seed phrase."
          />

          <div className="flex w-full flex-col">
            <div className="flex flex-col gap-3 rounded-t-3xl rounded-bl-3xl bg-v5-page p-4 md:flex-row md:p-[30px]">
              <div className="flex min-w-0 flex-col gap-3 md:w-[476px]">
                <VaultTabs selected={selected} onSelect={setSelected} />
                <div
                  className={cn(
                    "flex flex-col gap-3 pt-6 text-v5-text-inverse",
                    PANEL_MOTION,
                    swapping ? "opacity-0" : "opacity-100",
                  )}
                >
                  <h3 className="text-v5-card-title font-semibold">
                    {vault.title}
                  </h3>
                  {vault.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-v5-body-m-tight font-normal md:max-w-[407px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              {/* Both plates stay mounted so the incoming one is already
                  decoded when it fades in; only one is ever above 0 opacity,
                  since `shown` moves after the outgoing plate has faded. */}
              <div className="relative aspect-[1268/796] w-full min-w-0 md:w-[634px]">
                {VAULTS.map((item) => (
                  <Image
                    key={item.id}
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 767px) 90vw, 634px"
                    aria-hidden={item.id !== shown || undefined}
                    className={cn(
                      "rounded-3xl object-contain",
                      PANEL_MOTION,
                      item.id === shown && !swapping
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                ))}
              </div>
            </div>

            {/* The panel colour bites into the card's bottom-left corner so the
                CTA sits in a notch, which exposes three corners. Two are
                ordinary radii on the card itself: the body above the bite and
                the strip beside it. The third is the inverse corner where those
                two meet — the notch keeps a light backdrop and paints the bite
                on top of it, so the bite's own radius uncovers that backdrop
                and the card reads as curving into the notch instead of squaring
                off. */}
            <div className="flex items-stretch">
              <div className="bg-v5-page">
                <div className="rounded-tr-3xl bg-v5-deep p-4 md:p-[25px]">
                  <LearnMoreButton
                    href={vault.href}
                    external
                    ariaLabel={`Learn more about the ${vault.tab} in the docs`}
                    className="h-[50px] w-[190px]"
                  />
                </div>
              </div>
              <div className="flex-1 rounded-b-3xl bg-v5-page" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
