import React from "react"
import Heading from "./Heading"
import { BsEyeSlash, BsPersonSlash, BsShieldSlash } from "react-icons/bs"
import { Badge } from "@/components/ui/badge"
import noTrackPng from "../images/7_no-track-bg.png"
import Image from "next/image"

export default function NoTrack() {
  return (
    <section className="px-6 md:px-20 py-20 max-w-5xl mx-auto flex flex-col items-center gap-[70px] relative">
      <div>
        <Heading className="mb-8">
          We Don't Track You.{" "}
          <span className="text-primaryAccent">Period.</span>
        </Heading>
        <p className="text-center text-textSecondary mx-auto text-balance">
          Vultisig is a truly private wallet. We can't see your balances, we
          don't collect your data, and we do not store any information. Like
          self-custody should be done.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { title: "No account creation", icon: BsPersonSlash },
          { title: "No email required", icon: BsEyeSlash },
          { title: "No balance tracking", icon: BsShieldSlash },
        ].map((item, idx) => (
          <div
            key={idx}
            className="relative bg-backgroundSecondary/40 border border-borderLight rounded-2xl"
          >
            <Image
              src={noTrackPng}
              alt="Vultisig"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none rounded-[20px]"
            />
            <div className="relative flex items-center gap-3 p-5">
              <Badge variant={"secondary"} size={"icon"}>
                <item.icon className="size-6" />
              </Badge>
              <h3 className="text-textPrimary">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <p className="italic text-textSecondary text-sm text-balance text-center p-8">
        All wallet operations happen locally on your devices. No data leaves
        your phone. No telemetry, no tracking pixels, no third-party analytics.
        Your financial activity is yours alone. Your transaction history,
        balances, and blockchain interactions are known only to you and the
        public blockchain - by default never to Vultisig.
      </p>
    </section>
  )
}
