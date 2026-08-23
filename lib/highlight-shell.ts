import type { CodeToken, CodeTokenKind } from "./highlight-ts"

/**
 * Minimal shell tokeniser for the static CLI samples shown on the marketing
 * pages, sharing the token vocabulary of {@link highlightTypeScript} so both
 * languages paint from one palette. Like its TypeScript sibling this covers
 * only the constructs those in-repo snippets actually use — no expansions,
 * heredocs, or subshells.
 */

/**
 * Ordered alternation: line comment, quoted string, flag, number, word.
 * Anything unmatched (whitespace, punctuation, paths, hex literals) falls
 * through as plain text, which is why there is no catch-all branch.
 */
const TOKEN_PATTERN =
  /(#[^\n]*)|('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*")|(--?[A-Za-z][\w-]*)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][\w-]*)/g

/**
 * True when only whitespace separates `index` from the start of its line — the
 * test for whether a bare word is the command being invoked rather than one of
 * its subcommands or arguments.
 */
function startsCommand(code: string, index: number): boolean {
  const lineStart = code.lastIndexOf("\n", index - 1) + 1
  return code.slice(lineStart, index).trim() === ""
}

/**
 * Splits a shell snippet into consecutive coloured tokens. Concatenating every
 * `value` back together reproduces the input exactly, so the rendered block
 * keeps its original whitespace and line breaks.
 */
export function highlightShell(code: string): CodeToken[] {
  const tokens: CodeToken[] = []
  let cursor = 0

  for (const match of code.matchAll(TOKEN_PATTERN)) {
    const [value, comment, string, flag, number, word] = match
    const start = match.index

    if (start > cursor) {
      tokens.push({ kind: "plain", value: code.slice(cursor, start) })
    }

    let kind: CodeTokenKind = "plain"
    if (comment) kind = "comment"
    else if (string) kind = "string"
    else if (flag) kind = "keyword"
    else if (number) kind = "number"
    else if (word && startsCommand(code, start)) kind = "function"

    tokens.push({ kind, value })
    cursor = start + value.length
  }

  if (cursor < code.length) {
    tokens.push({ kind: "plain", value: code.slice(cursor) })
  }

  return tokens
}
