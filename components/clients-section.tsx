"use client"

import { useLayoutEffect, useRef, useState } from "react"
import Image from "next/image"

export default function ClientsSection() {
  const clients = [
    { name: "DeFi Suisse", image: "/images/defi-suisse-logo.webp", width: 353, height: 92 },
    { name: "THORChain", image: "/images/thorchain-logo.webp", width: 300, height: 64 },
    { name: "Rujira", image: "/images/rujira-logo.webp", width: 383, height: 92 },
  ]

  const setRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [setWidth, setSetWidth] = useState(0)
  const [repeatCount, setRepeatCount] = useState(2)

  useLayoutEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout>
    function measure() {
      if (!setRef.current || !containerRef.current) return
      const singleSetWidth = setRef.current.offsetWidth
      const containerWidth = containerRef.current.offsetWidth

      if (!singleSetWidth || !containerWidth) return

      // Repeat enough times to overflow the container + extra buffer
      const needed = Math.ceil(containerWidth / singleSetWidth) + 2
      setRepeatCount(needed)
      setSetWidth(singleSetWidth)
    }

    measure()
    const debouncedMeasure = () => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(measure, 150)
    }
    window.addEventListener("resize", debouncedMeasure, { passive: true })
    return () => {
      clearTimeout(debounceTimer)
      window.removeEventListener("resize", debouncedMeasure)
    }
  }, [])

  const repeatedSets = Array.from({ length: repeatCount }).map((_, i) => (
    <div key={i} ref={i === 0 ? setRef : null} className="flex flex-shrink-0">
      {clients.map((client, idx) => (
        <div key={`${i}-${idx}`} className="flex items-center mx-4 sm:mx-8">
          <Image
            src={client.image}
            alt={client.name}
            width={client.width}
            height={client.height}
            className="h-8 sm:h-12 w-auto object-contain"
          />
        </div>
      ))}
    </div>
  ))

  return (
    <section className="py-12 px-4">
      <div className="container text-center mb-12">
        <p className="text-gray-300 text-base sm:text-lg">
          Vultisig Vaults are battle-tested and trusted by thousands of users,
          <br className="hidden sm:block" />
          with numbers growing daily.
        </p>
      </div>

      <div className="overflow-hidden" ref={containerRef}>
        <div
          className="flex"
          style={
            setWidth > 0
              ? {
                width: `${setWidth * repeatCount}px`,
                animation: `scrollClients 10s linear infinite`,
              }
              : undefined
          }
        >
          {repeatedSets}
        </div>
      </div>

      {setWidth > 0 && (
        <style jsx>{`
          @keyframes scrollClients {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${setWidth}px);
            }
          }
        `}</style>
      )}
    </section>
  )
}
