const AUTO_LINK_LIMIT = 4

const glossary = [
  { terms: ["MPC wallet", "multi-party computation wallet"], href: "/mpc" },
  { terms: ["seedless wallet", "seedless wallets"], href: "/mpc" },
]

type MarkdownNode = {
  type: string
  value?: string
  url?: string
  children?: MarkdownNode[]
}

const skippedNodeTypes = new Set([
  "code",
  "heading",
  "html",
  "inlineCode",
  "link",
  "linkReference",
])

export function getInternalHref(href: string) {
  if (href.startsWith("/") && !href.startsWith("//")) return href

  try {
    const url = new URL(href)
    return url.origin === "https://vultisig.com"
      ? `${url.pathname}${url.search}${url.hash}`
      : undefined
  } catch {
    return undefined
  }
}

function collectExistingTargets(node: MarkdownNode, targets: Set<string>) {
  if (node.type === "link" && node.url) {
    const href = getInternalHref(node.url)
    if (href) targets.add(href)
  }

  node.children?.forEach((child) => collectExistingTargets(child, targets))
}

function findFirstGlossaryMatch(value: string, usedTargets: Set<string>) {
  let bestMatch:
    | { index: number; match: string; href: string }
    | undefined

  for (const entry of glossary) {
    if (usedTargets.has(entry.href)) continue

    for (const term of entry.terms) {
      const match = new RegExp(`\\b${term}\\b`, "i").exec(value)
      if (
        match &&
        (!bestMatch || match.index < bestMatch.index)
      ) {
        bestMatch = {
          index: match.index,
          match: match[0],
          href: entry.href,
        }
      }
    }
  }

  return bestMatch
}

export function articleAutoLinks(currentPath?: string) {
  return () => (tree: MarkdownNode) => {
    const usedTargets = new Set<string>()
    const currentHref = currentPath && getInternalHref(currentPath)
    if (currentHref) usedTargets.add(currentHref)
    collectExistingTargets(tree, usedTargets)

    let autoLinkCount = 0

    const transform = (node: MarkdownNode) => {
      if (!node.children || skippedNodeTypes.has(node.type)) return

      const children: MarkdownNode[] = []

      for (const child of node.children) {
        if (child.type !== "text" || !child.value) {
          transform(child)
          children.push(child)
          continue
        }

        let remaining = child.value

        while (remaining && autoLinkCount < AUTO_LINK_LIMIT) {
          const match = findFirstGlossaryMatch(remaining, usedTargets)
          if (!match) break

          if (match.index > 0) {
            children.push({
              type: "text",
              value: remaining.slice(0, match.index),
            })
          }

          children.push({
            type: "link",
            url: match.href,
            children: [{ type: "text", value: match.match }],
          })
          usedTargets.add(match.href)
          autoLinkCount += 1
          remaining = remaining.slice(match.index + match.match.length)
        }

        if (remaining) children.push({ type: "text", value: remaining })
      }

      node.children = children
    }

    transform(tree)
  }
}
