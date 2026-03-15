"use client"
import { Box } from "@/components/ui/box"
import { Button } from "@/components/ui/button"
import { CheckIcon, CopyIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function HashCard({
  icon,
  hash,
  os,
}: {
  icon: string
  hash: string
  os: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hash)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  // Truncate hash for display
  const displayHash =
    hash.length > 30
      ? `${hash.substring(0, 15)}...${hash.substring(hash.length - 15)}`
      : hash

  return (
    <Box className="p-4 space-y-4">
      {/* Icon Container */}
      <div className="w-12 h-12 rounded-xl bg-backgroundSecondary border border-blue-500/20 flex items-center justify-center">
        <Image
          src={icon}
          alt={os + " icon"}
          width={24}
          height={24}
          className="size-6 object-contain"
        />
      </div>

      <div className="flex flex-col w-full gap-1">
        {/* Label */}
        <span className="text-white font-medium text-base">SHA256</span>

        {/* Hash + Copy Button */}
        <div className="flex items-center w-full gap-1">
          <span
            className="text-xs text-gray-400 truncate select-all"
            title={hash}
          >
            {displayHash}
          </span>

          <Button
            size="icon"
            variant="ghost"
            className="text-gray-400 hover:text-white hover:bg-transparent h-5 w-5 p-0 flex-shrink-0 relative"
            onClick={handleCopy}
          >
            <span className="sr-only">{copied ? "Copied!" : "Copy"}</span>
            <CopyIcon
              className={`transition-opacity duration-300 ${
                copied ? "opacity-0" : "opacity-100"
              }`}
            />
            <CheckIcon
              className={`text-green-500 transition-opacity duration-300 absolute top-0 left-0 ${
                copied ? "opacity-100" : "opacity-0"
              }`}
            />
          </Button>
        </div>
      </div>
    </Box>
  )
}
