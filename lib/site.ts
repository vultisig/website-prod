// Site-wide identity shared by metadata, sitemaps and JSON-LD.

import type { Metadata } from "next"

export const SITE_URL = "https://vultisig.com"

export const ORGANIZATION_ID = `${SITE_URL}/#organization`

/** Default social share card; pages override `alt`, articles their own cover. */
export const SHARE_IMAGE = {
  url: `${SITE_URL}/thumbnails/home.png`,
  width: 1200,
  height: 630,
  alt: "Vultisig: the free MPC wallet that made seed phrases obsolete",
  type: "image/png",
}

/** Spread first into every page-level `openGraph` — Next replaces the root object, it does not merge it. */
export const OPEN_GRAPH_DEFAULTS = {
  type: "website",
  siteName: "Vultisig",
  locale: "en_US",
  images: [SHARE_IMAGE],
} satisfies NonNullable<Metadata["openGraph"]>
