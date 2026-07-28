"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks"

import { articleAutoLinks, getInternalHref } from "@/lib/article-auto-links"
import { slugifyHeading } from "@/lib/article-toc"

interface MarkdownRendererProps {
  content: string
  currentPath?: string
}

function toText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children)
  }
  if (Array.isArray(children)) return children.map(toText).join("")
  if (children && typeof children === "object" && "props" in children) {
    const props = (children as { props?: { children?: ReactNode } }).props
    return toText(props?.children)
  }
  return ""
}

/** Blank lines become spacer paragraphs so tiptap-authored prose keeps its rhythm. */
function withSpacingMarkers(content: string): string {
  return content
    .split("\n")
    .map((line) => (line.trim() === "" ? "\n\n&nbsp;\n\n" : line))
    .join("\n")
}

export default function MarkdownRenderer({
  content,
  currentPath,
}: MarkdownRendererProps) {
  // Fresh per render so heading ids follow document order and match the TOC.
  const headingCounts = new Map<string, number>()
  const nextHeadingId = (children: ReactNode) => {
    const base = slugifyHeading(toText(children))
    const seen = headingCounts.get(base) || 0
    headingCounts.set(base, seen + 1)
    return seen === 0 ? base : `${base}-${seen}`
  }

  return (
    <div className="max-w-none font-sans text-v5-body-m-relaxed text-v5-text-inverse md:text-v5-subtitle">
      <ReactMarkdown
        remarkPlugins={[remarkBreaks, articleAutoLinks(currentPath)]}
        components={{
          // Demoted to h2 — the page title already owns the only h1.
          h1: ({ children }) => (
            <h2
              id={nextHeadingId(children)}
              className="scroll-mt-[120px] text-v5-display-xs font-medium md:text-v5-display-sm"
            >
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h2
              id={nextHeadingId(children)}
              className="scroll-mt-[120px] text-v5-display-xs font-medium md:text-v5-display-sm"
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              id={nextHeadingId(children)}
              className="scroll-mt-[120px] text-v5-label font-medium md:text-v5-prose-h3"
            >
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-v5-body-l-relaxed font-medium md:text-v5-label">
              {children}
            </h4>
          ),
          p: ({ children, ...props }) => {
            if (toText(children).trim() === "") {
              return <div aria-hidden="true" className="h-[1.35em]" />
            }
            return (
              <p className="leading-[1.35]" {...props}>
                {children}
              </p>
            )
          },
          ul: ({ children }) => (
            <ul className="list-disc space-y-1 ps-[30px]">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-1 ps-[30px]">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-[1.78] tracking-[-0.32px]">{children}</li>
          ),
          a: ({ href = "", children }) => {
            const internalHref = getInternalHref(href)
            const className = "underline underline-offset-2 hover:text-v5-cta"

            return internalHref ? (
              <Link href={internalHref} className={className}>
                {children}
              </Link>
            ) : (
              <a
                href={href}
                className={className}
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            )
          },
          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          code: ({ children }) => (
            <code className="rounded-md bg-v5-panel px-2 py-1 font-mono text-v5-card-body text-v5-cta">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="overflow-x-auto rounded-xl bg-v5-panel p-4 text-v5-card-body">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-v5-highlight ps-4 italic text-v5-text-tertiary">
              {children}
            </blockquote>
          ),
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt || ""}
              className="h-auto max-w-full rounded-[20px]"
            />
          ),
          hr: () => <hr className="border-v5-text-secondary" />,
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-v5-card-body">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-v5-text-secondary p-3 font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-v5-text-secondary/50 p-3">
              {children}
            </td>
          ),
        }}
      >
        {withSpacingMarkers(content)}
      </ReactMarkdown>
    </div>
  )
}
