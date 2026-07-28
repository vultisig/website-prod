import Image from "next/image"

import BentoCard, { BentoCopy } from "@/components/ui/bento-card"

export default function ChainsCard() {
  return (
    <BentoCard height="tall" className="justify-end bg-v5-highlight">
      <Image
        src="/v5/bento-chains.webp"
        alt=""
        fill
        sizes="(max-width: 1023px) 100vw, 33vw"
        className="object-cover object-left-top"
      />
      <BentoCopy
        title={
          <>
            30+ chains.
            <br />
            One vault.
          </>
        }
        body="Bitcoin to Solana to Cosmos - every major chain, natively supported. No bridging needed."
      />
    </BentoCard>
  )
}
