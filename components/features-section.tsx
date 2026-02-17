export default function FeaturesSection() {
  const features = [
    {
      icon: "/images/brain.svg",
      title: "Phishing Proof Architecture",
      description:
        "Vultisig's built in MFA architecture protects users against attacks used to drain traditional single point of failure wallets.",
    },
    {
      icon: "/images/pen-tool.svg",
      title: "Private Key Free Design",
      description:
        "You will never need to write down your seed phrase again. Vultisig provides simple-to-use vault shares that can be stored anywhere without compromising security.",
    },
    {
      icon: "/images/chain.svg",
      title: "Omni-Chain",
      description:
        "Our Vault system works across over 30 chains already, while staying flexible and dynamic - enabling a truly seamless user experience.",
    },
  ]

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-5 tracking-tight">
            Vultisig is{" "}
            <span className="bg-gradient-to-r from-[#33E6BF] to-[#0439C7] bg-clip-text text-transparent">
              different
            </span>
          </h2>
          <p className="text-textSecondary text-lg md:text-xl tracking-tight">
            No tradeoffs. Just seamless, secure crypto management.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-[20px] border border-borderLight p-[30px] flex flex-col gap-3 transition-all duration-300 hover:border-[#4879fd] hover:shadow-[0_0_20px_rgba(72,121,253,0.3)]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(2, 18, 43, 1) 0%, rgba(6, 27, 58, 1) 100%)",
              }}
            >
              {/* Icon and Title */}
              <div className="flex flex-col gap-3">
                <div className="w-9 h-9 bg-[rgba(72,121,253,0.1)] rounded-lg flex items-center justify-center">
                  <img
                    src={feature.icon}
                    alt={`${feature.title} icon`}
                    className="w-6 h-6"
                  />
                </div>
                <h3 className="text-xl font-semibold text-textPrimary tracking-tight">
                  {feature.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-base text-textSecondary leading-[1.5] tracking-tight">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
