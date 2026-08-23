import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

import { v5FontSizeNames } from "@/lib/v5-typography"

// The V5 sizes and colours share the `text-*` namespace; without registering the
// sizes here twMerge reads them as colours and drops one class of every pair.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: v5FontSizeNames }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const MOTION_CONSTANTS = {
  delayBetween: 150,
}
