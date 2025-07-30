declare module 'app-store-scraper' {
  interface ReviewOptions {
    id: string
    sort?: 'mostRecent' | 'mostHelpful' | 'mostFavorable' | 'mostCritical'
    page?: number
    country?: string
  }

  interface Review {
    id: string
    text: string
    userName: string
    score: number
    date: string
    title?: string
    url?: string
  }

  function reviews(options: ReviewOptions): Promise<Review[]>
  
  export default {
    reviews
  }
} 