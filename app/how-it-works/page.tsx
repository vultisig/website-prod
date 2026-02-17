"use client"

import { Card } from "@/components/ui/card"
import CtaSection from "@/components/cta-section"
import { Lock, Key, Grid } from "lucide-react"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import feature1Png from "./images/feature1.png"
import feature2Png from "./images/feature2.png"
import feature3Png from "./images/feature3.png"
import Image from "next/image"

function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={`bg-gradient-to-r from-[#33e6bf] to-cyan-400 bg-clip-text text-transparent font-bold ${className}`}
    >
      {children}
    </span>
  )
}

const features = [
  {
    tag: "Multi-device",
    title: "No special hardware needed",
    description:
      "With Vultisig, you bring your own trusted devices - phone, desktop, laptops or tablets. No special hardware needed. Together, your devices create vaults that no single device can access.",
    image: feature1Png,
  },
  {
    tag: "Vault Share",
    title: "Vault Shares = secure backups",
    description: (
      <p>
        Each device has a unique backup called "Vault Share", which are secure
        digital backups that eliminate the hassle of physical storage.
        <br />
        <span className="text-primaryAccent">
          <strong>Individual Vault-shares never store funds</strong> and can be
          safely imported/exported anywhere.
        </span>
      </p>
    ),
    image: feature2Png,
  },
  {
    tag: "Multi-Factor",
    title: "Private keys never exist in Vultisig",
    description:
      "Each vault is natively multi-factor. No assets can be accessed without collaboration. Access them remotely from anywhere in the world. Store each device's Vault Share separately and sleep soundly.",
    image: feature3Png,
  },
]

export default function HowItWorks() {
  const [imageLoading, setImageLoading] = useState(true)

  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      {/* HERO SECTION */}
      <section className="container mb-32">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h1 className="text-5xl font-semibold text-white mb-5">
            Wallet recovery <GradientText>re-imagined.</GradientText>
          </h1>
          <p className="text-gray-300 text-xl font-normal max-w-md mx-auto mb-0">
            Introducing Vultisig recovery: Vault shares instead of seed phrases.
          </p>
        </div>

        <div className="relative">
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                top: `${index * 30 + 100}px`,
                zIndex: 10 + index,
              }}
              className="
                bg-gradient-to-b from-background to-backgroundSecondary
                border border-borderLight rounded-3xl md:rounded-2xl
                min-h-[701px]
                lg:min-h-[400px]
                sticky
                overflow-hidden
              "
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4 pt-8 p-5 md:p-10">
                  <div className="inline-block bg-[#33E6BF]/[0.13] border border-[#33E6BF]/[0.5] text-[#33E6BF] px-3 py-1 rounded-full text-sm font-medium">
                    {feature.tag}
                  </div>
                  <h3 className="text-2xl lg:text-5xl font-bold text-white">
                    {index === 2 ? (
                      <>
                        Expand your wallet's power{" "}
                        <span className="text-lg lg:text-2xl">
                          (coming soon)
                        </span>
                      </>
                    ) : (
                      feature.title
                    )}
                  </h3>
                  <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="w-full h-[300px] md:h-[365px] md:w-[648px] relative">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
          {/* Spacer to allow cards to scroll past viewport */}
          <div className="h-[50vh]"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-16 mt-16">
          <div className="flex-1 flex justify-center mb-8 md:mb-0">
            {imageLoading && (
              <div className="w-[490px] h-[520px]">
                <Skeleton className="w-full h-full rounded-lg bg-slate-700/50 border border-[var(--border-color)] shadow-sm shadow-[var(--border-color)]" />
              </div>
            )}
            <img
              src="/images/hiw-1.svg"
              alt="Wallet recovery re-imagined illustration"
              width="490"
              height="520"
              className={`w-full max-w-[490px] h-auto object-contain rounded-xl ${imageLoading ? "hidden" : ""}`}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
          </div>
          <div className="flex-1 max-w-2xl flex flex-col justify-between h-full">
            <div className="text-left text-gray-300 text-lg mb-6">
              <p className="mb-4">
                With Vultisig, you bring your own trusted devices - phone,
                desktop, laptops or tablets. No special hardware needed.
              </p>
              <p className="mb-4">
                Together, your devices create vaults that no single device can
                access. Each device has a unique backup called{" "}
                <b>"Vault Share"</b>, which are secure digital backups that
                eliminate the hassle of physical storage.
              </p>
              <p className="mb-4 text-white font-semibold">
                The private key never exists in Vultisig, the devices just proof
                the collaborative access to it!
              </p>
              <p className="mb-4">
                Each vault is natively multi-factor -- No assets can be accessed
                without collaboration. Access them remotely from anywhere in the
                world.
              </p>
              <p>
                Store each device's Vault Share separately and sleep soundly.
              </p>
            </div>
            <div
              className="border  rounded-xl p-4 "
              style={{
                color: "var(--primary-accent)",
                borderColor: "var(--primary-accent)",
              }}
            >
              <span className="font-semibold">
                Individual Vault-shares never store funds
              </span>{" "}
              and can be safely imported/exported anywhere.
            </div>
          </div>
        </div>
      </section>

      {/* TRADITIONAL WALLETS SECTION */}
      <section className="container mb-32">
        <h2 className="text-5xl font-bold text-white text-center">
          How do <GradientText>traditional wallets</GradientText> work?
        </h2>
        <div className="flex justify-center mb-2">
          <img
            src="/images/hiw-2.svg"
            className="w-[600px] h-auto object-contain"
            style={{ transform: "scaleX(1.5) scaleY(1.5)" }}
          />
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          <Card
            className="
            bg-[var(--background-secondary)] border border-[var(--border-color)] rounded-2xl px-10 py-8 flex flex-col items-start min-h-[240px] max-w-sm mx-auto
            hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
            "
          >
            <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center mb-6">
              <Lock className="w-6 h-6 text-primaryAccent" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Private keys</h3>
            <p className="text-gray-300 text-base leading-relaxed">
              You need to trust the key generation process or you could lose
              your keys.
            </p>
          </Card>
          <Card
            className="
            bg-[var(--background-secondary)] border border-[var(--border-color)] rounded-2xl px-10 py-8 flex flex-col items-start min-h-[240px] max-w-sm mx-auto
            hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
            "
          >
            <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center mb-6">
              <img
                src="/images/hiw-seed-phrase.png"
                alt="Seed Phrase"
                className="w-6 h-6 object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Seed phrases</h3>
            <p className="text-gray-300 text-base leading-relaxed">
              A seed phrase is a human-readable representation of your private
              key using standardized words - stored in plain text accessible to
              anyone.
            </p>
          </Card>
          <Card
            className="
            bg-[var(--background-secondary)] border border-[var(--border-color)] rounded-2xl px-10 py-8 flex flex-col items-start min-h-[240px] max-w-sm mx-auto
            hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
            "
          >
            <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center mb-6">
              <Key className="w-6 h-6 text-primaryAccent" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              One Click. Gone.
            </h3>
            <p className="text-gray-300 text-base leading-relaxed">
              With traditional wallets, it only takes one click to drain your
              funds. One malicious transaction or signature could cost you your
              assets.
            </p>
          </Card>
        </div>
      </section>

      {/* SINGLE POINT OF FAILURE SECTION */}
      <section className="container mb-32">
        <h2 className="text-5xl font-bold text-white mb-8 text-center">
          Private keys: a <GradientText>single</GradientText> point of failure
        </h2>
        <p className="text-center text-gray-300 text-lg mb-10">
          VULTISIG eliminates the risks of traditional key management with
          next-gen crypto vaults.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Card 1 */}
          <div className="relative">
            <Card
              className="bg-[var(--background-secondary)] border border-[var(--border-color)] rounded-2xl p-10 flex flex-col items-start min-h-[340px] overflow-hidden relative
              hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
              "
            >
              <img
                src="/images/hiw-3.svg"
                className="absolute bottom-0 right-0 w-full h-auto max-w-[500px] object-contain opacity-80 pointer-events-none select-none"
              />
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
                Private key creation
              </h3>
              <p className="text-gray-300 mb-4 relative z-10">
                Generating keys on a single device is a ticking time bomb. One
                breach, one compromise - and it's game over.
              </p>
              <p className="text-gray-300 relative z-10">
                Self-custody shouldn't mean playing defense with your entire net
                worth.
              </p>
            </Card>
          </div>
          {/* Card 2 */}
          <div className="relative">
            <Card
              className="bg-[var(--background-secondary)] border border-[var(--border-color)] rounded-2xl p-10 flex flex-col items-start min-h-[340px] overflow-hidden relative
              hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
              "
            >
              <img
                src="/images/hiw-4.svg"
                alt="Storage of private keys illustration"
                width="500"
                height="400"
                className="absolute bottom-0 right-0 w-full h-auto max-w-[500px] object-contain opacity-80 pointer-events-none select-none"
              />
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
                Storage of private keys
              </h3>
              <p className="text-gray-300 mb-4 relative z-10">
                Keeping keys in one place? That's a single point of failure
                begging to be exploited.
              </p>
              <p className="text-gray-300 relative z-10">
                Whether it's a hack, misstep, or hardware loss - your access is
                only as strong as its weakest link.
              </p>
            </Card>
          </div>
        </div>
        {/* Card 3 */}
        <div className="relative">
          <Card
            className="bg-[var(--background-secondary)] border border-[var(--border-color)] rounded-2xl p-10 flex flex-col items-start min-h-[340px] overflow-hidden relative
            hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
            "
          >
            <img
              src="/images/hiw-5.svg"
              alt="Human error illustration"
              width="500"
              height="400"
              className="absolute bottom-0 right-0 w-full h-auto max-w-[500px] object-contain opacity-80 pointer-events-none select-none"
            />
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
              Human error
            </h3>
            <p className="text-gray-300 mb-2 relative z-10">
              Let's face it: people click bad links. Scams get smarter. Social
              engineering wins.
            </p>
            <p className="text-gray-300 relative z-10">
              Most drains happen not through code, but through trust. One
              mistake, and it's rekt.
            </p>
          </Card>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="container mb-32">
        <h2 className="text-5xl font-bold text-white mb-12 text-center">
          Frequently Asked <GradientText>Questions</GradientText>
        </h2>
        <div className="w-full flex justify-center items-center">
          <div className="w-full">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  q: "What is an MPC wallet?",
                  a: "An MPC (Multi-Party Computation) wallet splits your private key across multiple devices using threshold signatures. No single device ever holds the complete key, eliminating single points of failure.",
                  id: "faq-1",
                },
                {
                  q: "Is Vultisig safe if I lose a device?",
                  a: "Yes. Vultisig uses a threshold scheme (2-of-2 for Fast Vaults, 2-of-3 for Secure Vaults). You can recover your vault using the remaining devices or your Vault Share backups.",
                  id: "faq-2",
                },
                {
                  q: "What is a Vault Share?",
                  a: "A Vault Share is a secure digital backup unique to each device. Unlike seed phrases, Vault Shares never contain your complete private key and can be safely stored anywhere.",
                  id: "faq-3",
                },
                {
                  q: "Do I need special hardware?",
                  a: "No. Vultisig works with your existing devices - phones, tablets, laptops, and desktops. No special hardware wallets required.",
                  id: "faq-4",
                },
                {
                  q: "What's the difference between Fast Vault and Secure Vault?",
                  a: "Fast Vault is a 2-of-2 setup with instant server-assisted signing for everyday use. Secure Vault is a 2-of-3+ multi-device setup where you control all signing devices for maximum security.",
                  id: "faq-5",
                },
                {
                  q: "Can Vultisig access my funds?",
                  a: "No. Vultisig is fully self-custodial. Even with Fast Vaults, we only hold one share that cannot access funds alone. Your vault, your keys, your crypto.",
                  id: "faq-6",
                },
              ].map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="bg-[var(--background-secondary)] rounded-xl border-none
                  hover:border-[var(--border-color)]
                  hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
                  "
                >
                  <AccordionTrigger className="text-base xs:text-lg font-bold px-4 xs:px-6 py-3 xs:py-4 text-white [&>svg]:text-white hover:bg-transparent hover:no-underline focus:bg-transparent">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 px-4 xs:px-6 pb-4 xs:pb-6 pt-0 font-normal text-sm xs:text-base">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA SECTION (REUSED) */}
      <CtaSection />
    </main>
  )
}
