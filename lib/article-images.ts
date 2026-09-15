export const PUBLIC_IMAGE_CACHE_CONTROL =
  "public, max-age=31536000, immutable"
export const PRIVATE_IMAGE_CACHE_CONTROL = "private, no-store"

const REGEX_ESCAPE = /[.*+?^${}()|[\]\\]/g

export function articleImagePath(id: string): string {
  return `/api/articles/image/${id}`
}

/** Exact cover match. The LCP path. Status-missing docs are legacy published. */
export function publishedCoverFilter(imagePath: string) {
  return {
    image: imagePath,
    $or: [{ status: "published" as const }, { status: { $exists: false } }],
  }
}

/** Inline markdown match. Only used when the cover field does not point here. */
export function publishedInlineFilter(imagePath: string) {
  const escaped = imagePath.replace(REGEX_ESCAPE, "\\$&")
  return {
    $and: [
      { $or: [{ status: "published" as const }, { status: { $exists: false } }] },
      { content: { $regex: escaped } },
    ],
  }
}
