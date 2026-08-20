"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"

/**
 * Release bumps edit `href` here and the matching `hashes` entry in ./page.tsx.
 * Store-listing URLs also appear in components/footer-banner.tsx and the
 * SoftwareApplication schema in app/layout.tsx — keep them in sync.
 * `macos-appstore` shares the iOS App Store listing, so the V5 layout links
 * macOS to the GitHub build instead.
 */
export const channels = {
  "ios-appstore": {
    href: "https://apps.apple.com/app/apple-store/id6503023896?pt=126546604&ct=website-download&mt=8",
    platform: "ios app store",
    icon: "/v5/download-ios.webp",
    iconWidth: 54,
    label: "iOS",
  },
  "macos-appstore": {
    href: "https://apps.apple.com/app/apple-store/id6503023896?pt=126546604&ct=website-download&mt=8",
    platform: "macos app store",
    icon: "/v5/download-macos.webp",
    iconWidth: 54,
    label: "macOS",
  },
  "macos-github": {
    href: "https://github.com/vultisig/vultisig-ios/releases/tag/v1.44.70",
    platform: "macos github",
    icon: "/v5/download-macos.webp",
    iconWidth: 54,
    label: "macOS",
  },
  "android-playstore": {
    href: "https://play.google.com/store/apps/details?id=com.vultisig.wallet",
    platform: "android play store",
    icon: "/v5/download-android.webp",
    iconWidth: 50,
    label: "Android",
  },
  windows: {
    href: "https://github.com/vultisig/vultisig-windows/releases/download/v1.0.70/Vultisig-amd64-installer-v1.0.70.exe",
    platform: "windows",
    icon: "/v5/download-windows.svg",
    iconWidth: 54,
    label: "Windows",
  },
  linux: {
    href: "https://github.com/vultisig/vultisig-windows/releases/download/v1.0.70/vultisig_1.0.70_amd64.deb",
    platform: "linux",
    icon: "/v5/download-linux.webp",
    iconWidth: 54,
    label: "Linux",
  },
  "android-github": {
    href: "https://github.com/vultisig/vultisig-android/releases/tag/v1.0.116",
    platform: "android github",
    icon: "/v5/download-android-apk.svg",
    iconWidth: 45,
    label: "Android APK",
  },
  chrome: {
    href: "https://chromewebstore.google.com/detail/vulticonnect/ggafhcdaplkhmmnlbfjpnnkepdfjaelb?authuser=0&hl=en-GB&pli=1",
    platform: "chrome extension",
    icon: "/v5/download-chrome.webp",
    iconWidth: 54,
    label: "Chrome extension",
  },
} as const

export type ChannelKey = keyof typeof channels

function trackDownload(platform: string) {
  window.gtag?.("event", "download_click", {
    platform,
    item_id: "vultisig",
    item_name: "Vultisig",
    item_category: "download",
    transport_type: "beacon",
  })
}

const FACE_CLASS =
  "absolute inset-0 flex flex-col items-center justify-center gap-[22px] rounded-3xl bg-v5-white p-[30px] md:[backface-visibility:hidden]"

/**
 * At 1440px the card flips on hover — icon-only front, icon + name back.
 * Mobile has no hover, so it renders the back face alone, unrotated.
 */
export default function DownloadCard({
  channelKey,
  className,
}: {
  channelKey: ChannelKey
  className?: string
}) {
  const channel = channels[channelKey]

  const icon = (
    <Image
      src={channel.icon}
      alt=""
      width={channel.iconWidth}
      height={54}
      className="h-[54px] w-auto"
    />
  )

  return (
    <a
      href={channel.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Download Vultisig for ${channel.label}`}
      onClick={() => trackDownload(channel.platform)}
      className={cn(
        "group relative block h-[203.5px] rounded-3xl [perspective:1000px]",
        className,
      )}
    >
      <span className="absolute inset-0 block md:transition-transform md:duration-500 md:[transform-style:preserve-3d] md:group-hover:[transform:rotateY(180deg)] md:group-focus-visible:[transform:rotateY(180deg)] md:motion-reduce:transition-none">
        <span className={cn(FACE_CLASS, "hidden md:flex")}>{icon}</span>
        <span className={cn(FACE_CLASS, "md:[transform:rotateY(180deg)]")}>
          {icon}
          <span className="whitespace-nowrap text-v5-download-label-sm font-semibold text-v5-text-inverse md:text-v5-download-label">
            {channel.label}
          </span>
        </span>
      </span>
    </a>
  )
}
