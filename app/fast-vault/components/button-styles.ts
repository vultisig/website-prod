/**
 * The frame's "Tertiary" Landing Page Button. It takes `LandingButton`'s
 * secondary navy fill and hover swap, but draws no edge and a finer bevel than
 * the shared `shadow-v5-button`: a 1px highlight at 10% over a 0.5px shade.
 *
 * The bevel is `!important` because twMerge files `shadow-v5-button` as a
 * shadow colour rather than a shadow, keeps both classes, and would leave the
 * winner to stylesheet order. The focus ring still draws: Tailwind's shadow
 * declaration composes `--tw-ring-shadow` into the same box-shadow.
 */
export const TERTIARY_BUTTON_CLASS =
  "border-transparent !shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.10),inset_0px_-1px_0.5px_0px_#0f1c3e]"
