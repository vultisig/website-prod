import { z } from "zod"

import {
  APPLE_APP_ID,
  GOOGLE_PLAY_APP_ID,
  appleCaption,
  displayScore,
  extractAppleReviewsFromHtml,
  parseAppleRss,
  pickTestimonials,
  playCaption,
  type RawReview,
  type StoreAggregate,
  type Testimonial,
} from "@/lib/store-social-proof"

const CACHE_TTL_MS = 30 * 60 * 1000
const REFRESH_FLOOR_MS = 60 * 1000
const FETCH_TIMEOUT_MS = 8000
const PLAY_REVIEW_COUNT = 50
const PLAY_SORT_NEWEST = 2
const APPLE_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15"
const APPLE_LOOKUP_URL = `https://itunes.apple.com/lookup?id=${APPLE_APP_ID}&country=us`
const APPLE_RSS_URL = `https://itunes.apple.com/us/rss/customerreviews/id=${APPLE_APP_ID}/sortBy=mostRecent/json`
const APPLE_REVIEWS_HTML_URL = `https://apps.apple.com/us/app/id${APPLE_APP_ID}?see-all=reviews`

const itunesLookupSchema = z.object({
  results: z
    .array(
      z.object({
        averageUserRating: z.number(),
        userRatingCount: z.number(),
      }),
    )
    .min(1),
})

const playAppSchema = z.object({
  score: z.number(),
  scoreText: z.string().optional(),
  ratings: z.number(),
  minInstalls: z.number().optional(),
})

const playReviewSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  userName: z.string().optional(),
  text: z.string().optional(),
  score: z.number(),
  date: z.union([z.string(), z.date()]).optional(),
})

const playReviewsSchema = z.object({
  data: z.array(playReviewSchema),
})

export type StoreSocialProof = {
  testimonials: Testimonial[]
  stores: StoreAggregate[]
  fetchedAt: number
}

type CacheEntry = {
  data: StoreSocialProof
  timestamp: number
}

type ProofResult = { data: StoreSocialProof; cached: boolean }

let cache: CacheEntry | null = null
let inflight: Promise<ProofResult> | null = null

export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`timed out after ${ms}ms`)), ms)
    promise.then(
      (value) => {
        clearTimeout(timer)
        resolve(value)
      },
      (error) => {
        clearTimeout(timer)
        reject(error)
      },
    )
  })
}

function isoDate(value: string | Date | undefined): string {
  if (value instanceof Date) return value.toISOString()
  if (typeof value === "string" && value.length > 0) return value
  return new Date().toISOString()
}

async function fetchStore(url: string, accept: string): Promise<Response> {
  const response = await fetch(url, {
    headers: { "User-Agent": APPLE_UA, Accept: accept },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    cache: "no-store",
  })
  if (!response.ok) throw new Error(`${url} → ${response.status}`)
  return response
}

async function fetchJson(url: string): Promise<unknown> {
  return (await fetchStore(url, "application/json")).json()
}

async function fetchText(url: string): Promise<string> {
  return (await fetchStore(url, "text/html")).text()
}

async function playClient() {
  const gplayModule = await import("google-play-scraper")
  return gplayModule.default
}

async function fetchPlayApp(): Promise<StoreAggregate> {
  const gplay = await playClient()
  const raw = await withTimeout(
    gplay.app({ appId: GOOGLE_PLAY_APP_ID, lang: "en", country: "us" }),
    FETCH_TIMEOUT_MS,
  )
  const app = playAppSchema.parse(raw)
  const score = displayScore(app.score, app.scoreText)
  return {
    id: "google",
    name: "Google Play",
    rating: Number(score),
    displayScore: score,
    caption: playCaption(app.ratings, app.minInstalls ?? 0),
  }
}

async function fetchAppleApp(): Promise<StoreAggregate> {
  const raw = await fetchJson(APPLE_LOOKUP_URL)
  const result = itunesLookupSchema.parse(raw).results[0]
  const score = displayScore(result.averageUserRating)
  return {
    id: "apple",
    name: "App Store",
    rating: Number(score),
    displayScore: score,
    caption: appleCaption(result.userRatingCount),
  }
}

async function fetchPlayReviews(): Promise<RawReview[]> {
  const gplay = await playClient()
  const raw = await withTimeout(
    gplay.reviews({
      appId: GOOGLE_PLAY_APP_ID,
      sort: PLAY_SORT_NEWEST,
      num: PLAY_REVIEW_COUNT,
      lang: "en",
      country: "us",
    }),
    FETCH_TIMEOUT_MS,
  )
  const parsed = playReviewsSchema.parse(raw)
  const reviews: RawReview[] = []
  for (const [index, item] of parsed.data.entries()) {
    const text = item.text ?? ""
    const author = item.userName ?? ""
    if (!author || !text) continue
    reviews.push({
      id: String(item.id ?? `google-${author}-${index}`),
      author,
      text,
      score: item.score,
      date: isoDate(item.date),
      store: "google",
    })
  }
  return reviews
}

async function fetchAppleReviewsRss(): Promise<RawReview[]> {
  return parseAppleRss(await fetchJson(APPLE_RSS_URL))
}

async function fetchAppleReviewsHtml(): Promise<RawReview[]> {
  return extractAppleReviewsFromHtml(await fetchText(APPLE_REVIEWS_HTML_URL))
}

function mergeAppleReviews(groups: RawReview[][]): RawReview[] {
  const byId = new Map<string, RawReview>()
  for (const group of groups) {
    for (const review of group) {
      if (!byId.has(review.id)) byId.set(review.id, review)
    }
  }
  return [...byId.values()]
}

async function fetchFresh(): Promise<StoreSocialProof> {
  const [playApp, appleApp, playReviews, appleRss, appleHtml] =
    await Promise.allSettled([
      fetchPlayApp(),
      fetchAppleApp(),
      fetchPlayReviews(),
      fetchAppleReviewsRss(),
      fetchAppleReviewsHtml(),
    ])

  const stores: StoreAggregate[] = []
  if (appleApp.status === "fulfilled") stores.push(appleApp.value)
  if (playApp.status === "fulfilled") stores.push(playApp.value)

  const appleReviews = mergeAppleReviews([
    appleRss.status === "fulfilled" ? appleRss.value : [],
    appleHtml.status === "fulfilled" ? appleHtml.value : [],
  ])
  const googleReviews =
    playReviews.status === "fulfilled" ? playReviews.value : []

  if (playApp.status === "rejected") {
    console.error("Play aggregate failed:", playApp.reason)
  }
  if (appleApp.status === "rejected") {
    console.error("App Store aggregate failed:", appleApp.reason)
  }

  return {
    stores,
    testimonials: pickTestimonials([...googleReviews, ...appleReviews]),
    fetchedAt: Date.now(),
  }
}

function mergeWithCache(fresh: StoreSocialProof): StoreSocialProof {
  const previous = cache?.data
  const stores =
    fresh.stores.length > 0 ? fresh.stores : (previous?.stores ?? [])
  const testimonials =
    fresh.testimonials.length > 0
      ? fresh.testimonials
      : (previous?.testimonials ?? [])
  return { stores, testimonials, fetchedAt: Date.now() }
}

function isFreshEnough(entry: CacheEntry, forceRefresh: boolean): boolean {
  const age = Date.now() - entry.timestamp
  if (forceRefresh) return age < REFRESH_FLOOR_MS
  return age < CACHE_TTL_MS
}

async function loadStoreSocialProof(): Promise<ProofResult> {
  try {
    const merged = mergeWithCache(await fetchFresh())
    if (merged.stores.length > 0 || merged.testimonials.length > 0) {
      cache = { data: merged, timestamp: Date.now() }
    }
    return { data: merged, cached: false }
  } catch (error) {
    console.error("Error fetching store social proof:", error)
    if (cache) return { data: cache.data, cached: true }
    return {
      data: { stores: [], testimonials: [], fetchedAt: Date.now() },
      cached: false,
    }
  } finally {
    inflight = null
  }
}

export async function getStoreSocialProof(options?: {
  forceRefresh?: boolean
}): Promise<ProofResult> {
  const forceRefresh = options?.forceRefresh === true
  if (cache && isFreshEnough(cache, forceRefresh)) {
    return { data: cache.data, cached: true }
  }
  if (inflight) return inflight
  inflight = loadStoreSocialProof()
  return inflight
}
