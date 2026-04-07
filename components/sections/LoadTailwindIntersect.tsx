"use client"
import { useEffect } from "react"
import { Observer } from "tailwindcss-intersect"

export default function LoadTailwindIntersect() {
  useEffect(() => {
    if (typeof requestIdleCallback === "function") {
      const id = requestIdleCallback(() => Observer.start())
      return () => cancelIdleCallback(id)
    } else {
      const id = window.setTimeout(() => Observer.start(), 200)
      return () => clearTimeout(id)
    }
  }, [])

  return null
}
