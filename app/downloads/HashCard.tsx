"use client"

import Image from "next/image"
import { useRef, useState } from "react"

import { cn } from "@/lib/utils"

const ICONS: Record<string, { src: string; width: number }> = {
  ios: { src: "/v5/download-ios.webp", width: 42 },
  android: { src: "/v5/download-android-apk.svg", width: 35 },
  linux: { src: "/v5/download-linux.webp", width: 42 },
  windows: { src: "/v5/download-windows.svg", width: 42 },
}

const OS_NAMES: Record<string, string> = {
  ios: "iOS",
  android: "Android",
  linux: "Linux",
  windows: "Windows",
}

type HashEntry = { os: string; hash: string }

function OsIcon({ os }: { os: string }) {
  const icon = ICONS[os]
  return (
    <Image
      src={icon.src}
      alt=""
      width={icon.width}
      height={42}
      className="h-[42px] w-auto"
    />
  )
}

/**
 * Tiles toggle which checksum is open; the panel under the row grows from
 * 0fr to 1fr so the reveal animates without measuring content height.
 * Clicking the hash itself copies the bare hex (no "sha256:" prefix), which
 * is what a `shasum -a 256` comparison needs.
 */
export function HashSection({ hashes }: { hashes: HashEntry[] }) {
  const [openOs, setOpenOs] = useState<string | null>(null)
  // Kept after close so the panel's content stays mounted while it shrinks.
  const [displayOs, setDisplayOs] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const display = hashes.find((entry) => entry.os === displayOs)
  const hex = display ? display.hash.replace(/^sha256:/, "") : ""

  const toggle = (os: string) => {
    setCopied(false)
    setOpenOs((current) => (current === os ? null : os))
    if (openOs !== os) setDisplayOs(os)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(true)
      clearTimeout(copiedTimer.current)
      copiedTimer.current = setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4 md:gap-5">
        {hashes.map(({ os }) => (
          <button
            key={os}
            type="button"
            onClick={() => toggle(os)}
            aria-expanded={openOs === os}
            aria-controls="sha-panel"
            aria-label={`Show the ${OS_NAMES[os] ?? os} build SHA256 checksum`}
            className={cn(
              "flex h-[153px] flex-col items-center gap-[15px] rounded-3xl bg-v5-white p-[30px] transition-shadow",
              openOs === os && "ring-2 ring-inset ring-v5-cta",
            )}
          >
            <OsIcon os={os} />
            <span className="text-v5-download-label-sm font-semibold text-v5-text-inverse">
              SHA256
            </span>
          </button>
        ))}
      </div>

      <div
        id="sha-panel"
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
          openOs ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          {display && (
            <button
              type="button"
              onClick={copy}
              title="Click to copy"
              tabIndex={openOs ? 0 : -1}
              aria-hidden={!openOs}
              aria-label={`Copy the ${OS_NAMES[display.os] ?? display.os} build SHA256 checksum`}
              className="mt-3.5 flex w-full flex-col items-center gap-[15px] rounded-3xl bg-v5-white p-[30px] md:mt-5"
            >
              <OsIcon os={display.os} />
              {/* 64 mono chars at ~0.6em advance; the calc keeps them on one line at any width. */}
              <span className="whitespace-nowrap text-center font-mono text-[length:min(15px,calc((100vw-92px)/39.5))] font-semibold text-v5-text-inverse md:text-[length:min(15px,calc((100vw-210px)/79))]">
                {copied ? "Copied!" : hex}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
