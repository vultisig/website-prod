import LazyLottie from "@/components/lazy-lottie"

export default function MofNSigningCard() {
  return (
    <div className="border border-borderLight rounded-3xl overflow-hidden flex flex-col items-start justify-end min-h-[400px] lg:h-[423px] relative">
      <LazyLottie animation="m-of-n-signing" />
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
