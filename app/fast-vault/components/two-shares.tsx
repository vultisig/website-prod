import Image from "next/image"

import SectionHeading from "@/components/ui/section-heading"

type Share = {
  title: string
  body: string
  icon: { src: string; alt: string }
}

const SHARES: Share[] = [
  {
    title: "Pair your device",
    body: "Your phone or laptop generates one vault share on setup. No seed phrase is ever created.",
    icon: {
      src: "/v5/fast-vault-pair-device.svg",
      alt: "Blue phone with a lightning bolt on its screen",
    },
  },
  {
    title: "Vultiserver co-signs",
    body: "A second share lives on Vultiserver, an automated co-signer. It can only participate, never initiate.",
    icon: {
      src: "/v5/fast-vault-cosign.svg",
      alt: "Purple server unit with plugged-in cables",
    },
  },
  {
    title: "Sign in one tap",
    body: "Approve on your device, Vultiserver adds its signature automatically. Two shares, one signature.",
    icon: {
      src: "/v5/fast-vault-one-tap.svg",
      alt: "Green badge with a check mark",
    },
  },
]

function ShareCard({ title, body, icon }: Share) {
  return (
    <li className="flex flex-1 flex-col gap-4 rounded-2xl bg-v5-white p-4 text-v5-text-inverse md:gap-5 md:rounded-3xl md:p-[30px]">
      <Image
        src={icon.src}
        alt={icon.alt}
        width={62}
        height={62}
        className="size-[42px] md:size-[62px]"
      />
      <div className="flex flex-col gap-3.5">
        <h3 className="text-v5-card-title-sm font-semibold md:text-v5-card-title">
          {title}
        </h3>
        <p className="text-v5-body-m-tight font-normal">{body}</p>
      </div>
    </li>
  )
}

export default function TwoShares() {
  return (
    <section className="bg-v5-page pt-8 md:px-[30px] md:pt-[30px]">
      <div className="mx-auto flex max-w-v5-content flex-col items-center gap-8 rounded-[20px] bg-v5-surface-dark px-4 py-9 md:gap-[50px] md:rounded-v5-panel md:p-[60px]">
        <SectionHeading
          tone="onDark"
          title="Two shares, one signature."
          subtitle="Fast Vault is a genuine 2-of-2 threshold setup."
        />
        <ul className="flex w-full flex-col gap-5 lg:flex-row">
          {SHARES.map((share) => (
            <ShareCard key={share.title} {...share} />
          ))}
        </ul>
      </div>
    </section>
  )
}
