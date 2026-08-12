import type { SVGProps } from "react"

/**
 * The five vault actions, traced from the Icons V3 set that vultisig-windows
 * adopted in vultisig/vultisig-windows#4537 — the same components the wallet's
 * main view renders (`SwapPrompt`, `SendPrompt`, `BuyPrompt`, `DepositPrompt`,
 * `ReceivePrompt`). Copied rather than imported: that package is not published,
 * and these five are the only ones this site needs.
 *
 * All are 24px-grid, 2px strokes, and paint from `currentColor` so the caller
 * sets the ink.
 */
type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

/** Swap — `ArrowsRotateCenterIcon`. */
export function SwapIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M5.24059 3.65234L4.52539 8.15714L9.01939 7.37354L5.24059 3.65234Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M6.12109 5.99961C7.63669 4.51521 9.71149 3.59961 11.9999 3.59961C16.6391 3.59961 20.3999 7.36041 20.3999 11.9996"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M18.7593 20.3476L19.4745 15.8428L14.9805 16.6264L18.7593 20.3476Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M17.8784 18C16.3628 19.4844 14.288 20.4 11.9996 20.4C7.36041 20.4 3.59961 16.6392 3.59961 12"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12.0008 13.1998C12.6635 13.1998 13.2008 12.6625 13.2008 11.9998C13.2008 11.3371 12.6635 10.7998 12.0008 10.7998C11.338 10.7998 10.8008 11.3371 10.8008 11.9998C10.8008 12.6625 11.338 13.1998 12.0008 13.1998Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

/** Send — `ArrowUpRightIcon`. */
export function SendIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M3.59961 20.3998L13.1996 10.7998"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M13.2 18V10.8H6" stroke="currentColor" strokeWidth="2" />
      <path
        d="M7.19922 3.59961H16.7992C18.7876 3.59961 20.3992 5.21121 20.3992 7.19961V16.7996"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

/** Buy — `CirclePlusFilledIcon`. */
export function BuyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M12.0004 2.40039C6.70719 2.40039 2.40039 6.70719 2.40039 12.0004C2.40039 17.2936 6.70719 21.6004 12.0004 21.6004C17.2936 21.6004 21.6004 17.2936 21.6004 12.0004C21.6004 6.70719 17.2936 2.40039 12.0004 2.40039ZM16.2004 13.2004H13.2004V16.2004C13.2004 16.8628 12.6628 17.4004 12.0004 17.4004C11.338 17.4004 10.8004 16.8628 10.8004 16.2004V13.2004H7.80039C7.13799 13.2004 6.60039 12.6628 6.60039 12.0004C6.60039 11.338 7.13799 10.8004 7.80039 10.8004H10.8004V7.80039C10.8004 7.13799 11.338 6.60039 12.0004 6.60039C12.6628 6.60039 13.2004 7.13799 13.2004 7.80039V10.8004H16.2004C16.8628 10.8004 17.4004 11.338 17.4004 12.0004C17.4004 12.6628 16.8628 13.2004 16.2004 13.2004Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Function — `GridPlusIcon`. The wallet routes this one to its deposit flow. */
export function FunctionIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M7.79961 3.59961H5.39961C4.4055 3.59961 3.59961 4.4055 3.59961 5.39961V7.79961C3.59961 8.79372 4.4055 9.59961 5.39961 9.59961H7.79961C8.79372 9.59961 9.59961 8.79372 9.59961 7.79961V5.39961C9.59961 4.4055 8.79372 3.59961 7.79961 3.59961Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M18.6004 3.59961H16.2004C15.2063 3.59961 14.4004 4.4055 14.4004 5.39961V7.79961C14.4004 8.79372 15.2063 9.59961 16.2004 9.59961H18.6004C19.5945 9.59961 20.4004 8.79372 20.4004 7.79961V5.39961C20.4004 4.4055 19.5945 3.59961 18.6004 3.59961Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M7.79961 14.4004H5.39961C4.4055 14.4004 3.59961 15.2063 3.59961 16.2004V18.6004C3.59961 19.5945 4.4055 20.4004 5.39961 20.4004H7.79961C8.79372 20.4004 9.59961 19.5945 9.59961 18.6004V16.2004C9.59961 15.2063 8.79372 14.4004 7.79961 14.4004Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M17.4004 14.4004V20.4004"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M20.4004 17.4004H14.4004"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

/** Receive — `ArrowWallDownIcon`. */
export function ReceiveIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M20.3996 3.59961H3.59961"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M12 8.40039V20.4004" stroke="currentColor" strokeWidth="2" />
      <path
        d="M6.59961 15L11.9996 20.4L17.3996 15"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}
