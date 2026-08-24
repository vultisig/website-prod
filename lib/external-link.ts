/** Off-site links open in a new tab; `noopener` blocks `window.opener` reach-back. */
export function externalLinkAttrs(href: string) {
  return href.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : undefined
}
