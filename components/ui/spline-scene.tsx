"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * The Spline runtime, served as a same-origin asset rather than bundled -
 * see scripts/vendor-spline-runtime.mjs for why a bundled import cannot work.
 */
const RUNTIME_URL = "/v5/spline/runtime.js"

/**
 * Where the runtime looks for the WASM it resolves by URL instead of by import.
 * Left unset it hardcodes `cdn.spline.design` for its own modules and
 * `www.gstatic.com` for the DRACO decoder its compressed geometry needs, and
 * `connect-src 'self'` in next.config.mjs blocks both - the scene then loads
 * but renders nothing. The decoder is vendored under public/v5/spline instead.
 */
const WASM_PATH = "/v5/spline"

/** The sliver of the runtime's surface this component drives. */
type SplineApplication = {
  load(scene: string): Promise<void>
  dispose(): void
  stop(): void
  play(): void
}

type SplineRuntime = {
  Application: new (
    canvas: HTMLCanvasElement,
    options?: { wasmPath?: string; renderer?: "webgl" | "webgpu" },
  ) => SplineApplication
}

/**
 * Hands the card over from the poster to the live canvas once the first frame
 * is on screen. Written out in full because tailwindcss-animate and
 * tailwindcss-motion both redefine `duration-*` and `ease-*`, which shadows
 * core's arbitrary values - the same trap noted in learn-more-button.
 */
const CANVAS_MOTION =
  "[transition:opacity_500ms_ease-out] motion-reduce:!transition-none"

/**
 * Starts the runtime download (~580KB over the wire) a screen early, so the
 * scene is usually up by the time the section is actually scrolled to rather
 * than popping in under the reader.
 */
const PRELOAD_MARGIN = "300px"

export type SplineSceneProps = {
  /** Path to the exported `.splinecode` under public/. */
  scene: string
  /**
   * Static art shown until the canvas is ready, and permanently for readers who
   * ask for reduced motion or have no WebGL. Render it from the scene itself so
   * the handover has nothing to pop between.
   */
  poster: string
  posterAlt: string
  /** `sizes` for the poster, matching the slot it is laid into. */
  sizes: string
  className?: string
  /**
   * The render loop runs only while this is true. Panels that keep the scene
   * mounted behind a tab pass `false` so a hidden canvas costs no GPU.
   */
  active?: boolean
}

/**
 * A Spline 3D scene that degrades to its poster image.
 *
 * The runtime is heavy - ~780KB gzipped once the scene and the DRACO decoder
 * are counted - and nothing above the fold needs it, so it is neither bundled
 * into the page nor fetched on mount: the dynamic import fires from an
 * IntersectionObserver, which keeps it off the critical path entirely for
 * readers who never scroll this far. Readers who ask for reduced motion never
 * load it at all and keep the poster. The same observer then gates the render
 * loop, so the scene only costs GPU while it is actually on screen.
 */
export default function SplineScene({
  scene,
  poster,
  posterAlt,
  sizes,
  className,
  active = true,
}: SplineSceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<SplineApplication | null>(null)
  const [ready, setReady] = useState(false)
  const [onScreen, setOnScreen] = useState(false)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Guards the async gap: the effect can be torn down (StrictMode, a route
    // change) while the runtime chunk or the scene is still in flight, and the
    // Application would otherwise be created onto a detached canvas.
    let cancelled = false
    // The observer stays connected to drive the render loop, so it fires again
    // every time the reader scrolls back - without this the second pass would
    // build a second Application over the first one's canvas.
    let started = false

    const load = async () => {
      const canvas = canvasRef.current
      if (!canvas || cancelled || started) return
      started = true
      try {
        // Both magic comments are needed: the build runs on Turbopack and the
        // dev server on webpack, and either one would otherwise try to resolve
        // the URL as a module and fail the build.
        const { Application }: SplineRuntime = await import(
          /* webpackIgnore: true */ /* turbopackIgnore: true */ RUNTIME_URL
        )
        if (cancelled) return
        const app = new Application(canvas, { wasmPath: WASM_PATH })
        await app.load(scene)
        if (cancelled) {
          app.dispose()
          return
        }
        appRef.current = app
        setReady(true)
      } catch {
        // WebGL refused, the runtime 404'd, the scene is malformed - the poster
        // is already on screen and stays, so there is nothing to recover.
      }
    }

    // Stays connected after the load: the same signal that starts the download
    // then drives the render loop, so a scene the reader has scrolled past
    // costs nothing until they come back to it.
    const io = new IntersectionObserver(
      entries => {
        const visible = entries.some(entry => entry.isIntersecting)
        setOnScreen(visible)
        if (visible) void load()
      },
      { rootMargin: PRELOAD_MARGIN },
    )
    io.observe(wrap)

    return () => {
      cancelled = true
      io.disconnect()
      appRef.current?.dispose()
      appRef.current = null
      setReady(false)
      setOnScreen(false)
    }
  }, [scene])

  // Kept apart from the loader so neither toggling a tab nor scrolling away
  // ever re-downloads the scene.
  useEffect(() => {
    if (!ready) return
    const app = appRef.current
    if (!app) return
    if (active && onScreen) app.play()
    else app.stop()
  }, [active, onScreen, ready])

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <Image
        src={poster}
        alt={posterAlt}
        fill
        sizes={sizes}
        className="object-contain"
      />
      {/* aria-hidden throughout: the canvas is the poster in motion, so
          announcing it again would just repeat posterAlt. */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className={cn(
          "absolute inset-0 size-full",
          CANVAS_MOTION,
          ready ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  )
}
