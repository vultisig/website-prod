import Image from "next/image"

/** Orbit diameter the desktop pill coordinates below are expressed in. */
const ORBIT = 558

type Chain = {
  name: string
  /** Brand dot colour — data, so it stays inline rather than a theme token. */
  dot: string
  /** Pill top-left inside the orbit box, in orbit pixels. */
  x: number
  y: number
}

const CHAINS: Chain[] = [
  { name: "MayaChain", dot: "#2cfffc", x: 216, y: -19 },
  { name: "Bitcoin", dot: "#f7931a", x: 368, y: 19 },
  { name: "Hyperliquid", dot: "#97fce4", x: 458, y: 120 },
  { name: "Ethereum", dot: "#8c8c8c", x: 500, y: 259 },
  { name: "Dogecoin", dot: "#ba9f33", x: 464, y: 399 },
  { name: "BNB Chain", dot: "#f0b90b", x: 358, y: 501 },
  { name: "THORChain", dot: "#18e4cd", x: 216, y: 539 },
  { name: "Solana", dot: "#aa51ea", x: 93, y: 501 },
  { name: "TRON", dot: "#ff060a", x: -9, y: 399 },
  { name: "XRP Ledger", dot: "#ffffff", x: -62, y: 259 },
  { name: "Zcash", dot: "#f3b724", x: -10, y: 119 },
  { name: "Polygon", dot: "#6600ff", x: 89, y: 19 },
]

function percent(value: number): string {
  return `${(value / ORBIT) * 100}%`
}

function ChainPill({ name, dot, x, y }: Chain) {
  return (
    <li
      style={{ left: percent(x), top: percent(y) }}
      className="static flex h-[38px] items-center gap-2 whitespace-nowrap rounded-[10px] border border-v5-border-light bg-v5-surface-2 px-[17px] text-v5-body-s font-medium text-v5-text-primary backdrop-blur-[2px] md:absolute"
    >
      <span
        aria-hidden
        style={{ backgroundColor: dot }}
        className="size-2 shrink-0 rounded-full"
      />
      {name}
    </li>
  )
}

export default function ChainsSection() {
  return (
    <section
      id="chains"
      className="scroll-mt-24 bg-v5-page pt-4 md:px-[30px] md:pt-[30px]"
    >
      <div className="mx-auto max-w-v5-content">
        <div className="flex flex-col items-center gap-8 rounded-[20px] bg-v5-surface-dark px-4 pb-12 pt-5 md:gap-[60px] md:rounded-v5-panel md:p-[60px]">
          <h2 className="text-center text-v5-display-sm font-medium text-v5-text-primary md:text-v5-headline">
            One Vault. <span className="text-v5-accent">30+ Blockchains.</span>
          </h2>

          <div className="flex flex-col items-center gap-8 md:relative md:size-[558px] md:rounded-full md:border md:border-v5-border-ring">
            <Image
              src="/v5/vultisig-mark.svg"
              alt="Vultisig vault"
              width={82}
              height={82}
              className="size-16 md:absolute md:left-1/2 md:top-1/2 md:size-[82px] md:-translate-x-1/2 md:-translate-y-1/2"
            />
            <ul className="flex flex-wrap justify-center gap-3 md:contents">
              {CHAINS.map((chain) => (
                <ChainPill key={chain.name} {...chain} />
              ))}
            </ul>
          </div>

          <p className="text-center text-v5-body-m font-normal text-v5-text-secondary">
            Multi-chain support built-in. No additional setup required.
          </p>
        </div>
      </div>
    </section>
  )
}
