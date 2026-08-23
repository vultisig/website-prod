"use client"

import { useEffect, useMemo, useRef, useState } from "react"

/**
 * Depth-parallax starfield.
 *
 * Every star shares one offset vector — the field translates as a whole, it does
 * not scatter away from the pointer — and each star scales that vector by its own
 * depth. Measured off the reference capture: the per-star displacements factor to
 * 95.6% on a single component (99.9% on two, i.e. plain 2D translation), and the
 * per-star gain spans roughly 5x between the slowest and fastest star while
 * correlating with its size at r=0.69. So: one depth per star drives its size, its
 * opacity and how far it travels.
 */

/** Depth buckets. Only the parallax gain quantises — size and opacity stay
 * continuous inside a bucket, so five layers do not read as five star sizes. */
const LAYERS = 5

/** Slowest and fastest layer, relative to a nominal gain of 1. */
const GAIN_MIN = 0.5
const GAIN_MAX = 2.5

/**
 * Travel in px at the panel edge, before the per-star gain. The capture's
 * average-gain star swept ~49px horizontally and ~67px vertically over a pointer
 * move covering an estimated 60-80% of the panel, i.e. ~40px at the edge — and
 * the mean gain below lands at 1.17, so 34 * 1.17 reproduces that 40px.
 */
const AMP = 34

/**
 * Follow time constant. The capture's post-burst velocity decays exponentially at
 * ~0.72 per 40ms frame, i.e. tau ~= 0.11-0.125s. Applied as an exponential lerp
 * against real dt so the feel does not change with refresh rate.
 */
const TAU = 0.12

/** Overscan, so the fastest layer never drags an empty edge into view. */
const PAD = Math.ceil(AMP * GAIN_MAX)

/**
 * One star per this many px². Tuned against the capture by re-running the same
 * blob detector over a screenshot framed identically: 5,700 puts 65 stars above
 * the 0.2-alpha detection floor in the reference crop, which is what it holds.
 */
const AREA_PER_STAR = 5700

/** Ceiling on the pool, and so on the panel size the density holds for. */
const POOL_SIZE = 600

/** Below this the field is settled and the loop can idle. */
const EPSILON = 0.05

/** Panel size assumed for the server pass, so the first paint is not empty and
 * hydration sees the same star list the server emitted. */
const SSR_W = 1380
const SSR_H = 860

type Star = {
  /** Position as a percentage of the padded box. */
  x: number
  y: number
  /** Rendered diameter in px. */
  size: number
  opacity: number
  layer: number
}

/** Deterministic PRNG — the star list has to match between server and client. */
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v))

/** How many of the pool a padded `w`x`h` box is worth. */
const starCount = (w: number, h: number) =>
  clamp(
    Math.round(((w + PAD * 2) * (h + PAD * 2)) / AREA_PER_STAR),
    24,
    POOL_SIZE,
  )

/**
 * The star pool, in draw order — callers take a prefix of it.
 *
 * `t` is uniform and sets size and opacity; depth is `t²`, which is what a field
 * of uniform density in a volume looks like from inside it — far stars outnumber
 * near ones. Squaring matters: the capture's measured gains span 5x with their
 * median only 23% up that range, which is `t²`, not `t`. Size stays on the
 * unsquared `t`, so it correlates with the gain without tracking it exactly — the
 * capture puts that correlation at 0.69, not 1.
 */
function makeStars(seed: number): Star[] {
  const rand = mulberry32(seed)
  const stars: Star[] = []
  for (let i = 0; i < POOL_SIZE; i++) {
    const t = rand()
    const depth = t * t
    stars.push({
      x: rand() * 100,
      y: rand() * 100,
      // Measured diameters: p10 2.3px, median 2.8px, p90 4.1px, max ~5.6px.
      size: clamp(0.35 + t * 4.1 + (rand() - 0.5) * 0.9, 0.7, 5.6),
      // Measured alpha: p10 0.12, median 0.56, p90 0.8, max 0.98.
      opacity: clamp(0.08 + t * 0.72 + (rand() - 0.5) * 0.56, 0.06, 1),
      layer: Math.min(LAYERS - 1, Math.floor(depth * LAYERS)),
    })
  }
  return stars
}

const layerGain = (i: number) =>
  GAIN_MIN + ((GAIN_MAX - GAIN_MIN) * i) / (LAYERS - 1)

type StarFieldProps = {
  /** Seed the star layout, so two fields on one page do not share a sky. */
  seed?: number
  className?: string
}

/**
 * Decorative parallax starfield, sized to its nearest positioned ancestor.
 *
 * Mount it as a sibling of the panel content and give the panel `relative isolate
 * overflow-hidden`: at `-z-10` the field paints over the panel's own background
 * but under every in-flow child, so nothing else needs a stacking rule.
 */
export default function StarField({ seed = 1, className }: StarFieldProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const layerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [size, setSize] = useState({ w: SSR_W, h: SSR_H })

  // One pool, sliced to the measured box. Resizing then only adds or drops stars
  // off the tail — regenerating per size would reshuffle the whole sky on mount
  // at every panel width other than the one the server assumed.
  const pool = useMemo(() => makeStars(seed), [seed])
  const count = starCount(size.w, size.h)

  const byLayer = useMemo(() => {
    const groups: Star[][] = Array.from({ length: LAYERS }, () => [])
    for (let i = 0; i < count; i++) groups[pool[i].layer].push(pool[i])
    return groups
  }, [pool, count])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (!width || !height) return
      // Only the count depends on the box, so ignore churn too small to change it.
      setSize((prev) =>
        Math.abs(prev.w - width) > 32 || Math.abs(prev.h - height) > 32
          ? { w: Math.round(width), h: Math.round(height) }
          : prev,
      )
    })
    ro.observe(root)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    // Touch has no hover position to read, and a tap-driven pointermove would
    // snap the field rather than glide it.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)")

    let raf = 0
    let last = 0
    let visible = false
    let px = 0
    let py = 0
    let tracking = false
    let cx = 0
    let cy = 0

    const apply = () => {
      for (let i = 0; i < LAYERS; i++) {
        const el = layerRefs.current[i]
        if (!el) continue
        const g = layerGain(i)
        el.style.transform = `translate3d(${cx * g}px, ${cy * g}px, 0)`
      }
    }

    /**
     * The pointer handler only records client coordinates; the box is measured
     * here, once per animated frame, so a burst of pointermoves cannot interleave
     * layout reads with the transform writes below.
     */
    const target = () => {
      if (!tracking || !visible) return [0, 0]
      const rect = root.getBoundingClientRect()
      if (!rect.width || !rect.height) return [0, 0]
      const inside =
        px >= rect.left &&
        px <= rect.right &&
        py >= rect.top &&
        py <= rect.bottom
      if (!inside) return [0, 0]
      // Layers run against the pointer, which is what reads as depth.
      return [
        -((px - rect.left) / rect.width - 0.5) * 2 * AMP,
        -((py - rect.top) / rect.height - 0.5) * 2 * AMP,
      ]
    }

    const frame = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0
      last = now
      const [tx, ty] = target()
      const k = 1 - Math.exp(-dt / TAU)
      cx += (tx - cx) * k
      cy += (ty - cy) * k
      if (Math.abs(tx - cx) < EPSILON && Math.abs(ty - cy) < EPSILON) {
        cx = tx
        cy = ty
        apply()
        raf = 0
        last = 0
        return
      }
      apply()
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (reduced.matches || !fine.matches) return
      px = e.clientX
      py = e.clientY
      tracking = true
      if (visible) start()
    }

    /** Pointer gone from the window, tab backgrounded, section scrolled away.
     * `pointerleave` needs an element target — it does not fire on `document`. */
    const rest = () => {
      tracking = false
      start()
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else rest()
    })
    io.observe(root)

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    const html = document.documentElement
    html.addEventListener("pointerleave", rest)
    window.addEventListener("blur", rest)
    reduced.addEventListener("change", rest)
    fine.addEventListener("change", rest)
    return () => {
      io.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      html.removeEventListener("pointerleave", rest)
      window.removeEventListener("blur", rest)
      reduced.removeEventListener("change", rest)
      fine.removeEventListener("change", rest)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className ?? ""}`}
    >
      {byLayer.map((group, i) => (
        <div
          key={i}
          ref={(el) => {
            layerRefs.current[i] = el
          }}
          style={{ inset: `-${PAD}px` }}
          className="absolute"
        >
          {group.map((star, j) => (
            <span
              key={j}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            />
          ))}
        </div>
      ))}
    </div>
  )
}
