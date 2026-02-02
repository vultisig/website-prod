"use client"
import Spline from "@splinetool/react-spline"
import type { Application } from "@splinetool/runtime"
import { useState, useEffect, useRef, useCallback } from "react"

export default function SplineWrapper() {
  const [hasError, setHasError] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const splineRef = useRef<Application | null>(null)

  // Pause/resume rendering based on visibility
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)

        // Stop/start the Spline runtime when visibility changes
        if (splineRef.current) {
          if (entry.isIntersecting) {
            splineRef.current.play()
          } else {
            splineRef.current.stop()
          }
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const handleLoad = useCallback((spline: Application) => {
    splineRef.current = spline
    setHasError(false)

    // If not visible on load, stop immediately
    if (!isVisible) {
      spline.stop()
    }
  }, [isVisible])

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
        <div className="text-center">
          <div className="mb-2">3D Animation Unavailable</div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
      style={{ willChange: 'transform', contain: 'layout paint' }}
    >
      <Spline
        scene="https://prod.spline.design/TMNN6wJ0bfvnVGnB/scene.splinecode"
        className="w-full h-full"
        onLoad={handleLoad}
        renderOnDemand
      />
    </div>
  )
}

