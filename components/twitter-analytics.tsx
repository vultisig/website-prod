"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    twq?: (...args: unknown[]) => void
  }
}

export default function TwitterAnalytics() {
  useEffect(() => {
    let cancelled = false
    let timeoutId: number | undefined

    const loadScript = () => {
      if (cancelled || document.querySelector('script[data-twitter-uwt="1"]')) {
        return
      }

      const script = document.createElement("script")
      script.async = true
      script.src = "https://static.ads-twitter.com/uwt.js"
      script.setAttribute("data-twitter-uwt", "1")
      script.onload = () => {
        if (cancelled || !window.twq) return
        window.twq("config", "ooes4")
      }

      const twq = function (...args: unknown[]) {
        ;(twq as typeof twq & { queue?: unknown[][] }).queue?.push(args)
      } as typeof window.twq & { queue?: unknown[][]; version?: string }

      if (!window.twq) {
        twq.queue = []
        twq.version = "1.1"
        window.twq = twq
      }

      document.head.appendChild(script)
      cleanup()
    }

    const scheduleLoad = () => {
      if (typeof requestIdleCallback === "function") {
        requestIdleCallback(loadScript, { timeout: 5000 })
      } else {
        timeoutId = window.setTimeout(loadScript, 5000)
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
