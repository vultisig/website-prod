"use client"

import { Button } from "@/components/ui/button"

export default function BestFeaturesSection() {
  const features = [
    {
      tag: "Multi-chain",
      title: "Vultisig: Asset Management Hub",
      description:
        "Vultisig is chain agnostic - Bitcoin, Ethereum, Solana, THORChain and many more. The first multi-chain, multi-asset, multi-signature wallet in the world for everyone. You can deposit, send, swap and more inside Vultisig.",
    },
    {
      tag: "Extension",
      title: "Portal to Web3",
      description:
        "The Vultisig Chrome extension allows you to connect to all Web3 without ever leaving the secure vault environment until you interact with blockchains.",
    },
    {
      tag: "Plugins",
      title: "Expand your wallet's power (coming soon)",
      description:
        "Unlock new possibilities with Vultisig Apps. From automated investments (DCA) to salary management, customize your wallet with features tailored to your needs. Simplify your crypto experience with tools that work seamlessly together.",
    },
  ]

  return (
    <section className="py-10 container">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-8 tracking-tight">
          Best{" "}
          <span className="bg-gradient-to-r from-[#33E6BF] to-[#0439C7] bg-clip-text text-transparent">
            features
          </span>{" "}
          in one place
        </h2>
        <a href="/downloads">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-12 py-6 sm:py-8 text-base sm:text-lg rounded-lg mb-16">
            Download Vultisig
          </Button>
        </a>
      </div>

      <div className="relative">
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              top: `${index * 40 + 100}px`,
              zIndex: 10 + index,
              marginTop: `${index === 0 ? "5rem" : undefined}`,
            }}
            className="
                bg-background
                border border-borderLight rounded-2xl
                px-6 pt-12 pb-0 lg:px-8 lg:py-16
                min-h-[701px]
                lg:min-h-[400px]
                mt-[30vh]
                sm:mt-[50vh]
                sticky
                overflow-hidden
              "
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-block bg-[#33E6BF]/[0.13] border border-[#33E6BF]/[0.5] text-[#33E6BF] px-3 py-1 rounded-full text-sm font-medium">
                  {feature.tag}
                </div>
                <h3 className="text-2xl lg:text-5xl font-bold text-white">
                  {index === 2 ? (
                    <>
                      Expand your wallet's power{" "}
                      <span className="text-lg lg:text-2xl">(coming soon)</span>
                    </>
                  ) : (
                    feature.title
                  )}
                </h3>
                <p className="text-textSecondary text-base lg:text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className="relative flex justify-center h-full w-full">
                {/* Light blob 1 */}
                <div
                  className="absolute w-96 h-96 rounded-full opacity-60 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle, #0439C7FF 0%, #02122B00 70%)",
                    top: "20%",
                    left: "20%",
                    transform: "translate(-50%, -50%)",
                    zIndex: -1,
                  }}
                ></div>

                {/* Light blob 2 */}
                <div
                  className="absolute w-80 h-80 rounded-full opacity-60 blur-xl"
                  style={{
                    background:
                      "radial-gradient(circle, #33E6BFD9 0%, #02122B00 70%)",
                    bottom: "10%",
                    left: "30%",
                    transform: "translate(-50%, 50%)",
                    zIndex: -2,
                  }}
                ></div>

                <div
                  className="absolute w-96 h-96 rounded-full opacity-60 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle, #0439C7FF 0%, #02122B00 70%)",
                    bottom: "10%",
                    left: "80%",
                    transform: "translate(-50%, 50%)",
                    zIndex: -1,
                  }}
                ></div>

                <div
                  className="
                    relative
                    lg:absolute
                    flex items-center justify-center
                    p-2.5 pb-0
                    border-[0.5px] border-white rounded-t-[18px]
                  "
                  style={{
                    bottom: index < 2 ? `${(index + 1) * -80}px` : "-90px",
                  }}
                >
                  <img
                    src={`/images/features-${index + 1}.webp`}
                    alt={feature.title}
                    width="600"
                    height="400"
                    className="h-full w-auto max-w-full object-contain border-[0.5px] border-white rounded-t-xl"
                  />
                  {index === 1 && (
                    <div>
                      <img
                        src="/images/padlock-1.svg"
                        alt="Security padlock icon"
                        width="100"
                        height="100"
                        className="absolute top-[25%] -left-[10%] w-auto max-w-[100px]"
                      />
                      <img
                        src="/images/padlock-2.svg"
                        alt="Security padlock decoration"
                        width="100"
                        height="100"
                        className="absolute top-0 right-[-50%] blur-[2px] w-auto max-w-[100px]"
                        style={{ transform: "scaleX(-2) scaleY(2)" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Spacer to allow cards to scroll past viewport */}
        <div className="h-[50vh]"></div>
      </div>
    </section>
  )
}
