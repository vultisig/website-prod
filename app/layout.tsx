import type { Metadata } from 'next'
import './globals.css'
import Navbar from "@/components/navbar"
import GoogleAnalytics from "@/components/ga"
import Script from "next/script"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Vultisig - The Safest Crypto Wallet | Seedless Security Made Simple",
  description:
    "Revolutionary multi-factor crypto wallet with TSS technology. Secure Bitcoin, Ethereum, and 30+ chains without seed phrases. No single point of failure.",
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
  ],
  authors: [
    { name: "Vultisig" }, 
    { name: "Vultisig", url: "https://vultisig.com" },
    { name: "Vulti Holdings Limited" }
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
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://vultisig.com',
    languages: {
      'en-US': 'https://vultisig.com',
    },
  },
  category: 'Cryptocurrency & Blockchain',
  classification: 'Financial Technology',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#000000' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  openGraph: {
    siteName: "Vultisig",
    title: "Vultisig - The Safest Crypto Wallet | Seedless Security Made Simple",
    description:
      "Revolutionary multi-factor crypto wallet with TSS technology. Secure Bitcoin, Ethereum, and 30+ chains without seed phrases. No single point of failure.",
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
      }
    ],
    countryName: "British Virgin Islands",
  },
  twitter: {
    site: "@vultisig",
    creator: "@vultisig",
    card: "summary_large_image",
    title: "Vultisig - The Safest Crypto Wallet | Seedless Security Made Simple",
    description:
      "Revolutionary multi-factor crypto wallet with TSS technology. Secure Bitcoin, Ethereum, and 30+ chains without seed phrases. No single point of failure.",
    images: [
      {
        url: "https://vultisig.com/thumbnails/home.png",
        alt: "Vultisig - The Safest Crypto Wallet | Seedless Security Made Simple",
      }
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
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#000000",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body style={{ background: 'var(--background)' }}>
        <GoogleAnalytics />
        {/* Twitter conversion script */}
        <Script id="twitter-uwt" strategy="afterInteractive">
          {`
            !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            twq('config','ooes4');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Vultisig",
              "description": "Revolutionary multi-factor crypto wallet with TSS technology. Secure Bitcoin, Ethereum, and 30+ chains without seed phrases. No single point of failure.",
              "url": "https://vultisig.com",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Android, iOS, Windows, Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "Vultisig",
                "url": "https://vultisig.com",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "email": "support@vultisig.com"
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250"
              },
              "featureList": [
                "Multi-signature wallet",
                "TSS technology",
                "30+ blockchain support",
                "No seed phrases",
                "Self-custodial",
                "Multi-factor authentication"
              ]
            })
          }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
