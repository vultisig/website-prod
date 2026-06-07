import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/primitives/radix/tabs"
import { Box } from "@/components/ui/box"
import { cn } from "@/lib/utils"
import Image, { StaticImageData } from "next/image"
import Gtag from "./Gtag"
import { HashCard } from "./HashCard"
import extensionPng from "./images/extension.png"
import mobilePng from "./images/mobile.png"
// import webPng from "./images/web.png"

const hashes = [
  {
    os: "ios",
    icon: "/images/apple.svg",
    hash: "sha256:ca8f55ca3252a6358b2214bfcaf476dd11147771dbedebaac5a08328e34c965f",
  },
  {
    os: "android",
    icon: "/images/Android.svg",
    hash: "sha256:b842fbed48b1ecfe9c385378faf14cb7f4e756b88ac35663917c3dd93074f249",
  },
  {
    os: "linux",
    icon: "/images/linux.svg",
    hash: "sha256:dfd3631f3916f80f6559ada376e275a67c5b0bb71a8a05f7fa553845c7f3b97c",
  },
  {
    os: "windows",
    icon: "/images/windows.svg",
    hash: "sha256:a19c5d65444bc3d0476134d68768b6b874c7a47a54f1422801eab2421164aebf",
  },
]

const titleMap = {
  mobile: "Mobile App",
  browser: "Browser Extension",
  // web: "Web",
}

const tabs = ["mobile", "browser"] as const

export default async function DownloadsPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const paramTab = (await searchParams)?.tab
  const activeTab =
    (Array.isArray(paramTab) ? paramTab[0] : paramTab) || "mobile"

  return (
    <main className="min-h-screen pt-20 sm:pt-32 pb-20 container">
      <Box className="md:pl-10 relative overflow-hidden">
        <Tabs defaultValue={activeTab}>
          <TabsList className="flex w-[calc(100%-2rem)] max-md:ml-4 max-md:h-12 md:w-[600px] mt-4 md:mt-8 md:rounded-full relative z-10">
            {tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab} className={"max-md:text-sm"}>
                {titleMap[tab]}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContents className="-mt-28 pl-4">
            {tabs.map((tab) => (
              <TabContentDetail key={tab} type={tab} />
            ))}
          </TabsContents>
        </Tabs>
      </Box>
      <div className="w-full">
        {/* SHA256 Checksums - Outside the box */}
        <h2 className="text-xl sm:text-2xl font-bold mt-12 mb-6">
          SHA Checksums:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hashes.map((h, i) => (
            <HashCard key={i} {...h} />
          ))}
        </div>
      </div>
    </main>
  )
}

const tabContentMap = {
  mobile: {
    title: "Download Vultisig",
    description:
      "The Flagship app of Vultisig. Your seedless multi-chain, multi-factor wallet. Use Vault Shares instead of Seed Phrases.",
    channels: [
      "ios-appstore",
      "macos-appstore",
      "macos-github",
      "android-playstore",
      "windows",
      "linux",
      "android-github",
    ] as const,
    image: {
      src: mobilePng,
      alt: "Vultisig Mobile App Preview",
    },
  },
  browser: {
    title: "Install Vulticonnect",
    description:
      "Your gateway to web3 and DeFi. Connect your Vultisig to your favourite Interface without moving your funds.",
    channels: ["chrome"] as const,
    image: {
      src: extensionPng,
      alt: "Vulticonnect Browser Extension Preview",
    },
  },
  // web: {
  //   title: "Vultisig Web",
  //   description:
  //     "A view only access to your vault and register your Vaults for the airdrop.",
  //   channels: ["web"] as const,
  //   image: {
  //     src: webPng,
  //     alt: "Vultisig Web Preview",
  //   },
  // },
}

function TabContentDetail({ type }: { type: keyof typeof tabContentMap }) {
  const content = tabContentMap[type]
  return (
    <TabsContent value={type} className="h-full flex flex-col sm:flex-row">
      <div className="flex flex-col justify-start pt-36 pb-10 relative z-10">
        <h1 className="text-3xl md:text-[60px] font-medium text-textPrimary mb-6 leading-tight tracking-[-1.5px]">
          {content.title}
        </h1>
        <p className="text-textSecondary text-base sm:text-lg mb-8 max-w-[590px] leading-7 tracking-[-0.09px] min-h-[56px]">
          {content.description}
        </p>

        {/* Download Buttons Grid - 4x2 layout matching Figma */}
        <div className="grid grid-cols-4 gap-4 sm:gap-5 w-fit">
          {/* Row 1 */}
          {content.channels.map((channelKey) => (
            <Gtag key={channelKey} channelKey={channelKey} />
          ))}
        </div>
      </div>

      <BannerImage
        image={content.image.src}
        alt={content.image.alt}
        className={
          type === "mobile"
            ? "md:w-7/12"
            : type === "browser"
              ? "md:w-5/12"
              : "md:w-6/12"
        }
      />
    </TabsContent>
  )
}

function BannerImage({
  image,
  alt,
  className,
}: {
  image: StaticImageData
  alt: string
  className?: string
}) {
  return (
    <Image
      className={cn("md:absolute md:right-0 md:bottom-0", className)}
      src={image}
      style={{ aspectRatio: image.width / image.height }}
      alt={alt}
    />
  )
}
