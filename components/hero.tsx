import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"
import HeroMockup from "@/components/hero-mockup"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="pt-28 md:pt-36 pb-16 px-4 relative overflow-hidden bg-gradient-hero">
      <div className="container relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left side — text content */}
          <div className="flex flex-col items-start gap-6 lg:w-[47%]">
            {/* Badge */}
            <div className="inline-flex items-center bg-secondaryAccent/[0.13] border border-secondaryAccent/50 rounded-full px-4 py-1.5">
              <span className="font-medium text-sm text-secondaryAccent tracking-tight">
                Open-Source Audited
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-medium text-textPrimary text-4xl sm:text-5xl lg:text-[60px] leading-tight tracking-[-1.5px] max-w-[546px]">
              The wallet that made seed phrases obsolete
            </h1>

            {/* Subheading */}
            <p className="font-satoshi text-textSecondary text-lg lg:text-xl tracking-tight max-w-[478px] leading-normal">
              Vultisig uses multi-party computation to achieve native
              multi-factor authentication. No seed phrase, no single key, no
              single target. Available on 30+ chains.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-5 w-full max-w-[390px]">
              <Link href="/downloads" className="flex-1">
                <Button
                  variant="primaryBlue"
                  size="lg"
                  className="w-full text-xs tracking-wide gap-1"
                >
                  <Download className="w-4 h-4" />
                  Download Free
                </Button>
              </Link>
              <Link href="/how-it-works" className="flex-1">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full text-xs tracking-wide gap-1"
                >
                  How It Works
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-5">
              <div className="flex items-center -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 border-2 border-background" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-background" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 border-2 border-background" />
              </div>
              <p className="font-satoshi text-base text-textSecondary tracking-tight">
                Trusted by{" "}
                <span className="font-medium text-textPrimary">50,000+</span>{" "}
                vault creators worldwide
              </p>
            </div>
          </div>

          {/* Right side — phone mockup */}
          <div className="lg:w-[53%] relative flex items-center justify-center">
            <HeroMockup />
          </div>
        </div>
      </div>

      {/* Bottom glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[100vw] h-[40vh] pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(72, 121, 253, 0.15) 0%, transparent 70%)",
        }}
      />
    </section>
  )
}
