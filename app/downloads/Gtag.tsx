"use client"

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export const channels = {
  "ios-appstore": {
    href: "https://apps.apple.com/app/apple-store/id6503023896?pt=126546604&ct=website-download&mt=8",
    platform: "ios app store",
    icon: "/images/apple.svg",
    iconAlt: "App Store",
    iconClass: "h-7 w-auto",
    label: "App Store",
    labelClass: "text-xs",
  },
  "macos-appstore": {
    href: "https://apps.apple.com/app/apple-store/id6503023896?pt=126546604&ct=website-download&mt=8",
    platform: "macos app store",
    icon: "/images/macOS.svg",
    iconAlt: "MacOS",
    iconClass: "h-8 w-auto",
    label: "MacOS",
    labelClass: "text-xs",
  },
  "macos-github": {
    href: "https://github.com/vultisig/vultisig-ios/releases/tag/v1.43.69",
    platform: "macos github",
    icon: "/images/macOS.svg",
    iconAlt: "MacOS Github",
    iconClass: "h-8 w-auto",
    label: "MacOS from Github",
    labelClass: "text-[11px] leading-tight",
  },
  "android-playstore": {
    href: "https://play.google.com/store/apps/details?id=com.vultisig.wallet",
    platform: "android play store",
    icon: "/images/googleplay-icon.svg",
    iconAlt: "Google Play",
    iconClass: "h-7 w-auto",
    label: "Google Play",
    labelClass: "text-xs",
  },
  windows: {
    href: "https://github.com/vultisig/vultisig-windows/releases/download/v1.0.69/Vultisig-amd64-installer-v1.0.69.exe",
    platform: "windows",
    icon: "/images/windows.svg",
    iconAlt: "Windows",
    iconClass: "h-8 w-auto",
    label: "Windows",
    labelClass: "text-xs",
  },
  linux: {
    href: "https://github.com/vultisig/vultisig-windows/releases/download/v1.0.69/vultisig_1.0.69_amd64.deb",
    platform: "linux",
    icon: "/images/linux.svg",
    iconAlt: "Linux",
    iconClass: "h-7 w-auto",
    label: "Linux",
    labelClass: "text-xs",
  },
  "android-github": {
    href: "https://github.com/vultisig/vultisig-android/releases/tag/v1.0.116",
    platform: "android github",
    icon: "/images/Android.svg",
    iconAlt: "Android",
    iconClass: "h-6 w-auto",
    label: "Android",
    labelClass: "text-xs",
  },
  chrome: {
    href: "https://chromewebstore.google.com/detail/vulticonnect/ggafhcdaplkhmmnlbfjpnnkepdfjaelb?authuser=0&hl=en-GB&pli=1",
    platform: "chrome extension",
    icon: "/images/chrome.png",
    iconAlt: "Chrome",
    iconClass: "h-8 w-auto",
    label: "Chrome",
    labelClass: "text-xs",
  },
  // web: {
  //   href: "https://airdrop.vultisig.com/",
  //   platform: null,
  //   icon: "/images/vultiweb-logo.svg",
  //   iconAlt: "Web App",
  //   iconClass: "h-10 w-auto",
  //   label: "Web App",
  //   labelClass: "text-xs",
  // },
} as const

export type ChannelKey = keyof typeof channels

export default function Gtag({ channelKey }: { channelKey: ChannelKey }) {
  const channel = channels[channelKey]

  const trackDownload = (platform: string) => {
    window.gtag?.("event", "download_click", {
      platform,
      item_id: "vultisig",
      item_name: "Vultisig",
      item_category: "download",
      transport_type: "beacon",
    })
  }

  return (
    <a
      href={channel.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => channel.platform && trackDownload(channel.platform)}
      className="bg-background border-[1.5px] border-borderNormal rounded-xl sm:rounded-3xl py-3 sm:px-4 flex flex-col items-center justify-between hover:border-blue-500 hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)] transition-all max-sm:size-[72px] size-[99px]"
    >
      <div className="h-10 flex justify-center items-center">
        <img
          src={channel.icon}
          alt={channel.iconAlt}
          className={channel.iconClass}
        />
      </div>
      <span
        className={`max-sm:text-[8px] font-medium text-center ${channel.labelClass}`}
      >
        {channel.label}
      </span>
    </a>
  )
}
