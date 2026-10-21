import remarkParse from "remark-parse"
import remarkBreaks from "remark-breaks"
import { unified } from "unified"

import { withSpacingMarkers } from "./article-markdown"

export type JsonLdObject = Record<string, unknown>

type Section = {
  heading: string
  body: string[]
}

type MdNode = {
  type: string
  value?: string
  ordered?: boolean
  children?: MdNode[]
}

const MIN_BLOCK_ITEMS = 2
const FENCE = /^\s{0,3}(```|~~~)/
const H2 = /^##\s+(.+?)\s*#*\s*$/
const H3 = /^###\s+(.+?)\s*#*\s*$/

const markdown = unified().use(remarkParse).use(remarkBreaks)

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
  const faq = firstFaq(sections)
  const howto = firstHowTo(sections)
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
      current?.body.push(line)
      continue
    }
    const heading = inFence ? null : line.match(H2)
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

function firstFaq(sections: Section[]): JsonLdObject | undefined {
  for (const section of sections) {
    if (!/^faqs?$/i.test(visibleText(section.heading))) continue
    const pairs = faqPairs(section.body)
    if (pairs.length < MIN_BLOCK_ITEMS) continue
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
  return undefined
}

function faqPairs(lines: string[]): { question: string; answer: string }[] {
  const pairs: { question: string; answer: string }[] = []
  let question: string | null = null
  let answer: string[] = []
  let inFence = false

  const flush = () => {
    if (!question) return
    const text = visibleText(answer.join("\n"))
    if (text) pairs.push({ question, answer: text })
    question = null
    answer = []
  }

  for (const line of lines) {
    if (FENCE.test(line)) {
      inFence = !inFence
      if (question) answer.push(line)
      continue
    }
    const heading = inFence ? null : line.match(H3)
    if (heading?.[1]) {
      flush()
      question = visibleText(heading[1])
      continue
    }
    if (question) answer.push(line)
  }
  flush()
  return pairs
}

function firstHowTo(sections: Section[]): JsonLdObject | undefined {
  for (const section of sections) {
    const name = visibleText(section.heading)
    if (!/^how\s+to\b/i.test(name)) continue
    const steps = orderedSteps(section.body.join("\n"))
    if (steps.length < MIN_BLOCK_ITEMS) continue
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name,
      step: steps.map((text, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: firstSentence(text),
        text,
      })),
    }
  }
  return undefined
}

function firstSentence(text: string): string {
  const match = text.match(/^.*?[.!?](?=\s|$)/)
  return match?.[0] ?? text
}

function orderedSteps(source: string): string[] {
  const steps: string[] = []
  collectSteps(parseMarkdown(source), steps)
  return steps
}

function collectSteps(node: MdNode, steps: string[]) {
  if (node.type === "list" && node.ordered === true) {
    for (const item of node.children ?? []) {
      add(steps, inlineText(item))
      for (const child of item.children ?? []) collectSteps(child, steps)
    }
    return
  }
  for (const child of node.children ?? []) collectSteps(child, steps)
}

function visibleText(source: string): string {
  const blocks: string[] = []
  collectBlocks(parseMarkdown(source), blocks)
  return blocks.join(" ")
}

function collectBlocks(node: MdNode, out: string[]) {
  if (node.type === "list") {
    for (const item of node.children ?? []) add(out, inlineText(item))
    return
  }
  if (node.type === "blockquote") {
    const inner: string[] = []
    for (const child of node.children ?? []) collectBlocks(child, inner)
    add(out, inner.join(" "))
    return
  }
  if (node.type === "code") {
    add(out, node.value ?? "")
    return
  }
  if (node.type === "paragraph" || node.type === "heading") {
    add(out, inlineText(node))
    return
  }
  for (const child of node.children ?? []) collectBlocks(child, out)
}

function inlineText(node: MdNode): string {
  if (node.type === "text" || node.type === "inlineCode")
    return node.value ?? ""
  if (node.type === "code") return node.value ?? ""
  // The page shows a line break. The schema string uses a space.
  if (node.type === "break") return " "
  if (
    node.type === "image" ||
    node.type === "imageReference" ||
    node.type === "html"
  ) {
    return ""
  }
  return (node.children ?? []).map((child) => inlineText(child)).join("")
}

function parseMarkdown(source: string): MdNode {
  return markdown.runSync(markdown.parse(withSpacingMarkers(source))) as MdNode
}

function add(out: string[], raw: string) {
  const text = raw
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  if (text) out.push(text)
}
