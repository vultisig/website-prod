// The frame's own UI glyphs, path for path from the Figma SVG export. They are
// not lucide: every arrow draws its shaft at 1.5 and its head at 2, and that
// weight holds at 16px and 24px alike, so the two arrow sizes are separate
// paths rather than one viewBox scaled. Ink is `currentColor` so a glyph
// follows its button or card through the hover swap.

type IconProps = { className?: string }

const STROKE = {
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

/** `download-4`: the tray-and-arrow mark on the hero's create button. */
export function DownloadIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M11.1993 6.39844L7.99932 9.59844L4.79932 6.39844"
        strokeWidth="1.5"
        {...STROKE}
      />
      <path d="M8 2.39844V9.59844" strokeWidth="2" {...STROKE} />
      <path
        d="M13.5999 10.3984V11.1984C13.5999 12.524 12.5255 13.5984 11.1999 13.5984H4.7999C3.4743 13.5984 2.3999 12.524 2.3999 11.1984V10.3984"
        strokeWidth="2"
        {...STROKE}
      />
    </svg>
  )
}

/** `arrow-down`: points the hero's comparison button at the table below. */
export function ArrowDownIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path d="M8 2.39844V13.5984" strokeWidth="1.5" {...STROKE} />
      <path d="M4 9.60156L8 13.6016L12 9.60156" strokeWidth="2" {...STROKE} />
    </svg>
  )
}

/** `arrow-right` at its button size. */
export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path d="M2.3999 8H13.5999" strokeWidth="1.5" {...STROKE} />
      <path d="M9.6001 12L13.6001 8L9.6001 4" strokeWidth="2" {...STROKE} />
    </svg>
  )
}

/** `arrow-right` at the 24px the scenario cards carry. */
export function ArrowRightLargeIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path d="M3.59961 12H20.3996" strokeWidth="1.5" {...STROKE} />
      <path d="M14.4004 18L20.4004 12L14.4004 6" strokeWidth="2" {...STROKE} />
    </svg>
  )
}

/** `minus`: the open-answer mark. */
export function MinusIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path d="M3.49902 10L16.499 10" strokeWidth="2" {...STROKE} />
    </svg>
  )
}

/**
 * The closed-answer mark. The frame shows every answer open, so only `minus`
 * is drawn there; this is that bar plus its upright at the same weight and
 * length.
 */
export function PlusIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path d="M3.49902 10L16.499 10" strokeWidth="2" {...STROKE} />
      <path d="M10 3.49902L10 16.499" strokeWidth="2" {...STROKE} />
    </svg>
  )
}
