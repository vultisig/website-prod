import React from "react"
import Image from "next/image"
import feature1Png from "../images/image1.png"
import feature2Png from "../images/image2.png"
import feature3Png from "../images/image3.png"
import Heading from "./Heading"
import RadialBackground from "./RadialBackground"
import { cn, MOTION_CONSTANTS } from "@/lib/utils"

export default function MpcWallet() {
  return (
    <section className="container relative" id="what-is-an-mpc-wallet?">
      <Heading>What Is an MPC Wallet?</Heading>
      <div className="grid md:grid-cols-3 gap-5 mb-12">
        {[
          {
            image: feature1Png,
            title: "Key Never Exists",
            description:
              "An MPC wallet uses Multi-Party Computation to sign transactions without ever creating a complete private key. Each device holds only a partial key shard. The full key is never assembled, stored, or exposed anywhere. Not on your device, not on a server, not even during signing.",
          },
          {
            image: feature2Png,
            title: "Distributed by Design",
            description:
              "Instead of trusting one device or one backup, MPC distributes cryptographic key shares across multiple independent devices. To authorize a transaction, a threshold of devices must cooperate. No single device can act alone, and no single compromise can drain your wallet.",
          },
          {
            image: feature3Png,
            title: "The Key Difference",
            description: (
              <>
                Traditional wallets store your full private key in one place.
                Hardware wallets wrap it in better packaging, but it's still a
                single secret. <br />
                MPC eliminates the single secret entirely. There is no master
                key to steal, no seed phrase to phish, and no backup to lose.
              </>
            ),
          },
        ].map((step, idx) => (
          <div
            key={step.title}
            className={cn(
              "relative bg-backgroundSecondary/40 pt-56 flex flex-col justify-end border border-borderLight rounded-[20px] overflow-hidden hover:border-primaryAccent/40 transition-colors",
              "intersect-once intersect:motion-preset-slide-up-md",
            )}
            style={
              {
                "--motion-delay": `${idx * MOTION_CONSTANTS.delayBetween}ms`,
              } as React.CSSProperties
            }
          >
            <Image
              src={step.image}
              alt={step.title}
              className="w-full absolute top-0 left-0 object-cover object-top opacity-90"
            />
            <div className="relative pt-4 bg-gradient-to-b from-backgroundSecondary/15 to-backgroundSecondary/70 p-7">
              <h3 className="text-2xl text-textPrimary font-medium mb-4">
                {step.title}
              </h3>
              <p className="text-textSecondary text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
