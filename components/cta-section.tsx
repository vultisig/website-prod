import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import vultisigLogoTextPng from "../public/images/vultisig-logo-text.png"
import bannerPng from "../public/images/banner-bg-download-vultisig.png"
import DiscordSection from "./discord-section"

export default function CtaSection() {
  return (
    <div className="container pb-10">
      <section className="container relative border border-borderLight rounded-2xl overflow-hidden md:aspect-[2.7/1] intersect-once intersect:motion-preset-slide-up-md">
        <Image
          src={bannerPng}
          alt="Banner background"
          className="w-full h-full absolute inset-0 object-cover object-right max-md:opacity-50"
        />
        <div className="relative h-full flex flex-col justify-center gap-4 md:gap-6 items-start max-w-xl p-6 md:pl-12">
          <Image
            src={vultisigLogoTextPng}
            alt="Vultisig logo text"
            className="w-24 md:w-40"
          />
          <strong className="capitalize text-2xl text-balance md:text-5xl">
            The Only Wallet You&apos;ll Ever Need.
          </strong>
          <p className="text-textSecondary text-sm md:text-base leading-relaxed">
            No seed phrase. No subscription. No custodian. Just your crypto,
            secured by math &mdash; not trust.
          </p>
          <Link href="/downloads">
            <Button variant={"primaryBlue"} className="md:h-12 md:px-7">
              Download Vultisig
            </Button>
          </Link>
        </div>
      </section>
      {DiscordSection()}
    </div>
  )
}
