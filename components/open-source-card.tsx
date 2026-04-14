import LazyLottie from "@/components/lazy-lottie"

export default function OpenSourceCard() {
  return (
    <div className="border border-borderLight rounded-3xl overflow-hidden flex flex-col items-start justify-end min-h-[260px] lg:h-[277px] relative">
      <LazyLottie animation="open-source" />
      <div className="flex flex-col gap-[18px] p-[30px] relative z-10">
        <h3 className="text-[22px] font-medium text-textPrimary leading-[24px] tracking-tight">
          100% open source.
        </h3>
      </div>
    </div>
  )
}
