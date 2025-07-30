import { Button } from "@/components/ui/button"

export default function CtaSection() {
  return (
    <section className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA with background */}
        <div className="
          bg-[var(--background-secondary)] border border-[var(--border-color)]
          rounded-3xl p-6 sm:p-8 lg:p-12 mb-16
          relative
          overflow-hidden
          transition-all duration-300
        ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="flex flex-col items-center lg:items-start w-full">
              <div className="flex items-center mb-6 lg:mb-8 w-full lg:w-auto justify-center lg:justify-start">
                <img src={'/images/vultisig-logo.svg'} width={'40px'} height={'40px'} className="sm:w-[60px] sm:h-[60px]"></img>
                <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold pl-3 text-center lg:text-left">Vultisig</h2>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white w-full mb-6 lg:mb-8 leading-tight text-center lg:text-left">
                SECURE YOUR DIGITAL
                <br className="hidden lg:block"/>
                <span className="text-cyan-400"> ASSETS</span> NOW!
              </h2>

              <div className="flex flex-col w-full lg:w-auto">
                <a href="/downloads" className="w-full flex justify-center lg:justify-start">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg sm:text-lg rounded-lg mx-auto mb-6 sm:mb-0 w-full lg:w-[220px] h-14 sm:h-auto lg:mx-0">
                    Download Vultisig
                  </Button>
                </a>
                {/* Mobile image below button */}
                {/* <div className="block lg:hidden w-full flex justify-center mt-8">
                  <div className="relative h-80 sm:h-96">
                    <img
                      src="/images/cta-1.png"
                      className="w-full min-w-[250px] sm:min-w-[400px] -mt-12"
                    />
                  </div>
                </div> */}
              </div>
            </div>

            {/* Desktop image right column */}
            <div className="hidden lg:flex justify-center">
              <div className="relative h-80">
                <img
                  src="/images/cta-1.png"
                  className="w-full lg:min-w-[600px] -mt-[130px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Discord section */}
        <div className="flex justify-center items-center mt-8">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white text-center">JOIN THE DISCORD TO REQUEST NEW FEATURES!</h3>
            <a href="https://discord.com/invite/54wEtGYxuv" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
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
