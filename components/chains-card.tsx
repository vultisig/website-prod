"use client"

import { useRef, useEffect } from "react"
import Lottie, { type LottieRefCurrentProps } from "lottie-react"
import animationData from "@/public/animations/30-chains.json"

export default function ChainsCard() {
  const lottieRef = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    lottieRef.current?.setSpeed(0.5)
  }, [])

  return (
    <div className="border border-borderLight rounded-3xl overflow-hidden flex flex-col items-start justify-end min-h-[400px] lg:h-[423px] relative">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        className="absolute inset-0 w-full h-full"
      />
      <div className="flex flex-col gap-[18px] p-[30px] relative z-10">
        <h3 className="text-[22px] font-medium text-textPrimary leading-[24px] tracking-tight">
          30+ chains.
          <br />
          One vault.
        </h3>
        <p className="text-sm text-textSecondary leading-relaxed tracking-tight">
          Bitcoin to Solana to Cosmos - every major chain, natively supported.
          No bridging needed.
        </p>
      </div>
    </div>
  )
}
