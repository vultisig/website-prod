"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { motion } from "motion/react"

const hashes = [
  {
    os: "ios",
    icon: "/images/apple.svg",
    hash: "sha256:a08f10106261f8b721de2c2aecac6589d30ba809f550406f2271082ed0a18e73",
  },
  {
    os: "android",
    icon: "/images/Android.svg",
    hash: "sha256:a08f10106261f8b721de2c2aecac6589d30ba809f550406f2271082ed0a18e73",
  },
  {
    os: "linux",
    icon: "/images/linux.svg",
    hash: "sha256:98716c1541ee5c0acccc9cfcc6f868692a4219f2c3d2f39d50c3882527d52777",
  },
  {
    os: "windows",
    icon: "/images/windows.svg",
    hash: "sha256:70c7c83d8cde285e989fa568e2ef07233025cec51e1242ea1690cb545f25881b",
  },
]

function HashCard({ icon, hash, os }: { icon: string; hash: string; os: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hash)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  // Truncate hash for display
  const displayHash = hash.length > 30 
    ? `${hash.substring(0, 15)}...${hash.substring(hash.length - 15)}`
    : hash

  return (
    <div className="bg-[#0B1B3B] border border-[var(--border-light)] rounded-xl p-5 flex flex-col w-full h-full items-start gap-4
      hover:border-[var(--border-color)]
      hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
      transition-all
      ">
      
      {/* Icon Container */}
      <div className="w-12 h-12 rounded-xl bg-[#193B7A] border border-blue-500/20 flex items-center justify-center">
        <Image src={icon} alt={os + " icon"} width={24} height={24} className="w-6 h-6 object-contain" />
      </div>

      <div className="flex flex-col w-full gap-1">
        {/* Label */}
        <span className="text-white font-medium text-base">SHA256</span>
        
        {/* Hash + Copy Button */}
        <div className="flex items-center justify-between w-full gap-2">
          <span className="font-mono text-xs text-gray-400 truncate select-all" title={hash}>
            {displayHash}
          </span>
          
          <Button 
            size="icon" 
            variant="ghost" 
            className="text-gray-400 hover:text-white hover:bg-transparent h-5 w-5 p-0 flex-shrink-0 relative"
            onClick={handleCopy}
          >
            <span className="sr-only">{copied ? 'Copied!' : 'Copy'}</span>
            
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
                copied ? 'opacity-0' : 'opacity-100'
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
                copied ? 'opacity-100' : 'opacity-0'
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
  const [direction, setDirection] = useState("right")

  const trackDownload = (platform: string) => {
    if (typeof window === 'undefined' || !(window as any).gtag) return
    ;(window as any).gtag('event', 'download_click', {
      platform,
      item_id: 'vultisig',
      item_name: 'Vultisig',
      item_category: 'download',
      transport_type: 'beacon',
    })
  }

  const tabOrder = ["mobile", "browser", "web"]

  const handleTabChange = (value: string) => {
    const currentIndex = tabOrder.indexOf(activeTab)
    const newIndex = tabOrder.indexOf(value)
    
    if (newIndex < currentIndex) {
      setDirection("left")
    } else {
      setDirection("right")
    }
    setActiveTab(value)
  }

  const animationClass = direction === "right"
    ? "data-[state=active]:slide-in-from-right data-[state=inactive]:slide-out-to-left"
    : "data-[state=active]:slide-in-from-left data-[state=inactive]:slide-out-to-right"

  return (
    <main className="min-h-screen pt-20 sm:pt-32 pb-20 px-4">
      <section className="max-w-7xl mx-auto mb-16 sm:mb-32">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="relative overflow-hidden bg-[var(--background-secondary)] border border-[var(--border-light)] rounded-2xl p-6 sm:p-8 lg:p-12 h-auto lg:h-[580px] mb-8">
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20">
              <TabsList className="flex bg-[#020817]/50 border border-[var(--border-light)] rounded-full p-0 w-full sm:w-fit backdrop-blur-sm">
                <TabsTrigger
                  value="mobile"
                  className="
                    relative px-4 sm:px-6 py-2 font-medium transition-all duration-500 rounded-full text-sm
                    data-[state=active]:text-white
                    data-[state=active]:font-bold
                    data-[state=inactive]:bg-transparent
                    data-[state=inactive]:text-white/80
                    focus-visible:outline-none
                    h-full
                  "
                >
                  <span className="relative z-10">Mobile App</span>
                  {activeTab === "mobile" && (
                    <motion.div
                      layoutId="active-tab"
                      className="absolute inset-0 bg-blue-600 rounded-full"
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="browser"
                  className="
                    relative px-4 sm:px-6 py-2 font-medium transition-all duration-500 rounded-full text-sm
                    data-[state=active]:text-white
                    data-[state=active]:font-bold
                    data-[state=inactive]:bg-transparent
                    data-[state=inactive]:text-white/80
                    focus-visible:outline-none
                    h-full
                  "
                >
                  <span className="relative z-10">Browser Extension</span>
                  {activeTab === "browser" && (
                    <motion.div
                      layoutId="active-tab"
                      className="absolute inset-0 bg-blue-600 rounded-full"
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="web"
                  className="
                    relative px-4 sm:px-6 py-2 font-medium transition-all duration-500 rounded-full text-sm
                    data-[state=active]:text-white
                    data-[state=active]:font-bold
                    data-[state=inactive]:bg-transparent
                    data-[state=inactive]:text-white/80
                    focus-visible:outline-none
                    h-full
                  "
                >
                  <span className="relative z-10">Web</span>
                  {activeTab === "web" && (
                    <motion.div
                      layoutId="active-tab"
                      className="absolute inset-0 bg-blue-600 rounded-full"
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent 
              value="mobile" 
              className={`mt-0 h-full data-[state=active]:animate-in data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:fade-in-0 duration-500 ${animationClass}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full pt-16 sm:pt-20">
                {/* Left Column - Content */}
                <div className="flex flex-col justify-center">
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                    Download Vultisig
                  </h1>
                  <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-lg">
                    The Flagship app of Vultisig. Your seedless multi-chain multi-factor wallet. Use Vault Shares instead of Seed Phrases.
                  </p>
                  
                  {/* Download Buttons Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <a 
                      href="https://apps.apple.com/app/apple-store/id6503023896?pt=126546604&ct=website-download&mt=8" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={() => trackDownload('ios app store')}
                      className="bg-[var(--background)] border border-[var(--border-light)] rounded-xl p-4 flex flex-col items-center justify-center hover:border-[var(--border-color)] hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)] transition-all aspect-square"
                    >
                      <img src="/images/appstore.svg" alt="App Store" className="h-8 w-auto mb-2" />
                      <span className="text-white text-xs font-medium text-center">App Store</span>
                    </a>
                    
                    <a 
                      href="https://github.com/vultisig/vultisig-ios/releases/tag/v1.31.30" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={() => trackDownload('macos github')}
                      className="bg-[var(--background)] border border-[var(--border-light)] rounded-xl p-4 flex flex-col items-center justify-center hover:border-[var(--border-color)] hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)] transition-all aspect-square"
                    >
                      <img src="/images/macstore.svg" alt="MacOS Github" className="h-8 w-auto mb-2" />
                      <span className="text-white text-xs font-medium text-center">MacOS from Github</span>
                    </a>
                    
                    <a 
                      href="https://play.google.com/store/apps/details?id=com.vultisig.wallet" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={() => trackDownload('android play store')}
                      className="bg-[var(--background)] border border-[var(--border-light)] rounded-xl p-4 flex flex-col items-center justify-center hover:border-[var(--border-color)] hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)] transition-all aspect-square"
                    >
                      <img src="/images/playstore.svg" alt="Google Play" className="h-8 w-auto mb-2" />
                      <span className="text-white text-xs font-medium text-center">Google Play</span>
                    </a>
                    
                    <a 
                      href="https://github.com/vultisig/vultisig-windows/releases/download/v1.0.44/Vultisig-amd64-installer-v1.0.44.exe" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={() => trackDownload('windows')}
                      className="bg-[var(--background)] border border-[var(--border-light)] rounded-xl p-4 flex flex-col items-center justify-center hover:border-[var(--border-color)] hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)] transition-all aspect-square"
                    >
                      <img src="/images/winstore.svg" alt="Windows" className="h-8 w-auto mb-2" />
                      <span className="text-white text-xs font-medium text-center">Windows</span>
                    </a>
                    
                    <a 
                      href="https://github.com/vultisig/vultisig-windows/releases/download/v1.0.44/vultisig_1.0.44_amd64.deb" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={() => trackDownload('linux')}
                      className="bg-[var(--background)] border border-[var(--border-light)] rounded-xl p-4 flex flex-col items-center justify-center hover:border-[var(--border-color)] hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)] transition-all aspect-square"
                    >
                      <img src="/images/linuxstore.svg" alt="Linux" className="h-8 w-auto mb-2" />
                      <span className="text-white text-xs font-medium text-center">Linux</span>
                    </a>
                    
                    <a 
                      href="https://github.com/vultisig/vultisig-android/releases/tag/v1.0.87" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={() => trackDownload('android github')}
                      className="bg-[var(--background)] border border-[var(--border-light)] rounded-xl p-4 flex flex-col items-center justify-center hover:border-[var(--border-color)] hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)] transition-all aspect-square"
                    >
                      <img src="/images/Android.svg" alt="Android" className="h-8 w-auto mb-2" />
                      <span className="text-white text-xs font-medium text-center">Android</span>
                    </a>
                  </div>
                </div>
                
                {/* Right Column - Preview */}
                <div className="flex items-start justify-center lg:justify-end relative overflow-hidden">
                  <div className="relative w-full max-w-[400px] h-full flex items-start">
                    <img 
                      src="/images/Download Vultisig mockup.svg" 
                      alt="Vultisig Mobile App Preview" 
                      className="w-full h-auto object-contain" 
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent 
              value="browser" 
              className={`mt-0 h-full data-[state=active]:animate-in data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:fade-in-0 duration-500 ${animationClass}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full pt-16 sm:pt-20">
                {/* Left Column - Content */}
                <div className="flex flex-col justify-center">
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                    Install Vulticonnect
                  </h1>
                  <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-lg">
                    Your gateway to web3 and DeFi. Connect your Vultisig to your favourite interface without moving your funds.
                  </p>
                  
                  {/* Chrome Download Button */}
                  <div className="flex justify-start">
                    <a 
                      href="https://chromewebstore.google.com/detail/vulticonnect/ggafhcdaplkhmmnlbfjpnnkepdfjaelb?authuser=0&hl=en-GB&pli=1" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={() => trackDownload('chrome extension')}
                      className="bg-[#0B1B3B] border border-[var(--border-light)] rounded-xl p-6 flex flex-col items-center justify-center hover:border-[var(--border-color)] hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)] transition-all aspect-square w-32 h-32"
                    >
                      <img 
                        src="/images/chrome-download.svg" 
                        alt="Chrome" 
                        className="h-10 w-auto mb-2" 
                      />
                      <span className="text-white text-sm font-medium">Chrome</span>
                    </a>
                  </div>
                </div>
                
                {/* Right Column - Preview */}
                <div className="flex items-end justify-center lg:justify-end relative overflow-hidden">
                  <div className="relative w-full h-full flex items-center justify-end">
                    <img 
                      src="/images/Mac.png" 
                      alt="Vulticonnect Browser Extension Preview" 
                      className="w-auto h-auto max-h-[400px] object-contain translate-x-10" 
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent 
              value="web" 
              className={`mt-0 h-full data-[state=active]:animate-in data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:fade-in-0 duration-500 ${animationClass}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full pt-16 sm:pt-20">
                {/* Left Column - Content */}
                <div className="flex flex-col justify-center">
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                    Vultisig Web
                  </h1>
                  <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-lg">
                    A view only access to your vault and register your Vaults for the airdrop
                  </p>
                  
                  {/* Web App Button */}
                  <div className="flex justify-start">
                    <a 
                      href="https://airdrop.vultisig.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-[#0B1B3B] border border-[var(--border-light)] rounded-xl p-6 flex flex-col items-center justify-center hover:border-[var(--border-color)] hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)] transition-all aspect-square w-32 h-32"
                    >
                      <img 
                        src="/images/vultiweb-logo.svg" 
                        alt="Web App" 
                        className="h-10 w-auto mb-2" 
                      />
                      <span className="text-white text-sm font-medium">Web App</span>
                    </a>
                  </div>
                </div>
                
                {/* Right Column - Preview */}
                <div className="flex items-end justify-center lg:justify-end relative overflow-hidden">
                  <div className="relative w-full h-full flex items-center justify-end">
                    <img 
                      src="/images/vultiweb-logo.svg" 
                      alt="Vultisig Web Preview" 
                      className="w-auto h-auto max-h-[400px] object-contain translate-x-10" 
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
          
          {/* SHA256 Checksums - Outside the box */}
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-12 mb-6">SHA Checksums:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hashes.map((h, i) => (
              <HashCard key={i} {...h} />
            ))}
          </div>
        </Tabs>
      </section>
      
      {/* Discord section */}
      <section className="py-8 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center mt-4 sm:mt-8">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center px-4">JOIN THE DISCORD TO REQUEST NEW FEATURES!</h3>
              <a href="https://discord.com/invite/54wEtGYxuv" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
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
