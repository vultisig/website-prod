"use client"

import { useEffect, useRef, useState, useCallback, type ComponentType } from "react"

interface Props {
  scene: string
  onLoad?: () => void
}

export default function SplineOffscreen({ scene, onLoad }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const workerRef = useRef<Worker | null>(null)
  const [fallback, setFallback] = useState(false)
  const [FallbackComp, setFallbackComp] = useState<ComponentType | null>(null)
  const onLoadRef = useRef(onLoad)
  onLoadRef.current = onLoad

  // Worker approach
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || fallback) return

    if (typeof canvas.transferControlToOffscreen !== "function") {
      setFallback(true)
      return
    }

    try {
      const offscreen = canvas.transferControlToOffscreen()
      const worker = new Worker(
        new URL("../workers/spline.worker.ts", import.meta.url)
      )
      workerRef.current = worker

      worker.onmessage = (e) => {
        if (e.data.type === "loaded") {
          onLoadRef.current?.()
        }
        if (e.data.type === "error") {
          console.warn("Spline worker failed, falling back:", e.data.message)
          worker.terminate()
          workerRef.current = null
          setFallback(true)
        }
      }

      worker.onerror = () => {
        worker.terminate()
        workerRef.current = null
        setFallback(true)
      }

      const rect = canvas.getBoundingClientRect()
      worker.postMessage(
        {
          type: "init",
          canvas: offscreen,
          scene,
          width: rect.width,
          height: rect.height,
          dpr: window.devicePixelRatio || 1,
        },
        [offscreen]
      )

      return () => {
        worker.postMessage({ type: "dispose" })
        worker.terminate()
        workerRef.current = null
      }
    } catch {
      setFallback(true)
    }
  }, [scene, fallback])

  // Fallback: load Spline on main thread
  useEffect(() => {
    if (!fallback) return
    import("@/components/spline-wrapper").then((mod) => {
      setFallbackComp(() => mod.default)
      onLoadRef.current?.()
    })
  }, [fallback])

  // Pause/resume via IntersectionObserver (worker path only)
  useEffect(() => {
    const container = containerRef.current
    if (!container || fallback) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        workerRef.current?.postMessage({
          type: entry.isIntersecting ? "play" : "stop",
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [fallback])

  if (fallback && FallbackComp) {
    return <FallbackComp />
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
      style={{ contain: "layout paint" }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: fallback ? "none" : "block" }}
      />
    </div>
  )
}
