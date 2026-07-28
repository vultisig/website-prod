"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"

/**
 * Download URLs live here and nowhere else — release bumps edit `href` (and the
 * matching `hashes` entry in ./page.tsx). `macos-appstore` shares the iOS App
 * Store listing, so the V5 layout links macOS to the GitHub build instead.
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
    href: "https://github.com/vultisig/vultisig-ios/releases/tag/v1.41.65",
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
    href: "https://github.com/vultisig/vultisig-windows/releases/download/v1.0.68/Vultisig-amd64-installer-v1.0.68.exe",
    platform: "windows",
    icon: "/v5/download-windows.svg",
    iconWidth: 54,
    label: "Windows",
  },
  linux: {
    href: "https://github.com/vultisig/vultisig-windows/releases/download/v1.0.68/vultisig_1.0.68_amd64.deb",
    platform: "linux",
    icon: "/v5/download-linux.webp",
    iconWidth: 54,
    label: "Linux",
  },
  "android-github": {
    href: "https://github.com/vultisig/vultisig-android/releases/tag/v1.0.114",
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

/**
 * Figma shows the label only on hover at 1440px, but always on mobile where
 * there is no hover — so it stays in the DOM and the link keeps a name in
 * every state.
 */
export default function DownloadCard({
  channelKey,
  className,
}: {
  channelKey: ChannelKey
  className?: string
}) {
  const channel = channels[channelKey]

  return (
    <a
      href={channel.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Download Vultisig for ${channel.label}`}
      onClick={() => trackDownload(channel.platform)}
      className={cn(
        "group flex h-[203.5px] flex-col items-center justify-center gap-[22px] rounded-3xl bg-v5-white p-[30px]",
        className,
      )}
    >
      <Image
        src={channel.icon}
        alt=""
        width={channel.iconWidth}
        height={54}
        className="h-[54px] w-auto"
      />
      <span className="whitespace-nowrap text-v5-download-label-sm font-semibold text-v5-text-inverse md:hidden md:text-v5-download-label md:group-hover:block">
        {channel.label}
      </span>
    </a>
  )
}
