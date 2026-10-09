import { CHAIN_DETAILS, type ChainFacts } from "./chain-details"
import { CHAINS, type Chain, type ChainFamilySlug } from "./chains"

export type Feature = {
  title: string
  body: string
  /**
   * `public/v5/chains/<icon>.svg`. The illustrations are positional rather than
   * per-feature — Figma reuses the same trio down every family's column.
   */
  icon: string
}

/** Family questions a chain can replace or drop by id. */
export type FaqId = "tokens" | "address" | "stake"

export type FaqEntry = {
  id?: FaqId
  question: string
  answer: string
}

export type ChainFamily = {
  /** URL segment: /chains/<slug>. */
  slug: string
  /** Every chain whose `family` is this value publishes under this page. */
  category: ChainFamilySlug
  /** Reads inside headings — "EVM chains", "UTXO chains". */
  name: string
  /** The chain the Figma frame was drawn around, for the closing heading. */
  chainLabel: string
  /** The asset the shared action copy speaks about. */
  asset: string
  hero: { title: string; body: string; cta: string }
  vaultView: { title: string; body: string; features: Feature[] }
  faq: { title: string; items: FaqEntry[] }
  meta: { title: string; description: string }
  /**
   * Used by the chain pages under this family. Without it all 13 EVM chains
   * would carry the family's title verbatim, and 13 identical titles compete
   * with each other instead of ranking. `l1` has none because its own meta is
   * already per chain.
   */
  chainMeta?: { title: string; description: string }
  /** Matched against article titles and tags for the closing rail. */
  articleTerms: string[]
  /**
   * `public/v5/chains/hero-<slug>.webp`, exported from the frame's hero group.
   * The wash behind the device is part of the artwork — the card under it is
   * plain white on all three frames — so the family's colour arrives with the
   * image rather than as a fill.
   */
  heroArt: string
}

/**
 * The three families the chains index filters to, each with its own page.
 *
 * Copy is Figma's, read from the Ethereum, Bitcoin and THORChain frames. Two
 * places depart from it deliberately:
 *
 * - Every frame's second and third FAQ answers are the same two paragraphs of
 *   unrelated boilerplate ("Vultisig offers enhanced security with…"), left
 *   over from another accordion. The questions are real, so they are kept and
 *   answered properly. The last two questions on each page are additions.
 * - Its Ethereum button reads "Add Etherium to your Vault".
 *
 * Each frame speaks for one chain — ETH, BTC, RUNE — while these pages cover a
 * whole family, so anything the frame said about its own asset is written as
 * `{asset}` / `{chain}` and filled per chain. The THORChain frame was the one
 * that leaned on this hardest: its copy named RUNE throughout, which read as
 * RUNE on the ATOM, OSMO and dYdX pages. THORChain is still named where the
 * claim is genuinely about it — it settles the swaps for every Cosmos chain.
 *
 * The same care applies to claims that only hold for the frame's chain. The
 * Bitcoin frame promised "Native SegWit addresses", which is true of BTC and
 * LTC and of nothing else in the family — BCH uses CashAddr, DOGE, DASH and
 * transparent ZEC are base58, and Cardano is eUTXO with Shelley addresses. It
 * now promises the chain's own format and names SegWit as the example.
 *
 * L2s stay a filter on the index rather than a fourth page. Every L2 Vultisig
 * supports is also an EVM chain and signs identically — same curve, same
 * address, same threshold — so the page would restate the EVM one closely
 * enough to compete with it in search rather than add reach.
 */
export const CHAIN_FAMILIES: ChainFamily[] = [
  {
    slug: "evm",
    category: "evm",
    name: "EVM chains",
    chainLabel: "Ethereum",
    asset: "ETH",
    heroArt: "hero-eth",
    hero: {
      title: "Hold {chain} without holding a single key",
      body: "Send {asset}, swap tokens, and call smart contracts. Every transaction requires your device threshold to approve it, not one exposed private key.",
      cta: "Add {chain} to your Vault",
    },
    vaultView: {
      title: "Your {asset} and tokens, in one vault view",
      body: "ERC-20 balances sit alongside native {asset} in the same vault. No separate wallet needed for tokens.",
      features: [
        {
          title: "EVM signing",
          body: "Standard secp256k1 transaction signing, compatible with every EVM tool and explorer.",
          icon: "feature-1",
        },
        {
          title: "Smart contract calls",
          body: "Approve, stake, or interact with dApps directly, with the same threshold approval as a send.",
          icon: "feature-2",
        },
        {
          title: "Token support",
          body: "ERC-20 balances sit next to {asset} in the same vault, with no separate token wallet.",
          icon: "feature-3",
        },
      ],
    },
    faq: {
      title: "{chain} on Vultisig, answered",
      items: [
        {
          question: "Can I use Vultisig to interact with dApps on {chain}?",
          answer:
            "Yes. Vultisig supports smart contract calls, so you can approve, stake, or interact with supported dApps directly from your vault.",
        },
        {
          id: "tokens",
          question: "Do ERC-20 tokens show up automatically?",
          answer:
            "Yes. On {chain}, Vultisig finds ERC-20 balances automatically and shows them next to native {asset}, with no import step.",
        },
        {
          question: "Does Vultisig control my gas fees?",
          answer:
            "No. Gas is paid to the network, not to Vultisig, and you keep control of the fee on every transaction. Vultisig does not add a charge on top of network fees.",
        },
        {
          question: "Is the same address used across every EVM chain?",
          answer:
            "Yes. EVM chains share the secp256k1 curve and the same address derivation, so your vault presents one address across Ethereum, Arbitrum, Base, Optimism, Polygon and the rest.",
        },
        {
          question: "Do I need to bridge to use an L2?",
          answer:
            "Not to hold or receive. Every supported L2 is a chain in the same vault, so you can receive and send on it directly. Bridging only matters when moving funds between chains, and Vultisig's swap can often do that without a separate bridge app.",
        },
      ],
    },
    meta: {
      title:
        "EVM Wallet — Hold Ethereum, Arbitrum & Base Without a Seed Phrase",
      description:
        "Hold ETH, ERC-20 tokens and every EVM chain in one MPC vault. Smart contract calls and swaps approved by your device threshold — no seed phrase, no single private key.",
    },
    chainMeta: {
      title: "{chain} Wallet — Hold {asset} and ERC-20s Without a Seed Phrase",
      description:
        "Hold {chain} in a Vultisig MPC vault. Send {asset}, swap tokens and use dApps, each approved by your own devices. No seed phrase, no single private key.",
    },
    articleTerms: ["ethereum", "evm", "erc-20", "arbitrum", "base", "layer 2"],
  },
  {
    slug: "utxo",
    category: "utxo",
    name: "UTXO chains",
    chainLabel: "Bitcoin",
    asset: "BTC",
    heroArt: "hero-btc",
    hero: {
      title: "Hold {chain} without holding a single key",
      body: "No seed phrase. No custodian. Your {asset} is split across your own devices using MPC, and it takes your threshold to move any of it.",
      cta: "Add {chain} to your Vault",
    },
    vaultView: {
      title: "Your {asset}, in one vault view",
      body: "Same interface as every other asset in Vultisig. Balance, address, and history, backed by your device threshold instead of a private key sitting on one phone.",
      features: [
        {
          title: "Native {chain} addresses",
          body: "Vultisig derives the address format {chain} itself uses, so every wallet, exchange and explorer treats your address normally.",
          icon: "feature-1",
        },
        {
          title: "UTXO-aware signing",
          body: "Vultisig selects and signs inputs the same way a single-key wallet would. Nothing about the chain logic changes.",
          icon: "feature-2",
        },
        {
          title: "Fast Vault & Secure Vault",
          body: "A Fast Vault is 2-of-2 with VultiServer, which co-signs but can never sign alone. A Secure Vault uses only your own devices, typically 2-of-3, for larger holdings.",
          icon: "feature-3",
        },
      ],
    },
    faq: {
      title: "{chain} on Vultisig, answered",
      items: [
        {
          question: "Do I need a hardware wallet to hold {chain} on Vultisig?",
          answer:
            "No. Vultisig splits your key across the devices you already own — phone, laptop, tablet. A hardware wallet is optional, not required.",
        },
        {
          id: "address",
          question: "What address format does Vultisig use for {chain}?",
          answer:
            "Whatever the chain's own standard is — Native SegWit (bech32) on Bitcoin and Litecoin, CashAddr on Bitcoin Cash, a Shelley address on Cardano, and the ordinary base58 format elsewhere. Anyone can send to it from any wallet or exchange, and it appears on every block explorer like any other address.",
        },
        {
          question:
            "Can I hold {chain} in a Secure Vault instead of a Fast Vault?",
          answer:
            "Yes. A Fast Vault is 2-of-2: your device plus VultiServer, which co-signs but can never sign alone. A Secure Vault uses only your own devices, typically 2-of-3, and suits larger holdings. You pick the type when you create a vault, and {asset} works in both.",
        },
        {
          question: "What happens to my {chain} if I lose a device?",
          answer:
            "Nothing, as long as you can still meet your threshold. A 2-of-3 vault keeps working with two devices, and you can re-share to a replacement device without moving funds or restoring a seed phrase.",
        },
        {
          question: "Does MPC change how {chain} transactions work on-chain?",
          answer:
            "No. Threshold signing produces one ordinary signature, so the transaction is indistinguishable on-chain from a single-key one. There is no multisig script, no extra fee, and no on-chain trace of your security setup.",
        },
      ],
    },
    meta: {
      title: "Bitcoin MPC Wallet — Hold BTC, LTC & DOGE Without a Seed Phrase",
      description:
        "Hold Bitcoin and every UTXO chain in one MPC vault. Each chain's own address format, standard on-chain transactions, and no seed phrase — your key is split across devices you already own.",
    },
    chainMeta: {
      title: "{chain} Wallet — Hold {asset} Without a Seed Phrase",
      description:
        "Hold {chain} in a Vultisig MPC vault. Standard {asset} addresses, ordinary transactions, no seed phrase. Your key is split across devices you already own.",
    },
    articleTerms: ["bitcoin", "btc", "utxo", "segwit", "litecoin"],
  },
  {
    slug: "cosmos",
    category: "cosmos",
    name: "Cosmos chains",
    chainLabel: "THORChain",
    asset: "RUNE",
    heroArt: "hero-rune",
    hero: {
      title: "Hold {chain} without holding a single key",
      body: "Hold and send {asset} from the same vault as every other chain. Every transaction requires your device threshold to approve it, not one exposed private key.",
      cta: "Add {chain} to your Vault",
    },
    vaultView: {
      title: "Your {asset}, in one vault view",
      body: "Balance, address and history sit beside every other asset you hold, each action approved by your device threshold.",
      features: [
        {
          title: "Ordinary bech32 address",
          body: "Vultisig derives the chain's own bech32 account, so explorers, exchanges and services treat it normally.",
          icon: "feature-1",
        },
        {
          title: "One vault, every chain",
          body: "No separate Cosmos wallet and no second seed phrase. {asset} sits next to Bitcoin and Ethereum.",
          icon: "feature-2",
        },
        {
          title: "Hold and send {asset}",
          body: "Hold and send {asset} directly, each action approved by your device threshold.",
          icon: "feature-3",
        },
      ],
    },
    faq: {
      title: "{chain} on Vultisig, answered",
      items: [
        {
          id: "stake",
          question: "Can I stake {asset} from my vault?",
          answer:
            "Not today. Vultisig holds and sends {asset}; in-app staking covers THORChain, MayaChain, Terra and Terra Classic.",
        },
        {
          question: "Which Cosmos SDK chains does Vultisig support?",
          answer:
            "Cosmos Hub, Osmosis, THORChain, MayaChain, dYdX, Akash, Noble, Terra and Terra Classic are all held in the same vault.",
        },
        {
          id: "address",
          question: "Do I get a standard Cosmos address?",
          answer:
            "Yes. Vultisig derives ordinary bech32 accounts for each chain, so your address works with every Cosmos explorer, IBC transfer and service as normal.",
        },
      ],
    },
    meta: {
      title: "Cosmos Wallet — Hold ATOM, RUNE & OSMO Without a Seed Phrase",
      description:
        "Hold Cosmos SDK chains in one MPC vault. Stake, transfer over IBC and settle native cross-chain swaps through THORChain — every action approved by your device threshold.",
    },
    chainMeta: {
      title: "{chain} Wallet — Hold {asset} Without a Seed Phrase",
      description:
        "Hold {chain} in a Vultisig MPC vault. Send {asset} from the same vault as every other chain, each action approved by your own devices. No seed phrase.",
    },
    articleTerms: ["cosmos", "thorchain", "rune", "osmosis", "atom", "ibc"],
  },
  {
    slug: "l1",
    category: "l1",
    name: "independent L1s",
    chainLabel: "Solana",
    asset: "SOL",
    heroArt: "hero-sol",
    hero: {
      title: "Hold {chain} without holding a single key",
      body: "{chain} runs on its own architecture, with its own accounts and its own signature scheme. Vultisig holds it in the same vault as everything else, and it still takes your device threshold to move any of it.",
      cta: "Add {chain} to your Vault",
    },
    vaultView: {
      title: "Your {asset}, in one vault view",
      body: "Balance, address and history sit beside every other asset you hold. The chain keeps its own rules; what changes is that no single device can spend on it alone.",
      features: [
        {
          title: "Its own signature scheme",
          body: "Threshold signing covers Ed25519 chains as well as secp256k1 ones, so the vault is not limited to one curve.",
          icon: "feature-1",
        },
        {
          title: "Ordinary addresses",
          body: "Vultisig derives the chain's standard address format, so every explorer, exchange and service treats it normally.",
          icon: "feature-2",
        },
        {
          title: "One vault, every chain",
          body: "No separate wallet and no second seed phrase for a chain that works differently underneath.",
          icon: "feature-3",
        },
      ],
    },
    faq: {
      title: "{chain} on Vultisig, answered",
      items: [
        {
          question: "Does Vultisig support {chain} natively?",
          answer:
            "Yes. It is a chain in the same vault as Bitcoin and Ethereum, with its own address and balance, not a wrapped or bridged representation of one.",
        },
        {
          question: "Does MPC work on chains that do not use secp256k1?",
          answer:
            "Yes. Vultisig implements threshold signing for Ed25519 as well as ECDSA, which is what lets one vault cover chains built on different curves.",
        },
        {
          id: "address",
          question: "Is my {chain} address a standard address?",
          answer:
            "Yes. The vault derives the chain's normal address format, so anyone can send to it from any wallet or exchange and it appears on explorers like any other.",
        },
        {
          question: "What happens if I lose a device?",
          answer:
            "Nothing, as long as you can still meet your threshold. A 2-of-3 vault keeps working with two devices, and you can re-share to a replacement without moving funds or restoring a seed phrase.",
        },
      ],
    },
    meta: {
      title: "{chain} Wallet — Hold {asset} Without a Seed Phrase",
      description:
        "Hold {chain} in a Vultisig MPC vault alongside every other chain we support. Your key is split across your own devices; only your threshold moves {asset}.",
    },
    articleTerms: ["solana", "sui", "ton", "tron", "xrp", "polkadot"],
  },
]

/**
 * Shared across the three pages. Figma leaves `[Chain]` in place for the family
 * to fill, so `{asset}` is substituted per page.
 *
 * The wallet routes "Function" to its deposit flow — staking, bonding, and the
 * chain-specific actions a plain transfer cannot express. Figma repeats the Send
 * description on that card, which reads as an unfinished line rather than an
 * intent, so it is described by what the button actually does.
 */
export type ActionLabel = "Swap" | "Send" | "Buy" | "Function" | "Receive"

export const FAMILY_ACTIONS: { label: ActionLabel; body: string }[] = [
  {
    label: "Swap",
    body: "Trade {asset} for any other supported asset. No bridge, no separate app.",
  },
  {
    label: "Send",
    body: "Transfer to any address. Signing happens across your device threshold.",
  },
  {
    label: "Buy",
    body: "Buy {asset} directly with a card or bank transfer, straight into your vault.",
  },
  {
    label: "Function",
    body: "Chain-specific actions, such as staking, bonding or IBC transfers where the chain has them, approved by your threshold."
  },
  {
    label: "Receive",
    body: "Share your address or QR code to receive funds into your vault.",
  },
]

/** Looks up a family by URL segment. */
export function getChainFamily(slug: string): ChainFamily | undefined {
  return CHAIN_FAMILIES.find((family) => family.slug === slug)
}

/** The chains this family covers, in the index's alphabetical order. */
export function chainsInFamily(family: ChainFamily): Chain[] {
  return CHAINS.filter((chain) => chain.family === family.category)
}

/** Resolves a /chains/<family>/<chain> pair, rejecting mismatched pairs. */
export function getChainInFamily(
  familySlug: string,
  chainSlug: string,
): { family: ChainFamily; chain: Chain } | undefined {
  const family = getChainFamily(familySlug)
  if (!family) return undefined
  const chain = CHAINS.find(
    (c) => c.slug === chainSlug && c.family === family.category,
  )
  return chain ? { family, chain } : undefined
}

/**
 * Fills the family template for one chain. Figma leaves `[Chain]` in its
 * headline for exactly this, and the rest of the copy names an asset the same
 * way, so both are placeholders the page substitutes rather than prose repeated
 * 38 times.
 */
export function fill(text: string, chain: Pick<Chain, "name" | "ticker">) {
  return text
    .replaceAll("{chain}", chain.name)
    .replaceAll("{asset}", chain.ticker)
}

/** The copy one chain page renders: the family template with that chain's facts and corrections applied. */
export type ChainCopy = {
  facts: ChainFacts
  hasArt: boolean
  hero: ChainFamily["hero"]
  vaultView: ChainFamily["vaultView"]
  faq: { title: string; items: FaqEntry[] }
  actions: typeof FAMILY_ACTIONS
  meta: { title: string; description: string }
}

/**
 * Resolves a chain's page copy. The family's address question is answered with
 * the chain's own address format, so no page lists every other chain's format.
 */
export function chainCopy(family: ChainFamily, chain: Chain): ChainCopy {
  const details = CHAIN_DETAILS[chain.slug]
  if (!details) throw new Error(`No CHAIN_DETAILS entry for ${chain.slug}`)
  const overrides = details.overrides ?? {}
  const faqOverrides = overrides.faq ?? {}
  const addressAnswer: FaqEntry = {
    id: "address",
    question: "What does a {chain} address look like in Vultisig?",
    answer: `${details.facts.address} Anyone can send to it from a wallet or exchange that supports {chain}, and it shows on block explorers like any other address.`,
  }

  const items = family.faq.items.flatMap((item) => {
    if (item.id === "address") return [addressAnswer]
    if (item.id && item.id in faqOverrides) {
      const replacement = faqOverrides[item.id]
      return replacement ? [replacement] : []
    }
    return [item]
  })
  const meta = family.chainMeta ?? family.meta

  return {
    facts: details.facts,
    hasArt: details.hasArt !== false,
    hero: { ...family.hero, body: overrides.heroBody ?? family.hero.body },
    vaultView: {
      ...family.vaultView,
      body: overrides.vaultViewBody ?? family.vaultView.body,
      features: overrides.features ?? family.vaultView.features,
    },
    faq: { title: family.faq.title, items: [...items, ...(overrides.extraFaq ?? [])] },
    actions: FAMILY_ACTIONS.filter(
      (action) => !overrides.hiddenActions?.includes(action.label),
    ),
    meta: {
      title: meta.title,
      description: overrides.metaDescription ?? meta.description,
    },
  }
}
