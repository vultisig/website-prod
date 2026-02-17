import React from "react"
import Heading from "./Heading"
import Image from "next/image"
import vultisigGradientPng from "../images/blockchains-bg.png"
import RadialBackground from "./RadialBackground"

export default function Blockchains() {
  const chains = [
    { label: "BNB Chain", color: "#F3BA2F" },
    { label: "Polkadot", color: "#E6007A" },
    { label: "Cardano", color: "#0033AD" },
    { label: "Bitcoin", color: "#f7931a" },
    { label: "Ethereum", color: "#627EEA" },
    { label: "Solana", color: "#14F195" },
    { label: "THORChain", color: "#0CF" },
    { label: "Cosmos", color: "#6F7390" },
    { label: "Polygon", color: "#8247E5" },
    { label: "Avalanche", color: "#E84142" },
    { label: "Arbitrum", color: "#28A0F0" },
    { label: "Optimism", color: "#FF0420" },
  ]

  const radius = "clamp(175px, 34vw, 265px)"

  return (
    <section className="px-6 md:px-20 py-20 max-w-4xl mx-auto flex flex-col items-center gap-[70px] relative">
      <RadialBackground />

      <Heading withMargin={false}>
        One Vault. <span className="text-primaryAccent">30+ Blockchains.</span>
      </Heading>
      <div className="p-20 sm:my-16 w-full intersect-once intersect:motion-preset-expand motion-duration-1000">
        <Image
          src={vultisigGradientPng}
          alt="Vultisig"
          className="w-full sm:w-3/4 aspect-square absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain object-center pointer-events-none select-none"
        />
        <div className="relative mx-auto aspect-square w-full max-w-[520px] md:h-[240px]">
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "40s" }}
          >
            {chains.map((chain, idx) => {
              const angle = (360 / chains.length) * idx
              return (
                <div
                  key={idx}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}) rotate(-${angle}deg)`,
                  }}
                >
                  <div
                    className="animate-spin"
                    style={{
                      animationDuration: "40s",
                      animationDirection: "reverse",
                    }}
                  >
                    <div className="flex gap-2 h-9 px-2 sm:px-4 items-center border border-borderLight bg-backgroundSecondary/70 backdrop-blur-sm rounded-lg border-solid">
                      <div
                        className="size-2 rounded-full"
                        style={{ backgroundColor: chain.color }}
                      />
                      <span className="text-textPrimary font-medium text-xs">
                        {chain.label}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <p className="text-center text-textSecondary text-lg intersect-once intersect:motion-preset-slide-up">
        Multi-chain support built-in. No additional setup needed.
      </p>
    </section>
  )
}
