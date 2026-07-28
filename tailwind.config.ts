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
          success: "#13c89d", // Alerts/Succes
          warning: "#ffc25c", // Alerts/Warning
          purple: "#8f65ff", // App Store/DCA Purple
          orange: "#ffaa1c", // App Store/Sends Orange
          surface: {
            dark: "#02122b", // Backgrounds/background
            1: "#061b3a", // Backgrounds/surface-1
            2: "#11284a", // Backgrounds/surface-2 + Buttons/Secondary
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
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
