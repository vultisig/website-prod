"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Testimonial {
  text: string
  title: string
  user: string
}

const testimonials: Testimonial[] = [
  {
    text: "What this team is designing is pretty cool. No seed phrases to write down. No reliance on third parties. The vault is secured by backup shards you store anywhere you like (ideally not all in one place!).",
    title: "Novel approach to self-custody",
    user: "Mattj89iii",
  },
  {
    text: "Say goodbye to hardware wallets! Experience superior security than traditional hardware wallets, with the flexibility to function as a 'hot wallet' when needed. Sleek, user-friendly interface.",
    title: "Impeccable!",
    user: "Tarekpac",
  },
  {
    text: "Everyone needs this wallet asap, as only this wallet secures your funds in the best way by using multi factor authorization to sign transactions. Loving it",
    title: "The most secure wallet, period",
    user: "Amalamud",
  },
]

export default function EcosystemSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const current = testimonials[currentIndex]

  return (
    <section className="py-16 md:py-24 container">
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 gap-12">
        {/* Left side - content */}
        <div
          className="flex flex-col items-start gap-6 lg:w-[60%] xl:w-[65%] rounded-3xl border border-[#11284A] p-8 md:p-[30px] relative overflow-hidden bg-[linear-gradient(0deg,rgba(11,26,58,0.5),rgba(11,26,58,0.5)),_radial-gradient(circle_at_59%_146%,rgba(11,78,255,1)_0%,rgba(2,18,43,1)_100%)]"
        >
          {/* Pill badge */}
          <div className="inline-flex items-center bg-primaryAccent/10 border border-primaryAccent/50 rounded-full px-4 py-1.5">
            <span className="font-medium text-sm text-primaryAccent tracking-tight uppercase">
              Trusted by thousands
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-textPrimary tracking-tight">
            A wallet backed by a{" "}
            <span className="font-bold">growing ecosystem.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-textSecondary tracking-tight max-w-2xl leading-relaxed">
            Vultisig isn&apos;t just a wallet &mdash; it&apos;s a growing
            ecosystem of users, developers, and partners building the future of
            self-custody together.
          </p>

          {/* CTA */}
          <Link href="/downloads">
            <Button variant="primaryBlue" size="lg">
              Download Vultisig
            </Button>
          </Link>
        </div>

        {/* Right side - testimonial card + navigation */}
        <div className="lg:w-[40%] xl:w-[35%] flex flex-col gap-6">
          {/* Testimonial card */}
          <div
            className="relative rounded-2xl border border-borderLight overflow-hidden p-8 bg-[linear-gradient(180deg,#061B3A_0%,rgba(6,27,58,0)_100%)]"
          >
            {/* Quote marks */}
            <div
              className="text-5xl font-bold leading-none mb-4 select-none text-[hsl(var(--primary-accent)/0.3)]"
              aria-hidden="true"
            >
              &ldquo;&rdquo;
            </div>

            {/* Review text */}
            <p className="text-textSecondary text-sm leading-relaxed mb-6">
              {current.text}
            </p>

            {/* Review title */}
            <p className="text-secondaryAccent font-semibold text-base mb-6">
              {current.title}
            </p>

            {/* Author row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-borderLight flex items-center justify-center border border-borderNormal">
                  <span className="text-textPrimary text-sm font-bold">
                    {current.user.charAt(0).toUpperCase()}
                  </span>
                </div>
                {/* Username */}
                <span className="text-textPrimary text-sm font-medium">
                  {current.user}
                </span>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Navigation row */}
          <div className="flex items-center gap-4">
            {/* Arrow buttons */}
            <button
              onClick={goToPrevious}
              className="w-10 h-10 rounded-full border border-borderLight flex items-center justify-center text-textSecondary hover:text-textPrimary hover:border-borderNormal transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goToNext}
              className="w-10 h-10 rounded-full border border-borderLight flex items-center justify-center text-textSecondary hover:text-textPrimary hover:border-borderNormal transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-1.5 ml-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                    currentIndex === index
                      ? "bg-primaryAccent/14"
                      : "hover:bg-borderLight/60"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <span
                    className={`block h-2.5 w-2.5 rounded-full transition-colors ${
                      currentIndex === index
                        ? "bg-primaryAccent"
                        : "bg-borderLight hover:bg-borderNormal"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
