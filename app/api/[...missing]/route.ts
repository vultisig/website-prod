import { NextResponse } from "next/server"

import { SITE_URL } from "@/lib/site"

// JSON, not the HTML shell: to an agent a 75KB not-found page reads as "every path exists".
function jsonNotFound() {
  return NextResponse.json(
    {
      message: "Not found",
      hint: `The public API is described at ${SITE_URL}/openapi.json`,
    },
    { status: 404 },
  )
}

export const GET = jsonNotFound
export const POST = jsonNotFound
export const PUT = jsonNotFound
export const PATCH = jsonNotFound
export const DELETE = jsonNotFound
