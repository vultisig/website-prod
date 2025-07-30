"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import React from "react"
import { Users, ArrowUpDown, DollarSign } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`bg-gradient-to-r from-[#33e6bf] to-cyan-400 bg-clip-text text-transparent font-bold ${className}`}>{children}</span>
  )
}

export default function VultPage() {
  return (
    <main className="min-h-screen pt-24 xs:pt-32 pb-20 px-2 xs:px-3 sm:px-4 bg-[var(--background)]">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto mb-24 xs:mb-16 sm:mb-20">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 xs:gap-6 sm:gap-10 z-10">
          <div className="flex-1 flex flex-col items-start justify-center mb-10 xs:mb-8 md:mb-0 w-full">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 xs:mb-5 sm:mb-6 leading-tight">
              The <GradientText className="inline-block font-extrabold">$VULT</GradientText> Token
            </h1>
            <p className="text-gray-300 text-base xs:text-lg mb-6 xs:mb-7 sm:mb-8 max-w-lg">
              $VULT is a cash-back application token (CBAT) and can be staked to receive $USDC.
            </p>
            {/* Carousel for cards on mobile */}
            <div className="w-full">
              <div className="flex md:hidden overflow-x-auto gap-4 mb-6 xs:mb-7 sm:mb-8 w-full px-1 -mx-1 snap-x snap-mandatory carousel-scrollbar">
                <Card className="bg-[#0B1B3B] border border-[var(--border-light)] rounded-xl px-4 xs:px-5 py-4 xs:py-5 flex flex-col items-start min-w-[80vw] max-w-xs w-full snap-center">
                  <div className="w-8 h-8 bg-[#193B7A] rounded-lg flex items-center justify-center mb-3 xs:mb-4">
                    <Users className="w-5 h-5 text-[#4879FD]" />
                  </div>
                  <span className="text-white text-lg xs:text-xl font-bold">100,000,000</span>
                  <span className="text-gray-400 text-xs mt-1">MAX SUPPLY</span>
                </Card>
                <Card className="bg-[#0B1B3B] border border-[var(--border-light)] rounded-xl px-4 xs:px-5 py-4 xs:py-5 flex flex-col items-start min-w-[80vw] max-w-xs w-full snap-center">
                  <div className="w-8 h-8 bg-[#193B7A] rounded-lg flex items-center justify-center mb-3 xs:mb-4">
                    <ArrowUpDown className="w-5 h-5 text-[#4879FD]" />
                  </div>
                  <span className="text-white text-lg xs:text-xl font-bold">0</span>
                  <span className="text-gray-400 text-xs mt-1">CIRCULATING SUPPLY</span>
                </Card>
                <Card className="bg-[#0B1B3B] border border-[var(--border-light)] rounded-xl px-4 xs:px-5 py-4 xs:py-5 flex flex-col items-start min-w-[80vw] max-w-xs w-full snap-center">
                  <div className="w-8 h-8 bg-[#193B7A] rounded-lg flex items-center justify-center mb-3 xs:mb-4">
                    <DollarSign className="w-5 h-5 text-[#4879FD]" />
                  </div>
                  <span className="text-white text-lg xs:text-xl font-bold">$1</span>
                  <span className="text-gray-400 text-xs mt-1">CURRENT PRICE</span>
                </Card>
              </div>
              {/* Row for md+ screens */}
              <div className="hidden md:flex flex-row gap-4 mb-6 xs:mb-7 sm:mb-8 w-full xs:w-auto">
                <Card className="
                  bg-[#0B1B3B] border border-[var(--border-light)]
                  rounded-xl px-4 xs:px-5 py-4 xs:py-5
                  flex flex-col items-start w-full xs:w-56 sm:w-64
                  hover:border-[var(--border-color)]
                  hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
                  ">
                  <div className="w-8 h-8 bg-[#193B7A] rounded-lg flex items-center justify-center mb-3 xs:mb-4">
                    <Users className="w-5 h-5 text-[#4879FD]" />
                  </div>
                  <span className="text-white text-lg xs:text-xl font-bold">100,000,000</span>
                  <span className="text-gray-400 text-xs mt-1">MAX SUPPLY</span>
                </Card>
                <Card className="
                  bg-[#0B1B3B] border border-[var(--border-light)]
                  rounded-xl px-4 xs:px-5 py-4 xs:py-5
                  flex flex-col items-start w-full xs:w-56 sm:w-64
                  hover:border-[var(--border-color)]
                  hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
                  ">
                  <div className="w-8 h-8 bg-[#193B7A] rounded-lg flex items-center justify-center mb-3 xs:mb-4">
                    <ArrowUpDown className="w-5 h-5 text-[#4879FD]" />
                  </div>
                  <span className="text-white text-lg xs:text-xl font-bold">0</span>
                  <span className="text-gray-400 text-xs mt-1">CIRCULATING SUPPLY</span>
                </Card>
                <Card className="
                  bg-[#0B1B3B] border border-[var(--border-light)]
                  rounded-xl px-4 xs:px-5 py-4 xs:py-5
                  flex flex-col items-start w-full xs:w-56 sm:w-64
                  hover:border-[var(--border-color)]
                  hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
                  ">
                  <div className="w-8 h-8 bg-[#193B7A] rounded-lg flex items-center justify-center mb-3 xs:mb-4">
                    <DollarSign className="w-5 h-5 text-[#4879FD]" />
                  </div>
                  <span className="text-white text-lg xs:text-xl font-bold">$1</span>
                  <span className="text-gray-400 text-xs mt-1">CURRENT PRICE</span>
                </Card>
              </div>
            </div>
            {/* Center button on xs/sm, left on md+ */}
            <div className="flex justify-center md:justify-start w-full">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 xs:px-8 sm:px-12 py-4 xs:py-6 sm:py-8 text-base xs:text-lg rounded-lg mt-2 w-full xs:w-auto max-w-xs md:max-w-none">
                Join the AirDrop
              </Button>
            </div>
          </div>
        </div>
        {/* Only show image on md+ screens, use absolute positioning */}
        <div className="hidden md:flex flex-1 justify-center items-center absolute top-[100px] right-[50px] z-0">
          <img
            src="/images/vult-1.svg"
            className="w-[30vw] lg:w-[50vw] h-auto object-contain max-w-[680px] min-w-[650px]"
          />
        </div>
      </section>

      {/* AIRDROP PARTICIPATION SECTION */}
      <section className="max-w-7xl mx-auto mb-24 xs:mb-16 sm:mb-20">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-4 xs:mb-5 sm:mb-6 max-w-2xl mx-auto">
          How to participate in the
          <br />
          <GradientText className="inline-block text-2xl xs:text-3xl sm:text-4xl md:text-5xl mt-2">$5M Vulsitig Airdrop</GradientText>
        </h2>
        <div className="w-full flex justify-center items-center">
          {/* Mobile carousel for cards 1-5, hide image */}
          <div className="flex md:hidden w-full">
            <div className="airdrop-carousel flex overflow-x-auto snap-x snap-mandatory gap-4 w-full px-1 -mx-1 carousel-scrollbar">
              {/* Card 1 */}
              <Card className="min-w-[320px] max-h-[50vw] snap-center bg-[var(--background-secondary)] border border-[var(--border-light)] rounded-2xl px-4 py-4 flex flex-col items-start shadow-lg">
                <div className="flex items-center w-full mb-2">
                  <span className="text-white font-extrabold text-lg xs:text-xl md:text-2xl flex-1">Download app</span>
                  <span className="ml-2 flex items-center justify-center w-8 xs:w-9 h-8 xs:h-9 rounded-full bg-cyan-900 text-cyan-400 font-bold text-base xs:text-lg">01</span>
                </div>
                <span className="text-gray-300 text-xs xs:text-sm mt-2">Start by downloading the Vulsitig app from the app store. Create an account to get access to the platform and airdrop.</span>
              </Card>
              {/* Card 2 */}
              <Card className="min-w-[320px] max-h-[50vw] snap-center bg-[var(--background-secondary)] border border-[var(--border-light)] rounded-2xl px-4 py-4 flex flex-col items-start shadow-lg">
                <div className="flex items-center w-full mb-2">
                  <span className="text-white font-extrabold text-lg xs:text-xl md:text-2xl flex-1">Setup multi-factor wallet</span>
                  <span className="ml-2 flex items-center justify-center w-8 xs:w-9 h-8 xs:h-9 rounded-full bg-cyan-900 text-cyan-400 font-bold text-base xs:text-lg">02</span>
                </div>
                <span className="text-gray-300 text-xs xs:text-sm mt-2">Create a Vulsitig Vault with multi-factor authentication to protect your assets and enhance your account security.</span>
              </Card>
              {/* Card 3 */}
              <Card className="min-w-[320px] max-h-[50vw] snap-center bg-[var(--background-secondary)] border border-[var(--border-light)] rounded-2xl px-4 py-4 flex flex-col items-start shadow-lg">
                <div className="flex items-center w-full mb-2">
                  <span className="text-white font-extrabold text-lg xs:text-xl md:text-2xl flex-1">Backup your Vault</span>
                  <span className="ml-2 flex items-center justify-center w-8 xs:w-9 h-8 xs:h-9 rounded-full bg-cyan-900 text-cyan-400 font-bold text-base xs:text-lg">03</span>
                </div>
                <span className="text-gray-300 text-xs xs:text-sm mt-2">Each device in a vault has its own backup share. Back it up.</span>
              </Card>
              {/* Card 4 */}
              <Card className="min-w-[320px] max-h-[50vw] snap-center bg-[var(--background-secondary)] border border-[var(--border-light)] rounded-2xl px-4 py-4 flex flex-col items-start shadow-lg">
                <div className="flex items-center w-full mb-2">
                  <span className="text-white font-extrabold text-lg xs:text-xl md:text-2xl flex-1">Transfer funds to Vaults</span>
                  <span className="ml-2 flex items-center justify-center w-8 xs:w-9 h-8 xs:h-9 rounded-full bg-cyan-900 text-cyan-400 font-bold text-base xs:text-lg">04</span>
                </div>
                <span className="text-gray-300 text-xs xs:text-sm mt-2">Deposit funds into Vulsitig vaults to qualify for the airdrop and participate in platform activities.</span>
              </Card>
              {/* Card 5 */}
              <Card className="min-w-[320px] max-h-[50vw] snap-center bg-[var(--background-secondary)] border border-[var(--border-light)] rounded-2xl px-4 py-4 flex flex-col items-start shadow-lg">
                <div className="flex items-center w-full mb-2">
                  <span className="text-white font-extrabold text-lg xs:text-xl md:text-2xl flex-1">Join the airdrop</span>
                  <span className="ml-2 flex items-center justify-center w-8 xs:w-9 h-8 xs:h-9 rounded-full bg-cyan-900 text-cyan-400 font-bold text-base xs:text-lg">05</span>
                </div>
                <span className="text-gray-300 text-xs xs:text-sm mt-2">Join the airdrop and follow the leaderboard on airdrop.vulsitig.com.</span>
              </Card>
            </div>
          </div>
          {/* Desktop grid with image and cards as before */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 grid-rows-5 md:grid-rows-2 gap-4 xs:gap-5 sm:gap-6 w-full max-w-full xs:max-w-2xl sm:max-w-4xl md:max-w-[1400px] relative">
            {/* 1: Top left */}
            <div className="row-start-1 col-start-1 flex justify-center items-center">
              <Card className="
                w-full xs:w-64 sm:w-80 min-w-[320px] bg-[var(--background-secondary)] border border-[var(--border-light)]
                rounded-2xl px-4 xs:px-5 py-5 flex flex-col items-start shadow-lg
                hover:border-[var(--border-color)]
                hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
                ">
                <div className="flex items-center w-full mb-2">
                  <span className="text-white font-extrabold text-lg xs:text-xl md:text-2xl flex-1">Download app</span>
                  <span className="ml-2 flex items-center justify-center w-8 xs:w-9 h-8 xs:h-9 rounded-full bg-cyan-900 text-cyan-400 font-bold text-base xs:text-lg">01</span>
                </div>
                <span className="text-gray-300 text-xs xs:text-sm mt-2">Start by downloading the Vulsitig app from the app store. Create an account to get access to the platform and airdrop.</span>
              </Card>
            </div>
            {/* 2: Top right */}
            <div className="row-start-1 col-start-3 flex justify-center items-center">
              <Card className="
                w-full xs:w-64 sm:w-80 min-w-[320px] bg-[var(--background-secondary)] border border-[var(--border-light)]
                rounded-2xl px-4 xs:px-5 py-5 flex flex-col items-start shadow-lg
                hover:border-[var(--border-color)]
                hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
                ">
                <div className="flex items-center w-full mb-2">
                  <span className="text-white font-extrabold text-lg xs:text-xl md:text-2xl flex-1">Setup multi-factor wallet</span>
                  <span className="ml-2 flex items-center justify-center w-8 xs:w-9 h-8 xs:h-9 rounded-full bg-cyan-900 text-cyan-400 font-bold text-base xs:text-lg">02</span>
                </div>
                <span className="text-gray-300 text-xs xs:text-sm mt-2">Create a Vulsitig Vault with multi-factor authentication to protect your assets and enhance your account security.</span>
              </Card>
            </div>
            {/* 3: Bottom left */}
            <div className="row-start-2 col-start-1 flex justify-center items-center">
              <Card className="
                w-full xs:w-64 sm:w-80 min-w-[320px] bg-[var(--background-secondary)] border border-[var(--border-light)]
                rounded-2xl px-4 xs:px-5 py-5 flex flex-col items-start shadow-lg
                hover:border-[var(--border-color)]
                hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
                ">
                <div className="flex items-center w-full mb-2">
                  <span className="text-white font-extrabold text-lg xs:text-xl md:text-2xl flex-1">Backup your Vault</span>
                  <span className="ml-2 flex items-center justify-center w-8 xs:w-9 h-8 xs:h-9 rounded-full bg-cyan-900 text-cyan-400 font-bold text-base xs:text-lg">03</span>
                </div>
                <span className="text-gray-300 text-xs xs:text-sm mt-2">Each device in a vault has its own backup share. Back it up.</span>
              </Card>
            </div>
            {/* Center phone image, spanning two rows */}
            <div className="row-start-1 row-end-3 col-start-2 flex justify-center items-center">
              <img src="/images/vult-2.svg" className="min-w-[400px] min-h-[450px] object-contain" />
            </div>
            {/* 4: Bottom right */}
            <div className="row-start-2 col-start-3 flex justify-center items-center">
              <Card className="
                w-full xs:w-64 sm:w-80 min-w-[320px] bg-[var(--background-secondary)] border border-[var(--border-light)]
                rounded-2xl px-4 xs:px-5 py-5 flex flex-col items-start shadow-lg
                hover:border-[var(--border-color)]
                hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
                ">
                <div className="flex items-center w-full mb-2">
                  <span className="text-white font-extrabold text-lg xs:text-xl md:text-2xl flex-1">Transfer funds to Vaults</span>
                  <span className="ml-2 flex items-center justify-center w-8 xs:w-9 h-8 xs:h-9 rounded-full bg-cyan-900 text-cyan-400 font-bold text-base xs:text-lg">04</span>
                </div>
                <span className="text-gray-300 text-xs xs:text-sm mt-2">Deposit funds into Vulsitig vaults to qualify for the airdrop and participate in platform activities.</span>
              </Card>
            </div>
            {/* 5: Bottom center */}
            <div className="row-start-4 md:row-start-3 col-start-1 md:col-start-2 flex justify-center items-center">
              <Card className="w-full xs:w-64 sm:w-80 min-w-[320px] bg-[var(--background-secondary)]
                border border-[var(--border-light)] rounded-2xl px-4 xs:px-5 py-5 flex flex-col items-start shadow-lg
                hover:border-[var(--border-color)]
                hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
                ">
                <div className="flex items-center w-full mb-2">
                  <span className="text-white font-extrabold text-lg xs:text-xl md:text-2xl flex-1">Join the airdrop</span>
                  <span className="ml-2 flex items-center justify-center w-8 xs:w-9 h-8 xs:h-9 rounded-full bg-cyan-900 text-cyan-400 font-bold text-base xs:text-lg">05</span>
                </div>
                <span className="text-gray-300 text-xs xs:text-sm mt-2">Join the airdrop and follow the leaderboard on airdrop.vulsitig.com.</span>
              </Card>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10 xs:mt-12 sm:mt-16">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 xs:px-8 sm:px-12 py-3 xs:py-4 text-base xs:text-lg rounded-lg w-full xs:w-auto">
            Join the AirDrop
          </Button>
        </div>
      </section>
      
      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto mt-16 xs:mt-20 sm:mt-24 mb-8 xs:mb-10 sm:mb-12 px-0 xs:px-2">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-8 xs:mb-10 sm:mb-12">
          Frequently asked <GradientText className="inline-block">questions</GradientText>
        </h2>
        <div className="w-full flex justify-center items-center">
          <div className="w-full">
            <Accordion type="single" collapsible className="space-y-3 xs:space-y-4">
              <AccordionItem value="faq-1" className="bg-[var(--background-secondary)] rounded-xl border-none
                hover:border-[var(--border-color)]
                hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
                ">
                <AccordionTrigger className="text-base xs:text-lg font-bold px-4 xs:px-6 py-3 xs:py-4 text-white [&>svg]:text-white hover:bg-transparent hover:no-underline focus:bg-transparent">
                  How do I register for the airdrop?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 px-4 xs:px-6 pb-4 xs:pb-6 pt-0 font-normal text-sm xs:text-base">
                  Become a Vultisig user and join the airdrop calculation.<br/><br/>
                  <span className="text-gray-400">Note: The airdrop is based on the total amount in your vault multiplied by the time the assets are held in the vault. The largest amounts for the longest time earn the most. Read more about it here.</span>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2" className="bg-[var(--background-secondary)] rounded-xl border-none
                hover:border-[var(--border-color)]
                hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
                ">
                <AccordionTrigger className="text-base xs:text-lg font-bold px-4 xs:px-6 py-3 xs:py-4 text-white [&>svg]:text-white hover:bg-transparent hover:no-underline focus:bg-transparent">
                  What assets are counted for the Airdrop?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 px-4 xs:px-6 pb-4 xs:pb-6 pt-0 font-normal text-sm xs:text-base">
                  Layer 1 assets and most tokens supported by Vultisig are counted. Other active assets such as LPs and Node Bonds from THORChain, MAYA Protocol and staked token are also valid.<br/>
                  See the full list here.<br/><br/>
                  You can register as many vaults as you wish.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3" className="bg-[var(--background-secondary)] rounded-xl border-none
                hover:border-[var(--border-color)]
                hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
                ">
                <AccordionTrigger className="text-base xs:text-lg font-bold px-4 xs:px-6 py-3 xs:py-4 text-white [&>svg]:text-white hover:bg-transparent hover:no-underline focus:bg-transparent">
                  What is the Airdrop process?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 px-4 xs:px-6 pb-4 xs:pb-6 pt-0 font-normal text-sm xs:text-base">
                  Your assets will accumulate VULTIES over a period of 12 months. At the end of this period, you will receive your share of the airdrop (5% of $VULT).
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Discord section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center mt-8">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white text-center">JOIN THE DISCORD TO REQUEST NEW FEATURES!</h3>
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