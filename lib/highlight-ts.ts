/**
 * Minimal TypeScript tokeniser for the static code samples shown on the
 * marketing pages. The snippets are authored in-repo and never user supplied,
 * so a full grammar (and the ~1MB of parser it drags in) would be wasted
 * weight — this covers the constructs those samples actually use.
 */

/** The classes {@link highlightTypeScript} can label a slice of source with. */
export type CodeTokenKind =
  | "plain"
  | "keyword"
  | "function"
  | "string"
  | "number"
  | "comment"

/** A slice of source code paired with the class it should be painted in. */
export type CodeToken = {
  kind: CodeTokenKind
  value: string
}

const KEYWORDS = new Set([
  "as",
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "default",
  "delete",
  "do",
  "else",
  "export",
  "extends",
  "finally",
  "for",
  "from",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "let",
  "new",
  "of",
  "return",
  "switch",
  "this",
  "throw",
  "try",
  "type",
  "typeof",
  "var",
  "void",
  "while",
  "yield",
])

const LITERALS = new Set(["true", "false", "null", "undefined", "NaN"])

/**
 * Ordered alternation: line comment, quoted string, number, identifier.
 * Anything unmatched (whitespace, punctuation, operators) falls through as
 * plain text, which is why there is no catch-all branch.
 */
const TOKEN_PATTERN =
  /(\/\/[^\n]*)|('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`)|(\d+(?:\.\d+)?)|([A-Za-z_$][\w$]*)/g

/**
 * Classifies a bare identifier from its immediate surroundings. Object keys
 * win over keywords so `from: 'USDC'` reads as a property, not an import
 * clause, and a trailing `(` marks a call site.
 */
function classifyWord(word: string, rest: string): CodeTokenKind {
  if (/^\s*:/.test(rest)) return "plain"
  if (/^\s*\(/.test(rest)) return "function"
  if (LITERALS.has(word)) return "number"
  if (KEYWORDS.has(word)) return "keyword"
  return "plain"
}

/**
 * Splits a TypeScript snippet into consecutive coloured tokens. Concatenating
 * every `value` back together reproduces the input exactly, so the rendered
 * block keeps its original whitespace and line breaks.
 */
export function highlightTypeScript(code: string): CodeToken[] {
  const tokens: CodeToken[] = []
  let cursor = 0

  for (const match of code.matchAll(TOKEN_PATTERN)) {
    const [value, comment, string, number, word] = match
    const start = match.index

    if (start > cursor) {
      tokens.push({ kind: "plain", value: code.slice(cursor, start) })
    }

    let kind: CodeTokenKind = "plain"
    if (comment) kind = "comment"
    else if (string) kind = "string"
    else if (number) kind = "number"
    else if (word) kind = classifyWord(word, code.slice(start + value.length))

    tokens.push({ kind, value })
    cursor = start + value.length
  }

  if (cursor < code.length) {
    tokens.push({ kind: "plain", value: code.slice(cursor) })
  }

  return tokens
}
