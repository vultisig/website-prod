import { Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import ReviewCarousel from "@/components/review-carousel"
import StarRating from "@/components/ui/star-rating"
import { LandingButton } from "@/components/ui/landing-button"
import { getStoreSocialProof } from "@/lib/fetch-store-social-proof"
import {
  ratingsHeadline,
  type StoreAggregate,
} from "@/lib/store-social-proof"

const STORE_ICONS: Record<StoreAggregate["id"], string> = {
  apple: "/v5/store-app-store.webp",
  google: "/v5/store-google-play.webp",
}

function StoreScoreCard({ store }: { store: StoreAggregate }) {
  return (
    <li className="flex flex-1 flex-col items-center gap-4 rounded-3xl bg-v5-page p-6 text-v5-text-inverse md:items-start">
      <div className="flex w-full flex-col items-center gap-5 md:flex-row">
        <Image
          src={STORE_ICONS[store.id]}
          alt={`${store.name} logo`}
          width={42}
          height={46}
          className="h-[46px] w-auto md:h-[42px]"
        />
        <div className="flex flex-col items-center gap-1.5 md:items-start">
          <p className="text-v5-score font-semibold">
            {store.displayScore} / 5
          </p>
          <StarRating
            rating={store.rating}
            size={28}
            className="flex items-center gap-1"
          />
        </div>
      </div>
      <p className="text-v5-link font-normal">{store.caption}</p>
    </li>
  )
}

export function RatingsSectionFallback() {
  return (
    <section
      className="bg-v5-page pt-4 md:px-[30px] md:pt-[30px]"
      aria-hidden
    >
      <div className="mx-auto min-h-[420px] max-w-v5-content rounded-[20px] bg-v5-surface-light md:rounded-3xl" />
    </section>
  )
}

export default async function RatingsSection() {
  const { data } = await getStoreSocialProof()
  const headline = ratingsHeadline(data.stores)

  return (
    <section
      id="ratings"
      className="scroll-mt-28 bg-v5-page pt-4 md:px-[30px] md:pt-[30px]"
    >
      <div className="mx-auto flex max-w-v5-content flex-col gap-[30px] md:flex-row md:items-stretch">
        <div className="flex flex-1 flex-col items-center gap-5 rounded-[20px] bg-v5-surface-light px-4 py-5 text-center md:items-start md:rounded-3xl md:p-[30px] md:text-left">
          <p className="flex h-8 items-center rounded-full border border-v5-accent/50 bg-v5-accent px-4 text-v5-body-s font-semibold capitalize text-v5-text-primary">
            Trusted by thousands
          </p>
          <h2 className="text-v5-display-sm-tight font-semibold text-v5-text-inverse md:text-v5-display-tight">
            {headline}
          </h2>
          <p className="text-v5-body-m font-normal text-v5-text-inverse md:w-[550px] md:text-v5-subtitle">
            Real reviews from people who&apos;ve moved their assets over. No
            seed phrase, no compromise.
          </p>
          {data.stores.length > 0 ? (
            <ul className="flex w-full flex-col gap-4 md:flex-row md:gap-[30px]">
              {data.stores.map((store) => (
                <StoreScoreCard key={store.id} store={store} />
              ))}
            </ul>
          ) : null}
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

        {data.testimonials.length > 0 ? (
          <ReviewCarousel
            reviews={data.testimonials}
            className="hidden v5wide:flex"
          />
        ) : null}
      </div>
    </section>
  )
}
