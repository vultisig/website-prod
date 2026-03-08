"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

const hashes = [
  {
    os: "ios",
    icon: "/images/apple.svg",
    hash: "sha256:aa8c82df650a1c46d2e37b9eff9b2a1f087052dc8ed43856bf4b0728a3ab6f52",
  },
  {
    os: "android",
    icon: "/images/Android.svg",
    hash: "sha256:c8523494c5a7fb097597dd34c5c5c9b697f353174970cc38934000c1648eef44",
  },
  {
    os: "linux",
    icon: "/images/linux.svg",
    hash: "sha256:96f515ba9d123545c67d32c4ecb92aa4de039768d41637d2c6f68448523c2741",
  },
  {
    os: "windows",
    icon: "/images/windows.svg",
    hash: "sha256:8c2c82ec0f5488c02064f6079ef79eb5a99ce29f25d913b3a996ef9978cd2df9",
  },
]

function HashCard({
  icon,
  hash,
  os,
}: {
  icon: string
  hash: string
  os: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hash)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  // Truncate hash for display
  const displayHash =
    hash.length > 30
      ? `${hash.substring(0, 15)}...${hash.substring(hash.length - 15)}`
      : hash

  return (
    <div
      className="bg-[#0B1B3B] border border-[var(--border-light)] rounded-xl p-5 flex flex-col w-full h-full items-start gap-4
      hover:border-[#1B3F73]
      hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
      transition-all
      "
    >
      {/* Icon Container */}
      <div className="w-12 h-12 rounded-xl bg-[#193B7A] border border-blue-500/20 flex items-center justify-center">
        <Image
          src={icon}
          alt={os + " icon"}
          width={24}
          height={24}
          className="w-6 h-6 object-contain"
        />
      </div>

      <div className="flex flex-col w-full gap-1">
        {/* Label */}
        <span className="text-white font-medium text-base">SHA256</span>

        {/* Hash + Copy Button */}
        <div className="flex items-center justify-between w-full gap-2">
          <span
            className="text-xs text-gray-400 truncate select-all"
            title={hash}
          >
            {displayHash}
          </span>

          <Button
            size="icon"
            variant="ghost"
            className="text-gray-400 hover:text-white hover:bg-transparent h-5 w-5 p-0 flex-shrink-0 relative"
            onClick={handleCopy}
          >
            <span className="sr-only">{copied ? "Copied!" : "Copy"}</span>

            {/* Copy Icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-opacity duration-300 ${
                copied ? "opacity-0" : "opacity-100"
              }`}
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>

            {/* Check Icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-green-500 transition-opacity duration-300 absolute top-0 left-0 ${
                copied ? "opacity-100" : "opacity-0"
              }`}
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function DownloadsPage() {
  const [activeTab, setActiveTab] = useState("mobile")
  const [direction, setDirection] = useState(0)
  const tabOrder = ["mobile", "browser", "web"]

  const handleTabChange = (newTab: string) => {
    const currentIndex = tabOrder.indexOf(activeTab)
    const newIndex = tabOrder.indexOf(newTab)
    setDirection(newIndex > currentIndex ? 1 : -1)
    setActiveTab(newTab)
  }

  const trackDownload = (platform: string) => {
    if (typeof window === "undefined" || !(window as any).gtag) return
    ;(window as any).gtag("event", "download_click", {
      platform,
      item_id: "vultisig",
      item_name: "Vultisig",
      item_category: "download",
      transport_type: "beacon",
    })
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  }

  return (
    <main className="min-h-screen pt-20 sm:pt-32 pb-20 px-4">
      <section className="container mb-16 sm:mb-32">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="relative overflow-hidden bg-[var(--background-secondary)] border border-[var(--border-light)] rounded-2xl p-6 sm:p-8 lg:p-12 h-auto lg:h-[580px] mb-8">
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20">
              <TabsList className="flex p-0 w-full sm:w-fit bg-transparent gap-0">
                <TabsTrigger
                  value="mobile"
                  className="
                    relative px-6 sm:px-8 py-3 font-normal transition-all duration-300 text-base
                    border border-white/10
                    rounded-l-[20px] rounded-r-none
                    data-[state=active]:bg-[#2155df] data-[state=active]:text-white
                    data-[state=inactive]:bg-transparent data-[state=inactive]:text-white
                    focus-visible:outline-none
                    h-[54px]
                  "
                >
                  Mobile App
                </TabsTrigger>
                <TabsTrigger
                  value="browser"
                  className="
                    relative px-6 sm:px-8 py-3 font-normal transition-all duration-300 text-base
                    border border-white/10 border-l-0
                    rounded-none
                    data-[state=active]:bg-[#2155df] data-[state=active]:text-white
                    data-[state=inactive]:bg-transparent data-[state=inactive]:text-white
                    focus-visible:outline-none
                    h-[54px]
                  "
                >
                  Browser Extension
                </TabsTrigger>
                <TabsTrigger
                  value="web"
                  className="
                    relative px-6 sm:px-8 py-3 font-normal transition-all duration-300 text-base
                    border border-white/10 border-l-0
                    rounded-r-[20px] rounded-l-none
                    data-[state=active]:bg-[#2155df] data-[state=active]:text-white
                    data-[state=inactive]:bg-transparent data-[state=inactive]:text-white
                    focus-visible:outline-none
                    h-[54px]
                  "
                >
                  Web
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="relative h-full">
              <AnimatePresence mode="wait" custom={direction}>
                {activeTab === "mobile" && (
                  <motion.div
                    key="mobile"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="h-full"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full pt-16 sm:pt-20">
                      {/* Left Column - Content */}
                      <div className="flex flex-col justify-start">
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[60px] font-medium text-textPrimary mb-6 leading-tight lg:leading-[72px] tracking-[-1.5px] min-h-[72px]">
                          Download Vultisig
                        </h1>
                        <p className="text-textSecondary text-base sm:text-lg mb-8 max-w-[590px] leading-7 tracking-[-0.09px] min-h-[56px]">
                          The Flagship app of Vultisig. Your seedless
                          multi-chain, multi-factor wallet. Use Vault Shares
                          instead of Seed Phrases.
                        </p>

                        {/* Download Buttons Grid - 4x2 layout matching Figma */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 w-fit">
                          {/* Row 1 */}
                          <a
                            href="https://apps.apple.com/app/apple-store/id6503023896?pt=126546604&ct=website-download&mt=8"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackDownload("ios app store")}
                            className="bg-[var(--background)] border-[1.5px] border-[#1B3F73] rounded-3xl p-4 flex flex-col items-center justify-between hover:border-blue-500 hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)] transition-all w-[99px] h-[99px]"
                          >
                            <img
                              src="/images/apple.svg"
                              alt="App Store"
                              className="h-7 w-auto"
                            />
                            <span className="text-white text-xs font-medium text-center">
                              App Store
                            </span>
                          </a>

                          <a
                            href="https://apps.apple.com/app/apple-store/id6503023896?pt=126546604&ct=website-download&mt=8"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackDownload("macos app store")}
                            className="bg-[var(--background)] border-[1.5px] border-[#1B3F73] rounded-3xl p-4 flex flex-col items-center justify-between hover:border-blue-500 hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)] transition-all w-[99px] h-[99px]"
                          >
                            <img
                              src="/images/macOS.svg"
                              alt="MacOS"
                              className="h-8 w-auto"
                            />
                            <span className="text-white text-xs font-medium text-center">
                              MacOS
                            </span>
                          </a>

                          <a
                            href="https://github.com/vultisig/vultisig-ios/releases/tag/v1.33.45"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackDownload("macos github")}
                            className="bg-[var(--background)] border-[1.5px] border-[#1B3F73] rounded-3xl p-4 flex flex-col items-center justify-between hover:border-blue-500 hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)] transition-all w-[99px] h-[99px]"
                          >
                            <img
                              src="/images/macOS.svg"
                              alt="MacOS Github"
                              className="h-8 w-auto"
                            />
                            <span className="text-white text-[11px] font-medium text-center leading-tight">
                              MacOS from Github
                            </span>
                          </a>

                          <a
                            href="https://play.google.com/store/apps/details?id=com.vultisig.wallet"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackDownload("android play store")}
                            className="bg-[var(--background)] border-[1.5px] border-[#1B3F73] rounded-3xl p-4 flex flex-col items-center justify-between hover:border-blue-500 hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)] transition-all w-[99px] h-[99px]"
                          >
                            <img
                              src="/images/googleplay-icon.svg"
                              alt="Google Play"
                              className="h-7 w-auto"
                            />
                            <span className="text-white text-xs font-medium text-center">
                              Google Play
                            </span>
                          </a>

                          {/* Row 2 */}
                          <a
                            href="https://github.com/vultisig/vultisig-windows/releases/download/v1.0.54/Vultisig-amd64-installer-v1.0.54.exe"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackDownload("windows")}
                            className="bg-[var(--background)] border-[1.5px] border-[#1B3F73] rounded-3xl p-4 flex flex-col items-center justify-between hover:border-blue-500 hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)] transition-all w-[99px] h-[99px]"
                          >
                            <img
                              src="/images/windows.svg"
                              alt="Windows"
                              className="h-8 w-auto"
                            />
                            <span className="text-white text-xs font-medium text-center">
                              Windows
                            </span>
                          </a>

                          <a
                            href="https://github.com/vultisig/vultisig-windows/releases/download/v1.0.54/vultisig_1.0.54_amd64.deb"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackDownload("linux")}
                            className="bg-[var(--background)] border-[1.5px] border-[#1B3F73] rounded-3xl p-4 flex flex-col items-center justify-between hover:border-blue-500 hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)] transition-all w-[99px] h-[99px]"
                          >
                            <img
                              src="/images/linux.svg"
                              alt="Linux"
                              className="h-7 w-auto"
                            />
                            <span className="text-white text-xs font-medium text-center">
                              Linux
                            </span>
                          </a>

                          <a
                            href="https://github.com/vultisig/vultisig-android/releases/tag/v1.0.96"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackDownload("android github")}
                            className="bg-[var(--background)] border-[1.5px] border-[#1B3F73] rounded-3xl p-4 flex flex-col items-center justify-between hover:border-blue-500 hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)] transition-all w-[99px] h-[99px]"
                          >
                            <img
                              src="/images/Android.svg"
                              alt="Android"
                              className="h-6 w-auto"
                            />
                            <span className="text-white text-xs font-medium text-center">
                              Android
                            </span>
                          </a>
                        </div>
                      </div>

                      {/* Right Column - Preview with decorative background */}
                      <div className="hidden lg:flex items-center justify-end relative h-full">
                        {/* Phone mockup container - 138px from right */}
                        <div className="relative mr-[138px]">
                          {/* Blur effect centered behind mockup */}
                          <div
                            className="absolute pointer-events-none"
                            style={{
                              width: "669px",
                              height: "532px",
                              left: "50%",
                              top: "50%",
                              transform: "translate(-50%, -60%)",
                            }}
                          >
                            <img
                              src="/images/phone-blur.svg"
                              alt=""
                              className="w-full h-full"
                            />
                          </div>
                          {/* Phone mockup */}
                          <div className="relative z-10 bg-[rgba(4,15,33,0.3)] border border-white/30 rounded-[23px] p-4">
                            <img
                              src="/images/phone-mockup-swap.png"
                              alt="Vultisig Mobile App Preview"
                              className="w-[270px] h-auto rounded-xl"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "browser" && (
                  <motion.div
                    key="browser"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="h-full"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full pt-16 sm:pt-20">
                      {/* Left Column - Content */}
                      <div className="flex flex-col justify-start">
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[60px] font-medium text-textPrimary mb-6 leading-tight lg:leading-[72px] tracking-[-1.5px] min-h-[72px]">
                          Install Vulticonnect
                        </h1>
                        <p className="text-textSecondary text-base sm:text-lg mb-8 max-w-[590px] leading-7 tracking-[-0.09px] min-h-[56px]">
                          Your gateway to web3 and DeFi. Connect your Vultisig
                          to your favourite Interface without moving your funds.
                        </p>

                        {/* Chrome Download Button */}
                        <div className="flex justify-start">
                          <a
                            href="https://chromewebstore.google.com/detail/vulticonnect/ggafhcdaplkhmmnlbfjpnnkepdfjaelb?authuser=0&hl=en-GB&pli=1"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackDownload("chrome extension")}
                            className="bg-[var(--background)] border-[1.5px] border-[#1B3F73] rounded-3xl p-4 flex flex-col items-center justify-between hover:border-blue-500 hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)] transition-all w-[99px] h-[99px]"
                          >
                            <img
                              src="/images/chrome-download.svg"
                              alt="Chrome"
                              className="h-8 w-auto"
                            />
                            <span className="text-white text-xs font-medium">
                              Chrome
                            </span>
                          </a>
                        </div>
                      </div>

                      {/* Right Column - Browser Mockup */}
                      <div className="hidden lg:flex items-center justify-center lg:justify-end relative">
                        <div className="relative w-full h-full flex items-center justify-end">
                          <img
                            src="/images/mac-extension.svg"
                            alt="Vulticonnect Browser Extension Preview"
                            className="w-auto h-auto max-h-[500px] lg:max-h-[550px] object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "web" && (
                  <motion.div
                    key="web"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="h-full"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full pt-16 sm:pt-20">
                      {/* Left Column - Content */}
                      <div className="flex flex-col justify-start">
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[60px] font-medium text-textPrimary mb-6 leading-tight lg:leading-[72px] tracking-[-1.5px] min-h-[72px]">
                          Vultisig Web
                        </h1>
                        <p className="text-textSecondary text-base sm:text-lg mb-8 max-w-[590px] leading-7 tracking-[-0.09px] min-h-[56px]">
                          A view only access to your vault and register your
                          Vaults for the airdrop.
                        </p>

                        {/* Web App Button */}
                        <div className="flex justify-start">
                          <a
                            href="https://airdrop.vultisig.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[var(--background)] border-[1.5px] border-[#1B3F73] rounded-3xl p-4 flex flex-col items-center justify-between hover:border-blue-500 hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)] transition-all w-[99px] h-[99px]"
                          >
                            <img
                              src="/images/vultiweb-logo.svg"
                              alt="Web App"
                              className="h-10 w-auto"
                            />
                            <span className="text-white text-xs font-medium">
                              Web App
                            </span>
                          </a>
                        </div>
                      </div>

                      {/* Right Column - Browser Mockup */}
                      <div className="hidden lg:flex items-center justify-end relative">
                        <img
                          src="/images/mac-web.svg"
                          alt="Vultisig Web Preview"
                          className="w-auto h-auto max-h-[550px] object-contain absolute right-[-48px]"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* SHA256 Checksums - Outside the box */}
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-12 mb-6">
            SHA Checksums:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hashes.map((h, i) => (
              <HashCard key={i} {...h} />
            ))}
          </div>
        </Tabs>
      </section>

      {/* Discord section */}
      <section className="py-8 sm:py-12 px-4">
        <div className="container">
          <div className="flex justify-center items-center mt-4 sm:mt-8">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center px-4">
                JOIN THE DISCORD TO REQUEST NEW FEATURES!
              </h3>
              <a
                href="https://discord.gg/thq64eaYVN"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto"
              >
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full md:w-auto">
                  DISCORD
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
