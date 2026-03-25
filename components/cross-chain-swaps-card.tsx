"use client"

import Lottie from "lottie-react"
import { useLottieOnView } from "@/hooks/use-lottie-on-view"
import animationData from "@/public/animations/cross-chain-swaps.json"

export default function CrossChainSwapsCard() {
  const { lottieRef, containerRef, onMouseEnter, onMouseLeave } = useLottieOnView()

  return (
    <div ref={containerRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="border border-borderLight rounded-3xl overflow-hidden flex flex-col items-start justify-end min-h-[260px] lg:h-[277px] relative">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={false}
        loop={false}
        className="absolute inset-0 w-full h-full [&_svg]:w-full [&_svg]:h-full [&_svg]:object-cover"
        style={{ objectFit: "cover" }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
      />
      <h3 className="text-[22px] font-medium text-textPrimary leading-[24px] tracking-tight p-[30px] relative z-10">
        Cross-chain swaps
      </h3>
    </div>
  )
}
