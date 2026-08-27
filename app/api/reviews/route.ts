import { NextRequest, NextResponse } from "next/server"

import { getStoreSocialProof } from "@/lib/fetch-store-social-proof"

export const runtime = "nodejs"
export const revalidate = 1800

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
}

export async function GET(request: NextRequest) {
  const refreshRequested = request.nextUrl.searchParams.get("refresh") === "1"
  const { data, cached } = await getStoreSocialProof({
    forceRefresh: refreshRequested,
  })

  return NextResponse.json(
    {
      testimonials: data.testimonials,
      stores: data.stores,
      cached,
      lastUpdated: new Date(data.fetchedAt).toISOString(),
    },
    { headers: CACHE_HEADERS },
  )
}
