import assert from "node:assert/strict"
import { test } from "node:test"

import {
  PRIVATE_IMAGE_CACHE_CONTROL,
  PUBLIC_IMAGE_CACHE_CONTROL,
  articleImagePath,
  publishedCoverFilter,
  publishedInlineFilter,
} from "./article-images.ts"

test("articleImagePath is the public route", () => {
  assert.equal(
    articleImagePath("6a47d2928ae0c3e1735812c6"),
    "/api/articles/image/6a47d2928ae0c3e1735812c6",
  )
})

test("published cover filter is an exact image match, not a regex", () => {
  const filter = publishedCoverFilter("/api/articles/image/abc")
  assert.equal(filter.image, "/api/articles/image/abc")
  assert.ok(!("content" in filter))
  assert.deepEqual(filter.$or, [
    { status: "published" },
    { status: { $exists: false } },
  ])
})

test("published inline filter regex-escapes the path", () => {
  const filter = publishedInlineFilter("/api/articles/image/a.c+")
  const content = filter.$and[1]?.content as { $regex: string }
  assert.equal(content.$regex, "/api/articles/image/a\\.c\\+")
})

test("cache headers: public immutable vs private no-store", () => {
  assert.match(PUBLIC_IMAGE_CACHE_CONTROL, /public/)
  assert.match(PUBLIC_IMAGE_CACHE_CONTROL, /immutable/)
  assert.match(PRIVATE_IMAGE_CACHE_CONTROL, /private/)
  assert.match(PRIVATE_IMAGE_CACHE_CONTROL, /no-store/)
})
