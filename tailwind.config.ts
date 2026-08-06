import type { Config } from "tailwindcss"

import { v5FontSize } from "./lib/v5-typography"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        xl: "0",
      },
      screens: {
        xl: "1240px",
      },
    },
    screens: {
      xs: "350px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1240px",
      // Compositions that only fit inside the full 1380px V5 content frame
      // (frame + 2x30px gutters). Below this they fall back to the stacked
      // mobile composition rather than overflowing the viewport.
      v5wide: "1360px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        sans: ["Brockmann", "Arial", "Helvetica", "sans-serif"],
        default: ["Brockmann", "Arial", "Helvetica", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        backgroundSecondary: "hsl(var(--background-secondary))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        slate: {
          900: "#0f172a",
          800: "#1e293b",
          700: "#334155",
          600: "#475569",
        },
        cyan: {
          400: "#22d3ee",
        },
        blue: {
          600: "#2563eb",
          700: "#1d4ed8",
        },
        borderLight: "#11284a",
        borderNormal: "#1B3F73",
        textPrimary: "#F0F4FC",
        textSecondary: "#C9D6E8",
        textTertiary: "#8295AE",
        primaryAccent: "hsl(var(--primary-accent))",
        primaryAccent2: "hsl(var(--primary-accent-2))",
        alertInfo: "#5CA7FF",
        secondaryAccent: "#33E6BF",
        deepBlue: "#0439C7",
        primaryBlue: "#0b4eff",
        tealDark: "#092e3e",
        cardSurface: "#0B1B3B",
        iconBg: "#193B7A",
        divider: "#284570",
        mpcBgDark: "#0a1423",
        mpcBgMid: "#0d1a2d",
        // V5 light theme — names mirror the Figma variable collection
        v5: {
          page: "#f0f4fc", // Text/Primary — doubles as the light page surface
          panel: "#e2e8f4", // footer / inset panel surface
          white: "#ffffff", // Neutrals/White
          cta: "#0b4eff", // Buttons/CTA (Primary)
          accent: "#4879fd", // Primary/Accent 4
          accent2: "#538bff", // stats / promo panel blue
          deep: "#063ed4", // "setup for your needs" panel
          sky: "#4d80ff", // MPC hero + "How Vultisig Works" panels
          // Agent hero cards. These match the flat backdrop baked into each
          // hero render exactly — a near-miss token seams visibly where the
          // image meets the card.
          agent: {
            deep: "#0642e2", // Agent > For Agents hero
            sky: "#5287ff", // Agent > For Builders hero
          },
          amber: "#f39c2b", // review carousel card
          success: "#13c89d", // Alerts/Succes
          warning: "#ffc25c", // Alerts/Warning
          purple: "#8f65ff", // App Store/DCA Purple
          orange: "#ffaa1c", // App Store/Sends Orange
          info: "#5ca7ff", // Alerts/Info (light)
          "info-dark": "#5180fc", // Alerts/Info (dark)
          vult: "#00ff76", // $VULT brand green — hero accent + token-stats strip
          royal: "#104ae1", // "Got an idea?" banner
          highlight: "#0439c7", // Primary/Accent 2 — MPC step-card kicker line
          sapphire: "#2155df", // "Period." in the MPC privacy heading
          negative: "#fb2c36", // comparison-table "no" pill
          "negative-mark": "#ff6467", // comparison-table "no" glyph
          positive: "#33e6bf", // comparison-table "yes" pill + glyph
          // $VULT discount-tier card surfaces
          tier: {
            bronze: "#f05c2f",
            silver: "#9bb1d2",
            gold: "#f7a82a",
            platinum: "#9b94dd",
            diamond: "#4bc4c5",
            ultimate: "#4b72de",
          },
          surface: {
            dark: "#02122b", // Backgrounds/background
            1: "#061b3a", // Backgrounds/surface-1
            2: "#11284a", // Backgrounds/surface-2 + Buttons/Secondary
            light: "#d8e0ec", // ratings panel
            disabled: "rgba(11,26,58,0.5)", // Backgrounds/disabled
          },
          text: {
            primary: "#f0f4fc", // Text/Primary
            secondary: "#c9d6e8", // Text/Secondary
            tertiary: "#8295ae", // Text/Tertiary
            inverse: "#02122b", // Text/Inverse
          },
          border: {
            light: "#11284a", // Borders/Light
            normal: "#1b3f73", // Borders/Normal
            faint: "rgba(255,255,255,0.03)", // Borders/Extra Light
            ring: "rgba(72,121,253,0.27)", // chain-diagram orbit
          },
          // Header "liquid glass" bar. Two materials so the surface always
          // separates from what scrolls under it: a white frost over light
          // sections, a lifted light frost over the navy ones. The `-solid`
          // pair is the fallback for browsers without backdrop-filter, where a
          // low-alpha fill would leave the bar unreadable.
          glass: {
            light: "rgba(255,255,255,0.62)",
            "light-solid": "rgba(255,255,255,0.92)",
            "light-edge": "rgba(255,255,255,0.85)",
            "light-chip": "rgba(255,255,255,0.72)",
            // Tinted rather than a plain white lift: a bright card sliding under
            // one end of the bar has to stay behind enough scrim for the light
            // ink to hold (worst measured case #4879fd -> 6.8:1).
            dark: "rgba(17,40,74,0.50)", // Backgrounds/surface-2 @ 50%
            "dark-solid": "rgba(17,40,74,0.92)",
            "dark-edge": "rgba(240,244,252,0.22)",
            "dark-chip": "rgba(240,244,252,0.14)",
          },
        },
      },
      fontSize: v5FontSize,
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "v5-panel": "30px",
      },
      boxShadow: {
        "v5-button":
          "inset 0px -1px 1.6px 0px rgba(15,28,62,0.48), inset 0px 1px 1.9px 0px rgba(255,255,255,0.24)",
        "v5-menu": "0px 2px 8.35px 0px rgba(76,120,183,0.17)",
        "v5-glass":
          "0px 10px 30px -12px rgba(2,18,43,0.28), inset 0px 1px 0px 0px rgba(255,255,255,0.75)",
        "v5-glass-dark":
          "0px 10px 30px -12px rgba(2,18,43,0.55), inset 0px 1px 0px 0px rgba(240,244,252,0.24)",
      },
      maxWidth: {
        "v5-content": "1380px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Header dropdowns. The X translation is baked into the keyframe
        // because the panel is centred with a transform of its own.
        "v5-menu-in": {
          from: {
            opacity: "0",
            transform: "translateX(-50%) translateY(-6px) scale(0.97)",
          },
          to: {
            opacity: "1",
            transform: "translateX(-50%) translateY(0) scale(1)",
          },
        },
        "v5-menu-out": {
          from: {
            opacity: "1",
            transform: "translateX(-50%) translateY(0) scale(1)",
          },
          to: {
            opacity: "0",
            transform: "translateX(-50%) translateY(-6px) scale(0.97)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "v5-menu-in": "v5-menu-in 180ms cubic-bezier(0.16, 1, 0.3, 1)",
        "v5-menu-out": "v5-menu-out 140ms cubic-bezier(0.4, 0, 1, 1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero":
          "linear-gradient(180deg, #02122b 0%, #061b3a 50%, #02122b 100%)",
        "gradient-mpc": "linear-gradient(to bottom, #0a1423, #0d1a2d, #0a1423)",
        "gradient-card":
          "linear-gradient(to bottom, hsl(var(--background)), hsl(var(--background-secondary)))",
        // CSS stand-in for the V5 banner dot texture (Figma ships a 294KB PNG)
        "v5-dots":
          "radial-gradient(rgba(255,255,255,0.30) 1.5px, transparent 1.5px)",
      },
      backgroundSize: {
        "v5-dots-tile": "26px 26px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-motion"),
    require("tailwindcss-intersect"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config

export default config
