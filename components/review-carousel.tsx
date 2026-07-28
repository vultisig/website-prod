"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

import StarRating from "@/components/ui/star-rating"
import { cn } from "@/lib/utils"

export type Review = {
  name: string
  text: string
  label: string
  store?: "google" | "apple"
  score?: number
}

const STORE_BADGE = {
  apple: { src: "/v5/store-app-store.webp", alt: "App Store review" },
  google: { src: "/v5/store-google-play.webp", alt: "Google Play review" },
} as const

function StoreAvatar({ store }: { store: Review["store"] }) {
  const badge = STORE_BADGE[store === "google" ? "google" : "apple"]
  return (
    <Image
      src={badge.src}
      alt={badge.alt}
      width={36}
      height={36}
      className="size-9 shrink-0 rounded-full bg-v5-white p-1"
    />
  )
}

export default function ReviewCarousel({
  reviews,
  className,
}: {
  reviews: Review[]
  className?: string
}) {
  const [items, setItems] = useState(reviews)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let cancelled = false
    fetch("/api/reviews")
      .then((response) => response.json())
      .then((data) => {
        if (cancelled || !Array.isArray(data.testimonials)) return
        if (data.testimonials.length === 0) return
        setItems(data.testimonials)
        setIndex(0)
      })
      .catch(() => undefined)
    return () => {
      cancelled = true
    }
  }, [])

  const review = items[index] ?? items[0]
  const step = (delta: number) =>
    setIndex((current) => (current + delta + items.length) % items.length)

  return (
    <div className={cn("flex w-[455px] flex-col gap-[43px]", className)}>
      <figure className="flex h-[386px] flex-col justify-center gap-6 rounded-v5-panel bg-v5-amber p-[30px] text-v5-text-primary">
        <div className="flex flex-1 flex-col">
          <span aria-hidden className="text-[40px] leading-none">
            &ldquo;
          </span>
          <blockquote className="text-v5-quote font-medium">
            {review.text}
          </blockquote>
        </div>
        <p className="text-v5-body-m-tight font-medium">{review.label}</p>
        <figcaption className="flex items-center gap-3.5">
          <StoreAvatar store={review.store} />
          <span className="flex-1 text-v5-link font-medium">{review.name}</span>
          <StarRating
            rating={review.score ?? 5}
            size={16}
            className="flex items-center gap-[3px]"
          />
        </figcaption>
      </figure>

      <div className="flex h-10 items-center justify-between px-[92px]">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous review"
          className="rounded-full bg-v5-text-secondary p-2 text-v5-text-inverse"
        >
          <ArrowLeft className="size-6" aria-hidden />
        </button>
        <div className="flex items-center gap-2">
          {items.map((item, dot) => (
            <span
              key={item.name + dot}
              className={cn(
                "h-[9px] rounded-[7px]",
                dot === index ? "w-8 bg-v5-cta" : "w-[9px] bg-v5-text-secondary",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next review"
          className="rounded-full bg-v5-text-secondary p-2 text-v5-text-inverse"
        >
          <ArrowRight className="size-6" aria-hidden />
        </button>
      </div>
    </div>
  )
}
