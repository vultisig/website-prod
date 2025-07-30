"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Circle } from "lucide-react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function BestFeaturesSection() {
  const [expandedFeature, setExpandedFeature] = useState<string>("0") // Accordion expects string value, never null
  const [displayedImageIndex, setDisplayedImageIndex] = useState(0)
  const [imageVisible, setImageVisible] = useState(true)
  const fadeDuration = 250 // ms
  const [isMobile, setIsMobile] = useState(false)

  const features = [
    {
      title: "Vultisig: Asset Management Hub",
      description:
        "Vultisig is chain agnostic - Bitcoin, Ethereum, Solana, THORChain and many more. The first multi-chain, multi-asset, multi-signature wallet in the world for everyone. You can deposit, send, swap and more inside Vultisig.",
    },
    {
      title: "AI Agents",
      description:
        "Advanced AI agents help you manage your portfolio, analyze market trends, and make informed decisions about your crypto investments with intelligent automation.",
    },
    {
      title: "Expand your wallet's power",
      description:
        "Unlock advanced features and integrations that extend your wallet's capabilities beyond basic transactions, including DeFi protocols, NFT management, and more.",
    },
  ]

  const featureImages = [
    "/images/home-4.1.png",
    "/images/home-4.2.png",
    "/images/home-4.3.png",
  ]

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // On desktop, expand on hover, collapse on mouse leave
  const handleFeatureHover = (index: number) => {
    if (isMobile || expandedFeature === String(index)) return
    setExpandedFeature(String(index))
  }
  const handleFeatureClick = (index: number) => {
    if (!isMobile || expandedFeature === String(index)) return
    setExpandedFeature(String(index))
  }
  const handleFeaturesMouseLeave = () => {
    if (!isMobile) {
      // Do nothing: keep the last expanded feature open (do not collapse all)
      // If nothing was ever expanded, fallback to first
      if (!expandedFeature || expandedFeature === "") {
        setExpandedFeature("0")
      }
    }
  }

  // Fade image on feature change
  useEffect(() => {
    const newIndex = Number(expandedFeature || 0)
    if (displayedImageIndex !== newIndex) {
      setImageVisible(false)
      const timeout = setTimeout(() => {
        setDisplayedImageIndex(newIndex)
        setImageVisible(true)
      }, fadeDuration)
      return () => clearTimeout(timeout)
    }
  }, [expandedFeature])

  return (
    <section className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
            Best <span className="text-cyan-400">features</span> in one place
          </h2>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-12 py-6 sm:py-8 text-base sm:text-lg rounded-lg mb-16">
            Download Vultisig
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <Accordion
            type="single"
            collapsible
            value={expandedFeature || "0"}
            onValueChange={val => setExpandedFeature(val || "0")}
            className="space-y-4 min-h-[410px]"
            onMouseLeave={handleFeaturesMouseLeave}
          >
            {features.map((feature, index) => (
              <AccordionItem
                key={index}
                value={String(index)}
                className={`bg-[var(--background-secondary)] border border-[var(--border-color)] rounded-2xl transition-all ${
                  expandedFeature === String(index)
                    ? "shadow-[0_0_8px_1px_rgba(var(--border-color-rgb),0.5)]"
                    : "hover:border-[var(--border-color)]"
                } p-0`}
              >
                <AccordionTrigger
                  hideChevron={true}
                  className="p-4 sm:p-6 cursor-pointer flex items-center mb-0 bg-transparent rounded-2xl border-none shadow-none no-underline hover:no-underline focus:no-underline"
                  onMouseEnter={() => handleFeatureHover(index)}
                  onClick={() => handleFeatureClick(index)}
                >
                  <Circle className="w-3 h-3 text-blue-400 fill-current mr-3" />
                  <h3 className="text-lg sm:text-xl font-bold text-white text-left flex-1 no-underline hover:no-underline">{feature.title}</h3>
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6 pb-4 pt-2 text-white text-base bg-transparent border-none">
                  {feature.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="flex justify-center relative">
            <div className="relative w-full overflow-hidden flex items-center justify-center">
              <img
                src={featureImages[displayedImageIndex]}
                className={`w-full h-full object-cover transition-transform duration-300 ease-in-out transition-opacity ${imageVisible ? "opacity-100" : "opacity-0"}`}
                style={{ transform: "scale(1.2)", transitionProperty: "opacity, transform" }}
                alt="Feature visual"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
