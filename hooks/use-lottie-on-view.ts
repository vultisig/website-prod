"use client"

import { useRef, useEffect, useCallback } from "react"
import type { LottieRefCurrentProps } from "lottie-react"

export function useLottieOnView(speed = 1) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const wantsToPlay = useRef(false)

  useEffect(() => {
    const lottie = lottieRef.current
    if (!lottie) return

    lottie.setSpeed(speed)
    lottie.goToAndStop(0, true)

    const onComplete = () => {
      if (wantsToPlay.current) {
        lottie.goToAndPlay(0, true)
      } else {
        lottie.goToAndStop(0, true)
      }
    }

    lottie.animationItem?.addEventListener("complete", onComplete)
    return () => {
      lottie.animationItem?.removeEventListener("complete", onComplete)
    }
  }, [speed])

  const onMouseEnter = useCallback(() => {
    wantsToPlay.current = true
    const lottie = lottieRef.current
    if (!lottie) return
    lottie.goToAndPlay(0, true)
  }, [speed])

  const onMouseLeave = useCallback(() => {
    wantsToPlay.current = false
  }, [])

  return { lottieRef, containerRef, onMouseEnter, onMouseLeave }
}
