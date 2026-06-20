export default function FeaturesSection() {
  const features = [
    {
      icon: "/images/brain.svg",
      title: "Phishing-proof by design",
      description:
        "Vultisig's built in MFA architecture protects users against attacks used to drain traditional single point of failure wallets.",
    },
    {
      icon: "/images/pen-tool.svg",
      title: "No seed phrase, ever",
      description:
        "You will never need to write down your seed phrase again. Vultisig provides simple-to-use vault shares that can be stored anywhere without compromising security.",
    },
    {
      icon: "/images/chain.svg",
      title: "Truly omni-chain",
      description:
        "Our Vault system works across over 30 chains already, while staying flexible and dynamic - enabling a truly seamless user experience.",
    },
  ]

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container">
        {/* Header */}
        <div className="text-left mb-12">
          {/* Title */}
          <h2 className="text-[48px] font-medium leading-tight tracking-tight mb-5">
            <span className="text-textPrimary block">Built different.</span>
            <span
              className="block bg-clip-text text-transparent bg-[linear-gradient(64deg,#33E6BF_8%,#0439C7_134%)]"
            >
              Secured different.
            </span>
          </h2>

          <p className="text-textSecondary text-lg md:text-xl tracking-tight">
            No tradeoffs. Just seamless, secure crypto management. Fully open
            source and audited&nbsp;&mdash;{" "}
            <a
              href="https://github.com/vultisig"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondaryAccent font-medium hover:underline underline-offset-4"
            >
              view the code &rarr;
            </a>
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-[24px] border border-borderLight bg-[rgba(11,26,58,0.5)] p-[30px] flex flex-col gap-3"
            >
              {/* Icon and Title */}
              <div className="flex flex-col gap-3">
                <div className="w-9 h-9 bg-primaryAccent/10 rounded-lg flex items-center justify-center">
                  <img
                    src={feature.icon}
                    alt={`${feature.title} icon`}
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className="text-[20px] font-semibold text-textPrimary tracking-tight">
                  {feature.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-base text-textSecondary leading-relaxed tracking-tight">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
