import { Button } from "@/components/ui/button"
import { ArrowUpRight, Zap, Shield } from "lucide-react"

export default function SetupSection() {
  return (
    <section className="py-16 container">
      {/* Header */}
      <div className="flex flex-col items-start gap-5 mb-12">
        <div className="inline-flex items-center bg-primaryAccent/10 border border-primaryAccent/50 rounded-full px-4 py-1.5">
          <span className="font-medium text-sm text-primaryAccent tracking-tight uppercase">
            Choose your setup
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-textPrimary tracking-tight">
          The setup for{" "}
          <span className="bg-gradient-to-r from-secondaryAccent to-deepBlue bg-clip-text text-transparent">
            your needs.
          </span>
        </h2>

        <p className="text-lg lg:text-xl text-textSecondary tracking-tight max-w-3xl leading-relaxed">
          Fast Vault for daily spending. Secure Vault for maximum protection.
          <br className="hidden sm:block" />
          Both are keyless and require no seed phrase.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fast Vault Card */}
        <div className="border border-borderLight rounded-3xl p-9 relative overflow-hidden bg-[rgba(11,26,58,0.5)] h-auto lg:h-[515px]">
          <div className="relative z-10 flex flex-col gap-5">
            {/* Vault Type Pill */}
            <div className="inline-flex items-center gap-2 bg-[rgba(255,194,92,0.05)] border-[1.5px] border-[rgba(255,194,92,0.05)] rounded-full px-3.5 py-2 w-fit">
              <Zap className="w-4 h-4 text-textPrimary" />
              <span className="font-medium text-sm text-textPrimary">
                Fast Vault
              </span>
            </div>

            <h3 className="text-2xl sm:text-[32px] font-medium text-textPrimary tracking-tight leading-tight">
              For daily use
            </h3>

            <p className="text-textSecondary text-base tracking-tight leading-relaxed">
              This is a fast, one-device setup perfect for storing and using
              smaller amounts every day.
            </p>

            <p className="text-textSecondary text-base tracking-tight leading-relaxed max-w-[282px]">
              It requires only one user device, and our Vultiserver co-signs
              your transactions instantly - giving you speed and simplicity
              without compromising usability.
            </p>
          </div>

          {/* CTA */}
          <a
            href="https://docs.vultisig.com/vultisig-vault-user-actions/creating-a-vault#fast-vaults"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-9 left-9 z-10"
          >
            <Button
              variant="primaryBlue"
              className="rounded-xl px-3 py-4 h-[51px] w-[189px] text-sm gap-1.5 border-white/15"
            >
              Learn More
              <ArrowUpRight className="h-5 w-5" />
            </Button>
          </a>

          <div className="absolute bottom-0 right-0 z-0">
            <img
              src="/images/home-2.svg"
              alt="Fast Vault setup illustration"
              width="400"
              height="300"
              className="opacity-80 w-auto max-w-[400px] h-auto object-contain"
            />
          </div>
        </div>

        {/* Secure Vault Card */}
        <div className="border border-borderLight rounded-3xl p-9 relative overflow-hidden bg-[rgba(11,26,58,0.5)] h-auto lg:h-[515px]">
          <div className="relative z-10 flex flex-col gap-5">
            {/* Vault Type Pill */}
            <div className="inline-flex items-center gap-2 bg-[rgba(19,200,157,0.05)] border-[1.5px] border-[rgba(19,200,157,0.05)] rounded-full px-3.5 py-2 w-fit">
              <Shield className="w-4 h-4 text-textPrimary" />
              <span className="font-medium text-sm text-textPrimary">
                Secure Vault
              </span>
            </div>

            <h3 className="text-2xl sm:text-[32px] font-medium text-textPrimary tracking-tight leading-tight">
              For maximum security
            </h3>

            <p className="text-textSecondary text-base tracking-tight leading-relaxed">
              Built for maximum protection, the Secure Vault uses multiple
              devices to sign transactions and safeguard your assets.
            </p>

            <p className="text-textSecondary text-base tracking-tight leading-relaxed max-w-[254px]">
              It&apos;s always accessible through backups of the devices, making
              it the most reliable way to secure any amount of assets - even if
              a device fails.
            </p>
          </div>

          {/* CTA */}
          <a
            href="https://docs.vultisig.com/vultisig-vault-user-actions/creating-a-vault#secure-vault"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-9 left-9 z-10"
          >
            <Button
              variant="primaryBlue"
              className="rounded-xl px-3 py-4 h-[51px] w-[189px] text-sm gap-1.5 border-white/15"
            >
              Learn More
              <ArrowUpRight className="h-5 w-5" />
            </Button>
          </a>

          <div className="absolute bottom-0 right-0 z-0">
            <img
              src="/images/home-3.svg"
              alt="Secure Vault setup illustration"
              width="400"
              height="300"
              className="opacity-80 w-auto max-w-[400px] h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
