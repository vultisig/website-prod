import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  ArrowRightIcon,
  CircleDashed,
  DownloadIcon,
} from "lucide-react"
import Image from "next/image"
import { CiBag1 } from "react-icons/ci"
import { IoPersonRemoveOutline } from "react-icons/io5"
import heroImage from "../images/hero.png"
import Heading from "./Heading"
import RadialBackground from "./RadialBackground"

export default function Hero() {
  return (
    <section className="min-h-screen relative">
      <div className="space-y-6 pt-16 container z-10 relative">
        <h1 className="text-4xl md:text-7xl max-w-2xl font-medium tracking-tight">
          The Free Open-Source MPC Wallet For Everyone
        </h1>

        <p className="text-sm md:text-lg text-textSecondary max-w-[34rem]">
          Split signing power across your devices. No seed phrases, no single
          point of failure, no company holding your keys. Vultisig uses
          threshold signatures so your crypto stays yours.
        </p>
        <div className="flex gap-4 pt-4">
          <Button variant={"primaryBlue"} className="md:h-12 md:px-8">
            <DownloadIcon /> Download App
          </Button>
          <Button variant="secondary" className="md:h-12 md:px-8">
            How It Works
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
      <Image
        src={heroImage}
        alt="Vultisig Hero"
        className="w-full h-auto rounded-lg absolute top-0 right-0 object-cover object-right max-w-2xl opacity-50 md:opacity-90"
      />

      {/* Problems Section */}
      <div className="py-20 md:mt-40 container relative">
        <RadialBackground />
        <Heading>
          Seed Phrases Are a{" "}
          <span className="text-primaryAccent inline-block">
            $250 Billion Problem
          </span>
        </Heading>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {[
            {
              icon: <AlertTriangle strokeWidth={1.5} size={20} />,
              title: "Phishing Attacks",
              description:
                "Seed phrases are prime targets for sophisticated phishing schemes and social engineering. One error and your assets are gone.",
            },
            {
              icon: <CiBag1 size={20} />,
              title: "Physical Theft",
              description:
                "A seed phrase on paper or a single hardware device is a honeypot. Anyone who finds it controls your funds instantly.",
            },
            {
              icon: <IoPersonRemoveOutline strokeWidth={1.5} size={20} />,
              title: "Human Error",
              description:
                "Lost phrases, typos, or forgotten locations mean permanent loss of funds.",
            },
            {
              icon: <CircleDashed strokeWidth={1.5} size={20} />,
              title: "Single Point of Failure",
              description:
                "One seed phrase means one point of failure. Compromise it once and every asset across every chain is lost forever.",
            },
          ].map((problem, idx) => {
            const IconComponent = problem.icon
            return (
              <div
                key={idx}
                className="flex flex-col bg-backgroundSecondary/40 border border-borderLight rounded-[20px] p-6 md:p-7 hover:border-[#4879fd] hover:bg-gradient-to-br hover:from-[rgba(72,121,253,0.1)] hover:to-[rgba(11,78,255,0.05)] transition"
              >
                <div className="bg-primaryAccent/10 text-primaryAccent size-10 flex items-center justify-center rounded-lg mb-6 transition-colors">
                  {IconComponent}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-4 text-textPrimary mt-auto">
                  {problem.title}
                </h3>
                <p className="text-sm text-textSecondary leading-relaxed">
                  {problem.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
