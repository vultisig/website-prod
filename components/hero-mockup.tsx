import Image from "next/image"

/*
  Figma frame: 658 x 654
  All positions are exact percentages from Figma coordinates.
  Phone center group starts at x=81, y=56 within the 658x654 frame.
*/

export default function HeroMockup() {
  return (
    <div className="relative w-full max-w-[658px] mx-auto aspect-[658/654]">
      <img
        src="/images/hero/bg.png"
        alt="Hero Mockup"
        className="absolute left-[4%] top-0 h-full"
      />

      <img
        src="/images/hero/vault.svg"
        alt="Phone Mockup"
        width="19%"
        className="absolute right-[26.3%] top-[30.5%]"
      />

      <img
        src="/images/hero/holding-vault.svg"
        alt="Phone Mockup"
        width="22%"
        className="absolute left-[24.6%] top-[23.5%]"
      />

      <img
        src="/images/hero/swap.svg"
        alt="Phone Mockup"
        width="27%"
        className="absolute left-[9.3%] top-[33.5%]"
      />

      <img
        src="/images/hero/waiting.svg"
        alt="Phone Mockup"
        width="28%"
        className="absolute right-[18.3%] top-[47.5%]"
      />

      <img
        src="/images/hero/qr.png"
        alt="Phone Mockup"
        width="19%"
        className="absolute left-[16.3%] top-[55.5%]"
      />
    </div>
  )
}
