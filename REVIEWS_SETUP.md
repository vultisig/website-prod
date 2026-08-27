# Store ratings and reviews

`GET /api/reviews` (also `/api/v1/reviews`) returns live App Store and Google Play aggregates plus recent written reviews. The homepage ratings block renders that payload.

## Sources

- **Google Play** (`com.vultisig.wallet`): `google-play-scraper` `app()` + `reviews()`
- **App Store** (`6503023896`): iTunes lookup for the score; RSS, then the public reviews page, for written reviews

Cached in memory for 30 minutes. Concurrent callers share one upstream fetch.

## What is shown

- Four- and five-star reviews with at least 80 characters of non-emoji text
- At most six testimonials, interleaved across stores when both have qualifying reviews
- On fetch failure: last successful payload, or empty arrays. There is no invented fallback set.

## Manual check

```bash
node --test --experimental-strip-types lib/store-social-proof.test.ts
npm run dev
curl -s http://localhost:3000/api/reviews
```
