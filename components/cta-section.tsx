import { Button } from "@/components/ui/button"

export default function CtaSection() {
  return (
    <section className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA with background */}
        <div className="
          bg-[var(--background-secondary)] border border-[#11284a]
          rounded-[20px] mb-16
          relative
          overflow-hidden
          h-[470px]
        ">
          {/* Background glow effects */}
          <img
            src="/images/cta-glow.svg"
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 w-[900px] h-auto opacity-80 mix-blend-lighten pointer-events-none"
          />

          {/* Decorative line elements */}
          <img
            src="/images/cta-decor-1.svg"
            alt=""
            className="absolute hidden lg:block w-[9px] h-[98px] pointer-events-none"
            style={{ left: "90.3%", top: "69%" }}
          />
          <img
            src="/images/cta-decor-2.svg"
            alt=""
            className="absolute hidden lg:block w-[9px] h-[98px] pointer-events-none"
            style={{ left: "92.3%", top: "59%" }}
          />
          <img
            src="/images/cta-decor-2.svg"
            alt=""
            className="absolute hidden lg:block w-[9px] h-[98px] pointer-events-none"
            style={{ left: "49.6%", top: "48.7%" }}
          />

          {/* Decorative sparkle elements */}
          <img
            src="/images/cta-sparkle-1.svg"
            alt=""
            className="absolute hidden lg:block w-[68px] h-[55px] pointer-events-none"
            style={{ left: "69.4%", top: "11.5%", transform: "rotate(-8deg)" }}
          />
          <img
            src="/images/cta-sparkle-2.svg"
            alt=""
            className="absolute hidden lg:block w-[98px] h-[80px] pointer-events-none"
            style={{ left: "44.8%", top: "80%", transform: "rotate(176deg) scaleY(-1)" }}
          />

          {/* Left content */}
          <div className="absolute left-[48px] top-1/2 -translate-y-1/2 flex flex-col gap-[33px] items-start w-[560px] z-10">
            {/* Logo */}
            <div className="flex items-center h-[44px]">
              <img src="/images/vultisig-logo.svg" alt="Vultisig logo" className="h-[30px] w-auto" />
              <span className="text-white text-3xl font-semibold pl-2">Vultisig</span>
            </div>

            {/* Headline */}
            <h2 className="text-[48px] font-semibold text-white leading-tight tracking-[-1px]">
              Secure your digital{" "}
              <span
                className="bg-clip-text"
                style={{
                  WebkitTextFillColor: "transparent",
                  backgroundImage: "linear-gradient(56deg, #33E6BF 8%, #0439C7 134%)"
                }}
              >
                assets
              </span>{" "}
              now!
            </h2>

            {/* Button */}
            <a href="/downloads">
              <Button className="bg-[#0b4eff] hover:bg-[#0940d4] border border-[#4879fd] text-white px-6 py-4 text-base font-medium rounded-[12px] w-[212px] h-[63px]">
                Download Vultisig
              </Button>
            </a>
          </div>

          {/* Phone mockups - positioned on the right */}
          <div
            className="absolute hidden lg:block"
            style={{
              left: "45.65%",
              right: "3.23%",
              top: "-15%",
              aspectRatio: "812/804"
            }}
          >
            <img
              src="/images/cta-phones.svg"
              alt="Vultisig secure crypto vault wallet"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Discord section */}
        <div className="flex justify-center items-center mt-8">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white text-center">JOIN THE DISCORD TO REQUEST NEW FEATURES!</h3>
            <a href="https://discord.gg/thq64eaYVN" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full md:w-auto">
                DISCORD
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
