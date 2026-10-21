import { Children, createElement, isValidElement, type ReactNode } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks"

import { withSpacingMarkers } from "./article-markdown"

export type JsonLdObject = Record<string, unknown>

type Section = {
  heading: string
  body: string[]
}

const MIN_BLOCK_ITEMS = 2
const FENCE = /^\s{0,3}(```|~~~)/
const H2 = /^##\s+(.+?)\s*#*\s*$/
const H3 = /^###\s+(.+?)\s*#*\s*$/

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

function orderedSteps(markdown: string): string[] {
  const steps: string[] = []
  renderMarkdown(markdown, {
    ol: ({ children }) => {
      addItems(steps, children)
      return null
    },
  })
  return steps
}

function visibleText(markdown: string): string {
  const blocks: string[] = []
  renderMarkdown(markdown, {
    p: ({ children }) => {
      add(blocks, nodeText(children))
      return null
    },
    ol: ({ children }) => {
      addItems(blocks, children)
      return null
    },
    ul: ({ children }) => {
      addItems(blocks, children)
      return null
    },
    blockquote: ({ children }) => {
      add(blocks, nodeText(children))
      return null
    },
    pre: ({ children }) => {
      add(blocks, nodeText(children))
      return null
    },
    h1: recordHeading(blocks),
    h2: recordHeading(blocks),
    h3: recordHeading(blocks),
    h4: recordHeading(blocks),
  })
  return blocks.join(" ")
}

function recordHeading(
  blocks: string[],
): (props: { children?: ReactNode }) => null {
  return ({ children }) => {
    add(blocks, nodeText(children))
    return null
  }
}

type MarkdownComponents = {
  p?: (props: { children?: ReactNode }) => null
  ol?: (props: { children?: ReactNode }) => null
  ul?: (props: { children?: ReactNode }) => null
  blockquote?: (props: { children?: ReactNode }) => null
  pre?: (props: { children?: ReactNode }) => null
  h1?: (props: { children?: ReactNode }) => null
  h2?: (props: { children?: ReactNode }) => null
  h3?: (props: { children?: ReactNode }) => null
  h4?: (props: { children?: ReactNode }) => null
}

function renderMarkdown(markdown: string, components: MarkdownComponents) {
  renderToStaticMarkup(
    createElement(
      ReactMarkdown,
      { remarkPlugins: [remarkBreaks], components },
      withSpacingMarkers(markdown),
    ),
  )
}

function addItems(out: string[], children: ReactNode) {
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return
    add(out, nodeText(elementChildren(child)))
  })
}

function add(out: string[], raw: string) {
  const text = raw
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  if (text) out.push(text)
}

/** A line break is a space in the schema string. The page shows it as a break. */
function nodeText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map((child) => nodeText(child)).join("")
  if (!isValidElement(node)) return ""
  if (node.type === "br") return " "
  if (node.type === "img") return ""
  return nodeText(elementChildren(node))
}

function elementChildren(node: ReactNode): ReactNode {
  if (!isValidElement<{ children?: ReactNode }>(node)) return null
  return node.props.children ?? null
}
