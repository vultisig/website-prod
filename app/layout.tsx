import type { Metadata } from "next"
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

const brockmann = localFont({
  style: "normal",
  variable: "--font-brockmann",
  src: "../public/fonts/brockmann-font-1751459394-0/brockmann-medium-webfont.woff2",
  fallback: ["sans-serif"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Vultisig: Free MPC Wallet - Secure Multi-Chain Crypto Vault",
  description:
    "The self-custody MPC wallet for Bitcoin, Ethereum, Solana & 36+ chains. Seedless via DKLS23. Free, open-source. TypeScript SDK for AI agents.",
  metadataBase: new URL("https://vultisig.com"),
  authors: [
    { name: "Vultisig" },
    { name: "Vultisig", url: "https://vultisig.com" },
    { name: "Vulti Holdings Limited" },
  ],
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
  alternates: {
    canonical: "https://vultisig.com",
    languages: {
      "en-US": "https://vultisig.com",
    },
  },
  category: "Cryptocurrency & Blockchain",
  classification: "Financial Technology",
  referrer: "origin-when-cross-origin",
  openGraph: {
    siteName: "Vultisig",
    title: "Vultisig: Free MPC Wallet - Secure Multi-Chain Crypto Vault",
    description:
      "The self-custody MPC wallet for Bitcoin, Ethereum, Solana & 36+ chains. Seedless via DKLS23. Free, open-source. TypeScript SDK for AI agents.",
    url: "https://vultisig.com",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://vultisig.com/thumbnails/home.png",
        width: 1200,
        height: 630,
        alt: "Vultisig - The Safest Crypto Wallet | Seedless Security Made Simple",
        type: "image/png",
      },
    ],
    countryName: "British Virgin Islands",
  },
  twitter: {
    site: "@vultisig",
    creator: "@vultisig",
    card: "summary_large_image",
    title: "Vultisig: Free MPC Wallet - Secure Multi-Chain Crypto Vault",
    description:
      "The self-custody MPC wallet for Bitcoin, Ethereum, Solana & 36+ chains. Seedless via DKLS23. Free, open-source. TypeScript SDK for AI agents.",
    images: [
      {
        url: "https://vultisig.com/thumbnails/home.png",
        alt: "Vultisig - The Safest Crypto Wallet | Seedless Security Made Simple",
      },
    ],
  },
  other: {
    "application-name": "Vultisig",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Vultisig",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileColor": "#000000",
    "msapplication-tap-highlight": "no",
    "theme-color": "#000000",
    "apple-mobile-web-app-orientations": "portrait",
    "msapplication-TileImage": "/logo.svg",
    "msapplication-square70x70logo": "/logo.svg",
    "msapplication-square150x150logo": "/logo.svg",
    "msapplication-wide310x150logo": "/logo.svg",
    "msapplication-square310x310logo": "/logo.svg",
    //"google-site-verification": "your-google-verification-code",
    //"msvalidate.01": "your-bing-verification-code",
    //"yandex-verification": "your-yandex-verification-code",
    //"norton-safeweb-site-verification": "your-norton-verification-code",
    //"facebook-domain-verification": "your-facebook-verification-code",
    //"p:domain_verify": "your-pinterest-verification-code",
    "twitter:site": "@vultisig",
    "twitter:creator": "@vultisig",
    "twitter:card": "summary_large_image",
    "og:site_name": "Vultisig",
    "og:type": "website",
    "og:locale": "en_US",
    "og:locale:alternate": "en_GB",
    "article:author": "Vultisig",
    "article:publisher": "https://vultisig.com",
    "article:section": "Cryptocurrency",
    "article:tag": "crypto wallet,multisig,TSS,blockchain,security",
    "profile:first_name": "Vultisig",
    "profile:last_name": "Crypto Wallet",
    "profile:username": "vultisig",
    "profile:gender": "neutral",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: [{ url: "/icon.svg", sizes: "180x180", type: "image/svg+xml" }],
    other: [
      {
        rel: "mask-icon",
        url: "/icon.svg",
        color: "#000000",
      },
      {
        rel: "llms-txt",
        url: "https://vultisig.com/llms.txt",
      },
    ],
  },
  manifest: "/site.webmanifest",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

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
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://vultisig.com/#organization",
              name: "Vultisig",
              legalName: "Vulti Holdings Limited",
              url: "https://vultisig.com",
              logo: {
                "@type": "ImageObject",
                url: "https://vultisig.com/vultisig-logo.svg",
                width: 512,
                height: 512,
              },
              description:
                "Vultisig is a seedless, multi-chain MPC wallet built for secure self-custody. Founded by the creators of THORChain.",
              foundingDate: "2024",
              founders: [
                {
                  "@type": "Person",
                  name: "THORChain Founders",
                },
              ],
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
                "https://www.npmjs.com/package/@vultisig/sdk",
                "https://en.wikipedia.org/wiki/Threshold_cryptosystem",
              ],
            }),
          }}
        />
        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://vultisig.com/#website",
              name: "Vultisig",
              url: "https://vultisig.com",
              description:
                "The leading MPC wallet with multi-signature security and TSS technology.",
              publisher: {
                "@id": "https://vultisig.com/#organization",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://docs.vultisig.com/search?ask={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
              inLanguage: "en-US",
            }),
          }}
        />
        {/* SoftwareApplication Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "@id": "https://vultisig.com/#app",
              name: "Vultisig",
              description:
                "The self-custody MPC wallet for Bitcoin, Ethereum, Solana & 36+ chains. Seedless DKLS23 threshold signatures. No single point of failure. TypeScript SDK for AI agents.",
              url: "https://vultisig.com",
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
              author: {
                "@id": "https://vultisig.com/#organization",
              },
              publisher: {
                "@id": "https://vultisig.com/#organization",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1250",
                bestRating: "5",
                worstRating: "1",
              },
              featureList: [
                "MPC (Multi-Party Computation) security via DKLS23 Threshold Signature Scheme",
                "Seedless — no 12 or 24 word recovery phrase to store",
                "36+ blockchains including Bitcoin, Ethereum, Solana, THORChain, Cosmos, TON, Cardano, Tron, XRP",
                "Fast Vault (2-of-2 server-assisted) for instant signing",
                "Secure Vault (m-of-n, multi-device) for human co-signing",
                "TypeScript SDK on npm (@vultisig/sdk) for programmatic and AI-agent integration",
                "Cross-chain swaps via THORChain, MayaChain, 1inch, LiFi, KyberSwap",
                "Plugin Marketplace for self-custodial automation (DCA, recurring payments, trading)",
                "Open-source on GitHub — audited TSS/MPC implementation co-developed with Silence Laboratories",
                "iOS, Android, Windows, macOS, Linux, and Chrome browser extension",
              ],
              downloadUrl: "https://vultisig.com/downloads",
              installUrl: "https://vultisig.com/downloads",
              screenshot: "https://vultisig.com/thumbnails/home.png",
              softwareVersion: "1.0",
              releaseNotes: "https://github.com/vultisig/vultisig-ios/releases",
            }),
          }}
        />
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
