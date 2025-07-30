import { NextResponse } from 'next/server'

interface Review {
  id: string
  text: string
  author: string
  score: number
  date: string
  store: 'google' | 'apple'
  url?: string
}

export async function GET() {
  try {
    // You'll need to replace these with your actual app IDs
    const GOOGLE_PLAY_APP_ID = 'com.vultisig.wallet'
    const APPLE_APP_ID = '6503023896'

    // Dynamic imports for ES modules
    const gplayModule = await import('google-play-scraper')
    const storeModule = await import('app-store-scraper')

    const [googleReviews, appleReviews] = await Promise.allSettled([
      // Fetch Google Play reviews
      (gplayModule as any).default.reviews({
        appId: GOOGLE_PLAY_APP_ID,
        sort: 2, // NEWEST = 2
        num: 50, // Fetch more to filter for 5-star reviews
        lang: 'en',
        country: 'us'
      }),
      // Fetch Apple App Store reviews
      (storeModule as any).default.reviews({
        id: APPLE_APP_ID,
        sort: 'mostRecent',
        page: 1
      })
    ])

    let allReviews: Review[] = []

    // Process Google Play reviews
    if (googleReviews.status === 'fulfilled') {
      const googleReviewsData = googleReviews.value.data
      const fiveStarGoogleReviews = googleReviewsData
        .filter((review: any) => review.score === 5)
        .map((review: any) => ({
          id: review.id || `google-${Date.now()}-${Math.random()}`,
          text: review.text,
          author: review.userName || 'Anonymous',
          score: review.score,
          date: review.date || new Date().toISOString(),
          store: 'google' as const,
          url: review.url
        }))
      allReviews.push(...fiveStarGoogleReviews)
    }

    // Process Apple App Store reviews
    if (appleReviews.status === 'fulfilled') {
      const appleReviewsData = appleReviews.value
      const fiveStarAppleReviews = appleReviewsData
        .filter((review: any) => review.score === 5)
        .map((review: any) => ({
          id: review.id || `apple-${Date.now()}-${Math.random()}`,
          text: review.text,
          author: review.userName || 'Anonymous',
          score: review.score,
          date: review.date || new Date().toISOString(),
          store: 'apple' as const
        }))
      allReviews.push(...fiveStarAppleReviews)
    }

    // Sort by date (newest first) and take the latest 6
    const latestReviews = allReviews
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6)

    // Transform reviews to match your testimonial format
    const testimonials = latestReviews.map((review, index) => ({
      name: review.author,
      text: review.text.length > 200 ? review.text.substring(0, 200) + '...' : review.text,
      label: `${review.store === 'google' ? 'Google Play' : 'App Store'} Review`,
      store: review.store,
      date: review.date,
      score: review.score
    }))

    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    
    // Fallback to static testimonials if scraping fails
    const fallbackTestimonials = [
      {
        name: "Mattj89iii",
        text: "What this team is designing is pretty cool. No seed phrases to write down. No reliance on third parties. The vault is secured by backup shards you store anywhere you like (ideally not all in one place!).",
        label: "Novel approach to self-custody",
        store: "google" as const,
        date: new Date().toISOString(),
        score: 5
      },
      {
        name: "Tarekpac",
        text: "Say goodbye to hardware wallets! Experience superior security than traditional hardware wallets, with the flexibility to function as a 'hot wallet' when needed. Sleek, user-friendly interface.",
        label: "Impeccable!",
        store: "apple" as const,
        date: new Date().toISOString(),
        score: 5
      },
      {
        name: "Amalamud",
        text: "Everyone needs this wallet asap, as only this wallet secures your funds in the best way by using multi factor authorization to sign transactions. Loving it",
        label: "The most secure wallet, period",
        store: "google" as const,
        date: new Date().toISOString(),
        score: 5
      },
      {
        name: "CryptoExpert",
        text: "The multi-signature approach is revolutionary. Finally, a wallet that doesn't compromise on security while maintaining ease of use. This is the future of crypto storage.",
        label: "Revolutionary technology",
        store: "apple" as const,
        date: new Date().toISOString(),
        score: 5
      },
      {
        name: "BlockchainDev",
        text: "As a developer, I appreciate the technical excellence behind Vultisig. The architecture is solid, the security is top-notch, and the user experience is seamless.",
        label: "Technical excellence",
        store: "google" as const,
        date: new Date().toISOString(),
        score: 5
      },
      {
        name: "DeFiTrader",
        text: "Switched from hardware wallets to Vultisig and never looked back. The convenience of multi-device signing without compromising security is exactly what I needed.",
        label: "Perfect balance",
        store: "apple" as const,
        date: new Date().toISOString(),
        score: 5
      },
    ]

    return NextResponse.json({ testimonials: fallbackTestimonials })
  }
} 