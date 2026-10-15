import { JetBrains_Mono } from "next/font/google"

/**
 * The setup steps' 01-05 index is set in JetBrains Mono in the frame. Declared
 * here rather than in the root layout so only this route downloads it. The
 * font loader only accepts a bare `const`, so the export is a separate line.
 */
const JETBRAINS_MONO = JetBrains_Mono({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
})

export { JETBRAINS_MONO }
