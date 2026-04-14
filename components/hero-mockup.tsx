import Image from "next/image"

/*
  Figma frame: 658 x 654
  All positions are exact percentages from Figma coordinates.
  Phone center group starts at x=81, y=56 within the 658x654 frame.
*/

export default function HeroMockup() {
  return (
    <div className="relative w-full max-w-[380px] sm:max-w-[520px] lg:max-w-[658px] mx-auto aspect-[658/654]">
      <Image
        src="/images/hero/bg.png"
        alt="Hero Mockup"
        fill
        priority
        quality={72}
        sizes="(max-width: 640px) 380px, (max-width: 1024px) 520px, 658px"
        className="absolute left-[4%] top-0 h-full object-contain"
      />

      <Image
        src="/images/hero/vault.svg"
        alt="Vault screen"
        width={125}
        height={250}
        loading="lazy"
        className="absolute right-[26.3%] top-[30.5%] hidden sm:block w-[19%] h-auto"
      />

      <Image
        src="/images/hero/holding-vault.svg"
        alt="Holding vault screen"
        width={145}
        height={290}
        loading="lazy"
        className="absolute left-[22%] sm:left-[25.6%] top-[22.5%] w-[28%] sm:w-[22%] h-auto"
      />

      <Image
        src="/images/hero/swap.svg"
        alt="Swap screen"
        width={178}
        height={350}
        loading="lazy"
        className="absolute left-[12.3%] top-[33.5%] hidden sm:block w-[27%] h-auto"
      />

      <Image
        src="/images/hero/waiting.svg"
        alt="Waiting screen"
        width={184}
        height={360}
        loading="lazy"
        className="absolute right-[12%] sm:right-[14.3%] top-[39%] sm:top-[47.5%] w-[34%] sm:w-[28%] h-auto"
      />

      <Image
        src="/images/hero/qr.png"
        alt="QR code screen"
        width={125}
        height={250}
        loading="lazy"
        className="absolute left-[19.3%] top-[55.5%] hidden md:block w-[19%] h-auto"
      />
    </div>
  )
}
