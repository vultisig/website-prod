"use client"
import { useEffect } from "react"
import { Observer } from "tailwindcss-intersect"

export default function LoadTailwindIntersect() {
  useEffect(() => {
    Observer.start()
  }, [])

  return null
}
