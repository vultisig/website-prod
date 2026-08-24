import { NextResponse, type NextRequest } from "next/server"

import { SITE_URL } from "@/lib/site"
import { STATIC_PAGES } from "@/lib/sitemap"

/** First path segments that belong to real page trees; their 404s stay HTML. */
const KNOWN_FIRST_SEGMENTS = new Set([
  ...STATIC_PAGES.map((page) => page.path.split("/")[1]).filter(Boolean),
  // Live but deliberately absent from the sitemap (noindexed until verified).
  "backed-by",
])

const MARKDOWN_404 = `# 404 — not found

Nothing lives at this path on vultisig.com. Where to look next:

- Site map: ${SITE_URL}/sitemap.xml
- Machine-readable site guide: ${SITE_URL}/llms.txt
- Public API description: ${SITE_URL}/openapi.json
- Documentation: https://docs.vultisig.com
`

/**
 * Agents fetching a nonexistent path get a short markdown 404 instead of the
 * full HTML shell; anything that asks for text/html keeps the HTML 404 page.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname === "/") return NextResponse.next()

  // %2E-encoded dots bypass the matcher's asset exclusion (/llms%2Etxt).
  let decodedPath: string
  try {
    decodedPath = decodeURIComponent(pathname)
  } catch {
    decodedPath = pathname
  }
  if (decodedPath.includes(".")) return NextResponse.next()

  const firstSegment = decodedPath.split("/")[1]
  if (KNOWN_FIRST_SEGMENTS.has(firstSegment)) return NextResponse.next()

  // Two bodies live on this URL, keyed by Accept — say so, and keep 404s out of CDN caches.
  if ((request.headers.get("accept") ?? "").includes("text/html")) {
    const response = NextResponse.next()
    response.headers.set("Vary", "Accept")
    return response
  }

  return new NextResponse(MARKDOWN_404, {
    status: 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "no-store",
      Vary: "Accept",
    },
  })
}

export const config = {
  // Literal dotted paths, /api and /_next never run the proxy; encoded dots are
  // caught inside the handler after decoding.
  matcher: ["/((?!api(?:/|$)|_next(?:/|$)|.*\\..*).*)"],
}
