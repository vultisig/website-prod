export type ChainArticle = {
  /** Resolves to /articles/<slug>. */
  slug: string
  title: string
  description: string
  /** As written on the card, not a parsed date — Figma renders it verbatim. */
  date: string
  /** `public/v5/chains/<image>.webp`, exported from the frame's card. */
  image: string
}

/**
 * The closing rail on every chain page, taken from the Figma frames.
 *
 * All three frames — Ethereum, Bitcoin and THORChain — carry the same three
 * cards, down to identical `imageRef`s; only the heading above them names the
 * chain. So the set is shared and the heading is what varies per page.
 *
 * Static by request. It does mean the rail holds these three until someone
 * edits this file, rather than following the blog: the pages previously read
 * from the database, which left the section empty wherever that was
 * unreachable, including at build time.
 *
 * The slugs are real. Each was checked against the live index rather than
 * guessed from the title, so none of these links 404.
 */
export const CHAIN_ARTICLES: ChainArticle[] = [
  {
    slug: "vultisig-weekly-update-march-13-2026",
    title: "Vultisig Weekly Update | March 13, 2026",
    description:
      "This week marked a definitive shift in the Vultisig ecosystem. While our cross-chain core continues to harden, the headline is clear: The Vulti Agentic Era has arrived.",
    date: "March 13, 2026",
    image: "article-weekly-update",
  },
  {
    slug: "usdc-comes-to-vultisig",
    title: "USDC Comes to Vultisig",
    description:
      "Vultisig is integrating Circle's Smart Contract Accounts (SCA) and native USDC tooling directly into the Vultisig self-custody wallet ecosystem.",
    date: "February 9, 2026",
    image: "article-usdc",
  },
  {
    slug: "self-custodial-automation-is-finally-here",
    title: "Self-Custodial Automation is Finally Here!",
    description:
      "It's live. The Vultisig Plugin Marketplace just shipped. The first on-chain, self-custodial, multi-chain automation marketplace ever built.",
    date: "February 2, 2026",
    image: "article-plugin-marketplace",
  },
]
