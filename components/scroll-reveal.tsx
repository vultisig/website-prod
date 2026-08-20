"use client"

import { useEffect } from "react"

/**
 * Reveals `main > section` elements (except the hero) with a rise-and-fade as
 * they enter the viewport. The hidden state only exists while
 * `html[data-reveal]` is set from here, so content stays visible without JS.
 * Sections arrive late via next/dynamic, hence the MutationObserver.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "")
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    )

    const seen = new WeakSet<Element>()
    const observeSections = () => {
      document
        .querySelectorAll("main > section:not(:first-of-type)")
        .forEach(el => {
          if (seen.has(el) || el.hasAttribute("data-revealed")) return
          seen.add(el)
          io.observe(el)
        })
    }

    document.documentElement.setAttribute("data-reveal", "")
    observeSections()
    const mo = new MutationObserver(observeSections)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      io.disconnect()
      document.documentElement.removeAttribute("data-reveal")
    }
  }, [])

  return null
}
