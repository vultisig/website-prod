interface SectionBadgeProps {
  label: string
}

export default function SectionBadge({ label }: SectionBadgeProps) {
  return (
    <div className="inline-flex items-center bg-primaryAccent/10 border border-primaryAccent/50 rounded-full px-4 py-1.5">
      <span className="font-medium text-sm text-primaryAccent tracking-tight uppercase">
        {label}
      </span>
    </div>
  )
}
