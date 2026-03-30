"use client"

import { useRef, useEffect, useCallback } from "react"
import type { LottieRefCurrentProps } from "lottie-react"

export function useLottieOnView(speed = 1) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasPlayed = useRef(false)

  useEffect(() => {
    const lottie = lottieRef.current
    if (!lottie) return

    lottie.setSpeed(speed)
    lottie.goToAndStop(0, true)
  }, [speed])

  const onMouseEnter = useCallback(() => {
    if (hasPlayed.current) return
    hasPlayed.current = true
    const lottie = lottieRef.current
    if (!lottie) return
    lottie.setSpeed(speed)
    lottie.goToAndPlay(0, true)
  }, [speed])

  const onMouseLeave = useCallback(() => {}, [])

  return { lottieRef, containerRef, onMouseEnter, onMouseLeave }
}
