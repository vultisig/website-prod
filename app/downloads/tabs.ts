import type { ChannelKey } from "./Gtag"

export type TabKey = "mobile" | "browser"

export const TABS = [
  { key: "mobile", label: "Mobile App", href: "/downloads?tab=mobile" },
  {
    key: "browser",
    label: "Browser Extension",
    href: "/downloads?tab=browser",
  },
] as const satisfies readonly { key: TabKey; label: string; href: string }[]

/** `app` / `extension` are accepted so external links can read naturally. */
const TAB_ALIASES: Record<string, TabKey> = {
  mobile: "mobile",
  app: "mobile",
  browser: "browser",
  extension: "browser",
}

export function resolveTab(value: string | string[] | undefined): TabKey {
  const key = Array.isArray(value) ? value[0] : value
  return (key && TAB_ALIASES[key.toLowerCase()]) || "mobile"
}

export const TAB_CONTENT = {
  mobile: {
    title: "Download Vultisig App",
    description:
      "The Flagship app of Vultisig. Your seedless multi-chain, multi-factor wallet. Use Vault Shares instead of Seed Phrases.",
    channels: [
      "ios-appstore",
      "android-playstore",
      "android-github",
      "macos-github",
      "windows",
      "linux",
    ],
    cardGrid: "grid-cols-2 md:grid-cols-3",
    cardClass: "",
    mockup: {
      src: "/v5/download-app-mockup.webp",
      alt: "The Vultisig app on an iPhone, showing a Main Vault balance of $53,010.77 with swap, send, buy and receive actions above the portfolio list",
    },
  },
  browser: {
    title: "Download Extension",
    description:
      "Your gateway to web3 and DeFi. Connect your Vultisig to your favourite Interface without moving your funds.",
    channels: ["chrome", "firefox"],
    cardGrid: "grid-cols-2",
    cardClass: "h-[178px]",
    mockup: {
      src: "/v5/download-extension-mockup.webp",
      alt: "The Vultisig browser extension open in Chrome, showing the Main Vault balance and the swap, send, buy and receive actions",
    },
  },
} as const satisfies Record<
  TabKey,
  {
    title: string
    description: string
    channels: readonly ChannelKey[]
    cardGrid: string
    cardClass: string
    mockup: { src: string; alt: string }
  }
>
