"use client"

import Image from "next/image"
import { useState } from "react"

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

export function HashCard({ hash, os }: { hash: string; os: string }) {
  const [copied, setCopied] = useState(false)
  const icon = ICONS[os]
  const osName = OS_NAMES[os] ?? os

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hash)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={hash}
      aria-label={`Copy the ${osName} build SHA256 checksum`}
      className="flex h-[153px] flex-col items-center gap-[15px] rounded-3xl bg-v5-white p-[30px]"
    >
      <Image
        src={icon.src}
        alt=""
        width={icon.width}
        height={42}
        className="h-[42px] w-auto"
      />
      <span className="text-v5-download-label-sm font-semibold text-v5-text-inverse">
        {copied ? "Copied!" : "SHA256"}
      </span>
    </button>
  )
}
