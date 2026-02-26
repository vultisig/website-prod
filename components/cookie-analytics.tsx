"use client";
import Script from "next/script";

export default function CookieAnalytics() {
  return (
    <Script
      id="cookie-analytics-loader"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          (function () {
            if (document.querySelector('script[data-cookie3="1"]')) return;
            var s = document.createElement('script');
            s.defer = true;
            s.crossOrigin = 'anonymous';
            s.src = 'https://cdn.markfi.xyz/scripts/analytics/0.11.24/cookie3.analytics.min.js';
            s.setAttribute('site-id','44beb5bb-3d65-4e6a-9631-3d99382ca2ea');
            s.integrity = 'sha384-ihnQ09PGDbDPthGB3QoQ2Heg2RwQIDyWkHkqxMzq91RPeP8OmydAZbQLgAakAOfI';
            s.setAttribute('data-cookie3','1');
            document.head.appendChild(s);
          })();
        `,
      }}
    />
  );
}
