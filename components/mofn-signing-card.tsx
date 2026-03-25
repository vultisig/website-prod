"use client"

import Lottie from "lottie-react"
import { useLottieOnView } from "@/hooks/use-lottie-on-view"
import animationData from "@/public/animations/m-of-n-signing.json"

export default function MofNSigningCard() {
  const { lottieRef, containerRef, onMouseEnter, onMouseLeave } = useLottieOnView()

  return (
    <div ref={containerRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="border border-borderLight rounded-3xl overflow-hidden flex flex-col items-start justify-end min-h-[400px] lg:h-[423px] relative">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={false}
        loop={false}
        className="absolute inset-0 w-full h-full [&_svg]:w-full [&_svg]:h-full [&_svg]:object-cover"
        style={{ objectFit: "cover" }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
      />
      <div className="flex flex-col gap-[18px] p-[30px] relative z-10">
        <h3 className="text-[22px] font-medium text-textPrimary leading-[24px] tracking-tight">
          M-of-N signing.
        </h3>
        <p className="text-sm text-textSecondary leading-relaxed tracking-tight">
          Every transaction requires your threshold of devices. No single device
          can act alone.
        </p>
      </div>
    </div>
  )
}
