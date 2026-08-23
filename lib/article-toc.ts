export type TocHeading = {
  id: string
  text: string
  level: 2 | 3
}

const FENCE = /^\s{0,3}(```|~~~)/
const HEADING = /^\s{0,3}(#{2,3})\s+(.+?)\s*#*\s*$/

/** Strips the inline markdown a heading can carry so the label reads clean. */
function toPlainText(raw: string): string {
  return raw
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(?=\S)(.+?)(?<=\S)\1/g, "$2")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<[^>]+>/g, "")
    .trim()
}

export function slugifyHeading(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 80) || "section"
  )
}

/**
 * Pulls h2/h3 out of the raw markdown. Ids are de-duplicated the same way
 * MarkdownRenderer does at render time, so the TOC anchors always resolve.
 */
export function extractHeadings(content: string): TocHeading[] {
  const headings: TocHeading[] = []
  const seen = new Map<string, number>()
  let inFence = false

  for (const line of content.split("\n")) {
    if (FENCE.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    const match = HEADING.exec(line)
    if (!match) continue

    const text = toPlainText(match[2])
    if (!text) continue

    const base = slugifyHeading(text)
    const count = seen.get(base) || 0
    seen.set(base, count + 1)

    headings.push({
      id: count === 0 ? base : `${base}-${count}`,
      text,
      level: match[1].length === 2 ? 2 : 3,
    })
  }

  return headings
}
