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
  firefox: {
    href: "https://addons.mozilla.org/en-US/firefox/addon/vultisig-extension/",
    platform: "firefox extension",
    icon: "/v5/download-firefox.webp",
    iconWidth: 54,
    label: "Firefox extension",
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
 * Icon travel and name fade share one clock, both ways, measured off the
 * reference recording: 375ms on the CSS `ease-out` curve. Hovering in and out
 * reached 37%/73%/90% and 37%/69%/90% of the way at a quarter/half/three
 * quarters, against the curve's 38/68/91. Note this is not Tailwind's
 * `ease-out`, a snappier cubic-bezier(0,0,.2,1).
 *
 * `duration-[375ms] ease-[...]` cannot be used: tailwindcss-animate and
 * tailwindcss-motion both redefine `duration-*` and `ease-*` and shadow core's
 * arbitrary values, so these go through arbitrary properties.
 */
const MOTION =
  "[transition-duration:375ms] [transition-timing-function:ease-out] motion-reduce:transition-none"

/**
 * At rest the icon carries half of what the name costs below it — the name's
 * 42px line box plus the 22px gap — which leaves it dead-centre in the card.
 * Hover hands that space back, so the icon rises by exactly the 32px the
 * reference travels.
 */
const ICON_TRAVEL =
  "md:[@media(hover:hover)]:translate-y-8 md:[@media(hover:hover)]:group-hover:translate-y-0 md:[@media(hover:hover)]:group-focus-visible:translate-y-0"

/** The name holds its place throughout and only fades, as in the reference. */
const NAME_FADE =
  "md:[@media(hover:hover)]:opacity-0 md:[@media(hover:hover)]:group-hover:opacity-100 md:[@media(hover:hover)]:group-focus-visible:opacity-100"

/**
 * The card rests as a bare centred icon; hovering slides the icon up to make
 * room for the channel name, which fades in below it. Touch has no hover, so it
 * shows both from the start.
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
        className={cn(
          "h-[54px] w-auto transition-transform",
          MOTION,
          ICON_TRAVEL,
        )}
      />
      <span
        className={cn(
          "whitespace-nowrap text-v5-download-label-sm font-semibold text-v5-text-inverse transition-opacity md:text-v5-download-label",
          MOTION,
          NAME_FADE,
        )}
      >
        {channel.label}
      </span>
    </a>
  )
}
