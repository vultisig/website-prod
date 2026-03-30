import Image from "next/image"

/*
  Figma frame: 658 x 654
  All positions are exact percentages from Figma coordinates.
  Phone center group starts at x=81, y=56 within the 658x654 frame.
*/

export default function HeroMockup() {
  return (
    <div className="relative w-full max-w-[658px] mx-auto aspect-[658/654]">
      <Image
        src="/images/hero/bg.png"
        alt="Hero Mockup"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 53vw"
        className="absolute left-[4%] top-0 h-full object-contain"
      />

      <Image
        src="/images/hero/vault.svg"
        alt="Phone Mockup"
        width={125}
        height={250}
        className="absolute right-[26.3%] top-[30.5%] w-[19%] h-auto"
      />

      <Image
        src="/images/hero/holding-vault.svg"
        alt="Phone Mockup"
        width={145}
        height={290}
        className="absolute left-[25.6%] top-[22.5%] w-[22%] h-auto"
      />

      <Image
        src="/images/hero/swap.svg"
        alt="Phone Mockup"
        width={178}
        height={350}
        className="absolute left-[12.3%] top-[33.5%] w-[27%] h-auto"
      />

      <Image
        src="/images/hero/waiting.svg"
        alt="Phone Mockup"
        width={184}
        height={360}
        className="absolute right-[14.3%] top-[47.5%] w-[28%] h-auto"
      />

      <Image
        src="/images/hero/qr.png"
        alt="Phone Mockup"
        width={125}
        height={250}
        className="absolute left-[19.3%] top-[55.5%] w-[19%] h-auto"
      />
    </div>
  )
}
