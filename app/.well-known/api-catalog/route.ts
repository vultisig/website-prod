import { SITE_URL } from "@/lib/site"

// RFC 9727 API catalog: points agents at the OpenAPI description and the docs.
const API_CATALOG = {
  linkset: [
    {
      anchor: `${SITE_URL}/`,
      "service-desc": [
        { href: `${SITE_URL}/openapi.json`, type: "application/openapi+json" },
      ],
      "service-doc": [{ href: `${SITE_URL}/llms.txt`, type: "text/plain" }],
      "service-meta": [
        {
          href: `${SITE_URL}/.well-known/agent.json`,
          type: "application/json",
        },
      ],
    },
  ],
}

export function GET() {
  return Response.json(API_CATALOG, {
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
