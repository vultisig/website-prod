import { cn } from "@/lib/utils"

/**
 * A styled span inside a legal paragraph. The weights mirror the Figma text
 * runs: Medium marks the lead-in of a bulleted item, SemiBold the lead-in of a
 * numbered clause.
 */
export type LegalRun = {
  text: string
  weight?: "medium" | "semibold"
  /** Rendered in Primary/Accent 2 rather than Text/Inverse. */
  accent?: boolean
  upper?: boolean
}

/**
 * Paragraph content. A `\n` inside a run is a soft line break (Figma's
 * Shift+Enter), not a paragraph break — blank lines are separate blocks.
 */
export type LegalInline = string | LegalRun

/**
 * One block of a section, in the order the Figma frame stacks them. `tight`
 * marks a block the frame separates from the one above with a plain line break
 * rather than a blank line, so it renders with no gap.
 */
export type LegalBlock =
  | { kind: "paragraph"; content: LegalInline[]; tight?: boolean }
  | { kind: "subheading"; text: string; accent?: boolean; tight?: boolean }
  | {
      kind: "list"
      items: LegalInline[][]
      ordered?: boolean
      /** Figma nesting depth; the browser extension bullets sit one level in. */
      indent?: number
      tight?: boolean
    }
  /** The Terms of Service "Contents" index, split across two Figma columns. */
  | { kind: "index"; columns: string[][] }
  /** The Privacy Policy "Your Rights" pairs, split across two Figma columns. */
  | { kind: "definitions"; columns: { term: string; description: string }[][] }

export interface LegalSection {
  id: string
  title: string
  /** Set on the sections Figma numbers with an ordered-list marker. */
  number?: number
  /** Set on the preamble titles Figma paints in the accent blue. */
  accent?: boolean
  /** Set where Figma applies Title Case to the heading. */
  titleCase?: boolean
  blocks: LegalBlock[]
}

export interface LegalDocument {
  title: string
  /** The "Last modified: …" line, where the document carries one. */
  meta?: string
  intro?: LegalInline[]
  sections: LegalSection[]
}

/** 16px/1.35 — the body size shared by every run of legal copy. */
const BODY = "text-v5-link text-v5-text-inverse"

function Inline({ content }: { content: LegalInline[] }) {
  return (
    <>
      {content.map((run, index) => {
        if (typeof run === "string") return run
        return (
          <span
            key={index}
            className={cn(
              run.weight === "semibold" && "font-semibold",
              run.weight === "medium" && "font-medium",
              run.accent && "text-v5-highlight",
              run.upper && "uppercase",
            )}
          >
            {run.text}
          </span>
        )
      })}
    </>
  )
}

function Block({
  block,
  className,
}: {
  block: LegalBlock
  className?: string
}) {
  switch (block.kind) {
    case "paragraph":
      return (
        <p className={cn(BODY, "whitespace-pre-line", className)}>
          <Inline content={block.content} />
        </p>
      )

    case "subheading":
      return (
        <p
          className={cn(
            "text-v5-link font-semibold",
            block.accent ? "text-v5-highlight" : "text-v5-text-inverse",
            className,
          )}
        >
          {block.text}
        </p>
      )

    case "list": {
      const List = block.ordered ? "ol" : "ul"
      return (
        <List
          className={cn(
            BODY,
            block.ordered ? "list-decimal" : "list-disc",
            // Figma indents the marker one step and the copy 25px; the nested
            // extension bullets sit a further step in.
            block.indent && block.indent > 1 ? "pl-[48px]" : "pl-[25px]",
            // Bulleted items are set with extra leading, numbered ones are not.
            !block.ordered && "space-y-[5px]",
            className,
          )}
        >
          {block.items.map((item, index) => (
            <li key={index} className="whitespace-pre-line">
              <Inline content={item} />
            </li>
          ))}
        </List>
      )
    }

    case "index":
      return (
        <div className={cn("flex flex-col gap-6 md:flex-row", className)}>
          {block.columns.map((column, columnIndex) => (
            <ol
              key={columnIndex}
              start={
                block.columns
                  .slice(0, columnIndex)
                  .reduce((total, previous) => total + previous.length, 0) + 1
              }
              className={cn(
                BODY,
                "list-decimal space-y-[11px] pl-[25px]",
                columnIndex === 0 ? "md:w-[420px] md:shrink-0" : "md:flex-1",
              )}
            >
              {column.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ol>
          ))}
        </div>
      )

    case "definitions":
      return (
        <div className={cn("flex flex-col gap-6 md:flex-row", className)}>
          {block.columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-1 flex-col gap-6">
              {column.map((entry) => (
                <div key={entry.term}>
                  <p className="text-v5-link font-semibold text-v5-highlight">
                    {entry.term}
                  </p>
                  <p className={cn(BODY, "mt-6 whitespace-pre-line")}>
                    {entry.description}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )
  }
}

function SectionHeading({ section }: { section: LegalSection }) {
  return (
    <h2
      className={cn(
        "relative text-v5-subtitle font-semibold",
        section.accent ? "text-v5-highlight" : "text-v5-text-inverse",
        section.titleCase && "capitalize",
        section.number !== undefined && "pl-[30px]",
      )}
    >
      {section.number !== undefined && (
        // Hangs left of the copy the way Figma's ordered-list marker does, so
        // the titles stay aligned once the numbering reaches two digits.
        <span className="absolute left-0 w-5 text-right">
          {section.number}.
        </span>
      )}
      {section.title}
    </h2>
  )
}

/**
 * Renders a legal document — the Terms of Service and Privacy Policy V5 frames,
 * which are the same stack of headings and copy over the light page surface.
 */
export default function LegalDocumentView({ doc }: { doc: LegalDocument }) {
  return (
    <main className="min-h-screen bg-v5-page px-4 pb-9 pt-[74px] md:px-[30px] md:pb-[60px] md:pt-[134px]">
      <article className="mx-auto mt-9 flex max-w-[1180px] flex-col gap-[30px] md:mt-[60px]">
        <h1 className="text-v5-display-xs font-semibold text-v5-text-inverse md:text-v5-hero">
          {doc.title}
        </h1>

        {doc.meta && (
          <p className="text-v5-subtitle font-medium text-v5-text-tertiary">
            {doc.meta}
          </p>
        )}

        {doc.intro && (
          <p className={cn(BODY, "whitespace-pre-line")}>
            <Inline content={doc.intro} />
          </p>
        )}

        {doc.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <SectionHeading section={section} />
            {section.blocks.map((block, index) => (
              <Block
                key={index}
                block={block}
                className={"tight" in block && block.tight ? undefined : "mt-6"}
              />
            ))}
          </section>
        ))}
      </article>
    </main>
  )
}
