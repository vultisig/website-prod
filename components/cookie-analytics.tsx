"use client"

import { useEffect } from "react"

export default function CookieAnalytics() {
  useEffect(() => {
    let cancelled = false
    let timeoutId: number | undefined

    const loadScript = () => {
      if (cancelled || document.querySelector('script[data-cookie3="1"]')) return

      const script = document.createElement("script")
      script.defer = true
      script.crossOrigin = "anonymous"
      script.src =
        "https://cdn.markfi.xyz/scripts/analytics/0.11.24/cookie3.analytics.min.js"
      script.integrity =
        "sha384-ihnQ09PGDbDPthGB3QoQ2Heg2RwQIDyWkHkqxMzq91RPeP8OmydAZbQLgAakAOfI"
      script.setAttribute("site-id", "44beb5bb-3d65-4e6a-9631-3d99382ca2ea")
      script.setAttribute("data-cookie3", "1")
      document.head.appendChild(script)
      cleanup()
    }

    const scheduleLoad = () => {
      if (typeof requestIdleCallback === "function") {
        requestIdleCallback(loadScript, { timeout: 4000 })
      } else {
        timeoutId = window.setTimeout(loadScript, 4000)
      }
    }

    const interactionEvents = ["pointerdown", "keydown", "touchstart", "scroll"]
    const handleInteraction = () => loadScript()

    const cleanup = () => {
      interactionEvents.forEach((eventName) =>
        window.removeEventListener(eventName, handleInteraction),
      )
      window.removeEventListener("load", scheduleLoad)
      if (timeoutId) window.clearTimeout(timeoutId)
    }

    interactionEvents.forEach((eventName) =>
      window.addEventListener(eventName, handleInteraction, {
        passive: true,
        once: true,
      }),
    )

    if (document.readyState === "complete") {
      scheduleLoad()
    } else {
      window.addEventListener("load", scheduleLoad, { once: true })
    }

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return null
}
