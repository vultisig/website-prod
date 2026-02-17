import { Button } from "@/components/ui/button"
import Image from "next/image"
import vultisigLogoTextPng from "../public/images/vultisig-logo-text.png"
import bannerPng from "../public/images/banner-bg-download-vultisig.png"

export default function CtaSection() {
  return (
    <section className="py-20 container">
      <div className="relative border border-borderLight rounded-2xl overflow-hidden md:aspect-[2.7/1]">
        <Image
          src={bannerPng}
          alt="Banner background"
          className="w-full h-full absolute inset-0 object-cover object-right max-md:opacity-50"
        />
        <div className="relative h-full flex flex-col justify-center gap-4 md:gap-8 items-start max-w-xl p-6 md:pl-12">
          <Image
            src={vultisigLogoTextPng}
            alt="Vultisig logo text"
            className="w-24 md:w-40"
          />
          <strong className="capitalize text-2xl text-balance md:text-5xl">
            Secure your digital{" "}
            <span className="text-secondaryAccent">assets</span> now!
          </strong>
          <Button variant={"primaryBlue"} className="md:h-12 md:px-7">
            Download Vultisig
          </Button>
        </div>
      </div>
    </section>
  )
}
