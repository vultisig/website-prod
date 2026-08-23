"use client"

import Image from "next/image"
import { useEffect, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

import DownloadCard from "./Gtag"
import TabToggle from "./tab-toggle"
import { resolveTab, TABS, TAB_CONTENT, type TabKey } from "./tabs"

/** Kept in step with the v5-fade-out animation in tailwind.config.ts. */
const FADE_OUT_MS = 220

/** No animation in the `rest` state, so the first paint doesn't fade in. */
const PANEL =
  "data-[state=in]:animate-v5-fade-in data-[state=out]:animate-v5-fade-out motion-reduce:!animate-none"

/**
 * Owns the download tab so switching can fade the old panel out and the new one
 * in, rather than swapping on a server round trip.
 */
export default function DownloadsTabs({
  initialTab,
  checksums,
}: {
  initialTab: TabKey
  checksums: ReactNode
}) {
  // `selected` flips on click so the toggle reacts at once; `shown` trails it by
  // one fade, and `entering` is what keeps the first paint animation-free.
  const [selected, setSelected] = useState(initialTab)
  const [shown, setShown] = useState(initialTab)
  const [entering, setEntering] = useState(false)

  // Header links arrive with a tab of their own — fade to it like a click.
  useEffect(() => setSelected(initialTab), [initialTab])

  // Each switch pushes a history entry, so Back has to walk the tabs too.
  useEffect(() => {
    const onPopState = () =>
      setSelected(
        resolveTab(
          new URLSearchParams(window.location.search).get("tab") ?? undefined,
        ),
      )

    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  useEffect(() => {
    if (selected === shown) return

    const swap = () => {
      setShown(selected)
      setEntering(true)
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      swap()
      return
    }

    const timer = window.setTimeout(swap, FADE_OUT_MS)
    return () => window.clearTimeout(timer)
  }, [selected, shown])

  const select = (tab: TabKey, href: string) => {
    setSelected(tab)
    // Native history keeps the URL shareable without re-rendering the page.
    window.history.pushState(null, "", href)
  }

  const state = selected === shown ? (entering ? "in" : "rest") : "out"
  const content = TAB_CONTENT[shown]

  return (
    <>
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-5">
        <div
          key={shown}
          data-state={state}
          className={cn(
            PANEL,
            "flex flex-col gap-4 text-v5-text-inverse md:w-[579px] md:gap-3.5",
          )}
        >
          <h1 className="text-v5-display-xs font-semibold md:text-v5-display md:font-medium">
            {content.title}
          </h1>
          <p className="text-v5-body-m-relaxed font-normal md:text-v5-subtitle">
            {content.description}
          </p>
        </div>
        <TabToggle activeTab={selected} onSelect={select} />
      </div>

      <div className="mt-8 md:mt-[30px] md:grid md:grid-cols-2 md:gap-[30px]">
        {/* Cards and checksums fade as one block so the height change between
            tabs lands while the column is invisible. */}
        <div
          key={shown}
          data-state={state}
          className={cn(PANEL, "flex flex-col gap-8 md:gap-5")}
        >
          {/* Fixed height keeps the checksums level with the mockup on both tabs. */}
          <div
            className={cn(
              "grid gap-3.5 md:h-[427px] md:content-start md:gap-5",
              content.cardGrid,
            )}
          >
            {content.channels.map((channelKey) => (
              <DownloadCard
                key={channelKey}
                channelKey={channelKey}
                className={content.cardClass}
              />
            ))}
          </div>

          {checksums}
        </div>

        {/* Both mockups stay mounted so the incoming one is already decoded. */}
        <div className="hidden md:grid">
          {TABS.map((tab) => (
            <Image
              key={tab.key}
              src={TAB_CONTENT[tab.key].mockup.src}
              alt={TAB_CONTENT[tab.key].mockup.alt}
              width={675}
              height={657}
              priority={tab.key === initialTab}
              aria-hidden={tab.key !== shown}
              data-state={tab.key === shown ? state : "gone"}
              className={cn(
                PANEL,
                "col-start-1 row-start-1 rounded-3xl data-[state=gone]:opacity-0",
              )}
            />
          ))}
        </div>
      </div>
    </>
  )
}
