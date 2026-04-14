"use client"

import { useEffect, useRef, useState } from "react"
import type { LottieRefCurrentProps } from "lottie-react"

type AnimationKey =
  | "maximum-security"
  | "m-of-n-signing"
  | "cross-chain-swaps"
  | "secure-notifications"
  | "open-source"
  | "30-chains"
  | "hold-vult"

const animationLoaders: Record<AnimationKey, () => Promise<{ default: object }>> = {
  "maximum-security": () => import("@/public/animations/maximum-security.json"),
  "m-of-n-signing": () => import("@/public/animations/m-of-n-signing.json"),
  "cross-chain-swaps": () => import("@/public/animations/cross-chain-swaps.json"),
  "secure-notifications": () =>
    import("@/public/animations/secure-notifications.json"),
  "open-source": () => import("@/public/animations/open-source.json"),
  "30-chains": () => import("@/public/animations/30-chains.json"),
  "hold-vult": () => import("@/public/animations/hold-vult.json"),
}

export default function LazyLottie({ animation }: { animation: AnimationKey }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const [LottieComponent, setLottieComponent] =
    useState<null | React.ComponentType<any>>(null)
  const [animationData, setAnimationData] = useState<object | null>(null)
  const loadingRef = useRef(false)
  const playedRef = useRef(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void load()
          observer.disconnect()
        }
      },
      { rootMargin: "240px 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [animation])

  async function load() {
    if (loadingRef.current || (LottieComponent && animationData)) return
    loadingRef.current = true

    const [{ default: Lottie }, { default: data }] = await Promise.all([
      import("lottie-react"),
      animationLoaders[animation](),
    ])

    setLottieComponent(() => Lottie)
    setAnimationData(data)
  }

  function handleMouseEnter() {
    if (!LottieComponent || !animationData) {
      void load().then(() => {
        if (lottieRef.current && !playedRef.current) {
          playedRef.current = true
          lottieRef.current.goToAndPlay(0, true)
        }
      })
      return
    }

    if (lottieRef.current && !playedRef.current) {
      playedRef.current = true
      lottieRef.current.goToAndPlay(0, true)
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(51,230,191,0.16),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(4,57,199,0.22),transparent_40%),linear-gradient(180deg,rgba(6,27,58,0.95),rgba(6,27,58,0.3))]"
      aria-hidden="true"
    >
      {LottieComponent && animationData ? (
        <LottieComponent
          lottieRef={lottieRef}
          animationData={animationData}
          autoplay={false}
          loop={false}
          className="absolute inset-0 w-full h-full [&_svg]:w-full [&_svg]:h-full [&_svg]:object-cover"
          style={{ objectFit: "cover" }}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        />
      ) : null}
    </div>
  )
}
