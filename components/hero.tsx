"use client"

import SplineOffscreen from "@/components/spline-offscreen"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

const WORDS = ["DRAINED", "HACKED", "PHISHED"]

export default function Hero() {
  const [currentText, setCurrentText] = useState("")
  const [isMobile, setIsMobile] = useState(true)
  const [showSpline, setShowSpline] = useState(false)
  const [splineReady, setSplineReady] = useState(false)

  // Typewriter intermediate state in refs to avoid re-renders
  const wordIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const isTypingRef = useRef(true)

  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout>
    const checkMobile = () => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        setIsMobile(window.innerWidth < 768)
      }, 150)
    }
    // Initial check without debounce
    setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", checkMobile, { passive: true })
    return () => {
      clearTimeout(debounceTimer)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Delay Spline mount by 2.5s on desktop
  useEffect(() => {
    if (isMobile) return
    const timer = setTimeout(() => setShowSpline(true), 2500)
    return () => clearTimeout(timer)
  }, [isMobile])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const word = WORDS[wordIndexRef.current]
      if (isTypingRef.current) {
        if (charIndexRef.current < word.length) {
          charIndexRef.current++
          setCurrentText(word.slice(0, charIndexRef.current))
          timer = setTimeout(tick, 100)
        } else {
          isTypingRef.current = false
          timer = setTimeout(tick, 1000)
        }
      } else {
        if (charIndexRef.current > 0) {
          charIndexRef.current--
          setCurrentText(word.slice(0, charIndexRef.current))
          timer = setTimeout(tick, 50)
        } else {
          wordIndexRef.current = (wordIndexRef.current + 1) % WORDS.length
          isTypingRef.current = true
          setCurrentText("")
          timer = setTimeout(tick, 500)
        }
      }
    }
    timer = setTimeout(tick, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      className="pt-32 pb-0 px-4 relative overflow-hidden min-h-screen flex flex-col justify-center items-center bg-gradient-hero"
      style={{
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {/* Spline 3D Background - Only on desktop, off main thread via Worker */}
      {!isMobile && showSpline && (
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            opacity: splineReady ? 1 : 0,
            transition: "opacity 10800ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <SplineOffscreen
            scene="https://prod.spline.design/TMNN6wJ0bfvnVGnB/scene.splinecode"
            onLoad={() => {
              requestAnimationFrame(() => setSplineReady(true))
            }}
          />
        </div>
      )}

      <div
        className={`relative container w-full flex flex-col items-center justify-center z-20 ${splineReady ? "md:-translate-x-[25%]" : ""}`}
        style={{
          transition: "transform 5400ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="w-full flex flex-col items-center justify-center md:max-w-4xl">
          <div className="inline-flex items-center bg-tealDark border border-secondaryAccent rounded-full px-6 py-2 mb-4 md:px-4 md:py-1 md:mt-20 md:mb-2">
            <span className="font-medium text-base md:text-xs md:sm:text-sm text-secondaryAccent">
              Open-Source Audited
            </span>
          </div>

          <h1 className="font-bold text-white mb-8 leading-tight text-center text-5xl sm:text-6xl md:text-9xl">
            NEVER GET
            <br />
            <span className="bg-gradient-to-r from-secondaryAccent to-cyan-400 bg-clip-text text-transparent">
              {currentText}
            </span>
            <br />
            AGAIN
          </h1>
          {/* <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-textSecondary mb-8 text-center md:text-left">
            Secure Cross-Chain Multi-Signature Vaults
          </h2> */}

          <a href="/downloads">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-12 py-6 sm:py-8 text-base sm:text-lg rounded-lg mb-16 pointer-events-auto">
              Download Vultisig
            </Button>
          </a>
        </div>
      </div>

      {/* Subtle glow at the bottom */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[100vw] h-[40vh] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(72, 121, 253, 0.15) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />
    </section>
  )
}
