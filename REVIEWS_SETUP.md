# Review Fetching System Setup

This system fetches the latest 6 five-star reviews from both Google Play Store and Apple App Store and displays them in the testimonials section.

## Setup Instructions

### 1. Update App IDs

In `app/api/reviews/route.ts`, replace the placeholder app IDs with your actual app IDs:

```typescript
const GOOGLE_PLAY_APP_ID = 'com.vultisig.app' // Replace with your actual Google Play app ID
const APPLE_APP_ID = 'vultisig' // Replace with your actual Apple App Store app ID
```

To find your app IDs:
- **Google Play**: Look at your app's URL on Google Play Store
- **Apple App Store**: Use the numeric ID from your app's App Store URL

### 2. Test the Scrapers

Run the test script to verify the scrapers work:

```bash
node --experimental-modules scripts/test-scrapers.js
```

### 3. Test the API

Start the development server:

```bash
npm run dev
```

Then test the API endpoint:

```bash
node scripts/test-api.js
```

Or visit: `http://localhost:3000/api/reviews`

### 4. How It Works

The system:

1. **Fetches Reviews**: Uses the `google-play-scraper` and `app-store-scraper` libraries to fetch reviews
2. **Filters**: Only keeps 5-star reviews
3. **Combines**: Merges reviews from both stores
4. **Sorts**: Orders by date (newest first)
5. **Limits**: Returns only the latest 6 reviews
6. **Fallback**: If scraping fails, shows static testimonials

### 5. Features

- **Real-time**: Fetches live reviews from app stores
- **Filtered**: Only shows 5-star reviews
- **Combined**: Shows reviews from both Google Play and Apple App Store
- **Responsive**: Works on mobile and desktop
- **Fallback**: Graceful degradation if scraping fails
- **Loading State**: Shows loading spinner while fetching

### 6. Customization

You can customize:

- **Number of reviews**: Change the `slice(0, 6)` in the API route
- **Review length**: Modify the text truncation (currently 200 characters)
- **Sorting**: Change the sort order (currently newest first)
- **Filtering**: Modify the score filter (currently 5 stars only)

### 7. Troubleshooting

If reviews aren't loading:

1. Check your app IDs are correct
2. Verify your apps have reviews on the stores
3. Check the browser console for errors
4. Test the scrapers individually
5. Check if the stores are blocking requests (may need to add delays)

### 8. Rate Limiting

The scrapers may be rate-limited by Google Play and Apple App Store. If you experience issues:

- Add delays between requests
- Use the memoized versions of the scrapers
- Consider caching results
- Implement retry logic

### 9. Security Notes

- The scrapers make requests to external APIs
- Consider implementing caching to reduce external requests
- Monitor for rate limiting and implement appropriate delays
- The system includes fallback testimonials for reliability 