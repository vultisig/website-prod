"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

import { useVultPrice } from "@/hooks/use-vult-price"
import { useVultSupply } from "@/hooks/use-vult-supply"
import { cn } from "@/lib/utils"

import {
  VULT_CONTRACT_ADDRESS,
  VULT_CONTRACT_SHORT,
  VULT_MAX_SUPPLY,
} from "../token"

const COPY_FEEDBACK_MS = 2000

function formatWhole(value: number) {
  return value.toLocaleString("en-US", { maximumFractionDigits: 0 })
}

function formatPrice(price: number) {
  return price < 1 ? `$${price.toFixed(4)}` : `$${price.toFixed(3)}`
}

/** Vertical hairline between stats — desktop only, as in the design. */
function Divider() {
  return (
    <span
      aria-hidden
      className="hidden w-px shrink-0 self-center bg-v5-text-inverse md:block md:h-[92px]"
    />
  )
}

type StatProps = {
  figure: string
  label: string
  /** Big stacked figures on mobile, matched to the row figures on desktop. */
  emphasis?: "lead" | "trail"
}

function Stat({ figure, label, emphasis = "lead" }: StatProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center text-center text-v5-text-inverse md:flex-1 md:gap-3",
        emphasis === "lead" ? "gap-[21px]" : "gap-2",
      )}
    >
      <p
        className={cn(
          "font-bold md:text-v5-figure-sm v5wide:text-v5-figure-md",
          emphasis === "lead" ? "text-v5-figure-lg" : "text-v5-figure-sm",
        )}
      >
        {figure}
      </p>
      <p className="text-v5-eyebrow font-normal md:text-v5-label">{label}</p>
    </div>
  )
}

export default function TokenStats() {
  const { price, loading: priceLoading } = useVultPrice()
  const { circulatingSupply, loading: supplyLoading } = useVultSupply()
  const [copied, setCopied] = useState(false)

  const copyAddress = async () => {
    await navigator.clipboard.writeText(VULT_CONTRACT_ADDRESS)
    setCopied(true)
    window.setTimeout(() => setCopied(false), COPY_FEEDBACK_MS)
  }

  const maxSupply = formatWhole(VULT_MAX_SUPPLY)
  const circulating =
    supplyLoading || circulatingSupply === 0
      ? maxSupply
      : formatWhole(circulatingSupply)

  return (
    <div className="-mt-[154px] flex flex-col gap-2 rounded-[20px] bg-v5-vult px-4 pb-5 pt-[160px] md:-mt-[67px] md:h-[258px] md:flex-row md:items-center md:gap-3 md:rounded-v5-panel md:px-[30px] md:pt-[102px]">
      <div className="flex flex-col items-center py-2 md:contents">
        <Stat figure={maxSupply} label="max supply" />
        <Divider />
        <Stat figure={circulating} label="circulating supply" />
      </div>
      <Divider />
      <div className="flex items-start py-2 md:contents">
        <Stat
          figure={priceLoading ? "—" : formatPrice(price)}
          label="Current Price"
          emphasis="trail"
        />
        <Divider />
        <div className="flex w-full flex-col items-center gap-2 text-center text-v5-text-inverse md:flex-1 md:gap-3">
          <button
            type="button"
            onClick={copyAddress}
            title={VULT_CONTRACT_ADDRESS}
            aria-label={`Copy the $VULT contract address ${VULT_CONTRACT_ADDRESS}`}
            className="flex items-center justify-center gap-[5px] text-v5-figure-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-v5-text-inverse v5wide:text-v5-figure-md"
          >
            {VULT_CONTRACT_SHORT}
            {copied ? (
              <Check className="size-6 shrink-0" aria-hidden />
            ) : (
              <Copy className="size-6 shrink-0" aria-hidden />
            )}
          </button>
          <p className="text-v5-eyebrow font-normal md:text-v5-label">
            {copied ? "Address copied" : "Contract Address"}
          </p>
        </div>
      </div>
    </div>
  )
}
