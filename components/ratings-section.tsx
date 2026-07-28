import { Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import ReviewCarousel, { type Review } from "@/components/review-carousel"
import StarRating from "@/components/ui/star-rating"
import { LandingButton } from "@/components/ui/landing-button"

type StoreScore = {
  store: string
  icon: string
  rating: number
  caption: string
}

// Store-level aggregates: /api/reviews only returns individual reviews, so
// these come from the design until an aggregate endpoint exists.
const STORE_SCORES: StoreScore[] = [
  {
    store: "App Store",
    icon: "/v5/store-app-store.webp",
    rating: 4.5,
    caption: "62 ratings",
  },
  {
    store: "Google Play",
    icon: "/v5/store-google-play.webp",
    rating: 5,
    caption: "441 reviews · 10K+ downloads",
  },
]

const FALLBACK_REVIEWS: Review[] = [
  {
    name: "Mattj89iii",
    text: "What this team is designing is pretty cool. No seed phrases to write down. No reliance on third parties. The vault is secured by backup shards you store anywhere you like (ideally not all in one place!).",
    label: "Novel approach to self-custody",
    store: "google",
    score: 5,
  },
  {
    name: "Tarekpac",
    text: "Say goodbye to hardware wallets! Experience better security than traditional hardware wallets, with the flexibility to function as a “hot wallet” when needed. Sleek, user-friendly interface.",
    label: "Impeccable!",
    store: "apple",
    score: 5,
  },
]

function StoreScoreCard({ store, icon, rating, caption }: StoreScore) {
  return (
    <li className="flex flex-1 flex-col items-center gap-4 rounded-3xl bg-v5-page p-6 text-v5-text-inverse md:items-start">
      <div className="flex w-full flex-col items-center gap-5 md:flex-row">
        <Image
          src={icon}
          alt={`${store} logo`}
          width={42}
          height={46}
          className="h-[46px] w-auto md:h-[42px]"
        />
        <div className="flex flex-col items-center gap-1.5 md:items-start">
          <p className="text-v5-score font-semibold">{rating.toFixed(1)} / 5</p>
          <StarRating
            rating={rating}
            size={28}
            className="flex items-center gap-1"
          />
        </div>
      </div>
      <p className="text-v5-link font-normal">{caption}</p>
    </li>
  )
}

export default function RatingsSection() {
  return (
    <section className="bg-v5-page pt-4 md:px-[30px] md:pt-[30px]">
      <div className="mx-auto flex max-w-v5-content flex-col gap-[30px] md:flex-row md:items-stretch">
        <div className="flex flex-1 flex-col items-center gap-5 rounded-[20px] bg-v5-surface-light px-4 py-5 text-center md:items-start md:rounded-3xl md:p-[30px] md:text-left">
          <p className="flex h-8 items-center rounded-full border border-v5-accent/50 bg-v5-accent px-4 text-v5-body-s font-semibold capitalize text-v5-text-primary">
            Trusted by thousands
          </p>
          <h2 className="text-v5-display-sm-tight font-semibold text-v5-text-inverse md:text-v5-display-tight">
            Rated 5.0 on Google Play, 4.5 on the App Store
          </h2>
          <p className="text-v5-body-m font-normal text-v5-text-inverse md:w-[550px] md:text-v5-subtitle">
            Real reviews from people who&apos;ve moved their assets over. No
            seed phrase, no compromise.
          </p>
          <ul className="flex w-full flex-col gap-4 md:flex-row md:gap-[30px]">
            {STORE_SCORES.map((score) => (
              <StoreScoreCard key={score.store} {...score} />
            ))}
          </ul>
          <LandingButton
            asChild
            size="sm"
            className="mt-3 h-[50px] w-full max-w-[300px] md:hidden"
          >
            <Link href="/downloads">
              <Download aria-hidden />
              Download App
            </Link>
          </LandingButton>
        </div>

        <ReviewCarousel reviews={FALLBACK_REVIEWS} className="hidden md:flex" />
      </div>
    </section>
  )
}
