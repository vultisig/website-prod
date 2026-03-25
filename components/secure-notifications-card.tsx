"use client"

import { useRef, useEffect } from "react"
import Lottie, { type LottieRefCurrentProps } from "lottie-react"
import animationData from "@/public/animations/secure-notifications.json"

export default function SecureNotificationsCard() {
  const lottieRef = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    lottieRef.current?.setSpeed(0.5)
  }, [])

  return (
    <div className="border border-borderLight rounded-3xl overflow-hidden flex flex-col gap-[18px] items-start justify-end min-h-[260px] lg:h-[277px] relative">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        className="absolute inset-0 w-full h-full"
      />
      <h3 className="text-[22px] font-medium text-textPrimary leading-[24px] tracking-tight relative z-10 p-[30px]">
        Secure notifications
      </h3>
    </div>
  )
}
