import LazyLottie from "@/components/lazy-lottie"

export default function CrossChainSwapsCard() {
  return (
    <div className="border border-borderLight rounded-3xl overflow-hidden flex flex-col items-start justify-end min-h-[260px] lg:h-[277px] relative">
      <LazyLottie animation="cross-chain-swaps" />
      <h3 className="text-[22px] font-medium text-textPrimary leading-[24px] tracking-tight p-[30px] relative z-10">
        Cross-chain swaps
      </h3>
    </div>
  )
}
