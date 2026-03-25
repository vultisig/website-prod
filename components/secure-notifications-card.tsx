"use client"

import Lottie from "lottie-react"
import { useLottieOnView } from "@/hooks/use-lottie-on-view"
import animationData from "@/public/animations/secure-notifications.json"

export default function SecureNotificationsCard() {
  const { lottieRef, containerRef } = useLottieOnView()

  return (
    <div ref={containerRef} className="border border-borderLight rounded-3xl overflow-hidden flex flex-col gap-[18px] items-start justify-end min-h-[260px] lg:h-[277px] relative">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={false}
        loop
        className="absolute inset-0 w-full h-full [&_svg]:w-full [&_svg]:h-full [&_svg]:object-cover"
        style={{ objectFit: "cover" }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
      />
      <h3 className="text-[22px] font-medium text-textPrimary leading-[24px] tracking-tight relative z-10 p-[30px]">
        Secure notifications
      </h3>
    </div>
  )
}
