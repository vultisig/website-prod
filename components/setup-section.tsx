"use client"

import { Shield, Zap } from "lucide-react"
import Image from "next/image"
import { type CSSProperties, useEffect, useState } from "react"

import SectionHeading from "@/components/ui/section-heading"
import SplineScene from "@/components/ui/spline-scene"
import { LearnMoreButton } from "@/components/ui/learn-more-button"
import { cn } from "@/lib/utils"

/** Width of the vault art on each plate, for the poster's srcset. */
const ART_SIZES = "(max-width: 767px) 90vw, 634px"

/**
 * The exported art's own frame, which the slot is a window onto. The poster is
 * laid in `object-contain` and shares this ratio, so it fills the frame edge to
 * edge; the canvas sizes itself off the frame's width.
 */
const ART_ASPECT = "aspect-[1268/796]"

/**
 * What the card actually shows of that frame. Both scenes settle with the
 * vault in the top ~78% and nothing but background below it, so laying the art
 * in whole sized this row off a band of empty pixels: it ran ~80px past the
 * copy beside it and left a hole under the last paragraph. The slot is
 * shorter than the art and clips that band instead, which shortens the row
 * without shrinking the vault. Keep it at or above 640 - `Secure Vault`'s
 * shadow reaches 620, and the crop would start eating the art below that.
 */
const SLOT_ASPECT = "aspect-[1268/640]"

type VaultId = "fast" | "secure"

type Vault = {
  id: VaultId
  tab: string
  title: string
  paragraphs: [string, string]
  href: string
  image: string
  imageAlt: string
  /**
   * Exported Spline scene to run in place of `image`, which then serves as its
   * poster. Drop a `.splinecode` in public/v5 and name it here to animate a
   * vault; leave it off and the plate stays a still.
   */
  scene?: string
  /**
   * The flat grey the scene's own Backdrop mesh renders as, sampled from the
   * poster. The card paints itself this colour so the art's slot stops reading
   * as a box inside the card. It has to travel with the tab rather than be one
   * token: the two scenes carry the same Backdrop material but different
   * lighting rigs, so they settle on different greys.
   */
  surface: string
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
    // Poster rendered from the scene's own settled frame, so the handover from
    // still to canvas has nothing to pop between. The original still art is
    // kept at /v5/setup-fast-vault.webp.
    image: "/v5/setup-fast-vault-scene.webp",
    imageAlt:
      "Single server tray guarded by a shield, next to a laptop signing a transaction",
    scene: "/v5/setup-fast-vault.splinecode",
    surface: "#eeeff8",
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
    // Poster rendered from the scene's own settled frame, so the handover from
    // still to canvas has nothing to pop between. The original still art is
    // kept at /v5/setup-secure-vault.webp.
    image: "/v5/setup-secure-vault-scene.webp",
    imageAlt:
      "Three stacked device trays co-signing a transaction under a shield",
    scene: "/v5/setup-secure-vault.splinecode",
    surface: "#e2e6eb",
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

/**
 * The card surface crosses between the two vaults' backdrop greys. Slower than
 * the panel so the colour is still settling while the new copy fades in, which
 * reads as one move rather than a flash. Written out in full for the same
 * reason as PANEL_MOTION.
 */
const SURFACE_MOTION =
  "[transition:background-color_400ms_ease-out] motion-reduce:!transition-none"

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

          {/* The card paints the active vault's backdrop grey rather than the
              page token: the slot on the right is a window onto the scene's own
              Backdrop mesh, and any other surface colour draws a visible box
              around the art. One variable so the body, the notch backdrop and
              the bottom strip can never drift apart. */}
          <div
            className="flex w-full flex-col"
            style={{ "--setup-surface": vault.surface } as CSSProperties}
          >
            <div
              className={cn(
                "flex flex-col gap-3 rounded-t-3xl rounded-bl-3xl bg-[var(--setup-surface)] p-4 md:flex-row md:p-[30px]",
                SURFACE_MOTION,
              )}
            >
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
                  since `shown` moves after the outgoing plate has faded. An
                  animated plate is only ever rendering while it is the visible
                  one - a plate parked at 0 opacity still occupies the layout,
                  so it would otherwise burn GPU behind the other tab. */}
              <div
                className={cn(
                  "relative w-full min-w-0 overflow-hidden rounded-3xl md:w-[634px]",
                  SLOT_ASPECT,
                )}
              >
                {VAULTS.map((item) => {
                  const visible = item.id === shown && !swapping
                  return (
                    <div
                      key={item.id}
                      aria-hidden={item.id !== shown || undefined}
                      className={cn(
                        "absolute inset-x-0 top-0",
                        ART_ASPECT,
                        PANEL_MOTION,
                        // Both plates fill the same box, so the one later in
                        // source order sits on top whichever tab is open. Each
                        // scene is published with `mouseEventTarget: "canvas"`,
                        // meaning the runtime listens on its own canvas - so a
                        // plate parked at 0 opacity was still eating the
                        // pointer moves the visible plate needed to follow the
                        // cursor. Only the live plate takes the pointer.
                        visible
                          ? "opacity-100"
                          : "pointer-events-none opacity-0",
                      )}
                    >
                      {item.scene ? (
                        <SplineScene
                          scene={item.scene}
                          poster={item.image}
                          posterAlt={item.imageAlt}
                          sizes={ART_SIZES}
                          active={visible}
                          className="size-full"
                        />
                      ) : (
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          sizes={ART_SIZES}
                          className="object-contain"
                        />
                      )}
                    </div>
                  )
                })}
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
              <div className={cn("bg-[var(--setup-surface)]", SURFACE_MOTION)}>
                <div className="rounded-tr-3xl bg-v5-deep p-4 md:p-[25px]">
                  <LearnMoreButton
                    href={vault.href}
                    external
                    ariaLabel={`Learn more about the ${vault.tab} in the docs`}
                    className="h-[50px] w-[190px]"
                  />
                </div>
              </div>
              <div
                className={cn(
                  "flex-1 rounded-b-3xl bg-[var(--setup-surface)]",
                  SURFACE_MOTION,
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
