import type { Metadata, Viewport } from "next"
import { supportedChainCountLabel } from "@/content/chain-count"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import GoogleAnalyticsWrapper from "@/components/ga-wrapper"
import CookieAnalytics from "@/components/cookie-analytics"
import { Toaster } from "@/components/ui/sonner"
import localFont from "next/font/local"
import { cn } from "@/lib/utils"
import ScrollReveal from "@/components/scroll-reveal"
import TwitterAnalytics from "@/components/twitter-analytics"
import Script from "next/script"
import { ORGANIZATION_ID, SHARE_IMAGE, SITE_URL } from "@/lib/site"

const brockmann = localFont({
  style: "normal",
  variable: "--font-brockmann",
  src: "../public/fonts/brockmann-font-1751459394-0/brockmann-medium-webfont.woff2",
  fallback: ["sans-serif"],
  display: "swap",
})

/** Mirrors `v5.page` in tailwind.config.ts; the browser chrome tints to the page surface. */
const V5_PAGE_BACKGROUND = "#f0f4fc"

const SITE_TITLE = "Vultisig: Free MPC Wallet - Secure Multi-Chain Crypto Vault"
const SITE_DESCRIPTION = `The self-custody MPC wallet for Bitcoin, Ethereum, Solana & ${supportedChainCountLabel} chains. Seedless via DKLS23. Free, open-source. TypeScript SDK for AI agents.`

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  authors: [{ name: "Vultisig", url: SITE_URL }],
  creator: "Vultisig",
  publisher: "Vulti Holdings Limited",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Cryptocurrency & Blockchain",
  classification: "Financial Technology",
  referrer: "origin-when-cross-origin",
  openGraph: {
    siteName: "Vultisig",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_US",
    images: [SHARE_IMAGE],
  },
  // Title, description and image fill in from each page's openGraph.
  twitter: {
    site: "@vultisig",
    creator: "@vultisig",
    card: "summary_large_image",
  },
  other: {
    "application-name": "Vultisig",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Vultisig",
    "mobile-web-app-capable": "yes",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/icon.svg", color: "#000000" },
      { rel: "llms-txt", url: `${SITE_URL}/llms.txt`, type: "text/plain" },
      {
        rel: "service-desc",
        url: `${SITE_URL}/openapi.json`,
        type: "application/openapi+json",
      },
    ],
  },
  manifest: "/site.webmanifest",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: V5_PAGE_BACKGROUND,
}

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Vultisig",
  legalName: "Vulti Holdings Limited",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description:
    "Vultisig is a seedless, multi-chain MPC wallet built for secure self-custody. Founded by the creators of THORChain.",
  foundingDate: "2024",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Intershore Chambers",
    addressLocality: "Road Town",
    addressRegion: "Tortola",
    addressCountry: "VG",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "support@vultisig.com",
      availableLanguage: "English",
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "contact@vultisig.com",
      availableLanguage: "English",
    },
  ],
  sameAs: [
    "https://x.com/vultisig",
    "https://twitter.com/vultisig",
    "https://discord.gg/thq64eaYVN",
    "https://github.com/vultisig",
    "https://t.me/vultisig",
    "https://www.youtube.com/@Vultisig",
    "https://apps.apple.com/app/apple-store/id6503023896",
    "https://play.google.com/store/apps/details?id=com.vultisig.wallet",
    "https://chromewebstore.google.com/detail/vulticonnect/ggafhcdaplkhmmnlbfjpnnkepdfjaelb",
    "https://addons.mozilla.org/en-US/firefox/addon/vultisig-extension/",
    "https://www.npmjs.com/package/@vultisig/sdk",
  ],
}

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Vultisig",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en-US",
}

const SOFTWARE_APPLICATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#app`,
  name: "Vultisig",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  applicationCategory: "FinanceApplication",
  applicationSubCategory: "Cryptocurrency Wallet",
  operatingSystem: "Android, iOS, Windows, macOS, Linux, Web",
  keywords:
    "MPC wallet, MPC wallet for AI agents, self-custody wallet for AI agents, threshold signature wallet, TSS wallet, DKLS23, seedless crypto wallet, multi-chain wallet, THORChain wallet, Cosmos wallet, Bitcoin wallet, Ethereum wallet, Solana wallet, multi-party computation, non-custodial MPC wallet, open-source crypto wallet, agentic wallet alternative, Fordefi alternative, multisig wallet",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  author: { "@id": ORGANIZATION_ID },
  publisher: { "@id": ORGANIZATION_ID },
  featureList: [
    "MPC (Multi-Party Computation) security via DKLS23 Threshold Signature Scheme",
    "Seedless — no 12 or 24 word recovery phrase to store",
    `${supportedChainCountLabel} blockchains including Bitcoin, Ethereum, Solana, THORChain, Cosmos, TON, Cardano, Tron, XRP`,
    "Fast Vault (2-of-2 server-assisted) for instant signing",
    "Secure Vault (m-of-n, multi-device) for human co-signing",
    "TypeScript SDK on npm (@vultisig/sdk) for programmatic and AI-agent integration",
    "Cross-chain swaps via THORChain, MayaChain, 1inch, LiFi, KyberSwap",
    "Plugin Marketplace for self-custodial automation (DCA, recurring payments, trading)",
    "Open-source on GitHub — audited TSS/MPC implementation co-developed with Silence Laboratories",
    "iOS, Android, Windows, macOS, Linux, and Chrome browser extension",
  ],
  downloadUrl: `${SITE_URL}/downloads`,
  installUrl: `${SITE_URL}/downloads`,
  screenshot: SHARE_IMAGE.url,
  releaseNotes: "https://github.com/vultisig/vultisig-ios/releases",
}

const JSON_LD_SCHEMAS = [
  ORGANIZATION_JSON_LD,
  WEBSITE_JSON_LD,
  SOFTWARE_APPLICATION_JSON_LD,
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body
        className={cn(
          brockmann.className,
          brockmann.variable,
          "antialiased bg-v5-page text-v5-text-inverse",
        )}
      >
        <GoogleAnalyticsWrapper />
        <CookieAnalytics />
        <TwitterAnalytics />
        {JSON_LD_SCHEMAS.map((schema) => (
          <script
            key={schema["@id"]}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <Navbar />
        {children}
        <Footer />
        <Toaster />
        <ScrollReveal />
      </body>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </html>
  )
}
