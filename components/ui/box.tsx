import { cn } from "@/lib/utils"

export function Box({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-gradient-to-b from-background to-backgroundSecondary border border-borderLight rounded-3xl md:rounded-2xl",
        className,
      )}
      {...props}
    />
  )
}
