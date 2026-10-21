/** Blank lines become spacer paragraphs so tiptap-authored prose keeps its rhythm. */
export function withSpacingMarkers(content: string): string {
  return content
    .split("\n")
    .map((line) => (line.trim() === "" ? "\n\n&nbsp;\n\n" : line))
    .join("\n")
}
