import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

export default function SetupSection() {
  return (
    <section className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            The <span className="text-cyan-400">setup</span> for your needs
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            className="
              border border-[var(--border-color)]
              hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
              rounded-2xl
              p-6 sm:p-8
              relative
              overflow-hidden
            "
            style={{
              background: "linear-gradient(to bottom, var(--background), var(--background-secondary))"
            }}
          >
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Fast Vault</h3>

              <p className="text-gray-300 text-base sm:text-lg mb-6">
              This is a fast, one-device setup perfect for storing and using
                <br className="hidden sm:block" />
              smaller amounts every day.
            </p>

              <p className="text-gray-300 text-base sm:text-lg mb-20 sm:mb-28">
              It requires only one user device, and
                <br className="hidden sm:block" />
              our Vultiserver co-signs your
                <br className="hidden sm:block" />
              transactions instantly — giving you
                <br className="hidden sm:block" />
              speed and simplicity without
                <br className="hidden sm:block" />
              compromising usability.
            </p>

            <a
              href="https://docs.vultisig.com/vultisig-vault-user-actions/creating-a-vault#fast-vaults"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                Learn More <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            </div>
            <div className="absolute bottom-0 right-0 z-0">
              <img src="/images/home-2.svg" className="opacity-80" />
            </div>
          </div>

          <div
            className="
              border border-[var(--border-color)]
              hover:shadow-[0_0_4px_2px_rgba(var(--border-color-rgb),0.5)]
              rounded-2xl
              p-6 sm:p-8
              relative
              overflow-hidden
            "
            style={{
              background: "linear-gradient(to bottom, var(--background), var(--background-secondary))"
            }}
          >
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Secure Vault</h3>

              <p className="text-gray-300 text-base sm:text-lg mb-6">
              Built for maximum protection, the Secure Vault uses multiple
                <br className="hidden sm:block" />
              devices to sign transactions and safeguard your assets.
            </p>

              <p className="text-gray-300 text-base sm:text-lg mb-20 sm:mb-28">
              It's always accessible through
                <br className="hidden sm:block" />
              backups of the devices, making it the
                <br className="hidden sm:block" />
              most reliable way to secure any
                <br className="hidden sm:block" />
              amount of assets — even if a device
                <br className="hidden sm:block" />
              fails.
            </p>

            <a
              href="https://docs.vultisig.com/vultisig-vault-user-actions/creating-a-vault#secure-vault"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                Learn More <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            </div>
            <div className="absolute bottom-0 right-0 z-0">
              <img src="/images/home-3.svg" className="opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
