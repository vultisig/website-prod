"use client";

import dynamic from 'next/dynamic';

const GoogleAnalytics = dynamic(() => import('./ga'), { ssr: false });

export default function GoogleAnalyticsWrapper() {
  return <GoogleAnalytics />;
}
