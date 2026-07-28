import { Star } from "lucide-react"

const STAR_COUNT = 5

type StarRatingProps = {
  /** 0–5, halves supported. */
  rating: number
  /** Star edge length in px. */
  size: number
  className?: string
}

function fillPercent(rating: number, index: number): number {
  const filled = Math.min(Math.max(rating - index, 0), 1)
  return filled * 100
}

export default function StarRating({
  rating,
  size,
  className,
}: StarRatingProps) {
  return (
    <div
      className={className}
      role="img"
      aria-label={`${rating} out of ${STAR_COUNT} stars`}
    >
      {Array.from({ length: STAR_COUNT }, (_, index) => (
        <span
          key={index}
          className="relative block shrink-0"
          style={{ width: size, height: size }}
        >
          <Star
            className="absolute inset-0 text-v5-orange/25"
            fill="currentColor"
            strokeWidth={0}
            size={size}
            aria-hidden
          />
          <span
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${fillPercent(rating, index)}%` }}
          >
            <Star
              className="text-v5-orange"
              fill="currentColor"
              strokeWidth={0}
              size={size}
              aria-hidden
            />
          </span>
        </span>
      ))}
    </div>
  )
}
