import { SITE_URL } from './site'

// Public by protocol: search engines fetch `${SITE_URL}/${INDEXNOW_KEY}.txt` to verify the host.
const INDEXNOW_KEY = '311fdad0d8992b2c7bb13637b946a0e3'
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

/** Absolute URL of an article page, the form IndexNow expects. */
export function articleUrl(slug: string): string {
  return `${SITE_URL}/articles/${slug}`
}

/** Tells IndexNow engines (Bing, Yandex, Seznam, Naver) that these URLs changed. Production only. */
export async function notifyIndexNow(urls: string[]): Promise<void> {
  if (process.env.NODE_ENV !== 'production' || urls.length === 0) return

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  })
  if (!res.ok) console.warn(`IndexNow ping failed: ${res.status} for ${urls.join(', ')}`)
}
