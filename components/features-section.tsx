import { Shield, Key, Link } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="pt-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center lg:mb-0 xs:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Vultisig is <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">different</span>
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl">
            No tradeoffs. Just seamless, secure crypto
            <br className="hidden sm:block" />
            management.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-8 lg:space-y-12">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[rgba(var(--primary-accent-rgb),0.1)] rounded-lg flex items-center justify-center flex-shrink-0">
                <img src="/images/brain.svg" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Phishing Proof Architecture</h3>
                <p className="text-gray-300 text-sm sm:text-md leading-relaxed">
                  Vultisig's built in MFA architecture protects users against attacks used
                  <br className="hidden sm:block" />
                  to drain traditional single point of failure wallets.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[rgba(var(--primary-accent-rgb),0.1)] rounded-lg flex items-center justify-center flex-shrink-0">
                <img src="/images/pen-tool.svg" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Private Key Free Design</h3>
                <p className="text-gray-300 text-sm sm:text-md leading-relaxed">
                  With Vultisig, you will never need to write down your private key or seed
                  <br className="hidden sm:block" />
                  phrase again. Vultisig provides simple-to-use vault shares that can be
                  <br className="hidden sm:block" />
                  stored anywhere for accessibility and convenience without compromising
                  <br className="hidden sm:block" />
                  security.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[rgba(var(--primary-accent-rgb),0.1)] rounded-lg flex items-center justify-center flex-shrink-0">
                <img src="/images/chain.svg" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                  Omni-Chain
                </h3>
                <p className="text-gray-300 text-sm sm:text-md leading-relaxed">
                  <b>Beyond traditional multi-sig.</b>
                  <br className="hidden sm:block" />
                  Our Vault system works across over 30 chains already, while staying
                  <br className="hidden sm:block" />
                  flexible and dynamic — enabling a truly seamless user experience.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center hidden md:hidden lg:flex" style={{ overflow: 'hidden' }}>
            <img
              src="/images/home-1.svg"
              className="w-full max-w-full lg:min-w-[800px]"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
