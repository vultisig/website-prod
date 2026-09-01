// Site-wide identity shared by metadata, sitemaps and JSON-LD.

import type { Metadata } from "next"

export const SITE_URL = "https://vultisig.com"

export const ORGANIZATION_ID = `${SITE_URL}/#organization`

/** Default social share card; pages override `alt`, articles their own cover. */
export const SHARE_IMAGE = {
  // Its own filename rather than a swap over the old card: crawlers key their
  // cache on the URL, so reusing one would keep serving the retired art.
  url: `${SITE_URL}/thumbnails/og-default.jpg`,
  width: 1200,
  height: 630,
  alt: "The Vultisig app on two phones, beside the words 'The Only wallet you'll ever want.'",
  type: "image/jpeg",
}

/** Spread first into every page-level `openGraph` — Next replaces the root object, it does not merge it. */
export const OPEN_GRAPH_DEFAULTS = {
  type: "website",
  siteName: "Vultisig",
  locale: "en_US",
  images: [SHARE_IMAGE],
} satisfies NonNullable<Metadata["openGraph"]>
