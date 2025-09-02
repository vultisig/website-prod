"use client";

import Script from "next/script";

export default function CookieAnalytics() {
  return (
    <Script
      id="cookie-analytics"
      src="https://cdn.markfi.xyz/scripts/analytics/0.11.24/cookie3.analytics.min.js"
      strategy="afterInteractive"
      crossOrigin="anonymous"
      integrity="sha384-ihnQ09PGDbDPthGB3QoQ2Heg2RwQIDyWkHkqxMzq91RPeP8OmydAZbQLgAakAOfI"
      onLoad={() => {
        const script = document.querySelector(
          "#cookie-analytics"
        ) as HTMLScriptElement;
        if (script) {
          script.setAttribute(
            "site-id",
            "44beb5bb-3d65-4e6a-9631-3d99382ca2ea"
          );
        }
      }}
    />
  );
}
