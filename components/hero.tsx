"use client"

import { Button } from "@/components/ui/button"
import { DotPattern } from "@/components/magicui/dot-pattern"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

const Spline = dynamic(() => import("@/components/spline-wrapper"), {
  ssr: false,
  loading: () => null,
})

export default function Hero() {
  const words = ["DRAINED", "HACKED", "PHISHED"]
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [charIndex, setCharIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const currentWord = words[currentWordIndex]
    if (isTyping) {
      if (charIndex < currentWord.length) {
        const timer = setTimeout(() => {
          setCurrentText(currentWord.slice(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        }, 100)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setIsTyping(false)
        }, 1000)
        return () => clearTimeout(timer)
      }
    } else {
      if (charIndex > 0) {
        const timer = setTimeout(() => {
          setCurrentText(currentWord.slice(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        }, 50)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
          setIsTyping(true)
          setCharIndex(0)
          setCurrentText("")
        }, 500)
        return () => clearTimeout(timer)
      }
    }
  }, [currentWordIndex, charIndex, isTyping, words])

  return (
    <section
      className="pt-32 pb-0 px-4 relative overflow-hidden min-h-screen flex flex-col justify-center items-center md:block bg-black"
      style={{ pointerEvents: "none", userSelect: "none" }}
    >
      {/* Dot Pattern Background - Shows before Spline loads */}
      <DotPattern
        width={64}
        height={64}
        cr={3}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Spline 3D Background - Only on desktop */}
      {!isMobile && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Spline />
        </div>
      )}
      <div className="relative max-w-7xl mx-auto w-full flex flex-col items-center justify-center md:block z-20">
        <div className="w-full flex flex-col items-center justify-center md:block md:max-w-4xl">
          <div className="inline-flex items-center bg-[#092e3e] border border-[#33e6bf] rounded-full px-6 py-2 mb-4 md:px-4 md:py-1 md:mt-20 md:mb-2">
            <span className="font-medium text-base md:text-xs md:sm:text-sm text-[#33e6bf]">Open-Source Audited</span>
          </div>

          <h1 className="font-bold text-white mb-8 leading-tight text-center md:text-left text-5xl sm:text-6xl md:text-9xl">
            NEVER GET
            <br />
            <span className="bg-gradient-to-r from-[#33e6bf] to-cyan-400 bg-clip-text text-transparent">
              {currentText}
            </span>
            <br />
            AGAIN
          </h1>

          <a href="/downloads">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-12 py-6 sm:py-8 text-base sm:text-lg rounded-lg mb-16 pointer-events-auto">
              Download Vultisig
            </Button>
          </a>
        </div>
      </div>
      {/* Light effect at the bottom - hemisphere */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[100vw] h-[50vw] pointer-events-none"
        style={{
          background: "radial-gradient(at center bottom, rgba(0, 66, 170, 0.48) 0%, rgba(22, 94, 177, 0.07) 60%, rgba(0, 0, 0, 0) 100%)",
          filter: "blur(48px)",
          transform: "translate(-50%, 200px)",
          zIndex: 1,
        }}
      >
        <div className="w-full h-full backdrop-blur-md" style={{background: "rgba(255,255,255,0.06)"}} />
      </div>
    </section>
  )
}
