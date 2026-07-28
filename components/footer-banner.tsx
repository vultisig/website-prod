import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { FaApple } from "react-icons/fa6"

const APP_STORE_URL = "https://apps.apple.com/app/apple-store/id6503023896"
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.vultisig.wallet"

type Platform = {
  label: string
  href: string
  icon: ReactNode
}

const PLATFORMS: Platform[] = [
  {
    label: "App Store",
    href: APP_STORE_URL,
    icon: <FaApple className="size-5 text-v5-surface-dark" aria-hidden />,
  },
  {
    label: "MacOS",
    href: "/downloads",
    icon: <Image src="/images/macOS.svg" alt="" width={21} height={21} />,
  },
  {
    label: "Google Play",
    href: PLAY_STORE_URL,
    icon: (
      <Image src="/images/googleplay-icon.svg" alt="" width={17} height={19} />
    ),
  },
  {
    label: "Windows",
    href: "/downloads",
    icon: (
      <Image src="/images/windows-icon.svg" alt="" width={22} height={22} />
    ),
  },
  {
    label: "Linux",
    href: "/downloads",
    icon: <Image src="/images/linux.svg" alt="" width={18} height={18} />,
  },
  {
    label: "Android",
    href: "/downloads",
    icon: (
      <Image src="/images/android-icon.svg" alt="" width={16} height={17} />
    ),
  },
]

function PlatformTile({ label, href, icon }: Platform) {
  const isExternal = href.startsWith("http")

  return (
    <Link
      href={href}
      title={`Download Vultisig for ${label}`}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      className="flex size-[72px] flex-col items-center justify-between rounded-2xl border border-v5-text-secondary bg-v5-page px-0.5 py-3 md:size-[63px] md:rounded-[15px]"
    >
      {icon}
      <span className="text-v5-caption-sm font-medium text-v5-surface-dark md:text-v5-tile-label">
        {label}
      </span>
    </Link>
  )
}

export default function FooterBanner() {
  return (
    <section className="bg-v5-page px-4 pt-4 md:px-[30px] md:pt-[30px]">
      <div className="relative mx-auto flex max-w-v5-content flex-col overflow-hidden rounded-v5-panel bg-v5-accent md:block md:h-[391px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-v5-dots bg-v5-dots-tile opacity-40"
        />
        {/* Rendered before the copy so the copy stays on top of it on desktop */}
        <Image
          src="/v5/footer-banner-vault.webp"
          alt=""
          width={1600}
          height={777}
          sizes="(max-width: 768px) 100vw, 1161px"
          className="order-2 w-full md:absolute md:left-[33.6%] md:top-[-22%] md:order-none md:w-[84.1%]"
        />
        <div className="relative order-1 flex flex-col items-center gap-[18px] px-6 pt-10 text-center md:absolute md:left-[49px] md:top-1/2 md:order-none md:w-[560px] md:-translate-y-1/2 md:items-start md:px-0 md:pt-0 md:text-left">
          <h2 className="text-v5-headline font-semibold text-v5-text-primary md:w-[650px] md:text-v5-display-lg">
            The Only Wallet You&apos;ll Ever Need.
          </h2>
          <p className="text-v5-body-m font-normal text-v5-text-primary md:w-[414px]">
            No seed phrase. No subscription. No custodian. Just your crypto,
            secured by math - not trust.
          </p>
          <div className="grid grid-cols-3 gap-3 md:flex md:gap-[12.7px]">
            {PLATFORMS.map((platform) => (
              <PlatformTile key={platform.label} {...platform} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
