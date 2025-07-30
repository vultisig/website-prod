"use client"
import Spline from "@splinetool/react-spline"
import { useState, useEffect, useRef } from "react"

export default function SplineWrapper() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  useEffect(() => {
    // console.log("SplineWrapper mounted")
  })

  const handleLoad = () => {
    // console.log("Spline scene loaded successfully")
    setIsLoading(false)
    setHasError(false)
  }



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
    <div className="w-full h-full relative">
      {/* {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-white z-10">
          <div className="text-center">
            <div className="mb-2">Loading 3D Scene...</div>
          </div>
        </div>
      )} */}
      <Spline 
        scene={`https://prod.spline.design/O9LTDt2mjcjTQoF2/scene.splinecode?id=2`}
        className="w-full h-full"
        onLoad={handleLoad}
      />
    </div>
  )
}

