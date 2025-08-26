"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

function trackPageview(url: string) {
  if (typeof window === "undefined") return;
  // @ts-ignore
  if (window.gtag) {
    // @ts-ignore
    window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
  }
}

export default function GoogleAnalytics() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const url = `${pathname}${
      searchParams?.toString() ? `?${searchParams.toString()}` : ""
    }`;
    trackPageview(url);
  }, [pathname, searchParams, mounted]);

  // Don't render anything during SSR or if not mounted
  if (!mounted || !GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        id="ga-script"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-inline" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
