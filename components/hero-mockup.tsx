import Image from "next/image"

/*
  Figma frame: 658 x 654
  All positions are exact percentages from Figma coordinates.
  Phone center group starts at x=81, y=56 within the 658x654 frame.
*/

export default function HeroMockup() {
  return (
    <div className="relative w-full max-w-[658px] mx-auto" style={{ aspectRatio: "658/654" }}>
      {/* Background glows — behind everything */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image src="/images/hero/glow-2.svg" alt="" width={222} height={320} className="absolute" style={{ top: "10%", left: "20%", width: "34%" }} />
        <Image src="/images/hero/glow-3.svg" alt="" width={222} height={320} className="absolute mix-blend-plus-lighter" style={{ top: "10%", left: "30%", width: "34%" }} />
        <Image src="/images/hero/glow-5.svg" alt="" width={314} height={423} className="absolute" style={{ top: "40%", left: "55%", width: "48%" }} />
        <Image src="/images/hero/glow-6.svg" alt="" width={314} height={346} className="absolute mix-blend-plus-lighter" style={{ top: "38%", left: "48%", width: "48%" }} />
      </div>

      {/* iPhone body + screen — center piece */}
      {/* Figma: x=220, y=56, w=306, h=595 → left: 33.4%, top: 8.6%, width: 46.5% */}
      <div className="absolute z-10" style={{ left: "33.4%", top: "8.6%", width: "46.5%" }}>
        <div className="relative">
          <Image
            src="/images/hero/iphone-body.png"
            alt=""
            width={612}
            height={612}
            className="w-full h-auto"
            priority
          />
          <div className="absolute overflow-hidden rounded-[8%]" style={{ top: "5.5%", left: "9.4%", width: "37.5%", height: "89%" }}>
            <Image
              src="/images/hero/screen-content.png"
              alt="Vultisig wallet portfolio showing $53,010.77"
              width={491}
              height={1059}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>
        </div>
      </div>

      {/* Swap widget — overlaps phone left side */}
      {/* Figma: x=81, y=199, w=196, h=119 → left: 12.3%, top: 30.4%, width: 29.8% */}
      <div className="absolute z-20" style={{ left: "12.3%", top: "30.4%", width: "29.8%" }}>
        <div className="bg-[#061b3a] rounded-[21px] p-[7px] shadow-[0px_8px_16px_rgba(0,0,0,0.25),0px_-2px_7px_rgba(3,13,29,0.35)] relative">
          <div className="flex flex-col gap-[5px]">
            <div className="bg-[#061b3a] border border-borderLight rounded-t-[15px] rounded-b-[7px] p-[10px] flex items-center justify-between">
              <div className="bg-borderLight rounded-full pl-[4px] pr-[7px] py-[4px] flex items-center gap-[5px]">
                <Image src="/images/hero/rune-logo.svg" alt="RUNE" width={22} height={22} className="rounded-full" />
                <span className="text-[7px] font-medium text-textPrimary tracking-wide">RUNE</span>
              </div>
              <div className="text-right">
                <p className="text-[14px] font-medium text-textSecondary leading-[15px]">1,000</p>
                <p className="text-[7px] font-medium text-textTertiary">$1,116.28</p>
              </div>
            </div>
            <div className="bg-[rgba(11,26,58,0.5)] border border-borderLight rounded-t-[7px] rounded-b-[15px] p-[10px] flex items-center justify-between">
              <div className="bg-borderLight rounded-full pl-[4px] pr-[7px] py-[4px] flex items-center gap-[5px]">
                <Image src="/images/hero/btc-logo-2.svg" alt="BTC" width={22} height={22} className="rounded-full" />
                <span className="text-[7px] font-medium text-white tracking-wide">BTC</span>
              </div>
              <div className="text-right">
                <p className="text-[14px] font-medium text-textSecondary leading-[15px]">0.0125</p>
                <p className="text-[7px] font-medium text-textTertiary">$1,115.12</p>
              </div>
            </div>
            {/* Swap button */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-[rgba(11,26,58,0.5)] border border-borderLight rounded-full p-[4px]">
                <div className="bg-[#2155df] rounded-[11px] w-[20px] h-[20px] flex items-center justify-center">
                  <Image src="/images/hero/swap-arrow.svg" alt="" width={12} height={12} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0.6px_0.6px_rgba(255,255,255,0.35),inset_0px_-1.9px_0.6px_rgba(0,0,0,0.25)]" />
        </div>
      </div>

      {/* Holding Vault badge */}
      {/* Figma: x=215, y=119, w=137, h=38 → left: 32.7%, top: 18.2%, width: 20.9% */}
      <div className="absolute z-20 bg-[#061b3a] rounded-full px-[10px] py-[7px] flex items-center gap-[7px] shadow-[0px_7px_13px_rgba(0,0,0,0.25),0px_-2px_6px_rgba(3,13,29,0.35)]" style={{ left: "32.7%", top: "18.2%" }}>
        <Image src="/images/hero/vault-secure.svg" alt="" width={14} height={14} />
        <span className="text-[12px] font-medium text-textPrimary whitespace-nowrap">Holding Vault</span>
        <Image src="/images/hero/chevron-down.svg" alt="" width={14} height={14} />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0.5px_0.5px_rgba(255,255,255,0.35),inset_0px_-1.5px_0.5px_rgba(0,0,0,0.25)]" />
      </div>

      {/* Daily Vault badge */}
      {/* Figma: x=462, y=194, w=120, h=38 → left: 70.2%, top: 29.7% */}
      <div className="absolute z-20 bg-[#061b3a] rounded-full px-[10px] py-[7px] flex items-center gap-[7px] shadow-[0px_7px_13px_rgba(0,0,0,0.25),0px_-2px_6px_rgba(3,13,29,0.35)]" style={{ left: "70.2%", top: "29.7%" }}>
        <Image src="/images/hero/vault-fast-icon.svg" alt="" width={14} height={14} />
        <span className="text-[12px] font-medium text-textPrimary whitespace-nowrap">Daily Vault</span>
        <Image src="/images/hero/chevron-down.svg" alt="" width={14} height={14} />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0.5px_0.5px_rgba(255,255,255,0.35),inset_0px_-1.5px_0.5px_rgba(0,0,0,0.25)]" />
      </div>

      {/* Device pairing card */}
      {/* Figma: x=446, y=351, w=193, h=111 → left: 67.8%, top: 53.7%, width: 29.3% */}
      <div className="absolute z-20" style={{ left: "67.8%", top: "53.7%", width: "29.3%" }}>
        <div className="bg-gradient-to-b from-[#4879fd] to-[#0d39b1] rounded-[21px] p-[10px] flex flex-col gap-[7px] shadow-[0px_8px_16px_rgba(0,0,0,0.25),0px_-2px_7px_rgba(3,13,29,0.35)] relative">
          <div className="bg-[#061b3a] border border-borderLight rounded-[15px] flex items-center gap-[7px] p-[10px]">
            <Image src="/images/hero/device-icon.svg" alt="" width={20} height={20} className="shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-medium text-white leading-tight">iPhone</p>
              <p className="text-[7px] font-medium text-[#13c89d] tracking-wide">This device</p>
            </div>
            <div className="bg-borderLight rounded-full px-[10px] py-[5px]">
              <span className="text-[5px] text-textSecondary whitespace-nowrap">1 of 2</span>
            </div>
          </div>
          <div className="border border-white/[0.03] border-dashed rounded-[15px] flex items-center gap-[7px] p-[10px]" style={{ backgroundImage: "linear-gradient(119deg, rgba(255,255,255,0.2) 20%, rgba(0,0,0,0.026) 94%), linear-gradient(90deg, rgba(6,27,58,0.5) 0%, rgba(6,27,58,0.5) 100%)" }}>
            <Image src="/images/hero/waiting-bg.svg" alt="" width={20} height={20} className="shrink-0 rounded-full" />
            <p className="flex-1 text-[8px] font-medium text-textSecondary leading-tight">Waiting for device</p>
            <div className="bg-borderLight rounded-full px-[10px] py-[5px]">
              <span className="text-[7px] text-textSecondary whitespace-nowrap">2 of 2</span>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0.6px_0.6px_rgba(255,255,255,0.35),inset_0px_-1.9px_0.6px_rgba(0,0,0,0.25)]" />
        </div>
      </div>

      {/* QR / Receive Bitcoin card */}
      {/* Figma: x=133, y=409, w=125, h=146 → left: 20.2%, top: 62.5%, width: 19% */}
      <div className="absolute z-20" style={{ left: "20.2%", top: "62.5%", width: "19%" }}>
        <div className="bg-gradient-to-b from-[#4879fd] to-[#0d39b1] rounded-[21px] p-[4px] pb-[9px] flex flex-col items-center gap-[4px] shadow-[0px_7px_14px_rgba(0,0,0,0.25),0px_-2px_6px_rgba(3,13,29,0.35)] relative">
          <div className="bg-[#061b3a] border border-borderNormal rounded-[18px] p-[4px] relative overflow-hidden">
            <Image src="/images/hero/qr-1.svg" alt="QR code" width={108} height={108} className="w-full h-auto" />
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_6px_black]" />
          </div>
          <p className="text-[9px] font-medium text-textPrimary text-center">Receive Bitcoin</p>
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1.6px_0.5px_rgba(0,0,0,0.25),inset_0px_0.5px_0.5px_rgba(255,255,255,0.35)]" />
        </div>
      </div>

      {/* Bottom glow ellipse */}
      {/* Figma: x=116, y=546, w=514, h=190 → left: 17.6%, top: 83.5%, width: 78.1% */}
      <div className="absolute pointer-events-none" style={{ left: "17.6%", top: "83.5%", width: "78.1%", height: "29%" }}>
        <Image src="/images/hero/bottom-glow.svg" alt="" fill className="object-contain" />
      </div>
    </div>
  )
}
