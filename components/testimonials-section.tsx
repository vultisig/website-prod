"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import TestimonialCard from "./ui/testimonial-card"
import TestimonialSkeleton from "./ui/testimonial-skeleton"

interface Testimonial {
  name: string
  text: string
  label: string
  store?: 'google' | 'apple'
  date?: string
  score?: number
}

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [startX, setStartX] = useState(0)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews')
        const data = await response.json()
        setTestimonials(data.testimonials)
      } catch (error) {
        console.error('Error fetching reviews:', error)
        // Fallback to static testimonials
        setTestimonials([
          {
            name: "Mattj89iii",
            text: "What this team is designing is pretty cool. No seed phrases to write down. No reliance on third parties. The vault is secured by backup shards you store anywhere you like (ideally not all in one place!).",
            label: "Novel approach to self-custody",
          },
          {
            name: "Tarekpac",
            text: "Say goodbye to hardware wallets! Experience superior security than traditional hardware wallets, with the flexibility to function as a 'hot wallet' when needed. Sleek, user-friendly interface.",
            label: "Impeccable!",
          },
          {
            name: "Amalamud",
            text: "Everyone needs this wallet asap, as only this wallet secures your funds in the best way by using multi factor authorization to sign transactions. Loving it",
            label: "The most secure wallet, period",
          },
          {
            name: "CryptoExpert",
            text: "The multi-signature approach is revolutionary. Finally, a wallet that doesn't compromise on security while maintaining ease of use. This is the future of crypto storage.",
            label: "Revolutionary technology",
          },
          {
            name: "BlockchainDev",
            text: "As a developer, I appreciate the technical excellence behind Vultisig. The architecture is solid, the security is top-notch, and the user experience is seamless.",
            label: "Technical excellence",
          },
          {
            name: "DeFiTrader",
            text: "Switched from hardware wallets to Vultisig and never looked back. The convenience of multi-device signing without compromising security is exactly what I needed.",
            label: "Perfect balance",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, testimonials.length - 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
  }

  // Drag threshold constants
  const MOBILE_THRESHOLD = 50
  const DESKTOP_THRESHOLD = 30

  // Common drag handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setStartX(clientX)
    setDragOffset(0)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return
    setDragOffset(clientX - startX)
  }

  const handleDragEnd = (threshold: number) => {
    if (!isDragging) return
    setIsDragging(false)
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        prevSlide()
      } else {
        nextSlide()
      }
    }
    setDragOffset(0)
  }

  // Mouse handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX)
  }

  const handleMouseUp = () => {
    handleDragEnd(DESKTOP_THRESHOLD)
  }

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    handleDragEnd(MOBILE_THRESHOLD)
  }

  // Prevent text selection during drag
  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = 'none'
    } else {
      document.body.style.userSelect = ''
    }
    
    return () => {
      document.body.style.userSelect = ''
    }
  }, [isDragging])

  // Calculate positions
  const getCurrentPosition = () => currentSlide

  const getDesktopTransform = () => {
    const basePosition = Math.floor(getCurrentPosition() / 3) * 100
    const offset = dragOffset + (basePosition === 100 ? -33 : 0)
    return `translateX(calc(-${basePosition}% + ${offset}px))`
  }

  const getMobileTransform = () => {
    return `translateX(calc(-${getCurrentPosition() * 100}% + ${dragOffset}px))`
  }

  // Common carousel props
  const carouselProps = {
    ref: containerRef,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseUp,
    className: "cursor-grab active:cursor-grabbing",
    style: {
      transition: isDragging ? 'none' : 'transform 0.3s ease-out'
    }
  }

  if (loading) {
    return (
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto relative">
          {/* Background light blob */}
          <div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vw] pointer-events-none z-0"
            style={{
              background: "radial-gradient(ellipse at center center, var(--light-blob) 0%,  #02122B00 80%)",
              filter: "blur(48px)",
            }}
          >
          </div>

          {/* Header */}
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Security Backed by <span className="text-cyan-400">Stories</span>
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl">
              Vultisig is battle-tested and trusted by vault creators, multisig
              <br className="hidden sm:block" />
              users, and DAO operators around the world.
            </p>
          </div>

          {/* Mobile skeleton carousel */}
          <div className="block lg:hidden relative z-10 overflow-hidden">
            <div className="flex mb-8">
              {[1, 2, 3].map((index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <TestimonialSkeleton />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop skeleton carousel */}
          <div className="relative hidden lg:block z-10 overflow-hidden">
            <div className="flex gap-6 lg:gap-8 mb-12">
              {[1, 2, 3].map((setIndex) => (
                <div key={setIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-3 gap-6 lg:gap-8">
                    {[1, 2, 3].map((index) => (
                      <div key={`${setIndex}-${index}`} className="flex justify-center">
                        <TestimonialSkeleton />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skeleton pagination dots */}
          <div className="flex justify-center mb-8 relative z-10">
            <div className="flex space-x-2">
              {[1, 2].map((index) => (
                <div key={index} className="w-3 h-3 rounded-full bg-slate-600 animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center relative z-10">
            <a href="/downloads">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg">
                Download App
              </Button>
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-10 px-4">
      <div className="max-w-7xl mx-auto relative">
        {/* Background light blob */}
        <div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vw] pointer-events-none z-0"
          style={{
            background: "radial-gradient(ellipse at center center, var(--light-blob) 0%,  #02122B00 80%)",
            filter: "blur(48px)",
          }}
        >
        </div>

        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Security Backed by <span className="text-cyan-400">Stories</span>
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl">
            Vultisig is battle-tested and trusted by vault creators, multisig
            <br className="hidden sm:block" />
            users, and DAO operators around the world.
          </p>
        </div>

        {/* Mobile carousel */}
        <div className="block lg:hidden relative z-10 overflow-hidden">
          <div
            {...carouselProps}
            className="flex mb-8 cursor-grab active:cursor-grabbing"
            style={{
              ...carouselProps.style,
              transform: getMobileTransform()
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <TestimonialCard
                  text={testimonial.text}
                  author={testimonial.name}
                  tag={testimonial.label}
                  initial={testimonial.name.charAt(0)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop carousel */}
        <div className="relative hidden lg:block z-10 overflow-hidden">
          <div
            {...carouselProps}
            className="flex gap-6 lg:gap-8 mb-12 cursor-grab active:cursor-grabbing"
            style={{
              ...carouselProps.style,
              transform: getDesktopTransform()
            }}
          >
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, setIndex) => (
              <div key={setIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-3 gap-6 lg:gap-8">
                  {testimonials.slice(setIndex * 3, setIndex * 3 + 3).map((testimonial, index) => (
                    <div key={`${setIndex}-${index}`} className="flex justify-center">
                      <TestimonialCard
                        text={testimonial.text}
                        author={testimonial.name}
                        tag={testimonial.label}
                        initial={testimonial.name.charAt(0)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mb-8 relative z-10">
          {/* Mobile pagination */}
          <div className="flex space-x-2 block lg:hidden">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? "bg-blue-600" : "bg-slate-600"}`}
              />
            ))}
          </div>
          {/* Desktop pagination */}
          <div className="hidden lg:flex space-x-2">
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index * 3)}
                className={`w-3 h-3 rounded-full transition-colors ${Math.floor(currentSlide / 3) === index ? "bg-blue-600" : "bg-slate-600"}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center relative z-10">
          <a href="/downloads">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg">
              Download App
            </Button>
          </a>
        </div>

      </div>
    </section>
  )
}