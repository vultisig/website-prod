import Image from "next/image"
import SectionBadge from "@/components/ui/section-badge"
import MaxSecurityCard from "@/components/max-security-card"

/* ───────── Card 2: M-of-N Signing ───────── */
function MofNCard() {
  return (
    <div className="bg-cardSurface/50 border border-borderLight rounded-3xl overflow-hidden flex flex-col items-start justify-between p-[30px] min-h-[400px] lg:h-[423px]">
      {/* Device pairing UI */}
      <div className="flex flex-col gap-3 pt-5 w-full">
        {/* Device 1: iPhone */}
        <div className="bg-backgroundSecondary border border-borderLight rounded-3xl flex items-center gap-3 p-4">
          <Image
            src="/images/device-iphone.svg"
            alt=""
            width={32}
            height={32}
            className="shrink-0 rounded-full shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">iPhone</p>
            <p className="text-xs font-medium text-[#13c89d] tracking-wide">
              This device
            </p>
          </div>
          <div className="bg-borderLight rounded-full px-4 py-2">
            <span className="text-xs text-textSecondary tracking-wide">
              1 of 3
            </span>
          </div>
        </div>
        {/* Device 2: Waiting */}
        <div className="bg-[rgba(6,27,58,0.5)] border border-white/[0.03] border-dashed rounded-3xl flex items-center gap-3 p-4 shadow-[0_-4px_12px_rgba(3,13,29,0.35)]">
          <Image
            src="/images/device-waiting-icon.svg"
            alt=""
            width={32}
            height={32}
            className="shrink-0 rounded-full"
          />
          <p className="flex-1 text-[13px] font-medium text-textSecondary tracking-wide">
            Waiting for device to join
          </p>
          <div className="bg-borderLight rounded-full px-4 py-2">
            <span className="text-xs text-textSecondary tracking-wide">
              2 of 3
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[18px]">
        <h3 className="text-[22px] font-medium text-textPrimary leading-[24px] tracking-tight">
          M-of-N signing.
        </h3>
        <p className="text-sm text-textSecondary leading-relaxed tracking-tight">
          Every transaction requires your threshold of devices. No single device
          can act alone.
        </p>
      </div>
    </div>
  )
}

/* ───────── Card 3: Cross-chain Swaps ───────── */
function SwapsCard() {
  return (
    <div className="bg-cardSurface/50 border border-borderLight rounded-3xl overflow-hidden flex flex-col items-start justify-between p-[30px] min-h-[260px] lg:h-[277px]">
      {/* Swap widget */}
      <div className="flex flex-col gap-2 w-full">
        {/* From: RUNE */}
        <div className="bg-backgroundSecondary border border-borderLight rounded-t-3xl rounded-b-xl p-4 flex items-center justify-between">
          <div className="bg-borderLight rounded-full pl-1.5 pr-3 py-1.5 flex items-center gap-2">
            <Image
              src="/images/chains/rune.svg"
              alt="RUNE"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="text-xs font-medium text-textPrimary tracking-wide">
              RUNE
            </span>
          </div>
          <div className="text-right">
            <p className="text-[22px] font-medium text-textSecondary leading-[24px] tracking-tight">
              1,000
            </p>
            <p className="text-xs font-medium text-textTertiary tracking-wide">
              $1,116.28
            </p>
          </div>
        </div>
        {/* To: BTC */}
        <div className="bg-cardSurface/50 border border-borderLight rounded-t-xl rounded-b-3xl p-4 flex items-center justify-between relative">
          <div className="bg-borderLight rounded-full pl-1.5 pr-3 py-1.5 flex items-center gap-2">
            <Image
              src="/images/chains/btc-coin.svg"
              alt="BTC"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="text-xs font-medium text-white tracking-wide">
              BTC
            </span>
          </div>
          <div className="text-right">
            <p className="text-[22px] font-medium text-textSecondary leading-[24px] tracking-tight">
              0.0125
            </p>
            <p className="text-xs font-medium text-textTertiary tracking-wide">
              $1,115.12
            </p>
          </div>
        </div>
        {/* Swap icon overlay */}
        {/* <div className="absolute left-1/2 top-[calc(50%-10px)] -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-cardSurface/50 border border-borderLight rounded-full p-[7px] size-12 flex items-center justify-center">
            <div className="bg-[#2155df] rounded-[18px] size-8 flex items-center justify-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="text-white"
              >
                <path
                  d="M7 1v12M7 1l-3 3M7 1l3 3M7 13l-3-3M7 13l3-3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div> */}
      </div>

      <h3 className="text-[22px] font-medium text-textPrimary leading-[24px] tracking-tight mt-2">
        Cross-chain swaps
      </h3>
    </div>
  )
}

/* ───────── Card 4: Secure Notifications ───────── */
function NotificationsCard() {
  return (
    <div className="bg-cardSurface/50 border border-borderLight rounded-3xl overflow-hidden flex flex-col gap-[18px] items-start justify-end p-[30px] min-h-[260px] lg:h-[277px] relative">
      {/* Phone with notification */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-[30px] w-[340px] h-[240px]">
        {/* Phone body */}
        <div className="absolute inset-x-[1%] top-0 bottom-0 rounded-[37px] bg-[url('/images/hero/notif-bg.svg')] bg-center bg-no-repeat" />
        {/* Notification */}
        <div className="absolute top-[80px] left-0 right-0 mx-[14px] backdrop-blur-xl rounded-3xl overflow-hidden">
          <div className="bg-white/70 px-4 py-3 flex items-center gap-3">
            <Image
              src="/images/hero/app-icon.svg"
              alt="Vultisig"
              width={34}
              height={34}
              className="rounded-lg shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-black leading-tight">
                  Join keysign
                </p>
                <p className="text-[11px] text-[#3d3d3d]">9:41 AM</p>
              </div>
              <p className="text-[13px] text-black leading-tight">
                MacBook Pro wants to sign
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-[22px] font-medium text-textPrimary leading-[24px] tracking-tight relative z-10">
        Secure notifications
      </h3>
    </div>
  )
}

/* ───────── Card 5: 100% Open Source ───────── */
function OpenSourceCard() {
  return (
    <div className="bg-cardSurface/50 border border-borderLight rounded-3xl overflow-hidden flex flex-col items-start justify-between p-[30px] min-h-[260px] lg:h-[277px]">
      <div className="flex flex-col gap-3 w-full">
        {/* GitHub link */}
        <div className="bg-backgroundSecondary border border-borderLight rounded-3xl flex items-center gap-4 px-6 py-4">
          <Image
            src="/images/github-icon.svg"
            alt="GitHub"
            width={24}
            height={24}
            className="shrink-0"
          />
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-sm font-medium text-textPrimary leading-[20px]">
              github.com/vultisig
            </p>
            <p className="text-xs font-medium text-textSecondary tracking-wide leading-[16px]">
              All source code - public
            </p>
          </div>
          <svg
            className="w-5 h-5 text-textTertiary shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 17L17 7M17 7H7M17 7v10"
            />
          </svg>
        </div>
        {/* Trail of Bits */}
        <div className="bg-backgroundSecondary border border-borderLight rounded-3xl flex items-center gap-4 px-6 py-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-textPrimary leading-[20px]">
              Trail of Bits
            </p>
            <p className="text-xs font-medium text-textSecondary tracking-wide leading-[16px]">
              DKLS23 protocol audit
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-[22px] font-medium text-textPrimary leading-[24px] tracking-tight">
        100% open source.
      </h3>
    </div>
  )
}

/* ───────── Card 6: 30+ Chains ───────── */
function ChainsCard() {
  const row1 = ["avax", "btc", "dash", "doge", "eth", "eth"] // second eth fades out to suggest more chains
  const row2 = ["maya", "sol", "vult", "trx", "xrp"]

  return (
    <div className="bg-cardSurface/50 border border-borderLight rounded-3xl overflow-hidden flex flex-col gap-[18px] items-start justify-end p-[30px] min-h-[400px] lg:h-[423px] relative">
      {/* Chain logos grid — overflows right edge to suggest more chains */}
      <div className="absolute top-[82px] -left-[28px] right-[-40px] flex flex-col gap-5">
        <div className="flex gap-5 items-center">
          {row1.map((chain, i) => (
            <div
              key={`${chain}-${i}`}
              className={`bg-primaryAccent/10 rounded-full p-[13px] shrink-0 ${
                i === row1.length - 1 ? "opacity-40" : ""
              }`}
            >
              <Image
                src={`/images/chains/${chain}.svg`}
                alt={chain.toUpperCase()}
                width={42}
                height={42}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-5 items-center">
          {row2.map((chain, i) => (
            <div
              key={chain}
              className={`bg-primaryAccent/10 rounded-full p-[13px] shrink-0 ${
                i === row2.length - 1 ? "opacity-40" : ""
              }`}
            >
              <Image
                src={`/images/chains/${chain}.svg`}
                alt={chain.toUpperCase()}
                width={42}
                height={42}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[18px] relative z-10">
        <h3 className="text-[22px] font-medium text-textPrimary leading-[24px] tracking-tight">
          30+ chains.
          <br />
          One vault.
        </h3>
        <p className="text-sm text-textSecondary leading-relaxed tracking-tight">
          Bitcoin to Solana to Cosmos - every major chain, natively supported.
          No bridging needed.
        </p>
      </div>
    </div>
  )
}

/* ───────── Card 7: Hold $VULT ───────── */
function VultCard() {
  return (
    <div className="bg-cardSurface/50 border border-borderLight rounded-3xl overflow-hidden flex flex-col items-start justify-between p-[30px] min-h-[400px] lg:h-[423px]">
      {/* Tier cards stack */}
      <div className="w-full relative h-[205px]">
        {/* Gold (faded, behind) */}
        <div className="absolute top-[30px] left-[31px] w-[281px] bg-backgroundSecondary border border-borderLight rounded-xl p-3 opacity-50">
          <div className="flex items-center gap-2.5">
            <div className="w-[34px] h-[34px] rounded-full border border-[#ffc25c] bg-[#041733] overflow-hidden relative">
              <Image
                src="/images/tiers/gold-icon.svg"
                alt=""
                fill
                sizes="42px"
                loading="lazy"
                className="object-contain p-1.5"
              />
            </div>
            <span className="text-sm font-medium text-textPrimary">Gold</span>
          </div>
        </div>
        {/* Platinum (middle) */}
        <div className="absolute top-[54px] left-[16px] w-[311px] bg-backgroundSecondary border border-borderLight rounded-xl p-3.5 opacity-70">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-[38px] h-[38px] rounded-full border border-secondaryAccent bg-[#041733] overflow-hidden relative">
                <Image
                  src="/images/tiers/platinum-icon.svg"
                  alt=""
                  fill
                  sizes="42px"
                  loading="lazy"
                  className="object-contain p-1.5"
                />
              </div>
              <span className="text-[15px] font-medium text-textPrimary">
                Platinum
              </span>
            </div>
            <span className="text-xs text-textSecondary tracking-wide">
              Discount: 25bps
            </span>
          </div>
        </div>
        {/* Diamond */}
        <div className="absolute top-[81px] left-[8px] w-[327px] bg-backgroundSecondary border border-borderLight rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full border border-[#9747ff] bg-[#041733] overflow-hidden shadow-md relative">
                <Image
                  src="/images/tiers/diamond-icon.svg"
                  alt=""
                  fill
                  sizes="42px"
                  loading="lazy"
                  className="object-contain p-1.5"
                />
              </div>
              <span className="text-base font-medium text-textPrimary">
                Diamond
              </span>
            </div>
            <span className="text-xs text-textSecondary tracking-wide">
              Discount: 35bps
            </span>
          </div>
        </div>
        {/* Ultimate (highlighted) */}
        <div
          className="absolute top-[131px] left-0 w-[343px] rounded-2xl p-4"
          style={{
            backgroundImage:
              "linear-gradient(-15deg, rgb(47, 99, 236) 18%, rgb(4, 57, 199) 82%)",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-[42px] h-[42px] rounded-full border border-[#041022] bg-[#041733] overflow-hidden shadow-md relative">
                <Image
                  src="/images/tiers/ultimate-icon.svg"
                  alt=""
                  fill
                  sizes="42px"
                  loading="lazy"
                  className="object-contain p-1.5"
                />
              </div>
              <span className="text-[17px] font-medium text-textPrimary">
                Ultimate
              </span>
            </div>
            <span className="text-[13px] font-medium text-textSecondary tracking-wide">
              No Fee
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[18px]">
        <h3 className="text-[22px] font-medium text-textPrimary leading-[24px] tracking-tight">
          Hold $VULT.
          <br />
          Trade for free.
        </h3>
        <p className="text-sm text-textSecondary leading-relaxed tracking-tight">
          Reduce swap fees from 50bps down to 0.
          <br />
          Six tiers - starting at 1,500 $VULT.
        </p>
      </div>
    </div>
  )
}

/* ───────── Main Bento Grid ───────── */
export default function BestFeaturesSection() {
  return (
    <section className="py-16 container">
      {/* Header */}
      <div className="text-center mb-12 flex flex-col items-center gap-4">
        <SectionBadge label="Everything in one place" />

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-textPrimary tracking-tight">
          Best features in one place
        </h2>

        <p className="text-lg text-textSecondary tracking-tight max-w-2xl">
          Multi-chain asset management, keyless security, DeFi access, and
          built-in swaps - all inside one secure vault environment.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {/* Column 1 — 2 tall cards */}
        <div className="flex flex-col gap-3.5">
          <MaxSecurityCard />
          <MofNCard />
        </div>

        {/* Column 2 — 3 medium cards */}
        <div className="flex flex-col gap-3.5">
          <SwapsCard />
          <NotificationsCard />
          <OpenSourceCard />
        </div>

        {/* Column 3 — 2 tall cards */}
        <div className="flex flex-col gap-3.5">
          <ChainsCard />
          <VultCard />
        </div>
      </div>
    </section>
  )
}
