"use client"

import { useRef, useEffect } from "react"
import type { LottieRefCurrentProps } from "lottie-react"

export function useLottieOnView(speed = 0.35) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    lottieRef.current?.setSpeed(speed)
    lottieRef.current?.pause()

    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lottieRef.current?.play()
        } else {
          lottieRef.current?.pause()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [speed])

  return { lottieRef, containerRef }
}
