export const GOOGLE_PLAY_APP_ID = "com.vultisig.wallet"
export const APPLE_APP_ID = "6503023896"

export const MIN_REVIEW_SCORE = 4
export const MIN_REVIEW_CHARS = 80
export const MAX_TESTIMONIALS = 6
export const REVIEW_TEXT_MAX = 200

const EMOJI_AND_SPACE = /\p{Extended_Pictographic}/gu
const COLLAPSE_SPACE = /\s+/g
const ONE_DECIMAL = /^\d+\.\d$/

export type StoreId = "apple" | "google"

export type RawReview = {
  id: string
  author: string
  text: string
  score: number
  date: string
  store: StoreId
}

export type Testimonial = {
  name: string
  text: string
  label: string
  store: StoreId
  date: string
  score: number
}

export type StoreAggregate = {
  id: StoreId
  name: "App Store" | "Google Play"
  rating: number
  displayScore: string
  caption: string
}

export function displayScore(score: number, scoreText?: string): string {
  if (scoreText && ONE_DECIMAL.test(scoreText)) return scoreText
  return (Math.round(score * 10) / 10).toFixed(1)
}

export function compactInstalls(minInstalls: number): string {
  if (minInstalls >= 1_000_000) return `${Math.floor(minInstalls / 1_000_000)}M+`
  if (minInstalls >= 1_000) return `${Math.floor(minInstalls / 1_000)}K+`
  return `${minInstalls}+`
}

export function appleCaption(ratingCount: number): string {
  return `${ratingCount.toLocaleString("en-US")} ratings`
}

export function playCaption(ratingCount: number, minInstalls: number): string {
  return `${ratingCount.toLocaleString("en-US")} reviews · ${compactInstalls(minInstalls)} downloads`
}

export function reviewLabel(store: StoreId): string {
  return store === "google" ? "Google Play Review" : "App Store Review"
}

export function isDisplayableReview(text: string, score: number): boolean {
  if (score < MIN_REVIEW_SCORE) return false
  const stripped = text
    .replace(EMOJI_AND_SPACE, "")
    .replace(COLLAPSE_SPACE, " ")
    .trim()
  return stripped.length >= MIN_REVIEW_CHARS
}

export function truncateReview(text: string): string {
  if (text.length <= REVIEW_TEXT_MAX) return text
  return `${text.slice(0, REVIEW_TEXT_MAX).trimEnd()}...`
}

export function toTestimonial(review: RawReview): Testimonial {
  return {
    name: review.author,
    text: truncateReview(review.text),
    label: reviewLabel(review.store),
    store: review.store,
    date: review.date,
    score: review.score,
  }
}

function byDateDesc(left: RawReview, right: RawReview): number {
  return new Date(right.date).getTime() - new Date(left.date).getTime()
}

export function pickTestimonials(reviews: RawReview[]): Testimonial[] {
  const displayable = reviews
    .filter((review) => isDisplayableReview(review.text, review.score))
    .sort(byDateDesc)
  const google = displayable.filter((review) => review.store === "google")
  const apple = displayable.filter((review) => review.store === "apple")
  if (apple.length === 0) return google.slice(0, MAX_TESTIMONIALS).map(toTestimonial)
  if (google.length === 0) return apple.slice(0, MAX_TESTIMONIALS).map(toTestimonial)

  const googleFirst =
    new Date(google[0]?.date ?? 0).getTime() >=
    new Date(apple[0]?.date ?? 0).getTime()
  return interleave(
    googleFirst ? google : apple,
    googleFirst ? apple : google,
  ).map(toTestimonial)
}

function interleave(first: RawReview[], second: RawReview[]): RawReview[] {
  const picked: RawReview[] = []
  let i = 0
  let j = 0
  while (picked.length < MAX_TESTIMONIALS && (i < first.length || j < second.length)) {
    const a = first[i]
    if (a) {
      picked.push(a)
      i += 1
    }
    if (picked.length >= MAX_TESTIMONIALS) break
    const b = second[j]
    if (b) {
      picked.push(b)
      j += 1
    }
  }
  return picked
}

export function ratingsHeadline(stores: StoreAggregate[]): string {
  const play = stores.find((store) => store.id === "google")
  const apple = stores.find((store) => store.id === "apple")
  if (play && apple) {
    return `Rated ${play.displayScore} on Google Play, ${apple.displayScore} on the App Store`
  }
  if (play) return `Rated ${play.displayScore} on Google Play`
  if (apple) return `Rated ${apple.displayScore} on the App Store`
  return "Reviews from people who've moved their assets over"
}

function rssLabel(node: unknown): string {
  if (!node || typeof node !== "object") return ""
  const value = (node as { label?: unknown }).label
  return typeof value === "string" ? value : ""
}

function asList<T>(value: T | T[] | undefined): T[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

export function parseAppleRss(payload: unknown): RawReview[] {
  if (!payload || typeof payload !== "object") return []
  const feed = (payload as { feed?: { entry?: unknown } }).feed
  const entries = asList(feed?.entry) as Array<Record<string, unknown>>
  const reviews: RawReview[] = []
  for (const entry of entries) {
    const score = Number(rssLabel(entry["im:rating"]))
    const text = rssLabel(entry.content)
    const author = rssLabel(
      (entry.author as { name?: unknown } | undefined)?.name,
    )
    if (!author || !isDisplayableReview(text, score)) continue
    reviews.push({
      id: rssLabel(entry.id) || `apple-${author}-${rssLabel(entry.updated)}`,
      author,
      text,
      score,
      date: rssLabel(entry.updated) || new Date().toISOString(),
      store: "apple",
    })
  }
  return reviews
}

function jsonScripts(html: string): unknown[] {
  const scripts: unknown[] = []
  const matcher = /<script\b[^>]*>([\s\S]*?)<\/script>/gi
  for (const match of html.matchAll(matcher)) {
    const body = match[1]?.trim() ?? ""
    if (!body.startsWith("{")) continue
    try {
      scripts.push(JSON.parse(body))
    } catch {
      continue
    }
  }
  return scripts
}

function collectAppleReviews(node: unknown, into: Map<string, RawReview>): void {
  if (Array.isArray(node)) {
    for (const child of node) collectAppleReviews(child, into)
    return
  }
  if (!node || typeof node !== "object") return
  const record = node as Record<string, unknown>
  const text = record.contents
  const author = record.reviewerName
  const score = record.rating
  if (
    record.$kind === "Review" &&
    typeof text === "string" &&
    typeof author === "string" &&
    typeof score === "number"
  ) {
    const id = String(record.id ?? `${author}-${record.date}`)
    if (!into.has(id)) {
      into.set(id, {
        id,
        author,
        text,
        score,
        date:
          typeof record.date === "string" ? record.date : new Date().toISOString(),
        store: "apple",
      })
    }
  }
  for (const value of Object.values(record)) collectAppleReviews(value, into)
}

export function extractAppleReviewsFromHtml(html: string): RawReview[] {
  const found = new Map<string, RawReview>()
  for (const script of jsonScripts(html)) collectAppleReviews(script, found)
  return [...found.values()]
}
