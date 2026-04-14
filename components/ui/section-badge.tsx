interface SectionBadgeProps {
  label: string
}

export default function SectionBadge({ label }: SectionBadgeProps) {
  return (
    <div className="inline-flex items-center bg-primaryAccent/16 border border-primaryAccent/65 rounded-full px-4 py-1.5">
      <span className="font-medium text-sm text-[#8fb6ff] tracking-tight uppercase">
        {label}
      </span>
    </div>
  )
}
