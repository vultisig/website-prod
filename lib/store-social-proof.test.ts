import assert from "node:assert/strict"
import test from "node:test"

import {
  appleCaption,
  compactInstalls,
  displayScore,
  extractAppleReviewsFromHtml,
  isDisplayableReview,
  parseAppleRss,
  pickTestimonials,
  playCaption,
  ratingsHeadline,
  truncateReview,
  type RawReview,
  type StoreAggregate,
} from "./store-social-proof.ts"

function review(
  store: RawReview["store"],
  author: string,
  text: string,
  score: number,
  date: string,
): RawReview {
  return { id: `${store}-${author}`, store, author, text, score, date }
}

const longPlay =
  "Vultisig nails what a wallet should be secure without the usual complexity. No seed phrase stress, smooth UX, and strong multi-device protection."
const longApple =
  "Finally, a crypto wallet that doesn't feel like it was designed in 2015. Vultisig's UI is genuinely one of the cleanest I've used."

test("displayScore prefers Play scoreText and rounds Apple to one decimal", () => {
  assert.equal(displayScore(4.6666665, "4.7"), "4.7")
  assert.equal(displayScore(4.53968), "4.5")
  assert.equal(displayScore(5, "5.0"), "5.0")
  assert.equal(displayScore(5, "five"), "5.0")
})

test("compactInstalls uses Play-style buckets", () => {
  assert.equal(compactInstalls(10_000), "10K+")
  assert.equal(compactInstalls(1_000_000), "1M+")
  assert.equal(compactInstalls(500), "500+")
})

test("captions match each store's wording", () => {
  assert.equal(appleCaption(63), "63 ratings")
  assert.equal(playCaption(445, 10_000), "445 reviews · 10K+ downloads")
})

test("isDisplayableReview drops short and low-score reviews", () => {
  assert.equal(
    isDisplayableReview("This platform is amazing, I'm in love 😍", 5),
    false,
  )
  assert.equal(isDisplayableReview("the app is very good", 5), false)
  assert.equal(isDisplayableReview(longPlay, 5), true)
  assert.equal(isDisplayableReview(longPlay, 3), false)
})

test("truncateReview caps at 200 characters", () => {
  const text = "a".repeat(210)
  const truncated = truncateReview(text)
  assert.equal(truncated.endsWith("..."), true)
  assert.equal(truncated.length, 203)
})

test("pickTestimonials drops Tony Green and interleaves stores", () => {
  const picked = pickTestimonials([
    review("google", "Tony Green", "This platform is amazing, I'm in love 😍", 5, "2026-07-26"),
    review("google", "June", longPlay, 5, "2026-04-12"),
    review("apple", "Donnydrill", longApple, 5, "2026-03-10"),
    review("google", "CryptoExpert", "too short", 5, "2026-08-01"),
  ])
  assert.equal(picked.some((item) => item.name === "Tony Green"), false)
  assert.equal(picked.some((item) => item.name === "CryptoExpert"), false)
  assert.deepEqual(
    picked.map((item) => item.name),
    ["June", "Donnydrill"],
  )
  assert.equal(picked[0]?.label, "Google Play Review")
  assert.equal(picked[1]?.label, "App Store Review")
})

test("ratingsHeadline never claims 5.0 when Play is 4.7", () => {
  const stores: StoreAggregate[] = [
    {
      id: "google",
      name: "Google Play",
      rating: 4.7,
      displayScore: "4.7",
      caption: "445 reviews · 10K+ downloads",
    },
    {
      id: "apple",
      name: "App Store",
      rating: 4.5,
      displayScore: "4.5",
      caption: "63 ratings",
    },
  ]
  assert.equal(
    ratingsHeadline(stores),
    "Rated 4.7 on Google Play, 4.5 on the App Store",
  )
  assert.equal(ratingsHeadline([]).includes("5.0"), false)
})

test("parseAppleRss skips the app entry and short reviews", () => {
  const parsed = parseAppleRss({
    feed: {
      entry: [
        { title: { label: "Vultisig" }, id: { label: "app" } },
        {
          id: { label: "r1" },
          author: { name: { label: "Donnydrill" } },
          content: { label: longApple },
          updated: { label: "2026-03-10T13:02:41-07:00" },
          "im:rating": { label: "5" },
        },
        {
          id: { label: "r2" },
          author: { name: { label: "mimi" } },
          content: { label: "Nice✨" },
          updated: { label: "2026-03-25T07:54:17-07:00" },
          "im:rating": { label: "5" },
        },
      ],
    },
  })
  assert.equal(parsed.length, 1)
  assert.equal(parsed[0]?.author, "Donnydrill")
})

test("extractAppleReviewsFromHtml reads ProductReview JSON and dedupes", () => {
  const review = {
    $kind: "Review",
    id: "13833416205",
    contents: longApple,
    rating: 5,
    reviewerName: "Donnydrill",
    date: "2026-03-10T13:02:41.000Z",
  }
  const html = `<html><script>${JSON.stringify({
    allProductReviews: {
      items: [
        { review, moreAction: { pageData: { shelves: [{ items: [review] }] } } },
      ],
    },
  })}</script></html>`
  const parsed = extractAppleReviewsFromHtml(html)
  assert.equal(parsed.length, 1)
  assert.equal(parsed[0]?.author, "Donnydrill")
  assert.equal(parsed[0]?.score, 5)
})
