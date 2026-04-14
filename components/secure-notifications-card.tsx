import LazyLottie from "@/components/lazy-lottie"

export default function SecureNotificationsCard() {
  return (
    <div className="border border-borderLight rounded-3xl overflow-hidden flex flex-col gap-[18px] items-start justify-end min-h-[260px] lg:h-[277px] relative">
      <LazyLottie animation="secure-notifications" />
      <h3 className="text-[22px] font-medium text-textPrimary leading-[24px] tracking-tight relative z-10 p-[30px]">
        Secure notifications
      </h3>
    </div>
  )
}
