import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import GoogleAnalyticsWrapper from "@/components/ga-wrapper"
import CookieAnalytics from "@/components/cookie-analytics"
import { Toaster } from "@/components/ui/sonner"
import localFont from "next/font/local"
import { cn } from "@/lib/utils"
import LoadTailwindIntersect from "@/components/sections/LoadTailwindIntersect"
import TwitterAnalytics from "@/components/twitter-analytics"

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
    "Vultisig: The leading MPC wallet with multi-signature security and TSS technology. Create secure vaults for Bitcoin, Ethereum, and 30+ chains without seed phrases. No single point of failure.",
  metadataBase: new URL("https://vultisig.com"),
  keywords: [
    "Vultisig",
    "multisig wallet",
    "crypto vault",
    "digital asset management",
    "blockchain security",
    "MPC technology",
    "multi-chain wallet",
    "self-custodial wallet",
    "cryptocurrency wallet",
    "DeFi wallet",
    "secure crypto storage",
    "multi-signature wallet",
    "crypto asset protection",
    "blockchain wallet",
    "crypto security",
    "Vultisig Docs",
    "Vultisig help",
    "Vultisig support",
    "Vultisig customer service",
    "Vultisig asset exchange",
    "Bitcoin wallet",
    "Ethereum wallet",
    "Solana wallet",
    "SUI wallet",
    "THORChain wallet",
    "crypto trading",
    "DeFi platform",
    "crypto investment",
    "digital currency",
    "cryptocurrency exchange",
    "crypto portfolio",
    "blockchain technology",
    "safe crypto wallet",
    "seedless security",
    "multi-factor authentication",
    "multi-signature wallet",
    "crypto asset protection",
    "blockchain wallet",
    "crypto security",
    "Threshold Signature Scheme",
    "TSS",
    "TSS wallet",
    "TSS crypto",
    "TSS crypto wallet",
    "Multisignature",
    "Multi-Sig",
    "secure crypto vault",
    "multi-signature vault",
    "hardware wallet alternative",
    "cold storage wallet",
    "encrypted wallet",
    "non-custodial wallet",
    "crypto security vault",
    "enterprise crypto wallet",
    "institutional wallet",
    "crypto asset vault",
    "blockchain vault",
    "digital asset vault",
    "secure storage wallet",
    "crypto protection",
    "asset security",
    "key management",
    "crypto backup",
    "recovery wallet",
    "cold storage solution",
    "non-custodial",
    "enterprise-grade security",
    "key management system",
    "multi-party computation",
    "MPC",
    "MPC wallet",
    "best MPC wallet",
    "MPC crypto wallet",
    "MPC wallet app",
    "multi-party computation wallet",
    "MPC self-custody",
    "MPC wallet iOS",
    "MPC wallet Android",
    "threshold cryptography",
    "distributed key generation",
    "zero-knowledge security",
    "air-gapped security",
    "offline wallet",
    "backup and recovery",
    "asset protection",
    "crypto insurance ready",
    "compliance wallet",
    "regulated wallet solution",
  ],
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
      "The leading MPC wallet with TSS technology. Secure Bitcoin, Ethereum, and 30+ chains without seed phrases. No single point of failure.",
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
      {
        url: "https://vultisig.com/logo.svg",
        width: 512,
        height: 512,
        alt: "Vultisig Logo",
        type: "image/svg+xml",
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
      "The leading MPC wallet with TSS technology. Secure Bitcoin, Ethereum, and 30+ chains without seed phrases. No single point of failure.",
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
          "antialiased bg-background text-textPrimary",
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
                "The leading MPC wallet with multi-signature security and TSS technology. Secure Bitcoin, Ethereum, and 30+ chains without seed phrases. No single point of failure.",
              url: "https://vultisig.com",
              applicationCategory: "FinanceApplication",
              applicationSubCategory: "Cryptocurrency Wallet",
              operatingSystem: "Android, iOS, Windows, macOS, Linux, Web",
              keywords:
                "MPC wallet, multi-party computation, TSS wallet, multisig wallet, crypto vault, seedless wallet, self-custody",
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
                "MPC (Multi-Party Computation) security",
                "Threshold Signature Scheme (TSS) technology",
                "Multi-signature wallet",
                "30+ blockchain support",
                "No seed phrases required",
                "Self-custodial - you control your keys",
                "Multi-device signing",
                "Cross-chain swaps via THORChain",
                "AI agent integration ready",
                "Open source and audited",
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
        <LoadTailwindIntersect />
      </body>
    </html>
  )
}
