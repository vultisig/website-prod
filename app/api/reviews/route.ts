import { NextRequest, NextResponse } from 'next/server'

interface Review {
  id: string
  text: string
  author: string
  score: number
  date: string
  store: 'google' | 'apple'
  url?: string
}

interface CachedData {
  testimonials: Array<{
    name: string
    text: string
    label: string
    store: 'google' | 'apple'
    date: string
    score: number
  }>
  timestamp: number
}

let cachedReviews: CachedData | null = null
let inflightFetch: Promise<CachedData> | null = null
const CACHE_TTL_MS = 30 * 60 * 1000
const REFRESH_FLOOR_MS = 60 * 1000
const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
}
const ERROR_CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
}

export const revalidate = 1800

function cachedResponse(data: CachedData, cached: boolean) {
  return NextResponse.json(
    {
      testimonials: data.testimonials,
      cached,
      lastUpdated: new Date(data.timestamp).toISOString(),
    },
    { headers: CACHE_HEADERS }
  )
}

export async function GET(request: NextRequest) {
  // Refresh is bypassed if we pulled within the floor — kills unbounded scraper hammering
  const refreshRequested = request.nextUrl.searchParams.get('refresh') === '1'
  const withinRefreshFloor =
    !!cachedReviews && Date.now() - cachedReviews.timestamp < REFRESH_FLOOR_MS
  const forceRefresh = refreshRequested && !withinRefreshFloor

  if (!forceRefresh && cachedReviews && Date.now() - cachedReviews.timestamp < CACHE_TTL_MS) {
    return cachedResponse(cachedReviews, true)
  }

  // Dedupe concurrent cache-miss callers onto a single upstream fetch
  if (!inflightFetch) {
    inflightFetch = fetchFreshReviews().finally(() => {
      inflightFetch = null
    })
  }

  try {
    const fresh = await inflightFetch
    return cachedResponse(fresh, false)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { testimonials: fallbackTestimonials, cached: false, lastUpdated: new Date().toISOString() },
      { headers: ERROR_CACHE_HEADERS }
    )
  }
}

async function fetchFreshReviews(): Promise<CachedData> {
  const GOOGLE_PLAY_APP_ID = 'com.vultisig.wallet'
  const APPLE_APP_ID = '6503023896'

  const gplayModule = await import('google-play-scraper')
  const storeModule = await import('app-store-scraper')
  const gplay = (gplayModule as any).default ?? gplayModule
  const appStore = (storeModule as any).default ?? storeModule

  const [googleReviews, appleReviews] = await Promise.allSettled([
    gplay.reviews({
      appId: GOOGLE_PLAY_APP_ID,
      sort: 2, // NEWEST
      num: 50,
      lang: 'en',
      country: 'us',
    }),
    appStore.reviews({
      id: APPLE_APP_ID,
      sort: appStore.sort?.RECENT ?? 'mostRecent',
      page: 1,
    }),
  ])

  const allReviews: Review[] = []

  if (googleReviews.status === 'fulfilled') {
    allReviews.push(
      ...googleReviews.value.data
        .filter((r: any) => r.score >= 4)
        .map((r: any) => ({
          id: r.id || `google-${Date.now()}-${Math.random()}`,
          text: r.text,
          author: r.userName || 'Anonymous',
          score: r.score,
          date: r.date || new Date().toISOString(),
          store: 'google' as const,
          url: r.url,
        })),
    )
  }

  if (appleReviews.status === 'fulfilled') {
    allReviews.push(
      ...appleReviews.value
        .filter((r: any) => r.score >= 4)
        .map((r: any) => ({
          id: r.id || `apple-${Date.now()}-${Math.random()}`,
          text: r.text,
          author: r.userName || 'Anonymous',
          score: r.score,
          date: r.date || new Date().toISOString(),
          store: 'apple' as const,
        })),
    )
  }

  const latestReviews = allReviews
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)

  const testimonials = latestReviews.map((review) => ({
    name: review.author,
    text: review.text.length > 200 ? review.text.substring(0, 200) + '...' : review.text,
    label: `${review.store === 'google' ? 'Google Play' : 'App Store'} Review`,
    store: review.store,
    date: review.date,
    score: review.score,
  }))

  cachedReviews = { testimonials, timestamp: Date.now() }
  return cachedReviews
}

const fallbackTestimonials = [
  {
    name: 'Mattj89iii',
    text: 'What this team is designing is pretty cool. No seed phrases to write down. No reliance on third parties. The vault is secured by backup shards you store anywhere you like (ideally not all in one place!).',
    label: 'Novel approach to self-custody',
    store: 'google' as const,
    date: new Date().toISOString(),
    score: 5,
  },
  {
    name: 'Tarekpac',
    text: "Say goodbye to hardware wallets! Experience superior security than traditional hardware wallets, with the flexibility to function as a 'hot wallet' when needed. Sleek, user-friendly interface.",
    label: 'Impeccable!',
    store: 'apple' as const,
    date: new Date().toISOString(),
    score: 5,
  },
  {
    name: 'Amalamud',
    text: 'Everyone needs this wallet asap, as only this wallet secures your funds in the best way by using multi factor authorization to sign transactions. Loving it',
    label: 'The most secure wallet, period',
    store: 'google' as const,
    date: new Date().toISOString(),
    score: 5,
  },
  {
    name: 'CryptoExpert',
    text: "The multi-signature approach is revolutionary. Finally, a wallet that doesn't compromise on security while maintaining ease of use. This is the future of crypto storage.",
    label: 'Revolutionary technology',
    store: 'apple' as const,
    date: new Date().toISOString(),
    score: 5,
  },
  {
    name: 'BlockchainDev',
    text: 'As a developer, I appreciate the technical excellence behind Vultisig. The architecture is solid, the security is top-notch, and the user experience is seamless.',
    label: 'Technical excellence',
    store: 'google' as const,
    date: new Date().toISOString(),
    score: 5,
  },
  {
    name: 'DeFiTrader',
    text: 'Switched from hardware wallets to Vultisig and never looked back. The convenience of multi-device signing without compromising security is exactly what I needed.',
    label: 'Perfect balance',
    store: 'apple' as const,
    date: new Date().toISOString(),
    score: 5,
  },
]
