import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function DiscordSection() {
  return (
    <div className="flex flex-col md:flex-row items-center md:justify-center gap-4 pb-12 px-4 mt-10">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center px-4">
        JOIN THE DISCORD TO REQUEST NEW FEATURES!
      </h3>
      <Link
        href="https://discord.gg/thq64eaYVN"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ variant: "primaryBlue" }),
          "w-full md:w-auto",
        )}
      >
        DISCORD
      </Link>
    </div>
  )
}
