export type JsonLdObject = Record<string, unknown>

type Section = {
  heading: string
  body: string[]
}

const MIN_BLOCK_ITEMS = 2
const FENCE = /^\s{0,3}(```|~~~)/

/** JSON-LD for a script tag. Escapes `<` so answer text cannot close the tag. */
export function jsonLdHtml(data: JsonLdObject): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

/** FAQPage and HowTo from the markdown. Ambiguous sections emit nothing. */
export function contentJsonLd(content: string): {
  faq?: JsonLdObject
  howto?: JsonLdObject
} {
  if (!content) return {}
  const sections = h2Sections(content)
  const faq = faqFrom(sections)
  const howto = howToFrom(sections)
  return {
    ...(faq ? { faq } : {}),
    ...(howto ? { howto } : {}),
  }
}

function h2Sections(content: string): Section[] {
  const sections: Section[] = []
  let current: Section | null = null
  let inFence = false

  for (const line of content.split(/\r?\n/)) {
    if (FENCE.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    const heading = line.match(/^##\s+(.+?)\s*$/)
    if (heading?.[1]) {
      if (current) sections.push(current)
      current = { heading: heading[1], body: [] }
      continue
    }
    current?.body.push(line)
  }
  if (current) sections.push(current)
  return sections
}

function faqFrom(sections: Section[]): JsonLdObject | undefined {
  const section = sections.find((item) => /^faqs?$/i.test(item.heading.trim()))
  if (!section) return undefined
  const pairs = faqPairs(section.body)
  if (pairs.length < MIN_BLOCK_ITEMS) return undefined
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.map((pair) => ({
      "@type": "Question",
      name: pair.question,
      acceptedAnswer: { "@type": "Answer", text: pair.answer },
    })),
  }
}

function faqPairs(lines: string[]): { question: string; answer: string }[] {
  const pairs: { question: string; answer: string }[] = []
  let question: string | null = null
  let answer: string[] = []

  const flush = () => {
    if (!question) return
    const text = cleanText(answer.join(" "))
    if (text) pairs.push({ question, answer: text })
    question = null
    answer = []
  }

  for (const line of lines) {
    const heading = line.match(/^###\s+(.+?)\s*$/)
    if (heading?.[1]) {
      flush()
      question = cleanText(heading[1])
      continue
    }
    if (question) answer.push(line)
  }
  flush()
  return pairs
}

function howToFrom(sections: Section[]): JsonLdObject | undefined {
  const section = sections.find((item) =>
    /^how\s+to\b/i.test(item.heading.trim()),
  )
  if (!section) return undefined
  const steps = numberedSteps(section.body)
  if (steps.length < MIN_BLOCK_ITEMS) return undefined
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: section.heading.trim(),
    step: steps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: firstSentence(text),
      text,
    })),
  }
}

function numberedSteps(lines: string[]): string[] {
  const steps: string[] = []
  let current: string[] | null = null

  const push = () => {
    if (!current) return
    const text = cleanText(current.join(" "))
    if (text) steps.push(text)
    current = null
  }

  for (const line of lines) {
    const item = line.match(/^\s*\d+\.\s+(.+)$/)
    if (item?.[1]) {
      push()
      current = [item[1]]
      continue
    }
    if (current && /^\s{2,}\S/.test(line)) current.push(line.trim())
  }
  push()
  return steps
}

function cleanText(value: string): string {
  return value.replace(/`/g, "").replace(/\s+/g, " ").trim()
}

function firstSentence(text: string): string {
  const [sentence] = text.split(/(?<=\.)\s/)
  return sentence ?? text
}
