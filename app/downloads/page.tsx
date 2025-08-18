"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"

const hashes = [
  {
    os: "ios",
    icon: "/images/apple.svg",
    hash: "sha256:d656950f531ad80a201cfe61d6505bca8d14430be9b6527144becefc86422ad7",
  },
  {
    os: "windows",
    icon: "/images/windows.svg",
    hash: "sha256:12cfe1aad21b50a819b582ffd2ac07647139bfc972c04e6ddaf1a8c23db99a28",
  },
  {
    os: "linux",
    icon: "/images/linux.svg",
    hash: "sha256:6513561d87f8494dfd77b13174c6e41bc20fb7de74b617096868b103d9d00ca7",
  },
]

function HashCard({ icon, hash, os }: { icon: string; hash: string; os: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hash)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="bg-[var(--background-secondary)] border border-slate-700 rounded-xl px-4 sm:px-6 py-4 flex flex-col w-full
      hover:border-[var(--border-color)]
      hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
      ">
      <div className="flex items-center justify-between w-full mb-2">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-transparent flex-shrink-0">
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32" className="sm:w-[50px] sm:h-[50px]">
              <path d="M10 15V12A6 6 0 0 1 22 12V15h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1Zm2-3V15h8v-3a4 4 0 1 0-8 0Z" fill="var(--primary-accent)"/>
            </svg>
          </span>
          <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
            <Image src={icon} alt={os + " icon"} width={19} height={19} />
          </span>
          <span className="ml-1 sm:ml-2 font-semibold text-white text-lg sm:text-[22px]">SHA256</span>
        </div>
        <Button 
          size="icon" 
          variant="ghost" 
          className="text-gray-400 ml-2 hover:bg-[#ffffff20] flex-shrink-0 relative"
          onClick={handleCopy}
        >
          <span className="sr-only">{copied ? 'Copied!' : 'Copy'}</span>
          
          {/* Copy Icon */}
          <svg 
            width="24" 
            height="24" 
            fill="none" 
            viewBox="0 0 50 50" 
            className={`sm:w-[50px] sm:h-[50px] transition-opacity duration-300 ${
              copied ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <rect x="5" y="5" width="30" height="30" rx="3" fill="var(--background-secondary)" stroke="#fff" strokeWidth="5"/>
            <rect x="15" y="15" width="30" height="30" rx="3" fill="var(--background-secondary)" stroke="#fff" strokeWidth="5"/>
          </svg>
          
          {/* Green Tick Icon */}
          <svg 
            width="24" 
            height="24" 
            fill="none" 
            viewBox="0 0 24 24" 
            className={`sm:w-[50px] sm:h-[50px] text-green-500 transition-opacity duration-300 ${
              copied ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <path 
              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" 
              fill="currentColor"
            />
            <path 
              d="M9 10.17L4.83 6l-1.42 1.41L9 13 21 1l-1.41-1.41L9 10.17z" 
              fill="currentColor"
            />
          </svg>
        </Button>
      </div>
      <div className="w-full">
        <span className="font-mono text-[13px] sm:text-[15px] text-[#B6C6E3] break-all select-all">{hash}</span>
      </div>
    </div>
  )
}

export default function DownloadsPage() {
  return (
    <main className="min-h-screen pt-20 sm:pt-32 pb-20 px-4">
      <section className="max-w-7xl mx-auto mb-16 sm:mb-32">
        <Tabs defaultValue="vultisig" className="w-full flex flex-col items-center">
          <TabsList className="flex bg-transparent mb-8 sm:mb-12 p-1 w-full sm:w-fit">
            <TabsTrigger
              value="vultisig"
              className="
                px-4 sm:px-8 md:px-24 py-2 font-bold transition-all duration-200 border border-slate-700 rounded-l-full rounded-r-none text-sm sm:text-lg
                hover:border-[var(--border-color)]
                hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
                data-[state=active]:bg-blue-600
                data-[state=active]:text-white
                data-[state=active]:font-bold
                data-[state=active]:border-none
                data-[state=inactive]:bg-[var(--background)]
                data-[state=inactive]:text-white/80
                focus-visible:outline-none
                flex-1 sm:flex-none
              "
            >
              Vultisig
            </TabsTrigger>
            <TabsTrigger
              value="browser"
              className="
                px-4 sm:px-8 md:px-24 py-2 font-bold transition-all duration-200 border border-slate-700 rounded-none text-sm sm:text-lg
                hover:border-[var(--border-color)]
                hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
                data-[state=active]:bg-blue-600
                data-[state=active]:text-white
                data-[state=active]:font-bold
                data-[state=active]:border-none
                data-[state=inactive]:bg-[var(--background)]
                data-[state=inactive]:text-white/80
                focus-visible:outline-none
                flex-1 sm:flex-none
              "
            >Browser</TabsTrigger>
            <TabsTrigger
              value="web"
              className="
                px-4 sm:px-8 md:px-24 py-2 font-bold transition-all duration-200 border border-slate-700 rounded-r-full rounded-l-none text-sm sm:text-lg
                hover:border-[var(--border-color)]
                hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
                data-[state=active]:bg-blue-600
                data-[state=active]:text-white
                data-[state=active]:font-bold
                data-[state=active]:border-none
                data-[state=inactive]:bg-[var(--background)]
                data-[state=inactive]:text-white/80
                focus-visible:outline-none
                flex-1 sm:flex-none
              "
            >Web</TabsTrigger>
          </TabsList>
          <TabsContent value="vultisig">
            <div className="flex flex-col items-center justify-center text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight px-4">
                Download Vultisig: Secure Crypto Vault
              </h1>
              <p className="text-gray-300 text-sm max-w-lg mx-auto mb-0 px-4">
                The Flagship app of Vultisig. Your seedless multi-chain, multi-factor wallet. Use Vault Shares instead of Seed Phrases.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center relative">
              <img src="/images/vultisig-app-mobile.svg" alt="Vultisig Mobile App" className="w-64 sm:w-80 h-auto rounded-xl shadow-lg z-10" />
              <div className="w-full flex flex-col items-center relative">
                <div className="w-full max-w-[1000px] h-1 bg-gradient-to-r from-transparent via-blue-500/70 to-transparent z-10 relative"></div>
                <div className="w-full max-w-[1000px] h-16 overflow-hidden absolute left-1/2 -translate-x-1/2 top-1 z-0 pointer-events-none">
                  <div className="w-full h-full bowl-glow"></div>
                </div>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-8 z-20 relative px-4">
                  <a href="https://apps.apple.com/app/vultisig/id6503023896" target="_blank" rel="noopener noreferrer">
                    <img src="/images/appstore.svg" alt="Download on the App Store" className="h-10 sm:h-12" />
                  </a>
                  <a href="https://github.com/vultisig/vultisig-ios/releases/download/v1.22.3/VultisigApp.v1.22.3.signed.pkg" target="_blank" rel="noopener noreferrer">
                    <img src="/images/macstore.svg" alt="Download for MacOS" className="h-10 sm:h-12" />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.vultisig.wallet" target="_blank" rel="noopener noreferrer">
                    <img src="images/playstore.svg" alt="Get it on Google Play" className="h-10 sm:h-12" />
                  </a>
                  <a href="https://github.com/vultisig/vultisig-windows/releases/download/v1.0.34/Vultisig-amd64-installer-v1.0.34.exe" target="_blank" rel="noopener noreferrer">
                    <img src="/images/winstore.svg" alt="Download for Windows" className="h-10 sm:h-12" />
                  </a>
                  <a href="https://github.com/vultisig/vultisig-windows/releases/download/v1.0.34/vultisig_1.0.34_amd64.deb" target="_blank" rel="noopener noreferrer">
                    <img src="/images/linuxstore.svg" alt="Download for Linux" className="h-10 sm:h-12" />
                  </a>
                </div>
              </div>
              <div className="w-full max-w-2xl mt-8 sm:mt-10 space-y-4 px-4">
                {hashes.map((h, i) => (
                  <HashCard key={i} {...h} />
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="browser">
            <div className="flex flex-col items-center justify-center relative">
              <div className="flex flex-col items-center justify-center text-center mb-8 sm:mb-12">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight px-4">
                  Install Vulticonnect
                </h1>
                <p className="text-gray-300 text-sm max-w-lg mx-auto mb-0 px-4">
                  Your gateway to web3 and DeFi. Connect your vultisig to your favourite interface without moving your funds.
                </p>
              </div>
              {/* <div className="absolute w-96 h-96 rounded-full bg-gradient-radial from-[var(--primary-accent)] to-transparent z-0"></div> */}
              <div className="glow-blob hidden sm:block" style={{top: '70%'}}></div>
              <img src="/images/vultisig-app-browser.svg" alt="Vultisig Browser App" className="w-64 sm:w-80 h-auto rounded-xl shadow-lg z-10" />
            </div>
            <div className="w-full flex flex-col items-center relative">
              <div className="w-full max-w-[1000px] h-1 bg-gradient-to-r from-transparent via-blue-500/70 to-transparent z-10 relative"></div>
              <div className="w-full max-w-[1000px] h-16 overflow-hidden absolute left-1/2 -translate-x-1/2 top-1 z-0 pointer-events-none">
                <div className="w-full h-full bowl-glow"></div>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-8 z-20 relative px-4">
                <a href="https://chromewebstore.google.com/detail/vulticonnect/ggafhcdaplkhmmnlbfjpnnkepdfjaelb?authuser=0&hl=en-GB&pli=1" target="_blank" rel="noopener noreferrer">
                  <img src="/images/chrome-download.svg" alt="Download for Chrome" className="h-10 sm:h-12" />
                </a>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="web">
            <div className="flex flex-col items-center justify-center relative">
              <div className="flex flex-col items-center justify-center text-center mb-8 sm:mb-12">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight px-4">
                  Vultisig Web
                </h1>
                <p className="text-gray-300 text-sm max-w-lg mx-auto mb-0 px-4">
                  A view only access to your vault and register your <br className="hidden sm:block" /> Vaults for the airdrop
                </p>
              </div>
              {/* <div className="absolute w-96 h-96 rounded-full bg-gradient-radial from-[var(--primary-accent)] to-transparent z-0"></div> */}
              <div className="glow-blob hidden sm:block" style={{top: '70%', height: '30rem', width: '30rem'}}></div>
              <img src="/images/vultiweb-logo.svg" alt="VultiWeb" className="w-64 sm:w-80 h-auto rounded-xl z-10" />
            </div>
            <div className="w-full flex flex-col items-center relative">
              <div className="w-full max-w-[1000px] h-1 bg-gradient-to-r from-transparent via-blue-500/70 to-transparent z-10 relative"></div>
              <div className="w-full max-w-[1000px] h-16 overflow-hidden absolute left-1/2 -translate-x-1/2 top-1 z-0 pointer-events-none">
                <div className="w-full h-full bowl-glow"></div>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-8 z-20 relative px-4">
                <a href="https://airdrop.vultisig.com/" target="_blank" rel="noopener noreferrer">
                  <img src="/images/vultiweb.svg" alt="View it on VultiWeb" className="h-10 sm:h-12" />
                </a>
              </div>
            </div>
          </TabsContent>
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