"use client"

import { useRef, useEffect } from "react"
import Lottie, { type LottieRefCurrentProps } from "lottie-react"
import animationData from "@/public/animations/hold-vult.json"

export default function HoldVultCard() {
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
        className="absolute inset-0 w-full h-full [&_svg]:w-full [&_svg]:h-full [&_svg]:object-cover"
        style={{ objectFit: "cover" }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
      />
      <div className="flex flex-col gap-[18px] p-[30px] relative z-10">
        <h3 className="text-[22px] font-medium text-textPrimary leading-[24px] tracking-tight">
          Hold $VULT.
          <br />
          Trade for free.
        </h3>
        <p className="text-sm text-textSecondary leading-relaxed tracking-tight">
          Reduce swap fees from 50bps down to 0.
          <br />
          Six tiers - starting at 1,500 $VULT.
        </p>
      </div>
    </div>
  )
}
