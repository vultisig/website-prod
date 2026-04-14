import LazyLottie from "@/components/lazy-lottie"

export default function MaxSecurityCard() {
  return (
    <div className="border border-borderLight rounded-3xl overflow-hidden flex flex-col items-start justify-end min-h-[400px] lg:h-[423px] relative">
      <LazyLottie animation="maximum-security" />
      <div className="flex flex-col gap-[18px] p-[30px] relative z-10">
        <h3 className="text-[22px] font-medium text-textPrimary leading-[24px] tracking-tight">
          Maximum security
        </h3>
        <p className="text-sm text-textSecondary leading-relaxed tracking-tight">
          Your vault shares can be stored anywhere without risk. No single piece
          can compromise your funds.
        </p>
      </div>
    </div>
  )
}
