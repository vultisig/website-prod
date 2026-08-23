import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const landingButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border font-medium shadow-v5-button transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-v5-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "border-v5-accent bg-v5-cta text-v5-text-primary hover:bg-v5-cta/90",
        secondary:
          "border-v5-border-faint bg-v5-surface-2 text-v5-text-primary hover:bg-v5-surface-2/90",
        light:
          "border-v5-border-faint bg-v5-page text-v5-cta hover:bg-v5-white",
      },
      // lg is the pill-shaped header CTA; sm/md are the 12px-radius in-page CTAs
      size: {
        sm: "px-6 py-3.5 text-v5-button-sm",
        md: "h-12 px-8 text-v5-button",
        lg: "rounded-full px-9 py-[19px] text-v5-body-m",
      },
      // Hero-CTA hover: the fill and the ink trade places rather than the fill
      // nudging a shade. The reference recording fits an ease-out-family curve,
      // but its compression keeps refining the pixels that just moved, so the
      // tail cannot date the end of the run: `ease` at ~480ms and `ease-out` at
      // ~340ms fit it equally well (rms 0.024 vs 0.026). 400ms on `ease` sits
      // between the two.
      //
      // `duration-[400ms] ease-[ease]` cannot be used: tailwindcss-animate and
      // tailwindcss-motion both redefine `duration-*` and `ease-*` and shadow
      // core's arbitrary values, so these go through arbitrary properties.
      invertOnHover: {
        true: "[transition-duration:400ms] [transition-timing-function:ease]",
        false: "",
      },
    },
    compoundVariants: [
      // Both dark fills land on the same light state, so a primary/secondary
      // pair reads as one control on hover.
      {
        variant: ["primary", "secondary"],
        invertOnHover: true,
        className: "hover:border-v5-panel hover:bg-v5-page hover:text-v5-cta",
      },
      // light is already the hover state above, so it runs the swap in reverse.
      {
        variant: "light",
        invertOnHover: true,
        className:
          "hover:border-v5-accent hover:bg-v5-cta hover:text-v5-text-primary",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      invertOnHover: false,
    },
  },
)

export type LandingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof landingButtonVariants> & { asChild?: boolean }

const LandingButton = React.forwardRef<HTMLButtonElement, LandingButtonProps>(
  (
    { className, variant, size, invertOnHover, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          landingButtonVariants({ variant, size, invertOnHover, className }),
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
LandingButton.displayName = "LandingButton"

export { LandingButton, landingButtonVariants }
