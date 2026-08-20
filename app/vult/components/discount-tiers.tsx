"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

import { LandingButton } from "@/components/ui/landing-button"

import { VULT_BUY_URL } from "../token"

type Tier = {
  name: string
  /** Tailwind background class — written out in full so JIT keeps it. */
  surface: string
  discount: string
  threshold: string
  reduction: string
  feeWithoutReferral: string
  feeWithReferral: string
  art: {
    src: string
    alt: string
    /** Position/size inside the 406 x 398 card, as percentages. */
    style: { left: string; top: string; width: string; height: string }
  }
}

const TIERS: Tier[] = [
  {
    name: "Bronze",
    surface: "bg-v5-tier-bronze",
    discount: "Discount: 5bps",
    threshold: "1,500 $VULT",
    reduction: "10%",
    feeWithoutReferral: "45 bps",
    feeWithReferral: "40 bps (-5 bps)",
    art: {
      src: "/v5/vult-tier-bronze.webp",
      alt: "A soft 3D bronze ring resting on its side",
      style: { left: "0%", top: "22.11%", width: "100%", height: "55.78%" },
    },
  },
  {
    name: "Silver",
    surface: "bg-v5-tier-silver",
    discount: "Discount: 10bps",
    threshold: "3,000 $VULT",
    reduction: "20%",
    feeWithoutReferral: "40 bps",
    feeWithReferral: "35 bps (-5 bps)",
    art: {
      src: "/v5/vult-tier-silver.webp",
      alt: "A rounded 3D silver disc with a folded edge",
      style: { left: "0%", top: "19.85%", width: "94.09%", height: "59.55%" },
    },
  },
  {
    name: "Gold",
    surface: "bg-v5-tier-gold",
    discount: "Discount: 20bps",
    threshold: "7,500 $VULT",
    reduction: "40%",
    feeWithoutReferral: "30 bps",
    feeWithReferral: "25 bps (-5 bps)",
    art: {
      src: "/v5/vult-tier-gold.webp",
      alt: "A stack of 3D gold bars",
      style: { left: "0.25%", top: "13.57%", width: "95.07%", height: "65.58%" },
    },
  },
  {
    name: "Platinum",
    surface: "bg-v5-tier-platinum",
    discount: "Discount: 25bps",
    threshold: "15,000 $VULT",
    reduction: "50%",
    feeWithoutReferral: "25 bps",
    feeWithReferral: "20 bps (-5 bps)",
    art: {
      src: "/v5/vult-tier-platinum.webp",
      alt: "A fanned burst of 3D platinum shards",
      style: { left: "0.99%", top: "19.60%", width: "82.27%", height: "59.80%" },
    },
  },
  {
    name: "Diamond",
    surface: "bg-v5-tier-diamond",
    discount: "Discount: 35bps",
    threshold: "100,000 $VULT",
    reduction: "70%",
    feeWithoutReferral: "15 bps",
    feeWithReferral: "10 bps (-5 bps)",
    art: {
      src: "/v5/vult-tier-diamond.webp",
      alt: "A faceted 3D diamond crystal",
      style: { left: "0%", top: "20.35%", width: "78.82%", height: "59.05%" },
    },
  },
  {
    name: "Ultimate",
    surface: "bg-v5-tier-ultimate",
    discount: "Complete fee waiver",
    threshold: "1,000,000 $VULT",
    reduction: "100%",
    feeWithoutReferral: "0 bps",
    feeWithReferral: "0 bps",
    art: {
      src: "/v5/vult-tier-ultimate.webp",
      alt: "An angular 3D trophy form in deep blue",
      style: { left: "0.74%", top: "22.11%", width: "93.35%", height: "57.29%" },
    },
  },
]

function Fee({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-1 flex-col gap-1.5">
      <dt className="text-v5-caption font-medium md:text-v5-footnote">
        {label}
      </dt>
      <dd className="text-v5-body-s font-bold md:text-v5-body-m">{value}</dd>
    </div>
  )
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <li
      className={`relative flex h-[418px] w-[calc(100vw-2rem)] max-w-[361px] shrink-0 snap-start flex-col gap-4 overflow-hidden rounded-[20px] border-b-[3px] border-[rgba(51,119,217,0.21)] px-5 py-[25px] text-v5-text-primary shadow-[inset_0px_1px_2px_0px_rgba(76,120,183,0.16)] md:h-[398px] md:w-[406px] md:max-w-none md:rounded-v5-panel md:px-6 md:py-[30px] ${tier.surface}`}
    >
      <Image
        src={tier.art.src}
        alt={tier.art.alt}
        width={406}
        height={264}
        style={tier.art.style}
        className="pointer-events-none absolute"
      />

      <div className="relative flex flex-1 items-start justify-between">
        <h3 className="text-v5-card-title-md font-medium md:text-v5-tier-title">
          {tier.name}
        </h3>
        <div className="flex flex-col items-end gap-2.5 pt-1 md:gap-3.5">
          <p className="rounded-[20px] border border-black/10 bg-black/20 px-2.5 py-1.5 text-v5-body-s font-medium md:px-3 md:py-2 md:text-v5-body-m">
            {tier.discount}
          </p>
          <p className="text-v5-body-s font-semibold md:text-v5-body-m">
            {tier.threshold}
          </p>
        </div>
      </div>

      <p className="absolute bottom-[86px] left-5 right-5 flex items-baseline gap-3 font-bold md:bottom-[70px] md:left-6 md:right-6 md:gap-5">
        <span className="text-v5-tier-figure-sm md:text-v5-tier-figure">
          {tier.reduction}
        </span>
        <span className="text-v5-label md:text-v5-subtitle">fee reduction</span>
      </p>

      <hr className="relative border-t border-white/40" />

      <dl className="relative flex gap-0.5">
        <Fee label="Without Referral:" value={tier.feeWithoutReferral} />
        <Fee label="With Referral:" value={tier.feeWithReferral} />
      </dl>
    </li>
  )
}

/**
 * Desktop pins the card for the strip's overflow distance and maps vertical
 * scroll onto a horizontal translate — all six tiers pass before the page
 * moves on. The strip stays a real scroll container underneath, so mobile,
 * reduced-motion, and no-JS all keep the manual swipe.
 */
export default function DiscountTiers() {
  const wrapRef = useRef<HTMLElement>(null)
  const clipRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const clip = clipRef.current
    const track = trackRef.current
    if (!wrap || !clip || !track) return

    const desktop = window.matchMedia("(min-width: 768px)")
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let dist = 0
    let raf = 0

    const apply = () => {
      if (!dist) return
      const progress = Math.min(
        1,
        Math.max(0, -wrap.getBoundingClientRect().top / dist),
      )
      track.style.transform = `translateX(${-progress * dist}px)`
    }

    const measure = () => {
      if (!desktop.matches || reduced.matches) {
        dist = 0
        wrap.style.removeProperty("--tiers-scroll")
        clip.style.removeProperty("overflow-x")
        track.style.removeProperty("transform")
        return
      }
      dist = clip.scrollWidth - clip.clientWidth
      wrap.style.setProperty("--tiers-scroll", `${dist}px`)
      clip.style.overflowX = "hidden"
      apply()
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(apply)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(clip)
    window.addEventListener("scroll", onScroll, { passive: true })
    desktop.addEventListener("change", measure)
    reduced.addEventListener("change", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("scroll", onScroll)
      desktop.removeEventListener("change", measure)
      reduced.removeEventListener("change", measure)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      ref={wrapRef}
      className="bg-v5-page pt-8 md:h-[calc(100vh+var(--tiers-scroll,0px))] md:px-[30px] md:pt-0"
    >
      <div className="md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-center">
        <div className="mx-auto w-full max-w-v5-content">
          <div className="overflow-hidden rounded-[20px] bg-v5-white py-9 md:rounded-v5-panel md:py-[60px]">
            <div className="flex flex-col items-center gap-3.5 px-4 text-center text-v5-text-inverse md:flex-row md:items-start md:justify-between md:gap-6 md:px-[60px] md:text-left">
              <div className="flex flex-col gap-3.5 md:gap-[14px]">
                <h2 className="text-v5-display-sm font-medium md:text-v5-display">
                  $VULT Discount Tiers
                </h2>
                <p className="text-v5-body-m font-normal md:text-v5-subtitle">
                  Hold $VULT to unlock lower trading fees.
                </p>
              </div>
              <LandingButton
                asChild
                size="sm"
                className="hidden h-[50px] w-[185px] shrink-0 md:inline-flex"
              >
                <a href={VULT_BUY_URL} target="_blank" rel="noopener noreferrer">
                  Buy $VULT
                </a>
              </LandingButton>
            </div>

            <div
              ref={clipRef}
              className="mt-8 snap-x snap-mandatory scroll-pl-4 overflow-x-auto px-4 [scrollbar-width:none] md:mt-[50px] md:scroll-pl-[60px] md:px-[60px] [&::-webkit-scrollbar]:hidden"
            >
              <ul
                ref={trackRef}
                className="flex w-max gap-5 will-change-transform md:gap-[30px]"
              >
                {TIERS.map((tier) => (
                  <TierCard key={tier.name} tier={tier} />
                ))}
              </ul>
            </div>

            <div className="mt-8 flex justify-center px-4 md:hidden">
              <LandingButton asChild size="sm" className="h-[50px] w-[300px]">
                <a href={VULT_BUY_URL} target="_blank" rel="noopener noreferrer">
                  Buy $VULT
                </a>
              </LandingButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
